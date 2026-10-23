
import mongoose from "mongoose";
import { connectDB } from "@/lib/db/mongoose";
import Coupon from "@/lib/models/Coupon";
import Product from "@/lib/models/Product";
import { getCouponDiscount, getCouponError } from "@/lib/coupons";
import { ok, err } from "@/lib/apiHelpers";

export async function POST(request) {
  try {
    const body = await request.json();

    const code =
      typeof body?.code === "string"
        ? body.code.trim().toUpperCase()
        : "";

    const items = body?.items;

    if (!code) {
      return err("Please enter a coupon code", 400);
    }

    if (
      !Array.isArray(items) ||
      items.length === 0 ||
      items.length > 100
    ) {
      return err("Your cart is empty or invalid", 400);
    }

    // Support different cart product ID field names.
    const normalizedItems = [];

    for (const item of items) {
      const rawProductId =
        item?.productId ??
        item?._id ??
        item?.id ??
        item?.product?._id ??
        item?.product?.id;

      const productId =
        rawProductId && typeof rawProductId === "object"
          ? String(rawProductId._id ?? rawProductId.id ?? "")
          : String(rawProductId ?? "");

      const qty = Number(item?.qty ?? item?.quantity ?? 1);

      if (
        !mongoose.isValidObjectId(productId) ||
        !Number.isInteger(qty) ||
        qty < 1 ||
        qty > 10000
      ) {
        return err(
          "Cart product information is invalid. Please refresh your cart and try again.",
          400
        );
      }

      normalizedItems.push({
        productId,
        qty,
      });
    }

    await connectDB();

    // Combine duplicate product IDs.
    const quantityById = new Map();

    for (const item of normalizedItems) {
      const id = String(item.productId);

      quantityById.set(
        id,
        (quantityById.get(id) || 0) + item.qty
      );
    }

    const requestedIds = [...quantityById.keys()];

    // Always use current database prices, not prices sent by the browser.
    const products = await Product.find({
      _id: { $in: requestedIds },
      isActive: true,
    })
      .select("_id price")
      .lean();

    if (products.length !== requestedIds.length) {
      return err(
        "One or more products in your cart are no longer available.",
        400
      );
    }

    const coupon = await Coupon.findOne({
      code,
    }).lean();

    if (!coupon) {
      return err("Invalid coupon code", 400);
    }

    const eligibleProductIds = new Set(
      (coupon.productIds || []).map((item) =>
        String(
          item && typeof item === "object"
            ? item._id ?? item.id ?? item
            : item
        )
      )
    );

    // An empty productIds list means the coupon applies to all products.
    const matchingProducts = products.filter((product) => {
      return (
        eligibleProductIds.size === 0 ||
        eligibleProductIds.has(String(product._id))
      );
    });

    if (matchingProducts.length === 0) {
      return err(
        "This coupon is not applicable to the products in your cart.",
        400
      );
    }

    // Calculate eligible product subtotal only.
    // Shipping is deliberately excluded from this calculation.
    const eligibleSubtotal = matchingProducts.reduce(
      (total, product) => {
        const qty = quantityById.get(String(product._id)) || 0;
        const price = Number(product.price || 0);

        return total + price * qty;
      },
      0
    );

    const error = getCouponError(
      coupon,
      eligibleSubtotal,
      matchingProducts.length
    );

    if (error) {
      return err(error, 400);
    }

    const discount = Math.min(
      eligibleSubtotal,
      Math.max(
        0,
        Number(getCouponDiscount(coupon, eligibleSubtotal)) || 0
      )
    );

    return ok({
      coupon: {
        _id: String(coupon._id),
        code: coupon.code,
        discount,
        eligibleSubtotal,
        eligibleProductCount: matchingProducts.length,
        productRestricted: eligibleProductIds.size > 0,
      },
    });
  } catch (error) {
    console.error("Coupon validation failed:", error);

    return err("Could not validate the coupon code", 500);
  }
}
