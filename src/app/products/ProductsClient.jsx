"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  ChevronRight,
  Filter,
  Heart,
  Search,
  ShoppingCart,
  SlidersHorizontal,
  Star,
  Truck,
  X,
  ShieldCheck,
  Package,
} from "lucide-react";

import { addToCart as addProductToCart } from "@/lib/cartBus";

/* =========================================================
   HELPERS
========================================================= */

const ease = [0.16, 1, 0.3, 1];

function formatPrice(value) {
  const number = Number(value || 0);

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(number);
}

function getProductPrice(product) {
  return Number(
    product?.price ??
      product?.salePrice ??
      product?.regularPrice ??
      0
  );
}

function getProductOldPrice(product) {
  return Number(
    product?.oldPrice ??
      product?.comparePrice ??
      product?.mrp ??
      product?.regularPrice ??
      0
  );
}

function getProductImage(product) {
  let image =
    product?.image ||
    product?.images?.[0] ||
    product?.thumbnail ||
    "/placeholder-product.webp";

  if (typeof image === "object") {
    return (
      image?.url ||
      image?.src ||
      "/placeholder-product.webp"
    );
  }

  if (typeof image === "string") {
    try {
      const imageUrl = new URL(image);
      if (
        (imageUrl.hostname === "localhost" ||
          imageUrl.hostname === "127.0.0.1") &&
        imageUrl.pathname.startsWith("/products/")
      ) {
        image = `${imageUrl.pathname}${imageUrl.search}${imageUrl.hash}`;
      }
    } catch {
      // Keep relative and non-URL image paths unchanged.
    }
  }

  return image;
}

function getProductSlug(product) {
  return (
    product?.slug ||
    product?.handle ||
    product?._id ||
    product?.id ||
    ""
  );
}

function getProductCategory(product) {
  return (
    product?.category?.name ||
    product?.category ||
    product?.categoryName ||
    "Uncategorized"
  );
}

function getStockValue(product) {
  if (
    product?.stock !== undefined &&
    product?.stock !== null
  ) {
    return Number(product.stock);
  }

  if (
    product?.inventory !== undefined &&
    product?.inventory !== null
  ) {
    return Number(product.inventory);
  }

  return null;
}

function isProductInStock(product) {
  const tracking =
    product?.trackInventory ??
    product?.inventoryTracking ??
    false;

  if (!tracking) {
    return true;
  }

  const stock = getStockValue(product);

  if (stock === null) {
    return true;
  }

  return stock > 0;
}

/* =========================================================
   RATING
========================================================= */

function RatingStars({ rating = 0 }) {
  const value = Number(rating || 0);

  return (
    <div className="flex items-center gap-[2px]">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={12}
          strokeWidth={1.8}
          fill={
            star <= Math.round(value)
              ? "currentColor"
              : "none"
          }
          className={
            star <= Math.round(value)
              ? "text-[#F5A623]"
              : "text-[#C9D0D5]"
          }
        />
      ))}
    </div>
  );
}

/* =========================================================
   PRODUCT CARD
========================================================= */

function ProductCard({
  product,
  index,
  wishlist,
  toggleWishlist,
  addToCart,
}) {
  const slug = getProductSlug(product);

  const price = getProductPrice(product);
  const oldPrice = getProductOldPrice(product);

  const image = getProductImage(product);

  const rating = Number(
    product?.rating ??
      product?.averageRating ??
      0
  );

  const reviews = Number(
    product?.reviews ??
      product?.reviewCount ??
      0
  );

  const inStock = isProductInStock(product);

  const productId =
    product?.id ||
    product?._id ||
    slug;

  const isWishlisted =
    wishlist.includes(productId);

  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 25,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.08,
      }}
      transition={{
        duration: 0.5,
        delay: Math.min(index * 0.04, 0.25),
        ease,
      }}
      whileHover={{
        y: -5,
      }}
      className="
        group
        relative
        flex
        h-full
        flex-col
        overflow-hidden
        border
        border-[#DDE3E7]
        bg-white
        transition-all
        duration-300
        hover:border-[#B9C6CE]
        hover:shadow-[0_20px_50px_rgba(8,26,51,0.11)]
      "
    >
      {/* =====================================================
          IMAGE
      ===================================================== */}

      <div
        className="
          relative
          aspect-square
          overflow-hidden
          bg-[radial-gradient(circle_at_center,#FFFFFF_0%,#F7F8F8_55%,#EDF1F3_100%)]
        "
      >
        <Link
          href={`/products/${slug}`}
          className="block h-full w-full"
        >
          <motion.div
            whileHover={{
              scale: 1.06,
            }}
            transition={{
              duration: 0.55,
              ease,
            }}
            className="relative h-full w-full"
          >
            <Image
              src={image}
              alt={
                product?.name ||
                "DPACK Product"
              }
              fill
              sizes="
                (max-width: 640px) 50vw,
                (max-width: 1024px) 33vw,
                25vw
              "
              className="object-contain p-4 sm:p-5"
            />
          </motion.div>
        </Link>

        {/* IMAGE SHINE */}

        <div
          className="
            pointer-events-none
            absolute
            inset-x-0
            bottom-0
            h-20
            bg-gradient-to-t
            from-[#081A33]/[0.035]
            to-transparent
          "
        />

        {/* BADGE */}

        {(product?.badge ||
          product?.isFeatured ||
          product?.isNew ||
          product?.isBestSeller) && (
          <div className="absolute left-3 top-3 z-10">
            <span
              className="
                inline-flex
                bg-[#081A33]
                px-2.5
                py-1.5
                text-[9px]
                font-black
                uppercase
                tracking-[0.12em]
                text-white
                shadow-sm
              "
            >
              {product?.badge ||
                (product?.isBestSeller
                  ? "Best Seller"
                  : product?.isNew
                    ? "New"
                    : "Featured")}
            </span>
          </div>
        )}

        {/* DISCOUNT */}

        {oldPrice > price && price > 0 && (
          <div className="absolute bottom-3 left-3 z-10">
            <span
              className="
                bg-[#F5A623]
                px-2.5
                py-1
                text-[9px]
                font-black
                uppercase
                tracking-[0.08em]
                text-[#081A33]
                shadow-sm
              "
            >
              {Math.round(
                ((oldPrice - price) /
                  oldPrice) *
                  100
              )}
              % OFF
            </span>
          </div>
        )}

        {/* WISHLIST */}

        <button
          type="button"
          onClick={() =>
            toggleWishlist(productId)
          }
          aria-label="Add to wishlist"
          className={`
            absolute
            right-3
            top-3
            z-20
            flex
            h-10
            w-10
            items-center
            justify-center
            border
            shadow-sm
            transition-all
            duration-300
            ${
              isWishlisted
                ? "border-[#F5A623] bg-[#F5A623] text-[#081A33]"
                : "border-[#DDE3E7] bg-white/95 text-[#081A33] hover:border-[#081A33] hover:bg-[#081A33] hover:text-white"
            }
          `}
        >
          <Heart
            size={17}
            fill={
              isWishlisted
                ? "currentColor"
                : "none"
            }
          />
        </button>

        {/* OUT OF STOCK */}

        {!inStock && (
          <div
            className="
              absolute
              inset-0
              z-10
              flex
              items-center
              justify-center
              bg-white/60
              backdrop-blur-[2px]
            "
          >
            <span
              className="
                border
                border-[#081A33]
                bg-white
                px-4
                py-2
                text-[10px]
                font-black
                uppercase
                tracking-[0.12em]
                text-[#081A33]
                shadow-lg
              "
            >
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        {/* CATEGORY */}

        <p
          className="
            mb-2
            text-[9px]
            font-bold
            uppercase
            tracking-[0.14em]
            text-[#89949C]
          "
        >
          {getProductCategory(product)}
        </p>

        {/* NAME */}

        <Link href={`/products/${slug}`}>
          <h3
            className="
              min-h-[42px]
              text-[15px]
              font-extrabold
              leading-[1.3]
              tracking-[-0.02em]
              text-[#081A33]
              transition-colors
              duration-300
              hover:text-[#2F7180]
              sm:text-[16px]
            "
          >
            {product?.name ||
              "DPACK Packaging Product"}
          </h3>
        </Link>

        {/* RATING */}

        <div className="mt-2 flex items-center gap-2">
          {rating > 0 ? (
            <>
              <div
                className="
                  flex
                  items-center
                  gap-1
                  bg-[#E6F1F6]
                  px-2
                  py-1
                "
              >
                <span className="text-[10px] font-bold text-[#123B5D]">
                  {rating.toFixed(1)}
                </span>

                <RatingStars
                  rating={rating}
                />
              </div>

              {reviews > 0 && (
                <span className="text-[10px] text-[#89949C]">
                  {reviews} reviews
                </span>
              )}
            </>
          ) : (
            <span
              className="
                text-[10px]
                uppercase
                tracking-wide
                text-[#89949C]
              "
            >
              DPACK Quality
            </span>
          )}
        </div>

       {/* =====================================================
    PRICE + ADD TO CART
===================================================== */}

<div
  className="
    mt-auto
    flex
    items-end
    justify-between
    gap-2
    pt-4
  "
>
  {/* PRICE */}

  <div className="min-w-0">
    <div className="flex flex-wrap items-center gap-1.5">
      <span
        className="
          text-[17px]
          font-black
          tracking-[-0.03em]
          text-[#081A33]
          sm:text-[18px]
        "
      >
        {formatPrice(price)}
      </span>

      {oldPrice > price && (
        <span
          className="
            text-[11px]
            text-[#929BA2]
            line-through
            sm:text-[12px]
          "
        >
          {formatPrice(oldPrice)}
        </span>
      )}
    </div>
  </div>

  {/* HIGHLIGHTED ADD TO CART */}

  <button
    type="button"
    onClick={() => addToCart(product)}
    disabled={!inStock}
    className="
      group/cart
      flex
      h-10
      shrink-0
      items-center
      gap-1.5
      bg-[#F5A623]
      px-3
      text-[#081A33]

      shadow-[0_6px_18px_rgba(245,166,35,0.22)]

      transition-all
      duration-300

      hover:bg-[#081A33]
      hover:text-white
      hover:shadow-[0_8px_22px_rgba(8,26,51,0.18)]

      disabled:cursor-not-allowed
      disabled:bg-[#E6E8EA]
      disabled:text-[#89949C]
      disabled:shadow-none

      sm:h-10
      sm:px-3.5
    "
  >
    <ShoppingCart
      size={14}
      strokeWidth={2.3}
    />

    <span
      className="
        text-[9px]
        font-black
        uppercase
        tracking-[0.04em]
        sm:text-[10px]
      "
    >
      {inStock ? "Add to Cart" : "Unavailable"}
    </span>

    <ArrowRight
      size={13}
      className="
        transition-transform
        duration-300
        group-hover/cart:translate-x-1
      "
    />
  </button>
</div>
      </div>
    </motion.article>
  );
}

/* =========================================================
   FILTER SECTION
========================================================= */

function FilterSection({
  title,
  children,
  border = true,
}) {
  return (
    <div
      className={`
        px-5
        py-6
        ${
          border
            ? "border-b border-[#E3E7EA]"
            : ""
        }
      `}
    >
      <h3
        className="
          mb-4
          text-[15px]
          font-black
          uppercase
          tracking-[0.14em]
          text-[#081A33]
        "
      >
        {title}
      </h3>

      {children}
    </div>
  );
}

/* =========================================================
   CATEGORY LIST
========================================================= */

function CategoryList({
  categories,
  selectedCategory,
  setSelectedCategory,
  products,
}) {
  const getCount = (category) => {
    if (category === "All Products") {
      return products.length;
    }

    return products.filter(
      (product) =>
        getProductCategory(product) ===
        category
    ).length;
  };

  return (
    <div className="space-y-1">
      {/* ALL */}

      <button
        type="button"
        onClick={() =>
          setSelectedCategory(
            "All Products"
          )
        }
        className={`
          group
          flex
          w-full
          items-center
          justify-between
          py-2
          text-left
          transition-colors
          duration-200
          ${
            selectedCategory ===
            "All Products"
              ? "text-[#081A33]"
              : "text-[#65727B] hover:text-[#081A33]"
          }
        `}
      >
        <span className="flex items-center gap-3">
          <span
            className={`
              h-[6px]
              w-[6px]
              rounded-full
              transition-all
              ${
                selectedCategory ===
                "All Products"
                  ? "bg-[#F5A623]"
                  : "bg-[#C9D1D6] group-hover:bg-[#081A33]"
              }
            `}
          />

          <span className="text-[14px] font-semibold">
            All Products
          </span>
        </span>

        <span className="text-[10px] text-[#929BA2]">
          {getCount("All Products")}
        </span>
      </button>

      {/* CATEGORIES */}

      {categories.map((category) => {
        const active =
          selectedCategory ===
          category;

        return (
          <button
            key={category}
            type="button"
            onClick={() =>
              setSelectedCategory(
                category
              )
            }
            className={`
              group
              flex
              w-full
              items-center
              justify-between
              py-2
              text-left
              transition-colors
              duration-200
              ${
                active
                  ? "text-[#081A33]"
                  : "text-[#65727B] hover:text-[#081A33]"
              }
            `}
          >
            <span className="flex min-w-0 items-center gap-3">
              <span
                className={`
                  h-[6px]
                  w-[6px]
                  shrink-0
                  rounded-full
                  transition-all
                  ${
                    active
                      ? "bg-[#F5A623]"
                      : "bg-[#C9D1D6] group-hover:bg-[#081A33]"
                  }
                `}
              />

              <span className="truncate text-[14px] font-semibold">
                {category}
              </span>
            </span>

            <span className="ml-3 text-[10px] text-[#929BA2]">
              {getCount(category)}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* =========================================================
   PRICE FILTER
========================================================= */

function PriceFilter({
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
}) {
  return (
    <div>
      <div className="grid grid-cols-2 gap-2">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] text-[#8C979E]">
            ₹
          </span>

          <input
            type="number"
            min="0"
            value={minPrice}
            onChange={(event) =>
              setMinPrice(
                event.target.value
              )
            }
            placeholder="Min price"
            className="
              h-10
              w-full
              border
              border-[#DDE3E7]
              bg-white
              pl-7
              pr-2
              text-[15px]
              text-[#081A33]
              outline-none
              transition
              focus:border-[#081A33]
              focus:ring-1
              focus:ring-[#F5A623]/30
            "
          />
        </div>

        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] text-[#8C979E]">
            ₹
          </span>

          <input
            type="number"
            min="0"
            value={maxPrice}
            onChange={(event) =>
              setMaxPrice(
                event.target.value
              )
            }
            placeholder="Max price"
            className="
              h-10
              w-full
              border
              border-[#DDE3E7]
              bg-white
              pl-7
              pr-2
              text-[15px]
              text-[#081A33]
              outline-none
              transition
              focus:border-[#081A33]
              focus:ring-1
              focus:ring-[#F5A623]/30
            "
          />
        </div>
      </div>

      {(minPrice || maxPrice) && (
        <button
          type="button"
          onClick={() => {
            setMinPrice("");
            setMaxPrice("");
          }}
          className="
            mt-3
            text-[9px]
            font-black
            uppercase
            tracking-[0.1em]
            text-[#7B878F]
            transition
            hover:text-[#F5A623]
          "
        >
          Clear Price
        </button>
      )}
    </div>
  );
}

/* =========================================================
   STATUS FILTER
========================================================= */

function StatusFilter({
  stockFilter,
  setStockFilter,
}) {
  const options = [
    {
      value: "all",
      label: "All Products",
    },
    {
      value: "in-stock",
      label: "In Stock",
    },
    {
      value: "out-of-stock",
      label: "Out of Stock",
    },
  ];

  return (
    <div className="space-y-3">
      {options.map((option) => {
        const active =
          stockFilter ===
          option.value;

        return (
          <button
            key={option.value}
            type="button"
            onClick={() =>
              setStockFilter(
                option.value
              )
            }
            className="flex w-full items-center gap-3 text-left"
          >
            <span
              className={`
                flex
                h-[15px]
                w-[15px]
                items-center
                justify-center
                rounded-full
                border
                transition-all
                ${
                  active
                    ? "border-[#081A33] bg-[#081A33]"
                    : "border-[#C9D1D6] bg-white"
                }
              `}
            >
              {active && (
                <span className="h-[5px] w-[5px] rounded-full bg-white" />
              )}
            </span>

            <span
              className={`
                text-[14px]
                font-medium
                ${
                  active
                    ? "text-[#081A33]"
                    : "text-[#68757D]"
                }
              `}
            >
              {option.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* =========================================================
   DESKTOP SIDEBAR
========================================================= */

function DesktopSidebar({
  products,
  categories,
  selectedCategory,
  setSelectedCategory,
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
  stockFilter,
  setStockFilter,
  clearAllFilters,
}) {
  const hasFilters =
    minPrice ||
    maxPrice ||
    selectedCategory !==
      "All Products" ||
    stockFilter !== "all";

  return (
    <aside className="sticky top-24 hidden h-fit self-start lg:block">
      <div
        className="
          overflow-hidden
          border
          border-[#DDE3E7]
          bg-white
          shadow-[0_8px_30px_rgba(8,26,51,0.05)]
        "
      >
        {/* HEADER */}

        <div className="border-b border-[#E3E7EA] px-5 py-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="mb-1 text-[8px] font-black uppercase tracking-[0.16em] text-[#F5A623]">
                DPACK
              </p>

              <h2 className="text-[13px] font-black uppercase tracking-[0.12em] text-[#081A33]">
                Shop By
              </h2>
            </div>

            {hasFilters && (
              <span className="flex h-5 min-w-5 items-center justify-center bg-[#F5A623] px-1.5 text-[9px] font-black text-[#081A33]">
                !
              </span>
            )}
          </div>
        </div>

        {/* PRICE */}

        <FilterSection title="Price">
          <PriceFilter
            minPrice={minPrice}
            maxPrice={maxPrice}
            setMinPrice={setMinPrice}
            setMaxPrice={setMaxPrice}
          />
        </FilterSection>

        {/* CATEGORY */}

        <FilterSection title="Categories">
          <CategoryList
            categories={categories}
            selectedCategory={
              selectedCategory
            }
            setSelectedCategory={
              setSelectedCategory
            }
            products={products}
          />
        </FilterSection>

        {/* STATUS */}

        <FilterSection
          title="Product Status"
          border={false}
        >
          <StatusFilter
            stockFilter={stockFilter}
            setStockFilter={setStockFilter}
          />
        </FilterSection>

        {/* CLEAR */}

        {hasFilters && (
          <div className="border-t border-[#E3E7EA] px-5 py-5">
            <button
              type="button"
              onClick={clearAllFilters}
              className="
                flex
                h-10
                w-full
                items-center
                justify-center
                gap-2
                border
                border-[#081A33]
                bg-[#081A33]
                text-[10px]
                font-black
                uppercase
                tracking-[0.1em]
                text-white
                transition-all
                hover:border-[#F5A623]
                hover:bg-[#F5A623]
                hover:text-[#081A33]
              "
            >
              <X size={13} />
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}

/* =========================================================
   MOBILE FILTER DRAWER
========================================================= */

function MobileFilterDrawer({
  open,
  setOpen,
  products,
  categories,
  selectedCategory,
  setSelectedCategory,
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
  stockFilter,
  setStockFilter,
  clearAllFilters,
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* OVERLAY */}

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={() => setOpen(false)}
            className="
              fixed
              inset-0
              z-[80]
              bg-[#081A33]/50
              backdrop-blur-[2px]
            "
          />

          {/* DRAWER */}

          <motion.aside
            initial={{
              x: "100%",
            }}
            animate={{
              x: 0,
            }}
            exit={{
              x: "100%",
            }}
            transition={{
              duration: 0.35,
              ease,
            }}
            className="
              fixed
              right-0
              top-0
              z-[90]
              h-full
              w-[88%]
              max-w-[390px]
              overflow-y-auto
              bg-white
              shadow-2xl
            "
          >
            {/* HEADER */}

            <div
              className="
                sticky
                top-0
                z-10
                flex
                items-center
                justify-between
                border-b
                border-[#E3E7EA]
                bg-white
                px-5
                py-5
              "
            >
              <div className="flex items-center gap-3">
                <SlidersHorizontal
                  size={17}
                  className="text-[#081A33]"
                />

                <h2 className="text-[13px] font-black uppercase tracking-[0.12em] text-[#081A33]">
                  Filters
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  border
                  border-[#DDE3E7]
                  text-[#081A33]
                "
              >
                <X size={17} />
              </button>
            </div>

            {/* PRICE */}

            <FilterSection title="Price">
              <PriceFilter
                minPrice={minPrice}
                maxPrice={maxPrice}
                setMinPrice={setMinPrice}
                setMaxPrice={setMaxPrice}
              />
            </FilterSection>

            {/* CATEGORIES */}

            <FilterSection title="Categories">
              <CategoryList
                categories={categories}
                selectedCategory={
                  selectedCategory
                }
                setSelectedCategory={
                  setSelectedCategory
                }
                products={products}
              />
            </FilterSection>

            {/* STATUS */}

            <FilterSection
              title="Product Status"
              border={false}
            >
              <StatusFilter
                stockFilter={stockFilter}
                setStockFilter={setStockFilter}
              />
            </FilterSection>

            {/* BUTTONS */}

            <div className="sticky bottom-0 border-t border-[#E3E7EA] bg-white p-4">
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="
                    h-11
                    border
                    border-[#081A33]
                    text-[10px]
                    font-black
                    uppercase
                    tracking-[0.08em]
                    text-[#081A33]
                  "
                >
                  Clear
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setOpen(false)
                  }
                  className="
                    h-11
                    bg-[#081A33]
                    text-[10px]
                    font-black
                    uppercase
                    tracking-[0.08em]
                    text-white
                  "
                >
                  Show Products
                </button>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

/* =========================================================
   MAIN PRODUCT PAGE
========================================================= */

export default function ProductsPage({
  initialCategory = "All Products",
}) {
  /* =======================================================
     STATE
  ======================================================= */

  const [products, setProducts] =
    useState([]);

  const [categories, setCategories] =
    useState([]);

  const [selectedCategory, setSelectedCategory] =
    useState(
      initialCategory ||
        "All Products"
    );
  const [search, setSearch] =
    useState("");

  const [sortBy, setSortBy] =
    useState("featured");

  const [minPrice, setMinPrice] =
    useState("");

  const [maxPrice, setMaxPrice] =
    useState("");

  const [stockFilter, setStockFilter] =
    useState("all");

  const [mobileFilter, setMobileFilter] =
    useState(false);

  const [wishlist, setWishlist] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  /* =======================================================
     FETCH PRODUCTS
  ======================================================= */

  useEffect(() => {
    let mounted = true;

    async function loadProducts() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "/api/products?page=1&limit=100",
          {
            cache: "no-store",
          }
        );

        const data =
          await response.json();

        if (
          !response.ok ||
          data?.success === false
        ) {
          throw new Error(
            data?.error ||
              "Unable to load products."
          );
        }

        const fetchedProducts =
          Array.isArray(data)
            ? data
            : Array.isArray(
                  data?.products
                )
              ? data.products
              : Array.isArray(
                    data?.data
                  )
                ? data.data
                : [];

        if (!mounted) return;

        setProducts(
          fetchedProducts
        );

        const categorySet =
          new Set();

        fetchedProducts.forEach(
          (product) => {
            const category =
              getProductCategory(
                product
              );

            if (
              category &&
              category !==
                "Uncategorized"
            ) {
              categorySet.add(
                category
              );
            }
          }
        );

        setCategories(
          Array.from(
            categorySet
          ).sort((a, b) =>
            a.localeCompare(b)
          )
        );
      } catch (err) {
        console.error(err);

        if (mounted) {
          setError(
            err.message ||
              "Products could not be loaded. Please try again."
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      mounted = false;
    };
  }, []);

  /* =======================================================
     WISHLIST LOAD
  ======================================================= */

  useEffect(() => {
    try {
      const saved =
        localStorage.getItem(
          "dpack-wishlist"
        );

      if (saved) {
        const parsed =
          JSON.parse(saved);

        if (
          Array.isArray(parsed)
        ) {
          setWishlist(parsed);
        }
      }
    } catch (error) {
      console.error(
        "Wishlist load error:",
        error
      );
    }
  }, []);

  /* =======================================================
     WISHLIST SAVE
  ======================================================= */

  useEffect(() => {
    try {
      localStorage.setItem(
        "dpack-wishlist",
        JSON.stringify(wishlist)
      );
    } catch (error) {
      console.error(
        "Wishlist save error:",
        error
      );
    }
  }, [wishlist]);

  /* =======================================================
     WISHLIST TOGGLE
  ======================================================= */

  const toggleWishlist = (
    productId
  ) => {
    setWishlist((current) => {
      if (
        current.includes(productId)
      ) {
        return current.filter(
          (id) =>
            id !== productId
        );
      }

      return [
        ...current,
        productId,
      ];
    });
  };

  /* =======================================================
     ADD TO CART
  ======================================================= */
const addToCart = (product) => {
  if (!product) return;

  addProductToCart(product, 1);
};

  /* =======================================================
     FILTERED PRODUCTS
  ======================================================= */

  const filteredProducts =
    useMemo(() => {
      let result = [
        ...products,
      ];

      /* CATEGORY */

      if (
        selectedCategory &&
        selectedCategory !==
          "All Products"
      ) {
        result =
          result.filter(
            (product) =>
              getProductCategory(
                product
              ) ===
              selectedCategory
          );
      }

      /* SEARCH */

      const searchTerm =
        search
          .trim()
          .toLowerCase();

      if (searchTerm) {
        result =
          result.filter(
            (product) => {
              const name =
                String(
                  product?.name ||
                    ""
                ).toLowerCase();

              const category =
                String(
                  getProductCategory(
                    product
                  )
                ).toLowerCase();

              const description =
                String(
                  product?.description ||
                    ""
                ).toLowerCase();

              const sku =
                String(
                  product?.sku ||
                    ""
                ).toLowerCase();

              return (
                name.includes(
                  searchTerm
                ) ||
                category.includes(
                  searchTerm
                ) ||
                description.includes(
                  searchTerm
                ) ||
                sku.includes(
                  searchTerm
                )
              );
            }
          );
      }

      /* MIN PRICE */

      if (minPrice !== "") {
        result =
          result.filter(
            (product) =>
              getProductPrice(
                product
              ) >=
              Number(minPrice)
          );
      }

      /* MAX PRICE */

      if (maxPrice !== "") {
        result =
          result.filter(
            (product) =>
              getProductPrice(
                product
              ) <=
              Number(maxPrice)
          );
      }

      /* STOCK */

      if (
        stockFilter ===
        "in-stock"
      ) {
        result =
          result.filter(
            (product) =>
              isProductInStock(
                product
              )
          );
      }

      if (
        stockFilter ===
        "out-of-stock"
      ) {
        result =
          result.filter(
            (product) =>
              !isProductInStock(
                product
              )
          );
      }

      /* SORT */

      switch (sortBy) {
        case "price-low":
          result.sort(
            (a, b) =>
              getProductPrice(a) -
              getProductPrice(b)
          );
          break;

        case "price-high":
          result.sort(
            (a, b) =>
              getProductPrice(b) -
              getProductPrice(a)
          );
          break;

        case "rating":
          result.sort(
            (a, b) =>
              Number(
                b?.rating ||
                  b?.averageRating ||
                  0
              ) -
              Number(
                a?.rating ||
                  a?.averageRating ||
                  0
              )
          );
          break;

        case "name":
          result.sort(
            (a, b) =>
              String(
                a?.name || ""
              ).localeCompare(
                String(
                  b?.name || ""
                )
              )
          );
          break;

        case "featured":
        default:
          result.sort(
            (a, b) => {
              const aFeatured =
                a?.isFeatured ||
                a?.isBestSeller
                  ? 1
                  : 0;

              const bFeatured =
                b?.isFeatured ||
                b?.isBestSeller
                  ? 1
                  : 0;

              return (
                bFeatured -
                aFeatured
              );
            }
          );
          break;
      }

      return result;
    }, [
      products,
      selectedCategory,
      search,
      minPrice,
      maxPrice,
      stockFilter,
      sortBy,
    ]);

  /* =======================================================
     CLEAR FILTERS
  ======================================================= */

  const clearAllFilters =
    () => {
      setSelectedCategory(
        "All Products"
      );

      setMinPrice("");
      setMaxPrice("");

      setStockFilter("all");

      setSearch("");

      setSortBy("featured");
    };

  /* =======================================================
     ACTIVE FILTER COUNT
  ======================================================= */

  const activeFilterCount = [
    minPrice || maxPrice
      ? 1
      : 0,
    selectedCategory !==
    "All Products"
      ? 1
      : 0,
    stockFilter !== "all"
      ? 1
      : 0,
  ].reduce(
    (total, value) =>
      total + value,
    0
  );

  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <main
        className="
          min-h-screen
          bg-[#F5F4EF]
          [background-image:radial-gradient(rgba(8,26,51,0.12)_0.8px,transparent_0.8px)]
          [background-size:12px_12px]
        "
      >
        <div className="flex min-h-[70vh] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-5 h-10 w-10 animate-spin border-2 border-[#DDE3E7] border-t-[#081A33]" />

            <p className="text-[15px] font-black uppercase tracking-[0.15em] text-[#081A33]">
              Loading Products
            </p>

            <p className="mt-2 text-xs text-[#7D8991]">
              Preparing DPACK packaging
              solutions...
            </p>
          </div>
        </div>
      </main>
    );
  }

  /* =======================================================
     ERROR
  ======================================================= */

  if (error) {
    return (
      <main
        className="
          min-h-screen
          bg-[#F5F4EF]
          [background-image:radial-gradient(rgba(8,26,51,0.12)_0.8px,transparent_0.8px)]
          [background-size:12px_12px]
        "
      >
        <div className="mx-auto flex min-h-[70vh] max-w-[600px] items-center justify-center px-5">
          <div className="w-full border border-[#DDE3E7] bg-white p-8 text-center shadow-[0_15px_45px_rgba(8,26,51,0.06)]">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center bg-[#E6F1F6] text-[#081A33]">
              <Package size={21} />
            </div>

            <h1 className="text-2xl font-black text-[#081A33]">
              Products unavailable
            </h1>

            <p className="mt-3 text-sm leading-6 text-[#68757D]">
              {error}
            </p>

            <button
              type="button"
              onClick={() =>
                window.location.reload()
              }
              className="
                mt-6
                bg-[#081A33]
                px-7
                py-3
                text-[10px]
                font-black
                uppercase
                tracking-[0.1em]
                text-white
                transition
                hover:bg-[#F5A623]
                hover:text-[#081A33]
              "
            >
              Try Again
            </button>
          </div>
        </div>
      </main>
    );
  }

  /* =======================================================
     PAGE
  ======================================================= */

  return (
    <main
      className="
        min-h-screen
        overflow-hidden
        bg-[#F5F4EF]
        [background-image:radial-gradient(rgba(8,26,51,0.115)_0.75px,transparent_0.75px)]
        [background-size:11px_11px]
      "
    >
      {/* ===================================================
          PAGE HEADER
      =================================================== */}

      <section className="relative border-b border-[#DDE3E7] bg-[#F5F4EF]/95">
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            opacity-[0.3]
            [background-image:radial-gradient(rgba(18,59,93,0.13)_0.7px,transparent_0.7px)]
            [background-size:9px_9px]
          "
        />

        <div className="relative w-full px-5 py-10 sm:px-8 lg:px-10 xl:px-14 lg:py-14">
          {/* BREADCRUMB */}

          <motion.div
            initial={{
              opacity: 0,
              y: 12,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
              ease,
            }}
            className="
              mb-5
              flex
              items-center
              gap-2
              text-[10px]
              font-bold
              uppercase
              tracking-[0.12em]
              text-[#89949C]
            "
          >
            <Link
              href="/"
              className="transition hover:text-[#081A33]"
            >
              Home
            </Link>

            <ChevronRight size={12} />

            <span className="text-[#081A33]">
              Products
            </span>
          </motion.div>

          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <motion.div
              initial={{
                opacity: 0,
                x: -25,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.65,
                ease,
              }}
            >
              <div className="mb-3 flex items-center gap-3">
                <span className="h-[2px] w-9 bg-[#F5A623]" />

                <span className="text-[10px] font-black uppercase tracking-[0.17em] text-[#2F7180]">
                  DPACK Packaging
                  Solutions
                </span>
              </div>

              <h1 className="text-[42px] font-black leading-[0.95] tracking-[-0.05em] text-[#081A33] sm:text-[54px] lg:text-[64px]">
                Products
              </h1>

              <p className="mt-4 max-w-[570px] text-[14px] leading-6 text-[#69767E]">
                Explore our complete
                range of protective
                packaging solutions
                designed for safer
                storage, secure
                transportation and
                reliable product
                protection.
              </p>
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                x: 25,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.65,
                delay: 0.1,
                ease,
              }}
              className="flex shrink-0 items-center gap-3"
            >
              <div className="border border-[#DDE3E7] bg-white px-4 py-3 shadow-sm">
                <span className="block text-[9px] font-black uppercase tracking-[0.12em] text-[#89949C]">
                  Products
                </span>

                <span className="mt-1 block text-lg font-black text-[#081A33]">
                  {filteredProducts.length}
                </span>
              </div>

              <div className="hidden border border-[#DDE3E7] bg-white px-4 py-3 shadow-sm sm:block">
                <span className="block text-[9px] font-black uppercase tracking-[0.12em] text-[#89949C]">
                  Categories
                </span>

                <span className="mt-1 block text-lg font-black text-[#081A33]">
                  {categories.length}
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===================================================
          SEARCH / TOOLBAR
      =================================================== */}

      <section className="border-b border-[#DDE3E7] bg-white/95 backdrop-blur-sm">
        <div className="w-full px-5 py-4 sm:px-8 lg:px-10 xl:px-14">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            {/* SEARCH */}

            <div className="relative w-full lg:max-w-[390px]">
              <Search
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#89949C]"
              />

              <input
                type="search"
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value
                  )
                }
                placeholder="Search products..."
                className="
                  h-11
                  w-full
                  border
                  border-[#DDE3E7]
                  bg-[#F9FAFA]
                  pl-11
                  pr-4
                  text-[14px]
                  text-[#081A33]
                  outline-none
                  transition
                  focus:border-[#081A33]
                  focus:ring-1
                  focus:ring-[#F5A623]/30
                "
              />

              {search && (
                <button
                  type="button"
                  onClick={() =>
                    setSearch("")
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#89949C] hover:text-[#081A33]"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* RIGHT TOOLBAR */}

            <div className="flex flex-wrap items-center gap-2">
              {/* MOBILE FILTER */}

              <button
                type="button"
                onClick={() =>
                  setMobileFilter(true)
                }
                className="
                  flex
                  h-11
                  items-center
                  gap-2
                  border
                  border-[#DDE3E7]
                  bg-white
                  px-4
                  text-[10px]
                  font-black
                  uppercase
                  tracking-[0.08em]
                  text-[#081A33]
                  transition
                  hover:border-[#081A33]
                  lg:hidden
                "
              >
                <Filter size={14} />

                Filters

                {activeFilterCount >
                  0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center bg-[#F5A623] px-1 text-[9px]">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              {/* SORT */}

              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(event) =>
                    setSortBy(
                      event.target.value
                    )
                  }
                  className="
                    h-11
                    appearance-none
                    border
                    border-[#DDE3E7]
                    bg-white
                    px-4
                    pr-10
                    text-[10px]
                    font-black
                    uppercase
                    tracking-[0.08em]
                    text-[#081A33]
                    outline-none
                    transition
                    focus:border-[#081A33]
                  "
                >
                  <option value="featured">
                    Sort: Featured
                  </option>

                  <option value="price-low">
                    Price: Low to High
                  </option>

                  <option value="price-high">
                    Price: High to Low
                  </option>

                  <option value="rating">
                    Rating
                  </option>

                  <option value="name">
                    Name
                  </option>
                </select>

                <ChevronDown
                  size={13}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#68757D]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          PRODUCTS AREA
      =================================================== */}

      <section className="w-full px-4 py-8 sm:px-6 lg:px-8 xl:px-10 lg:py-12">
        <div className="grid w-full items-start gap-7 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-8 xl:grid-cols-[270px_minmax(0,1fr)] xl:gap-10">
          {/* =================================================
              SIDEBAR
          ================================================= */}

          <div className="relative hidden lg:block">
            <DesktopSidebar
              products={products}
              categories={categories}
              selectedCategory={
                selectedCategory
              }
              setSelectedCategory={
                setSelectedCategory
              }
              minPrice={minPrice}
              maxPrice={maxPrice}
              setMinPrice={setMinPrice}
              setMaxPrice={setMaxPrice}
              stockFilter={
                stockFilter
              }
              setStockFilter={
                setStockFilter
              }
              clearAllFilters={
                clearAllFilters
              }
            />
          </div>

          {/* =================================================
              PRODUCTS
          ================================================= */}

          <div className="min-w-0">
            {/* TOP RESULT BAR */}

            <div className="mb-5 flex flex-col gap-3 border-b border-[#DDE3E7] pb-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[15px] font-semibold text-[#69767E]">
                Showing{" "}
                <span className="font-black text-[#081A33]">
                  {
                    filteredProducts.length
                  }
                </span>{" "}
                {filteredProducts.length ===
                1
                  ? "product"
                  : "products"}
              </p>

              <div className="flex flex-wrap items-center gap-2">
                {selectedCategory !==
                  "All Products" && (
                  <span className="inline-flex items-center gap-1.5 border border-[#DDE3E7] bg-white px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-wide text-[#081A33]">
                    {selectedCategory}

                    <button
                      type="button"
                      onClick={() =>
                        setSelectedCategory(
                          "All Products"
                        )
                      }
                    >
                      <X size={11} />
                    </button>
                  </span>
                )}

                {(minPrice ||
                  maxPrice) && (
                  <span className="inline-flex items-center gap-1.5 border border-[#DDE3E7] bg-white px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-wide text-[#081A33]">
                    Price

                    <button
                      type="button"
                      onClick={() => {
                        setMinPrice("");
                        setMaxPrice("");
                      }}
                    >
                      <X size={11} />
                    </button>
                  </span>
                )}

                {stockFilter !==
                  "all" && (
                  <span className="inline-flex items-center gap-1.5 border border-[#DDE3E7] bg-white px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-wide text-[#081A33]">
                    {stockFilter ===
                    "in-stock"
                      ? "In Stock"
                      : "Out of Stock"}

                    <button
                      type="button"
                      onClick={() =>
                        setStockFilter(
                          "all"
                        )
                      }
                    >
                      <X size={11} />
                    </button>
                  </span>
                )}
              </div>
            </div>

            {/* NO RESULTS */}

            {filteredProducts.length ===
            0 ? (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="
                  border
                  border-[#DDE3E7]
                  bg-white
                  px-6
                  py-20
                  text-center
                  shadow-[0_10px_35px_rgba(8,26,51,0.04)]
                "
              >
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center bg-[#E6F1F6] text-[#081A33]">
                  <Search size={21} />
                </div>

                <h2 className="text-2xl font-black tracking-[-0.03em] text-[#081A33]">
                  No products found
                </h2>

                <p className="mx-auto mt-3 max-w-[430px] text-sm leading-6 text-[#75818A]">
                  Try changing your
                  search or filter
                  options to find the
                  right DPACK
                  packaging solution.
                </p>

                <button
                  type="button"
                  onClick={
                    clearAllFilters
                  }
                  className="
                    mt-6
                    bg-[#081A33]
                    px-7
                    py-3
                    text-[10px]
                    font-black
                    uppercase
                    tracking-[0.1em]
                    text-white
                    transition
                    hover:bg-[#F5A623]
                    hover:text-[#081A33]
                  "
                >
                  Clear All Filters
                </button>
              </motion.div>
            ) : (
              /* PRODUCT GRID */

              <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 xl:gap-6">
                {filteredProducts.map(
                  (
                    product,
                    index
                  ) => (
                    <ProductCard
                      key={
                        product?.id ||
                        product?._id ||
                        product?.slug ||
                        index
                      }
                      product={
                        product
                      }
                      index={
                        index
                      }
                      wishlist={
                        wishlist
                      }
                      toggleWishlist={
                        toggleWishlist
                      }
                      addToCart={
                        addToCart
                      }
                    />
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ===================================================
          FEATURES STRIP
      =================================================== */}

      <section className="border-y border-[#DDE3E7] bg-white/95">
        <div className="grid w-full grid-cols-2 md:grid-cols-4">
          {/* ITEM */}

          <div className="flex items-center gap-3 border-b border-r border-[#DDE3E7] px-5 py-5 md:border-b-0">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#E6F1F6] text-[#081A33]">
              <ShieldCheck size={18} />
            </div>

            <div>
              <p className="text-[10px] font-black uppercase tracking-wide text-[#081A33]">
                Quality
              </p>

              <p className="mt-1 text-[10px] text-[#7C8890]">
                Reliable protection
              </p>
            </div>
          </div>

          {/* ITEM */}

          <div className="flex items-center gap-3 border-b border-[#DDE3E7] px-5 py-5 md:border-b-0 md:border-r">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#E6F1F6] text-[#081A33]">
              <Truck size={18} />
            </div>

            <div>
              <p className="text-[10px] font-black uppercase tracking-wide text-[#081A33]">
                Delivery
              </p>

              <p className="mt-1 text-[10px] text-[#7C8890]">
                Secure dispatch
              </p>
            </div>
          </div>

          {/* ITEM */}

          <div className="flex items-center gap-3 border-r border-[#DDE3E7] px-5 py-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#E6F1F6] text-[#081A33]">
              <Package size={18} />
            </div>

            <div>
              <p className="text-[10px] font-black uppercase tracking-wide text-[#081A33]">
                Packaging
              </p>

              <p className="mt-1 text-[10px] text-[#7C8890]">
                Practical solutions
              </p>
            </div>
          </div>

          {/* ITEM */}

          <div className="flex items-center gap-3 px-5 py-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#F5A623] text-[#081A33]">
              <Check size={18} />
            </div>

            <div>
              <p className="text-[10px] font-black uppercase tracking-wide text-[#081A33]">
                Support
              </p>

              <p className="mt-1 text-[10px] text-[#7C8890]">
                Product assistance
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          CTA
      =================================================== */}

      <section className="bg-[#081A33]">
        <div className="relative w-full overflow-hidden px-5 py-14 sm:px-8 lg:px-10 xl:px-14 lg:py-20">
          {/* DECORATIVE */}

          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 border border-white/[0.08]" />

          <div className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 border border-[#F5A623]/20" />

          <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:radial-gradient(#ffffff_0.7px,transparent_0.7px)] [background-size:10px_10px]" />

          <div className="relative z-10 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className="h-[2px] w-9 bg-[#F5A623]" />

                <span className="text-[10px] font-black uppercase tracking-[0.16em] text-[#F5A623]">
                  DPACK
                </span>
              </div>

              <h2 className="max-w-[700px] text-[32px] font-black leading-[1] tracking-[-0.04em] text-white sm:text-[42px]">
                Need the right
                packaging
                solution?
              </h2>

              <p className="mt-4 max-w-[600px] text-sm leading-6 text-white/55">
                Talk to our team for
                product selection,
                packaging
                requirements and
                customized
                protective
                packaging
                solutions.
              </p>
            </div>

            <Link
              href="/contact-us"
              className="
                group
                inline-flex
                shrink-0
                items-center
                gap-3
                bg-[#F5A623]
                px-7
                py-4
                text-[10px]
                font-black
                uppercase
                tracking-[0.1em]
                text-[#081A33]
                transition-all
                hover:bg-white
              "
            >
              Contact Us

              <span className="flex h-7 w-7 items-center justify-center bg-[#081A33] text-white transition-transform group-hover:translate-x-1">
                <ArrowUpRight size={14} />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ===================================================
          MOBILE DRAWER
      =================================================== */}

      <MobileFilterDrawer
        open={mobileFilter}
        setOpen={setMobileFilter}
        products={products}
        categories={categories}
        selectedCategory={
          selectedCategory
        }
        setSelectedCategory={
          setSelectedCategory
        }
        minPrice={minPrice}
        maxPrice={maxPrice}
        setMinPrice={setMinPrice}
        setMaxPrice={setMaxPrice}
        stockFilter={
          stockFilter
        }
        setStockFilter={
          setStockFilter
        }
        clearAllFilters={
          clearAllFilters
        }
      />


    </main>

    
  );
}