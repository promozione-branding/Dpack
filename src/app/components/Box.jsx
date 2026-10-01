
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

const WORD = "DPACK";

const products = [
  {
    name: "Air Column Bag",
    src: "/Air column bag (2).webp",
    category: "AIR CUSHION PACKAGING",
    description:
      "Flexible air-column protection designed to cushion delicate products during shipping and handling.",
  },
  {
    name: "Dunnage Air Bag",
    src: "/Dunnage.webp",
    category: "CARGO PROTECTION",
    description:
      "Reliable void-filling protection designed to help stabilize cargo during transportation.",
  },
  {
    name: "Air Column Roll",
    src: "/Air Column Roll (2).webp",
    category: "FLEXIBLE PACKAGING",
    description:
      "Versatile air-column packaging material for creating protective cushioning around products.",
  },
  {
    name: "Packaging Air Bag",
    src: "/packing bag.webp",
    category: "PRODUCT PROTECTION",
    description:
      "Practical protective packaging solutions for safer handling, storage and delivery.",
  },
  {
    name: "Gap Filler",
    src: "/Gap filler (3).webp",
    category: "SMART PACKAGING",
    description:
      "Efficient void-filling solutions designed to minimize movement inside shipping cartons.",
  },
];

const letterVariants = {
  hidden: {
    opacity: 0,
    y: 100,
    rotateX: -90,
  },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: 0.25 + i * 0.12,
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function Main() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const product = products[activeIndex];

  const nextProduct = () => {
    setActiveIndex((prev) => (prev + 1) % products.length);
  };

  const prevProduct = () => {
    setActiveIndex(
      (prev) => (prev - 1 + products.length) % products.length
    );
  };

  useEffect(() => {
    if (paused) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % products.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [paused]);

  return (
    <section
      className="relative isolate h-[100svh] min-h-[650px] w-full overflow-hidden bg-[#f3f3f0] text-[#151719]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 -z-10">
        {/* Dark top panel */}
        <div className="absolute inset-x-0 top-0 h-[43%] bg-[#101820]" />

        {/* Soft light glow */}
        <div className="absolute right-[12%] top-[12%] h-[420px] w-[420px] rounded-full bg-[#b5c8d8]/10 blur-[120px]" />

        {/* Light bottom panel */}
        <div className="absolute inset-x-0 bottom-0 h-[61%] bg-gradient-to-b from-[#d9dcda] via-[#efefeb] to-[#f7f6f2]" />

        {/* Technical grid */}
        <div
          className="absolute inset-0 opacity-[0.055]"
          style={{
            backgroundImage:
              "linear-gradient(to right,#7b8790 1px,transparent 1px),linear-gradient(to bottom,#7b8790 1px,transparent 1px)",
            backgroundSize: "100px 100px",
          }}
        />

        {/* Atmospheric glow */}
        <div className="absolute bottom-[17%] left-[30%] h-[180px] w-[40%] rounded-full bg-white/70 blur-[90px]" />

        {/* Ground shadow */}
        <div className="absolute bottom-[13%] left-1/2 h-12 w-[48%] -translate-x-1/2 rounded-[100%] bg-black/20 blur-2xl sm:bottom-[10%]" />

        {/* Orbit line */}
        <div className="absolute left-[9%] top-[21%] h-[35%] w-[82%] rounded-[50%] border border-white/20" />
      </div>

      {/* HEADER LABEL */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute left-5 top-6 z-40 flex items-center gap-3 sm:left-10 sm:top-8 lg:left-16"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 sm:h-11 sm:w-11">
          <span className="h-3 w-3 rounded-full bg-[#D95026]" />
        </span>

        <div>
          <p className="text-sm font-bold tracking-[0.2em] text-white sm:text-base">
            DPACK
          </p>
          <p className="text-[8px] tracking-[0.22em] text-white/50 sm:text-[9px]">
            SMART PACKAGING SOLUTIONS
          </p>
        </div>
      </motion.div>

      {/* TOP RIGHT BUTTON */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute right-5 top-6 z-40 sm:right-10 sm:top-8 lg:right-16"
      >
        <Link
          href="/contact"
          className="group flex items-center gap-2 rounded-full border border-white/30 bg-white/10 py-1.5 pl-4 pr-1.5 text-[10px] font-medium text-white backdrop-blur-md transition-all hover:bg-white hover:text-black sm:gap-3 sm:py-2 sm:pl-5 sm:pr-2 sm:text-xs"
        >
          Let's Talk
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black transition-transform group-hover:rotate-45 sm:h-9 sm:w-9">
            <ArrowUpRight size={17} />
          </span>
        </Link>
      </motion.div>

      {/* MAIN HEADING: LETTER-BY-LETTER ANIMATION */}
      <div className="absolute left-0 right-0 top-[18%] z-10 flex justify-center overflow-hidden px-2 sm:top-[13%]">
        <motion.h1
          initial="hidden"
          animate="visible"
          className="flex select-none whitespace-nowrap font-black leading-none tracking-[-0.075em] text-[#f2f2ef]"
          style={{
            fontSize: "clamp(100px, 22vw, 300px)",
          }}
          aria-label="DPACK"
        >
          {WORD.split("").map((letter, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={letterVariants}
              className="inline-block"
              style={{
                textShadow: "0 10px 35px rgba(0,0,0,0.16)",
              }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.h1>
      </div>

      {/* PRODUCT SLIDE */}
      <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={product.src}
            initial={{
              opacity: 0,
              scale: 0.55,
              y: 120,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.8,
              y: -40,
            }}
            transition={{
              delay: 0.15,
              duration: 1.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {/* Product shadow */}
            <motion.div
              animate={{
                scale: [1, 0.9, 1],
                opacity: [0.22, 0.13, 0.22],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute bottom-[12%] left-1/2 h-10 w-[55%] -translate-x-1/2 rounded-[100%] bg-black/40 blur-2xl sm:bottom-[9%] sm:w-[38%]"
            />

            {/* Floating product */}
            <motion.div
              animate={{
                y: [0, -12, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative mt-[7%] h-[52vh] max-h-[540px] min-h-[280px] w-[90vw] max-w-[820px] sm:mt-[6%] sm:h-[65vh]"
            >
              <Image
                src={product.src}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 768px) 90vw, 820px"
                className="object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.22)]"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* LEFT CONTENT */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.3, duration: 0.9 }}
        className="absolute bottom-[9%] left-5 z-30 max-w-[230px] sm:bottom-[10%] sm:left-10 sm:max-w-[310px] lg:left-16 lg:max-w-[370px]"
      >
        <div className="mb-3 flex items-center gap-2 sm:mb-4">
          <span className="h-[2px] w-7 bg-[#D95026] sm:w-8" />
          <span className="text-[8px] font-semibold uppercase tracking-[0.22em] text-[#777] sm:text-[10px]">
            Engineered Protection
          </span>
        </div>

        <h2 className="text-[27px] font-semibold leading-[1.08] tracking-tight sm:text-4xl lg:text-5xl">
          Safer Products.
          <br />
          <span className="text-[#D95026]">Smarter Shipping.</span>
        </h2>

        <AnimatePresence mode="wait">
          <motion.p
            key={product.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="mt-3 max-w-[320px] text-[10px] leading-5 text-[#686b6d] sm:mt-4 sm:text-sm sm:leading-6"
          >
            {product.description}
          </motion.p>
        </AnimatePresence>

        <Link
          href="/products"
          className="group mt-4 inline-flex items-center gap-3 border-b border-[#111]/30 pb-2 text-[9px] font-bold uppercase tracking-[0.15em] transition-colors hover:border-[#D95026] sm:mt-6 sm:gap-4 sm:text-xs"
        >
          Explore Collection
          <ArrowUpRight
            size={17}
            className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
          />
        </Link>
      </motion.div>

      {/* RIGHT PRODUCT DETAILS */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-[10%] right-5 z-40 max-w-[145px] text-right sm:bottom-[11%] sm:right-10 sm:max-w-[220px] lg:right-16"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={product.name}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
          >
            <div className="mb-2 flex items-center justify-end gap-2 sm:mb-3">
              <Sparkles size={14} className="text-[#D95026]" />

              <span className="text-[7px] font-semibold uppercase tracking-[0.17em] text-[#777] sm:text-[10px] sm:tracking-[0.2em]">
                Featured Product
              </span>
            </div>

            <p className="text-[8px] uppercase tracking-[0.15em] text-[#888] sm:text-[10px]">
              {product.category}
            </p>

            <h3 className="mt-2 text-lg font-bold leading-tight tracking-tight sm:text-3xl">
              {product.name}
            </h3>

            <div className="mt-3 flex items-center justify-end gap-2 sm:mt-4">
              <button
                type="button"
                onClick={prevProduct}
                aria-label="Previous product"
                className="pointer-events-auto flex h-8 w-8 items-center justify-center rounded-full border border-black/20 transition hover:bg-black hover:text-white sm:h-9 sm:w-9"
              >
                <ChevronLeft size={17} />
              </button>

              <span className="min-w-[43px] text-center text-[10px] tracking-widest text-[#777]">
                {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(products.length).padStart(2, "0")}
              </span>

              <button
                type="button"
                onClick={nextProduct}
                aria-label="Next product"
                className="pointer-events-auto flex h-8 w-8 items-center justify-center rounded-full border border-black/20 transition hover:bg-black hover:text-white sm:h-9 sm:w-9"
              >
                <ChevronRight size={17} />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* PRODUCT THUMBNAILS */}
        <div className="pointer-events-auto mt-3 flex justify-end gap-1.5 sm:mt-5 sm:gap-2">
          {products.map((item, index) => (
            <button
              key={item.src}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Show ${item.name}`}
              aria-pressed={activeIndex === index}
              className={`relative h-8 w-8 overflow-hidden border bg-white/70 transition-all sm:h-10 sm:w-10 ${
                activeIndex === index
                  ? "border-[#D95026] ring-1 ring-[#D95026]/30"
                  : "border-black/10 opacity-65 hover:opacity-100"
              }`}
            >
              <Image
                src={item.src}
                alt={item.name}
                fill
                sizes="40px"
                className="object-contain p-0.5"
              />
            </button>
          ))}
        </div>
      </motion.div>

      {/* SUBTLE SLIDE PROGRESS */}
      <div className="absolute bottom-0 left-0 z-50 h-[3px] w-full bg-black/5">
        <motion.div
          key={activeIndex}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{
            duration: paused ? 0 : 5,
            ease: "linear",
          }}
          className="h-full bg-[#D95026]"
        />
      </div>
    </section>
  );
}