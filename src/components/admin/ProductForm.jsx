"use client";

import { useState } from "react";

const FIELDS = [
  { name: "overview", label: "Product overview" },
  { name: "keyFeatures", label: "Key features" },
  { name: "applications", label: "Applications" },
  { name: "specs", label: "Specifications" },
  { name: "sizes", label: "Available sizes" },
  { name: "extraImages", label: "Additional image URLs" },
];

function lines(value) {
  return Array.isArray(value) ? value.join("\n") : value || "";
}

function initialValues(product) {
  return {
    name: product?.name || "",
    slug: product?.slug || "",
    category: product?.category || "",
    description: product?.description || "",
    price: product?.price ?? "",
    compareAtPrice: product?.compareAtPrice ?? "",
    stock: product?.stock ?? 0,
    lowStockThreshold: product?.lowStockThreshold ?? 10,
    trackInventory: product?.trackInventory ?? true,
    featured: product?.featured ?? false,
    isActive: product?.isActive ?? true,
    youtubeUrl: product?.youtubeUrl || "",
    instagramUrl: product?.instagramUrl || "",
    metaTitle: product?.metaTitle || "",
    metaDescription: product?.metaDescription || "",
    ...Object.fromEntries(FIELDS.map(({ name }) => [name, lines(product?.[name])])),
  };
}

export default function ProductForm({ initial, onSubmit, loading, submitLabel }) {
  const [imageUrl, setImageUrl] = useState(initial?.image || "");
  const [imageFile, setImageFile] = useState(null);
  const [form, setForm] = useState(() => initialValues(initial));

  const setField = (name, value) =>
    setForm((current) => ({ ...current, [name]: value }));

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData();
    for (const [name, value] of Object.entries(form)) {
      if (FIELDS.some((field) => field.name === name)) {
        data.set(name, JSON.stringify(value.split("\n").map((item) => item.trim()).filter(Boolean)));
      } else {
        data.set(name, String(value));
      }
    }
    data.set("image", imageUrl);
    if (imageFile) data.set("imageFile", imageFile);
    onSubmit(data, Boolean(imageFile || imageUrl.trim()));
  };

  const inputClass =
    "mt-1 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-rust focus:ring-2 focus:ring-rust/20";
  const labelClass = "block text-sm font-medium text-gray-700";

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <section className="grid gap-4 sm:grid-cols-2">
        <label className={labelClass}>
          Product name *
          <input className={inputClass} required value={form.name} onChange={(e) => setField("name", e.target.value)} />
        </label>
        <label className={labelClass}>
          Slug
          <input className={inputClass} value={form.slug} onChange={(e) => setField("slug", e.target.value)} placeholder="Generated from product name if blank" />
        </label>
        <label className={labelClass}>
          Category *
          <input className={inputClass} required value={form.category} onChange={(e) => setField("category", e.target.value)} />
        </label>
        <label className={labelClass}>
          Price (₹) *
          <input className={inputClass} type="number" min="0" step="0.01" required value={form.price} onChange={(e) => setField("price", e.target.value)} />
        </label>
        <label className={labelClass}>
          Compare-at price (₹)
          <input className={inputClass} type="number" min="0" step="0.01" value={form.compareAtPrice} onChange={(e) => setField("compareAtPrice", e.target.value)} />
        </label>
        <label className={labelClass}>
          Main image URL
          <input className={inputClass} type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://…" />
        </label>
        <label className={`${labelClass} sm:col-span-2`}>
          Or upload a main image
          <input
            className={`${inputClass} file:mr-3 file:rounded-md file:border-0 file:bg-gray-100 file:px-3 file:py-1.5`}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          />
          {imageFile && <span className="mt-1 block text-xs text-gray-500">{imageFile.name}</span>}
        </label>
        <label className={`${labelClass} sm:col-span-2`}>
          Description *
          <textarea className={inputClass} rows={4} required value={form.description} onChange={(e) => setField("description", e.target.value)} />
        </label>
      </section>

      <section className="grid gap-4 border-t border-gray-100 pt-5 sm:grid-cols-2">
        <label className={labelClass}>
          Stock quantity
          <input className={inputClass} type="number" min="0" step="1" value={form.stock} onChange={(e) => setField("stock", e.target.value)} />
        </label>
        <label className={labelClass}>
          Low-stock threshold
          <input className={inputClass} type="number" min="0" step="1" value={form.lowStockThreshold} onChange={(e) => setField("lowStockThreshold", e.target.value)} />
        </label>
      </section>

      <section className="grid gap-4 border-t border-gray-100 pt-5 sm:grid-cols-2">
        {FIELDS.map(({ name, label }) => (
          <label key={name} className={labelClass}>
            {label}
            <textarea
              className={inputClass}
              rows={name === "extraImages" ? 2 : 3}
              value={form[name]}
              onChange={(e) => setField(name, e.target.value)}
              placeholder={name === "extraImages" ? "One URL per line" : "One item per line"}
            />
          </label>
        ))}
      </section>

      <section className="grid gap-4 border-t border-gray-100 pt-5 sm:grid-cols-2">
        <label className={labelClass}>
          YouTube URL
          <input className={inputClass} type="url" value={form.youtubeUrl || ""} onChange={(e) => setField("youtubeUrl", e.target.value)} />
        </label>
        <label className={labelClass}>
          Instagram URL
          <input className={inputClass} type="url" value={form.instagramUrl || ""} onChange={(e) => setField("instagramUrl", e.target.value)} />
        </label>
        <label className={labelClass}>
          Meta title
          <input className={inputClass} value={form.metaTitle || ""} onChange={(e) => setField("metaTitle", e.target.value)} />
        </label>
        <label className={labelClass}>
          Meta description
          <textarea className={inputClass} rows={2} value={form.metaDescription || ""} onChange={(e) => setField("metaDescription", e.target.value)} />
        </label>
      </section>

      <section className="flex flex-wrap gap-x-6 gap-y-3 border-t border-gray-100 pt-5">
        {[
          ["featured", "Featured product"],
          ["trackInventory", "Track inventory"],
          ["isActive", "Visible on storefront"],
        ].map(([name, label]) => (
          <label key={name} className="flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" checked={Boolean(form[name])} onChange={(e) => setField(name, e.target.checked)} className="h-4 w-4 rounded border-gray-300 accent-[#3d7a72]" />
            {label}
          </label>
        ))}
      </section>

      <div className="flex justify-end border-t border-gray-100 pt-5">
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-rust px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-rust/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Saving…" : submitLabel}
        </button>
      </div>
    </form>
  );
}
