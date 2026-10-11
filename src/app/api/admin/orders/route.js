import { connectDB } from "@/lib/db/mongoose";
import Order from "@/lib/models/Order";
import { requireAdmin, ok, err } from "@/lib/apiHelpers";

const ORDER_STATUSES = ["pending", "confirmed", "shipped", "delivered", "cancelled"];

export async function GET(request) {
  const { error } = await requireAdmin(request);
  if (error) return error;

  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, Number.parseInt(searchParams.get("page") || "1", 10) || 1);
    const limit = Math.min(100, Math.max(1, Number.parseInt(searchParams.get("limit") || "20", 10) || 20));
    const status = searchParams.get("status") || "";
    const query = {};
    if (ORDER_STATUSES.includes(status)) query.status = status;
    const [orders, total] = await Promise.all([
      Order.find(query)
        .populate("userId", "name email mobile")
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      Order.countDocuments(query),
    ]);
    return ok({ orders, total, page, limit });
  } catch (cause) {
    console.error("Admin order list failed:", cause);
    return err("Failed to fetch orders", 500);
  }
}

export async function PATCH(request) {
  const { error } = await requireAdmin(request);
  if (error) return error;

  try {
    const { orderId, status } = await request.json();
    if (!orderId || !ORDER_STATUSES.includes(status)) return err("Choose a valid order status");
    await connectDB();
    const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true, runValidators: true });
    if (!order) return err("Order not found", 404);
    return ok({ order });
  } catch (cause) {
    console.error("Admin order update failed:", cause);
    return err("Failed to update order", 500);
  }
}
