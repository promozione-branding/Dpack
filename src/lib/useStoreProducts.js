"use client";

import { useEffect, useState } from "react";

export function useStoreProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadProducts() {
      setLoading(true);
      setError("");
      try {
        const pageSize = 100;
        const loadedProducts = [];
        let total = Infinity;
        let page = 1;
        let availableCategories = [];

        while (loadedProducts.length < total) {
          const response = await fetch(`/api/products?page=${page}&limit=${pageSize}`, {
            cache: "no-store",
          });
          const data = await response.json();
          if (!response.ok || !data.success) {
            throw new Error(data.error || "Could not load products.");
          }

          const pageProducts = Array.isArray(data.products) ? data.products : [];
          loadedProducts.push(...pageProducts);
          availableCategories = Array.isArray(data.categories) ? data.categories : [];
          total = Number.isFinite(Number(data.total)) ? Number(data.total) : loadedProducts.length;
          if (pageProducts.length === 0) break;
          page += 1;
        }

        if (!cancelled) {
          setProducts(loadedProducts);
          setCategories(availableCategories);
        }
      } catch (loadError) {
        console.error("Store products fetch failed:", loadError);
        if (!cancelled) setError(loadError.message || "Could not load products.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadProducts();
    return () => {
      cancelled = true;
    };
  }, []);

  return { products, categories, loading, error };
}
