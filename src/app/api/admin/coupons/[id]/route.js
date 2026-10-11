import { connectDB } from "@/lib/db/mongoose";
import Coupon from "@/lib/models/Coupon";
import { requireAdmin, ok, err } from "@/lib/apiHelpers";

export async function PATCH(request, { params }) {
  const { error } = await requireAdmin(request);
  if (error) return error;

  try {
    const { id } = await params;
    const body = await request.json();
    if (typeof body?.isActive !== "boolean") return err("An active state is required");
    await connectDB();
    const coupon = await Coupon.findByIdAndUpdate(id, { isActive: body.isActive }, { new: true });
    if (!coupon) return err("Coupon not found", 404);
    return ok({ coupon });
  } catch (cause) {
    console.error("Admin coupon update failed:", cause);
    return err("Failed to update coupon", 500);
  }
}

export async function DELETE(request, { params }) {
  const { error } = await requireAdmin(request);
  if (error) return error;

  try {
    const { id } = await params;
    await connectDB();
    const coupon = await Coupon.findByIdAndDelete(id);
    if (!coupon) return err("Coupon not found", 404);
    return ok({ message: "Coupon deleted" });
  } catch (cause) {
    console.error("Admin coupon deletion failed:", cause);
    return err("Failed to delete coupon", 500);
  }
}
