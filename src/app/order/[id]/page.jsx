
"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
    ArrowLeft,
    Package,
    Truck,
    CheckCircle2,
    Clock3,
    MapPin,
    CreditCard,
    ShoppingBag,
    AlertCircle,
    Loader2,
    CalendarDays,
    Hash,
    ChevronRight,
    XCircle,
    RotateCcw,
} from "lucide-react";
import { ordersAPI } from "@/lib/apiClient";

const steps = [
    { key: "pending", label: "Placed", icon: ShoppingBag },
    { key: "confirmed", label: "Confirmed", icon: CheckCircle2 },
    { key: "processing", label: "Processing", icon: Package },
    { key: "shipped", label: "Shipped", icon: Truck },
    { key: "delivered", label: "Delivered", icon: CheckCircle2 },
];

const formatMoney = (value) =>
    `₹${Number(value || 0).toLocaleString("en-IN")}`;

const formatDate = (value) => {
    if (!value) return "—";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "—";
    return date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
};

const capitalize = (value) =>
    String(value || "N/A")
        .replace(/_/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());

function SectionCard({ title, icon: Icon, children, action }) {
    return (
        <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
            <div className="flex items-center justify-between gap-3 border-b border-gray-100 px-5 py-4 sm:px-6">
                <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100">
                        <Icon size={18} className="text-gray-700" />
                    </div>
                    <h2 className="text-base font-semibold text-gray-900">
                        {title}
                    </h2>
                </div>
                {action}
            </div>
            <div className="p-5 sm:p-6">{children}</div>
        </section>
    );
}

function StatusBadge({ status }) {
    const styles = {
        pending: "bg-amber-50 text-amber-700 border-amber-200",
        confirmed: "bg-blue-50 text-blue-700 border-blue-200",
        processing: "bg-indigo-50 text-indigo-700 border-indigo-200",
        shipped: "bg-purple-50 text-purple-700 border-purple-200",
        delivered: "bg-green-50 text-green-700 border-green-200",
        cancelled: "bg-red-50 text-red-700 border-red-200",
        returned: "bg-orange-50 text-orange-700 border-orange-200",
    };

    return (
        <span
            className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${styles[status?.toLowerCase()] ||
                "border-gray-200 bg-gray-100 text-gray-700"
                }`}
        >
            <span className="mr-2 h-1.5 w-1.5 rounded-full bg-current" />
            {capitalize(status)}
        </span>
    );
}

function OrderProgress({ status }) {
    const currentStatus = status?.toLowerCase();
    const isCancelled = currentStatus === "cancelled";
    const isReturned = currentStatus === "returned";

    if (isCancelled || isReturned) {
        return (
            <div className="flex items-start gap-3 rounded-xl border border-red-100 bg-red-50 p-4">
                {isCancelled ? (
                    <XCircle className="mt-0.5 text-red-600" size={21} />
                ) : (
                    <RotateCcw className="mt-0.5 text-orange-600" size={21} />
                )}
                <div>
                    <p className="font-semibold text-gray-900">
                        Order {capitalize(currentStatus)}
                    </p>
                    <p className="mt-1 text-sm text-gray-600">
                        This order has been {currentStatus}.
                    </p>
                </div>
            </div>
        );
    }

    const currentIndex = steps.findIndex(
        (step) => step.key === currentStatus
    );

    return (
        <div className="overflow-x-auto pb-2">
            <div className="flex min-w-[480px] items-start">
                {steps.map((step, index) => {
                    const completed = currentIndex >= index;
                    const active = currentIndex === index;
                    const Icon = step.icon;

                    return (
                        <div
                            key={step.key}
                            className="relative flex flex-1 flex-col items-center text-center"
                        >
                            {index !== 0 && (
                                <div
                                    className={`absolute right-1/2 top-5 h-[2px] w-full ${currentIndex >= index
                                        ? "bg-gray-900"
                                        : "bg-gray-200"
                                        }`}
                                />
                            )}

                            <div
                                className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 ${completed
                                    ? "border-gray-900 bg-gray-900 text-white"
                                    : "border-gray-200 bg-white text-gray-400"
                                    }`}
                            >
                                <Icon size={17} />
                            </div>

                            <p
                                className={`mt-3 text-xs font-medium ${completed ? "text-gray-900" : "text-gray-400"
                                    }`}
                            >
                                {step.label}
                            </p>

                            {active && (
                                <span className="mt-1 text-[10px] font-medium text-green-600">
                                    Current
                                </span>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default function OrderDetailsPage() {
    const { id } = useParams();
    const router = useRouter();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!id) return;

        let cancelled = false;

        const fetchOrder = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await ordersAPI.getById(id);

                if (cancelled) return;

                if (response.success === false) {
                    throw new Error(
                        response.message || "Failed to fetch order"
                    );
                }

                const orderData = response.order || response.data;

                if (!orderData) {
                    throw new Error("Order not found");
                }

                setOrder(orderData);
            } catch (err) {
                if (!cancelled) {
                    console.error("Fetch order error:", err);
                    setError(err.message || "Something went wrong");
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        fetchOrder();

        return () => {
            cancelled = true;
        };
    }, [id]);

    if (loading) {
        return (
            <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 bg-gray-50">
                <Loader2 size={35} className="animate-spin text-gray-800" />
                <p className="text-sm text-gray-500">
                    Loading your order details...
                </p>
            </div>
        );
    }

    if (error || !order) {
        return (
            <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
                <AlertCircle size={44} className="mb-4 text-red-500" />
                <h2 className="text-xl font-semibold text-gray-900">
                    Unable to load order
                </h2>
                <p className="mt-2 max-w-md text-sm text-gray-500">
                    {error || "Order not found"}
                </p>
                <button
                    onClick={() => router.push("/orders")}
                    className="mt-6 rounded-xl bg-gray-900 px-6 py-3 text-sm font-medium text-white hover:bg-gray-800"
                >
                    Back to Orders
                </button>
            </div>
        );
    }

    const items = order.items || [];
    const address = order.shippingAddress || {};
    const payment = order.payment || {};

    // Adapt these fields to your actual Order schema.
    const subtotal = Number(order.subtotal ?? 0);
    const shipping = Number(order.shipping ?? 0);
    const discount = Number(order.discount ?? 0);
    const total = Number(order.total ?? 0);

    return (
        <main className="min-h-screen bg-[#F8F9FB] py-8 sm:py-12">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <div className="mb-7 flex items-center gap-2 text-sm text-gray-500">
                    <Link href="/" className="hover:text-gray-900">
                        Home
                    </Link>
                    <ChevronRight size={14} />
                    <Link href="/orders" className="hover:text-gray-900">
                        My Orders
                    </Link>
                    <ChevronRight size={14} />
                    <span className="font-medium text-gray-900">
                        Order Details
                    </span>
                </div>

                {/* Heading */}
                <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
                    <div>
                        <Link
                            href="/orders"
                            className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900"
                        >
                            <ArrowLeft size={16} />
                            Back to orders
                        </Link>

                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                            Order Details
                        </h1>

                        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-500">
                            <span className="flex items-center gap-2">
                                <Hash size={15} />
                                {order.orderNumber || order._id}
                            </span>

                            <span className="flex items-center gap-2">
                                <CalendarDays size={15} />
                                {formatDate(order.createdAt)}
                            </span>
                        </div>
                    </div>

                    <StatusBadge status={order.orderStatus || order.status} />
                </div>

                {/* Status Tracker */}
                <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-5 sm:p-7">
                    <div className="mb-7 flex items-center justify-between">
                        <div>
                            <h2 className="text-base font-semibold text-gray-900">
                                Order Status
                            </h2>
                            <p className="mt-1 text-xs text-gray-500">
                                Track your order progress
                            </p>
                        </div>
                        <Truck size={21} className="text-gray-400" />
                    </div>

                    <OrderProgress status={order.orderStatus || order.status} />
                </div>

                <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
                    {/* Left Column */}
                    <div className="space-y-6 lg:col-span-2">
                        {/* Products */}
                        <SectionCard title="Ordered Items" icon={ShoppingBag}>
                            <div className="divide-y divide-gray-100">
                                {items.length === 0 ? (
                                    <p className="text-sm text-gray-500">
                                        No product details available.
                                    </p>
                                ) : (
                                    items.map((item, index) => {
                                        const product = item.product || item.productId || {};
                                        const name =
                                            item.name ||
                                            item.productName ||
                                            product.name ||
                                            "Product";

                                        const image =
                                            item.image ||
                                            item.imageUrl ||
                                            product.images?.[0]?.url ||
                                            product.image ||
                                            "";

                                        const quantity = Number(item.qty || 1);
                                        const price = Number(item.price || 0);
                                        const itemTotal = price * quantity;

                                        return (
                                            <div
                                                key={item._id || index}
                                                className="flex gap-4 py-5 first:pt-0 last:pb-0"
                                            >
                                                <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
                                                    {image ? (
                                                        <img
                                                            src={image}
                                                            alt={name}
                                                            className="h-full w-full object-contain"
                                                        />
                                                    ) : (
                                                        <Package
                                                            size={30}
                                                            className="text-gray-300"
                                                        />
                                                    )}
                                                </div>

                                                <div className="flex min-w-0 flex-1 flex-col justify-between gap-2">
                                                    <div>
                                                        <h3 className="line-clamp-2 text-sm font-semibold text-gray-900 sm:text-base">
                                                            {name}
                                                        </h3>

                                                        {(item.variant || item.size) && (
                                                            <p className="mt-1 text-xs text-gray-500">
                                                                Variant:{" "}
                                                                {typeof (item.variant || item.size) === "object"
                                                                    ? item.variant?.size || "N/A"
                                                                    : item.variant || item.size}
                                                            </p>
                                                        )}

                                                        <p className="text-xs mt-2 text-gray-500">
                                                            Quantity: {quantity}
                                                        </p>

                                                        <p className="text-sm font-bold text-gray-900">
                                                            {formatMoney(itemTotal)}
                                                        </p>
                                                    </div>

                                                    <div className="flex items-center justify-between">
                                                        <p className="text-sm text-gray-500">
                                                            {formatMoney(price)} each
                                                        </p>
                                                        <p className="text-sm font-bold text-gray-900">
                                                            {formatMoney(price * quantity)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </SectionCard>

                        {/* Shipping Address */}
                        <SectionCard title="Shipping Address" icon={MapPin}>
                            <div className="space-y-3 text-sm">
                                <div>
                                    <p className="text-base font-semibold text-gray-900">
                                        {order.customer?.name || "N/A"}
                                    </p>

                                    <p className="mt-1 text-gray-600">
                                        {order.customer?.mobile || "N/A"}
                                    </p>

                                    {order.customer?.email && (
                                        <p className="mt-1 text-gray-600">
                                            {order.customer.email}
                                        </p>
                                    )}
                                </div>

                                <div className="border-t border-gray-100 pt-4">
                                    {order.shippingAddress ? (
                                        <p className="leading-7 text-gray-600">
                                            {[
                                                order.shippingAddress.line1,
                                                order.shippingAddress.line2,
                                                order.shippingAddress.city,
                                                order.shippingAddress.state,
                                                order.shippingAddress.pincode,
                                                order.shippingAddress.country,
                                            ]
                                                .filter(Boolean)
                                                .join(", ")}
                                        </p>
                                    ) : (
                                        <p className="text-gray-400">
                                            Shipping address not available
                                        </p>
                                    )}
                                </div>
                            </div>
                        </SectionCard>

                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        {/* Price Summary */}
                        <SectionCard title="Price Summary" icon={Package}>
                            <div className="space-y-4 text-sm">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>{formatMoney(subtotal)}</span>
                                </div>

                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span
                                        className={
                                            shipping === 0
                                                ? "font-medium text-green-600"
                                                : ""
                                        }
                                    >
                                        {shipping === 0
                                            ? "FREE"
                                            : formatMoney(shipping)}
                                    </span>
                                </div>

                                {discount > 0 && (
                                    <div className="flex justify-between text-green-600">
                                        <span>Discount</span>
                                        <span>-{formatMoney(discount)}</span>
                                    </div>
                                )}

                                <div className="border-t border-dashed border-gray-200 pt-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-base font-bold text-gray-900">
                                            Total Amount
                                        </span>
                                        <span className="text-xl font-bold text-gray-900">
                                            {formatMoney(total)}
                                        </span>
                                    </div>
                                    <p className="mt-1 text-xs text-gray-400">
                                        Inclusive of applicable taxes
                                    </p>
                                </div>
                            </div>
                        </SectionCard>

                        {/* Payment */}
                        <SectionCard title="Payment Details" icon={CreditCard}>
                            <div className="space-y-4 text-sm">
                                <div className="flex justify-between gap-3">
                                    <span className="text-gray-500">
                                        Payment Method
                                    </span>
                                    <span className="text-right font-medium text-gray-900">
                                        {capitalize(
                                            order.paymentMethod ||
                                            payment.method ||
                                            "N/A"
                                        )}
                                    </span>
                                </div>

                                <div className="flex justify-between gap-3">
                                    <span className="text-gray-500">
                                        Payment Status
                                    </span>
                                    <span
                                        className={`font-semibold ${order.paymentStatus === "paid"
                                            ? "text-green-600"
                                            : "text-amber-600"
                                            }`}
                                    >
                                        {capitalize(
                                            order.paymentStatus ||
                                            payment.status ||
                                            "Pending"
                                        )}
                                    </span>
                                </div>

                                {(order.paymentId || payment.transactionId) && (
                                    <div className="border-t border-gray-100 pt-4">
                                        <p className="mb-1 text-xs text-gray-500">
                                            Transaction ID
                                        </p>
                                        <p className="break-all text-xs font-medium text-gray-800">
                                            {order.paymentId || payment.transactionId}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </SectionCard>

                        {/* Help */}
                        <div className="rounded-2xl border border-gray-200 bg-white p-6">
                            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
                                <Clock3 size={19} className="text-gray-700" />
                            </div>
                            <h3 className="font-semibold text-gray-900">
                                Need help with your order?
                            </h3>
                            <p className="mt-2 text-sm leading-6 text-gray-500">
                                Have questions about your order? Our support team
                                is here to help.
                            </p>

                            <Link
                                href="/contact"
                                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-800 transition hover:bg-gray-50"
                            >
                                Contact Support
                                <ChevronRight size={16} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
