import { connectDB } from "@/lib/db/mongoose";
import Product from "@/lib/models/Product";
import Order from "@/lib/models/Order";
import Coupon from "@/lib/models/Coupon";
import { requireAuth, ok, err } from "@/lib/apiHelpers";
import { getRazorpay } from "@/lib/razorpay";
import { getCouponDiscount, getCouponError } from "@/lib/coupons";

function cleanAddress(addr = {}) {
  return {
    line1: addr.line1 || "",
    line2: addr.line2 || "",
    city: addr.city || "",
    state: addr.state || "",
    pincode: addr.pincode || "",
    country: addr.country || "India",
  };
}

export async function POST(request) {
  const { user: authUser, error } = await requireAuth(request);
  if (error) return error;

  let body;

  try {
    body = await request.json();
  } catch {
    return err("Invalid request body");
  }

  const {
    items,
    customerName,
    customerEmail,
    customerMobile,
    shippingAddress,
    billingAddress,
    sameAsShipping,
    couponCode,
    gstNumber,
    notes,
  } = body || {};

  if (
    !Array.isArray(items) ||
    items.length === 0 ||
    items.length > 100
  ) {
    return err("Cart is empty or invalid");
  }

  if (!customerName?.trim()) {
    return err("Name is required");
  }

  if (
    !shippingAddress?.line1?.trim() ||
    !shippingAddress?.city?.trim() ||
    !shippingAddress?.state?.trim() ||
    !shippingAddress?.pincode?.trim()
  ) {
    return err("A complete shipping address is required");
  }

  for (const item of items) {
    if (
      !item?.productId ||
      !Number.isInteger(Number(item.qty)) ||
      Number(item.qty) < 1
    ) {
      return err("One or more cart items are invalid");
    }
  }

  await connectDB();

  const orderItems = [];
  let subtotal = 0;

  // Always fetch prices from the database.
  // Never trust product prices sent by the browser.
  for (const raw of items) {
    const qty = Number(raw.qty);
    const product = await Product.findById(raw.productId);

    if (!product || !product.isActive) {
      return err(
        `"${raw.name || raw.productId}" is no longer available`
      );
    }

    if (product.trackInventory && product.stock < qty) {
      return err(
        `Not enough stock for "${product.name}" (only ${product.stock} left)`
      );
    }

    const price = Math.max(0, Number(product.price) || 0);

    orderItems.push({
      productId: product._id,
      name: product.name,
      image: product.image,
      price,
      qty,
      category: product.category,
    });

    subtotal += price * qty;
  }

  const resolvedBilling = sameAsShipping
    ? cleanAddress(shippingAddress)
    : cleanAddress(billingAddress || shippingAddress);

  // Shipping is calculated separately and is never discounted.
  const shipping = subtotal >= 3000 ? 0 : 99;

  let coupon = null;
  let discount = 0;

  const normalizedCode =
    typeof couponCode === "string"
      ? couponCode.trim().toUpperCase()
      : "";

  if (normalizedCode) {
    coupon = await Coupon.findOne({
      code: normalizedCode,
    });

    const eligibleProductIds = new Set(
      (coupon?.productIds || []).map(String)
    );

    // Empty productIds means the coupon applies to all products.
    const eligibleItems = orderItems.filter(
      (item) =>
        eligibleProductIds.size === 0 ||
        eligibleProductIds.has(String(item.productId))
    );

    const eligibleSubtotal = eligibleItems.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );

    const couponError = getCouponError(
      coupon,
      eligibleSubtotal,
      eligibleItems.length
    );

    if (couponError) {
      return err(couponError, 400);
    }

    // Reserve one coupon use only when the coupon is still active,
    // unexpired, and under its usage limit.
    const now = new Date();

    const availableCoupon = await Coupon.findOneAndUpdate(
      {
        _id: coupon._id,
        isActive: true,
        $and: [
          {
            $or: [
              { expiresAt: null },
              { expiresAt: { $gt: now } },
            ],
          },
          {
            $or: [
              { usageLimit: null },
              {
                $expr: {
                  $lt: ["$usedCount", "$usageLimit"],
                },
              },
            ],
          },
        ],
      },
      {
        $inc: { usedCount: 1 },
      },
      {
        new: true,
      }
    );

    if (!availableCoupon) {
      return err("This coupon code is no longer available", 400);
    }

    coupon = availableCoupon;

    // Discount can only be calculated on eligible product prices.
    // Shipping is deliberately excluded from this calculation.
    discount = Math.min(
      eligibleSubtotal,
      Math.max(
        0,
        Number(getCouponDiscount(coupon, eligibleSubtotal)) || 0
      )
    );
  }

  // Product subtotal + full shipping - product discount.
  const total = Math.max(0, subtotal + shipping - discount);

  let order;

  try {
    order = await Order.create({
      userId: authUser._id,
      items: orderItems,
      subtotal,
      shipping,
      couponCode: coupon?.code || "",
      discount,
      couponUsageReleased: false,
      total,
      status: "pending",
      paymentStatus: "pending",
      paymentMethod: "razorpay",
      customerName: customerName.trim(),
      customerEmail: customerEmail?.trim() || "",
      customerMobile: customerMobile || authUser.mobile,
      shippingAddress: cleanAddress(shippingAddress),
      billingAddress: resolvedBilling,
      gstNumber: gstNumber?.trim() || "",
      notes: notes?.trim() || "",
    });
  } catch (createError) {
    if (coupon) {
      await Coupon.updateOne(
        { _id: coupon._id },
        { $inc: { usedCount: -1 } }
      );
    }

    console.error("Order creation failed:", createError);
    return err("Could not create your order. Please try again.", 500);
  }

  let razorpayOrder;

  try {
    razorpayOrder = await getRazorpay().orders.create({
      amount: Math.round(total * 100),
      currency: "INR",
      receipt: String(order._id),
      notes: {
        orderId: String(order._id),
        userId: String(authUser._id),
      },
    });
  } catch (e) {
    console.error("Razorpay order creation failed:", e);

    order.paymentStatus = "failed";
    order.couponUsageReleased = Boolean(coupon);
    await order.save();

    if (coupon) {
      await Coupon.updateOne(
        {
          _id: coupon._id,
          usedCount: { $gt: 0 },
        },
        {
          $inc: { usedCount: -1 },
        }
      );
    }

    return err("Could not start payment. Please try again.", 502);
  }

  order.razorpayOrderId = razorpayOrder.id;
  await order.save();

  return ok(
    {
      message: "Order created, awaiting payment",
      order,
      razorpay: {
        orderId: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        keyId: process.env.RAZORPAY_KEY_ID,
      },
    },
    201
  );
}

export async function GET(request) {
  const { user: authUser, error } = await requireAuth(request);
  if (error) return error;

  await connectDB();

  const orders = await Order.find({
    userId: authUser._id,
  }).sort({ createdAt: -1 });

  return ok({ orders });
}
