"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* ============================================================
   SLIDES
============================================================ */

const slides = [
  "/new banner.webp",
  "/banner (21).webp",
];

/* ============================================================
   MAIN
============================================================ */

export default function Main() {
  const [activeSlide, setActiveSlide] = useState(0);

  /* ==========================================================
     AUTO SLIDE
  ========================================================== */

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  /* ==========================================================
     NEXT
  ========================================================== */

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  /* ==========================================================
     PREVIOUS
  ========================================================== */

  const prevSlide = () => {
    setActiveSlide((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  return (
    <section
      className="
        relative
        w-full
        overflow-hidden
        bg-[#111111]
        aspect-[1440/487]
      "
    >
      {/* ======================================================
          SLIDER
      ====================================================== */}

      <AnimatePresence mode="wait">
        <motion.div
          key={activeSlide}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="
            absolute
            inset-0
          "
        >
          <Image
            src={slides[activeSlide]}
            alt={`DPACK Slider ${activeSlide + 1}`}
            fill
            priority={activeSlide === 0}
            sizes="100vw"
            className="
              object-fill
            "
          />
        </motion.div>
      </AnimatePresence>

      {/* ======================================================
          VERY LIGHT OVERLAY
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-10
          bg-black/[0.02]
        "
      />

      {/* ======================================================
          FRAME
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-[7px]
          z-20
          border
          border-white/[0.12]
          sm:inset-[10px]
        "
      />

      {/* ======================================================
          LEFT ARROW
      ====================================================== */}

      <button
        type="button"
        onClick={prevSlide}
        aria-label="Previous Slide"
        className="
          group
          absolute
          left-3
          top-1/2
          z-30
          flex
          h-10
          w-10
          -translate-y-1/2
          items-center
          justify-center
          rounded-full
          border
          border-white/35
          bg-black/15
          text-white
          backdrop-blur-sm
          transition-all
          duration-300

          hover:border-white
          hover:bg-white
          hover:text-black

          sm:left-5
          sm:h-11
          sm:w-11

          lg:left-8
          lg:h-12
          lg:w-12
        "
      >
        <ChevronLeft
          size={20}
          strokeWidth={1.5}
          className="
            transition-transform
            duration-300
            group-hover:-translate-x-0.5
          "
        />
      </button>

      {/* ======================================================
          RIGHT ARROW
      ====================================================== */}

      <button
        type="button"
        onClick={nextSlide}
        aria-label="Next Slide"
        className="
          group
          absolute
          right-3
          top-1/2
          z-30
          flex
          h-10
          w-10
          -translate-y-1/2
          items-center
          justify-center
          rounded-full
          border
          border-white/35
          bg-black/15
          text-white
          backdrop-blur-sm
          transition-all
          duration-300

          hover:border-white
          hover:bg-white
          hover:text-black

          sm:right-5
          sm:h-11
          sm:w-11

          lg:right-8
          lg:h-12
          lg:w-12
        "
      >
        <ChevronRight
          size={20}
          strokeWidth={1.5}
          className="
            transition-transform
            duration-300
            group-hover:translate-x-0.5
          "
        />
      </button>

      {/* ======================================================
          BOTTOM SLIDER DOTS
      ====================================================== */}

      <div
        className="
          absolute
          bottom-4
          left-1/2
          z-30
          flex
          -translate-x-1/2
          items-center
          gap-2
          rounded-full
          border
          border-white/20
          bg-black/20
          px-3
          py-2
          backdrop-blur-sm

          sm:bottom-5
        "
      >
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setActiveSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className="
              relative
              h-[3px]
              overflow-hidden
              rounded-full
            "
          >
            <span
              className={`
                block
                h-[3px]
                rounded-full
                transition-all
                duration-500

                ${
                  activeSlide === index
                    ? "w-[45px] bg-white"
                    : "w-[20px] bg-white/40"
                }
              `}
            />
          </button>
        ))}
      </div>

      {/* ======================================================
          SLIDE NUMBER
      ====================================================== */}

      <div
        className="
          absolute
          bottom-5
          left-5
          z-30
          hidden
          items-center
          gap-3
          sm:flex
          lg:left-7
        "
      >
        <span
          className="
            text-[10px]
            font-semibold
            tracking-[0.18em]
            text-white
          "
        >
          0{activeSlide + 1}
        </span>

        <span
          className="
            h-px
            w-8
            bg-white/40
          "
        />

        <span
          className="
            text-[9px]
            tracking-[0.18em]
            text-white/50
          "
        >
          0{slides.length}
        </span>
      </div>

      {/* ======================================================
          TOP RIGHT LABEL
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          right-5
          top-5
          z-30
          hidden
          sm:block
          lg:right-7
        "
      >
        <span
          className="
            text-[8px]
            font-semibold
            uppercase
            tracking-[0.25em]
            text-white/60
          "
        >
          DPACK SOLUTIONS
        </span>
      </div>
    </section>
  );
}