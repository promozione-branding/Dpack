"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Truck,
  Package,
  Leaf,
  Sparkles,
  Play,
} from "lucide-react";

/* =========================================================
   PRODUCTS
========================================================= */

const products = [
  {
    id: 1,
    name: "Air Column Bags",
    category: "Protective Packaging",
    description:
      "Shockproof, safe and reliable protection for your valuable products.",
    image: "/Air column bag (2).webp",
    href: "/products/air-column-bags",
    accent: "#F5A623",
    icon: Sparkles,
  },
  {
    id: 2,
    name: "Dunnage Air Bags",
    category: "Cargo Safety",
    description:
      "Strong support for heavy loads and safer transportation during transit.",
    image: "/Dannage.webp",
    href: "/products/dunnage-air-bags",
    accent: "#F5A623",
    icon: ShieldCheck,
  },
  {
    id: 3,
    name: "Air Column Rolls",
    category: "Flexible Protection",
    description:
      "Flexible protection for every shipment, product and packaging requirement.",
    image: "/Air Column Roll (2).webp",
    href: "/products/air-column-rolls",
    accent: "#2F7180",
    icon: Sparkles,
  },
  {
    id: 4,
    name: "Gap Fillers",
    category: "Smart Protection",
    description:
      "Keep your products stable, secure and protected during transportation.",
    image: "/Gap filler (3).webp",
    href: "/products/gap-fillers",
    accent: "#F5A623",
    icon: Package,
  },
  {
    id: 5,
    name: "Packaging Air Bags",
    category: "Product Protection",
    description:
      "Durable, versatile and secure packaging solutions for all your needs.",
    image: "/packing bag.webp",
    href: "/products/packaging-air-bags",
    accent: "#F5A623",
    icon: ShieldCheck,
  },
];

/* =========================================================
   ANIMATION
========================================================= */

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  show: {
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
    x: -35,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const fadeRight = {
  hidden: {
    opacity: 0,
    x: 35,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/* =========================================================
   MAIN
========================================================= */

export default function ProductEditorial() {
  return (
    <section className="relative w-full overflow-hidden bg-[#F5F6F7]">

      {/* =====================================================
          BACKGROUND GRID
      ===================================================== */}

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.38]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(8,26,51,.055) 1px, transparent 1px), linear-gradient(90deg, rgba(8,26,51,.055) 1px, transparent 1px)",
          backgroundSize: "46px 46px",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1450px] px-4 py-6 sm:px-6 md:px-8 lg:px-10">

        {/* ===================================================
            TOP HEADER
        =================================================== */}

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          className="relative mb-8 flex items-center gap-5 overflow-hidden md:mb-12"
        >

          {/* Logo */}

          <Link
            href="/"
            className="group flex shrink-0 items-center"
          >
            <div className="relative h-[55px] w-[150px] sm:h-[65px] sm:w-[180px]">
              <Image
                src="/logo (21).webp"
                alt="D Pack"
                fill
                priority
                className="object-contain object-left"
              />
            </div>
          </Link>

          {/* Horizontal line */}

          <div className="hidden h-px flex-1 bg-[#123B5D]/30 sm:block" />

          {/* Orange / Navy block */}

          <div className="hidden h-[48px] w-[230px] overflow-hidden sm:flex">
            <div className="h-full w-[45%] bg-[#123B5D]" />
            <div className="relative h-full flex-1 bg-[#F5A623]">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20" />
            </div>
          </div>

          {/* Heading */}

          <h1 className="ml-auto text-right text-[38px] font-medium leading-[0.9] tracking-[-0.06em] text-[#123B5D] sm:text-[52px] md:text-[65px] lg:text-[76px]">
            Our
            <br className="sm:hidden" /> Products
          </h1>

        </motion.div>

        {/* ===================================================
            PRODUCT 1 + PRODUCT 2
        =================================================== */}

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">

          <ProductBlock
            product={products[0]}
            imageLeft
            variants={fadeLeft}
          />

          <ProductBlock
            product={products[1]}
            imageLeft
            variants={fadeRight}
            playButton
          />

        </div>

        {/* ===================================================
            PRODUCT 3 + PRODUCT 4
        =================================================== */}

        <div className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-2">

          <ProductBlock
            product={products[2]}
            imageLeft
            variants={fadeLeft}
          />

          <ProductBlock
            product={products[3]}
            imageLeft
            variants={fadeRight}
          />

        </div>

        {/* ===================================================
            PRODUCT 5 + SMART PACKAGING
        =================================================== */}

        <div className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-2">

          <ProductBlock
            product={products[4]}
            imageLeft
            variants={fadeLeft}
          />

          <SmartPackaging
            variants={fadeRight}
          />

        </div>

      </div>
    </section>
  );
}

/* =========================================================
   PRODUCT BLOCK
========================================================= */

function ProductBlock({
  product,
  variants,
  playButton = false,
}) {
  const Icon = product.icon;

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{
        once: true,
        amount: 0.15,
      }}
      className="group relative overflow-hidden border border-[#123B5D]/20 bg-white"
    >

      {/* ===================================================
          PRODUCT GRID
      =================================================== */}

      <div className="grid min-h-[310px] grid-cols-1 sm:min-h-[340px] sm:grid-cols-[1.05fr_1fr]">

        {/* =================================================
            IMAGE
        ================================================= */}

        <Link
          href={product.href}
          className="relative min-h-[240px] overflow-hidden bg-[#F1F3F4] sm:min-h-full"
        >

          {/* Image background */}

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,.95),rgba(235,238,240,.8))]" />

          {/* Grid */}

          <div
            className="absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(8,26,51,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(8,26,51,.08) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />

          {/* Product image */}

          <motion.div
            initial={{
              scale: 0.92,
              opacity: 0.85,
            }}
            whileInView={{
              scale: 1,
              opacity: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute inset-4 sm:inset-5"
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain transition-transform duration-700 ease-out group-hover:scale-[1.06]"
            />
          </motion.div>

          {/* Hover overlay */}

          <div className="absolute inset-0 bg-[#123B5D]/0 transition-all duration-500 group-hover:bg-[#123B5D]/[0.025]" />

          {/* Decorative icon */}

          <div
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center sm:right-5 sm:top-5"
            style={{
              color: product.accent,
            }}
          >
            <Icon
              size={30}
              strokeWidth={1.5}
              className="transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110"
            />
          </div>

        </Link>

        {/* =================================================
            CONTENT
        ================================================= */}

        <div
          className="relative flex flex-col justify-between border-t border-[#123B5D]/10 p-6 sm:border-l sm:border-t-0 sm:p-7 lg:p-8"
          style={{
            backgroundImage:
              "linear-gradient(rgba(8,26,51,.045) 1px, transparent 1px), linear-gradient(90deg, rgba(8,26,51,.045) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        >

          {/* Decorative top */}

          <div>

            <div className="mb-5 flex items-center gap-3">

              <span
                className="h-[3px] w-9"
                style={{
                  backgroundColor: product.accent,
                }}
              />

              <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#123B5D]/65">
                {product.category}
              </span>

            </div>

            {/* Title */}

            <Link href={product.href}>

              <h2 className="max-w-[340px] text-[28px] font-medium leading-[0.95] tracking-[-0.045em] text-[#123B5D] transition-colors duration-300 group-hover:text-[#0B2942] sm:text-[31px] lg:text-[34px]">
                {product.name}
              </h2>

            </Link>

            {/* Description */}

            <p className="mt-5 max-w-[285px] text-[12px] leading-[1.7] text-[#123B5D]/65 sm:text-[13px]">
              {product.description}
            </p>

          </div>

          {/* =================================================
              BOTTOM ACTION
          ================================================= */}

          <div className="mt-8 flex items-center gap-4">

            <Link
              href={product.href}
              className="group/arrow flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E9EDF0] text-[#123B5D] transition-all duration-300 hover:bg-[#F5A623] hover:text-[#123B5D]"
            >
              <ArrowRight
                size={19}
                className="transition-transform duration-300 group-hover/arrow:translate-x-1"
              />
            </Link>

            <Link
              href={product.href}
              className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#123B5D] transition-all duration-300 hover:tracking-[0.3em]"
            >
              View Details
            </Link>

          </div>

          {/* Play button */}

          {playButton && (
            <div className="absolute right-7 top-7 flex items-center">

              <div className="h-14 w-14 rounded-full border border-[#123B5D]/50" />

              <div className="-ml-7 flex h-14 w-14 items-center justify-center rounded-full bg-[#123B5D] text-white shadow-lg">
                <Play
                  size={17}
                  fill="currentColor"
                  className="ml-0.5"
                />
              </div>

            </div>
          )}

          {/* Corner star */}

          <span
            className="absolute bottom-5 right-6 text-[27px] font-light leading-none"
            style={{
              color: product.accent,
            }}
          >
            *
          </span>

        </div>

      </div>

      {/* Hover border */}

      <div className="pointer-events-none absolute inset-0 border border-transparent transition-all duration-500 group-hover:border-[#123B5D]/35" />

    </motion.div>
  );
}

/* =========================================================
   SMART PACKAGING
========================================================= */

function SmartPackaging({ variants }) {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{
        once: true,
        amount: 0.15,
      }}
      className="relative min-h-[310px] overflow-hidden border border-[#123B5D]/20 bg-[#EEF3F4] sm:min-h-[340px]"
    >

      {/* Background */}

      <div className="absolute inset-0 bg-gradient-to-br from-[#F7FAFA] via-[#EEF4F5] to-[#E5EEF0]" />

      {/* Decorative circle */}

      <motion.div
        animate={{
          scale: [1, 1.06, 1],
          rotate: [0, 4, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -right-[16%] -top-[40%] h-[85%] w-[65%] rounded-full border border-[#123B5D]/15 bg-white/30"
      />

      <div className="absolute -right-[8%] -top-[25%] h-[60%] w-[48%] rounded-full border border-[#123B5D]/15" />

      {/* Small orange line */}

      <div className="absolute left-7 top-7 h-[3px] w-10 bg-[#F5A623]" />

      {/* Content */}

      <div className="relative z-10 flex h-full flex-col justify-between p-7 sm:p-8 lg:p-10">

        <div>

          <h2 className="max-w-[500px] text-[30px] font-medium leading-[0.98] tracking-[-0.045em] text-[#123B5D] sm:text-[36px] lg:text-[40px]">
            Smart Packaging
            <br />
            for a Safer Tomorrow
          </h2>

        </div>

        {/* Features */}

        <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-7 sm:grid-cols-4">

          <Feature
            icon={<ShieldCheck size={21} strokeWidth={1.7} />}
            title="Safe"
            subtitle="Products"
          />

          <Feature
            icon={<Truck size={21} strokeWidth={1.7} />}
            title="Reliable"
            subtitle="Delivery"
          />

          <Feature
            icon={<Package size={21} strokeWidth={1.7} />}
            title="Strong"
            subtitle="Packaging"
          />

          <Feature
            icon={<Leaf size={21} strokeWidth={1.7} />}
            title="Sustainable"
            subtitle="Solutions"
          />

        </div>

      </div>

      {/* Large decorative arc */}

      <div className="pointer-events-none absolute bottom-[-45%] right-[-10%] h-[300px] w-[300px] rounded-full border border-[#123B5D]/15" />

      <div className="pointer-events-none absolute bottom-[-32%] right-[2%] h-[220px] w-[220px] rounded-full border border-[#123B5D]/10" />

    </motion.div>
  );
}

/* =========================================================
   FEATURE
========================================================= */

function Feature({ icon, title, subtitle }) {
  return (
    <div className="flex items-center gap-3 border-r border-[#123B5D]/20 last:border-r-0">

      <div className="text-[#123B5D]">
        {icon}
      </div>

      <div>
        <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-[#123B5D]">
          {title}
        </p>

        <p className="mt-1 text-[8px] uppercase tracking-[0.12em] text-[#123B5D]/55">
          {subtitle}
        </p>
      </div>

    </div>
  );
}