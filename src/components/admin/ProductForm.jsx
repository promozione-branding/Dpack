"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import "jodit/es2021/jodit.min.css";
import { organizeProductFields } from "@/lib/productContent";
import { Plus, Trash2, Star } from "lucide-react";

const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
});

/* =========================================================
   FIELDS (text arrays — sizes handled via variants now)
========================================================= */

const FIELDS = [
  { name: "overview", label: "Product overview" },
  { name: "keyFeatures", label: "Key features" },
  { name: "applications", label: "Applications" },
  { name: "extraImages", label: "Additional image URLs" },
];

/* =========================================================
   HELPERS
========================================================= */

function lines(value) {
  return Array.isArray(value) ? value.join("\n") : value || "";
}

function emptyVariant(isDefault = false) {
  return {
    size: "",
    price: "",
    compareAtPrice: "",
    stock: "0",
    sku: "",
    weight: "",
    isDefault,
  };
}

function buildInitialVariants(product) {
  if (product?.variants?.length) {
    return product.variants.map((v) => ({
      size: v.size || "",
      price: v.price != null ? String(v.price) : "",
      compareAtPrice:
        v.compareAtPrice != null ? String(v.compareAtPrice) : "",
      stock: v.stock != null ? String(v.stock) : "0",
      sku: v.sku || "",
      weight: v.weight != null ? String(v.weight) : "",
      isDefault: Boolean(v.isDefault),
    }));
  }

  // Migrate old sizes[] + single price → variants
  if (product?.sizes?.length) {
    return product.sizes.map((s, i) => ({
      size: s,
      price:
        i === 0 && product.price != null ? String(product.price) : "",
      compareAtPrice:
        i === 0 && product.compareAtPrice != null
          ? String(product.compareAtPrice)
          : "",
      stock: i === 0 ? String(product.stock ?? 0) : "0",
      sku: "",
      weight: "",
      isDefault: i === 0,
    }));
  }

  return [];
}

function initialValues(product) {
  const organizedFields = organizeProductFields(product);

  return {
    name: product?.name || "",
    slug: product?.slug || "",
    category: product?.category || "",

    shortDescription: product?.shortDescription || "",

    description:
      organizedFields.description ?? product?.description ?? "",

    specs: lines(organizedFields.specs || product?.specs),

    // Used only when there are NO variants
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

    ...Object.fromEntries(
      FIELDS.map(({ name }) => [
        name,
        lines(organizedFields[name] || product?.[name]),
      ])
    ),
  };
}

/* =========================================================
   JODIT EDITOR
========================================================= */

function RichTextEditor({
  value,
  onChange,
  placeholder,
  minHeight = "150px",
}) {
  const config = useMemo(
    () => ({
      readonly: false,
      height: minHeight,
      minHeight: parseInt(minHeight, 10) || 150,
      placeholder: placeholder || "Write your content...",
      toolbarAdaptive: false,
      toolbarSticky: false,
      showCharsCounter: false,
      showWordsCounter: false,
      showXPathInStatusbar: false,
      buttons: [
        "bold",
        "italic",
        "underline",
        "|",
        "ul",
        "ol",
        "|",
        "paragraph",
        "fontsize",
        "|",
        "left",
        "center",
        "right",
        "justify",
        "|",
        "link",
        "|",
        "undo",
        "redo",
        "|",
        "eraser",
        "source",
      ],
      buttonsMD: [
        "bold",
        "italic",
        "underline",
        "|",
        "ul",
        "ol",
        "|",
        "paragraph",
        "|",
        "link",
        "|",
        "undo",
        "redo",
        "|",
        "eraser",
      ],
      buttonsSM: [
        "bold",
        "italic",
        "underline",
        "|",
        "ul",
        "ol",
        "|",
        "link",
        "|",
        "undo",
        "redo",
      ],
      askBeforePasteHTML: false,
      askBeforePasteFromWord: false,
      processPasteHTML: true,
      defaultActionOnPaste: "insert_clear_html",
      enter: "P",
      cleanHTML: {
        fillEmptyParagraph: false,
      },
      style: {
        fontSize: "14px",
        color: "#374151",
      },
    }),
    [minHeight, placeholder]
  );

  return (
    <div className="mt-1 overflow-hidden rounded-lg border border-gray-200 bg-white focus-within:border-rust focus-within:ring-2 focus-within:ring-rust/20">
      <JoditEditor
        value={value || ""}
        // config={config}
        onBlur={(newContent) => {
          onChange(newContent);
        }}
        onChange={(newContent) => {
          onChange(newContent);
        }}
      />
    </div>
  );
}

/* =========================================================
   PRODUCT FORM
========================================================= */

function ProductForm({ initial, onSubmit, loading, submitLabel }) {
  const [imageUrl, setImageUrl] = useState(initial?.image || "");
  const [imageFile, setImageFile] = useState(null);

  const [form, setForm] = useState(() => initialValues(initial));
  const [variants, setVariants] = useState(() =>
    buildInitialVariants(initial)
  );

  const hasVariants = variants.length > 0;

  const setField = (name, value) => {
    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const updateVariant = (index, field, value) => {
    setVariants((prev) =>
      prev.map((v, i) => (i === index ? { ...v, [field]: value } : v))
    );
  };

  const setDefaultVariant = (index) => {
    setVariants((prev) =>
      prev.map((v, i) => ({ ...v, isDefault: i === index }))
    );
  };

  const addVariant = () => {
    setVariants((prev) => [
      ...prev,
      emptyVariant(prev.length === 0),
    ]);
  };

  const removeVariant = (index) => {
    setVariants((prev) => {
      const next = prev.filter((_, i) => i !== index);
      if (next.length && !next.some((v) => v.isDefault)) {
        next[0] = { ...next[0], isDefault: true };
      }
      return next;
    });
  };

  /* =======================================================
     SUBMIT
  ====================================================== */

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData();

    const arrayFieldNames = new Set([
      ...FIELDS.map((f) => f.name),
      "specs",
    ]);

    for (const [name, value] of Object.entries(form)) {
      // Skip single price/stock when variants exist — server uses variants
      if (
        hasVariants &&
        (name === "price" ||
          name === "compareAtPrice" ||
          name === "stock")
      ) {
        continue;
      }

      if (arrayFieldNames.has(name)) {
        data.set(
          name,
          JSON.stringify(
            String(value || "")
              .split("\n")
              .map((item) => item.trim())
              .filter(Boolean)
          )
        );
      } else {
        data.set(name, String(value ?? ""));
      }
    }

    // Variants
    const cleanedVariants = variants
      .filter((v) => v.size.trim() && v.price !== "")
      .map((v) => ({
        size: v.size.trim(),
        price: Number(v.price),
        compareAtPrice:
          v.compareAtPrice === "" || v.compareAtPrice == null
            ? null
            : Number(v.compareAtPrice),
        stock: Number(v.stock || 0),
        sku: v.sku?.trim() || null,
        weight:
          v.weight === "" || v.weight == null
            ? null
            : Number(v.weight),
        isDefault: Boolean(v.isDefault),
      }));

    data.set("variants", JSON.stringify(cleanedVariants));

    // sizes synced from variants (backward compatible)
    data.set(
      "sizes",
      JSON.stringify(cleanedVariants.map((v) => v.size))
    );

    // When variants exist, still send base price from default for listing
    if (cleanedVariants.length > 0) {
      const def =
        cleanedVariants.find((v) => v.isDefault) || cleanedVariants[0];
      data.set("price", String(def.price));
      if (def.compareAtPrice != null) {
        data.set("compareAtPrice", String(def.compareAtPrice));
      }
      data.set(
        "stock",
        String(
          cleanedVariants.reduce((sum, v) => sum + (v.stock || 0), 0)
        )
      );
    }

    data.set("image", imageUrl);

    if (imageFile) {
      data.set("imageFile", imageFile);
    }

    onSubmit(data, Boolean(imageFile || imageUrl.trim()));
  };

  const inputClass =
    "mt-1 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-rust focus:ring-2 focus:ring-rust/20";

  const labelClass = "block text-sm font-medium text-gray-700";

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
    >
      {/* =====================================================
         BASIC INFORMATION
      ====================================================== */}

      <section className="grid gap-4 sm:grid-cols-2">
        <label className={labelClass}>
          Product name *
          <input
            className={inputClass}
            required
            value={form.name}
            onChange={(e) => setField("name", e.target.value)}
          />
        </label>

        <label className={labelClass}>
          Slug
          <input
            className={inputClass}
            value={form.slug}
            onChange={(e) => setField("slug", e.target.value)}
            placeholder="Generated from product name if blank"
          />
        </label>

        <label className={labelClass}>
          Category *
          <input
            className={inputClass}
            required
            value={form.category}
            onChange={(e) => setField("category", e.target.value)}
          />
        </label>

        <label className={labelClass}>
          Main image URL
          <input
            className={inputClass}
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://..."
          />
        </label>

        <label className="block text-sm font-medium text-gray-700 sm:col-span-2">
          Or upload a main image
          <input
            className={`${inputClass} file:mr-3 file:rounded-md file:border-0 file:bg-gray-100 file:px-3 file:py-1.5`}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={(e) =>
              setImageFile(e.target.files?.[0] || null)
            }
          />
          {imageFile && (
            <span className="mt-1 block text-xs text-gray-500">
              {imageFile.name}
            </span>
          )}
        </label>

        {/* SHORT DESCRIPTION */}
        <div className="sm:col-span-2">
          <label className={labelClass}>Short Description</label>
          <RichTextEditor
            value={form.shortDescription}
            onChange={(value) => setField("shortDescription", value)}
            placeholder="Write a short product description..."
            minHeight="110px"
          />
        </div>

        {/* DESCRIPTION */}
        <div className="sm:col-span-2">
          <label className={labelClass}>Description *</label>
          <RichTextEditor
            value={form.description}
            onChange={(value) => setField("description", value)}
            placeholder="Write the complete product description..."
            minHeight="180px"
          />
        </div>

        {/* SPECIFICATIONS */}
        <div className="sm:col-span-2">
          <label className={labelClass}>Specifications</label>
          <textarea
            className={inputClass}
            rows={6}
            value={form.specs}
            onChange={(e) => setField("specs", e.target.value)}
            placeholder="One specification per line"
          />
        </div>
      </section>

      {/* =====================================================
         SIZE VARIANTS & PRICING
      ====================================================== */}

      <section className="space-y-4 border-t border-gray-100 pt-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-semibold text-gray-900">
              Size variants & pricing
            </h3>
            <p className="text-xs text-gray-500">
              Add multiple sizes with different prices. Leave empty for a
              single-price product.
            </p>
          </div>
          <button
            type="button"
            onClick={addVariant}
            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            <Plus className="h-4 w-4" />
            Add size
          </button>
        </div>

        {hasVariants ? (
          <div className="space-y-3">
            {variants.map((v, index) => (
              <div
                key={index}
                className="grid gap-2 rounded-xl border border-gray-100 bg-gray-50/70 p-3 sm:grid-cols-12 sm:items-end"
              >
                <div className="sm:col-span-3">
                  <label className={labelClass}>Size *</label>
                  <input
                    className={inputClass}
                    value={v.size}
                    onChange={(e) =>
                      updateVariant(index, "size", e.target.value)
                    }
                    placeholder="e.g. 120mm x 180mm"
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass}>Price (₹) *</label>
                  <input
                    className={inputClass}
                    type="number"
                    min="0"
                    step="0.01"
                    value={v.price}
                    onChange={(e) =>
                      updateVariant(index, "price", e.target.value)
                    }
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass}>Compare-at (₹)</label>
                  <input
                    className={inputClass}
                    type="number"
                    min="0"
                    step="0.01"
                    value={v.compareAtPrice}
                    onChange={(e) =>
                      updateVariant(
                        index,
                        "compareAtPrice",
                        e.target.value
                      )
                    }
                  />
                </div>
                <div className="sm:col-span-1">
                  <label className={labelClass}>Stock</label>
                  <input
                    className={inputClass}
                    type="number"
                    min="0"
                    step="1"
                    value={v.stock}
                    onChange={(e) =>
                      updateVariant(index, "stock", e.target.value)
                    }
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass}>SKU</label>
                  <input
                    className={inputClass}
                    value={v.sku}
                    onChange={(e) =>
                      updateVariant(index, "sku", e.target.value)
                    }
                  />
                </div>
                <div className="flex items-center gap-2 sm:col-span-2 sm:pb-1">
                  <button
                    type="button"
                    title="Default size (listing price)"
                    onClick={() => setDefaultVariant(index)}
                    className={`inline-flex h-9 w-9 items-center justify-center rounded-lg border ${
                      v.isDefault
                        ? "border-amber-300 bg-amber-50 text-amber-600"
                        : "border-gray-200 bg-white text-gray-400 hover:text-amber-500"
                    }`}
                  >
                    <Star
                      className={`h-4 w-4 ${
                        v.isDefault ? "fill-current" : ""
                      }`}
                    />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeVariant(index)}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-red-100 bg-white text-red-500 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-3">
            <label className={labelClass}>
              Price (₹) *
              <input
                className={inputClass}
                type="number"
                min="0"
                step="0.01"
                required
                value={form.price}
                onChange={(e) => setField("price", e.target.value)}
              />
            </label>
            <label className={labelClass}>
              Compare-at price (₹)
              <input
                className={inputClass}
                type="number"
                min="0"
                step="0.01"
                value={form.compareAtPrice}
                onChange={(e) =>
                  setField("compareAtPrice", e.target.value)
                }
              />
            </label>
            <label className={labelClass}>
              Stock quantity
              <input
                className={inputClass}
                type="number"
                min="0"
                step="1"
                value={form.stock}
                onChange={(e) => setField("stock", e.target.value)}
              />
            </label>
            <p className="sm:col-span-3 text-xs text-gray-500">
              No size variants — single price applies. Click “Add size”
              for multiple sizes with different prices.
            </p>
          </div>
        )}
      </section>

      {/* =====================================================
         STOCK THRESHOLD (always)
      ====================================================== */}

      <section className="grid gap-4 border-t border-gray-100 pt-5 sm:grid-cols-2">
        <label className={labelClass}>
          Low-stock threshold
          <input
            className={inputClass}
            type="number"
            min="0"
            step="1"
            value={form.lowStockThreshold}
            onChange={(e) =>
              setField("lowStockThreshold", e.target.value)
            }
          />
        </label>
      </section>

      {/* =====================================================
         PRODUCT DETAILS
      ====================================================== */}

      <section className="grid gap-4 border-t border-gray-100 pt-5 sm:grid-cols-2">
        {FIELDS.map(({ name, label }) => (
          <label key={name} className={labelClass}>
            {label}
            <textarea
              className={inputClass}
              rows={name === "extraImages" ? 2 : 3}
              value={form[name]}
              onChange={(e) => setField(name, e.target.value)}
              placeholder={
                name === "extraImages"
                  ? "One URL per line"
                  : "One item per line"
              }
            />
          </label>
        ))}
      </section>

      {/* =====================================================
         SOCIAL + SEO
      ====================================================== */}

      <section className="grid gap-4 border-t border-gray-100 pt-5 sm:grid-cols-2">
        <label className={labelClass}>
          YouTube URL
          <input
            className={inputClass}
            type="url"
            value={form.youtubeUrl || ""}
            onChange={(e) => setField("youtubeUrl", e.target.value)}
          />
        </label>

        <label className={labelClass}>
          Instagram URL
          <input
            className={inputClass}
            type="url"
            value={form.instagramUrl || ""}
            onChange={(e) => setField("instagramUrl", e.target.value)}
          />
        </label>

        <label className={labelClass}>
          Meta title
          <input
            className={inputClass}
            value={form.metaTitle || ""}
            onChange={(e) => setField("metaTitle", e.target.value)}
          />
        </label>

        <label className={labelClass}>
          Meta description
          <textarea
            className={inputClass}
            rows={2}
            value={form.metaDescription || ""}
            onChange={(e) =>
              setField("metaDescription", e.target.value)
            }
          />
        </label>
      </section>

      {/* =====================================================
         STATUS
      ====================================================== */}

      <section className="flex flex-wrap gap-x-6 gap-y-3 border-t border-gray-100 pt-5">
        {[
          ["featured", "Featured product"],
          ["trackInventory", "Track inventory"],
          ["isActive", "Visible on storefront"],
        ].map(([name, label]) => (
          <label
            key={name}
            className="flex items-center gap-2 text-sm text-gray-700"
          >
            <input
              type="checkbox"
              checked={Boolean(form[name])}
              onChange={(e) => setField(name, e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 accent-[#3d7a72]"
            />
            {label}
          </label>
        ))}
      </section>

      {/* =====================================================
         SUBMIT
      ====================================================== */}

      <div className="flex justify-end border-t border-gray-100 pt-5">
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-rust px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-rust/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Saving…" : submitLabel}
        </button>
      </div>
    </form>
  );
}

export default ProductForm;