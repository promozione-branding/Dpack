"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

/* =========================================================
   CATEGORY FALLBACK DESIGN
   Used when category does not have its own image
========================================================= */

const categoryDesign = {
  dunnage: {
    name: "Dunnage Air Bags",
    image: "/Dannage.webp",
    href: "/products/dunnage-air-bags",
  },

  "dunnage-bags": {
    name: "Dunnage Air Bags",
    image: "/Dannage.webp",
    href: "/products/dunnage-air-bags",
  },

  "dunnage-air-bags": {
    name: "Dunnage Air Bags",
    image: "/Dannage.webp",
    href: "/products/dunnage-air-bags",
  },

  "air-column-bags": {
    name: "Air Column Bags",
    image: "/Air column bag (2).webp",
    href: "/products/air-column-bags",
  },

  "air-column-roll": {
    name: "Air Column Rolls",
    image: "/Air Column Roll (2).webp",
    href: "/products/air-column-rolls",
  },

  "air-column-rolls": {
    name: "Air Column Rolls",
    image: "/Air Column Roll (2).webp",
    href: "/products/air-column-rolls",
  },

  "packaging-air-bags": {
    name: "Packaging Air Bags",
    image: "/packing bag.webp",
    href: "/products/packaging-air-bags",
  },

  "gap-fillers": {
    name: "Gap Fillers",
    image: "/Gap filler (3).webp",
    href: "/products/gap-fillers",
  },

  "gap-filler": {
    name: "Gap Fillers",
    image: "/Gap filler (3).webp",
    href: "/products/gap-fillers",
  },
};

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
   CATEGORY NAME
========================================================= */

function getCategoryName(category) {
  const key = normalizeCategory(category);

  if (categoryDesign[key]?.name) {
    return categoryDesign[key].name;
  }

  if (typeof category === "object") {
    return (
      category.name ||
      category.title ||
      "Products"
    );
  }

  return category
    .toString()
    .replace(/-/g, " ")
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase()
    );
}

/* =========================================================
   GET PRODUCT IMAGE
========================================================= */

function getProductImage(product) {
  if (!product) return null;

  if (typeof product.image === "string") {
    return product.image;
  }

  if (product.image?.url) {
    return product.image.url;
  }

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

  return null;
}

/* =========================================================
   GET CATEGORY IMAGE
========================================================= */

function getCategoryImage(category, products) {
  const key = normalizeCategory(category);

  /*
   * First preference:
   * Existing DPack category image
   */

  if (categoryDesign[key]?.image) {
    return categoryDesign[key].image;
  }

  /*
   * Second preference:
   * First product image from admin
   */

  if (products?.length) {
    const image = getProductImage(products[0]);

    if (image) {
      return image;
    }
  }

  /*
   * Final fallback
   */

  return "/Dannage.webp";
}

/* =========================================================
   CARD ANIMATION
========================================================= */

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },

  show: (index) => ({
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.5,
      delay: index * 0.07,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

/* =========================================================
   COMPONENT
========================================================= */

export default function Categories() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  /* =======================================================
     FETCH ADMIN PRODUCTS
  ======================================================= */

  useEffect(() => {
    let mounted = true;

    async function fetchProducts() {
      try {
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
      } catch (error) {
        console.error(
          "Category products fetch error:",
          error
        );

        if (mounted) {
          setProducts([]);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    fetchProducts();

    return () => {
      mounted = false;
    };
  }, []);

  /* =======================================================
     BUILD CATEGORIES FROM PRODUCTS
  ======================================================= */

  const categories = useMemo(() => {
    const categoryMap = new Map();

    products.forEach((product) => {
      if (!product?.category) return;

      const key = normalizeCategory(
        product.category
      );

      if (!key) return;

      if (!categoryMap.has(key)) {
        categoryMap.set(key, {
          id: key,

          name: getCategoryName(
            product.category
          ),

          products: [],
        });
      }

      categoryMap
        .get(key)
        .products.push(product);
    });

    return Array.from(
      categoryMap.values()
    ).map((category, index) => {
      const design =
        categoryDesign[category.id];

      return {
        ...category,

        /*
         * Existing design image first,
         * product image as fallback
         */

        image: getCategoryImage(
          category.id,
          category.products
        ),

        /*
         * Existing URL first,
         * otherwise generated URL
         */

        href:
          design?.href ||
          `/products/${category.id}`,

        number: String(index + 1).padStart(
          2,
          "0"
        ),
      };
    });
  }, [products]);

  /* =======================================================
     LOADING STATE
  ======================================================= */

  if (loading) {
    return (
      <section className="w-full bg-[#F1EEE8] px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="mx-auto max-w-[1400px]">
          <div
            className="
              relative
              overflow-hidden
              rounded-[14px]
              bg-[#062033]
              px-5
              py-5
              sm:px-6
              sm:py-6
              lg:px-7
              lg:py-7
            "
          >
            <div
              className="
                flex
                flex-col
                gap-6
                lg:flex-row
                lg:items-center
              "
            >
              {/* TITLE SKELETON */}

              <div
                className="
                  shrink-0
                  lg:w-[205px]
                  xl:w-[220px]
                "
              >
                <div className="h-3 w-16 animate-pulse rounded bg-white/10" />

                <div className="mt-3 h-16 w-36 animate-pulse rounded bg-white/10" />

                <div className="mt-3 h-8 w-40 animate-pulse rounded bg-white/10" />
              </div>

              {/* CARD SKELETON */}

              <div
                className="
                  grid
                  grid-flow-col
                  auto-cols-[175px]
                  gap-3
                  overflow-hidden
                  sm:auto-cols-[190px]
                  sm:gap-4
                  lg:grid-flow-col
                  lg:auto-cols-fr
                "
              >
                {Array.from({ length: 5 }).map(
                  (_, index) => (
                    <div
                      key={index}
                      className="
                        overflow-hidden
                        rounded-[8px]
                        bg-[#F5F2ED]
                      "
                    >
                      <div className="h-[125px] animate-pulse bg-[#E5E1DA] sm:h-[135px] lg:h-[140px]" />

                      <div className="space-y-2 p-3">
                        <div className="h-3 w-28 animate-pulse rounded bg-[#DDD8D0]" />

                        <div className="h-[2px] w-5 animate-pulse bg-[#DDD8D0]" />
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* =======================================================
     EMPTY STATE
  ======================================================= */

  if (!categories.length) {
    return (
      <section className="w-full bg-[#F1EEE8] px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="mx-auto max-w-[1400px]">
          <div
            className="
              rounded-[14px]
              bg-[#062033]
              px-6
              py-10
              text-center
            "
          >
            <p className="font-quicksand text-sm text-white/50">
              Categories will appear here when products
              are added from the admin panel.
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
    <section className="w-full bg-[#F1EEE8] px-4 py-10 sm:px-6 sm:py-14 lg:px-8">

      <div className="mx-auto max-w-[1400px]">

        {/* =====================================================
            MAIN BOX
        ===================================================== */}

        <div
          className="
            relative
            overflow-hidden
            rounded-[14px]
            bg-[#062033]
            px-5
            py-5
            sm:px-6
            sm:py-6
            lg:px-7
            lg:py-7
          "
        >

          {/* BACKGROUND GLOW */}

          <div
            className="
              pointer-events-none
              absolute
              -left-20
              top-1/2
              h-48
              w-48
              -translate-y-1/2
              rounded-full
              bg-[#133C5E]
              blur-[80px]
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              -right-20
              top-1/2
              h-52
              w-52
              -translate-y-1/2
              rounded-full
              bg-[#143D5E]/5
              blur-[80px]
            "
          />

          {/* =================================================
              MAIN LAYOUT
          ================================================= */}

          <div
            className="
              relative
              z-10
              flex
              flex-col
              gap-6
              lg:flex-row
              lg:items-center
              lg:gap-7
            "
          >

            {/* =================================================
                LEFT TITLE
            ================================================= */}

            <motion.div
              initial={{
                opacity: 0,
                x: -25,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                shrink-0
                lg:w-[205px]
                xl:w-[220px]
              "
            >

              <div className="flex items-center gap-2">

                <span
                  className="
                    font-quicksand
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.18em]
                    text-[#F5A623]
                  "
                >
                  DPACK
                </span>

                <motion.span
                  animate={{
                    rotate: [0, 15, -10, 0],
                    scale: [1, 1.15, 1],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    repeatDelay: 2,
                  }}
                  className="text-[15px] text-[#F5A623]"
                >
                  ✦
                </motion.span>

              </div>

              <h2
                className="
                  mt-1.5
                  font-outfit
                  text-[24px]
                  font-semibold
                  leading-[1.05]
                  tracking-[-0.035em]
                  text-white
                  sm:text-[27px]
                  lg:text-[29px]
                "
              >
                Explore
                <br />
                Categories
              </h2>

              <p
                className="
                  mt-2
                  max-w-[190px]
                  font-quicksand
                  text-[14px]
                  leading-4
                  text-white/55
                  sm:text-[11px]
                  sm:leading-5
                "
              >
                Protective packaging solutions
                designed for safe and secure
                transportation.
              </p>

              {/* SEE ALL */}

              <Link
                href="/products"
                className="
                  group
                  mt-3
                  inline-flex
                  items-center
                  gap-1.5
                  border-b
                  border-white/30
                  pb-1
                  font-quicksand
                  text-[13px]
                  font-semibold
                  text-white/80
                  transition-all
                  duration-300
                  hover:border-[#F5A623]
                  hover:text-[#F5A623]
                "
              >
                See all

                <ArrowUpRight
                  size={12}
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-0.5
                    group-hover:-translate-y-0.5
                  "
                />
              </Link>

            </motion.div>

            {/* =================================================
                CATEGORY CARDS
            ================================================= */}

            <div
              className="
                min-w-0
                flex-1
                overflow-x-auto
                scrollbar-hide
              "
            >

              <div
                className="
                  grid
                  grid-flow-col
                  auto-cols-[175px]
                  gap-3
                  sm:auto-cols-[190px]
                  sm:gap-4
                  lg:grid-flow-col
                  lg:auto-cols-fr
                "
              >

                {categories.map(
                  (category, index) => (

                    <motion.div
                      key={category.id}
                      custom={index}
                      variants={cardVariants}
                      initial="hidden"
                      whileInView="show"
                      viewport={{
                        once: true,
                        amount: 0.15,
                      }}
                      className="min-w-0"
                    >

                      <Link
                        href={category.href}
                        className="
                          group
                          relative
                          block
                          overflow-hidden
                          rounded-[8px]
                          bg-[#F5F2ED]
                        "
                      >

                        {/* =================================================
                            IMAGE
                        ================================================= */}

                        <div
                          className="
                            relative
                            h-[125px]
                            overflow-hidden
                            sm:h-[135px]
                            lg:h-[140px]
                            xl:h-[145px]
                          "
                        >

                          <Image
                            src={category.image}
                            alt={category.name}
                            fill
                            unoptimized
                            sizes="200px"
                            className="
                              object-contain
                              p-3.5
                              transition-transform
                              duration-700
                              ease-out
                              group-hover:scale-[1.1]
                            "
                          />

                          {/* IMAGE OVERLAY */}

                          <div
                            className="
                              absolute
                              inset-0
                              bg-[#D95026]/0
                              transition-all
                              duration-500
                              group-hover:bg-[#D95026]/[0.05]
                            "
                          />

                          {/* NUMBER */}

                          <span
                            className="
                              absolute
                              left-2.5
                              top-2.5
                              flex
                              h-6
                              w-6
                              items-center
                              justify-center
                              rounded-full
                              bg-white/90
                              font-outfit
                              text-[8px]
                              font-bold
                              text-[#151515]
                              shadow-sm
                            "
                          >
                            {category.number}
                          </span>

                          {/* ARROW */}

                          <span
                            className="
                              absolute
                              right-2.5
                              top-2.5
                              flex
                              h-7
                              w-7
                              items-center
                              justify-center
                              rounded-full
                              bg-[#143D5E]
                              text-white
                              opacity-0
                              transition-all
                              duration-300
                              group-hover:opacity-100
                              group-hover:rotate-[-8deg]
                            "
                          >
                            <ArrowUpRight size={13} />
                          </span>

                        </div>

                        {/* =================================================
                            CARD TEXT
                        ================================================= */}

                        <div
                          className="
                            border-t
                            border-black/[0.06]
                            px-3
                            py-2.5
                          "
                        >

                          <h3
                            className="
                              line-clamp-1
                              font-outfit
                              text-[12px]
                              font-semibold
                              leading-tight
                              text-[#181818]
                              transition-colors
                              duration-300
                              group-hover:text-[#F5A623]
                              sm:text-[13px]
                            "
                          >
                            {category.name}
                          </h3>

                          <div
                            className="
                              mt-1.5
                              h-[2px]
                              w-5
                              bg-[#F5A623]
                              transition-all
                              duration-500
                              group-hover:w-9
                            "
                          />

                        </div>

                        {/* BOTTOM LINE */}

                        <div
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
                          "
                        />

                      </Link>

                    </motion.div>

                  )
                )}

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
  }