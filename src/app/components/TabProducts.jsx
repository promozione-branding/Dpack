"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Package,
  Sparkles,
} from "lucide-react";

/* =========================================================
   CATEGORY DESIGN DATA
========================================================= */

const categoryDesign = {
  dunnage: {
    number: "01",
    name: "Dunnage Bags",
    description:
      "Reliable cargo protection designed to prevent shifting and movement during transportation.",
    image: "/dunnage.webp",
  },

  "dunnage-bags": {
    number: "01",
    name: "Dunnage Bags",
    description:
      "Reliable cargo protection designed to prevent shifting and movement during transportation.",
    image: "/dunnage.webp",
  },

  "air-column-bags": {
    number: "02",
    name: "Air Column Bags",
    description:
      "Inflatable cushioning solutions for protecting fragile and high-value products.",
    image: "/Air column bag (2).webp",
  },

  "air-column-roll": {
    number: "03",
    name: "Air Column Rolls",
    description:
      "Flexible roll-format cushioning for efficient product protection and packing.",
    image: "/Air Column Roll (2).webp",
  },

  "air-column-rolls": {
    number: "03",
    name: "Air Column Rolls",
    description:
      "Flexible roll-format cushioning for efficient product protection and packing.",
    image: "/Air Column Roll (2).webp",
  },

  "packaging-air-bags": {
    number: "04",
    name: "Packaging Air Bags",
    description:
      "Lightweight air-filled packaging solutions for faster and cleaner product packing.",
    image: "/packing bag.webp",
  },

  "gap-fillers": {
    number: "05",
    name: "Gap Fillers",
    description:
      "Practical void-filling solutions that keep products stable throughout transportation.",
    image: "/Gap filler (3).webp",
  },

  "gap-filler": {
    number: "05",
    name: "Gap Fillers",
    description:
      "Practical void-filling solutions that keep products stable throughout transportation.",
    image: "/Gap filler (3).webp",
  },
};

/* =========================================================
   DEFAULT CATEGORY IMAGE
========================================================= */

const defaultCategoryImage = "/dunnage.webp";

/* =========================================================
   NORMALIZE CATEGORY
========================================================= */

function normalizeCategory(category) {
  if (!category) return "";

  if (typeof category === "object") {
    return (
      category.slug ||
      category.name ||
      category.title ||
      ""
    )
      .toString()
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-");
  }

  return category
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");
}

/* =========================================================
   CATEGORY DISPLAY NAME
========================================================= */

function getCategoryName(category) {
  const key = normalizeCategory(category);

  if (categoryDesign[key]?.name) {
    return categoryDesign[key].name;
  }

  if (!category) return "Products";

  if (typeof category === "object") {
    return category.name || category.title || "Products";
  }

  return category
    .toString()
    .replace(/-/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

/* =========================================================
   CATEGORY NUMBER
========================================================= */

function getCategoryNumber(category, index) {
  const key = normalizeCategory(category);

  if (categoryDesign[key]?.number) {
    return categoryDesign[key].number;
  }

  return String(index + 1).padStart(2, "0");
}

/* =========================================================
   CATEGORY DESCRIPTION
========================================================= */

function getCategoryDescription(category) {
  const key = normalizeCategory(category);

  return (
    categoryDesign[key]?.description ||
    "Explore reliable packaging solutions designed for safer transportation and efficient product protection."
  );
}

/* =========================================================
   CATEGORY IMAGE
========================================================= */

function getCategoryImage(category, products = []) {
  const key = normalizeCategory(category);

  if (categoryDesign[key]?.image) {
    return categoryDesign[key].image;
  }

  const firstProduct = products?.[0];

  if (firstProduct) {
    const image = getProductImage(firstProduct);

    if (image) {
      return image;
    }
  }

  return defaultCategoryImage;
}

/* =========================================================
   PRODUCT IMAGE
========================================================= */

function getProductImage(product) {
  if (!product) {
    return "/dunnage.webp";
  }

  /* Main image can be string */
  if (typeof product.image === "string") {
    return product.image;
  }

  /* Main image can be object */
  if (product.image?.url) {
    return product.image.url;
  }

  /* Extra images fallback */
  if (
    Array.isArray(product.extraImages) &&
    product.extraImages.length > 0
  ) {
    const firstImage = product.extraImages[0];

    if (typeof firstImage === "string") {
      return firstImage;
    }

    if (firstImage?.url) {
      return firstImage.url;
    }
  }

  return "/dunnage.webp";
}

/* =========================================================
   PRODUCT CARD
========================================================= */

function ProductCard({ product, index }) {
  const image = getProductImage(product);

  const tag =
    product.badge ||
    product.tag ||
    getCategoryName(product.category);

  const slug =
    product.slug ||
    product._id ||
    product.id;

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 25,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
        delay: index * 0.06,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="h-full min-w-0"
    >
      <Link
        href={`/products/${slug}`}
        className="
          group
          flex
          h-full
          flex-col
          overflow-hidden
          rounded-[18px]
          border
          border-[#DFE6EA]
          bg-white
          transition-all
          duration-500
          hover:-translate-y-2
          hover:border-[#2F7180]/30
          hover:shadow-[0_24px_55px_rgba(18,59,93,0.14)]
        "
      >
        {/* IMAGE */}

        <div
          className="
            relative
            aspect-square
            overflow-hidden
            bg-[#F4F7F9]
          "
        >
          {/* PRODUCT TAG */}

          <span
            className="
              absolute
              left-3
              top-3
              z-20
              rounded-[6px]
              bg-[#F5A623]
              px-3
              py-1.5
              text-[10px]
              font-black
              uppercase
              tracking-[0.05em]
              text-[#123B5D]
            "
          >
            {tag}
          </span>

          {/* WISHLIST */}

          <button
            type="button"
            aria-label="Add to wishlist"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="
              absolute
              right-3
              top-3
              z-20
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              bg-white
              text-[18px]
              text-[#123B5D]
              shadow-sm
              transition-all
              duration-300
              hover:bg-[#123B5D]
              hover:text-white
            "
          >
            ♡
          </button>

          {/* PRODUCT IMAGE */}

          <div className="absolute inset-5 sm:inset-6">
            <Image
              src={image}
              alt={product.name || "DPack Product"}
              fill
              unoptimized
              sizes="(max-width: 768px) 50vw, 260px"
              className="
                object-contain
                transition-all
                duration-700
                ease-out
                group-hover:scale-110
                group-hover:-rotate-2
              "
            />
          </div>

          {/* HOVER BUTTON */}

          <div
            className="
              absolute
              bottom-3
              left-3
              right-3
              z-20
              translate-y-4
              opacity-0
              transition-all
              duration-300
              group-hover:translate-y-0
              group-hover:opacity-100
            "
          >
            <div
              className="
                flex
                items-center
                justify-center
                gap-2
                rounded-full
                bg-[#123B5D]
                px-4
                py-3
                text-[11px]
                font-bold
                uppercase
                tracking-[0.08em]
                text-white
              "
            >
              View Product
              <ArrowUpRight size={14} />
            </div>
          </div>
        </div>

        {/* DETAILS */}

        <div
          className="
            flex
            flex-1
            flex-col
            p-4
            sm:p-5
          "
        >
          <p
            className="
              text-[10px]
              font-black
              uppercase
              tracking-[0.1em]
              text-[#2F7180]
            "
          >
            DPACK PACKAGING
          </p>

          <h3
            className="
              mt-2
              min-h-[42px]
              text-[15px]
              font-bold
              leading-5
              tracking-[-0.02em]
              text-[#172321]
            "
          >
            {product.name}
          </h3>

          {/* RATING */}

          <div
            className="
              mt-3
              flex
              flex-wrap
              items-center
              gap-1
            "
          >
            <span className="text-[12px] tracking-[1px] text-[#F5A623]">
              ★★★★★
            </span>

            {product.reviews ? (
              <span className="text-[10px] text-gray-400">
                ({product.reviews})
              </span>
            ) : null}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* =========================================================
   SKELETON
========================================================= */

function ProductSkeleton() {
  return (
    <div
      className="
        overflow-hidden
        rounded-[18px]
        border
        border-[#DFE6EA]
        bg-white
      "
    >
      <div className="aspect-square animate-pulse bg-[#E9EEF1]" />

      <div className="space-y-3 p-5">
        <div className="h-2.5 w-24 animate-pulse rounded bg-[#E9EEF1]" />
        <div className="h-4 w-4/5 animate-pulse rounded bg-[#E9EEF1]" />
        <div className="h-3 w-20 animate-pulse rounded bg-[#E9EEF1]" />
      </div>
    </div>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function CategoryProducts() {
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* =======================================================
     FETCH PRODUCTS FROM ADMIN DATABASE
  ======================================================= */

  useEffect(() => {
    let mounted = true;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "/api/products?limit=100",
          {
            method: "GET",
            cache: "no-store",
          }
        );

        const data = await response.json();

        if (!response.ok || !data?.success) {
          throw new Error(
            data?.error || "Unable to load products"
          );
        }

        if (mounted) {
          setProducts(
            Array.isArray(data.products)
              ? data.products
              : []
          );
        }
      } catch (err) {
        console.error("Products fetch error:", err);

        if (mounted) {
          setError("Unable to load products.");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      mounted = false;
    };
  }, []);

  /* =======================================================
     CREATE CATEGORIES FROM PRODUCTS
  ======================================================= */

  const categories = useMemo(() => {
    const categoryMap = new Map();

    products.forEach((product) => {
      const rawCategory = product.category;

      if (!rawCategory) return;

      const key = normalizeCategory(rawCategory);

      if (!key) return;

      if (!categoryMap.has(key)) {
        categoryMap.set(key, {
          id: key,
          number: getCategoryNumber(
            rawCategory,
            categoryMap.size
          ),
          name: getCategoryName(rawCategory),
          shortName: getCategoryName(rawCategory),
          description: getCategoryDescription(rawCategory),
        });
      }
    });

    return Array.from(categoryMap.values()).map(
      (category, index) => ({
        ...category,
        number:
          categoryDesign[category.id]?.number ||
          String(index + 1).padStart(2, "0"),
      })
    );
  }, [products]);

  /* =======================================================
     KEEP ACTIVE TAB VALID
  ======================================================= */

  useEffect(() => {
    if (
      categories.length > 0 &&
      activeCategory >= categories.length
    ) {
      setActiveCategory(0);
    }
  }, [categories, activeCategory]);

  /* =======================================================
     ACTIVE CATEGORY
  ======================================================= */

  const active = categories[activeCategory];

/* =======================================================
   FILTER ACTIVE PRODUCTS — MAXIMUM 4
======================================================= */

const activeProducts = useMemo(() => {
  if (!active) return [];

  return products
    .filter((product) => {
      return (
        normalizeCategory(product.category) === active.id
      );
    })
    .slice(0, 4);
}, [products, active]);



  /* =======================================================
     ACTIVE CATEGORY IMAGE
  ======================================================= */

  const activeCategoryImage = active
    ? getCategoryImage(
        active.id,
        activeProducts
      )
    : defaultCategoryImage;

  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <section className="bg-[#F4F7F9] py-12 sm:py-14 lg:py-16">
        <div
          className="
            mx-auto
            w-full
            max-w-[1500px]
            px-4
            sm:px-6
            lg:px-10
            xl:px-12
          "
        >
          <div className="mb-7">
            <div className="mb-3 h-3 w-28 animate-pulse rounded bg-[#DCE5EA]" />

            <div className="h-12 w-[60%] animate-pulse rounded bg-[#DCE5EA]" />
          </div>

          <div
            className="
              grid
              grid-cols-1
              gap-3
              sm:gap-4
              lg:grid-cols-4
            "
          >
            {Array.from({ length: 4 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  /* =======================================================
     ERROR
  ======================================================= */

  if (error) {
    return (
      <section className="bg-[#F4F7F9] py-16">
        <div className="mx-auto max-w-[700px] px-5 text-center">
          <div className="rounded-2xl border border-red-100 bg-white p-8">
            <p className="text-sm font-semibold text-red-600">
              {error}
            </p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="
                mt-5
                rounded-full
                bg-[#123B5D]
                px-5
                py-3
                text-xs
                font-bold
                text-white
              "
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  /* =======================================================
     EMPTY
  ======================================================= */

  if (!products.length) {
    return (
      <section className="bg-[#F4F7F9] py-16">
        <div className="mx-auto max-w-[700px] px-5 text-center">
          <div className="rounded-2xl border border-[#DFE6EA] bg-white p-10">
            <Package
              className="mx-auto text-[#123B5D]"
              size={35}
            />

            <h3 className="mt-4 text-xl font-bold text-[#172321]">
              No products available
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Products added from the admin panel will
              appear here automatically.
            </p>
          </div>
        </div>
      </section>
    );
  }

  /* =======================================================
     MAIN
  ======================================================= */

  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[#F4F7F9]
        py-12
        sm:py-14
        lg:py-16
      "
    >
      {/* BACKGROUND */}

      <div
        className="
          pointer-events-none
          absolute
          -right-40
          top-10
          h-[450px]
          w-[450px]
          rounded-full
          bg-[#DCE7ED]
          blur-[120px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -left-40
          bottom-0
          h-[350px]
          w-[350px]
          rounded-full
          bg-[#E7EEF2]
          blur-[100px]
        "
      />

      <div
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-[1500px]
          px-4
          sm:px-6
          lg:px-10
          xl:px-12
        "
      >
        {/* HEADER */}

        <motion.div
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
            duration: 0.7,
          }}
          className="
            mb-7
            flex
            flex-col
            gap-5
            lg:flex-row
            lg:items-end
            lg:justify-between
          "
        >
          <div>
            <div
              className="
                mb-3
                flex
                items-center
                gap-3
              "
            >
              <span
                className="
                  h-[3px]
                  w-10
                  rounded-full
                  bg-[#F5A623]
                "
              />

              <span
                className="
                  text-[11px]
                  font-black
                  uppercase
                  tracking-[0.18em]
                  text-[#2F7180]
                "
              >
                Shop by category
              </span>
            </div>

            <h2
              className="
                max-w-[700px]
                text-[34px]
                font-black
                leading-[0.95]
                tracking-[-0.05em]
                text-[#172321]
                sm:text-[44px]
                lg:text-[54px]
              "
            >
              Packaging made for
              <span className="text-[#123B5D]">
                {" "}
                every shipment.
              </span>
            </h2>
          </div>

          <div className="max-w-[420px]">
            <p
              className="
                text-[13px]
                leading-6
                text-[#66737D]
              "
            >
              Explore protective packaging solutions
              designed for safer transportation,
              efficient packing and reliable product
              protection.
            </p>

            <Link
              href="/products"
              className="
                group
                mt-4
                inline-flex
                items-center
                gap-3
                text-[11px]
                font-black
                uppercase
                tracking-[0.08em]
                text-[#123B5D]
              "
            >
              Browse all products

              <span
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-full
                  bg-[#F5A623]
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              >
                <ArrowRight size={14} />
              </span>
            </Link>
          </div>
        </motion.div>

        {/* CATEGORY TABS */}

        <div
          className="
            mb-5
            flex
            gap-2
            overflow-x-auto
            rounded-[15px]
            border
            border-[#DDE5EA]
            bg-white
            p-1.5
            shadow-[0_8px_30px_rgba(18,59,93,0.04)]
            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
          "
        >
          {categories.map((category, index) => {
            const selected = activeCategory === index;

            return (
              <button
                key={category.id}
                type="button"
                onClick={() =>
                  setActiveCategory(index)
                }
                className={[
                  "relative",
                  "flex",
                  "min-w-max",
                  "flex-1",
                  "items-center",
                  "justify-center",
                  "gap-2",
                  "overflow-hidden",
                  "rounded-[10px]",
                  "px-4",
                  "py-3",
                  "text-[13px]",
                  "font-bold",
                  "transition-colors",
                  "duration-300",

                  selected
                    ? "text-white"
                    : "text-[#66737D] hover:bg-[#F4F7F9] hover:text-[#123B5D]",
                ].join(" ")}
              >
                {selected && (
                  <motion.div
                    layoutId="activeCategory"
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 30,
                    }}
                    className="
                      absolute
                      inset-0
                      rounded-[10px]
                      bg-[#123B5D]
                    "
                  />
                )}

                <span
                  className={[
                    "relative",
                    "z-10",
                    "font-mono",
                    "text-[10px]",
                    "font-bold",

                    selected
                      ? "text-[#F5A623]"
                      : "text-[#9AA6A1]",
                  ].join(" ")}
                >
                  {category.number}
                </span>

                <span className="relative z-10">
                  {category.shortName}
                </span>
              </button>
            );
          })}
        </div>

        {/* ACTIVE CATEGORY */}

        <AnimatePresence mode="wait">
          {active && (
            <motion.div
              key={active.id}
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -10,
              }}
              transition={{
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div
                className="
                  grid
                  gap-4
                  lg:grid-cols-[1.05fr_2.95fr]
                "
              >
                {/* FEATURED CATEGORY */}

                <Link
                  href="/products"
                  className="
                    group
                    relative
                    min-h-[350px]
                    overflow-hidden
                    rounded-[20px]
                    bg-[#E5EDF2]
                    sm:min-h-[380px]
                    lg:min-h-[390px]
                  "
                >
                  <div
                    className="
                      absolute
                      -right-20
                      -top-20
                      h-64
                      w-64
                      rounded-full
                      bg-[#F5A623]/15
                      transition-transform
                      duration-700
                      group-hover:scale-125
                    "
                  />

                  <div
                    className="
                      absolute
                      -bottom-24
                      -left-24
                      h-56
                      w-56
                      rounded-full
                      bg-[#123B5D]/[0.05]
                      transition-transform
                      duration-700
                      group-hover:scale-125
                    "
                  />

                  {/* TEXT */}

                  <div
                    className="
                      relative
                      z-20
                      p-6
                      sm:p-7
                    "
                  >
                    <span
                      className="
                        inline-flex
                        rounded-full
                        bg-[#123B5D]
                        px-3.5
                        py-2
                        text-[10px]
                        font-black
                        uppercase
                        tracking-[0.08em]
                        text-white
                      "
                    >
                      Featured Category
                    </span>

                    <p
                      className="
                        mt-5
                        font-mono
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-[0.08em]
                        text-[#2F7180]
                      "
                    >
                      Category {active.number}
                    </p>

                    <h3
                      className="
                        mt-2
                        max-w-[310px]
                        text-[30px]
                        font-black
                        leading-[0.95]
                        tracking-[-0.05em]
                        text-[#123B5D]
                        sm:text-[36px]
                      "
                    >
                      {active.name}
                    </h3>

                    <p
                      className="
                        mt-3
                        max-w-[330px]
                        text-[12px]
                        leading-5
                        text-[#66737D]
                      "
                    >
                      {active.description}
                    </p>
                  </div>

                  {/* GIANT NUMBER */}

                  <span
                    className="
                      pointer-events-none
                      absolute
                      -right-2
                      top-3
                      text-[130px]
                      font-black
                      leading-none
                      text-[#123B5D]/[0.045]
                    "
                  >
                    {active.number}
                  </span>

                  {/* CATEGORY IMAGE */}

                  <motion.div
                    key={activeCategoryImage}
                    initial={{
                      opacity: 0,
                      scale: 0.85,
                      x: 25,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      x: 0,
                      y: [0, -6, 0],
                    }}
                    transition={{
                      opacity: {
                        duration: 0.4,
                      },
                      scale: {
                        duration: 0.6,
                      },
                      x: {
                        duration: 0.6,
                      },
                      y: {
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }}
                    className="
                      absolute
                      bottom-1
                      right-0
                      h-[46%]
                      w-[62%]
                      sm:h-[49%]
                      sm:w-[62%]
                    "
                  >
                    <Image
                      src={activeCategoryImage}
                      alt={active.name}
                      fill
                      unoptimized
                      sizes="500px"
                      className="
                        object-contain
                        drop-shadow-[0_20px_25px_rgba(18,59,93,0.16)]
                      "
                    />
                  </motion.div>

                  {/* CTA */}

                  <div
                    className="
                      absolute
                      bottom-5
                      left-6
                      z-30
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-full
                      bg-[#F5A623]
                      text-[#123B5D]
                      transition-all
                      duration-300
                      group-hover:rotate-45
                      group-hover:scale-110
                    "
                  >
                    <ArrowUpRight size={17} />
                  </div>
                </Link>

                {/* PRODUCT GRID */}

                <div
                  className="
                    grid
                    grid-cols-2
                    gap-3
                    sm:gap-4
                    xl:grid-cols-4
                  "
                >
                  {activeProducts.map(
                    (product, index) => (
                      <ProductCard
                        key={
                          product._id ||
                          product.id ||
                          product.slug ||
                          index
                        }
                        product={product}
                        index={index}
                      />
                    )
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* BULK ORDER BANNER */}

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
            relative
            mt-4
            overflow-hidden
            rounded-[18px]
            bg-[#123B5D]
          "
        >
          <div
            className="
              absolute
              -left-12
              -top-16
              h-40
              w-40
              rounded-full
              border-[30px]
              border-white/[0.03]
            "
          />

          <div
            className="
              absolute
              -bottom-24
              right-[20%]
              h-52
              w-52
              rounded-full
              bg-[#2F7180]
              opacity-40
              blur-2xl
            "
          />

          <div
            className="
              relative
              z-10
              flex
              flex-col
              gap-5
              px-6
              py-6
              sm:flex-row
              sm:items-center
              sm:justify-between
              lg:px-8
              lg:py-7
            "
          >
            <div className="flex items-center gap-4">
              <div
                className="
                  flex
                  h-12
                  w-12
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-[#F5A623]
                  text-[#123B5D]
                "
              >
                <Package size={20} />
              </div>

              <div>
                <div
                  className="
                    flex
                    items-center
                    gap-2
                  "
                >
                  <Sparkles
                    size={13}
                    className="text-[#F5A623]"
                  />

                  <span
                    className="
                      text-[10px]
                      font-black
                      uppercase
                      tracking-[0.12em]
                      text-[#F5A623]
                    "
                  >
                    Business Packaging
                  </span>
                </div>

                <h4
                  className="
                    mt-1.5
                    text-[17px]
                    font-bold
                    tracking-[-0.025em]
                    text-white
                    sm:text-[20px]
                  "
                >
                  Need custom sizes or bulk
                  packaging?
                </h4>

                <p
                  className="
                    mt-1.5
                    text-[11px]
                    leading-5
                    text-white/60
                  "
                >
                  Talk to our team for custom
                  requirements and business pricing.
                </p>
              </div>
            </div>

            <Link
              href="/contact"
              className="
                group
                flex
                w-fit
                shrink-0
                items-center
                gap-3
                rounded-full
                bg-[#F5A623]
                px-5
                py-3
                text-[11px]
                font-black
                uppercase
                tracking-[0.08em]
                text-[#123B5D]
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-white
                hover:shadow-xl
              "
            >
              Request a Quote

              <ArrowUpRight
                size={15}
                className="
                  transition-transform
                  duration-300
                  group-hover:rotate-45
                "
              />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

