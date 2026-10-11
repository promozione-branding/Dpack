import { connectDB } from "@/lib/db/mongoose";
import User from "@/lib/models/User";
import { verifyPassword } from "@/lib/passwords";
import { signToken } from "@/lib/jwt";
import { ok, err } from "@/lib/apiHelpers";

export async function POST(request) {
  try {
    const body = await request.json();
    const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
    const password = typeof body?.password === "string" ? body.password : "";
    if (!email || !password) return err("Email and password are required");

    await connectDB();
    const user = await User.findOne({ email }).select("+passwordHash");
    if (!user || !(await verifyPassword(password, user.passwordHash))) {
      return err("Invalid email or password", 401);
    }
    if (!user.isActive) return err("Account is disabled", 403);

    user.lastLoginAt = new Date();
    await user.save();
    const token = signToken({ userId: user._id, role: user.role });

    return ok({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        role: user.role,
        address: user.address,
        billingAddress: user.billingAddress,
        gstNumber: user.gstNumber,
      },
    });
  } catch (error) {
    console.error("Email login failed:", error);
    return err("Login failed", 500);
  }
}
