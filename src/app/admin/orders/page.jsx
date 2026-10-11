"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, RefreshCw, ShoppingBag } from "lucide-react";
import { adminAPI } from "@/lib/apiClient";

const STATUSES = ["pending", "confirmed", "shipped", "delivered", "cancelled"];

function formatMoney(value) {
  return `₹${Number(value || 0).toLocaleString("en-IN")}`;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [savingId, setSavingId] = useState("");
  const limit = 20;

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const result = await adminAPI.listOrders({ page, limit, ...(statusFilter ? { status: statusFilter } : {}) });
      setOrders(result.orders);
      setTotal(result.total);
    } catch (cause) {
      setError(cause.message || "Could not load orders.");
    } finally {
      setLoading(false);
    }
  }, [page, statusFilter]);

  useEffect(() => {
    const timer = setTimeout(() => { void load(); }, 0);
    return () => clearTimeout(timer);
  }, [load]);

  const updateStatus = async (orderId, status) => {
    setSavingId(orderId);
    setError("");
    try {
      await adminAPI.updateOrder(orderId, status);
      await load();
    } catch (cause) {
      setError(cause.message || "Could not update order.");
    } finally {
      setSavingId("");
    }
  };

  const totalPages = Math.max(1, Math.ceil(total / limit));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
          <p className="mt-1 text-sm text-gray-500">Review payments, customer details, and fulfillment status.</p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(event) => { setPage(1); setStatusFilter(event.target.value); }}
            className="h-10 rounded-xl border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none focus:border-rust"
            aria-label="Filter orders by status"
          >
            <option value="">All statuses</option>
            {STATUSES.map((status) => <option key={status} value={status}>{status}</option>)}
          </select>
          <button onClick={load} className="flex h-10 items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-600 hover:bg-gray-50">
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>
      </div>

      {error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        {loading ? (
          <div className="space-y-3 p-6">{[...Array(6)].map((_, index) => <div key={index} className="h-12 animate-pulse rounded-lg bg-gray-100" />)}</div>
        ) : orders.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-16 text-center">
            <ShoppingBag className="h-10 w-10 text-gray-300" />
            <p className="font-medium text-gray-700">No orders found</p>
            <p className="text-sm text-gray-400">Orders will appear here when customers check out.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px] text-left text-sm">
              <thead className="border-b border-gray-100 bg-gray-50 text-xs uppercase tracking-wide text-gray-400">
                <tr>
                  <th className="px-5 py-3">Order</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Items</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Payment</th>
                  <th className="px-4 py-3">Placed</th>
                  <th className="px-4 py-3">Fulfillment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {orders.map((order) => (
                  <tr key={order._id} className="align-top hover:bg-gray-50/60">
                    <td className="px-5 py-4">
                      <p className="font-mono text-xs font-semibold text-gray-800">#{String(order._id).slice(-8).toUpperCase()}</p>
                      {order.couponCode && <p className="mt-1 text-xs text-green-700">{order.couponCode} −{formatMoney(order.discount)}</p>}
                    </td>
                    <td className="px-4 py-4">
                      <p className="font-semibold text-gray-900">{order.customerName || order.userId?.name || "Customer"}</p>
                      <p className="mt-1 text-xs text-gray-500">{order.customerEmail || order.userId?.email || "—"}</p>
                      <p className="text-xs text-gray-500">{order.customerMobile || order.userId?.mobile || "—"}</p>
                      <p className="mt-1 max-w-56 text-xs text-gray-400">
                        {[order.shippingAddress?.line1, order.shippingAddress?.city, order.shippingAddress?.state, order.shippingAddress?.pincode].filter(Boolean).join(", ") || "No delivery address"}
                      </p>
                    </td>
                    <td className="px-4 py-4 text-gray-600">
                      <p>{order.items?.length || 0} product type(s)</p>
                      <p className="mt-1 max-w-52 truncate text-xs text-gray-400">{order.items?.map((item) => `${item.name} × ${item.qty}`).join(", ")}</p>
                    </td>
                    <td className="px-4 py-4 font-semibold text-gray-900">{formatMoney(order.total)}</td>
                    <td className="px-4 py-4">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${order.paymentStatus === "paid" ? "bg-green-50 text-green-700" : order.paymentStatus === "failed" ? "bg-red-50 text-red-700" : "bg-amber-50 text-amber-700"}`}>
                        {order.paymentStatus || "pending"}
                      </span>
                      <p className="mt-1 text-xs text-gray-400">{order.paymentMethod || "—"}</p>
                    </td>
                    <td className="px-4 py-4 text-xs text-gray-500">{new Date(order.createdAt).toLocaleString("en-IN")}</td>
                    <td className="px-4 py-4">
                      <select
                        value={order.status}
                        onChange={(event) => updateStatus(order._id, event.target.value)}
                        disabled={savingId === order._id}
                        aria-label={`Update order ${String(order._id).slice(-8)} status`}
                        className="rounded-lg border border-gray-200 bg-white px-2.5 py-2 text-xs font-semibold capitalize text-gray-700 outline-none focus:border-rust disabled:opacity-50"
                      >
                        {STATUSES.map((status) => <option key={status} value={status}>{status}</option>)}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {total > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">{(page - 1) * limit + 1}–{Math.min(page * limit, total)} of {total} orders</p>
          <div className="flex items-center gap-2">
            <button onClick={() => setPage((current) => Math.max(1, current - 1))} disabled={page === 1} aria-label="Previous page" className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 disabled:opacity-40"><ChevronLeft className="h-4 w-4" /></button>
            <span className="text-sm text-gray-600">{page} / {totalPages}</span>
            <button onClick={() => setPage((current) => Math.min(totalPages, current + 1))} disabled={page >= totalPages} aria-label="Next page" className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 disabled:opacity-40"><ChevronRight className="h-4 w-4" /></button>
          </div>
        </div>
      )}
    </div>
  );
}
