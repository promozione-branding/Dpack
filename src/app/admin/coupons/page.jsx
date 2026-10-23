"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Check,
  Percent,
  Plus,
  RefreshCw,
  Search,
  Trash2,
  Pencil,
  X,
} from "lucide-react";
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
    ? `${coupon.discountValue}% off${
        coupon.maxDiscount ? ` (up to ₹${coupon.maxDiscount})` : ""
      }`
    : `₹${coupon.discountValue} off`;
}

function toDateTimeLocal(value) {
  if (!value) return "";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  const offset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
}

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState([]);
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const [productSearch, setProductSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [productError, setProductError] = useState("");
  const [notice, setNotice] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const result = await adminAPI.listCoupons();
      setCoupons(result.coupons || []);
    } catch (cause) {
      setError(cause.message || "Could not load coupons.");
    } finally {
      setLoading(false);
    }
  }, []);

  const loadProducts = useCallback(async () => {
    setProductsLoading(true);
    setProductError("");

    try {
      const pageSize = 200;

      const firstPage = await adminAPI.listProducts({
        page: 1,
        limit: pageSize,
        compact: true,
        activeOnly: true,
      });

      const allProducts = [...(firstPage.products || [])];
      const pageCount = Math.ceil((firstPage.total || 0) / pageSize);

      for (let page = 2; page <= pageCount; page++) {
        const result = await adminAPI.listProducts({
          page,
          limit: pageSize,
          compact: true,
          activeOnly: true,
        });

        allProducts.push(...(result.products || []));
      }

      setProducts(allProducts);
    } catch (cause) {
      setProductError(cause.message || "Could not load products.");
    } finally {
      setProductsLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      void load();
    }, 0);

    return () => clearTimeout(timer);
  }, [load]);

  useEffect(() => {
    const timer = setTimeout(() => {
      void loadProducts();
    }, 0);

    return () => clearTimeout(timer);
  }, [loadProducts]);

  const filteredProducts = products.filter((product) =>
    `${product.name || ""} ${product.category || ""}`
      .toLowerCase()
      .includes(productSearch.trim().toLowerCase())
  );

  const toggleProduct = (productId) => {
    setSelectedProductIds((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId]
    );
  };

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setSelectedProductIds([]);
    setProductSearch("");
    setEditingId(null);
  };

  const startEdit = (coupon) => {
    setError("");
    setNotice("");

    const productIds = (coupon.productIds || []).map((item) =>
      String(typeof item === "object" ? item._id : item)
    );

    setForm({
      code: coupon.code || "",
      discountType: coupon.discountType || "percent",
      discountValue: String(coupon.discountValue ?? ""),
      minimumOrder: String(coupon.minimumOrder ?? 0),
      maxDiscount: String(coupon.maxDiscount ?? ""),
      usageLimit: String(coupon.usageLimit ?? ""),
      expiresAt: toDateTimeLocal(coupon.expiresAt),
    });

    setSelectedProductIds(productIds);
    setProductSearch("");
    setEditingId(String(coupon._id));

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const submit = async (event) => {
    event.preventDefault();

    setSaving(true);
    setError("");
    setNotice("");

    try {
      const payload = {
        ...form,
        discountValue: Number(form.discountValue),
        minimumOrder: Number(form.minimumOrder || 0),
        maxDiscount: form.maxDiscount === "" ? null : Number(form.maxDiscount),
        usageLimit: form.usageLimit === "" ? null : Number(form.usageLimit),
        productIds: selectedProductIds,
        expiresAt: form.expiresAt
          ? new Date(form.expiresAt).toISOString()
          : null,
      };

      if (editingId) {
        await adminAPI.updateCoupon(editingId, payload);
        setNotice(`Coupon ${form.code} updated successfully.`);
      } else {
        await adminAPI.createCoupon(payload);
        setNotice(`Coupon ${form.code} created successfully.`);
      }

      resetForm();
      await load();
    } catch (cause) {
      setError(
        cause.message ||
          (editingId ? "Could not update coupon." : "Could not create coupon.")
      );
    } finally {
      setSaving(false);
    }
  };

  const toggleActive = async (coupon) => {
    setError("");
    setNotice("");

    try {
      await adminAPI.updateCoupon(coupon._id, {
        isActive: !coupon.isActive,
      });

      setNotice(
        `Coupon ${coupon.code} ${
          coupon.isActive ? "deactivated" : "activated"
        } successfully.`
      );

      await load();
    } catch (cause) {
      setError(cause.message || "Could not update coupon.");
    }
  };

  const remove = async (coupon) => {
    if (!window.confirm(`Delete coupon ${coupon.code}?`)) return;

    setError("");
    setNotice("");

    try {
      await adminAPI.deleteCoupon(coupon._id);

      if (editingId === String(coupon._id)) {
        resetForm();
      }

      setNotice(`Coupon ${coupon.code} deleted successfully.`);
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
          <p className="mt-1 text-sm text-gray-500">
            Create, edit, activate, and track checkout discounts.
          </p>
        </div>

        <button
          type="button"
          onClick={load}
          className="flex h-10 items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-600 hover:bg-gray-50"
        >
          <RefreshCw
            className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
          />
          Refresh
        </button>
      </div>

      {error && (
        <p
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </p>
      )}

      {notice && (
        <p
          role="status"
          className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
        >
          {notice}
        </p>
      )}

      {productError && (
        <p
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {productError}
        </p>
      )}

      <form
        onSubmit={submit}
        className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6"
      >
        <h2 className="mb-5 flex items-center gap-2 font-semibold text-gray-900">
          {editingId ? (
            <Pencil className="h-4 w-4 text-rust" />
          ) : (
            <Plus className="h-4 w-4 text-rust" />
          )}
          {editingId ? "Edit coupon" : "Create a coupon"}
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <label className="text-xs font-semibold text-gray-600">
            Coupon code
            <input
              required
              minLength={3}
              maxLength={30}
              pattern="[A-Za-z0-9_-]+"
              value={form.code}
              onChange={(event) =>
                setForm({ ...form, code: event.target.value.toUpperCase() })
              }
              placeholder="WELCOME10"
              className="mt-1.5 h-10 w-full rounded-lg border border-gray-200 px-3 text-sm uppercase outline-none focus:border-rust"
            />
          </label>

          <label className="text-xs font-semibold text-gray-600">
            Discount type
            <select
              value={form.discountType}
              onChange={(event) =>
                setForm({ ...form, discountType: event.target.value })
              }
              className="mt-1.5 h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm outline-none focus:border-rust"
            >
              <option value="percent">Percentage</option>
              <option value="fixed">Fixed amount</option>
            </select>
          </label>

          <label className="text-xs font-semibold text-gray-600">
            Discount {form.discountType === "percent" ? "(%)" : "(₹)"}
            <input
              required
              type="number"
              min="0.01"
              max={form.discountType === "percent" ? "100" : undefined}
              step="0.01"
              value={form.discountValue}
              onChange={(event) =>
                setForm({ ...form, discountValue: event.target.value })
              }
              className="mt-1.5 h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-rust"
            />
          </label>

          <label className="text-xs font-semibold text-gray-600">
            Minimum eligible subtotal (₹)
            <input
              type="number"
              min="0"
              step="1"
              value={form.minimumOrder}
              onChange={(event) =>
                setForm({ ...form, minimumOrder: event.target.value })
              }
              className="mt-1.5 h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-rust"
            />
          </label>

          {form.discountType === "percent" && (
            <label className="text-xs font-semibold text-gray-600">
              Maximum discount (₹, optional)
              <input
                type="number"
                min="0.01"
                step="1"
                value={form.maxDiscount}
                onChange={(event) =>
                  setForm({ ...form, maxDiscount: event.target.value })
                }
                className="mt-1.5 h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-rust"
              />
            </label>
          )}

          <label className="text-xs font-semibold text-gray-600">
            Usage limit (optional)
            <input
              type="number"
              min="1"
              step="1"
              value={form.usageLimit}
              onChange={(event) =>
                setForm({ ...form, usageLimit: event.target.value })
              }
              className="mt-1.5 h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-rust"
            />
          </label>

          <label className="text-xs font-semibold text-gray-600">
            Expires (optional)
            <input
              type="datetime-local"
              value={form.expiresAt}
              onChange={(event) =>
                setForm({ ...form, expiresAt: event.target.value })
              }
              className="mt-1.5 h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-rust"
            />
          </label>
        </div>

        <section className="mt-5 border-t border-gray-100 pt-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="text-sm font-semibold text-gray-800">
                Eligible products
              </h3>
              <p className="mt-1 text-xs text-gray-500">
                {selectedProductIds.length === 0
                  ? "No products selected — this coupon applies to all products."
                  : `Coupon applies to ${selectedProductIds.length} selected ${
                      selectedProductIds.length === 1 ? "product" : "products"
                    } only.`}
              </p>
            </div>

            {selectedProductIds.length > 0 && (
              <button
                type="button"
                onClick={() => setSelectedProductIds([])}
                className="text-xs font-semibold text-rust hover:underline"
              >
                Clear selection
              </button>
            )}
          </div>

          <label className="relative mt-3 block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              value={productSearch}
              onChange={(event) => setProductSearch(event.target.value)}
              placeholder="Search products by name or category"
              className="h-10 w-full rounded-lg border border-gray-200 pl-9 pr-3 text-sm outline-none focus:border-rust"
            />
          </label>

          <div className="mt-3 max-h-64 overflow-y-auto rounded-xl border border-gray-200">
            {productsLoading ? (
              <p className="p-4 text-sm text-gray-500">
                Loading active products…
              </p>
            ) : filteredProducts.length === 0 ? (
              <p className="p-4 text-sm text-gray-500">
                {products.length
                  ? "No products match your search."
                  : "No active products available."}
              </p>
            ) : (
              <ul className="divide-y divide-gray-100">
                {filteredProducts.map((product) => {
                  const id = String(product._id || product.id);
                  const selected = selectedProductIds.includes(id);

                  return (
                    <li key={id}>
                      <label className="flex cursor-pointer items-center gap-3 px-3 py-2.5 hover:bg-gray-50">
                        <input
                          type="checkbox"
                          checked={selected}
                          onChange={() => toggleProduct(id)}
                          className="h-4 w-4 rounded border-gray-300 accent-[#081A33]"
                        />

                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-medium text-gray-800">
                            {product.name}
                          </span>
                          <span className="block truncate text-xs text-gray-500">
                            {product.category || "Uncategorized"}
                          </span>
                        </span>

                        <span className="shrink-0 text-xs font-semibold text-gray-600">
                          ₹{Number(product.price || 0).toLocaleString("en-IN")}
                        </span>

                        {selected && (
                          <Check className="h-4 w-4 shrink-0 text-green-600" />
                        )}
                      </label>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </section>

        <div className="mt-5 flex flex-wrap gap-3 border-t border-gray-100 pt-4">
          <button
            disabled={saving || productsLoading || Boolean(productError)}
            type="submit"
            className="flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#081A33] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#142b49] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5A623] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-52"
          >
            {saving ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : editingId ? (
              <Check className="h-4 w-4" />
            ) : (
              <Percent className="h-4 w-4" />
            )}

            {saving
              ? editingId
                ? "Updating…"
                : "Creating…"
              : editingId
                ? "Update Coupon"
                : "Create Coupon"}
          </button>

          {editingId && (
            <button
              type="button"
              disabled={saving}
              onClick={resetForm}
              className="flex min-h-12 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-60"
            >
              <X className="h-4 w-4" />
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="border-b border-gray-100 px-5 py-4">
          <h2 className="font-semibold text-gray-900">
            Existing coupons{" "}
            <span className="ml-1 text-sm font-normal text-gray-400">
              ({coupons.length})
            </span>
          </h2>
        </div>

        {loading ? (
          <div className="space-y-3 p-5">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="h-11 animate-pulse rounded bg-gray-100"
              />
            ))}
          </div>
        ) : coupons.length === 0 ? (
          <div className="py-12 text-center text-sm text-gray-500">
            No coupons created yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-400">
                <tr>
                  <th className="px-5 py-3">Code</th>
                  <th className="px-4 py-3">Discount</th>
                  <th className="px-4 py-3">Minimum</th>
                  <th className="px-4 py-3">Usage</th>
                  <th className="px-4 py-3">Expires</th>
                  <th className="px-4 py-3">State</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-50">
                {coupons.map((coupon) => {
                  const isEditing = editingId === String(coupon._id);

                  return (
                    <tr
                      key={coupon._id}
                      className={isEditing ? "bg-amber-50/50" : ""}
                    >
                      <td className="px-5 py-4 font-mono font-bold text-gray-900">
                        {coupon.code}
                        {isEditing && (
                          <span className="mt-1 block font-sans text-xs font-medium text-amber-700">
                            Editing
                          </span>
                        )}
                      </td>

                      <td className="px-4 py-4 text-gray-700">
                        {discountLabel(coupon)}
                        <span className="mt-1 block text-xs text-gray-400">
                          {coupon.productIds?.length
                            ? `${coupon.productIds.length} selected products`
                            : "All products"}
                        </span>
                      </td>

                      <td className="px-4 py-4 text-gray-600">
                        ₹
                        {Number(coupon.minimumOrder || 0).toLocaleString(
                          "en-IN"
                        )}
                      </td>

                      <td className="px-4 py-4 text-gray-600">
                        {coupon.usedCount || 0} / {coupon.usageLimit ?? "∞"}
                      </td>

                      <td className="px-4 py-4 text-gray-500">
                        {coupon.expiresAt
                          ? new Date(coupon.expiresAt).toLocaleDateString(
                              "en-IN"
                            )
                          : "Never"}
                      </td>

                      <td className="px-4 py-4">
                        <button
                          type="button"
                          onClick={() => toggleActive(coupon)}
                          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                            coupon.isActive
                              ? "bg-green-50 text-green-700"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {coupon.isActive ? "Active" : "Inactive"}
                        </button>
                      </td>

                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => startEdit(coupon)}
                            aria-label={`Edit ${coupon.code}`}
                            title="Edit coupon"
                            className="inline-flex items-center gap-1.5 rounded-lg border border-blue-100 bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700 hover:bg-blue-100"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() => remove(coupon)}
                            aria-label={`Delete ${coupon.code}`}
                            title="Delete coupon"
                            className="rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}