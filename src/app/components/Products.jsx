"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ShoppingBag,
} from "lucide-react";

/* ============================================================
   PRODUCTS
============================================================ */

const products = [
  {
    id: 1,
    name: "Dunnage Air Bags",
    category: "Dunnage Bags",
    image: "https://packingairbag.com/cat/1.webp",
    link: "https://packingairbag.com/categories/dunnage-bag",
    tag: "DUNNAGE",
  },
  {
    id: 2,
    name: "PP Dunnage Bag",
    category: "Dunnage Bags",
    image: "https://packingairbag.com/cat/1.webp",
    link: "https://packingairbag.com/categories/dunnage-bag",
    tag: "POPULAR",
  },
  {
    id: 3,
    name: "Square Dunnage Air Bags",
    category: "Dunnage Bags",
    image: "https://packingairbag.com/cat/1.webp",
    link: "https://packingairbag.com/categories/dunnage-bag",
    tag: "DUNNAGE",
  },
  {
    id: 4,
    name: "Air Column Bag for Laptop",
    category: "Air Column Bags",
    image: "https://packingairbag.com/cat/5.webp",
    link: "https://packingairbag.com/categories/air-column-bag",
    tag: "FRAGILE",
  },
  {
    id: 5,
    name: "Air Column Bags for Electronics",
    category: "Air Column Bags",
    image: "https://packingairbag.com/cat/5.webp",
    link: "https://packingairbag.com/categories/air-column-bag",
    tag: "POPULAR",
  },
];

/* ============================================================
   MAIN SECTION
============================================================ */

export default function ProductsRevealSection() {
  const sectionRef = useRef(null);

  const [progress, setProgress] = useState(0);

  /* ==========================================================
     SCROLL PROGRESS
  ========================================================== */

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;

      ticking = true;

      requestAnimationFrame(() => {
        const rect =
          section.getBoundingClientRect();

        const sectionHeight =
          section.offsetHeight;

        const viewportHeight =
          window.innerHeight;

        const total =
          sectionHeight -
          viewportHeight;

        const current =
          Math.min(
            Math.max(-rect.top, 0),
            total
          );

        const value =
          total > 0
            ? current / total
            : 0;

        setProgress(value);

        ticking = false;
      });
    };

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    );

    handleScroll();

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  /* ==========================================================
     REVEAL
  ========================================================== */

  const reveal =
    Math.min(
      progress / 0.60,
      1
    );

  /* ==========================================================
     SMOOTH EASING
  ========================================================== */

  const eased =
    1 -
    Math.pow(
      1 - reveal,
      3
    );

  /* ==========================================================
     PRODUCT POSITIONS

     Initial:
     Products close together.

     Final:
     Five compact columns.
  ========================================================== */

  const positions = [
    {
      x: -2,
      y: -10,
      rotate: -4,
    },
    {
      x: -1,
      y: 5,
      rotate: -2,
    },
    {
      x: 0,
      y: -5,
      rotate: 0,
    },
    {
      x: 1,
      y: 5,
      rotate: 2,
    },
    {
      x: 2,
      y: -10,
      rotate: 4,
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="
        relative
        h-[210vh]
        bg-[#F7F2EB]
      "
    >

      {/* ======================================================
          STICKY VIEWPORT
      ====================================================== */}

      <div
        className="
          sticky
          top-0
          flex
          h-screen
          w-full
          items-center
          overflow-hidden
        "
      >

        {/* ====================================================
            BACKGROUND
        ==================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
          "
        >

          {/* Soft center glow */}

          <div
            className="
              absolute
              left-1/2
              top-[52%]
              h-[420px]
              w-[420px]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              bg-[#AAB596]/20
              blur-[120px]
            "
          />

          {/* Subtle top glow */}

          <div
            className="
              absolute
              right-[10%]
              top-[10%]
              h-[220px]
              w-[220px]
              rounded-full
              bg-[#EAE2D6]/60
              blur-[100px]
            "
          />

        </div>

        {/* ====================================================
            HEADER
        ==================================================== */}

        <div
          className="
            absolute
            left-0
            right-0
            top-7
            z-40
            px-5
            sm:top-8
            sm:px-7
            lg:px-10
          "
        >

          <div
            className="
              mx-auto
              flex
              max-w-[1380px]
              items-end
              justify-between
            "
          >

            {/* LEFT */}

            <div>

              <div
                className="
                  mb-2
                  flex
                  items-center
                  gap-3
                "
              >

                <span
                  className="
                    h-[2px]
                    w-7
                    bg-[#8B9A6E]
                  "
                />

                <span
                  className="
                    text-[8px]
                    font-bold
                    uppercase
                    tracking-[0.25em]
                    text-[#8B9A6E]
                  "
                >
                  DPACK COLLECTION
                </span>

              </div>

              <h2
                className="
                  font-[var(--font-outfit)]
                  text-[28px]
                  font-black
                  leading-none
                  tracking-[-0.045em]
                  text-[#17191d]
                  sm:text-[34px]
                  lg:text-[42px]
                "
              >
                Explore Our Products
              </h2>

            </div>

            {/* RIGHT */}

            <span
              className="
                hidden
                pb-1
                text-[8px]
                font-bold
                uppercase
                tracking-[0.18em]
                text-[#858980]
                sm:block
              "
            >
              Scroll to explore
            </span>

          </div>

        </div>

        {/* ====================================================
            PRODUCT AREA

            IMPORTANT:
            It now stays INSIDE the viewport.
        ==================================================== */}

        <div
          className="
            absolute
            left-1/2
            top-[100px]
            bottom-[12px]
            w-full
            max-w-[1380px]
            -translate-x-1/2
            px-3
            sm:top-[110px]
            sm:px-5
            lg:top-[115px]
            lg:px-6
          "
        >

          {/* =================================================
              PRODUCTS
          ================================================= */}

          {products.map(
            (product, index) => {

              const position =
                positions[index];

              /* ---------------------------------------------
                 Initial clustered position
              --------------------------------------------- */

              const startX =
                position.x *
                25;

              const startY =
                position.y *
                0.35;

              /* ---------------------------------------------
                 Final compact 5-column position
                 
                 Reduced from 285px → 235px
              --------------------------------------------- */

              const finalX =
                position.x *
                235;

              const finalY = 0;

              /* ---------------------------------------------
                 Current position
              --------------------------------------------- */

              const x =
                startX +
                (finalX - startX) *
                  eased;

              const y =
                startY +
                (finalY - startY) *
                  eased;

              /* ---------------------------------------------
                 Scale
              --------------------------------------------- */

              const scale =
                0.38 +
                eased * 0.62;

              /* ---------------------------------------------
                 Rotation
              --------------------------------------------- */

              const rotate =
                position.rotate *
                (1 - eased);

              /* ---------------------------------------------
                 Opacity
              --------------------------------------------- */

              const opacity =
                0.72 +
                eased * 0.28;

              return (
                <div
                  key={product.id}
                  className="
                    absolute
                    left-1/2
                    top-1/2
                    w-[180px]
                    sm:w-[195px]
                    lg:w-[215px]
                  "
                  style={{
                    transform: `
                      translate(-50%, -50%)
                      translateX(${x}px)
                      translateY(${y}px)
                      rotate(${rotate}deg)
                      scale(${scale})
                    `,
                    opacity,
                    zIndex:
                      20 + index,
                  }}
                >

                  {/* =================================================
                      PRODUCT LINK
                  ================================================= */}

                  <a
                    href={product.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block"
                  >

                    {/* =================================================
                        PRODUCT CARD
                    ================================================= */}

                    <div
                      className="
                        relative
                        aspect-[0.86]
                        overflow-hidden
                        rounded-[18px]
                        border
                        border-[#DDD8CF]
                        bg-white
                        shadow-[0_18px_55px_rgba(23,25,24,0.10)]
                        transition-all
                        duration-500
                        group-hover:-translate-y-2
                        group-hover:shadow-[0_28px_65px_rgba(23,25,24,0.15)]
                      "
                    >

                      {/* IMAGE BACKGROUND */}

                      <div
                        className="
                          absolute
                          inset-2.5
                          rounded-[14px]
                          bg-[#F2F0EA]
                        "
                      />

                      {/* IMAGE */}

                      <div
                        className="
                          absolute
                          inset-4
                          z-10
                        "
                      >

                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          unoptimized
                          sizes="215px"
                          className="
                            object-contain
                            p-3
                            transition-transform
                            duration-700
                            group-hover:scale-110
                          "
                        />

                      </div>

                      {/* =================================================
                          TAG
                      ================================================= */}

                      <div
                        className="
                          absolute
                          left-3
                          top-3
                          z-20
                        "
                      >

                        <span
                          className="
                            rounded-full
                            bg-[#17191d]
                            px-2.5
                            py-1.5
                            text-[6px]
                            font-bold
                            uppercase
                            tracking-[0.13em]
                            text-white
                          "
                        >
                          {product.tag}
                        </span>

                      </div>

                      {/* =================================================
                          NUMBER
                      ================================================= */}

                      <span
                        className="
                          absolute
                          right-3
                          top-3
                          z-20
                          text-[8px]
                          font-bold
                          text-[#C8C8C2]
                        "
                      >
                        {String(
                          product.id
                        ).padStart(2, "0")}
                      </span>

                      {/* =================================================
                          HOVER BUTTON
                      ================================================= */}

                      <div
                        className="
                          absolute
                          bottom-3
                          left-3
                          right-3
                          z-30
                          translate-y-2
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
                            rounded-xl
                            bg-[#17191d]
                            py-2.5
                            text-[7px]
                            font-bold
                            uppercase
                            tracking-[0.1em]
                            text-white
                          "
                        >

                          <ShoppingBag
                            size={11}
                          />

                          View Product

                        </div>

                      </div>

                      {/* =================================================
                          SAGE ACCENT
                      ================================================= */}

                      <div
                        className="
                          absolute
                          bottom-0
                          left-0
                          h-[3px]
                          w-full
                          bg-[#8B9A6E]
                        "
                      />

                    </div>

                    {/* =================================================
                        PRODUCT INFO
                    ================================================= */}

                    <div
                      className="
                        mt-2.5
                        px-0.5
                      "
                    >

                      <p
                        className="
                          text-[7px]
                          font-bold
                          uppercase
                          tracking-[0.13em]
                          text-[#94988E]
                        "
                      >
                        {product.category}
                      </p>

                      <h3
                        className="
                          mt-1
                          line-clamp-2
                          font-[var(--font-outfit)]
                          text-[15px]
                          font-bold
                          leading-4
                          text-[#17191d]
                        "
                      >
                        {product.name}
                      </h3>

                      <div
                        className="
                          mt-2
                          flex
                          items-center
                          justify-between
                          border-t
                          border-[#DDD8CF]
                          pt-2
                        "
                      >

                        <span
                          className="
                            text-[11px]
                            font-bold
                            text-[#8B9A6E]
                          "
                        >
                          Get Best Price
                        </span>

                        <ArrowRight
                          size={10}
                          className="
                            text-[#A3A69E]
                          "
                        />

                      </div>

                    </div>

                  </a>

                </div>
              );
            }
          )}

        </div>

        {/* ====================================================
            BOTTOM PROGRESS
        ==================================================== */}

        <div
          className="
            absolute
            bottom-5
            left-1/2
            z-40
            flex
            -translate-x-1/2
            items-center
            gap-3
          "
        >

          <span
            className="
              h-1
              w-1
              rounded-full
              bg-[#8B9A6E]
            "
          />

      

          <span className="h-px w-8 bg-[#D5D1C8]" />


        </div>

      </div>

    </section>
  );
}