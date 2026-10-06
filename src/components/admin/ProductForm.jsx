"use client";

import { useEffect, useRef, useState } from "react";

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

    shortDescription: product?.shortDescription || "",

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

    ...Object.fromEntries(
      FIELDS.map(({ name }) => [
        name,
        lines(product?.[name]),
      ])
    ),
  };
}

/* =========================================================
   RICH TEXT EDITOR
========================================================= */

function RichTextEditor({
  value,
  onChange,
  placeholder,
  minHeight = "150px",
}) {
  const editorRef = useRef(null);

  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");

  /* -------------------------------------------------------
     Load existing HTML/content
  ------------------------------------------------------- */

  useEffect(() => {
    if (!editorRef.current) return;

    if (editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || "";
    }
  }, [value]);

  /* -------------------------------------------------------
     Execute editor command
  ------------------------------------------------------- */

  const command = (cmd, commandValue = null) => {
    editorRef.current?.focus();

    document.execCommand(
      cmd,
      false,
      commandValue
    );

    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  /* -------------------------------------------------------
     Add link
  ------------------------------------------------------- */

  const addLink = () => {
    const url = linkUrl.trim();

    if (!url) {
      setShowLinkInput(false);
      return;
    }

    editorRef.current?.focus();

    document.execCommand(
      "createLink",
      false,
      url
    );

    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }

    setLinkUrl("");
    setShowLinkInput(false);
  };

  /* -------------------------------------------------------
     Input
  ------------------------------------------------------- */

  const handleInput = () => {
    if (!editorRef.current) return;

    onChange(editorRef.current.innerHTML);
  };

  /* -------------------------------------------------------
     Keyboard shortcuts
  ------------------------------------------------------- */

  const handleKeyDown = (event) => {
    if (
      (event.ctrlKey || event.metaKey) &&
      event.key.toLowerCase() === "b"
    ) {
      event.preventDefault();
      command("bold");
    }

    if (
      (event.ctrlKey || event.metaKey) &&
      event.key.toLowerCase() === "i"
    ) {
      event.preventDefault();
      command("italic");
    }

    if (
      (event.ctrlKey || event.metaKey) &&
      event.key.toLowerCase() === "u"
    ) {
      event.preventDefault();
      command("underline");
    }
  };

  return (
    <div className="mt-1 overflow-hidden rounded-lg border border-gray-200 bg-white focus-within:border-rust focus-within:ring-2 focus-within:ring-rust/20">

      {/* =====================================================
          TOOLBAR
      ====================================================== */}

      <div className="flex flex-wrap items-center gap-1 border-b border-gray-200 bg-gray-50 px-2 py-2">

        {/* Bold */}
        <button
          type="button"
          title="Bold"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => command("bold")}
          className="flex h-8 min-w-8 items-center justify-center rounded-md px-2 text-sm font-bold text-gray-700 transition hover:bg-white hover:text-black"
        >
          B
        </button>

        {/* Italic */}
        <button
          type="button"
          title="Italic"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => command("italic")}
          className="flex h-8 min-w-8 items-center justify-center rounded-md px-2 text-sm italic text-gray-700 transition hover:bg-white hover:text-black"
        >
          I
        </button>

        {/* Underline */}
        <button
          type="button"
          title="Underline"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => command("underline")}
          className="flex h-8 min-w-8 items-center justify-center rounded-md px-2 text-sm underline text-gray-700 transition hover:bg-white hover:text-black"
        >
          U
        </button>

        <span className="mx-1 h-5 w-px bg-gray-200" />

        {/* Bullet list */}
        <button
          type="button"
          title="Bullet list"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => command("insertUnorderedList")}
          className="flex h-8 min-w-8 items-center justify-center rounded-md px-2 text-sm text-gray-700 transition hover:bg-white hover:text-black"
        >
          ••
        </button>

        {/* Number list */}
        <button
          type="button"
          title="Numbered list"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => command("insertOrderedList")}
          className="flex h-8 min-w-8 items-center justify-center rounded-md px-2 text-xs font-semibold text-gray-700 transition hover:bg-white hover:text-black"
        >
          1.
        </button>

        <span className="mx-1 h-5 w-px bg-gray-200" />

        {/* Heading */}
        <select
          defaultValue=""
          title="Text format"
          onMouseDown={(e) => e.stopPropagation()}
          onChange={(e) => {
            if (!e.target.value) return;

            command(
              "formatBlock",
              e.target.value
            );

            e.target.value = "";
          }}
          className="h-8 rounded-md border-0 bg-transparent px-2 text-xs text-gray-600 outline-none hover:bg-white"
        >
          <option value="">Format</option>
          <option value="p">Paragraph</option>
          <option value="h3">Heading 3</option>
          <option value="h4">Heading 4</option>
        </select>

        <span className="mx-1 h-5 w-px bg-gray-200" />

        {/* Link */}
        <button
          type="button"
          title="Add link"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => setShowLinkInput((v) => !v)}
          className="flex h-8 items-center justify-center rounded-md px-2 text-xs font-medium text-gray-700 transition hover:bg-white hover:text-black"
        >
          Link
        </button>

        {/* Clear formatting */}
        <button
          type="button"
          title="Clear formatting"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => command("removeFormat")}
          className="flex h-8 items-center justify-center rounded-md px-2 text-xs text-gray-500 transition hover:bg-white hover:text-red-600"
        >
          Clear
        </button>
      </div>

      {/* =====================================================
          LINK INPUT
      ====================================================== */}

      {showLinkInput && (
        <div className="flex gap-2 border-b border-gray-200 bg-white p-2">
          <input
            type="url"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addLink();
              }
            }}
            placeholder="https://example.com"
            className="min-w-0 flex-1 rounded-md border border-gray-200 px-3 py-1.5 text-xs outline-none focus:border-rust"
            autoFocus
          />

          <button
            type="button"
            onClick={addLink}
            className="rounded-md bg-rust px-3 py-1.5 text-xs font-semibold text-black hover:bg-rust/90"
          >
            Add
          </button>
        </div>
      )}

      {/* =====================================================
          EDITOR
      ====================================================== */}

      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        data-placeholder={placeholder}
        className="prose prose-sm max-w-none overflow-y-auto px-3 py-3 text-sm text-gray-700 outline-none [&:empty]:before:pointer-events-none [&:empty]:before:text-gray-400 [&:empty]:before:content-[attr(data-placeholder)]"
        style={{
          minHeight,
        }}
      />
    </div>
  );
}

/* =========================================================
   PRODUCT FORM
========================================================= */

export default function ProductForm({
  initial,
  onSubmit,
  loading,
  submitLabel,
}) {
  const [imageUrl, setImageUrl] = useState(
    initial?.image || ""
  );

  const [imageFile, setImageFile] = useState(null);

  const [form, setForm] = useState(() =>
    initialValues(initial)
  );

  const setField = (name, value) =>
    setForm((current) => ({
      ...current,
      [name]: value,
    }));

  /* =======================================================
     SUBMIT
  ====================================================== */

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData();

    for (const [name, value] of Object.entries(form)) {
      if (
        FIELDS.some(
          (field) => field.name === name
        )
      ) {
        data.set(
          name,
          JSON.stringify(
            value
              .split("\n")
              .map((item) => item.trim())
              .filter(Boolean)
          )
        );
      } else {
        data.set(
          name,
          String(value ?? "")
        );
      }
    }

    data.set("image", imageUrl);

    if (imageFile) {
      data.set("imageFile", imageFile);
    }

    onSubmit(
      data,
      Boolean(
        imageFile ||
          imageUrl.trim()
      )
    );
  };

  /* =======================================================
     EXISTING CLASSES — UNCHANGED
  ====================================================== */

  const inputClass =
    "mt-1 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-rust focus:ring-2 focus:ring-rust/20";

  const labelClass =
    "block text-sm font-medium text-gray-700";

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
    >

      {/* =====================================================
          BASIC PRODUCT INFORMATION
      ====================================================== */}

      <section className="grid gap-4 sm:grid-cols-2">

        <label className={labelClass}>
          Product name *

          <input
            className={inputClass}
            required
            value={form.name}
            onChange={(e) =>
              setField(
                "name",
                e.target.value
              )
            }
          />
        </label>

        <label className={labelClass}>
          Slug

          <input
            className={inputClass}
            value={form.slug}
            onChange={(e) =>
              setField(
                "slug",
                e.target.value
              )
            }
            placeholder="Generated from product name if blank"
          />
        </label>

        <label className={labelClass}>
          Category *

          <input
            className={inputClass}
            required
            value={form.category}
            onChange={(e) =>
              setField(
                "category",
                e.target.value
              )
            }
          />
        </label>

        <label className={labelClass}>
          Price (₹) *

          <input
            className={inputClass}
            type="number"
            min="0"
            step="0.01"
            required
            value={form.price}
            onChange={(e) =>
              setField(
                "price",
                e.target.value
              )
            }
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
              setField(
                "compareAtPrice",
                e.target.value
              )
            }
          />
        </label>

        <label className={labelClass}>
          Main image URL

          <input
            className={inputClass}
            type="url"
            value={imageUrl}
            onChange={(e) =>
              setImageUrl(e.target.value)
            }
            placeholder="https://…"
          />
        </label>

        <label
          className={`${labelClass} sm:col-span-2`}
        >
          Or upload a main image

          <input
            className={`${inputClass} file:mr-3 file:rounded-md file:border-0 file:bg-gray-100 file:px-3 file:py-1.5`}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={(e) =>
              setImageFile(
                e.target.files?.[0] ||
                  null
              )
            }
          />

          {imageFile && (
            <span className="mt-1 block text-xs text-gray-500">
              {imageFile.name}
            </span>
          )}
        </label>

        {/* =================================================
            SHORT DESCRIPTION
        ================================================= */}

        <div className="sm:col-span-2">
          <label className={labelClass}>
            Short Description
          </label>

          <RichTextEditor
            value={form.shortDescription}
            onChange={(value) =>
              setField(
                "shortDescription",
                value
              )
            }
            placeholder="Write a short product description..."
            minHeight="110px"
          />
        </div>

        {/* =================================================
            DESCRIPTION
        ================================================= */}

        <div className="sm:col-span-2">
          <label className={labelClass}>
            Description *

          </label>

          <RichTextEditor
            value={form.description}
            onChange={(value) =>
              setField(
                "description",
                value
              )
            }
            placeholder="Write the complete product description..."
            minHeight="180px"
          />
        </div>
      </section>

      {/* =====================================================
          STOCK
      ====================================================== */}

      <section className="grid gap-4 border-t border-gray-100 pt-5 sm:grid-cols-2">

        <label className={labelClass}>
          Stock quantity

          <input
            className={inputClass}
            type="number"
            min="0"
            step="1"
            value={form.stock}
            onChange={(e) =>
              setField(
                "stock",
                e.target.value
              )
            }
          />
        </label>

        <label className={labelClass}>
          Low-stock threshold

          <input
            className={inputClass}
            type="number"
            min="0"
            step="1"
            value={form.lowStockThreshold}
            onChange={(e) =>
              setField(
                "lowStockThreshold",
                e.target.value
              )
            }
          />
        </label>
      </section>

      {/* =====================================================
          PRODUCT DETAILS
      ====================================================== */}

      <section className="grid gap-4 border-t border-gray-100 pt-5 sm:grid-cols-2">

        {FIELDS.map(
          ({ name, label }) => (
            <label
              key={name}
              className={labelClass}
            >
              {label}

              <textarea
                className={inputClass}
                rows={
                  name === "extraImages"
                    ? 2
                    : 3
                }
                value={form[name]}
                onChange={(e) =>
                  setField(
                    name,
                    e.target.value
                  )
                }
                placeholder={
                  name === "extraImages"
                    ? "One URL per line"
                    : "One item per line"
                }
              />
            </label>
          )
        )}
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
            value={
              form.youtubeUrl || ""
            }
            onChange={(e) =>
              setField(
                "youtubeUrl",
                e.target.value
              )
            }
          />
        </label>

        <label className={labelClass}>
          Instagram URL

          <input
            className={inputClass}
            type="url"
            value={
              form.instagramUrl || ""
            }
            onChange={(e) =>
              setField(
                "instagramUrl",
                e.target.value
              )
            }
          />
        </label>

        <label className={labelClass}>
          Meta title

          <input
            className={inputClass}
            value={
              form.metaTitle || ""
            }
            onChange={(e) =>
              setField(
                "metaTitle",
                e.target.value
              )
            }
          />
        </label>

        <label className={labelClass}>
          Meta description

          <textarea
            className={inputClass}
            rows={2}
            value={
              form.metaDescription ||
              ""
            }
            onChange={(e) =>
              setField(
                "metaDescription",
                e.target.value
              )
            }
          />
        </label>
      </section>

      {/* =====================================================
          STATUS
      ====================================================== */}

      <section className="flex flex-wrap gap-x-6 gap-y-3 border-t border-gray-100 pt-5">

        {[
          [
            "featured",
            "Featured product",
          ],
          [
            "trackInventory",
            "Track inventory",
          ],
          [
            "isActive",
            "Visible on storefront",
          ],
        ].map(
          ([name, label]) => (
            <label
              key={name}
              className="flex items-center gap-2 text-sm text-gray-700"
            >
              <input
                type="checkbox"
                checked={Boolean(
                  form[name]
                )}
                onChange={(e) =>
                  setField(
                    name,
                    e.target.checked
                  )
                }
                className="h-4 w-4 rounded border-gray-300 accent-[#3d7a72]"
              />

              {label}
            </label>
          )
        )}
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
          {loading
            ? "Saving…"
            : submitLabel}
        </button>
      </div>
    </form>
  );
}