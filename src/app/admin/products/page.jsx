"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Eye,
  Package,
  AlertTriangle,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Upload,
  Download,
  FileSpreadsheet,
  X,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { adminAPI } from "@/lib/apiClient";

function StockBadge({ product }) {
  if (!product.trackInventory) {
    return (
      <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
        Untracked
      </span>
    );
  }

  if (product.stock <= 0) {
    return (
      <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">
        Out of stock
      </span>
    );
  }

  if (product.stock <= product.lowStockThreshold) {
    return (
      <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
        Low: {product.stock}
      </span>
    );
  }

  return (
    <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
      {product.stock} in stock
    </span>
  );
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [error, setError] = useState("");

  const [importOpen, setImportOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [importing, setImporting] = useState(false);
  const [importResult, setImportResult] = useState(null);
  const [importError, setImportError] = useState("");

  const fileInputRef = useRef(null);

  const limit = 12;

  const load = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const res = await adminAPI.listProducts({
        page,
        limit,
        search: search || undefined,
      });

      setProducts(res.products);
      setTotal(res.total);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    const timer = setTimeout(load, 0);

    return () => clearTimeout(timer);
  }, [load]);

  const handleDelete = async (id, name) => {
    if (
      !confirm(
        `Delete "${name}"? This cannot be undone.`
      )
    ) {
      return;
    }

    setDeleting(id);

    try {
      await adminAPI.deleteProduct(id);

      setProducts((p) =>
        p.filter((x) => x._id !== id)
      );

      setTotal((t) => t - 1);
    } catch (e) {
      alert(
        "Delete failed: " + e.message
      );
    } finally {
      setDeleting(null);
    }
  };

  const saveCSV = (blob, filename) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const handleExport = async () => {
    try {
      const blob = await adminAPI.exportProducts();
      const date = new Date().toISOString().slice(0, 10);
      saveCSV(blob, `dpack-products-${date}.csv`);
    } catch (e) {
      alert("CSV export failed: " + e.message);
    }
  };

  const handleTemplate = async () => {
    setImportError("");

    try {
      const blob = await adminAPI.downloadProductTemplate();
      saveCSV(blob, "dpack-products-template.csv");
    } catch (e) {
      setImportError("Template download failed: " + e.message);
    }
  };

  const openImport = () => {
    setSelectedFile(null);
    setImportResult(null);
    setImportError("");
    setImportOpen(true);
  };

  const closeImport = () => {
    if (importing) return;

    setImportOpen(false);
    setSelectedFile(null);
    setImportResult(null);
    setImportError("");
  };

  const handleFileChange = (event) => {
    const file =
      event.target.files?.[0];

    if (!file) return;

    if (
      !file.name
        .toLowerCase()
        .endsWith(".csv")
    ) {
      setImportError(
        "Please select a CSV file."
      );
      setSelectedFile(null);
      return;
    }

    setImportError("");
    setImportResult(null);
    setSelectedFile(file);
  };

  const handleImport = async () => {
    if (!selectedFile) {
      setImportError(
        "Please select a CSV file first."
      );
      return;
    }

    setImporting(true);
    setImportError("");
    setImportResult(null);

    try {
      const formData = new FormData();

      formData.append(
        "file",
        selectedFile
      );

      const result = await adminAPI.importProducts(formData);

      setImportResult(result);

      await load();
    } catch (error) {
      setImportError(
        error.message ||
          "CSV import failed"
      );
    } finally {
      setImporting(false);
    }
  };

  const totalPages = Math.ceil(
    total / limit
  );

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Products
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            {total} products total
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">

          {/* IMPORT */}
          <button
            type="button"
            onClick={openImport}
            className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-rust hover:text-rust"
          >
            <Upload className="h-4 w-4" />
            Import CSV
          </button>

          {/* EXPORT */}
          <button
            type="button"
            onClick={handleExport}
            className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-rust hover:text-rust"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </button>

          {/* ADD */}
          <Link
            href="/admin/products/new"
            className="flex items-center gap-2 rounded-xl bg-rust px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-rust/90"
          >
            <Plus className="h-4 w-4" />
            Add Product
          </Link>
        </div>
      </div>

      {/* SEARCH */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          placeholder="Search by name or category…"
          className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-11 pr-4 text-sm outline-none focus:border-rust focus:ring-2 focus:ring-rust/20"
        />
      </div>

      {/* ERROR */}
      {error && (
        <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertTriangle className="h-4 w-4 shrink-0" />

          {error}

          <button
            onClick={load}
            className="ml-auto text-red-500 hover:text-red-700"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* PRODUCTS TABLE */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        {loading ? (
          <div className="divide-y divide-gray-50">
            {[...Array(6)].map(
              (_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4"
                >
                  <div className="h-14 w-14 animate-pulse rounded-xl bg-gray-100" />

                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-48 animate-pulse rounded bg-gray-100" />

                    <div className="h-3 w-24 animate-pulse rounded bg-gray-100" />
                  </div>
                </div>
              )
            )}
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-16 text-center">
            <Package className="h-10 w-10 text-gray-300" />

            <p className="font-semibold text-gray-500">
              No products found
            </p>

            <Link
              href="/admin/products/new"
              className="text-sm text-rust hover:underline"
            >
              Add your first product
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                  <th className="px-5 py-3.5">
                    Product
                  </th>

                  <th className="px-4 py-3.5">
                    Category
                  </th>

                  <th className="px-4 py-3.5">
                    Price
                  </th>

                  <th className="px-4 py-3.5">
                    Stock
                  </th>

                  <th className="px-4 py-3.5">
                    Status
                  </th>

                  <th className="px-4 py-3.5 text-right">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-50">
                {products.map((p) => (
                  <tr
                    key={p._id}
                    className="group hover:bg-gray-50/70"
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="h-12 w-12 shrink-0 rounded-xl border border-gray-100 bg-gray-50 object-contain p-1"
                        />

                        <div>
                          <p className="line-clamp-1 font-semibold text-gray-900">
                            {p.name}
                          </p>

                          <p className="font-mono text-xs text-gray-400">
                            {p.slug}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3.5">
                      <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
                        {p.category}
                      </span>
                    </td>

                    <td className="px-4 py-3.5 font-medium text-gray-900">
                      ₹
                      {p.price?.toLocaleString(
                        "en-IN"
                      )}

                      {p.compareAtPrice >
                        p.price && (
                        <span className="ml-1.5 text-xs text-gray-400 line-through">
                          ₹
                          {p.compareAtPrice?.toLocaleString(
                            "en-IN"
                          )}
                        </span>
                      )}
                    </td>

                    <td className="px-4 py-3.5">
                      <StockBadge
                        product={p}
                      />
                    </td>

                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <span
                          className={`h-2 w-2 rounded-full ${
                            p.isActive
                              ? "bg-green-500"
                              : "bg-gray-300"
                          }`}
                        />

                        <span className="text-xs text-gray-500">
                          {p.isActive
                            ? "Active"
                            : "Hidden"}
                        </span>

                        {p.featured && (
                          <span className="rounded-full bg-rust/10 px-1.5 py-0.5 text-[10px] font-semibold text-rust">
                            Featured
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="px-4 py-3.5">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          href={`/products/${p.slug}`}
                          target="_blank"
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-transparent text-gray-400 transition hover:border-gray-200 hover:bg-gray-100 hover:text-gray-700"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>

                        <Link
                          href={`/admin/products/${p._id}/edit`}
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-transparent text-gray-400 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                        >
                          <Pencil className="h-4 w-4" />
                        </Link>

                        <button
                          onClick={() =>
                            handleDelete(
                              p._id,
                              p.name
                            )
                          }
                          disabled={
                            deleting === p._id
                          }
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-transparent text-gray-400 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:opacity-40"
                        >
                          {deleting ===
                          p._id ? (
                            <RefreshCw className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            {(page - 1) * limit + 1}–
            {Math.min(
              page * limit,
              total
            )}{" "}
            of {total}
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                setPage((p) =>
                  Math.max(1, p - 1)
                )
              }
              disabled={page === 1}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 transition hover:bg-gray-50 disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <span className="text-sm font-medium text-gray-700">
              {page} / {totalPages}
            </span>

            <button
              onClick={() =>
                setPage((p) =>
                  Math.min(
                    totalPages,
                    p + 1
                  )
                )
              }
              disabled={
                page === totalPages
              }
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 transition hover:bg-gray-50 disabled:opacity-40"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* IMPORT MODAL */}
      {importOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">
            {/* MODAL HEADER */}
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Import Products
                </h2>

                <p className="mt-0.5 text-xs text-gray-500">
                  Import or update products using CSV
                </p>
              </div>

              <button
                onClick={closeImport}
                disabled={importing}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* MODAL BODY */}
            <div className="space-y-5 p-6">
              <div
                onClick={() =>
                  fileInputRef.current?.click()
                }
                className="cursor-pointer rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 p-8 text-center transition hover:border-rust hover:bg-rust/5"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv,text/csv"
                  onChange={
                    handleFileChange
                  }
                  className="hidden"
                />

                <FileSpreadsheet className="mx-auto h-10 w-10 text-gray-400" />

                {selectedFile ? (
                  <>
                    <p className="mt-3 font-semibold text-gray-800">
                      {selectedFile.name}
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      {(
                        selectedFile.size /
                        1024
                      ).toFixed(1)}{" "}
                      KB
                    </p>
                  </>
                ) : (
                  <>
                    <p className="mt-3 font-semibold text-gray-700">
                      Choose CSV file
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      Click here to select your CSV
                    </p>
                  </>
                )}
              </div>

              {/* INFO */}
              <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
                <p className="text-sm font-semibold text-blue-900">
                  How import works
                </p>

                <ul className="mt-2 space-y-1 text-xs text-blue-700">
                  <li>
                    • Existing slug → product updated
                  </li>

                  <li>
                    • New slug → new product created
                  </li>

                  <li>
                    • Product images use URL values
                  </li>

                  <li>
                    • Features/specifications support JSON arrays
                  </li>
                </ul>
              </div>

              {/* ERROR */}
              {importError && (
                <div className="flex gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                  <XCircle className="h-5 w-5 shrink-0" />

                  <span>
                    {importError}
                  </span>
                </div>
              )}

              {/* RESULT */}
              {importResult && (
                <div className="rounded-xl border border-green-200 bg-green-50 p-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />

                    <p className="font-semibold text-green-800">
                      Import completed
                    </p>
                  </div>

                  <div className="mt-3 grid grid-cols-3 gap-2">
                    <div className="rounded-lg bg-white p-3 text-center">
                      <p className="text-lg font-bold text-green-600">
                        {
                          importResult
                            .summary
                            .created
                        }
                      </p>

                      <p className="text-[11px] text-gray-500">
                        Created
                      </p>
                    </div>

                    <div className="rounded-lg bg-white p-3 text-center">
                      <p className="text-lg font-bold text-blue-600">
                        {
                          importResult
                            .summary
                            .updated
                        }
                      </p>

                      <p className="text-[11px] text-gray-500">
                        Updated
                      </p>
                    </div>

                    <div className="rounded-lg bg-white p-3 text-center">
                      <p className="text-lg font-bold text-red-600">
                        {
                          importResult
                            .summary
                            .skipped
                        }
                      </p>

                      <p className="text-[11px] text-gray-500">
                        Errors
                      </p>
                    </div>
                  </div>

                  {importResult.errors
                    ?.length > 0 && (
                    <div className="mt-3 max-h-32 overflow-y-auto rounded-lg bg-white p-3">
                      {importResult.errors.map(
                        (
                          error,
                          index
                        ) => (
                          <p
                            key={index}
                            className="text-xs text-red-600"
                          >
                            Row{" "}
                            {
                              error.row
                            }
                            :{" "}
                            {
                              error.message
                            }
                          </p>
                        )
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* MODAL FOOTER */}
            <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50 px-6 py-4">
              <button
                type="button"
                onClick={handleTemplate}
                className="text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                Download Template
              </button>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={closeImport}
                  disabled={importing}
                  className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleImport}
                  disabled={
                    !selectedFile ||
                    importing
                  }
                  className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition disabled:cursor-not-allowed ${
                    selectedFile && !importing
                      ? "bg-[#9a4b35] hover:bg-[#843e2c]"
                      : "bg-gray-300"
                  }`}
                >
                  {importing ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      Importing...
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4" />
                      Import CSV
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}