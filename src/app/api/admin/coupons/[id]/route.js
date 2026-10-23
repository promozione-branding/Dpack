import { connectDB } from "@/lib/db/mongoose";
import mongoose from "mongoose";
import Coupon from "@/lib/models/Coupon";
import Product from "@/lib/models/Product";
import { requireAdmin, ok, err } from "@/lib/apiHelpers";

export async function PATCH(request, { params }) {
  const { error } = await requireAdmin(request);
  if (error) return error;

  try {
    const { id } = await params;

    if (!mongoose.isValidObjectId(id)) {
      return err("Invalid coupon ID", 400);
    }

    const body = await request.json();

    const code =
      typeof body?.code === "string"
        ? body.code.trim().toUpperCase()
        : "";

    const discountType = body?.discountType;
    const discountValue = Number(body?.discountValue);
    const minimumOrder = Number(body?.minimumOrder ?? 0);

    const maxDiscount =
      body?.maxDiscount === "" || body?.maxDiscount == null
        ? null
        : Number(body.maxDiscount);

    const usageLimit =
      body?.usageLimit === "" || body?.usageLimit == null
        ? null
        : Number(body.usageLimit);

    const expiresAt = body?.expiresAt
      ? new Date(body.expiresAt)
      : null;

    const productIds = body?.productIds;

    if (!/^[A-Z0-9_-]{3,30}$/.test(code)) {
      return err(
        "Use 3–30 letters, numbers, hyphens or underscores for the code"
      );
    }

    if (!["percent", "fixed"].includes(discountType)) {
      return err("Choose a valid discount type");
    }

    if (
      !Number.isFinite(discountValue) ||
      discountValue <= 0 ||
      (discountType === "percent" && discountValue > 100)
    ) {
      return err("Enter a valid discount amount");
    }

    if (!Number.isFinite(minimumOrder) || minimumOrder < 0) {
      return err("Enter a valid minimum order amount");
    }

    if (
      maxDiscount !== null &&
      (!Number.isFinite(maxDiscount) || maxDiscount <= 0)
    ) {
      return err("Enter a valid maximum discount");
    }

    if (
      usageLimit !== null &&
      (!Number.isInteger(usageLimit) || usageLimit < 1)
    ) {
      return err("Usage limit must be a positive whole number");
    }

    if (expiresAt && Number.isNaN(expiresAt.getTime())) {
      return err("Enter a valid expiry date");
    }

    if (!Array.isArray(productIds)) {
      return err("Select valid products for this coupon");
    }

    if (productIds.some((productId) => !mongoose.isValidObjectId(productId))) {
      return err("One or more selected products are invalid");
    }

    await connectDB();

    const existingCoupon = await Coupon.findById(id);

    if (!existingCoupon) {
      return err("Coupon not found", 404);
    }

    const duplicateCoupon = await Coupon.findOne({
      code,
      _id: { $ne: id },
    }).lean();

    if (duplicateCoupon) {
      return err("A coupon with this code already exists", 409);
    }

    const uniqueProductIds = [
      ...new Set(productIds.map(String)),
    ];

    const activeProductCount = uniqueProductIds.length
      ? await Product.countDocuments({
          _id: { $in: uniqueProductIds },
          isActive: true,
        })
      : 0;

    if (activeProductCount !== uniqueProductIds.length) {
      return err("One or more selected products are unavailable");
    }

    existingCoupon.code = code;
    existingCoupon.discountType = discountType;
    existingCoupon.discountValue = discountValue;
    existingCoupon.minimumOrder = minimumOrder;
    existingCoupon.maxDiscount =
      discountType === "percent" ? maxDiscount : null;
    existingCoupon.productIds = uniqueProductIds;
    existingCoupon.usageLimit = usageLimit;
    existingCoupon.expiresAt = expiresAt;
    existingCoupon.isActive = body?.isActive !== false;

    await existingCoupon.save();

    return ok({ coupon: existingCoupon });
  } catch (cause) {
    if (cause?.code === 11000) {
      return err("A coupon with this code already exists", 409);
    }

    console.error("Admin coupon update failed:", cause);
    return err("Failed to update coupon", 500);
  }
}