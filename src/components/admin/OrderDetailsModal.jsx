
"use client";

import { useEffect } from "react";
import {
    X,
    ShoppingBag,
    UserRound,
    MapPin,
    CreditCard,
    Package,
    CalendarDays,
    Hash,
    Tag,
    Phone,
    Mail,
} from "lucide-react";

const STATUSES = [
    "pending",
    "confirmed",
    "shipped",
    "delivered",
    "cancelled",
];

const formatMoney = (value) =>
    `₹${Number(value || 0).toLocaleString("en-IN")}`;

const formatDate = (value) =>
    value
        ? new Date(value).toLocaleString("en-IN", {
            dateStyle: "medium",
            timeStyle: "short",
        })
        : "—";

const capitalize = (value) =>
    String(value || "pending").replace(/\b\w/g, (c) => c.toUpperCase());

function Info({ label, value }) {
    return (
        <div>
            <p className="text-xs text-gray-400">{label}</p>
            <p className="mt-1 break-words text-sm font-medium text-gray-800">
                {value || "—"}
            </p>
        </div>
    );
}

function Section({ icon: Icon, title, children }) {
    return (
        <section className="rounded-2xl border border-gray-100 bg-white p-5">
            <div className="mb-5 flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-rust">
                    <Icon size={18} />
                </div>
                <h3 className="font-semibold text-gray-900">{title}</h3>
            </div>
            {children}
        </section>
    );
}

export default function OrderDetailsModal({
    order,
    onClose,
    onUpdateStatus,
    savingId,
}) {
    useEffect(() => {
        if (!order) return;

        const handleEscape = (event) => {
            if (event.key === "Escape") onClose();
        };

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", handleEscape);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", handleEscape);
        };
    }, [order, onClose]);

    if (!order) return null;

    const address = order.shippingAddress || {};
    const orderId = String(order._id || "");
    const shortId = orderId.slice(-8).toUpperCase();

    const addressText = [
        address.line1 || address.addressLine1,
        address.line2 || address.addressLine2,
        address.city,
        address.state,
        address.pincode,
        address.country,
    ]
        .filter(Boolean)
        .join(", ");

    const items = order.items || [];

    const subtotal = items.reduce(
        (sum, item) =>
            sum +
            Number(item.price || 0) *
            Number(item.qty ?? item.quantity ?? 1),
        0
    );

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-3 backdrop-blur-sm sm:p-6"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) onClose();
            }}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="order-modal-title"
                className="flex max-h-[94vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl bg-[#f8f9fb] shadow-2xl"
            >
                {/* Header */}
                <div className="flex shrink-0 items-start justify-between gap-4 border-b border-gray-100 bg-white px-5 py-5 sm:px-7">
                    <div>
                        <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-gray-400">
                            <ShoppingBag size={14} />
                            Order Details
                        </div>

                        <h2
                            id="order-modal-title"
                            className="text-xl font-bold text-gray-900 sm:text-2xl"
                        >
                            Order #{shortId}
                        </h2>

                        <p className="mt-1 flex items-center gap-1.5 text-xs text-gray-500">
                            <CalendarDays size={13} />
                            Placed on {formatDate(order.createdAt)}
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        aria-label="Close order details"
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-600 transition hover:bg-gray-200"
                    >
                        <X size={19} />
                    </button>
                </div>

                {/* Scrollable content */}
                <div className="flex-1 space-y-5 overflow-y-auto p-4 sm:p-6">
                    {/* Summary */}
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                        {[
                            {
                                label: "Order Amount",
                                value: formatMoney(order.total),
                            },
                            {
                                label: "Payment",
                                value: capitalize(order.paymentStatus),
                            },
                            {
                                label: "Fulfillment",
                                value: capitalize(order.status),
                            },
                            {
                                label: "Total Items",
                                value: items.reduce(
                                    (sum, item) =>
                                        sum + Number(item.qty ?? item.quantity ?? 1),
                                    0
                                ),
                            },
                        ].map((stat) => (
                            <div
                                key={stat.label}
                                className="rounded-2xl border border-gray-100 bg-white p-4"
                            >
                                <p className="text-xs text-gray-400">{stat.label}</p>
                                <p className="mt-2 break-words text-base font-bold text-gray-900">
                                    {stat.value}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                        {/* Customer */}
                        <Section icon={UserRound} title="Customer Information">
                            <div className="space-y-4">
                                <Info
                                    label="Full Name"
                                    value={
                                        order.customerName ||
                                        order.userId?.name ||
                                        address.fullName
                                    }
                                />
                                <Info
                                    label="Email Address"
                                    value={
                                        order.customerEmail ||
                                        order.userId?.email
                                    }
                                />
                                <Info
                                    label="Mobile Number"
                                    value={
                                        order.customerMobile ||
                                        order.userId?.mobile ||
                                        address.mobile
                                    }
                                />
                            </div>
                        </Section>

                        {/* Address */}
                        <Section icon={MapPin} title="Shipping Address">
                            <div className="space-y-4">
                                <Info
                                    label="Recipient"
                                    value={
                                        address.fullName ||
                                        order.customerName ||
                                        order.userId?.name
                                    }
                                />
                                <Info
                                    label="Delivery Address"
                                    value={addressText || "No delivery address"}
                                />
                                <Info label="Postal Code" value={address.pincode} />
                                <Info label="Contact Number" value={address.mobile} />
                            </div>
                        </Section>
                    </div>

                    {/* Products */}
                    <Section icon={Package} title="Ordered Products">
                        <div className="space-y-3">
                            {items.length === 0 ? (
                                <p className="text-sm text-gray-400">
                                    No products available.
                                </p>
                            ) : (
                                items.map((item, index) => {
                                    const quantity = Number(
                                        item.qty ?? item.quantity ?? 1
                                    );

                                    return (
                                        <div
                                            key={item._id || index}
                                            className="flex items-start justify-between gap-4 rounded-xl border border-gray-100 bg-gray-50/70 p-4"
                                        >
                                            <div className="flex min-w-0 gap-3">
                                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-gray-400">
                                                    <Package size={22} />
                                                </div>

                                                <div className="min-w-0">
                                                    <p className="font-semibold text-gray-900">
                                                        {item.name || "Product"}
                                                    </p>

                                                    <p className="mt-1 text-xs text-gray-500">
                                                        Quantity: {quantity}
                                                    </p>

                                                    {(item.variant || item.size) && (
                                                        <p className="mt-1 text-xs text-gray-500">
                                                            Variant: {item.variant || item.size}
                                                        </p>
                                                    )}

                                                    {item.sku && (
                                                        <p className="mt-1 text-xs text-gray-400">
                                                            SKU: {item.sku}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="shrink-0 text-right">
                                                <p className="font-semibold text-gray-900">
                                                    {formatMoney(
                                                        Number(item.price || 0) * quantity
                                                    )}
                                                </p>
                                                <p className="mt-1 text-xs text-gray-400">
                                                    {formatMoney(item.price)} each
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </Section>

                    <div className="grid gap-5 md:grid-cols-2">
                        {/* Payment */}
                        <Section icon={CreditCard} title="Payment Details">
                            <div className="space-y-4">
                                <Info
                                    label="Payment Method"
                                    value={capitalize(order.paymentMethod || "—")}
                                />

                                <Info
                                    label="Payment Status"
                                    value={capitalize(order.paymentStatus)}
                                />

                                <Info
                                    label="Payment ID"
                                    value={
                                        order.razorpayPaymentId ||
                                        order.paymentId ||
                                        "—"
                                    }
                                />

                                <Info
                                    label="Order ID"
                                    value={orderId}
                                />
                            </div>
                        </Section>

                        {/* Price */}
                        <Section icon={Tag} title="Price Breakdown">
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between text-gray-500">
                                    <span>Items Subtotal</span>
                                    <span>{formatMoney(order.subtotal ?? subtotal)}</span>
                                </div>

                                {Number(order.discount || 0) > 0 && (
                                    <div className="flex justify-between text-green-700">
                                        <span>
                                            Discount
                                            {order.couponCode
                                                ? ` (${order.couponCode})`
                                                : ""}
                                        </span>
                                        <span>-{formatMoney(order.discount)}</span>
                                    </div>
                                )}

                                {order.shippingFee != null && (
                                    <div className="flex justify-between text-gray-500">
                                        <span>Shipping</span>
                                        <span>
                                            {Number(order.shippingFee) === 0
                                                ? "Free"
                                                : formatMoney(order.shippingFee)}
                                        </span>
                                    </div>
                                )}

                                {order.tax != null && (
                                    <div className="flex justify-between text-gray-500">
                                        <span>Tax</span>
                                        <span>{formatMoney(order.tax)}</span>
                                    </div>
                                )}

                                <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                                    <span className="font-bold text-gray-900">
                                        Grand Total
                                    </span>
                                    <span className="text-xl font-bold text-rust">
                                        {formatMoney(order.total)}
                                    </span>
                                </div>
                            </div>
                        </Section>
                    </div>

                    {/* Fulfillment */}
                    <Section icon={Hash} title="Order Fulfillment">
                        <div className="flex flex-wrap items-end justify-between gap-4">
                            <div>
                                <p className="mb-2 text-xs text-gray-400">
                                    Current Order Status
                                </p>
                                <span className="inline-flex rounded-full bg-orange-50 px-3 py-1.5 text-xs font-bold capitalize text-rust">
                                    {order.status || "pending"}
                                </span>
                            </div>

                            <div className="w-full sm:w-auto">
                                <label
                                    htmlFor="modal-order-status"
                                    className="mb-2 block text-xs text-gray-500"
                                >
                                    Update Fulfillment Status
                                </label>

                                <select
                                    id="modal-order-status"
                                    value={order.status || "pending"}
                                    disabled={savingId === order._id}
                                    onChange={(event) =>
                                        onUpdateStatus(order._id, event.target.value)
                                    }
                                    className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm font-medium capitalize outline-none focus:border-rust disabled:opacity-50 sm:min-w-48"
                                >
                                    {STATUSES.map((status) => (
                                        <option key={status} value={status}>
                                            {capitalize(status)}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </Section>
                </div>

                {/* Footer */}
                <div className="flex shrink-0 items-center justify-between gap-3 border-t border-gray-100 bg-white px-5 py-4 sm:px-7">
                    <p className="hidden text-xs text-gray-400 sm:block">
                        Order #{shortId}
                    </p>

                    <button
                        onClick={onClose}
                        className="ml-auto rounded-xl bg-gray-900 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-black"
                    >
                        Close Details
                    </button>
                </div>
            </div>
        </div>
    );
}
