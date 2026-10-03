import { connectDB } from "@/lib/db/mongoose";
import { ok, err } from "@/lib/apiHelpers";
import { signToken } from "@/lib/jwt";


export async function POST(request) {
  try {
    const body = await request.json();
    const username = typeof body?.username === "string" ? body.username.trim() : "";
    const password = typeof body?.password === "string" ? body.password : "";

    const validUsername = process.env.ADMIN_USERNAME?.trim();
    const validPassword = process.env.ADMIN_PASSWORD;

    if (!validUsername || !validPassword) {
      return err(
        "Admin login is not configured. Add ADMIN_USERNAME and ADMIN_PASSWORD to .env.local and restart the server.",
        503
      );
    }

    if (!process.env.MONGODB_URI) {
      return err("Database is not configured. Add MONGODB_URI to .env.local and restart the server.", 503);
    }

    if (username !== validUsername || password !== validPassword) {
      await new Promise((r) => setTimeout(r, 800));
      return err("Invalid username or password", 401);
    }

    await connectDB();

    const User = (await import("@/lib/models/User")).default;

    let admin = await User.findOne({ role: "admin" });
    if (!admin) {
      admin = await User.create({
        mobile: "0000000000",
        name: validUsername,
        role: "admin",
      });
    }

    const token = signToken({ userId: admin._id, role: "admin" });

    return ok({
      token,
      user: {
        id: admin._id,
        name: admin.name,
        mobile: admin.mobile,
        role: admin.role,
      },
    });
  } catch (e) {
    console.error("Admin login failed:", e);
    return err("Login failed", 500);
  }
}