import { connectDB } from "@/lib/db/mongoose";
import mongoose from "mongoose";
import Coupon from "@/lib/models/Coupon";
import Product from "@/lib/models/Product";
import { getCouponDiscount, getCouponError } from "@/lib/coupons";
import { ok, err } from "@/lib/apiHelpers";

export async function POST(request) {
  try {
    const body = await request.json();
    const code = typeof body?.code === "string" ? body.code.trim().toUpperCase() : "";
    const items = body?.items;
    if (
      !code ||
      !Array.isArray(items) ||
      items.length === 0 ||
      items.length > 100 ||
      items.some(
        (item) =>
          !mongoose.isValidObjectId(item?.productId) ||
          !Number.isInteger(Number(item?.qty)) ||
          Number(item.qty) < 1
      )
    ) {
      return err("Enter a coupon code and valid cart products");
    }

    await connectDB();
    const requestedIds = [...new Set(items.map((item) => String(item.productId)))];
    const products = await Product.find({
      _id: { $in: requestedIds },
      isActive: true,
    })
      .select("_id price")
      .lean();
    if (products.length !== requestedIds.length) {
      return err("One or more products in your cart are no longer available");
    }

    const quantityById = new Map();
    for (const item of items) {
      const id = String(item.productId);
      quantityById.set(id, (quantityById.get(id) || 0) + Number(item.qty));
    }

    const coupon = await Coupon.findOne({ code }).lean();
    const eligibleProductIds = new Set((coupon?.productIds || []).map(String));
    const matchingProducts = products.filter(
      (product) =>
        eligibleProductIds.size === 0 || eligibleProductIds.has(String(product._id))
    );
    const eligibleSubtotal = matchingProducts.reduce(
      (total, product) =>
        total + Number(product.price || 0) * quantityById.get(String(product._id)),
      0
    );
    const error = getCouponError(coupon, eligibleSubtotal, matchingProducts.length);
    if (error) return err(error, 400);

    return ok({
      coupon: {
        code: coupon.code,
        discount: getCouponDiscount(coupon, eligibleSubtotal),
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
