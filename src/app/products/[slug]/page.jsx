"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Minus,
  Package,
  Plus,
  Quote,
  ShieldCheck,
  Sparkles,
  Star,
  Truck,
  ZoomIn,
} from "lucide-react";

/* =========================================================
   PRODUCT IMAGES
========================================================= */

const productImages = [
  "/Air column bag (2).webp",
  "/Air column bag (2).webp",
  "/Air column bag (2).webp",
  "/Air column bag (2).webp",
];

/* =========================================================
   PRODUCT OPTIONS
========================================================= */

const protectionTypes = [
  {
    name: "Standard Protection",
    description: "Reliable cushioning for everyday shipping",
  },
  {
    name: "Heavy Protection",
    description: "Extra protection for fragile products",
  },
];

const sizes = [
  {
    name: "Small",
    description: "For compact electronic products",
  },
  {
    name: "Large",
    description: "For larger and delicate products",
  },
];

/* =========================================================
   RELATED PRODUCTS
========================================================= */

const relatedProducts = [
  {
    name: "Dunnage Air Bag",
    category: "Load Stabilization Packaging",
    image: "/products/dunnage-air-bag.webp",
  },
  {
    name: "Air Column Roll",
    category: "Protective Air Packaging",
    image: "/products/air-column-roll.webp",
  },
  {
    name: "Packaging Air Bag",
    category: "Void Fill Packaging",
    image: "/products/packaging-air-bag.webp",
  },
  {
    name: "Gap Filler",
    category: "Packaging Protection",
    image: "/products/gap-filler.webp",
  },
];

/* =========================================================
   PRODUCT SPECS
========================================================= */

const specifications = [
  ["Product Type", "Air Column Bag"],
  ["Application", "Protective Product Packaging"],
  ["Suitable For", "Electronics & Fragile Products"],
  ["Protection Type", "Air Cushion Protection"],
  ["Material", "High-Strength Packaging Film"],
  ["Structure", "Air Column / Air Chamber"],
  ["Usage", "Shipping, Storage & Transportation"],
  ["Inflation", "Air Inflation"],
  ["Packaging Benefit", "Lightweight & Space Efficient"],
  ["Customization", "Available as per Requirement"],
];

/* =========================================================
   REVIEWS
========================================================= */

const reviews = [
  {
    name: "Rahul Sharma",
    role: "Packaging Buyer",
    review: "Excellent protection for our products",
  },
  {
    name: "Amit Verma",
    role: "Ecommerce Business",
    review: "Lightweight and easy to use",
  },
];

/* =========================================================
   ANIMATION VARIANTS
========================================================= */

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const fadeLeft = {
  hidden: {
    opacity: 0,
    x: -40,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const fadeRight = {
  hidden: {
    opacity: 0,
    x: 40,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
    },
  },
};

/* =========================================================
   REVEAL
========================================================= */

function Reveal({
  children,
  className = "",
  variants = fadeUp,
}) {
  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.15,
      }}
    >
      {children}
    </motion.div>
  );
}

/* =========================================================
   STARS
========================================================= */

function Stars({ size = 16 }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          className="fill-[#F5A623] text-[#F5A623]"
        />
      ))}
    </div>
  );
}

/* =========================================================
   MAIN PAGE
========================================================= */

export default function Page() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedProtection, setSelectedProtection] = useState(
    "Standard Protection"
  );
  const [selectedSize, setSelectedSize] = useState("Small");
  const [zoomOpen, setZoomOpen] = useState(false);

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const nextImage = () => {
    setSelectedImage(
      (prev) => (prev + 1) % productImages.length
    );
  };

  const previousImage = () => {
    setSelectedImage(
      (prev) =>
        (prev - 1 + productImages.length) %
        productImages.length
    );
  };

  return (
 <main className="min-h-screen overflow-x-clip bg-[#f7f7f5] text-[#171717]">

      {/* =====================================================
          BACKGROUND DECORATION
      ===================================================== */}

      <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
        <motion.div
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-[-120px] top-[20%] h-[280px] w-[280px] rounded-full bg-[#F5A623]/5 blur-3xl"
        />

        <motion.div
          animate={{
            y: [0, 25, 0],
            x: [0, -15, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute right-[-100px] top-[50%] h-[300px] w-[300px] rounded-full bg-[#0B1F3A]/5 blur-3xl"
        />
      </div>

      {/* =====================================================
          BREADCRUMB
      ===================================================== */}

      <section className="relative z-10 border-b border-black/5 bg-white">
        <div className="mx-auto flex max-w-7xl items-center px-5 py-4 sm:px-8 lg:px-10">
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-neutral-500 sm:text-sm">
            <span className="transition-colors hover:text-[#F5A623]">
              Home
            </span>

            <span>/</span>

            <span className="transition-colors hover:text-[#F5A623]">
              Products
            </span>

            <span>/</span>

            <span className="transition-colors hover:text-[#F5A623]">
              Protective Packaging
            </span>

            <span>/</span>

            <span className="font-semibold text-[#0B1F3A]">
              Air Column Bag
            </span>
          </div>
        </div>
      </section>

    {/* =====================================================
    HERO
===================================================== */}

<section className="relative z-10 mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
  <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-14">

    {/* =================================================
        GALLERY - STICKY
    ================================================= */}

    <div className="lg:col-span-7 lg:self-start">

      {/* IMPORTANT:
          Sticky is directly on this wrapper.
          Do NOT put Framer Motion transform on this element.
      */}

      <div className="lg:sticky lg:top-28 lg:h-fit">

        <motion.div
          initial={{
            opacity: 0,
            x: -40,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: true,
            amount: 0.15,
          }}
          transition={{
            duration: 0.75,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative"
        >

          {/* FLOATING BADGE */}

          <motion.div
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -right-2 -top-3 z-30 hidden rounded-full bg-[#F5A623] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white shadow-xl sm:block"
          >
            Premium Protection
          </motion.div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-[82px_1fr]">

            {/* =================================================
                THUMBNAILS
            ================================================= */}

            <div className="order-2 flex gap-3 overflow-x-auto sm:order-1 sm:flex-col">

              {productImages.map((image, index) => (
                <motion.button
                  key={index}
                  type="button"
                  onClick={() => setSelectedImage(index)}
                  whileHover={{
                    y: -4,
                  }}
                  whileTap={{
                    scale: 0.96,
                  }}
                  className={`group relative h-[78px] min-w-[78px] overflow-hidden rounded-2xl border bg-white transition-all ${
                    selectedImage === index
                      ? "border-[#F5A623] shadow-[0_8px_25px_rgba(217,80,38,0.15)]"
                      : "border-neutral-200 hover:border-[#F5A623]/40"
                  }`}
                >

                  <img
                    src={image}
                    alt={`Air Column Bag ${index + 1}`}
                    className="h-full w-full object-contain p-2 transition-transform duration-500 group-hover:scale-110"
                  />

                  {selectedImage === index && (
                    <motion.div
                      layoutId="activeThumbnail"
                      className="absolute bottom-0 left-2 right-2 h-[3px] rounded-full bg-[#F5A623]"
                    />
                  )}

                </motion.button>
              ))}

            </div>

            {/* =================================================
                MAIN IMAGE
            ================================================= */}

            <div className="order-1 sm:order-2 ">

              <div className="group relative min-h-[430px] overflow-hidden rounded-[28px] border border-neutral-200 bg-white shadow-[0_20px_70px_rgba(11,31,58,0.08)] sm:min-h-[560px]">

                {/* BACKGROUND CIRCLE */}

                <motion.div
                  animate={{
                    scale: [1, 1.08, 1],
                  }}
                  transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#F5A623]/5"
                />

                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-[#0B1F3A]/5"
                />

                {/* =================================================
                    BADGES
                ================================================= */}

                <div className="absolute left-5 top-5 z-20 flex flex-wrap gap-2">

                  <span className="rounded-full bg-[#0B1F3A] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white">
                    Dpack
                  </span>

                  <span className="rounded-full bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#0B1F3A] shadow-md">
                    Protective Packaging
                  </span>

                </div>

                {/* =================================================
                    ZOOM
                ================================================= */}

                <motion.button
                  type="button"
                  onClick={() => setZoomOpen(true)}
                  whileHover={{
                    scale: 1.08,
                  }}
                  whileTap={{
                    scale: 0.95,
                  }}
                  className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 bg-white text-[#0B1F3A] shadow-lg transition-colors hover:bg-[#F5A623] hover:text-white"
                >
                  <ZoomIn size={18} />
                </motion.button>

                {/* =================================================
                    IMAGE
                ================================================= */}

                <div className="flex min-h-[430px] items-center justify-center p-8 sm:min-h-[560px] sm:p-14">

                  <AnimatePresence mode="wait">

                    <motion.img
                      key={selectedImage}
                      src={productImages[selectedImage]}
                      alt="Air Column Bag for Electronics"

                      initial={{
                        opacity: 0,
                        scale: 0.94,
                        x: 18,
                      }}

                      animate={{
                        opacity: 1,
                        scale: 1,
                        x: 0,
                      }}

                      exit={{
                        opacity: 0,
                        scale: 0.96,
                        x: -18,
                      }}

                      transition={{
                        duration: 0.45,
                        ease: [0.22, 1, 0.36, 1],
                      }}

                      className="relative z-10 max-h-[390px] w-full object-contain transition-transform duration-700 group-hover:scale-[1.025] sm:max-h-[470px]"
                    />

                  </AnimatePresence>

                </div>

                {/* =================================================
                    PREVIOUS
                ================================================= */}

                <motion.button
                  type="button"
                  onClick={previousImage}
                  whileHover={{
                    scale: 1.08,
                    x: -2,
                  }}
                  whileTap={{
                    scale: 0.94,
                  }}
                  className="absolute left-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white/95 text-[#0B1F3A] shadow-lg backdrop-blur transition-colors hover:bg-[#0B1F3A] hover:text-white"
                >
                  <ArrowLeft size={17} />
                </motion.button>

                {/* =================================================
                    NEXT
                ================================================= */}

                <motion.button
                  type="button"
                  onClick={nextImage}
                  whileHover={{
                    scale: 1.08,
                    x: 2,
                  }}
                  whileTap={{
                    scale: 0.94,
                  }}
                  className="absolute right-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white/95 text-[#0B1F3A] shadow-lg backdrop-blur transition-colors hover:bg-[#0B1F3A] hover:text-white"
                >
                  <ArrowRight size={17} />
                </motion.button>

                {/* =================================================
                    COUNTER
                ================================================= */}

                <div className="absolute bottom-5 left-1/2 z-20 -translate-x-1/2 rounded-full bg-[#0B1F3A]/90 px-4 py-2 text-xs font-semibold text-white backdrop-blur">
                  {String(selectedImage + 1).padStart(2, "0")} /{" "}
                  {String(productImages.length).padStart(2, "0")}
                </div>

              </div>
            </div>

          </div>

        </motion.div>

      </div>
    </div>

    {/* =================================================
        PRODUCT INFO
        This content determines the sticky height
    ================================================= */}

    <motion.div
      initial={{
        opacity: 0,
        x: 40,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: 0.75,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="lg:col-span-5"
    >

      <div className="flex h-full flex-col">

        {/* RATING */}

        <div className="mb-5 flex flex-wrap items-center gap-3">

          <div className="flex items-center gap-2 rounded-full bg-[#F5A623]/10 px-3 py-2">
            <Stars size={13} />

            <span className="text-xs font-bold text-[#0B1F3A]">
              4.8 / 5
            </span>
          </div>

          <span className="text-xs font-medium text-neutral-500">
            Customer Reviews
          </span>

          <span className="hidden h-1 w-1 rounded-full bg-neutral-300 sm:block" />

          <span className="text-xs font-semibold text-[#F5A623]">
            Packaging Solution
          </span>

        </div>

        {/* TITLE */}

        <div>

          <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-[#F5A623]">
            Protective Packaging
          </p>

          <h1 className="max-w-xl text-4xl font-bold leading-[1.05] tracking-tight text-[#0B1F3A] sm:text-5xl">
          Air Column Bag for Electronics
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-7 text-neutral-500 sm:text-base">
            Lightweight
            <span className="mx-1 text-[#F5A623]">•</span>
            Shock Protection
            <span className="mx-1 text-[#F5A623]">•</span>
            Space Saving
            <span className="mx-1 text-[#F5A623]">•</span>
            Easy to Use
          </p>

        </div>

        {/* =================================================
            ECOMMERCE PRODUCT BOX
        ================================================= */}

        <motion.div
          whileHover={{
            y: -3,
          }}
          className="relative mt-8 overflow-hidden rounded-[8px] border border-neutral-200 bg-white shadow-[0_15px_45px_rgba(11,31,58,0.06)]"
        >

          <div className="relative overflow-hidden bg-[#0B1F3A] p-6">

            <div className="absolute right-[-40px] top-[-60px] h-40 w-40 rounded-full bg-[#F5A623]/20 blur-2xl" />

            <div className="relative flex items-start justify-between gap-4">

              <div>

                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#F5A623]">
                  Premium Packaging
                </p>

                <h3 className="mt-2 text-2xl font-bold text-white">
                  Air Column Bag
                </h3>

                <p className="mt-2 text-sm leading-6 text-white/65">
                  Reliable protection for electronics and fragile products.
                </p>

              </div>

              <motion.div
                animate={{
                  y: [0, -5, 0],
                  rotate: [0, 2, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F5A623] text-white"
              >
                <Package size={21} />
              </motion.div>

            </div>

            <div className="relative mt-6 grid grid-cols-3 gap-2">

              <div className="border border-white/10 bg-white/5 p-3">
                <p className="text-[9px] font-bold uppercase tracking-wider text-white/40">
                  Delivery
                </p>

                <p className="mt-1 text-xs font-bold text-white">
                  Pan India
                </p>
              </div>

              <div className="border border-white/10 bg-white/5 p-3">
                <p className="text-[9px] font-bold uppercase tracking-wider text-white/40">
                  Quality
                </p>

                <p className="mt-1 text-xs font-bold text-white">
                  Premium
                </p>
              </div>

              <div className="border border-white/10 bg-white/5 p-3">
                <p className="text-[9px] font-bold uppercase tracking-wider text-white/40">
                  Supply
                </p>

                <p className="mt-1 text-xs font-bold text-white">
                  Bulk
                </p>
              </div>

            </div>

          </div>

        </motion.div>

        {/* DESCRIPTION */}

        <p className="mt-7 text-sm leading-7 text-neutral-600 sm:text-[15px]">
          Air Column Bags provide effective cushioning for electronics
          and fragile products during shipping, storage and
          transportation. Their lightweight structure offers reliable
          protection while taking minimal storage space.
        </p>

        {/* PROTECTION TYPE */}

        <div className="mt-7">

          <div className="mb-3 flex items-center justify-between">

            <h3 className="text-sm font-bold text-[#0B1F3A]">
              Protection Type
            </h3>

            <span className="text-xs font-semibold text-[#F5A623]">
              {selectedProtection}
            </span>

          </div>

          <div className="grid gap-3 sm:grid-cols-2">

            {protectionTypes.map((item) => {

              const active =
                selectedProtection === item.name;

              return (
                <motion.button
                  key={item.name}
                  type="button"
                  onClick={() =>
                    setSelectedProtection(item.name)
                  }
                  whileHover={{
                    y: -3,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  className={`relative overflow-hidden border p-4 text-left transition-all ${
                    active
                      ? "border-[#F5A623] bg-[#F5A623]/5 shadow-[0_10px_30px_rgba(217,80,38,0.08)]"
                      : "border-neutral-200 bg-white hover:border-[#F5A623]/40"
                  }`}
                >

                  {active && (
                    <motion.div
                      layoutId="protectionActive"
                      className="absolute left-0 top-0 h-full w-1 bg-[#F5A623]"
                    />
                  )}

                  <div className="flex items-start gap-3">

                    <div
                      className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center ${
                        active
                          ? "bg-[#F5A623] text-white"
                          : "bg-[#0B1F3A]/5 text-[#0B1F3A]"
                      }`}
                    >
                      <ShieldCheck size={16} />
                    </div>

                    <div>

                      <p className="text-sm font-bold text-[#0B1F3A]">
                        {item.name}
                      </p>

                      <p className="mt-1 text-xs leading-5 text-neutral-500">
                        {item.description}
                      </p>

                    </div>

                  </div>

                </motion.button>
              );
            })}

          </div>

        </div>


        {/* FEATURES */}

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.2,
          }}
          className="mt-7 grid grid-cols-2 gap-3"
        >

          {[
            {
              title: "Shock Protection",
              icon: ShieldCheck,
            },
            {
              title: "Lightweight",
              icon: Sparkles,
            },
            {
              title: "Flexible",
              icon: Package,
            },
            {
              title: "Compact",
              icon: ArrowUpRight,
            },
          ].map((item) => {

            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                variants={fadeUp}
                whileHover={{
                  y: -4,
                }}
                className="group border border-neutral-200 bg-white p-4 transition-shadow hover:shadow-[0_12px_35px_rgba(11,31,58,0.07)]"
              >

                <div className="flex items-center gap-3">

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-[#0B1F3A]/5 text-[#F5A623] transition-colors group-hover:bg-[#F5A623] group-hover:text-white">
                    <Icon size={16} />
                  </div>

                  <span className="text-xs font-bold text-[#0B1F3A]">
                    {item.title}
                  </span>

                </div>

              </motion.div>
            );
          })}

        </motion.div>

        {/* =================================================
            QUANTITY + ADD TO CART
        ================================================= */}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">

          {/* QUANTITY */}

          <div className="flex h-14 items-center justify-between border border-neutral-200 bg-white px-3 sm:w-[145px]">

            <motion.button
              type="button"
              whileTap={{
                scale: 0.85,
              }}
              onClick={decreaseQuantity}
              className="flex h-9 w-9 items-center justify-center text-[#0B1F3A] transition-colors hover:bg-[#0B1F3A]/5"
            >
              <Minus size={16} />
            </motion.button>

            <span className="text-sm font-bold text-[#0B1F3A]">
              {quantity}
            </span>

            <motion.button
              type="button"
              whileTap={{
                scale: 0.85,
              }}
              onClick={increaseQuantity}
              className="flex h-9 w-9 items-center justify-center text-[#0B1F3A] transition-colors hover:bg-[#0B1F3A]/5"
            >
              <Plus size={16} />
            </motion.button>

          </div>

          {/* ADD TO CART */}

          <motion.button
            type="button"
            whileHover={{
              y: -3,
            }}
            whileTap={{
              scale: 0.98,
            }}
            className="group relative flex h-14 flex-1 items-center justify-center gap-3 overflow-hidden bg-[#0B1F3A] px-6 text-sm font-bold text-white shadow-[0_12px_30px_rgba(11,31,58,0.18)] transition-colors duration-300 hover:bg-[#F5A623]"
          >

            <span className="relative z-10">
              Add to Cart
            </span>

            <motion.span
              animate={{
                x: [0, 4, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative z-10"
            >
              <ArrowRight size={18} />
            </motion.span>

            <span className="absolute inset-0 -translate-x-full bg-white/10 transition-transform duration-700 group-hover:translate-x-full" />

          </motion.button>

        </div>

        {/* BUY NOW */}

        <motion.button
          type="button"
          whileHover={{
            y: -2,
          }}
          whileTap={{
            scale: 0.98,
          }}
          className="mt-3 flex h-13 w-full items-center justify-center gap-2 border border-[#0B1F3A] bg-white px-5 py-4 text-sm font-bold text-[#0B1F3A] transition-all hover:bg-[#F5A623] hover:border-[#F5A623] hover:text-white"
        >
          Buy Now
          <ArrowUpRight size={16} />
        </motion.button>

        {/* TRUST FEATURES */}

        <div className="mt-7 grid grid-cols-3 divide-x border border-neutral-200 bg-white py-4">

          <div className="px-3 text-center">

            <Package
              size={17}
              className="mx-auto text-[#F5A623]"
            />

            <p className="mt-2 text-[10px] font-bold uppercase tracking-wider text-[#0B1F3A]">
              Bulk Orders
            </p>

          </div>

          <div className="px-3 text-center">

            <Sparkles
              size={17}
              className="mx-auto text-[#F5A623]"
            />

            <p className="mt-2 text-[10px] font-bold uppercase tracking-wider text-[#0B1F3A]">
              Custom
            </p>

          </div>

          <div className="px-3 text-center">

            <Truck
              size={17}
              className="mx-auto text-[#F5A623]"
            />

            <p className="mt-2 text-[10px] font-bold uppercase tracking-wider text-[#0B1F3A]">
              Pan India
            </p>

          </div>

        </div>

      </div>
    </motion.div>

  </div>
</section>

      {/* =====================================================
          PRODUCT DETAILS
      ===================================================== */}

      <section className="relative z-10 border-y border-black/5 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">

            {/* LEFT */}

            <Reveal
              variants={fadeLeft}
              className="lg:col-span-7"
            >
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#F5A623]">
                Product Details
              </p>

              <h2 className="mt-3 max-w-2xl text-3xl font-bold leading-tight tracking-tight text-[#0B1F3A] sm:text-4xl">
                Reliable Protection for Fragile Products
              </h2>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-neutral-500 sm:text-base">
                Dpack Air Column Bags are designed to provide cushioning and
                protection for delicate products during shipping, storage and
                transportation. The air-filled structure absorbs impact while
                keeping the packaging lightweight and space efficient.
              </p>

              {/* DETAIL CARDS */}

              <div className="mt-8 grid gap-4 sm:grid-cols-2">

                <motion.div
                  whileHover={{
                    y: -5,
                  }}
                  className="group rounded-3xl border border-neutral-200 bg-[#f7f7f5] p-6 transition-shadow hover:shadow-xl"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F5A623] text-white">
                    <ShieldCheck size={20} />
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-[#0B1F3A]">
                    Impact Protection
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-neutral-500">
                    Helps protect products against shocks, movement and
                    handling impact.
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{
                    y: -5,
                  }}
                  className="group rounded-3xl border border-neutral-200 bg-[#f7f7f5] p-6 transition-shadow hover:shadow-xl"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0B1F3A] text-white">
                    <Package size={20} />
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-[#0B1F3A]">
                    Space Efficient
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-neutral-500">
                    Lightweight packaging design requires less storage space
                    before and after use.
                  </p>
                </motion.div>
              </div>

              {/* SPECS */}

              <div className="mt-9 overflow-hidden rounded-3xl border border-neutral-200">
                <div className="border-b border-neutral-200 bg-[#0B1F3A] px-5 py-4">
                  <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-white">
                    Product Specifications
                  </h3>
                </div>

                <div>
                  {specifications.map(([label, value], index) => (
                    <motion.div
                      key={label}
                      initial={{
                        opacity: 0,
                        x: -15,
                      }}
                      whileInView={{
                        opacity: 1,
                        x: 0,
                      }}
                      viewport={{
                        once: true,
                        amount: 0.4,
                      }}
                      transition={{
                        delay: index * 0.035,
                        duration: 0.4,
                      }}
                      className={`grid grid-cols-1 gap-1 px-5 py-4 sm:grid-cols-[190px_1fr] sm:gap-5 ${
                        index % 2 === 0
                          ? "bg-[#fafafa]"
                          : "bg-white"
                      }`}
                    >
                      <span className="text-xs font-bold uppercase tracking-wide text-neutral-400">
                        {label}
                      </span>

                      <span className="text-sm font-semibold text-[#0B1F3A]">
                        {value}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* RIGHT */}

            <Reveal
              variants={fadeRight}
              className="lg:col-span-5"
            >
              <div className="group relative overflow-hidden rounded-[30px] bg-[#0B1F3A] p-5 shadow-[0_25px_70px_rgba(11,31,58,0.16)] sm:p-7">

                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#F5A623]/25 blur-3xl" />

                <div className="relative overflow-hidden rounded-[24px] bg-white">
                  <motion.img
                    src="/Air column bag (2).webp"
                    alt="Dpack Protective Packaging"
                    whileHover={{
                      scale: 1.045,
                    }}
                    transition={{
                      duration: 0.8,
                      ease: "easeOut",
                    }}
                    className="h-[500px] w-full object-contain p-8"
                  />
                </div>

                <div className="relative mt-6">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#F5A623]">
                    Dpack Protective Packaging
                  </p>

                  <h3 className="mt-2 text-2xl font-bold leading-tight text-white">
                    Protect products from packing to delivery.
                  </h3>

                  <div className="mt-5 flex items-center gap-2 text-sm text-white/65">
                    <Check size={16} className="text-[#F5A623]" />
                    Reliable cushioning
                  </div>

                  <div className="mt-2 flex items-center gap-2 text-sm text-white/65">
                    <Check size={16} className="text-[#F5A623]" />
                    Lightweight structure
                  </div>

                  <div className="mt-2 flex items-center gap-2 text-sm text-white/65">
                    <Check size={16} className="text-[#F5A623]" />
                    Efficient storage
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* =====================================================
          HIGHLIGHT BANNER
      ===================================================== */}

      <section className="relative z-10 overflow-hidden bg-[#f7f7f5] px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <Reveal>
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[34px] bg-[#0B1F3A] px-6 py-10 shadow-[0_30px_80px_rgba(11,31,58,0.15)] sm:px-10 sm:py-12 lg:px-14">

            <motion.div
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute -right-20 -top-40 h-[450px] w-[450px] rounded-full border border-white/5"
            />

            <motion.div
              animate={{
                y: [0, -12, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute bottom-[-100px] left-[20%] h-[250px] w-[250px] rounded-full bg-[#F5A623]/10 blur-3xl"
            />

            <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_330px]">

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#F5A623]">
                  Dpack Packaging Solutions
                </p>

                <h2 className="mt-3 max-w-2xl text-3xl font-bold leading-tight text-white sm:text-4xl">
                  Better protection. Less space. Smarter packaging.
                </h2>

                <p className="mt-5 max-w-2xl text-sm leading-7 text-white/60 sm:text-base">
                  Designed for modern shipping and storage requirements, Dpack
                  protective packaging helps businesses improve product
                  protection while keeping packaging lightweight and efficient.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  {[
                    "IMPACT PROTECTION",
                    "LIGHTWEIGHT",
                    "SPACE EFFICIENT",
                  ].map((item) => (
                    <motion.div
                      key={item}
                      whileHover={{
                        y: -3,
                      }}
                      className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5"
                    >
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#F5A623] text-white">
                        <Check size={11} />
                      </span>

                      <span className="text-[10px] font-bold tracking-wider text-white/80">
                        {item}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.div
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative mx-auto w-full max-w-[310px]"
              >
                <div className="absolute inset-5 rounded-full bg-[#F5A623]/20 blur-3xl" />

                <div className="relative overflow-hidden rounded-full border-[10px] border-white/5 bg-white/5 p-4">
                  <img
                    src="/Air column bag (2).webp"
                    alt="Dpack Air Column Bag"
                    className="aspect-square w-full rounded-full bg-white object-contain p-8"
                  />
                </div>

                <div className="absolute -bottom-3 -left-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F5A623] text-white shadow-xl">
                  <ShieldCheck size={25} />
                </div>
              </motion.div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* =====================================================
          RELATED PRODUCTS
      ===================================================== */}

      <section className="relative z-10 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">

          <Reveal className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#F5A623]">
              Explore More
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0B1F3A] sm:text-4xl">
              Related Packaging Products
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-neutral-500">
              Explore more Dpack packaging solutions designed for protection,
              transportation and efficient product handling.
            </p>
          </Reveal>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.1,
            }}
            className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {relatedProducts.map((product) => (
              <motion.div
                key={product.name}
                variants={fadeUp}
                whileHover={{
                  y: -8,
                }}
                className="group overflow-hidden rounded-[26px] border border-neutral-200 bg-white transition-all duration-500 hover:border-[#F5A623]/30 hover:shadow-[0_20px_50px_rgba(11,31,58,0.1)]"
              >

                {/* IMAGE */}

                <div className="relative overflow-hidden bg-[#f7f7f5] p-5">

                  <div className="absolute left-4 top-4 z-10 rounded-full bg-white px-3 py-1 text-[9px] font-bold uppercase tracking-[0.15em] text-[#0B1F3A] shadow-sm">
                    Dpack
                  </div>

                  <motion.img
                    src={product.image}
                    alt={product.name}
                    whileHover={{
                      scale: 1.08,
                    }}
                    transition={{
                      duration: 0.6,
                    }}
                    className="h-56 w-full object-contain"
                  />

                  <motion.div
                    initial={{
                      opacity: 0,
                      scale: 0.8,
                    }}
                    whileHover={{
                      opacity: 1,
                      scale: 1,
                    }}
                    className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#F5A623] text-white shadow-lg"
                  >
                    <ArrowUpRight size={17} />
                  </motion.div>
                </div>

                {/* CONTENT */}

                <div className="p-5">

                  <div className="flex items-center justify-between">
                    <Stars size={11} />

                    <span className="text-[10px] font-bold text-neutral-400">
                      4.8 / 5
                    </span>
                  </div>

                  <h3 className="mt-4 text-lg font-bold text-[#0B1F3A] transition-colors group-hover:text-[#F5A623]">
                    {product.name}
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-neutral-500">
                    {product.category}
                  </p>

                  {/* INQUIRY */}

                  <button
                    type="button"
                    className="group/btn mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#F5A623] px-4 py-3.5 text-xs font-bold text-white transition-all hover:bg-[#0B1F3A]"
                  >
                   Add to Cart

                    <ArrowRight
                      size={14}
                      className="transition-transform duration-300 group-hover/btn:translate-x-1"
                    />
                  </button>

                  <button
                    type="button"
                    className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-[#0B1F3A]/10 px-4 py-3 text-xs font-bold text-[#0B1F3A] transition-all hover:border-[#F5A623] hover:text-[#F5A623]"
                  >
                    View Product
                    <ArrowUpRight size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          REVIEWS
      ===================================================== */}

      <section className="relative z-10 bg-[#f7f7f5]">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">

            {/* RATING */}

            <Reveal
              variants={fadeLeft}
              className="lg:col-span-4"
            >
              <div className="sticky top-28 rounded-[30px] border border-neutral-200 bg-white p-7 shadow-[0_15px_50px_rgba(11,31,58,0.06)]">

                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#F5A623]">
                  Customer Feedback
                </p>

                <h2 className="mt-3 text-3xl font-bold text-[#0B1F3A]">
                  Customer Reviews
                </h2>

                <div className="mt-7 flex items-end gap-3">
                  <span className="text-6xl font-bold tracking-tight text-[#0B1F3A]">
                    4.8
                  </span>

                  <div className="pb-2">
                    <Stars size={14} />

                    <p className="mt-1 text-xs text-neutral-500">
                      Based on customer feedback
                    </p>
                  </div>
                </div>

                {/* REVIEW BARS */}

                <div className="mt-8 space-y-4">
                  {[
                    ["5", "92%"],
                    ["4", "6%"],
                    ["3", "2%"],
                  ].map(([star, percentage]) => (
                    <div
                      key={star}
                      className="flex items-center gap-3"
                    >
                      <span className="w-4 text-xs font-bold text-neutral-500">
                        {star}
                      </span>

                      <Star
                        size={12}
                        className="fill-[#F5A623] text-[#F5A623]"
                      />

                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-neutral-100">
                        <motion.div
                          initial={{
                            width: 0,
                          }}
                          whileInView={{
                            width: percentage,
                          }}
                          viewport={{
                            once: true,
                          }}
                          transition={{
                            duration: 1,
                            ease: "easeOut",
                          }}
                          className="h-full rounded-full bg-[#F5A623]"
                        />
                      </div>

                      <span className="w-10 text-right text-xs font-bold text-neutral-500">
                        {percentage}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0B1F3A] px-5 py-4 text-sm font-bold text-white transition-all hover:bg-[#F5A623]"
                >
                  Share Your Experience
                  <ArrowUpRight size={16} />
                </button>
              </div>
            </Reveal>

            {/* REVIEWS */}

            <Reveal
              variants={fadeRight}
              className="lg:col-span-8"
            >
              <div className="space-y-5">

                {reviews.map((review, index) => (
                  <motion.div
                    key={review.name}
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
                      delay: index * 0.12,
                      duration: 0.6,
                    }}
                    whileHover={{
                      y: -4,
                    }}
                    className="relative overflow-hidden rounded-[28px] border border-neutral-200 bg-white p-6 shadow-[0_10px_35px_rgba(11,31,58,0.04)] sm:p-8"
                  >

                    <div className="absolute right-6 top-6 text-[#F5A623]/10">
                      <Quote size={50} />
                    </div>

                    <div className="relative">
                      <Stars size={14} />

                      <h3 className="mt-5 text-xl font-bold text-[#0B1F3A]">
                        “{review.review}”
                      </h3>

                      <p className="mt-3 max-w-2xl text-sm leading-7 text-neutral-500">
                        Dpack protective packaging offers a practical solution
                        for businesses looking for lightweight and reliable
                        product protection during transportation.
                      </p>

                      <div className="mt-6 flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0B1F3A] text-sm font-bold text-white">
                          {review.name.charAt(0)}
                        </div>

                        <div>
                          <p className="text-sm font-bold text-[#0B1F3A]">
                            {review.name}
                          </p>

                          <p className="mt-0.5 text-xs text-neutral-400">
                            {review.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* REVIEW CTA */}

                <motion.div
                  whileHover={{
                    y: -4,
                  }}
                  className="rounded-[28px] border border-dashed border-[#F5A623]/30 bg-[#F5A623]/5 p-7"
                >
                  <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

                    <div>
                      <p className="text-sm font-bold text-[#0B1F3A]">
                        Have you used this product?
                      </p>

                      <p className="mt-1 text-xs leading-5 text-neutral-500">
                        Share your experience with the Dpack team.
                      </p>
                    </div>

                    <button
                      type="button"
                      className="flex items-center justify-center gap-2 rounded-xl bg-[#F5A623] px-5 py-3 text-xs font-bold text-white transition-all hover:bg-[#0B1F3A]"
                    >
                      Write a Review
                      <ArrowUpRight size={14} />
                    </button>
                  </div>
                </motion.div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL INQUIRY CTA
      ===================================================== */}

      <section className="relative z-10 overflow-hidden bg-white px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <Reveal>
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[34px] bg-[#F5A623] px-6 py-10 sm:px-10 lg:px-14 lg:py-12">

            <motion.div
              animate={{
                scale: [1, 1.08, 1],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -right-24 -top-32 h-80 w-80 rounded-full bg-white/10 blur-3xl"
            />

            <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-center">

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/65">
                  Dpack Packaging Solutions
                </p>

                <h2 className="mt-3 max-w-2xl text-3xl font-bold leading-tight text-white sm:text-4xl">
                  Need more information about this product?
                </h2>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-white/70">
                  Send your product requirements and our team will help you
                  with suitable size, quantity and packaging details.
                </p>
              </div>

              <motion.button
                type="button"
                whileHover={{
                  scale: 1.03,
                  y: -3,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                className="group flex shrink-0 items-center justify-center gap-3 rounded-2xl bg-white px-7 py-4 text-sm font-bold text-[#0B1F3A] shadow-xl"
              >
                Shop Now 

                <motion.span
                  animate={{
                    x: [0, 5, 0],
                  }}
                  transition={{
                    duration: 1.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <ArrowRight size={18} />
                </motion.span>
              </motion.button>
            </div>
          </div>
        </Reveal>
      </section>

      {/* =====================================================
          IMAGE LIGHTBOX
      ===================================================== */}

      <AnimatePresence>
        {zoomOpen && (
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
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0B1F3A]/90 p-5 backdrop-blur-md"
            onClick={() => setZoomOpen(false)}
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.9,
              }}
              transition={{
                duration: 0.35,
              }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex max-h-[90vh] w-full max-w-5xl items-center justify-center overflow-hidden rounded-[30px] bg-white p-6 sm:p-10"
            >
              <button
                type="button"
                onClick={() => setZoomOpen(false)}
                className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-[#0B1F3A] text-white transition-colors hover:bg-[#F5A623]"
              >
                <span className="text-xl leading-none">
                  ×
                </span>
              </button>

              <img
                src={productImages[selectedImage]}
                alt="Air Column Bag for Electronics"
                className="max-h-[78vh] w-full object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}