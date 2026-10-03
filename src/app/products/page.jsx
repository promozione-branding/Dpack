"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  Search,
  SlidersHorizontal,
  Heart,
  ShoppingCart,
  ChevronDown,
  X,
  Check,
  Star,
  ArrowRight,
  Truck,
  ShieldCheck,
  PackageCheck,
} from "lucide-react";

import products, { categories } from "@/app/Data/products";

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [wishlist, setWishlist] = useState([]);
  const [mobileFilter, setMobileFilter] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  /* =========================================================
     NORMALIZE CATEGORIES
  ========================================================= */

  const normalizedCategories = useMemo(() => {
    if (!Array.isArray(categories)) return [];

    return categories
      .map((category, index) => {
        if (typeof category === "string") {
          return {
            name: category,
            key: category,
            index,
          };
        }

        if (category && typeof category === "object") {
          const name =
            category.name ||
            category.title ||
            category.label ||
            category.category ||
            "";

          const key =
            category.slug ||
            category.id ||
            name ||
            `category-${index}`;

          return {
            name,
            key: String(key),
            index,
          };
        }

        return null;
      })
      .filter((category) => category && category.name);
  }, []);

  /* =========================================================
     CATEGORY COUNT
  ========================================================= */

  const getCategoryCount = (categoryName) => {
    if (categoryName === "All Products") {
      return products.length;
    }

    return products.filter(
      (product) => product.category === categoryName
    ).length;
  };

  /* =========================================================
     FILTER + SEARCH + SORT
  ========================================================= */

  const filteredProducts = useMemo(() => {
    let result = [...products];

    /* Category */
    if (selectedCategory !== "All Products") {
      result = result.filter(
        (product) => product.category === selectedCategory
      );
    }

    /* Search */
    if (search.trim()) {
      const query = search.toLowerCase().trim();

      result = result.filter((product) => {
        return (
          product.name?.toLowerCase().includes(query) ||
          product.category?.toLowerCase().includes(query) ||
          product.sku?.toLowerCase().includes(query)
        );
      });
    }

    /* Sort */
    if (sortBy === "price-low") {
      result.sort((a, b) => {
        return Number(a.price || 0) - Number(b.price || 0);
      });
    }

    if (sortBy === "price-high") {
      result.sort((a, b) => {
        return Number(b.price || 0) - Number(a.price || 0);
      });
    }

    if (sortBy === "rating") {
      result.sort((a, b) => {
        return Number(b.rating || 0) - Number(a.rating || 0);
      });
    }

    if (sortBy === "name") {
      result.sort((a, b) =>
        String(a.name || "").localeCompare(String(b.name || ""))
      );
    }

    if (sortBy === "featured") {
      result.sort((a, b) => {
        const aFeatured =
          a.featured || a.bestSeller || a.badge ? 1 : 0;

        const bFeatured =
          b.featured || b.bestSeller || b.badge ? 1 : 0;

        return bFeatured - aFeatured;
      });
    }

    return result;
  }, [selectedCategory, search, sortBy]);

  /* =========================================================
     WISHLIST
  ========================================================= */

  const toggleWishlist = (productId) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      }

      return [...prev, productId];
    });
  };

  /* =========================================================
     ADD TO CART
  ========================================================= */

  const addToCart = (product) => {
    setCartCount((prev) => prev + 1);

    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("dpack-cart-add", {
          detail: product,
        })
      );
    }
  };

  /* =========================================================
     PRICE FORMAT
  ========================================================= */

  const formatPrice = (price) => {
    if (price === undefined || price === null) return "";

    return Number(price).toLocaleString("en-IN");
  };

  /* =========================================================
     STAR RATING
  ========================================================= */

  const RatingStars = ({ rating }) => {
    const roundedRating = Math.round(Number(rating || 0));

    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={13}
            className={
              star <= roundedRating
                ? "fill-[#F5A623] text-[#F5A623]"
                : "text-gray-300"
            }
          />
        ))}
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-[#F7F8FA] text-[#081A33]">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden bg-[#081A33]">
        <div className="absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full bg-[#F5A623]/10 blur-3xl" />

        <div className="absolute -bottom-40 -left-32 h-[400px] w-[400px] rounded-full bg-white/5 blur-3xl" />

        <div className="relative mx-auto max-w-[1400px] px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
          <div className="max-w-3xl">

            <div className="mb-5 inline-flex items-center gap-2 border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white">
              <PackageCheck size={15} className="text-[#F5A623]" />
              Premium Packaging Solutions
            </div>

            <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              All Products
              <span className="block text-[#F5A623]">
                Built to Protect.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-white/70 sm:text-lg">
              Explore our complete range of protective packaging solutions
              designed to keep products safe, secure, and damage-free during
              storage and transportation.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          SEARCH + SORT
      ===================================================== */}

      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-4 px-5 py-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">

          {/* Search */}
          <div className="relative w-full lg:max-w-xl">
            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products, category or SKU..."
              className="h-12 w-full border border-gray-200 bg-[#F7F8FA] pl-12 pr-12 text-sm text-[#081A33] outline-none transition focus:border-[#F5A623]"
            />

            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-[#081A33]"
              >
                <X size={17} />
              </button>
            )}
          </div>

          {/* Sort */}
          <div className="flex w-full items-center gap-3 sm:w-auto">
            <span className="hidden text-sm text-gray-500 sm:block">
              Sort By
            </span>

            <div className="relative w-full sm:w-[210px]">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-12 w-full appearance-none border border-gray-200 bg-[#F7F8FA] px-4 pr-10 text-sm font-medium text-[#081A33] outline-none focus:border-[#F5A623]"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="name">Name: A to Z</option>
              </select>

              <ChevronDown
                size={17}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          MOBILE CATEGORY BAR
      ===================================================== */}

      <div className="border-b border-gray-200 bg-white lg:hidden">
        <div className="flex gap-2 overflow-x-auto px-5 py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

          <button
            onClick={() => setSelectedCategory("All Products")}
            className={`shrink-0 border px-4 py-2 text-xs font-semibold transition ${
              selectedCategory === "All Products"
                ? "border-[#081A33] bg-[#081A33] text-white"
                : "border-gray-200 bg-white text-gray-600"
            }`}
          >
            All Products
          </button>

          {normalizedCategories.map((category) => {
            const categoryName = category.name;

            if (categoryName === "All Products") return null;

            return (
              <button
                key={category.key}
                onClick={() => setSelectedCategory(categoryName)}
                className={`shrink-0 border px-4 py-2 text-xs font-semibold transition ${
                  selectedCategory === categoryName
                    ? "border-[#081A33] bg-[#081A33] text-white"
                    : "border-gray-200 bg-white text-gray-600"
                }`}
              >
                {categoryName}
              </button>
            );
          })}
        </div>
      </div>

      {/* =====================================================
          MAIN PRODUCTS AREA
      ===================================================== */}

      <section className="mx-auto max-w-[1400px] px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[250px_1fr]">

          {/* =================================================
              DESKTOP SIDEBAR
          ================================================= */}

          <aside className="hidden lg:block">
            <div className="sticky top-6 border border-gray-200 bg-white">

              <div className="border-b border-gray-200 px-5 py-5">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal size={18} />
                  <h2 className="text-base font-bold">
                    Categories
                  </h2>
                </div>
              </div>

              <div className="p-3">

                {/* All Products */}
                <button
                  onClick={() =>
                    setSelectedCategory("All Products")
                  }
                  className={`flex w-full items-center justify-between px-4 py-3 text-left text-sm transition ${
                    selectedCategory === "All Products"
                      ? "bg-[#081A33] font-semibold text-white"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <span>All Products</span>

                  <span
                    className={
                      selectedCategory === "All Products"
                        ? "text-white/70"
                        : "text-gray-400"
                    }
                  >
                    {products.length}
                  </span>
                </button>

                {/* Categories */}
                {normalizedCategories.map((category) => {
                  const categoryName = category.name;

                  if (categoryName === "All Products") {
                    return null;
                  }

                  return (
                    <button
                      key={category.key}
                      onClick={() =>
                        setSelectedCategory(categoryName)
                      }
                      className={`flex w-full items-center justify-between px-4 py-3 text-left text-sm transition ${
                        selectedCategory === categoryName
                          ? "bg-[#081A33] font-semibold text-white"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <span>{categoryName}</span>

                      <span
                        className={
                          selectedCategory === categoryName
                            ? "text-white/70"
                            : "text-gray-400"
                        }
                      >
                        {getCategoryCount(categoryName)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* =================================================
              PRODUCT CONTENT
          ================================================= */}

          <div>

            {/* Result Header */}
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <p className="text-sm text-gray-500">
                  Showing{" "}
                  <span className="font-semibold text-[#081A33]">
                    {filteredProducts.length}
                  </span>{" "}
                  products
                </p>

                {selectedCategory !== "All Products" && (
                  <p className="mt-1 text-xs text-gray-400">
                    Category:{" "}
                    <span className="font-medium text-[#081A33]">
                      {selectedCategory}
                    </span>
                  </p>
                )}
              </div>

              <button
                onClick={() => setMobileFilter(true)}
                className="flex items-center justify-center gap-2 border border-gray-200 bg-white px-4 py-3 text-sm font-semibold lg:hidden"
              >
                <SlidersHorizontal size={17} />
                Filter
              </button>
            </div>

            {/* =================================================
                PRODUCTS GRID
            ================================================= */}

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">

                {filteredProducts.map((product) => {
                  const productId =
                    product.id || product.slug || product.sku;

                  const isWishlisted =
                    wishlist.includes(productId);

                  return (
                    <article
                      key={productId}
                      className="group flex h-full flex-col border border-gray-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-xl"
                    >

                      {/* Product Image */}
                      <div className="relative aspect-square overflow-hidden bg-[#F5F6F8]">

                        {/* Badge */}
                        {product.badge && (
                          <div className="absolute left-4 top-4 z-10 bg-[#F5A623] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#081A33]">
                            {product.badge}
                          </div>
                        )}

                        {/* Wishlist */}
                        <button
                          onClick={() =>
                            toggleWishlist(productId)
                          }
                          aria-label="Add to wishlist"
                          className={`absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center border transition ${
                            isWishlisted
                              ? "border-[#081A33] bg-[#081A33] text-white"
                              : "border-gray-200 bg-white text-gray-500 hover:border-[#081A33] hover:text-[#081A33]"
                          }`}
                        >
                          <Heart
                            size={17}
                            className={
                              isWishlisted
                                ? "fill-white"
                                : ""
                            }
                          />
                        </button>

                        {/* Image */}
                        <Link
                          href={`/products/${product.slug}`}
                          className="flex h-full w-full items-center justify-center p-6"
                        >
                          <Image
                            src={product.image}
                            alt={product.name}
                            width={600}
                            height={600}
                            className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                          />
                        </Link>
                      </div>

                      {/* Product Info */}
                      <div className="flex flex-1 flex-col p-5">

                        {/* Category */}
                        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.15em] text-[#F5A623]">
                          {product.category}
                        </p>

                        {/* Name */}
                        <Link
                          href={`/products/${product.slug}`}
                          className="line-clamp-2 text-base font-bold leading-6 text-[#081A33] transition hover:text-[#F5A623]"
                        >
                          {product.name}
                        </Link>

                        {/* Rating */}
                        <div className="mt-3 flex items-center gap-2">
                          <RatingStars
                            rating={product.rating}
                          />

                          <span className="text-xs text-gray-400">
                            {product.rating || "0"} (
                            {product.reviews || 0})
                          </span>
                        </div>

                        {/* Price */}
                        <div className="mt-4 flex items-center gap-2">
                          <span className="text-xl font-bold text-[#081A33]">
                            ₹{formatPrice(product.price)}
                          </span>

                          {product.oldPrice && (
                            <span className="text-sm text-gray-400 line-through">
                              ₹{formatPrice(product.oldPrice)}
                            </span>
                          )}
                        </div>

                        {/* SKU */}
                        {product.sku && (
                          <p className="mt-2 text-xs text-gray-400">
                            SKU: {product.sku}
                          </p>
                        )}

                        {/* Buttons */}
                        <div className="mt-auto flex gap-2 pt-5">

                          <Link
                            href={`/products/${product.slug}`}
                            className="flex h-11 flex-1 items-center justify-center border border-[#081A33] text-xs font-bold uppercase tracking-wide text-[#081A33] transition hover:bg-[#081A33] hover:text-white"
                          >
                            View Details
                          </Link>

                          <button
                            onClick={() => addToCart(product)}
                            className="flex h-11 w-11 shrink-0 items-center justify-center bg-[#F5A623] text-[#081A33] transition hover:bg-[#081A623]"
                            aria-label="Add to cart"
                          >
                            <ShoppingCart size={18} />
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              /* =================================================
                 EMPTY STATE
              ================================================= */

              <div className="border border-gray-200 bg-white px-6 py-20 text-center">

                <div className="mx-auto flex h-16 w-16 items-center justify-center bg-[#F7F8FA] text-gray-400">
                  <Search size={26} />
                </div>

                <h3 className="mt-5 text-xl font-bold text-[#081A33]">
                  No Products Found
                </h3>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                  We couldn't find any products matching your
                  current search or category selection.
                </p>

                <button
                  onClick={() => {
                    setSearch("");
                    setSelectedCategory("All Products");
                  }}
                  className="mt-6 bg-[#081A33] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#F5A623] hover:text-[#081A33]"
                >
                  View All Products
                </button>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* =====================================================
          FEATURES STRIP
      ===================================================== */}

      <section className="border-y border-gray-200 bg-white">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 sm:grid-cols-3">

          <div className="flex items-center gap-4 border-b border-gray-200 px-6 py-7 sm:border-b-0 sm:border-r">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-[#F5A623]/10 text-[#F5A623]">
              <Truck size={23} />
            </div>

            <div>
              <h3 className="text-sm font-bold text-[#081A33]">
                Fast Delivery
              </h3>

              <p className="mt-1 text-xs text-gray-500">
                Quick dispatch & reliable shipping
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 border-b border-gray-200 px-6 py-7 sm:border-b-0 sm:border-r">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-[#F5A623]/10 text-[#F5A623]">
              <ShieldCheck size={23} />
            </div>

            <div>
              <h3 className="text-sm font-bold text-[#081A33]">
                Quality Assured
              </h3>

              <p className="mt-1 text-xs text-gray-500">
                Reliable packaging solutions
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 px-6 py-7">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-[#F5A623]/10 text-[#F5A623]">
              <PackageCheck size={23} />
            </div>

            <div>
              <h3 className="text-sm font-bold text-[#081A33]">
                Secure Packaging
              </h3>

              <p className="mt-1 text-xs text-gray-500">
                Protection you can depend on
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="bg-[#081A33]">
        <div className="mx-auto max-w-[1400px] px-5 py-14 sm:px-8 lg:px-10 lg:py-16">

          <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">

            <div className="max-w-2xl">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#F5A623]">
                Need Bulk Packaging?
              </p>

              <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl">
                Looking for Packaging Solutions
                <span className="text-[#F5A623]">
                  {" "}for Your Business?
                </span>
              </h2>

              <p className="mt-4 text-sm leading-7 text-white/65 sm:text-base">
                Talk to our team for bulk requirements, customized
                packaging solutions, and business enquiries.
              </p>
            </div>

            <Link
              href="/contact"
              className="inline-flex w-fit items-center gap-3 bg-[#F5A623] px-7 py-4 text-sm font-bold text-[#081A33] transition hover:bg-white"
            >
              Get In Touch
              <ArrowRight size={18} />
            </Link>

          </div>
        </div>
      </section>

      {/* =====================================================
          MOBILE FILTER DRAWER
      ===================================================== */}

      {mobileFilter && (
        <div className="fixed inset-0 z-[100] lg:hidden">

          {/* Overlay */}
          <button
            onClick={() => setMobileFilter(false)}
            className="absolute inset-0 bg-black/50"
            aria-label="Close filter"
          />

          {/* Drawer */}
          <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto bg-white">

            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-5">
              <div className="flex items-center gap-2">
                <SlidersHorizontal size={18} />

                <h2 className="font-bold">
                  Categories
                </h2>
              </div>

              <button
                onClick={() => setMobileFilter(false)}
                className="flex h-9 w-9 items-center justify-center border border-gray-200"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-4">

              {/* All Products */}
              <button
                onClick={() => {
                  setSelectedCategory("All Products");
                  setMobileFilter(false);
                }}
                className={`mb-2 flex w-full items-center justify-between px-4 py-4 text-left text-sm ${
                  selectedCategory === "All Products"
                    ? "bg-[#081A33] font-semibold text-white"
                    : "bg-gray-50 text-gray-600"
                }`}
              >
                <span>All Products</span>

                <span>
                  {products.length}
                </span>
              </button>

              {/* Categories */}
              {normalizedCategories.map((category) => {
                const categoryName = category.name;

                if (categoryName === "All Products") {
                  return null;
                }

                return (
                  <button
                    key={category.key}
                    onClick={() => {
                      setSelectedCategory(categoryName);
                      setMobileFilter(false);
                    }}
                    className={`mb-2 flex w-full items-center justify-between px-4 py-4 text-left text-sm ${
                      selectedCategory === categoryName
                        ? "bg-[#081A33] font-semibold text-white"
                        : "bg-gray-50 text-gray-600"
                    }`}
                  >
                    <span>{categoryName}</span>

                    <span>
                      {getCategoryCount(categoryName)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          FLOATING CART
      ===================================================== */}

      {cartCount > 0 && (
        <Link
          href="/cart"
          className="fixed bottom-5 right-5 z-50 flex h-14 items-center gap-3 bg-[#F5A623] px-5 text-[#081A33] shadow-xl transition hover:bg-white"
        >
          <div className="relative">
            <ShoppingCart size={20} />

            <span className="absolute -right-3 -top-3 flex h-5 min-w-5 items-center justify-center bg-[#081A33] px-1 text-[10px] font-bold text-white">
              {cartCount}
            </span>
          </div>

          <span className="text-sm font-bold">
            Cart
          </span>
        </Link>
      )}

    </main>
  );
}