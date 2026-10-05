"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

/* =========================================================
   CATEGORY DESIGN
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
   PRODUCT IMAGE
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
   CATEGORY IMAGE
========================================================= */

function getCategoryImage(category, products) {
  const key = normalizeCategory(category);

  if (categoryDesign[key]?.image) {
    return categoryDesign[key].image;
  }

  if (products?.length) {
    const image = getProductImage(products[0]);

    if (image) {
      return image;
    }
  }

  return "/Dannage.webp";
}

/* =========================================================
   CARD ANIMATION
========================================================= */

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 24,
  },

  show: (index) => ({
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.55,
      delay: index * 0.08,
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
     FETCH PRODUCTS
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
            data?.error ||
              "Unable to load products"
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
     BUILD CATEGORIES
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

        image: getCategoryImage(
          category.id,
          category.products
        ),

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
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <section className="w-full bg-[#F1EEE8] px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="mx-auto max-w-[1400px]">
          <div className="overflow-hidden rounded-[18px] bg-[#062033] p-5 sm:p-7 lg:p-8">

            <div className="flex flex-col gap-7 lg:flex-row lg:items-center">

              <div className="shrink-0 lg:w-[210px] xl:w-[225px]">
                <div className="h-3 w-16 animate-pulse rounded bg-white/10" />

                <div className="mt-4 h-20 w-40 animate-pulse rounded bg-white/10" />

                <div className="mt-4 h-8 w-44 animate-pulse rounded bg-white/10" />
              </div>

              <div className="grid grid-flow-col auto-cols-[205px] gap-4 overflow-hidden sm:auto-cols-[220px] lg:grid-flow-col lg:auto-cols-fr">
                {Array.from({ length: 5 }).map(
                  (_, index) => (
                    <div
                      key={index}
                      className="overflow-hidden rounded-[12px] bg-[#F5F2ED]"
                    >
                      <div className="h-[170px] animate-pulse bg-[#E5E1DA] sm:h-[185px]" />

                      <div className="space-y-3 p-4">
                        <div className="h-3 w-28 animate-pulse rounded bg-[#DDD8D0]" />
                        <div className="h-1 w-8 animate-pulse rounded bg-[#DDD8D0]" />
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
     EMPTY
  ======================================================= */

  if (!categories.length) {
    return (
      <section className="w-full bg-[#F1EEE8] px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="mx-auto max-w-[1400px]">
          <div className="rounded-[18px] bg-[#062033] px-6 py-12 text-center">
            <p className="font-quicksand text-sm text-white/50">
              Categories will appear here when
              products are added from the admin panel.
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

        {/* =================================================
            MAIN CONTAINER
        ================================================= */}

        <div className="relative overflow-hidden rounded-[20px] bg-[#062033] px-5 py-6 shadow-[0_18px_50px_rgba(6,32,51,0.10)] sm:px-7 sm:py-8 lg:px-8 lg:py-9">

          {/* BACKGROUND GLOW */}

          <div className="pointer-events-none absolute -left-24 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-[#F5A623]/[0.06] blur-[90px]" />

          <div className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-[#1C5276]/30 blur-[100px]" />

          <div className="pointer-events-none absolute bottom-[-100px] left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-[#F5A623]/[0.035] blur-[100px]" />

          {/* =================================================
              CONTENT
          ================================================= */}

          <div className="relative z-10 flex flex-col gap-7 lg:flex-row lg:items-center lg:gap-8">

            {/* =================================================
                LEFT CONTENT
            ================================================= */}

            <motion.div
              initial={{
                opacity: 0,
                x: -30,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="shrink-0 lg:w-[205px] xl:w-[225px]"
            >

              <div className="flex items-center gap-2">

                <span className="font-quicksand text-[9px] font-bold uppercase tracking-[0.2em] text-[#F5A623]">
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

              <h2 className="mt-2 font-outfit text-[28px] font-semibold leading-[1.02] tracking-[-0.04em] text-white sm:text-[31px] lg:text-[32px]">
                Explore
                <br />
                Categories
              </h2>

              <p className="mt-3 max-w-[195px] font-quicksand text-[11px] leading-[1.55] text-white/50">
                Protective packaging solutions
                designed for safe and secure
                transportation.
              </p>

              <Link
                href="/products"
                className="group mt-5 inline-flex items-center gap-2 border-b border-white/25 pb-1.5 font-quicksand text-[12px] font-semibold text-white/75 transition-all duration-300 hover:border-[#F5A623] hover:text-[#F5A623]"
              >
                See all

                <ArrowUpRight
                  size={13}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </Link>

            </motion.div>

            {/* =================================================
                CATEGORY CARDS
            ================================================= */}

            <div className="min-w-0 flex-1 overflow-x-auto scrollbar-hide">

              <div className="grid grid-flow-col auto-cols-[205px] gap-4 sm:auto-cols-[220px] sm:gap-5 lg:grid-flow-col lg:auto-cols-fr">

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
                        className="group relative block overflow-hidden rounded-[13px] bg-[#F7F4EE] shadow-[0_10px_30px_rgba(0,0,0,0.10)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(0,0,0,0.18)]"
                      >

                        {/* =====================================
                            IMAGE AREA
                        ===================================== */}

                        <div className="relative h-[175px] overflow-hidden bg-[radial-gradient(circle_at_50%_45%,#ffffff_0%,#F7F4EE_55%,#EDE8DF_100%)] sm:h-[190px] lg:h-[195px] xl:h-[205px]">

                          {/* subtle background glow */}

                          <div className="pointer-events-none absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/80 blur-2xl transition-transform duration-700 group-hover:scale-125" />

                          {/* PRODUCT IMAGE */}

                          <motion.div
                            className="absolute inset-0"
                            whileHover={{
                              scale: 1.055,
                            }}
                            transition={{
                              duration: 0.7,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                          >

                            <Image
                              src={category.image}
                              alt={category.name}
                              fill
                              unoptimized
                              sizes="(max-width: 640px) 205px, (max-width: 1024px) 220px, 260px"
                              className="object-contain px-3 py-2 sm:px-4 sm:py-2"
                            />

                          </motion.div>

                          {/* IMAGE BOTTOM SHADOW */}

                          <div className="pointer-events-none absolute bottom-4 left-1/2 h-4 w-[55%] -translate-x-1/2 rounded-[50%] bg-black/10 blur-md transition-all duration-500 group-hover:w-[62%] group-hover:bg-black/15" />

                          {/* NUMBER */}

                          <span className="absolute left-3 top-3 flex h-7 min-w-7 items-center justify-center rounded-full border border-black/[0.06] bg-white/90 px-1.5 font-outfit text-[9px] font-semibold text-[#062033] shadow-sm backdrop-blur-sm">
                            {category.number}
                          </span>

                          {/* ARROW */}

                          <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#062033] text-white opacity-70 shadow-lg transition-all duration-300 group-hover:rotate-[-8deg] group-hover:bg-[#F5A623] group-hover:opacity-100">
                            <ArrowUpRight size={14} />
                          </span>

                        </div>

                        {/* =====================================
                            TEXT AREA
                        ===================================== */}

                        <div className="relative border-t border-black/[0.06] px-4 py-3.5">

                          <h3 className="font-outfit text-[13px] font-semibold leading-[1.25] text-[#15191C] transition-colors duration-300 group-hover:text-[#D78B00] sm:text-[14px]">
                            {category.name}
                          </h3>

                          <div className="mt-2 h-[2px] w-7 rounded-full bg-[#F5A623] transition-all duration-500 group-hover:w-12" />

                        </div>

                        {/* BOTTOM ACCENT */}

                        <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-[#F5A623] transition-all duration-500 group-hover:w-full" />

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
