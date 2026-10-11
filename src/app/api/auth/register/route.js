import { connectDB } from "@/lib/db/mongoose";
import User from "@/lib/models/User";
import { hashPassword } from "@/lib/passwords";
import { signToken } from "@/lib/jwt";
import { ok, err } from "@/lib/apiHelpers";

export async function POST(request) {
  try {
    const body = await request.json();
    const name = typeof body?.name === "string" ? body.name.trim() : "";
    const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
    const mobile = typeof body?.mobile === "string" ? body.mobile.replace(/\D/g, "").slice(-10) : "";
    const password = typeof body?.password === "string" ? body.password : "";

    if (!name) return err("Name is required");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return err("Enter a valid email address");
    if (!/^\d{10}$/.test(mobile)) return err("Enter a valid 10-digit phone number");
    if (password.length < 8) return err("Password must be at least 8 characters");

    await connectDB();
    const existing = await User.findOne({ $or: [{ email }, { mobile }] }).select("+passwordHash");
    if (existing) {
      return err(existing.email === email ? "An account with this email already exists" : "An account with this phone number already exists", 409);
    }

    const user = await User.create({
      name,
      email,
      mobile,
      passwordHash: await hashPassword(password),
    });
    const token = signToken({ userId: user._id, role: user.role });

    return ok({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        role: user.role,
      },
    }, 201);
  } catch (error) {
    if (error?.code === 11000) return err("An account with this email or phone number already exists", 409);
    console.error("Account registration failed:", error);
    return err("Could not create your account", 500);
  }
}
