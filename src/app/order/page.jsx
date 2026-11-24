"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Loader2, PackageSearch, Search } from "lucide-react";
import { ordersAPI } from "@/lib/apiClient";

export default function OrderSearchPage() {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (event) => {
    event.preventDefault();
    const searchId = orderId.trim();

    if (!searchId) {
      setError("Enter an order ID to search.");
      setOrder(null);
      return;
    }

    setLoading(true);
    setError("");
    setOrder(null);

    try {
      const response = await ordersAPI.getById(searchId);
      const foundOrder = response.order || response.data;

      if (response.success === false || !foundOrder) {
        throw new Error(response.message || "Order not found.");
      }

      setOrder(foundOrder);
    } catch (searchError) {
      console.error("Order search failed:", searchError);
      setError(searchError.message || "Unable to search for this order.");
    } finally {
      setLoading(false);
    }
  };

  const foundOrderId = order?.id || order?._id;

  return (
    <main className="min-h-[70vh] bg-[#F8F9FB] px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center bg-[#FFF4DD] text-[#F5A623]">
            <PackageSearch size={26} />
          </div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#F5A623]">
            Order lookup
          </p>
          <h1 className="mt-2 text-3xl font-bold text-[#081A33] sm:text-4xl">
            Find your order
          </h1>
          <p className="mt-3 text-sm text-[#081A33]/60">
            Enter the order ID to view its details and status.
          </p>
        </div>

        <form
          onSubmit={handleSearch}
          className="flex flex-col gap-3 border border-[#081A33]/10 bg-white p-4 shadow-sm sm:flex-row sm:p-5"
        >
          <label className="sr-only" htmlFor="order-id">
            Order ID
          </label>
          <input
            id="order-id"
            type="text"
            value={orderId}
            onChange={(event) => setOrderId(event.target.value)}
            placeholder="Enter your order ID"
            autoComplete="off"
            className="min-w-0 flex-1 border border-[#081A33]/15 px-4 py-3 text-sm text-[#081A33] outline-none transition placeholder:text-[#081A33]/40 focus:border-[#F5A623]"
          />
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 bg-[#081A33] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#F5A623] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <Loader2 size={17} className="animate-spin" />
            ) : (
              <Search size={17} />
            )}
            {loading ? "Searching..." : "Search order"}
          </button>
        </form>

        {error && (
          <p
            role="alert"
            className="mt-4 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {error}
          </p>
        )}

        {order && foundOrderId && (
          <section
            aria-live="polite"
            className="mt-6 border border-[#081A33]/10 bg-white p-5 shadow-sm sm:p-6"
          >
            <p className="text-xs font-bold uppercase tracking-wider text-[#081A33]/45">
              Order found
            </p>
            <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="break-all text-lg font-bold text-[#081A33]">
                  {foundOrderId}
                </h2>
                {order.status && (
                  <p className="mt-1 text-sm capitalize text-[#081A33]/60">
                    Status: {order.status}
                  </p>
                )}
              </div>
              <Link
                href={`/order/${foundOrderId}`}
                className="inline-flex shrink-0 items-center justify-center gap-2 bg-[#FFF4DD] px-5 py-3 text-sm font-bold text-[#081A33] transition hover:bg-[#F5A623]"
              >
                View order
                <ArrowRight size={16} />
              </Link>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
