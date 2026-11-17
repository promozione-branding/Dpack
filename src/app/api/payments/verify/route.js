import crypto from "crypto";
import { connectDB } from "@/lib/db/mongoose";
import User from "@/lib/models/User";
import Product from "@/lib/models/Product";
import Order from "@/lib/models/Order";
import Coupon from "@/lib/models/Coupon";
import { requireAuth, ok, err } from "@/lib/apiHelpers";

export async function POST(request) {
  const { user: authUser, error } = await requireAuth(request);
  if (error) return error;

  const { orderId, razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    await request.json();

  if (!orderId || !razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return err("Missing payment details");
  }

  await connectDB();

  const order = await Order.findOne({ _id: orderId, userId: authUser._id });
  if (!order) return err("Order not found", 404);
  if (order.paymentStatus === "paid") {

    return ok({ order });
  }
  if (order.razorpayOrderId !== razorpay_order_id) {
    return err("Order/payment mismatch", 400);
  }

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (
    expectedSignature.length !== razorpay_signature.length ||
    !crypto.timingSafeEqual(Buffer.from(expectedSignature), Buffer.from(razorpay_signature))
  ) {
    if (order.couponCode && !order.couponUsageReleased) {
      const releasedOrder = await Order.findOneAndUpdate(
        {
          _id: order._id,
          userId: authUser._id,
          paymentStatus: { $ne: "paid" },
          couponUsageReleased: { $ne: true },
        },
        {
          $set: {
            paymentStatus: "failed",
            status: "cancelled",
            couponUsageReleased: true,
          },
        },
        { new: true }
      );
      if (releasedOrder) {
        await Coupon.updateOne(
          { code: releasedOrder.couponCode, usedCount: { $gt: 0 } },
          { $inc: { usedCount: -1 } }
        );
      }
    } else {
      order.paymentStatus = "failed";
      await order.save();
    }
    return err("Payment verification failed", 400);
  }

  const claimed = await Order.findOneAndUpdate(
    { _id: order._id, userId: authUser._id, paymentStatus: { $ne: "paid" } },
    {
      $set: {
        paymentStatus: "paid",
        status: "confirmed",
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
      },
    },
    { new: true }
  );

  if (!claimed) {
    const existing = await Order.findById(order._id);
    return ok({ order: existing });
  }

  if (claimed.couponCode && claimed.couponUsageReleased) {
    await Coupon.updateOne({ code: claimed.couponCode }, { $inc: { usedCount: 1 } });
    claimed.couponUsageReleased = false;
    await claimed.save();
  }

  const stockIssues = [];
  for (const item of claimed.items) {
    const decremented = await Product.findOneAndUpdate(
      { _id: item.productId, trackInventory: true, stock: { $gte: item.qty } },
      { $inc: { stock: -item.qty } }
    );
    if (!decremented) {
      const product = await Product.findById(item.productId);
      let fulfilled = 0;
      const available = product?.trackInventory ? Math.max(0, product.stock) : item.qty;
      if (available > 0) {
        const partial = await Product.findOneAndUpdate(
          { _id: item.productId, trackInventory: true, stock: { $gte: available } },
          { $inc: { stock: -available } }
        );
        fulfilled = partial ? available : 0;
      }
      stockIssues.push({
        productId: item.productId,
        name: item.name,
        qtyRequested: item.qty,
        qtyFulfilled: fulfilled,
      });
    }
  }

  await User.findByIdAndUpdate(authUser._id, { $set: { cart: [] } });

  let finalOrder = claimed;
  if (stockIssues.length > 0) {
    finalOrder = await Order.findByIdAndUpdate(
      order._id,
      { $set: { stockIssues } },
      { new: true }
    );
  }


  const paidOrder = await Order.findOne({
    _id: finalOrder._id,
    userId: authUser._id,
    paymentStatus: "paid",
  });

  if (paidOrder) {
    try {
      const productNames = paidOrder.items
        .map((item) => `${item.name} (Qty: ${item.qty})`)
        .join(", ");

      const payload = {
        platform: "Dpack Shop - Order Created",
        supplierToken: "6a266629a0e54917311a8ce5",
        platformEmail: "info@dpacksolutions.com",
        name: paidOrder.customerName || "",
        phone: String(paidOrder.customerMobile || ""),
        email: paidOrder.customerEmail || "",
        place: [
          paidOrder.shippingAddress?.city,
          paidOrder.shippingAddress?.state,
          paidOrder.shippingAddress?.pincode,
        ].filter(Boolean).join(", "),
        product: productNames,
        priceRange: `₹${Number(paidOrder.total).toFixed(2)}`,
        message: [
          "New order on Dpack Shop",
          `Order ID: ${paidOrder._id}`,
          `Products: ${productNames}`,
          `Total Amount: ₹${paidOrder.total}`,
          `Payment ID: ${paidOrder.razorpayPaymentId || ""}`,
          "Payment Status: Paid",
        ].join("\n"),
      };

      const response = await fetch(
        "https://brandbnalo.com/api/form/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
          signal: AbortSignal.timeout(8000),
        }
      );

      console.log(
        "BrandBnalo:",
        response.status,
        await response.text()
      );
    } catch (error) {
      console.error("BrandBnalo error:", error);
    }
  }


  return ok({ message: "Payment verified, order confirmed", order: finalOrder });
}