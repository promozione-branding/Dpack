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

export async function DELETE(request) {
  const { error } = await requireAdmin(request);
  if (error) return error;

  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get("orderId");

    if (!orderId) {
      return err("Order ID is required", 400);
    }

    await connectDB();

    const order = await Order.findById(orderId);

    if (!order) {
      return err("Order not found", 404);
    }

    // Protect paid orders from accidental deletion
    if (order.paymentStatus === "paid") {
      return err("Paid orders cannot be deleted", 403);
    }

    // Prevent deletion of orders with reserved coupon usage
    if (order.couponCode && !order.couponUsageReleased) {
      return err("Release coupon usage before deleting this order", 409);
    }

    await Order.findByIdAndDelete(orderId);

    return ok({
      message: "Order deleted successfully",
      orderId,
    });
  } catch (cause) {
    console.error("Admin order delete failed:", cause);
    return err("Failed to delete order", 500);
  }
}