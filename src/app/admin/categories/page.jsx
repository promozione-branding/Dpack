"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  RefreshCw,
  Upload,
  X,
  Loader2,
  ImageOff,
  Plus,
  Trash2,
  Pencil,
} from "lucide-react";
import { adminAPI } from "@/lib/apiClient";

function CategoryCard({ category, onUploaded, onImageRemoved, onDeleted, onEdit }) {
  const fileRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [preview, setPreview] = useState(null);

  const pickFile = () => fileRef.current?.click();

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setBusy(true);
    try {
      const formData = new FormData();
      formData.append("name", category.name);
      formData.append("image", file);
      const res = await adminAPI.uploadCategoryImage(formData);
      onUploaded(category.name, res.category.image);
    } catch (err) {
      alert("Failed to upload: " + err.message);
    } finally {
      setBusy(false);
      setPreview(null);
      e.target.value = "";
    }
  };

  const handleImageRemoval = async () => {
    if (!confirm(`Remove the image for "${category.name}"?`)) return;

    setBusy(true);
    try {
      await adminAPI.removeCategoryImage(category.name);
      onImageRemoved(category.name);
    } catch (err) {
      alert("Failed to remove image: " + err.message);
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async () => {
    const productMessage = category.productCount
      ? ` This will also permanently delete ${category.productCount} ${
          category.productCount === 1 ? "product" : "products"
        } assigned to it.`
      : "";
    if (!confirm(`Delete "${category.name}"?${productMessage} This cannot be undone.`)) return;

    setBusy(true);
    try {
      await adminAPI.deleteCategory(category.name);
      onDeleted(category.name);
    } catch (err) {
      alert("Failed to delete category: " + err.message);
    } finally {
      setBusy(false);
    }
  };

  const displayImage = preview || category.image;

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
      <div className="relative aspect-[4/3] bg-gray-50">
        {displayImage ? (
          <img src={displayImage} alt={category.name} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-gray-300">
            <ImageOff className="h-8 w-8" />
            <span className="text-xs font-medium">No image set</span>
          </div>
        )}
        {!category.inUse && (
          <span className="absolute left-2 top-2 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
            No products yet
          </span>
        )}
        {busy && (
          <div className="absolute inset-0 grid place-items-center bg-white/70">
            <Loader2 className="h-6 w-6 animate-spin text-rust" />
          </div>
        )}
      </div>

      <div className="p-4">
        <p className="truncate text-sm font-semibold text-gray-900">{category.name}</p>
        <p className="mt-1 text-xs text-gray-500">
          {category.productCount} {category.productCount === 1 ? "product" : "products"}
        </p>

        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={handleFile}
          className="hidden"
        />

        <div className="mt-3 flex gap-2">
          <button
            type="button"
            onClick={() => onEdit(category)}
            disabled={busy}
            aria-label={`Edit ${category.name}`}
            title="Edit category"
            className="flex items-center justify-center rounded-xl border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 transition-colors hover:border-rust hover:bg-orange-50 hover:text-rust disabled:opacity-50"
          >
            <Pencil className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={pickFile}
            disabled={busy}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 transition-colors hover:border-rust hover:text-rust disabled:opacity-50"
          >
            <Upload className="h-3.5 w-3.5" />
            {category.image ? "Replace" : "Upload"}
          </button>
          {category.image && (
            <button
              type="button"
              onClick={handleImageRemoval}
              disabled={busy}
              aria-label={`Remove image for ${category.name}`}
              title="Remove image"
              className="flex items-center justify-center rounded-xl border border-gray-200 px-3 py-2 text-xs font-medium text-red-500 transition-colors hover:border-red-300 hover:bg-red-50 disabled:opacity-50"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
          <button
            type="button"
            onClick={handleDelete}
            disabled={busy}
            aria-label={`Delete ${category.name} and its products`}
            title="Delete category and its products"
            className="flex items-center justify-center rounded-xl border border-red-200 px-3 py-2 text-xs font-medium text-red-600 transition-colors hover:border-red-300 hover:bg-red-50 disabled:opacity-50"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

function CategoryForm({ category, onSaved, onCancel }) {
  const isEditing = Boolean(category);
  const [name, setName] = useState(category?.name || "");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef(null);

  const handleFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Category name is required");
      return;
    }
    setError("");
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append("name", name.trim());
      if (category) formData.append("oldName", category.name);
      if (file) formData.append("image", file);
      const res = category
        ? await adminAPI.updateCategory(formData)
        : await adminAPI.uploadCategoryImage(formData);
      onSaved(res.category, category, res.warning);
    } catch (err) {
      setError(err.message || "Failed to create category");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 rounded-2xl border border-gray-200 bg-white p-5"
    >
      <div className="flex flex-wrap items-end gap-4">
        <div className="flex-1 min-w-[200px]">
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            {isEditing ? "Edit category name" : "Category name"}
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Strapping"
            autoFocus
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-rust focus:ring-2 focus:ring-rust/20"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Image
          </label>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50"
          >
            {preview ? (
              <img src={preview} alt="" className="h-5 w-5 rounded object-cover" />
            ) : category?.image ? (
              <img src={category.image} alt="" className="h-5 w-5 rounded object-cover" />
            ) : (
              <Upload className="h-4 w-4" />
            )}
            {file ? file.name : category?.image ? "Replace current image (optional)" : "Choose file"}
          </button>
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 rounded-xl bg-rust px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-rust/90 disabled:opacity-60"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {saving ? (isEditing ? "Saving…" : "Creating…") : isEditing ? "Save changes" : "Create"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm text-gray-600 hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </div>

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
    </form>
  );
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNew, setShowNew] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const fetchCategories = useCallback(() => adminAPI.listCategoryImages(), []);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetchCategories();
      setCategories(res.categories || []);
    } catch (cause) {
      setError(cause.message || "Failed to load categories.");
    } finally {
      setLoading(false);
    }
  }, [fetchCategories]);

  useEffect(() => {
    let active = true;
    fetchCategories()
      .then((res) => {
        if (active) setCategories(res.categories || []);
      })
      .catch((cause) => {
        if (active) setError(cause.message || "Failed to load categories.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [fetchCategories]);

  const handleUploaded = (name, image) => {
    setCategories((prev) => prev.map((c) => (c.name === name ? { ...c, image } : c)));
  };

  const handleImageRemoved = (name) => {
    setCategories((prev) => prev.map((c) => (c.name === name ? { ...c, image: null } : c)));
  };

  const handleDeleted = (name) => {
    setCategories((prev) => prev.filter((c) => c.name !== name));
  };

  const handleSaved = (category, previousCategory, warning) => {
    setCategories((prev) =>
      [
        ...prev.filter(
          (c) => c.name !== previousCategory?.name && c.name !== category.name
        ),
        {
          ...category,
          inUse: previousCategory?.inUse || false,
          productCount: previousCategory?.productCount || 0,
        },
      ].sort((a, b) => a.name.localeCompare(b.name))
    );
    setShowNew(false);
    setEditingCategory(null);
    setNotice(warning || (previousCategory ? "Category updated." : "Category created."));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
          <p className="mt-1 text-sm text-gray-500">
            Create categories and set the image shown for each on the homepage
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={load}
            className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
          {!showNew && !editingCategory && (
            <button
              onClick={() => {
                setEditingCategory(null);
                setShowNew(true);
              }}
              className="flex items-center gap-2 rounded-xl bg-rust px-4 py-2 text-sm font-semibold text-white hover:bg-rust/90"
            >
              <Plus className="h-4 w-4" />
              New Category
            </button>
          )}
        </div>
      </div>

      {error && (
        <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}
      {notice && (
        <p role="status" className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          {notice}
        </p>
      )}

      {(showNew || editingCategory) && (
        <CategoryForm
          category={editingCategory}
          onSaved={handleSaved}
          onCancel={() => {
            setShowNew(false);
            setEditingCategory(null);
          }}
        />
      )}

      {loading ? (
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading categories…
        </div>
      ) : categories.length === 0 ? (
        <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center text-sm text-gray-500">
          No categories yet — create one above, or add a product with a new category name.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((c) => (
            <CategoryCard
              key={c.name}
              category={c}
              onUploaded={handleUploaded}
              onImageRemoved={handleImageRemoved}
              onDeleted={handleDeleted}
              onEdit={(category) => {
                setShowNew(false);
                setEditingCategory(category);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}