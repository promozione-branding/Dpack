import { connectDB } from "@/lib/db/mongoose";
import Coupon from "@/lib/models/Coupon";
import { getCouponDiscount, getCouponError } from "@/lib/coupons";
import { ok, err } from "@/lib/apiHelpers";

export async function POST(request) {
  try {
    const body = await request.json();
    const code = typeof body?.code === "string" ? body.code.trim().toUpperCase() : "";
    const subtotal = Number(body?.subtotal);
    if (!code || !Number.isFinite(subtotal) || subtotal < 0) return err("Enter a coupon code and a valid order amount");

    await connectDB();
    const coupon = await Coupon.findOne({ code }).lean();
    const error = getCouponError(coupon, subtotal);
    if (error) return err(error, 400);

    return ok({
      coupon: {
        code: coupon.code,
        discount: getCouponDiscount(coupon, subtotal),
      },
    });
  } catch (error) {
    console.error("Coupon validation failed:", error);
    return err("Could not validate the coupon code", 500);
  }
}
