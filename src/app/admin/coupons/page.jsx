"use client";

import { useCallback, useEffect, useState } from "react";
import { Percent, Plus, RefreshCw, Trash2 } from "lucide-react";
import { adminAPI } from "@/lib/apiClient";

const EMPTY_FORM = {
  code: "",
  discountType: "percent",
  discountValue: "",
  minimumOrder: "0",
  maxDiscount: "",
  usageLimit: "",
  expiresAt: "",
};

function discountLabel(coupon) {
  return coupon.discountType === "percent"
    ? `${coupon.discountValue}% off${coupon.maxDiscount ? ` (up to ₹${coupon.maxDiscount})` : ""}`
    : `₹${coupon.discountValue} off`;
}

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const result = await adminAPI.listCoupons();
      setCoupons(result.coupons);
    } catch (cause) {
      setError(cause.message || "Could not load coupons.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => { void load(); }, 0);
    return () => clearTimeout(timer);
  }, [load]);

  const submit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    setNotice("");
    try {
      await adminAPI.createCoupon({
        ...form,
        expiresAt: form.expiresAt ? new Date(form.expiresAt).toISOString() : null,
      });
      setForm(EMPTY_FORM);
      setNotice("Coupon created.");
      await load();
    } catch (cause) {
      setError(cause.message || "Could not create coupon.");
    } finally {
      setSaving(false);
    }
  };

  const toggleActive = async (coupon) => {
    setError("");
    try {
      await adminAPI.updateCoupon(coupon._id, { isActive: !coupon.isActive });
      await load();
    } catch (cause) {
      setError(cause.message || "Could not update coupon.");
    }
  };

  const remove = async (coupon) => {
    if (!window.confirm(`Delete coupon ${coupon.code}?`)) return;
    setError("");
    try {
      await adminAPI.deleteCoupon(coupon._id);
      await load();
    } catch (cause) {
      setError(cause.message || "Could not delete coupon.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Coupon codes</h1>
          <p className="mt-1 text-sm text-gray-500">Create, activate, and track checkout discounts.</p>
        </div>
        <button onClick={load} className="flex h-10 items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-600 hover:bg-gray-50">
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} /> Refresh
        </button>
      </div>

      {error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
      {notice && <p role="status" className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">{notice}</p>}

      <form onSubmit={submit} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="mb-5 flex items-center gap-2 font-semibold text-gray-900"><Plus className="h-4 w-4 text-rust" /> Create a coupon</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <label className="text-xs font-semibold text-gray-600">Coupon code
            <input required minLength={3} maxLength={30} pattern="[A-Za-z0-9_-]+" value={form.code} onChange={(event) => setForm({ ...form, code: event.target.value.toUpperCase() })} placeholder="WELCOME10" className="mt-1.5 h-10 w-full rounded-lg border border-gray-200 px-3 text-sm uppercase outline-none focus:border-rust" />
          </label>
          <label className="text-xs font-semibold text-gray-600">Discount type
            <select value={form.discountType} onChange={(event) => setForm({ ...form, discountType: event.target.value })} className="mt-1.5 h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm outline-none focus:border-rust">
              <option value="percent">Percentage</option><option value="fixed">Fixed amount</option>
            </select>
          </label>
          <label className="text-xs font-semibold text-gray-600">Discount {form.discountType === "percent" ? "(%)" : "(₹)"}
            <input required type="number" min="0.01" max={form.discountType === "percent" ? "100" : undefined} step="0.01" value={form.discountValue} onChange={(event) => setForm({ ...form, discountValue: event.target.value })} className="mt-1.5 h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-rust" />
          </label>
          <label className="text-xs font-semibold text-gray-600">Minimum order (₹)
            <input type="number" min="0" step="1" value={form.minimumOrder} onChange={(event) => setForm({ ...form, minimumOrder: event.target.value })} className="mt-1.5 h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-rust" />
          </label>
          {form.discountType === "percent" && <label className="text-xs font-semibold text-gray-600">Maximum discount (₹, optional)
            <input type="number" min="0.01" step="1" value={form.maxDiscount} onChange={(event) => setForm({ ...form, maxDiscount: event.target.value })} className="mt-1.5 h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-rust" />
          </label>}
          <label className="text-xs font-semibold text-gray-600">Usage limit (optional)
            <input type="number" min="1" step="1" value={form.usageLimit} onChange={(event) => setForm({ ...form, usageLimit: event.target.value })} className="mt-1.5 h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-rust" />
          </label>
          <label className="text-xs font-semibold text-gray-600">Expires (optional)
            <input type="datetime-local" value={form.expiresAt} onChange={(event) => setForm({ ...form, expiresAt: event.target.value })} className="mt-1.5 h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-rust" />
          </label>
        </div>
        <div className="mt-5 border-t border-gray-100 pt-4">
          <button
            disabled={saving}
            type="submit"
            className="flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#081A33] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#142b49] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5A623] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-52"
          >
            {saving ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Percent className="h-4 w-4" />}
            {saving ? "Creating…" : "Create coupon"}
          </button>
        </div>
      </form>

      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="border-b border-gray-100 px-5 py-4">
          <h2 className="font-semibold text-gray-900">Existing coupons <span className="ml-1 text-sm font-normal text-gray-400">({coupons.length})</span></h2>
        </div>
        {loading ? <div className="space-y-3 p-5">{[...Array(4)].map((_, index) => <div key={index} className="h-11 animate-pulse rounded bg-gray-100" />)}</div> : coupons.length === 0 ? (
          <div className="py-12 text-center text-sm text-gray-500">No coupons created yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-400">
                <tr><th className="px-5 py-3">Code</th><th className="px-4 py-3">Discount</th><th className="px-4 py-3">Minimum</th><th className="px-4 py-3">Usage</th><th className="px-4 py-3">Expires</th><th className="px-4 py-3">State</th><th className="px-4 py-3">Actions</th></tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {coupons.map((coupon) => (
                  <tr key={coupon._id}>
                    <td className="px-5 py-4 font-mono font-bold text-gray-900">{coupon.code}</td>
                    <td className="px-4 py-4 text-gray-700">{discountLabel(coupon)}</td>
                    <td className="px-4 py-4 text-gray-600">₹{Number(coupon.minimumOrder || 0).toLocaleString("en-IN")}</td>
                    <td className="px-4 py-4 text-gray-600">{coupon.usedCount || 0} / {coupon.usageLimit ?? "∞"}</td>
                    <td className="px-4 py-4 text-gray-500">{coupon.expiresAt ? new Date(coupon.expiresAt).toLocaleDateString("en-IN") : "Never"}</td>
                    <td className="px-4 py-4"><button onClick={() => toggleActive(coupon)} className={`rounded-full px-2.5 py-1 text-xs font-semibold ${coupon.isActive ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"}`}>{coupon.isActive ? "Active" : "Inactive"}</button></td>
                    <td className="px-4 py-4"><button onClick={() => remove(coupon)} aria-label={`Delete ${coupon.code}`} className="rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-600"><Trash2 className="h-4 w-4" /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
