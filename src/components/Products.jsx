"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  Heart,
  ArrowUpRight,
  ArrowRight,
  Star,
} from "lucide-react";
import { getHomeProducts } from "@/lib/homeProducts";

/* =========================================================
   PRODUCT IMAGE FALLBACK
========================================================= */

const FALLBACK_IMAGE = "/placeholder-product.webp";

/* =========================================================
   NORMALIZE ADMIN PRODUCT DATA
========================================================= */

function normalizeProduct(product, index) {
  const price =
    product?.price ??
    product?.salePrice ??
    product?.sellingPrice ??
    "";

  const oldPrice =
    product?.oldPrice ??
    product?.comparePrice ??
    product?.mrp ??
    "";

  let discount = product?.discount ?? "";

  if (!discount && price && oldPrice) {
    const current = Number(
      String(price).replace(/[^\d.]/g, "")
    );

    const old = Number(
      String(oldPrice).replace(/[^\d.]/g, "")
    );

    if (old > current && current > 0) {
      discount = `${Math.round(
        ((old - current) / old) * 100
      )}% OFF`;
    }
  }

  const image =
    product?.image ||
    product?.images?.[0] ||
    product?.thumbnail ||
    FALLBACK_IMAGE;

  return {
    id: product?._id || product?.id || index,
    brand: product?.brand || "D PACK",
    name:
      product?.name ||
      product?.title ||
      "Product",
    image,
    rating: product?.rating || "4.8",
    reviews:
      product?.reviews ||
      product?.reviewCount ||
      "0",
    price:
      typeof price === "number"
        ? `₹${price.toLocaleString("en-IN")}`
        : price,
    oldPrice:
      typeof oldPrice === "number"
        ? `₹${oldPrice.toLocaleString(
            "en-IN"
          )}`
        : oldPrice,
    discount,
    link:
      product?.link ||
      product?.url ||
      (product?.slug
        ? `/products/${product.slug}`
        : "/products"),
  };
}

/* =========================================================
   PRODUCT CARD
========================================================= */

function ProductCard({ product, index }) {
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
        amount: 0.2,
      }}
      transition={{
        duration: 0.6,
        delay: Math.min(
          index * 0.08,
          0.24
        ),
        ease: [
          0.16,
          1,
          0.3,
          1,
        ],
      }}
      className="
        group
        relative
        overflow-hidden
        rounded-[8px]
        border
        border-[#E3E7E9]
        bg-white
        transition-all
        duration-500
        hover:-translate-y-1
        hover:shadow-[0_18px_45px_rgba(18,59,93,0.10)]
      "
    >
      {/* IMAGE */}

      <Link
        href={product.link}
        target={
          product.link?.startsWith("http")
            ? "_blank"
            : undefined
        }
        rel={
          product.link?.startsWith("http")
            ? "noopener noreferrer"
            : undefined
        }
        className="
          relative
          block
          h-[125px]
          overflow-hidden
          bg-white
          sm:h-[180px]
          lg:h-[255px]
        "
      >
        {/* Discount */}

        {product.discount && (
          <span
            className="
              absolute
              left-1.5
              top-1.5
              z-20
              bg-[#F5A623]
              px-1.5
              py-0.5
              text-[12px]
              font-black
              uppercase
              tracking-[0.02em]
              text-[#123B5D]
              sm:left-3
              sm:top-3
              sm:px-2.5
              sm:py-1
              sm:text-[12px]
            "
          >
            {product.discount}
          </span>
        )}

        {/* Wishlist */}

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();

            console.log(
              "Wishlist:",
              product
            );
          }}
          aria-label={`Add ${product.name} to wishlist`}
          className="
            absolute
            right-1.5
            top-1.5
            z-30
            flex
            h-6
            w-6
            items-center
            justify-center
            rounded-full
            bg-white
            text-[#6D777E]
            shadow-sm
            transition-all
            duration-300
            hover:bg-[#123B5D]
            hover:text-white
            sm:right-3
            sm:top-3
            sm:h-8
            sm:w-8
          "
        >
          <Heart
            size={11}
            className="sm:h-[15px] sm:w-[15px]"
          />
        </button>

        {/* Product image */}

        <div className="absolute inset-2 sm:inset-4 lg:inset-5">
          <Image
            src={product.image}
            alt={product.name}
            fill
            unoptimized
            sizes="
              (max-width: 640px) 25vw,
              (max-width: 1024px) 45vw,
              22vw
            "
            className="
              object-contain
              transition-all
              duration-700
              ease-out
              group-hover:scale-[1.08]
            "
          />
        </div>

        {/* Bottom line */}

        <span
          className="
            absolute
            bottom-0
            left-0
            h-[2px]
            w-0
            bg-[#F5A623]
            transition-all
            duration-500
            group-hover:w-full
            sm:h-[3px]
          "
        />

        {/* Arrow */}

        <span
          className="
            absolute
            bottom-2
            right-2
            flex
            h-6
            w-6
            translate-y-3
            items-center
            justify-center
            bg-[#123B5D]
            text-white
            opacity-0
            transition-all
            duration-300
            group-hover:translate-y-0
            group-hover:opacity-100
            sm:bottom-3
            sm:right-3
            sm:h-8
            sm:w-8
          "
        >
          <ArrowUpRight
            size={11}
            className="
              transition-transform
              duration-300
              group-hover:rotate-45
              sm:h-[14px]
              sm:w-[14px]
            "
          />
        </span>
      </Link>

      {/* CONTENT */}

      <div
        className="
          px-1.5
          pb-2
          pt-2
          sm:px-4
          sm:pb-4
          sm:pt-3.5
        "
      >
        {/* Brand */}

        <p
          className="
            truncate
            text-[12px]
            font-black
            uppercase
            tracking-[0.08em]
            text-[#2F7180]
            sm:text-[12px]
            sm:tracking-[0.14em]
          "
        >
          {product.brand}
        </p>

        {/* Name */}

        <Link
          href={product.link}
          target={
            product.link?.startsWith("http")
              ? "_blank"
              : undefined
          }
          rel={
            product.link?.startsWith("http")
              ? "noopener noreferrer"
              : undefined
          }
        >
          <h3
            className="
              mt-0.5
              min-h-[30px]
              line-clamp-2
              text-[16px]
              font-bold
              leading-[1.2]
              tracking-[-0.02em]
              text-[#202830]
              transition-colors
              duration-300
              hover:text-[#123B5D]
              sm:mt-1
              sm:min-h-[40px]
              sm:text-[17px]
              sm:leading-[1.25]
            "
          >
            {product.name}
          </h3>
        </Link>

        {/* Rating */}

        <div className="mt-1 flex min-w-0 items-center gap-1 sm:mt-2 sm:gap-2">
          <span
            className="
              flex
              shrink-0
              items-center
              gap-0.5
              rounded-sm
              bg-[#EEF4F7]
              px-1
              py-0.5
              sm:gap-1
              sm:px-1.5
              sm:py-1
            "
          >
            <span className="text-[12px] font-bold text-[#123B5D] sm:text-[12px] text-center">
              {product.rating}
            </span>

            <Star
              size={6}
              fill="currentColor"
              strokeWidth={0}
              className="
                text-[#F5A623]
                sm:h-[12px]
                sm:w-[12px]
              "
            />
          </span>

          <span className="truncate text-[12px] text-[#929BA2] sm:text-[13px]">
            {product.reviews} reviews
          </span>
        </div>

        {/* Price */}

        <div className="mt-1 flex flex-wrap items-center gap-1 sm:mt-2 sm:gap-2">
          {product.price && (
            <span className="text-[13px] font-black text-[#123B5D] sm:text-[13px]">
              {product.price}
            </span>
          )}

          {product.oldPrice && (
            <span className="text-[12px] text-[#929BA2] line-through sm:text-[13px]">
              {product.oldPrice}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

/* =========================================================
   LOADING CARD
========================================================= */

function ProductSkeleton() {
  return (
    <div
      className="
        overflow-hidden
        rounded-[8px]
        border
        border-[#E3E7E9]
        bg-white
      "
    >
      <div
        className="
          h-[125px]
          animate-pulse
          bg-[#EEF1F2]
          sm:h-[180px]
          lg:h-[255px]
        "
      />

      <div className="space-y-2 p-2 sm:p-4">
        <div className="h-2 w-10 animate-pulse rounded bg-[#EEF1F2] sm:h-2.5 sm:w-16" />

        <div className="h-3 w-full animate-pulse rounded bg-[#EEF1F2] sm:h-4" />

        <div className="h-3 w-3/4 animate-pulse rounded bg-[#EEF1F2] sm:h-4" />

        <div className="h-2.5 w-14 animate-pulse rounded bg-[#EEF1F2] sm:h-3 sm:w-20" />
      </div>
    </div>
  );
}

/* =========================================================
   MAIN SECTION
========================================================= */

export default function TrendingProducts() {
  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadProducts() {
      try {
        setLoading(true);

        const adminProducts =
          await getHomeProducts();

        if (!cancelled) {
          setProducts(
            adminProducts
              .filter(Boolean)
              .map(normalizeProduct)
          );
        }
      } catch (error) {
        console.error(
          "Trending products error:",
          error
        );

        if (!cancelled) {
          setProducts([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      cancelled = true;
    };
  }, []);

  /* =========================================================
     PRODUCT SORTING

     Dunnage → Other Products → Corrugated
  ========================================================= */
const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  const checkMobile = () => {
    setIsMobile(window.innerWidth < 768);
  };

  checkMobile();

  window.addEventListener("resize", checkMobile);

  return () => {
    window.removeEventListener("resize", checkMobile);
  };
}, []);

  const visibleProducts = [
    ...products,
  ]
  
    .sort((a, b) => {
      const aName =
        a.name?.toLowerCase() || "";

      const bName =
        b.name?.toLowerCase() || "";

      const getPriority = (name) => {
        // Dunnage first
        if (
          name.includes("dunnage") ||
          name.includes("dunnage bag")
        ) {
          return 1;
        }

        // Corrugated last
        if (
          name.includes("corrugated") ||
          name.includes(
            "corrugated box"
          )
        ) {
          return 3;
        }

        // Other products
        return 2;
      };

      return (
        getPriority(aName) -
        getPriority(bName)
      );
    })
    .slice(0, 4);

  return (
    <section
      className="
        relative
        w-full
        overflow-hidden
        bg-[#F5F4EF]
        py-8
        sm:py-10
        lg:py-12
      "
    >
      {/* =====================================================
          BACKGROUND DOTS
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.35]
        "
        style={{
          backgroundImage:
            "radial-gradient(#123B5D 0.7px, transparent 0.7px)",
          backgroundSize: "12px 12px",
        }}
      />

      {/* =====================================================
          MAIN
      ===================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-[1400px]
          px-4
          sm:px-7
          lg:px-8
        "
      >
        <div
          className="
            grid
            grid-cols-1
            gap-5
            lg:grid-cols-[minmax(0,2fr)_minmax(330px,1fr)]
          "
        >
          {/* =================================================
              LEFT SIDE
          ================================================= */}

          <div className="min-w-0">
            {/* Heading */}

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.6,
              }}
              className="
                mb-5
                text-center
                sm:mb-6
              "
            >
              <h2
                className="
                  text-[24px]
                  font-black
                  leading-[1.08]
                  tracking-[-0.04em]
                  text-[#202830]
                  sm:text-[34px]
                  lg:text-[38px]
                "
              >
                Protective packaging
                <span className="text-[#123B5D]">
                  {" "}
                  collection of the week
                </span>
              </h2>

              <p
                className="
                  mx-auto
                  mt-3
                  max-w-2xl
                  text-[16px]
                  leading-6
                  text-[#66737D]
                  sm:text-[16px]
                "
              >
                The most popular products from
                our protective packaging
                collection.
              </p>
            </motion.div>

            {/* =================================================
                PRODUCT GRID

                Mobile  = 4
                Desktop = 3
            ================================================= */}

 <div
  className="
    grid
    grid-cols-2
    gap-2
    sm:grid-cols-2
    sm:gap-4
    lg:grid-cols-3
  "
>
              {loading ? (
                <>
                  <ProductSkeleton />
                  <ProductSkeleton />
                  <ProductSkeleton />
                  <ProductSkeleton />
                </>
             ) : visibleProducts.length > 0 ? (
  visibleProducts
    .slice(0, isMobile ? 4 : 3)
    .map((product, index) => (
      <ProductCard
        key={product.id}
        product={product}
        index={index}
      />
    ))
) : (
                <div
                  className="
                    col-span-full
                    rounded-[8px]
                    border
                    border-[#E3E7E9]
                    bg-white
                    p-6
                    text-center
                    text-sm
                    text-[#66737D]
                  "
                >
                  No products available.
                </div>
              )}
            </div>

            {/* =================================================
                BOTTOM BUTTON
            ================================================= */}

            <motion.div
              initial={{
                opacity: 0,
                y: 15,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.5,
                delay: 0.2,
              }}
              className="mt-5 text-center"
            >
              <Link
                href="/products"
                className="
                  group
                  inline-flex
                  items-center
                  gap-3
                  rounded-full
                  bg-[#123B5D]
                  px-5
                  py-3
                  text-[12px]
                  font-black
                  uppercase
                  tracking-[0.05em]
                  text-white
                  transition-all
                  duration-300
                  hover:bg-[#F5A623]
                  hover:text-[#123B5D]
                  sm:text-[11px]
                "
              >
                View All Products

                <span
                  className="
                    flex
                    h-6
                    w-6
                    items-center
                    justify-center
                    rounded-full
                    bg-white/10
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                >
                  <ArrowRight
                    size={13}
                  />
                </span>
              </Link>
            </motion.div>
          </div>

          {/* =================================================
              RIGHT FEATURE IMAGE
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              x: 40,
              scale: 0.97,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
              scale: 1,
            }}
            viewport={{
              once: true,
              amount: 0.15,
            }}
            transition={{
              duration: 0.8,
              ease: [
                0.16,
                1,
                0.3,
                1,
              ],
            }}
            className="
              group
              relative
              min-h-[360px]
              overflow-hidden
              rounded-[8px]
              bg-[#123B5D]
              sm:min-h-[430px]
            "
          >
            {/* Image */}

            <Image
              src="https://packingairbag.com/cat/1.webp"
              alt="Dpack protective packaging solutions"
              fill
              unoptimized
              sizes="
                (max-width: 1024px) 100vw,
                35vw
              "
              className="
                object-contain
                p-8
                transition-transform
                duration-1000
                group-hover:scale-105
                sm:p-12
              "
            />

            {/* Gradient */}

            <div
              className="
                absolute
                inset-0
                bg-gradient-to-t
                from-[#071C2D]/90
                via-[#123B5D]/20
                to-transparent
              "
            />

            {/* Decorative circle */}

            <div
              className="
                pointer-events-none
                absolute
                -right-20
                -top-20
                h-64
                w-64
                rounded-full
                border
                border-white/10
              "
            />

            <div
              className="
                pointer-events-none
                absolute
                -right-10
                -top-10
                h-44
                w-44
                rounded-full
                border
                border-white/10
              "
            />

            {/* Content */}

            <div
              className="
                absolute
                bottom-0
                left-0
                right-0
                z-10
                p-5
                sm:p-7
              "
            >
              <div className="mb-3 flex items-center gap-2">
                <span className="h-[2px] w-8 bg-[#F5A623]" />
              </div>

              <h3
                className="
                  max-w-[330px]
                  text-[21px]
                  font-black
                  leading-[1]
                  tracking-[-0.04em]
                  text-white
                  sm:text-[32px]
                "
              >
                Smarter protection
                <br />
                for every shipment.
              </h3>

              <Link
                href="/products"
                className="
                  mt-5
                  inline-flex
                  items-center
                  gap-2
                  text-[12px]
                  font-black
                  uppercase
                  tracking-[0.07em]
                  text-white
                  sm:text-[11px]
                "
              >
                Explore Collection

                <ArrowUpRight
                  size={15}
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                    group-hover:-translate-y-1
                  "
                />
              </Link>
            </div>

            {/* Corner number */}

            <div
              className="
                absolute
                right-4
                top-4
                z-20
                rounded-sm
                bg-white
                px-3
                py-2
              "
            >
              <span
                className="
                  block
                  text-[20px]
                  font-black
                  leading-none
                  text-[#123B5D]
                "
              >
                01
              </span>

              <span
                className="
                  mt-1
                  block
                  text-[8px]
                  font-bold
                  uppercase
                  tracking-[0.08em]
                  text-[#8A959D]
                "
              >
                Featured
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}