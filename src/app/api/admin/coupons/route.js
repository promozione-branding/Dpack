import { connectDB } from "@/lib/db/mongoose";
import Coupon from "@/lib/models/Coupon";
import { requireAdmin, ok, err } from "@/lib/apiHelpers";

export async function GET(request) {
  const { error } = await requireAdmin(request);
  if (error) return error;

  try {
    await connectDB();
    const coupons = await Coupon.find().sort({ createdAt: -1 }).lean();
    return ok({ coupons });
  } catch (cause) {
    console.error("Admin coupon list failed:", cause);
    return err("Failed to fetch coupons", 500);
  }
}

export async function POST(request) {
  const { error } = await requireAdmin(request);
  if (error) return error;

  try {
    const body = await request.json();
    const code = typeof body?.code === "string" ? body.code.trim().toUpperCase() : "";
    const discountType = body?.discountType;
    const discountValue = Number(body?.discountValue);
    const minimumOrder = Number(body?.minimumOrder ?? 0);
    const maxDiscount = body?.maxDiscount === "" || body?.maxDiscount == null ? null : Number(body.maxDiscount);
    const usageLimit = body?.usageLimit === "" || body?.usageLimit == null ? null : Number(body.usageLimit);
    const expiresAt = body?.expiresAt ? new Date(body.expiresAt) : null;

    if (!/^[A-Z0-9_-]{3,30}$/.test(code)) return err("Use 3–30 letters, numbers, hyphens or underscores for the code");
    if (!["percent", "fixed"].includes(discountType)) return err("Choose a valid discount type");
    if (!Number.isFinite(discountValue) || discountValue <= 0 || (discountType === "percent" && discountValue > 100)) return err("Enter a valid discount amount");
    if (!Number.isFinite(minimumOrder) || minimumOrder < 0) return err("Enter a valid minimum order amount");
    if (maxDiscount !== null && (!Number.isFinite(maxDiscount) || maxDiscount <= 0)) return err("Enter a valid maximum discount");
    if (usageLimit !== null && (!Number.isInteger(usageLimit) || usageLimit < 1)) return err("Usage limit must be a positive whole number");
    if (expiresAt && Number.isNaN(expiresAt.getTime())) return err("Enter a valid expiry date");

    await connectDB();
    const coupon = await Coupon.create({
      code,
      discountType,
      discountValue,
      minimumOrder,
      maxDiscount: discountType === "percent" ? maxDiscount : null,
      usageLimit,
      expiresAt,
      isActive: body?.isActive !== false,
    });
    return ok({ coupon }, 201);
  } catch (cause) {
    if (cause?.code === 11000) return err("A coupon with this code already exists", 409);
    console.error("Admin coupon creation failed:", cause);
    return err("Failed to create coupon", 500);
  }
}
