
"use client";

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  RefreshCw,
  Upload,
  X,
  Loader2,
  ImageOff,
  Plus,
  Trash2,
  Pencil,
  Link as LinkIcon,
} from "lucide-react";

import { adminAPI } from "@/lib/apiClient";

/* =========================================================
   SLUG HELPER
========================================================= */

function generateSlug(value = "") {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/* =========================================================
   RESPONSE HELPERS
========================================================= */

function getResponseCategory(response) {
  return response?.category || response?.data?.category || null;
}

function getResponseError(response, fallback) {
  if (response?.success === false) {
    return response.message || fallback;
  }

  return "";
}

/* =========================================================
   CATEGORY CARD
========================================================= */

function CategoryCard({
  category,
  onUploaded,
  onImageRemoved,
  onDeleted,
  onEdit,
}) {
  const [uploading, setUploading] = useState(false);
  const [removingImage, setRemovingImage] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  const fileInputRef = useRef(null);

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];

    // Allow selecting the same file again.
    event.target.value = "";

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    setError("");
    setUploading(true);

    try {
      const formData = new FormData();

      formData.append("name", category.name);
      formData.append("slug", category.slug || generateSlug(category.name));
      formData.append("image", file);

      const response = await adminAPI.uploadCategoryImage(formData);

      const responseError = getResponseError(
        response,
        "Failed to upload category image."
      );

      if (responseError) {
        throw new Error(responseError);
      }

      onUploaded?.(getResponseCategory(response) || response);
    } catch (err) {
      setError(err?.message || "Failed to upload category image.");
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = async () => {
    if (!window.confirm(`Remove the image for "${category.name}"?`)) {
      return;
    }

    setError("");
    setRemovingImage(true);

    try {
      const response = await adminAPI.removeCategoryImage(category.name);

      const responseError = getResponseError(
        response,
        "Failed to remove category image."
      );

      if (responseError) {
        throw new Error(responseError);
      }

      onImageRemoved?.(category.name);
    } catch (err) {
      setError(err?.message || "Failed to remove category image.");
    } finally {
      setRemovingImage(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`Delete category "${category.name}"?`)) {
      return;
    }

    setError("");
    setDeleting(true);

    try {
      const response = await adminAPI.deleteCategory(category.name);

      const responseError = getResponseError(
        response,
        "Failed to delete category."
      );

      if (responseError) {
        throw new Error(responseError);
      }

      onDeleted?.(category.name);
    } catch (err) {
      setError(err?.message || "Failed to delete category.");
    } finally {
      setDeleting(false);
    }
  };

  const slug = category.slug || generateSlug(category.name);
  const image = category.image || "";

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
      <div className="relative flex h-48 items-center justify-center overflow-hidden bg-gray-50">
        {image ? (
          <img
            src={image}
            alt={category.name}
            className="h-full w-full object-contain p-3"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-gray-400">
            <ImageOff size={36} strokeWidth={1.5} />
            <span className="text-sm">No image added</span>
          </div>
        )}

        <div className="absolute right-3 top-3 flex gap-2">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading || removingImage || deleting}
            title="Upload category image"
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-gray-700 shadow transition hover:bg-gray-100 disabled:opacity-50"
          >
            {uploading ? (
              <Loader2 size={17} className="animate-spin" />
            ) : (
              <Upload size={17} />
            )}
          </button>

          {image && (
            <button
              type="button"
              onClick={handleRemoveImage}
              disabled={uploading || removingImage || deleting}
              title="Remove category image"
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-red-600 shadow transition hover:bg-red-50 disabled:opacity-50"
            >
              {removingImage ? (
                <Loader2 size={17} className="animate-spin" />
              ) : (
                <X size={17} />
              )}
            </button>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-base font-semibold text-gray-900">
              {category.name}
            </h3>

            <div className="mt-2 flex items-start gap-1.5 text-xs text-gray-500">
              <LinkIcon size={13} className="mt-0.5 shrink-0" />
              <p className="break-all">
                <span className="font-medium">Slug:</span> {slug}
              </p>
            </div>

            <p className="mt-2 text-sm text-gray-500">
              {category.productCount ?? category.inUse ?? 0} products
            </p>
          </div>

          <div className="flex shrink-0 gap-1">
            <button
              type="button"
              onClick={() => onEdit?.(category)}
              disabled={deleting}
              title="Edit category"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition hover:bg-gray-50 disabled:opacity-50"
            >
              <Pencil size={16} />
            </button>

            <button
              type="button"
              onClick={handleDelete}
              disabled={deleting || uploading || removingImage}
              title="Delete category"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-100 text-red-600 transition hover:bg-red-50 disabled:opacity-50"
            >
              {deleting ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Trash2 size={16} />
              )}
            </button>
          </div>
        </div>

        {error && (
          <p className="mt-3 rounded-lg bg-red-50 p-2 text-xs text-red-600">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

/* =========================================================
   CATEGORY CREATE / EDIT FORM
========================================================= */

function CategoryForm({ category, onSaved, onCancel }) {
  const isEditing = Boolean(category);

  const [name, setName] = useState(category?.name || "");
  const [slug, setSlug] = useState(
    category?.slug || generateSlug(category?.name || "")
  );
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(
    Boolean(category?.slug)
  );

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(category?.image || "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const fileInputRef = useRef(null);

  // Create a preview for the newly selected image.
  useEffect(() => {
    if (!file) {
      setPreview(category?.image || "");
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [file, category?.image]);

  const handleNameChange = (event) => {
    const value = event.target.value;

    setName(value);

    if (!slugManuallyEdited) {
      setSlug(generateSlug(value));
    }

    setError("");
  };

  const handleSlugChange = (event) => {
    setSlug(generateSlug(event.target.value));
    setSlugManuallyEdited(true);
    setError("");
  };

  const handleGenerateSlug = () => {
    setSlug(generateSlug(name));
    setSlugManuallyEdited(false);
    setError("");
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) return;

    if (!selectedFile.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      event.target.value = "";
      return;
    }

    setFile(selectedFile);
    setError("");
  };

  const handleRemoveSelectedImage = () => {
    setFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (saving) return;

    setError("");

    const trimmedName = name.trim();
    const finalSlug = generateSlug(slug);

    if (!trimmedName) {
      setError("Please enter a category name.");
      return;
    }

    if (!finalSlug) {
      setError("Please enter a valid category slug.");
      return;
    }

    setSaving(true);

    try {
      const formData = new FormData();

      formData.append("name", trimmedName);
      formData.append("slug", finalSlug);

      if (isEditing) {
        formData.append("oldName", category.name);

        if (category._id) {
          formData.append("id", category._id);
        }
      }

      if (file) {
        formData.append("image", file);
      }

      const response = isEditing
        ? await adminAPI.updateCategory(formData)
        : await adminAPI.uploadCategoryImage(formData);

      const responseError = getResponseError(
        response,
        `Failed to ${isEditing ? "update" : "create"} category.`
      );

      if (responseError) {
        throw new Error(responseError);
      }

      const savedCategory = getResponseCategory(response);

      if (!savedCategory) {
        throw new Error(
          "Category API did not return a category. Check the API response format."
        );
      }

      onSaved?.(
        {
          ...savedCategory,
          slug: savedCategory.slug || finalSlug,
        },
        category,
        response?.warning || ""
      );
    } catch (err) {
      setError(
        err?.message ||
          `Failed to ${isEditing ? "update" : "create"} category.`
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            {isEditing ? "Edit Category" : "Create Category"}
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Add or update the category name, slug and image.
          </p>
        </div>

        <button
          type="button"
          onClick={onCancel}
          disabled={saving}
          title="Close form"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 disabled:opacity-50"
        >
          <X size={18} />
        </button>
      </div>

      {/* Category name */}
      <div>
        <label
          htmlFor="category-name"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Category Name <span className="text-red-500">*</span>
        </label>

        <input
          id="category-name"
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="e.g. Dunnage Air Bags"
          required
          maxLength={100}
          className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      {/* Category slug */}
      <div>
        <div className="mb-2 flex items-center justify-between gap-3">
          <label
            htmlFor="category-slug"
            className="block text-sm font-medium text-gray-700"
          >
            Category Slug <span className="text-red-500">*</span>
          </label>

          <button
            type="button"
            onClick={handleGenerateSlug}
            className="text-xs font-medium text-blue-600 hover:text-blue-800"
          >
            Generate from name
          </button>
        </div>

        <input
          id="category-slug"
          type="text"
          value={slug}
          onChange={handleSlugChange}
          placeholder="e.g. dunnage-air-bags"
          required
          maxLength={150}
          pattern="[a-z0-9]+(-[a-z0-9]+)*"
          title="Use lowercase letters, numbers and hyphens only."
          className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />

        <p className="mt-2 text-xs text-gray-500">
          Lowercase letters, numbers and hyphens only.
        </p>

        <div className="mt-3 rounded-lg bg-gray-50 p-3">
          <p className="mb-1 text-xs font-medium text-gray-500">
            URL preview
          </p>

          <p className="break-all text-sm text-gray-800">
            /products-categories/{slug || "your-category-slug"}
          </p>
        </div>
      </div>

      {/* Category image */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Category Image
        </label>

        {preview ? (
          <div className="relative mb-3 flex h-40 items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
            <img
              src={preview}
              alt={`${name || "Category"} preview`}
              className="h-full w-full object-contain p-2"
            />

            <button
              type="button"
              onClick={handleRemoveSelectedImage}
              disabled={saving}
              title="Remove selected image"
              className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white text-red-600 shadow hover:bg-red-50 disabled:opacity-50"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={saving}
            className="flex h-32 w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 text-gray-500 transition hover:border-blue-400 hover:bg-blue-50/30 disabled:opacity-50"
          >
            <Upload size={22} />
            <span className="text-sm">Click to upload an image</span>
            <span className="text-xs">Image files only</span>
          </button>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={saving}
          className="hidden"
        />

        {preview && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={saving}
            className="text-sm font-medium text-blue-600 hover:text-blue-800 disabled:opacity-50"
          >
            Change image
          </button>
        )}
      </div>

      {error && (
        <div className="rounded-lg border border-red-100 bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Form actions */}
      <div className="flex flex-wrap justify-end gap-3 border-t border-gray-100 pt-4">
        <button
          type="button"
          onClick={onCancel}
          disabled={saving}
          className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={saving}
          className="flex items-center justify-center gap-2 rounded-lg bg-[#081A33] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#102b50] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Saving...
            </>
          ) : (
            <>
              {isEditing ? <Pencil size={16} /> : <Plus size={16} />}
              {isEditing ? "Update Category" : "Create Category"}
            </>
          )}
        </button>
      </div>
    </form>
  );
}

/* =========================================================
   ADMIN CATEGORIES PAGE
========================================================= */

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [notice, setNotice] = useState("");

  const fetchCategories = useCallback(async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    setError("");

    try {
      const response = await adminAPI.listCategoryImages();

      const responseError = getResponseError(
        response,
        "Failed to load categories."
      );

      if (responseError) {
        throw new Error(responseError);
      }

      const list =
        response?.categories ||
        response?.data?.categories ||
        [];

      setCategories(
        list.map((category) => ({
          ...category,
          slug: category.slug || generateSlug(category.name),
        }))
      );
    } catch (err) {
      setError(err?.message || "Failed to load categories.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleUploaded = (updatedCategory) => {
    if (!updatedCategory?.name) {
      fetchCategories(true);
      return;
    }

    setCategories((previous) =>
      previous.map((category) =>
        category.name === updatedCategory.name
          ? {
              ...category,
              ...updatedCategory,
              slug:
                updatedCategory.slug ||
                category.slug ||
                generateSlug(updatedCategory.name),
            }
          : category
      )
    );

    setNotice("Category image updated successfully.");
  };

  const handleImageRemoved = (categoryName) => {
    setCategories((previous) =>
      previous.map((category) =>
        category.name === categoryName
          ? { ...category, image: "", imagePublicId: "" }
          : category
      )
    );

    setNotice("Category image removed successfully.");
  };

  const handleDeleted = (categoryName) => {
    setCategories((previous) =>
      previous.filter((category) => category.name !== categoryName)
    );

    setNotice("Category deleted successfully.");
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setShowForm(true);
    setNotice("");
    setError("");
  };

  const handleCreate = () => {
    setEditingCategory(null);
    setShowForm(true);
    setNotice("");
    setError("");
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingCategory(null);
  };

  const handleSaved = (savedCategory, oldCategory, responseWarning) => {
    setCategories((previous) => {
      const oldName = oldCategory?.name;

      const mergedCategory = {
        ...previous.find((item) => item.name === oldName),
        ...savedCategory,
        slug:
          savedCategory.slug ||
          generateSlug(savedCategory.name || ""),
      };

      let updated;

      if (oldName) {
        const exists = previous.some((item) => item.name === oldName);

        updated = exists
          ? previous.map((item) =>
              item.name === oldName ? mergedCategory : item
            )
          : [...previous, mergedCategory];
      } else {
        const exists = previous.some(
          (item) => item.name === mergedCategory.name
        );

        updated = exists
          ? previous.map((item) =>
              item.name === mergedCategory.name
                ? { ...item, ...mergedCategory }
                : item
            )
          : [...previous, mergedCategory];
      }

      return updated.sort((a, b) =>
        (a.name || "").localeCompare(b.name || "")
      );
    });

    setShowForm(false);
    setEditingCategory(null);
    setError("");

    setNotice(
      responseWarning ||
        `Category ${oldCategory ? "updated" : "created"} successfully.`
    );

    fetchCategories(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Page header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Categories
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Manage category names, URL slugs and images.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => fetchCategories(true)}
              disabled={refreshing || loading}
              className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100 disabled:opacity-50"
            >
              <RefreshCw
                size={16}
                className={refreshing ? "animate-spin" : ""}
              />
              Refresh
            </button>

            <button
              type="button"
              onClick={showForm ? handleCancelForm : handleCreate}
              className="flex items-center justify-center gap-2 rounded-lg bg-[#081A33] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#102b50]"
            >
              {showForm ? <X size={17} /> : <Plus size={17} />}
              {showForm ? "Close Form" : "Add Category"}
            </button>
          </div>
        </div>

        {/* Success notice */}
        {notice && (
          <div className="mb-5 flex items-start justify-between gap-3 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">
            <span>{notice}</span>

            <button
              type="button"
              onClick={() => setNotice("")}
              className="shrink-0"
              title="Dismiss notice"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* General error */}
        {error && (
          <div className="mb-5 flex items-start justify-between gap-3 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
            <span>{error}</span>

            <button
              type="button"
              onClick={() => setError("")}
              className="shrink-0"
              title="Dismiss error"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* Create / edit form */}
        {showForm && (
          <div className="mb-8">
            <CategoryForm
              key={
                editingCategory?._id ||
                editingCategory?.name ||
                "new-category"
              }
              category={editingCategory}
              onSaved={handleSaved}
              onCancel={handleCancelForm}
            />
          </div>
        )}

        {/* Category count */}
        {!loading && (
          <div className="mb-4 text-sm text-gray-500">
            Total categories:{" "}
            <span className="font-semibold text-gray-900">
              {categories.length}
            </span>
          </div>
        )}

        {/* Loading / Empty / Grid */}
        {loading ? (
          <div className="flex min-h-52 items-center justify-center">
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <Loader2 size={22} className="animate-spin" />
              Loading categories...
            </div>
          </div>
        ) : categories.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-300 bg-white px-5 py-14 text-center">
            <ImageOff
              size={38}
              className="mx-auto mb-3 text-gray-400"
            />

            <h3 className="text-base font-semibold text-gray-900">
              No categories found
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Create your first category to get started.
            </p>

            {!showForm && (
              <button
                type="button"
                onClick={handleCreate}
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#081A33] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#102b50]"
              >
                <Plus size={17} />
                Create Category
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {categories.map((category) => (
              <CategoryCard
                key={category._id || category.name}
                category={category}
                onUploaded={handleUploaded}
                onImageRemoved={handleImageRemoved}
                onDeleted={handleDeleted}
                onEdit={handleEdit}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
