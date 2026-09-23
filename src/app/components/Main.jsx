"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  ShieldCheck,
  PackageCheck,
  Truck,
} from "lucide-react";

/* ============================================================
   THEME
============================================================ */

const ORANGE = "#D95026";
const NAVY = "#102033";

/* ============================================================
   HERO SLIDES
============================================================ */

const slides = [
  {
    eyebrow: "PACKAGING AIR BAGS",
    title: "Maximum Protection",
    highlight: "For Your Goods",
    description:
      "High-performance air packaging solutions designed to protect goods during storage and transit.",
    leftImage: "/5e928659-b4b8-4b6f-830b-03c704697ce2.jfif",
    rightImage: "/5e928659-b4b8-4b6f-830b-03c704697ce2.jfif",
    href: "/products/air-column-bag",
    button: "Explore Products",

    floatingCards: [
      {
        title: "Air Column Bag",
        label: "Product",
        image: "/5e928659-b4b8-4b6f-830b-03c704697ce2.jfif",
      },
      {
        title: "Protective Packaging",
        label: "Solution",
        image: "/5e928659-b4b8-4b6f-830b-03c704697ce2.jfif",
      },
      {
        title: "Transit Protection",
        label: "Application",
        image: "/5e928659-b4b8-4b6f-830b-03c704697ce2.jfif",
      },
    ],
  },

  {
    eyebrow: "AIR COLUMN SOLUTIONS",
    title: "Safe Packaging",
    highlight: "Every Time",
    description:
      "Reliable cushioning solutions that help reduce damage and keep products secure in transit.",
    leftImage: "/5e928659-b4b8-4b6f-830b-03c704697ce2.jfif",
    rightImage: "/5e928659-b4b8-4b6f-830b-03c704697ce2.jfif",
    href: "/products/air-column-roll",
    button: "Explore Products",

    floatingCards: [
      {
        title: "Air Column Roll",
        label: "Product",
        image: "/5e928659-b4b8-4b6f-830b-03c704697ce2.jfif",
      },
      {
        title: "Cushion Protection",
        label: "Solution",
        image: "/5e928659-b4b8-4b6f-830b-03c704697ce2.jfif",
      },
      {
        title: "Safe Transit",
        label: "Application",
        image: "/5e928659-b4b8-4b6f-830b-03c704697ce2.jfif",
      },
    ],
  },
];

/* ============================================================
   MAIN
============================================================ */

export default function Main() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slide = slides[activeSlide];

  /* ==========================================================
     AUTO SLIDER
  ========================================================== */

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused]);

  /* ==========================================================
     NAVIGATION
  ========================================================== */

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  const previousSlide = () => {
    setActiveSlide(
      (prev) => (prev - 1 + slides.length) % slides.length
    );
  };

  return (
    <main className="w-full overflow-hidden bg-[#F4F5F5]">

      {/* ======================================================
          HERO
      ====================================================== */}

      <section className="w-full px-3 py-3 sm:px-5 sm:py-5 lg:px-6">

        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="
            relative
            mx-auto
            min-h-[650px]
            max-w-[1540px]
            overflow-hidden
            rounded-[28px]
            border
            border-black/[0.06]
            bg-[#F8F7F4]
            shadow-[0_25px_80px_rgba(16,32,51,0.08)]
          "
        >

          {/* ==================================================
              BACKGROUND DECORATION
          ================================================== */}

          <div className="pointer-events-none absolute inset-0">

            {/* Grid */}

            <div
              className="absolute inset-0 opacity-[0.025]"
              style={{
                backgroundImage:
                  "linear-gradient(#102033 1px, transparent 1px), linear-gradient(90deg, #102033 1px, transparent 1px)",
                backgroundSize: "70px 70px",
              }}
            />

            {/* Orange blob */}

            <div
              className="
                absolute
                -right-[120px]
                top-[50px]
                h-[620px]
                w-[620px]
                rounded-full
                bg-[#D95026]/[0.06]
              "
            />

            {/* Large ring */}

            <div
              className="
                absolute
                -right-[180px]
                top-[-100px]
                h-[700px]
                w-[700px]
                rounded-full
                border-[90px]
                border-[#D95026]/[0.035]
              "
            />

            <div
              className="
                absolute
                -left-[250px]
                bottom-[-300px]
                h-[600px]
                w-[600px]
                rounded-full
                bg-[#102033]/[0.025]
              "
            />

          </div>

          {/* ==================================================
              MAIN CONTENT
          ================================================== */}

          <div
            className="
              relative
              z-10
              grid
              min-h-[650px]
              grid-cols-1
              lg:grid-cols-[0.85fr_1.15fr]
            "
          >

            {/* ==================================================
                LEFT CONTENT
            ================================================== */}

            <div
              className="
                relative
                z-30
                flex
                items-center
                px-7
                py-14
                sm:px-10
                lg:px-12
                xl:px-16
              "
            >

              <AnimatePresence mode="wait">

                <motion.div
                  key={`content-${activeSlide}`}
                  initial={{
                    opacity: 0,
                    x: -30,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  exit={{
                    opacity: 0,
                    x: 20,
                  }}
                  transition={{
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="w-full max-w-[570px]"
                >

                  {/* Eyebrow */}

                  <div className="mb-6 flex items-center gap-3">

                    <span className="h-[2px] w-9 bg-[#D95026]" />

                    <span
                      className="
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-[0.25em]
                        text-[#D95026]
                      "
                    >
                      {slide.eyebrow}
                    </span>

                  </div>

                  {/* Heading */}

                  <h1
                    className="
                      text-[48px]
                      font-black
                      leading-[0.94]
                      tracking-[-0.06em]
                      text-[#102033]
                      sm:text-[58px]
                      lg:text-[62px]
                      xl:text-[70px]
                    "
                  >
                    {slide.title}

                    <br />

                    <span className="text-[#D95026]">
                      {slide.highlight}
                    </span>
                  </h1>

                  {/* Description */}

                  <p
                    className="
                      mt-7
                      max-w-[490px]
                      text-[14px]
                      leading-7
                      text-[#667381]
                      sm:text-[15px]
                    "
                  >
                    {slide.description}
                  </p>

                  {/* Buttons */}

                  <div className="mt-8 flex flex-wrap items-center gap-3">

                    <Link
                      href={slide.href}
                      className="
                        group
                        inline-flex
                        items-center
                        gap-3
                        rounded-full
                        bg-[#D95026]
                        px-6
                        py-3.5
                        text-[11px]
                        font-bold
                        tracking-wide
                        text-white
                        shadow-[0_12px_30px_rgba(217,80,38,0.18)]
                        transition-all
                        duration-300
                        hover:-translate-y-1
                        hover:bg-[#102033]
                      "
                    >
                      {slide.button}

                      <span
                        className="
                          flex
                          h-6
                          w-6
                          items-center
                          justify-center
                          rounded-full
                          bg-white/15
                        "
                      >
                        <ArrowUpRight
                          size={14}
                          className="
                            transition-transform
                            duration-300
                            group-hover:translate-x-0.5
                            group-hover:-translate-y-0.5
                          "
                        />
                      </span>
                    </Link>

                    <Link
                      href="/about"
                      className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-full
                        border
                        border-[#102033]/15
                        bg-white/60
                        px-6
                        py-3.5
                        text-[11px]
                        font-bold
                        text-[#102033]
                        transition-all
                        duration-300
                        hover:-translate-y-1
                        hover:border-[#D95026]
                        hover:text-[#D95026]
                      "
                    >
                      Learn More

                      <ArrowUpRight size={14} />
                    </Link>

                  </div>

                  {/* Trust */}

                  <div className="mt-9 flex items-center gap-3">

                    <div className="flex -space-x-2">

                      <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#F8F7F4] bg-[#102033] text-white">
                        <ShieldCheck size={13} />
                      </div>

                      <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#F8F7F4] bg-[#E8E1D6] text-[#102033]">
                        <PackageCheck size={13} />
                      </div>

                      <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#F8F7F4] bg-[#D95026] text-white">
                        <Truck size={13} />
                      </div>

                    </div>

                    <div>
                      <p className="text-[10px] font-bold text-[#102033]">
                        Built for modern logistics
                      </p>

                      <p className="mt-0.5 text-[9px] text-[#7B8792]">
                        Protection • Speed • Reliability
                      </p>
                    </div>

                  </div>

                </motion.div>

              </AnimatePresence>

            </div>


            {/* ==================================================
                RIGHT PRODUCT VISUAL
            ================================================== */}

            <div className="relative min-h-[480px] lg:min-h-[650px]">

              {/* Main orange shape */}

              <div
                className="
                  absolute
                  bottom-[-120px]
                  right-[-80px]
                  h-[560px]
                  w-[560px]
                  rounded-full
                  bg-[#D95026]/[0.10]
                  blur-[1px]
                "
              />

              <div
                className="
                  absolute
                  bottom-[-80px]
                  right-[0px]
                  h-[470px]
                  w-[470px]
                  rounded-full
                  border-[65px]
                  border-[#D95026]/[0.08]
                "
              />

              {/* ================================================
                  MAIN PRODUCT IMAGE
              ================================================= */}

              <AnimatePresence mode="wait">

                <motion.div
                  key={`main-product-${activeSlide}`}
                  initial={{
                    opacity: 0,
                    scale: 0.92,
                    x: 30,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    x: 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.96,
                    x: -20,
                  }}
                  transition={{
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="
                    absolute
                    bottom-[-20px]
                    left-1/2
                    z-20
                    h-[560px]
                    w-[82%]
                    -translate-x-1/2
                    sm:w-[70%]
                    lg:h-[610px]
                    lg:w-[68%]
                  "
                >

                  <Image
                    src={slide.rightImage}
                    alt={slide.highlight}
                    fill
                    priority={activeSlide === 0}
                    sizes="
                      (max-width: 1024px) 70vw,
                      45vw
                    "
                    className="
                      object-contain
                      drop-shadow-[0_35px_35px_rgba(16,32,51,0.16)]
                    "
                  />

                </motion.div>

              </AnimatePresence>


              {/* ==================================================
                  FLOATING CARD 01
              ================================================== */}

              <AnimatePresence mode="wait">

                <motion.div
                  key={`float-1-${activeSlide}`}
                  initial={{
                    opacity: 0,
                    y: 25,
                    scale: 0.85,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  transition={{
                    delay: 0.2,
                    duration: 0.55,
                  }}
                  className="
                    absolute
                    left-[3%]
                    top-[10%]
                    z-30
                    w-[145px]
                    rounded-2xl
                    border
                    border-black/[0.06]
                    bg-white/95
                    p-2.5
                    shadow-[0_18px_40px_rgba(16,32,51,0.12)]
                    backdrop-blur-md
                    sm:w-[165px]
                  "
                >

                  <div className="relative h-[85px] overflow-hidden rounded-xl bg-[#F1EFEB]">

                    <Image
                      src={slide.floatingCards[0].image}
                      alt={slide.floatingCards[0].title}
                      fill
                      sizes="165px"
                      className="object-contain p-2"
                    />

                  </div>

                  <div className="px-1 pb-1 pt-2">

                    <p className="text-[8px] font-bold uppercase tracking-[0.15em] text-[#D95026]">
                      {slide.floatingCards[0].label}
                    </p>

                    <p className="mt-1 text-[11px] font-bold leading-tight text-[#102033]">
                      {slide.floatingCards[0].title}
                    </p>

                  </div>

                </motion.div>

              </AnimatePresence>


              {/* ==================================================
                  FLOATING CARD 02
              ================================================== */}

              <AnimatePresence mode="wait">

                <motion.div
                  key={`float-2-${activeSlide}`}
                  initial={{
                    opacity: 0,
                    y: -20,
                    scale: 0.85,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  transition={{
                    delay: 0.35,
                    duration: 0.55,
                  }}
                  className="
                    absolute
                    right-[4%]
                    top-[17%]
                    z-30
                    w-[145px]
                    rounded-2xl
                    border
                    border-black/[0.06]
                    bg-white/95
                    p-2.5
                    shadow-[0_18px_40px_rgba(16,32,51,0.12)]
                    backdrop-blur-md
                    sm:w-[165px]
                  "
                >

                  <div className="relative h-[85px] overflow-hidden rounded-xl bg-[#F1EFEB]">

                    <Image
                      src={slide.floatingCards[1].image}
                      alt={slide.floatingCards[1].title}
                      fill
                      sizes="165px"
                      className="object-contain p-2"
                    />

                  </div>

                  <div className="px-1 pb-1 pt-2">

                    <p className="text-[8px] font-bold uppercase tracking-[0.15em] text-[#D95026]">
                      {slide.floatingCards[1].label}
                    </p>

                    <p className="mt-1 text-[11px] font-bold leading-tight text-[#102033]">
                      {slide.floatingCards[1].title}
                    </p>

                  </div>

                </motion.div>

              </AnimatePresence>


              {/* ==================================================
                  FLOATING CARD 03
              ================================================== */}

              <AnimatePresence mode="wait">

                <motion.div
                  key={`float-3-${activeSlide}`}
                  initial={{
                    opacity: 0,
                    y: 25,
                    scale: 0.85,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  transition={{
                    delay: 0.5,
                    duration: 0.55,
                  }}
                  className="
                    absolute
                    bottom-[12%]
                    right-[5%]
                    z-30
                    w-[145px]
                    rounded-2xl
                    border
                    border-black/[0.06]
                    bg-white/95
                    p-2.5
                    shadow-[0_18px_40px_rgba(16,32,51,0.12)]
                    backdrop-blur-md
                    sm:w-[165px]
                  "
                >

                  <div className="relative h-[85px] overflow-hidden rounded-xl bg-[#F1EFEB]">

                    <Image
                      src={slide.floatingCards[2].image}
                      alt={slide.floatingCards[2].title}
                      fill
                      sizes="165px"
                      className="object-contain p-2"
                    />

                  </div>

                  <div className="px-1 pb-1 pt-2">

                    <p className="text-[8px] font-bold uppercase tracking-[0.15em] text-[#D95026]">
                      {slide.floatingCards[2].label}
                    </p>

                    <p className="mt-1 text-[11px] font-bold leading-tight text-[#102033]">
                      {slide.floatingCards[2].title}
                    </p>

                  </div>

                </motion.div>

              </AnimatePresence>


              {/* ================================================
                  SMALL TRUST BADGE
              ================================================= */}

              <div
                className="
                  absolute
                  bottom-[8%]
                  left-[7%]
                  z-30
                  hidden
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-black/[0.06]
                  bg-white/90
                  px-4
                  py-2.5
                  shadow-[0_12px_30px_rgba(16,32,51,0.08)]
                  backdrop-blur-md
                  sm:flex
                "
              >

                <span className="h-2 w-2 rounded-full bg-[#D95026]" />

                <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#536273]">
                  Safe in transit
                </span>

              </div>

            </div>

          </div>


          {/* ==================================================
              SLIDER COUNTER
          ================================================== */}

          <div
            className="
              absolute
              right-6
              top-6
              z-50
              flex
              items-center
              gap-3
            "
          >

            <span className="text-[10px] font-bold tracking-[0.2em] text-[#D95026]">
              0{activeSlide + 1}
            </span>

            <span className="h-px w-8 bg-[#D5D8DA]" />

            <span className="text-[10px] font-medium tracking-[0.2em] text-[#8B949D]">
              0{slides.length}
            </span>

          </div>


          {/* ==================================================
              LEFT ARROW
          ================================================== */}

          <button
            type="button"
            onClick={previousSlide}
            aria-label="Previous slide"
            className="
              absolute
              left-4
              top-1/2
              z-50
              flex
              h-10
              w-10
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              border
              border-black/[0.06]
              bg-white/90
              text-[#102033]
              shadow-[0_10px_30px_rgba(16,32,51,0.1)]
              backdrop-blur
              transition-all
              duration-300
              hover:bg-[#102033]
              hover:text-white
            "
          >
            <ChevronLeft size={18} />
          </button>


          {/* ==================================================
              RIGHT ARROW
          ================================================== */}

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next slide"
            className="
              absolute
              right-4
              top-1/2
              z-50
              flex
              h-10
              w-10
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              border
              border-black/[0.06]
              bg-white/90
              text-[#102033]
              shadow-[0_10px_30px_rgba(16,32,51,0.1)]
              backdrop-blur
              transition-all
              duration-300
              hover:bg-[#102033]
              hover:text-white
            "
          >
            <ChevronRight size={18} />
          </button>


          {/* ==================================================
              SLIDER DOTS
          ================================================== */}

          <div
            className="
              absolute
              bottom-5
              left-1/2
              z-50
              flex
              -translate-x-1/2
              items-center
              gap-2
            "
          >

            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setActiveSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`
                  relative
                  h-[3px]
                  overflow-hidden
                  rounded-full
                  bg-[#D5D8DA]
                  transition-all
                  duration-300
                  ${
                    activeSlide === index
                      ? "w-11"
                      : "w-4"
                  }
                `}
              >
                {activeSlide === index && (
                  <motion.span
                    key={activeSlide}
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{
                      duration: 5,
                      ease: "linear",
                    }}
                    className="absolute inset-y-0 left-0 bg-[#D95026]"
                  />
                )}
              </button>
            ))}

          </div>

        </div>

      </section>

    </main>
  );
}