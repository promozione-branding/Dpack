"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";
import ProductForm from "@/components/admin/ProductForm";
import { adminAPI } from "@/lib/apiClient";

function productsReturnUrl() {
  const currentParams = new URLSearchParams(window.location.search);
  const returnParams = new URLSearchParams();
  const page = currentParams.get("page");
  const search = currentParams.get("search");

  if (page) returnParams.set("page", page);
  if (search) returnParams.set("search", search);

  const query = returnParams.toString();
  return `/admin/products${query ? `?${query}` : ""}`;
}

export default function EditProductPage({ params }) {
  const { id } = use(params);
  const router = useRouter();

  const [product, setProduct] = useState(null);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    adminAPI
      .getProduct(id)
      .then((res) => {
        if (!cancelled) {
          setProduct(res.product);
        }
      })
      .catch((e) => {
        if (!cancelled) {
          setError(e.message || "Failed to load product.");
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoadingProduct(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  const handleSubmit = async (formData) => {
    setSaving(true);
    setError("");

    try {
      await adminAPI.updateProduct(id, formData);
      setSuccess(true);

      setTimeout(() => {
        router.push(productsReturnUrl());
      }, 1200);
    } catch (e) {
      setError(e.message || "Failed to update product.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="relative w-full max-w-6xl min-w-0 space-y-6 pb-8">
      <div className="flex min-w-0 items-center gap-4">
        <Link
          href="/admin/products"
          aria-label="Back to products"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 hover:bg-gray-50"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>

        <div className="min-w-0">
          <h1 className="text-2xl font-bold text-gray-900">
            Edit Product
          </h1>
          <p className="break-all font-mono text-sm text-gray-500">
            {product?.slug}
          </p>
        </div>
      </div>

      {success && (
        <div className="flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-green-800">
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          Product updated! Redirecting…
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {loadingProduct ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      ) : product ? (
        <ProductForm
          initial={product}
          onSubmit={handleSubmit}
          loading={saving}
          submitLabel="Update Product"
        />
      ) : (
        <p className="py-6 text-gray-500">Product not found.</p>
      )}
    </div>
  );
}