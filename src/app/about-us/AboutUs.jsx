"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  ArrowRight,
  ShieldCheck,
  Eye,
  PackageCheck,
  Plus,
} from "lucide-react";

/* ============================================================
   ANIMATION
============================================================ */

const ease = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease },
  },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -50 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease },
  },
};

const fadeRight = {
  hidden: { opacity: 0, x: 50 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease },
  },
};

const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

/* ============================================================
   REUSABLE BACKGROUND
============================================================ */

function DotPattern({ dark = false }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-60"
      style={{
        backgroundImage: dark
          ? "radial-gradient(rgba(255,255,255,0.12) 1px, transparent 1px)"
          : "radial-gradient(rgba(8,26,51,0.10) 1px, transparent 1px)",
        backgroundSize: "16px 16px",
      }}
    />
  );
}

/* ============================================================
   REUSABLE CORNER FRAME
============================================================ */

function CornerFrame({ children, className = "" }) {
  return (
    <div className={`relative ${className}`}>
      <div className="pointer-events-none absolute -left-2 -top-2 z-20 h-16 w-16 border-l-2 border-t-2 border-[#F5A623] sm:-left-5 sm:-top-5 sm:h-24 sm:w-24" />

      <div className="pointer-events-none absolute -bottom-2 -right-2 z-20 h-16 w-16 border-b-2 border-r-2 border-[#F5A623] sm:-bottom-5 sm:-right-5 sm:h-24 sm:w-24" />

      {children}
    </div>
  );
}

/* ============================================================
   REUSABLE SECTION LABEL
============================================================ */

function SectionLabel({ children, light = false }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-[3px] w-10 shrink-0 bg-[#F5A623]" />

      <span
        className={`text-[14px] font-black uppercase tracking-[0.3em] ${
          light ? "text-[#F5A623]" : "text-[#D98C00]"
        }`}
      >
        {children}
      </span>
    </div>
  );
}

/* ============================================================
   REUSABLE IMAGE FRAME
============================================================ */

function FramedImage({
  src,
  alt,
  heightClass = "h-[340px] sm:h-[520px] lg:h-[580px]",
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
  children,
}) {
  return (
    <CornerFrame>
      <div className="overflow-hidden bg-[#081A33] p-1.5 sm:p-2">
        <div
          className={`relative w-full overflow-hidden ${heightClass}`}
        >
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes={sizes}
            className="object-cover"
          />

          {children}
        </div>
      </div>
    </CornerFrame>
  );
}

/* ============================================================
   MAIN ABOUT US
============================================================ */

export default function AboutUs() {
  const shouldReduceMotion = useReducedMotion();

  const products = [
    {
      number: "01",
      name: "Air Column Packaging",
      image: "/Air column bag (2).webp",
      href: "/products-cate/air-column-bags",
    },
    {
      number: "02",
      name: "Dunnage Packaging",
      image: "/Dannage.webp",
      href: "/products-categories/dunnage-bags",
    },
    {
      number: "03",
      name: "Packaging Air Bags",
      image: "/packing bag.webp",
      href: "/products/packaging-air-bags",
    },
    {
      number: "04",
      name: "Gap Fillers",
      image: "/Gap filler (3).webp",
      href: "/products/gap-fillers",
    },
    {
      number: "05",
      name: "Air Column Rolls",
      image: "/Air Column Roll (2).webp",
      href: "/products/air-column-rolls",
    },
  ];

  const revealProps = {
    initial: shouldReduceMotion ? false : "hidden",
    whileInView: "show",
    viewport: { once: true, amount: 0.15 },
  };

  const imageTransition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.8, ease };

  return (
    <main className="min-h-screen overflow-hidden bg-[#F7F7F5] text-[#081A33]">

      {/* ======================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden bg-[#F7F7F5] px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
        <DotPattern />

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={imageTransition}
          aria-hidden="true"
          className="pointer-events-none absolute -left-4 top-0 select-none text-[25vw] font-black leading-none tracking-[-0.09em] text-[#081A33]/[0.045] sm:text-[21vw]"
        >
          DPACK
        </motion.div>

        <div className="pointer-events-none absolute right-[7%] top-0 hidden h-full w-px bg-[#081A33]/[0.06] lg:block" />

        <div className="relative z-10 mx-auto max-w-[1450px]">
          <div className="grid items-center gap-12 lg:min-h-[calc(100svh-160px)] lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">

            {/* HERO CONTENT */}

            <motion.div
              initial={shouldReduceMotion ? false : "hidden"}
              animate="show"
              variants={stagger}
              className="relative z-10 min-w-0"
            >
              <motion.div variants={fadeUp} className="mb-6">
                <SectionLabel>About DPack</SectionLabel>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="max-w-2xl text-[35px] font-black leading-[0.98] tracking-[-0.05em] sm:text-[60px] sm:leading-[0.89] lg:text-[76px]"
              >
                Packaging
                <span className="block text-[#F5A623]">
                  that protects.
                </span>
                <span className="mt-2 block sm:mt-3">
                  Products that
                </span>
                <span className="block text-[#98A1AA]">
                  move forward.
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-6 max-w-xl text-[15px] leading-7 text-[#5E6873] sm:mt-8 sm:text-base"
              >
                DPack creates practical packaging solutions designed to
                protect products, simplify packing and support safer
                movement through every stage of the supply chain.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="mt-7 flex flex-wrap items-center gap-4 sm:mt-8"
              >
                <span className="h-px w-12 bg-[#081A33]" />

                <span className="text-[14px] font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em]">
                  Protect • Pack • Move
                </span>
              </motion.div>
            </motion.div>

            {/* HERO IMAGE */}

            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96, x: 40 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.9,
                delay: shouldReduceMotion ? 0 : 0.1,
                ease,
              }}
              className="relative mx-2 mb-5 min-w-0 sm:mx-3 sm:mb-6 lg:mx-0"
            >
              <FramedImage
                src="/product/5 (11).webp"
                alt="DPack Dunnage Air Bags"
                priority
                sizes="(max-width: 568px)"
                heightClass="h-[370px] sm:h-[570px] lg:h-[650px]"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#081A33]/90 via-[#081A33]/10 to-transparent" />

                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3 sm:bottom-7 sm:left-7 sm:right-7">
                  <div className="min-w-0">
                

                
                  </div>

                  <PackageCheck
                    size={36}
                    strokeWidth={1.3}
                    className="shrink-0 text-[#F5A623] sm:h-[42px] sm:w-[42px]"
                  />
                </div>
              </FramedImage>

              <motion.div
                animate={shouldReduceMotion ? {} : { y: [0, -8, 0] }}
                transition={{
                  duration: 5,
                  repeat: shouldReduceMotion ? 0 : Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -bottom-5 -left-2 z-30 bg-[#F5A623] px-4 py-4 shadow-2xl sm:-bottom-6 sm:-left-8 sm:px-6 sm:py-5"
              >
                <p className="text-2xl font-black leading-none text-[#081A33] sm:text-3xl">
                  100%
                </p>

                <p className="mt-1 text-[8px] font-black uppercase tracking-[0.15em] text-[#081A33]/65 sm:tracking-[0.2em]">
                  Protection Focused
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ======================================================
          ABOUT STORY
      ====================================================== */}

      <section className="relative overflow-hidden bg-white px-5 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-15">
        <DotPattern />

        <div className="relative z-10 mx-auto max-w-[1400px]">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.95fr] lg:gap-20">

            {/* STORY IMAGE */}

            <motion.div
              {...revealProps}
              variants={fadeLeft}
              className="relative mx-2 min-w-0 sm:mx-3 lg:mx-0"
            >
              <FramedImage
                src="/dunnage.webp"
                alt="DPack Air Column Packaging"
                heightClass="h-[320px] sm:h-[520px] lg:h-[550px]"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#081A33]/85 via-transparent to-transparent" />

                <div className="absolute bottom-5 left-5 sm:bottom-7 sm:left-7">
                  <p className="text-4xl font-black text-white sm:text-5xl">
                    DPACK
                  </p>

                  <p className="mt-1 text-[14px] font-bold uppercase tracking-[0.2em] text-white/60 sm:tracking-[0.3em]">
                    Protective Packaging
                  </p>
                </div>
              </FramedImage>
            </motion.div>

            {/* STORY CONTENT */}

            <motion.div
              {...revealProps}
              variants={fadeRight}
              className="min-w-0"
            >
              <SectionLabel>Who We Are</SectionLabel>

              <h2 className="mt-6 text-[35px] font-black leading-[0.98] tracking-[-0.05em] sm:text-6xl sm:leading-[0.9] lg:text-7xl">
                About
                <span className="block text-[#F5A623]">
                  DPack.
                </span>
              </h2>

              <div className="mt-7 max-w-xl space-y-5 text-[15px] leading-7 text-[#65707B] sm:mt-8 sm:text-base">
                <p>
                  DPack is focused on providing dependable packaging
                  solutions for businesses that need to protect products
                  during handling, storage and transportation.
                </p>

                <p>
                  Our product range includes protective air packaging,
                  dunnage solutions, packaging bags, gap fillers and
                  other practical packaging products.
                </p>

                <p>
                  We believe packaging should not only protect a product,
                  but should also make the packing process easier,
                  faster and more efficient.
                </p>
              </div>

              {/* STATS */}

              <div className="mt-8 grid grid-cols-3 border-y border-[#081A33]/15 sm:mt-10">
                <div className="min-w-0 py-5 sm:py-6">
                  <p className="text-2xl font-black text-[#081A33] sm:text-4xl">
                    01
                  </p>

                  <p className="mt-2 text-[8px] font-black uppercase tracking-[0.1em] text-[#8A939B] sm:text-[14px] sm:tracking-[0.18em]">
                    Protection
                  </p>
                </div>

                <div className="min-w-0 border-x border-[#081A33]/15 px-3 py-5 sm:px-4 sm:py-6">
                  <p className="text-2xl font-black text-[#081A33] sm:text-4xl">
                    05+
                  </p>

                  <p className="mt-2 text-[8px] font-black uppercase tracking-[0.1em] text-[#8A939B] sm:text-[14px] sm:tracking-[0.18em]">
                    Solutions
                  </p>
                </div>

                <div className="min-w-0 px-3 py-5 sm:py-6">
                  <p className="text-2xl font-black text-[#081A33] sm:text-4xl">
                    PAN
                  </p>

                  <p className="mt-2 text-[8px] font-black uppercase tracking-[0.1em] text-[#8A939B] sm:text-[14px] sm:tracking-[0.18em]">
                    Reach
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-3 sm:mt-7 sm:gap-4">
                <span className="h-px w-8 shrink-0 bg-[#081A33]/30 sm:w-12" />

                <p className="text-[14px] font-black uppercase tracking-[0.12em] text-[#8A939B] sm:tracking-[0.25em]">
                  Packaging • Protection • Performance
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ======================================================
          MISSION + VISION
      ====================================================== */}

      <section className="relative overflow-hidden bg-[#081A33] px-5 py-10 text-white sm:px-8 sm:py-12 lg:px-12 lg:py-15">
        <DotPattern dark />

        <div className="pointer-events-none absolute -right-40 bottom-[-250px] h-[600px] w-[600px] rounded-full border border-[#F5A623]/25" />

        <div className="pointer-events-none absolute -right-20 bottom-[-190px] h-[480px] w-[480px] rounded-full border border-[#F5A623]/15" />

        <div className="relative z-10 mx-auto max-w-[1400px]">
          <motion.div
            {...revealProps}
            variants={fadeUp}
          >
            <SectionLabel light>What Drives Us</SectionLabel>

            <h2 className="mt-6 max-w-4xl text-[35px] font-black leading-[0.98] tracking-[-0.05em] sm:text-6xl sm:leading-[0.9] lg:text-7xl">
              Built around better
              <span className="block text-[#F5A623]">
                packaging.
              </span>
            </h2>
          </motion.div>

          <div className="mt-10 grid gap-5 sm:mt-14 lg:grid-cols-2">

            {/* MISSION */}

            <motion.div
              {...revealProps}
              variants={fadeLeft}
              className="relative overflow-hidden bg-[#F5A623] p-6 text-[#081A33] sm:p-10 lg:p-14"
            >
              <div className="absolute right-5 top-5 opacity-20 sm:right-8 sm:top-8">
                <ShieldCheck
                  size={46}
                  strokeWidth={1.2}
                  className="sm:h-[58px] sm:w-[58px]"
                />
              </div>

              <p className="text-[14px] font-black uppercase tracking-[0.3em]">
                01 / Mission
              </p>

              <h3 className="mt-8 max-w-md text-[35px] font-black leading-[0.98] sm:text-5xl sm:leading-[0.92]">
                Make protection
                <span className="block opacity-45">
                  simple.
                </span>
              </h3>

              <p className="mt-6 max-w-lg text-[15px] leading-7 text-[#081A33]/70 sm:mt-7 sm:text-base">
                Our mission is to provide practical packaging solutions
                that help businesses protect their products while making
                packing, handling and transportation more efficient.
              </p>
            </motion.div>

            {/* VISION */}

            <motion.div
              {...revealProps}
              variants={fadeRight}
              className="relative overflow-hidden bg-white p-6 text-[#081A33] sm:p-10 lg:p-14"
            >
              <div className="absolute right-5 top-5 text-[#081A33]/10 sm:right-8 sm:top-8">
                <Eye
                  size={46}
                  strokeWidth={1.2}
                  className="sm:h-[58px] sm:w-[58px]"
                />
              </div>

              <p className="text-[14px] font-black uppercase tracking-[0.3em] text-[#89929A]">
                02 / Vision
              </p>

              <h3 className="mt-8 max-w-md text-[35px] font-black leading-[0.98] sm:text-5xl sm:leading-[0.92]">
                A smarter way
                <span className="block text-[#8D969E]">
                  to move products.
                </span>
              </h3>

              <p className="mt-6 max-w-lg text-[15px] leading-7 text-[#68737E] sm:mt-7 sm:text-base">
                We aim to build a trusted packaging brand known for
                dependable products, practical innovation and solutions
                designed around the evolving needs of modern businesses.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ======================================================
          PRODUCT FOCUS
      ====================================================== */}

      <section className="relative overflow-hidden bg-[#F7F7F5] px-5 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-15">
        <DotPattern />

        <div className="relative z-10 mx-auto max-w-[1400px]">
          <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">

            {/* PRODUCT IMAGE */}

            <motion.div
              {...revealProps}
              variants={fadeLeft}
              className="relative mx-2 min-w-0 sm:mx-3 lg:mx-0"
            >
              <FramedImage
                src="/product/23.webp"
                alt="DPack Air Column Roll"
                heightClass="h-[370px] sm:h-[520px] lg:h-[550px]"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#081A33]/90 via-transparent to-transparent" />

                <div className="absolute bottom-5 left-5 right-4 sm:bottom-7 sm:left-7">
                  <p className="text-[14px] font-black uppercase tracking-[0.3em] text-[#F5A623]">
                    Product Focus
                  </p>

                  <h3 className="mt-2 text-[26px] font-black leading-tight text-white sm:text-4xl">
                    Protective Packaging
                  </h3>
                </div>
              </FramedImage>
            </motion.div>

            {/* PRODUCT CONTENT */}

            <motion.div
              {...revealProps}
              variants={fadeRight}
              className="min-w-0"
            >
              <SectionLabel>What We Offer</SectionLabel>

              <h2 className="mt-6 text-[35px] font-black leading-[0.98] tracking-[-0.05em] sm:text-6xl sm:leading-[0.9]">
                Solutions for
                <span className="block text-[#8E979F]">
                  every stage
                </span>
                <span className="block text-[#F5A623]">
                  of movement.
                </span>
              </h2>

              <p className="mt-6 max-w-xl text-[15px] leading-7 text-[#66717C] sm:mt-7 sm:text-base">
                From cushioning fragile products to filling empty spaces
                and securing loads during transportation, DPack offers
                packaging solutions designed around real-world shipping
                requirements.
              </p>

              {/* PRODUCT LIST */}

              <div className="mt-7 border-t border-[#081A33]/15 sm:mt-9">
                {products.map((product, index) => (
                  <Link
                    href={product.href}
                    key={product.name}
                    className="group block"
                  >
                    <motion.div
                      initial={shouldReduceMotion ? false : { opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.1 }}
                      transition={{
                        duration: shouldReduceMotion ? 0 : 0.5,
                        delay: shouldReduceMotion ? 0 : index * 0.07,
                      }}
                      className="flex min-h-[60px] items-center justify-between gap-3 border-b border-[#081A33]/15 py-4 transition-colors duration-300 hover:bg-[#081A33]/[0.025] sm:gap-4"
                    >
                      <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                        <span className="shrink-0 text-[14px] font-black text-[#F5A623]">
                          {product.number}
                        </span>

                        <span className="text-[13px] font-bold leading-5 text-[#081A33] sm:text-base">
                          {product.name}
                        </span>
                      </div>

                      <div className="flex shrink-0 items-center gap-2 sm:gap-4">
                        <div className="hidden h-9 w-9 overflow-hidden opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:block">
                          <Image
                            src={product.image}
                            alt={product.name}
                            width={36}
                            height={36}
                            sizes="36px"
                            className="h-full w-full object-cover"
                          />
                        </div>

                        <ArrowRight
                          size={17}
                          className="text-[#081A33]/50 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#F5A623]"
                        />
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>

              <Link
                href="/products"
                className="group mt-7 inline-flex min-h-[50px] items-center justify-center gap-3 bg-[#081A33] px-5 py-4 text-center text-[14px] font-black uppercase tracking-[0.15em] text-white transition-colors duration-300 hover:bg-[#F5A623] hover:text-[#081A33] sm:mt-8 sm:px-6 sm:tracking-[0.2em]"
              >
                Explore All Products

                <ArrowUpRight
                  size={15}
                  className="shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ======================================================
          FINAL BRAND STRIP
      ====================================================== */}

      <section className="relative overflow-hidden bg-[#081A33] px-5 py-10 sm:px-8 sm:py-14 lg:px-12">
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "radial-gradient(rgba(245,166,35,0.25) 1px, transparent 1px)",
              backgroundSize: "18px 18px",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="text-[14px] font-black uppercase tracking-[0.3em] text-[#F5A623]">
              DPack
            </p>

            <h3 className="mt-2 text-[30px] font-black tracking-tight text-white sm:text-4xl">
              Protect. Pack. Move.
            </h3>
          </div>

          <Link
            href="/contact-us"
            className="group inline-flex min-h-[50px] items-center justify-center gap-3 border border-white/20 px-6 py-4 text-[14px] font-black uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:border-[#F5A623] hover:bg-[#F5A623] hover:text-[#081A33]"
          >
            Talk To Us

            <ArrowUpRight
              size={16}
              className="shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Link>
        </div>
      </section>


      
{/* ======================================================
    FREQUENTLY ASKED QUESTIONS
====================================================== */}

<section className="relative overflow-hidden bg-white px-5 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-15">
  <DotPattern />

  <div className="relative z-10 mx-auto max-w-[1200px]">
    <motion.div
      {...revealProps}
      variants={fadeUp}
      className="mx-auto max-w-3xl text-center"
    >
      <div className="flex justify-center">
        <SectionLabel>FAQs</SectionLabel>
      </div>

      <h2 className="mt-6 text-[35px] font-black leading-[1.02] tracking-[-0.05em] sm:text-5xl lg:text-6xl">
        Questions about
        <span className="block text-[#F5A623]">
          DPack packaging?
        </span>
      </h2>

      <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#65707B] sm:text-base">
        Find answers to common questions about our protective
        packaging products, bulk orders and business enquiries.
      </p>
    </motion.div>

    <div className="mx-auto mt-10 max-w-4xl border-t border-[#081A33]/15 sm:mt-14">
      {[
        {
          question: "What packaging products does DPack offer?",
          answer:
            "DPack offers protective packaging solutions including Dunnage Air Bags, Air Column Bags, Packaging Air Bags, Gap Fillers and Air Column Rolls for product protection during storage and transportation.",
        },
        {
          question: "What are Dunnage Air Bags used for?",
          answer:
            "Dunnage Air Bags help fill empty spaces between cargo loads during transportation. They help stabilize goods and reduce movement that may cause damage in transit.",
        },
        {
          question: "Can I place a bulk order?",
          answer:
            "Yes, you can contact our team for bulk orders. Share your required product, quantity and packaging specifications so our team can discuss your requirements.",
        },
        {
          question: "Can I request customized packaging solutions?",
          answer:
            "You can share your product dimensions, packaging requirements and intended application with our team. We can review your requirements and discuss suitable packaging options.",
        },
        {
          question: "How can I get product pricing?",
          answer:
            "For pricing, contact our team with the product name, required quantity and delivery location. Pricing can depend on product specifications and order volume.",
        },
        {
          question: "How do I contact DPack for an enquiry?",
          answer:
            "You can visit our Contact Us page or submit an enquiry with your product requirements. Our team can then follow up to discuss the next steps.",
        },
      ].map((faq, index) => (
        <details
          key={faq.question}
          className="group border-b border-[#081A33]/15"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 sm:py-6 [&::-webkit-details-marker]:hidden">
            <span className="flex min-w-0 items-start gap-4">
              <span className="mt-1 shrink-0 text-xs font-black text-[#D98C00]">
                {String(index + 1).padStart(2, "0")}
              </span>

              <span className="text-sm font-bold leading-6 text-[#081A33] transition-colors group-open:text-[#B87800] sm:text-base">
                {faq.question}
              </span>
            </span>

            <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-[#081A33]/15 transition-all duration-300 group-open:rotate-45 group-open:border-[#F5A623] group-open:bg-[#F5A623]">
              <Plus
                size={18}
                className="text-[#081A33]"
              />
            </span>
          </summary>

          <div className="pb-6 pl-8 pr-2 sm:pl-10 sm:pr-12">
            <p className="max-w-3xl text-sm leading-7 text-[#65707B]">
              {faq.answer}
            </p>
          </div>
        </details>
      ))}
    </div>
  </div>
</section>

    </main>
  );
}
