import mongoose from "mongoose";
import { connectDB } from "@/lib/db/mongoose";
import Otp from "@/lib/models/Otp";
import User from "@/lib/models/User";
import { requireAdmin, ok, err } from "@/lib/apiHelpers";

export async function DELETE(request, { params }) {
  const { error } = await requireAdmin(request);
  if (error) return error;

  try {
    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return err("Invalid user ID", 400);
    }

    await connectDB();
    const user = await User.findById(id);
    if (!user) return err("User not found", 404);
    if (user.role === "admin") {
      return err("Admin accounts cannot be deleted", 403);
    }

    await Otp.deleteMany({ mobile: user.mobile });
    await user.deleteOne();

    return ok({ message: "User deleted" });
  } catch (e) {
    console.error("ADMIN USER DELETE ERROR:", e);
    return err("Failed to delete user", 500);
  }
}
