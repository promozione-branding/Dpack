"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  "/new banner.webp",
  "/banner (21).webp",
  "/slider-3.webp",
];

export default function Main() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

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
        h-[calc(100vh-186px)]
        min-h-[560px]
        max-h-[850px]
        overflow-hidden
        bg-[#111111]
      "
    >
      {/* =====================================================
          SLIDER
      ===================================================== */}

      <AnimatePresence mode="wait">
        <motion.div
          key={activeSlide}
          initial={{
            opacity: 0,
            scale: 1.06,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            scale: 1.025,
          }}
          transition={{
            duration: 1,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="absolute inset-0"
        >
          <Image
            src={slides[activeSlide]}
            alt={`DPACK Slider ${activeSlide + 1}`}
            fill
            priority={activeSlide === 0}
            sizes="100vw"
            className="
              object-cover
              object-center
            "
          />
        </motion.div>
      </AnimatePresence>

      {/* =====================================================
          SUBTLE OVERLAY
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-10
          bg-gradient-to-r
          from-black/10
          via-transparent
          to-black/10
        "
      />

      {/* =====================================================
          TOP BORDER / FRAME
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-[10px]
          z-20
          border
          border-white/[0.12]
          sm:inset-[14px]
        "
      />

      {/* =====================================================
          LEFT ARROW
      ===================================================== */}

      <button
        type="button"
        onClick={prevSlide}
        aria-label="Previous Slide"
        className="
          group
          absolute
          left-5
          top-1/2
          z-30
          flex
          h-[48px]
          w-[48px]
          -translate-y-1/2
          items-center
          justify-center
          rounded-full
          border
          border-white/40
          bg-black/15
          text-white
          backdrop-blur-md
          transition-all
          duration-300

          hover:border-white
          hover:bg-white
          hover:text-black

          md:left-8
          md:h-[54px]
          md:w-[54px]

          lg:left-10
        "
      >
        <ChevronLeft
          size={22}
          strokeWidth={1.5}
          className="
            transition-transform
            duration-300
            group-hover:-translate-x-0.5
          "
        />
      </button>

      {/* =====================================================
          RIGHT ARROW
      ===================================================== */}

      <button
        type="button"
        onClick={nextSlide}
        aria-label="Next Slide"
        className="
          group
          absolute
          right-5
          top-1/2
          z-30
          flex
          h-[48px]
          w-[48px]
          -translate-y-1/2
          items-center
          justify-center
          rounded-full
          border
          border-white/40
          bg-black/15
          text-white
          backdrop-blur-md
          transition-all
          duration-300

          hover:border-white
          hover:bg-white
          hover:text-black

          md:right-8
          md:h-[54px]
          md:w-[54px]

          lg:right-10
        "
      >
        <ChevronRight
          size={22}
          strokeWidth={1.5}
          className="
            transition-transform
            duration-300
            group-hover:translate-x-0.5
          "
        />
      </button>

      {/* =====================================================
          BOTTOM CONTROLS
      ===================================================== */}

      <div
        className="
          absolute
          bottom-7
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
          backdrop-blur-md
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
              transition-all
              duration-500
            "
          >
            <span
              className={`
                absolute
                inset-0
                rounded-full
                transition-all
                duration-500

                ${
                  activeSlide === index
                    ? "w-[48px] bg-white"
                    : "w-[22px] bg-white/40"
                }
              `}
            />
          </button>
        ))}
      </div>

      {/* =====================================================
          SLIDE NUMBER
      ===================================================== */}

      <div
        className="
          absolute
          bottom-7
          left-7
          z-30
          hidden
          items-center
          gap-3
          sm:flex
        "
      >
        <span
          className="
            text-[11px]
            font-semibold
            tracking-[0.18em]
            text-white
          "
        >
          0{activeSlide + 1}
        </span>

        <span className="h-px w-8 bg-white/40" />

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

      {/* =====================================================
          CORNER DETAILS
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          right-7
          top-7
          z-30
          hidden
          sm:block
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