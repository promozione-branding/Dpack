
"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import "jodit/es2021/jodit.min.css";
import { organizeProductFields } from "@/lib/productContent";
import { adminAPI } from "@/lib/apiClient";
import { Plus, Trash2, Star, X } from "lucide-react";

const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
});

const FIELDS = [
  { name: "overview", label: "Product overview" },
  { name: "keyFeatures", label: "Key features" },
  { name: "applications", label: "Applications" },
];

function lines(value) {
  return Array.isArray(value) ? value.join("\n") : value || "";
}

function normalizeCategories(value) {
  if (Array.isArray(value)) {
    return value
      .map((item) =>
        typeof item === "string" ? item : item?.name
      )
      .filter(Boolean);
  }

  if (typeof value === "string" && value.trim()) {
    try {
      const parsed = JSON.parse(value);

      if (Array.isArray(parsed)) {
        return parsed.filter(Boolean);
      }
    } catch {
      // Existing products may store category as a plain string.
    }

    return [value.trim()];
  }

  if (value && typeof value === "object" && value.name) {
    return [value.name];
  }

  return [];
}

function emptyVariant(isDefault = false) {
  return {
    size: "",
    price: "",
    compareAtPrice: "",
    shippingPrice: "99",
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
        v.compareAtPrice != null
          ? String(v.compareAtPrice)
          : "",
      shippingPrice:
        v.shippingPrice != null
          ? String(v.shippingPrice)
          : String(product?.shippingPrice ?? 99),
      stock: v.stock != null ? String(v.stock) : "0",
      sku: v.sku || "",
      weight: v.weight != null ? String(v.weight) : "",
      isDefault: Boolean(v.isDefault),
    }));
  }

  if (product?.sizes?.length) {
    return product.sizes.map((size, index) => ({
      size,
      price:
        index === 0 && product.price != null
          ? String(product.price)
          : "",
      compareAtPrice:
        index === 0 && product.compareAtPrice != null
          ? String(product.compareAtPrice)
          : "",
      shippingPrice: String(product?.shippingPrice ?? 99),
      stock: index === 0 ? String(product.stock ?? 0) : "0",
      sku: "",
      weight: "",
      isDefault: index === 0,
    }));
  }

  return [];
}

function initialValues(product) {
  const organizedFields = organizeProductFields(product);

  return {
    name: product?.name || "",
    slug: product?.slug || "",
    category: normalizeCategories(product?.category),
    shortDescription: product?.shortDescription || "",
    description:
      organizedFields.description ?? product?.description ?? "",
    specs: lines(organizedFields.specs || product?.specs),

    price: product?.price ?? "",
    compareAtPrice: product?.compareAtPrice ?? "",
    shippingPrice: product?.shippingPrice ?? 99,
    stock: product?.stock ?? 0,

    lowStockThreshold: product?.lowStockThreshold ?? 10,
    trackInventory: product?.trackInventory ?? true,
    featured: product?.featured ?? false,
    isActive: product?.isActive ?? true,

    youtubeUrl: product?.youtubeUrl || "",
    instagramUrl: product?.instagramUrl || "",
    metaTitle: product?.metaTitle || "",
    metaDescription: product?.metaDescription || "",
    extraImages: lines(
      organizedFields.extraImages || product?.extraImages
    ),

    ...Object.fromEntries(
      FIELDS.map(({ name }) => [
        name,
        lines(organizedFields[name] || product?.[name]),
      ])
    ),
  };
}

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
        "bold", "italic", "underline", "|",
        "ul", "ol", "|",
        "paragraph", "fontsize", "|",
        "left", "center", "right", "justify", "|",
        "link", "|", "undo", "redo", "|",
        "eraser", "source",
      ],
      buttonsMD: [
        "bold", "italic", "underline", "|",
        "ul", "ol", "|", "paragraph", "|",
        "link", "|", "undo", "redo", "|", "eraser",
      ],
      buttonsSM: [
        "bold", "italic", "underline", "|",
        "ul", "ol", "|", "link", "|", "undo", "redo",
      ],
      askBeforePasteHTML: false,
      askBeforePasteFromWord: false,
      processPasteHTML: true,
      defaultActionOnPaste: "insert_clear_html",
      enter: "P",
      cleanHTML: { fillEmptyParagraph: false },
      style: { fontSize: "14px", color: "#374151" },
    }),
    [minHeight, placeholder]
  );

  return (
    <div className="mt-1 overflow-hidden rounded-lg border border-gray-200 bg-white focus-within:border-rust focus-within:ring-2 focus-within:ring-rust/20">
      <JoditEditor
        value={value || ""}
        config={config}
        onBlur={onChange}
        onChange={onChange}
      />
    </div>
  );
}

function ProductForm({ initial, onSubmit, loading, submitLabel }) {
  const [imageUrl, setImageUrl] = useState(initial?.image || "");
  const [imageFile, setImageFile] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([]);

  const galleryFilesRef = useRef([]);
  const galleryInputRef = useRef(null);

  const [form, setForm] = useState(() => initialValues(initial));
  const [variants, setVariants] = useState(() =>
    buildInitialVariants(initial)
  );

  const [categories, setCategories] = useState([]);
  const [categoriesError, setCategoriesError] = useState("");

  const hasVariants = variants.length > 0;

  // Load available categories from the existing category API.
  useEffect(() => {
    let mounted = true;

    adminAPI
      .listCategoryImages()
      .then((result) => {
        if (!mounted) return;

        const categoryNames = Array.isArray(result?.categories)
          ? result.categories
              .map((category) =>
                typeof category === "string"
                  ? category
                  : category?.name
              )
              .filter(Boolean)
          : [];

        setCategories(categoryNames);
        setCategoriesError("");
      })
      .catch((error) => {
        if (mounted) {
          setCategoriesError(
            error.message || "Unable to load categories."
          );
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(
    () => () => {
      galleryFilesRef.current.forEach(({ preview }) => {
        URL.revokeObjectURL(preview);
      });
    },
    []
  );

  const setSelectedGalleryFiles = (nextFiles) => {
    galleryFilesRef.current = nextFiles;
    setGalleryFiles(nextFiles);
  };

  const handleGallerySelection = (event) => {
    const selected = Array.from(event.target.files || []);
    const remaining = Math.max(0, 10 - galleryFiles.length);

    if (selected.length > remaining) {
      window.alert(
        `You can select up to 10 gallery images. ${remaining} slots remaining.`
      );
    }

    const additions = selected.slice(0, remaining).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setSelectedGalleryFiles([...galleryFiles, ...additions]);
    event.target.value = "";
  };

  const removeGalleryFile = (index) => {
    const removedFile = galleryFiles[index];

    if (removedFile?.preview) {
      URL.revokeObjectURL(removedFile.preview);
    }

    setSelectedGalleryFiles(
      galleryFiles.filter((_, fileIndex) => fileIndex !== index)
    );
  };

  const setField = (name, value) => {
    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  // Add or remove a category without disturbing other selections.
  const toggleCategory = (category) => {
    setForm((current) => {
      const selected = normalizeCategories(current.category);

      const nextCategories = selected.includes(category)
        ? selected.filter((item) => item !== category)
        : [...selected, category];

      return {
        ...current,
        category: nextCategories,
      };
    });
  };

  const updateVariant = (index, field, value) => {
    setVariants((previous) =>
      previous.map((variant, variantIndex) =>
        variantIndex === index
          ? { ...variant, [field]: value }
          : variant
      )
    );
  };

  const setDefaultVariant = (index) => {
    setVariants((previous) =>
      previous.map((variant, variantIndex) => ({
        ...variant,
        isDefault: variantIndex === index,
      }))
    );
  };

  const addVariant = () => {
    setVariants((previous) => [
      ...previous,
      emptyVariant(previous.length === 0),
    ]);
  };

  const removeVariant = (index) => {
    setVariants((previous) => {
      const next = previous.filter(
        (_, variantIndex) => variantIndex !== index
      );

      if (next.length && !next.some((variant) => variant.isDefault)) {
        next[0] = { ...next[0], isDefault: true };
      }

      return next;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const selectedCategories = [
      ...new Set(normalizeCategories(form.category)),
    ];

    if (selectedCategories.length === 0) {
      window.alert("Please select at least one product category.");
      return;
    }

    const data = new FormData();

    const arrayFieldNames = new Set([
      ...FIELDS.map((field) => field.name),
      "specs",
      "extraImages",
    ]);

    for (const [name, value] of Object.entries(form)) {
      if (
        hasVariants &&
        ["price", "compareAtPrice", "stock"].includes(name)
      ) {
        continue;
      }

      // Send categories as a JSON array for the API.
      if (name === "category") {
        data.set("category", JSON.stringify(selectedCategories));
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

    const cleanedVariants = variants
      .filter((variant) => variant.size.trim() && variant.price !== "")
      .map((variant) => ({
        size: variant.size.trim(),
        price: Number(variant.price),
        compareAtPrice:
          variant.compareAtPrice === "" ||
          variant.compareAtPrice == null
            ? null
            : Number(variant.compareAtPrice),
        shippingPrice: Number(variant.shippingPrice || 0),
        stock: Number(variant.stock || 0),
        sku: variant.sku?.trim() || null,
        weight:
          variant.weight === "" || variant.weight == null
            ? null
            : Number(variant.weight),
        isDefault: Boolean(variant.isDefault),
      }));

    data.set("variants", JSON.stringify(cleanedVariants));

    data.set(
      "sizes",
      JSON.stringify(cleanedVariants.map((variant) => variant.size))
    );

    if (cleanedVariants.length > 0) {
      const defaultVariant =
        cleanedVariants.find((variant) => variant.isDefault) ||
        cleanedVariants[0];

      data.set("price", String(defaultVariant.price));

      if (defaultVariant.compareAtPrice != null) {
        data.set(
          "compareAtPrice",
          String(defaultVariant.compareAtPrice)
        );
      } else {
        data.set("compareAtPrice", "");
      }

      data.set(
        "stock",
        String(
          cleanedVariants.reduce(
            (sum, variant) => sum + (variant.stock || 0),
            0
          )
        )
      );

      data.set(
        "shippingPrice",
        String(defaultVariant.shippingPrice)
      );
    }

    data.set("image", imageUrl);

    if (imageFile) {
      data.set("imageFile", imageFile);
    }

    galleryFiles.forEach(({ file }, index) => {
      data.set(`extraImage_${index}`, file);
    });

    onSubmit(data, Boolean(imageFile || imageUrl.trim()));
  };

  const inputClass =
    "mt-1 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-rust focus:ring-2 focus:ring-rust/20";

  const labelClass = "block text-sm font-medium text-gray-700";

  // Include existing categories even if they are missing from the API.
  const availableCategories = [
    ...new Set([
      ...categories,
      ...normalizeCategories(form.category),
    ]),
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
    >
      {/* BASIC INFORMATION */}
      <section className="grid gap-4 sm:grid-cols-2">
        <label className={labelClass}>
          Product name *
          <input
            className={inputClass}
            required
            value={form.name}
            onChange={(event) => setField("name", event.target.value)}
          />
        </label>

        <label className={labelClass}>
          Slug
          <input
            className={inputClass}
            value={form.slug}
            onChange={(event) => setField("slug", event.target.value)}
            placeholder="Generated from product name if blank"
          />
        </label>

        {/* MULTIPLE CATEGORY SELECTION */}
        <div className="sm:col-span-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <label className={labelClass}>
              Product Categories *
            </label>

            <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700">
              {normalizeCategories(form.category).length} selected
            </span>
          </div>

          <p className="mt-1 text-xs text-gray-500">
            Select all categories where this product should appear.
          </p>

          {categoriesError && (
            <p className="mt-2 text-xs text-red-600">
              Could not load categories: {categoriesError}
            </p>
          )}

          {availableCategories.length > 0 ? (
            <div className="mt-3 grid grid-cols-1 gap-2 rounded-xl border border-gray-200 bg-gray-50 p-3 sm:grid-cols-2 lg:grid-cols-3">
              {availableCategories.map((category) => {
                const checked = normalizeCategories(
                  form.category
                ).includes(category);

                return (
                  <label
                    key={category}
                    className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 text-sm transition ${
                      checked
                        ? "border-orange-400 bg-orange-50 text-gray-900"
                        : "border-gray-200 bg-white text-gray-700 hover:border-orange-300"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleCategory(category)}
                      className="h-4 w-4 shrink-0 accent-[#F5A623]"
                    />

                    <span className="break-words">{category}</span>
                  </label>
                );
              })}
            </div>
          ) : (
            !categoriesError && (
              <p className="mt-3 rounded-lg border border-dashed border-gray-300 p-4 text-sm text-gray-500">
                No categories found. Please create categories first.
              </p>
            )
          )}

          {normalizeCategories(form.category).length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {normalizeCategories(form.category).map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => toggleCategory(category)}
                  className="inline-flex items-center gap-1 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs text-orange-800 hover:bg-orange-100"
                  title={`Remove ${category}`}
                >
                  {category}
                  <X className="h-3 w-3" />
                </button>
              ))}
            </div>
          )}
        </div>

        <label className={labelClass}>
          Main image URL
          <input
            className={inputClass}
            value={imageUrl}
            onChange={(event) => setImageUrl(event.target.value)}
            placeholder="https://..."
          />
        </label>

        <label className={labelClass}>
          Or upload a main image
          <input
            className={`${inputClass} file:mr-3 file:rounded-md file:border-0 file:bg-gray-100 file:px-3 file:py-1.5`}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={(event) =>
              setImageFile(event.target.files?.[0] || null)
            }
          />

          {imageFile && (
            <span className="mt-1 block text-xs text-gray-500">
              {imageFile.name}
            </span>
          )}
        </label>

        <div className="sm:col-span-2">
          <label className={labelClass}>Short Description</label>
          <RichTextEditor
            value={form.shortDescription}
            onChange={(value) => setField("shortDescription", value)}
            placeholder="Write a short product description..."
            minHeight="110px"
          />
        </div>

        <div className="sm:col-span-2">
          <label className={labelClass}>Description *</label>
          <RichTextEditor
            value={form.description}
            onChange={(value) => setField("description", value)}
            placeholder="Write the complete product description..."
            minHeight="180px"
          />
        </div>

        <div className="sm:col-span-2">
          <label className={labelClass}>Specifications</label>
          <textarea
            className={inputClass}
            rows={6}
            value={form.specs}
            onChange={(event) => setField("specs", event.target.value)}
            placeholder="One specification per line"
          />
        </div>
      </section>

      {/* PRODUCT IMAGE GALLERY */}
      <section className="space-y-4 border-t border-gray-100 pt-5">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">
            Product image gallery
          </h3>
          <p className="mt-1 text-xs text-gray-500">
            Select up to 10 new gallery images. They will appear alongside
            the main product image.
          </p>
        </div>

        <input
          ref={galleryInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          onChange={handleGallerySelection}
          className="hidden"
        />

        <button
          type="button"
          onClick={() => galleryInputRef.current?.click()}
          disabled={galleryFiles.length >= 10 || loading}
          className="inline-flex items-center gap-2 rounded-lg border border-dashed border-gray-300 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700 transition hover:border-rust hover:bg-orange-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Plus className="h-4 w-4" />
          Select gallery images ({galleryFiles.length}/10)
        </button>

        {galleryFiles.length > 0 && (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {galleryFiles.map(({ file, preview }, index) => (
              <div
                key={`${file.name}-${file.lastModified}-${index}`}
                className="group relative overflow-hidden rounded-xl border border-gray-200 bg-gray-50"
              >
                <img
                  src={preview}
                  alt={file.name}
                  className="aspect-square w-full object-cover"
                />

                <button
                  type="button"
                  onClick={() => removeGalleryFile(index)}
                  aria-label={`Remove ${file.name} from gallery`}
                  className="absolute right-2 top-2 rounded-full bg-white/95 p-1.5 text-gray-700 shadow transition hover:bg-red-50 hover:text-red-600"
                >
                  <X className="h-4 w-4" />
                </button>

                <p className="truncate px-2 py-1.5 text-xs text-gray-600">
                  {file.name}
                </p>
              </div>
            ))}
          </div>
        )}

        <label className={labelClass}>
          Additional image URLs (optional, one per line)
          <textarea
            className={inputClass}
            rows={2}
            value={form.extraImages}
            onChange={(event) => setField("extraImages", event.target.value)}
            placeholder="https://..."
          />
        </label>
      </section>

      {/* SIZE VARIANTS & PRICING */}
      <section className="space-y-4 border-t border-gray-100 pt-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-semibold text-gray-900">
              Size variants & pricing
            </h3>
            <p className="text-xs text-gray-500">
              Set a separate product price and shipping charge for each
              size. Shipping is configured per unit.
            </p>
          </div>

          <button
            type="button"
            onClick={addVariant}
            disabled={loading}
            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            <Plus className="h-4 w-4" />
            Add size
          </button>
        </div>

        {hasVariants ? (
          <div className="space-y-3">
            {variants.map((variant, index) => (
              <div
                key={index}
                className="grid gap-3 rounded-xl border border-gray-100 bg-gray-50/70 p-3 sm:grid-cols-2 lg:grid-cols-4"
              >
                <label className={labelClass}>
                  Size *
                  <input
                    className={inputClass}
                    value={variant.size}
                    onChange={(event) =>
                      updateVariant(index, "size", event.target.value)
                    }
                    placeholder="e.g. Small / 120mm x 180mm"
                    required
                  />
                </label>

                <label className={labelClass}>
                  Price (₹) *
                  <input
                    className={inputClass}
                    type="number"
                    min="0"
                    step="0.01"
                    value={variant.price}
                    onChange={(event) =>
                      updateVariant(index, "price", event.target.value)
                    }
                    required
                  />
                </label>

                <label className={labelClass}>
                  Compare-at price (₹)
                  <input
                    className={inputClass}
                    type="number"
                    min="0"
                    step="0.01"
                    value={variant.compareAtPrice}
                    onChange={(event) =>
                      updateVariant(
                        index,
                        "compareAtPrice",
                        event.target.value
                      )
                    }
                  />
                </label>

                <label className={labelClass}>
                  Shipping Price (₹/unit) *
                  <input
                    className={inputClass}
                    type="number"
                    min="0"
                    step="0.01"
                    value={variant.shippingPrice}
                    onChange={(event) =>
                      updateVariant(
                        index,
                        "shippingPrice",
                        event.target.value
                      )
                    }
                    required
                  />
                </label>

                <label className={labelClass}>
                  Stock
                  <input
                    className={inputClass}
                    type="number"
                    min="0"
                    step="1"
                    value={variant.stock}
                    onChange={(event) =>
                      updateVariant(index, "stock", event.target.value)
                    }
                  />
                </label>

                <label className={labelClass}>
                  SKU
                  <input
                    className={inputClass}
                    value={variant.sku}
                    onChange={(event) =>
                      updateVariant(index, "sku", event.target.value)
                    }
                  />
                </label>

                <label className={labelClass}>
                  Weight
                  <input
                    className={inputClass}
                    type="number"
                    min="0"
                    step="0.01"
                    value={variant.weight}
                    onChange={(event) =>
                      updateVariant(index, "weight", event.target.value)
                    }
                    placeholder="Optional"
                  />
                </label>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    title="Set as default variant"
                    aria-label={`Set variant ${index + 1} as default`}
                    onClick={() => setDefaultVariant(index)}
                    className={`inline-flex h-9 w-9 items-center justify-center rounded-lg border ${
                      variant.isDefault
                        ? "border-amber-300 bg-amber-50 text-amber-600"
                        : "border-gray-200 bg-white text-gray-400 hover:text-amber-500"
                    }`}
                  >
                    <Star
                      className={`h-4 w-4 ${
                        variant.isDefault ? "fill-current" : ""
                      }`}
                    />
                  </button>

                  <span className="text-xs text-gray-500">
                    {variant.isDefault ? "Default variant" : "Set default"}
                  </span>

                  <button
                    type="button"
                    onClick={() => removeVariant(index)}
                    aria-label={`Remove variant ${index + 1}`}
                    className="ml-auto inline-flex h-9 w-9 items-center justify-center rounded-lg border border-red-100 bg-white text-red-500 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="rounded-lg bg-orange-50 px-3 py-2 text-xs text-gray-600 sm:col-span-2 lg:col-span-4">
                  Example: Quantity 3 × shipping ₹
                  {Number(variant.shippingPrice || 0).toLocaleString("en-IN")}{" "}
                  =
                  <span className="ml-1 font-semibold text-gray-900">
                    ₹
                    {(
                      Math.max(0, Number(variant.shippingPrice) || 0) * 3
                    ).toLocaleString("en-IN")}
                  </span>{" "}
                  total shipping for this variant.
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <label className={labelClass}>
              Price (₹) *
              <input
                className={inputClass}
                type="number"
                min="0"
                step="0.01"
                required
                value={form.price}
                onChange={(event) => setField("price", event.target.value)}
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
                onChange={(event) =>
                  setField("compareAtPrice", event.target.value)
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
                onChange={(event) => setField("stock", event.target.value)}
              />
            </label>

            <p className="text-xs text-gray-500 sm:col-span-2 lg:col-span-3">
              No size variants — the single product price and shipping
              price apply. Click “Add size” to configure different
              shipping charges for each size.
            </p>
          </div>
        )}

        {!hasVariants && (
          <label className={`${labelClass} block max-w-sm`}>
            Shipping Price (₹/unit)
            <input
              className={inputClass}
              type="number"
              min="0"
              step="0.01"
              value={form.shippingPrice}
              onChange={(event) =>
                setField("shippingPrice", event.target.value)
              }
            />
            <span className="mt-1 block text-xs font-normal text-gray-500">
              Default shipping price is ₹99 per unit.
            </span>
          </label>
        )}
      </section>

      {/* STOCK THRESHOLD */}
      <section className="grid gap-4 border-t border-gray-100 pt-5 sm:grid-cols-2">
        <label className={labelClass}>
          Low-stock threshold
          <input
            className={inputClass}
            type="number"
            min="0"
            step="1"
            value={form.lowStockThreshold}
            onChange={(event) =>
              setField("lowStockThreshold", event.target.value)
            }
          />
        </label>
      </section>

      {/* PRODUCT DETAILS */}
      <section className="grid gap-4 border-t border-gray-100 pt-5 sm:grid-cols-2">
        {FIELDS.map(({ name, label }) => (
          <label key={name} className={labelClass}>
            {label}
            <textarea
              className={inputClass}
              rows={3}
              value={form[name]}
              onChange={(event) => setField(name, event.target.value)}
              placeholder="One item per line"
            />
          </label>
        ))}
      </section>

      {/* SOCIAL & SEO */}
      <section className="grid gap-4 border-t border-gray-100 pt-5 sm:grid-cols-2">
        <label className={labelClass}>
          YouTube URL
          <input
            className={inputClass}
            type="url"
            value={form.youtubeUrl}
            onChange={(event) => setField("youtubeUrl", event.target.value)}
          />
        </label>

        <label className={labelClass}>
          Instagram URL
          <input
            className={inputClass}
            type="url"
            value={form.instagramUrl}
            onChange={(event) =>
              setField("instagramUrl", event.target.value)
            }
          />
        </label>

        <label className={labelClass}>
          Meta title
          <input
            className={inputClass}
            value={form.metaTitle}
            onChange={(event) => setField("metaTitle", event.target.value)}
          />
        </label>

        <label className={labelClass}>
          Meta description
          <textarea
            className={inputClass}
            rows={2}
            value={form.metaDescription}
            onChange={(event) =>
              setField("metaDescription", event.target.value)
            }
          />
        </label>
      </section>

      {/* STATUS */}
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
              onChange={(event) => setField(name, event.target.checked)}
              className="h-4 w-4 rounded border-gray-300 accent-[#3d7a72]"
            />
            {label}
          </label>
        ))}
      </section>

      {/* SUBMIT */}
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
