
import mongoose from "mongoose";
import { requireAuth, ok, err } from "@/lib/apiHelpers";
import { connectDB } from "@/lib/db/mongoose";
import Order from "@/lib/models/Order";

export async function GET(request, { params }) {
    try {
        // Authenticate user
        const { user: authUser, error } = await requireAuth(request);
        if (error) return error;

        const { id } = await params;

        // Validate order ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return err("Invalid order ID", 400);
        }

        await connectDB();

        // Only fetch orders belonging to logged-in user
        const order = await Order.findOne({
            _id: id,
            userId: authUser._id,
        })
            .select("-razorpaySignature -couponUsageReleased -__v")
            .lean();

        if (!order) {
            return err("Order not found", 404);
        }

        // Format address according to your schema
        const formatAddress = (address) => {
            if (!address) return null;

            return {
                line1: address.line1 || "",
                line2: address.line2 || "",
                city: address.city || "",
                state: address.state || "",
                pincode: address.pincode || "",
                country: address.country || "India",
            };
        };

        const formattedOrder = {
            _id: order._id,
            items: order.items.map((item) => ({
                _id: item._id,
                productId: item.productId,
                name: item.name,
                image: item.image,
                price: item.price,
                qty: item.qty,
                category: item.category,
                totalPrice: (item.price || 0) * (item.qty || 0),
            })),

            // Customer information
            customer: {
                name: order.customerName || "",
                mobile: order.customerMobile || "",
                email: order.customerEmail || "",
            },

            // Addresses
            shippingAddress: formatAddress(order.shippingAddress),
            billingAddress: formatAddress(order.billingAddress),

            // Price information
            subtotal: order.subtotal || 0,
            shipping: order.shipping || 0,
            couponCode: order.couponCode || "",
            discount: order.discount || 0,
            total: order.total || 0,

            // Order status
            status: order.status,
            paymentStatus: order.paymentStatus,
            paymentMethod: order.paymentMethod,

            // Payment information
            razorpayOrderId: order.razorpayOrderId || "",
            razorpayPaymentId: order.razorpayPaymentId || "",

            // Additional information
            gstNumber: order.gstNumber || "",
            notes: order.notes || "",
            stockIssues: order.stockIssues || [],

            createdAt: order.createdAt,
            updatedAt: order.updatedAt,
        };

        return ok({ order: formattedOrder });
    } catch (error) {
        console.error("GET ORDER BY ID ERROR:", error);
        return err("Failed to fetch order details", 500);
    }
}
