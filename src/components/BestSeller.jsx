"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import {
  ArrowUpRight,
  ArrowRight,
} from "lucide-react";

/* ============================================================
   THEME
============================================================ */

const ORANGE = "#D95026";

/* ============================================================
   BEST SELLER PRODUCTS
   Source: packingairbag.com
============================================================ */

const bestSellers = [
  {
    name: "Dunnage Bag",
    category: "DUNNAGE BAGS",

    image: "https://packingairbag.com/cat/1.webp",

    link: "https://packingairbag.com/categories/dunnage-bag",

    tag: "BEST SELLER",
  },

  {
    name: "Air Column Roll",
    category: "AIR COLUMN PACKAGING",

    image: "https://packingairbag.com/cat/2.webp",

    link: "https://packingairbag.com/categories/air-column-roll",

    tag: "POPULAR",
  },

  {
    name: "Air Column Bag",
    category: "AIR COLUMN BAGS",

    image: "https://packingairbag.com/cat/5.webp",

    link: "https://packingairbag.com/categories/air-column-bag",

    tag: "TOP PICK",
  },

  {
    name: "Packaging Air Bag",
    category: "AIR PACKAGING",

    image: "https://packingairbag.com/cat/3.webp",

    link: "https://packingairbag.com/categories/packaging-air-bag",

    tag: "POPULAR",
  },

  {
    name: "Gap Filler",
    category: "GAP FILLING SOLUTIONS",

    image: "https://packingairbag.com/sideimg.png",

    link: "https://packingairbag.com/categories/gap-filler",

    tag: "BEST SELLER",
  },
];

/* ============================================================
   MAIN COMPONENT
============================================================ */

export default function BestSeller() {
  return (
    <section className="w-full bg-[#f5f4f2] py-8 sm:py-10 lg:py-12">

      <div className="mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-8">

        {/* =====================================================
            MAIN LAYOUT
        ===================================================== */}

        <div
          className="
            grid
            grid-cols-1
            gap-5
            lg:grid-cols-[285px_minmax(0,1fr)]
            lg:gap-5
            items-stretch
          "
        >

          {/* =====================================================
              LEFT EDITORIAL PANEL
          ===================================================== */}

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
              amount: 0.2,
            }}
            transition={{
              duration: 0.6,
            }}
            className="
              relative
              overflow-hidden
              bg-[#171717]
              min-h-[330px]
              lg:min-h-[510px]
              p-6
              sm:p-8
              flex
              flex-col
            "
          >

            {/* ORANGE TOP ACCENT */}

            <div
              className="
                absolute
                top-0
                left-0
                w-full
                h-[4px]
                bg-[#D95026]
              "
            />

            {/* BACKGROUND NUMBER */}

            <span
              className="
                absolute
                right-[-15px]
                bottom-[-35px]
                font-[var(--font-outfit)]
                text-[150px]
                sm:text-[190px]
                lg:text-[210px]
                font-black
                leading-none
                text-white/[0.035]
                select-none
              "
            >
              01
            </span>

            {/* =================================================
                TOP CONTENT
            ================================================= */}

            <div className="relative z-10">

              <div className="flex items-center gap-3 mb-4">

                <span
                  className="
                    w-8
                    h-[2px]
                    bg-[#D95026]
                  "
                />

                <span
                  className="
                    font-[var(--font-outfit)]
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.2em]
                    text-[#D95026]
                  "
                >
                  DPACK COLLECTION
                </span>

              </div>

              <h2
                className="
                  font-[var(--font-outfit)]
                  text-[40px]
                  sm:text-[48px]
                  lg:text-[52px]
                  font-bold
                  leading-[0.95]
                  tracking-tight
                  text-white
                "
              >
                BEST
                <br />
                SELLERS
              </h2>

              <p
                className="
                  max-w-[215px]
                  mt-3
                  font-[var(--font-quicksand)]
                  text-[12px]
                  sm:text-[13px]
                  leading-5
                  text-white/50
                "
              >
                Explore the packaging solutions
                most trusted for safe and secure
                transportation.
              </p>

            </div>

            {/* =================================================
                BOTTOM
            ================================================= */}

            <div
              className="
                relative
                z-10
                mt-auto
                pt-8
              "
            >

              <div
                className="
                  w-10
                  h-10
                  border
                  border-white/15
                  flex
                  items-center
                  justify-center
                  text-[#D95026]
                  mb-4
                "
              >
                <ArrowUpRight size={17} />
              </div>

              <Link
                href="/products"
                className="
                  group
                  inline-flex
                  items-center
                  gap-2
                  font-[var(--font-outfit)]
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.15em]
                  text-white
                "
              >
                Explore All Products

                <ArrowRight
                  size={14}
                  className="
                    text-[#D95026]
                    group-hover:translate-x-1
                    transition-transform
                  "
                />

              </Link>

            </div>

          </motion.div>

          {/* =====================================================
              RIGHT PRODUCT AREA
          ===================================================== */}

          <div
            className="
              grid
              grid-cols-2
              lg:grid-cols-4
              gap-3
              sm:gap-4
            "
          >

            {bestSellers.slice(0, 4).map((product, index) => (

              <ProductCard
                key={product.name}
                product={product}
                index={index}
              />

            ))}

          </div>

        </div>

        {/* =====================================================
            FIFTH PRODUCT - MOBILE
        ===================================================== */}

        <div className="mt-4 lg:hidden">

          <ProductCard
            product={bestSellers[4]}
            index={4}
          />

        </div>

      </div>

    </section>
  );
}


/* ============================================================
   PRODUCT CARD
============================================================ */

function ProductCard({
  product,
  index,
}) {
  return (

    <motion.div
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
        amount: 0.15,
      }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
      }}
      className="h-full"
    >

      <a
        href={product.link}
        target="_blank"
        rel="noopener noreferrer"
        className="
          group
          relative
          flex
          h-full
          min-h-[330px]
          sm:min-h-[390px]
          lg:min-h-[510px]
          flex-col
          overflow-hidden
          bg-white
          border
          border-black/[0.06]
          transition-all
          duration-500
          hover:border-[#D95026]/30
          hover:shadow-[0_18px_45px_rgba(0,0,0,0.09)]
        "
      >

        {/* =================================================
            PRODUCT TAG
        ================================================= */}

        <div
          className="
            absolute
            z-20
            top-3
            left-3
            flex
            items-center
            gap-2
          "
        >

          <span
            className="
              bg-[#171717]
              px-2.5
              py-1.5
              font-[var(--font-outfit)]
              text-[8px]
              font-bold
              tracking-wider
              text-white
            "
          >
            {product.tag}
          </span>

        </div>


        {/* =================================================
            PRODUCT NUMBER
        ================================================= */}

        <span
          className="
            absolute
            z-10
            top-4
            right-4
            font-[var(--font-outfit)]
            text-[10px]
            font-bold
            text-gray-200
            group-hover:text-[#D95026]
            transition-colors
          "
        >
          0{index + 1}
        </span>


        {/* =================================================
            PRODUCT IMAGE
        ================================================= */}

        <div
          className="
            relative
            w-full
            aspect-[0.95]
            bg-[#f4f3f1]
            overflow-hidden
          "
        >

          <Image
            src={product.image}
            alt={product.name}
            fill
            unoptimized
            sizes="
              (max-width: 640px) 50vw,
              (max-width: 1024px) 25vw,
              20vw
            "
            className="
              object-contain
              p-7
              sm:p-8
              lg:p-9
              transition-transform
              duration-700
              ease-out
              group-hover:scale-110
            "
          />

          {/* HOVER LINE */}

          <div
            className="
              absolute
              bottom-0
              left-0
              w-0
              h-[3px]
              bg-[#D95026]
              group-hover:w-full
              transition-all
              duration-500
            "
          />

        </div>


        {/* =================================================
            PRODUCT DETAILS
        ================================================= */}

        <div
          className="
            flex
            flex-1
            flex-col
            justify-between
            p-4
            sm:p-5
          "
        >

          <div>

            {/* CATEGORY */}

            <span
              className="
                font-[var(--font-outfit)]
                text-[8px]
                font-bold
                uppercase
                tracking-[0.16em]
                text-[#D95026]
              "
            >
              {product.category}
            </span>


            {/* PRODUCT NAME */}

            <h3
              className="
                mt-2
                font-[var(--font-outfit)]
                text-[14px]
                sm:text-[15px]
                font-semibold
                leading-5
                text-[#202020]
                group-hover:text-[#D95026]
                transition-colors
              "
            >
              {product.name}
            </h3>

          </div>


          {/* =================================================
              BOTTOM CTA
          ================================================= */}

          <div className="mt-5">

            <div
              className="
                flex
                items-end
                justify-between
                gap-2
              "
            >

              <div>

                <p
                  className="
                    font-[var(--font-outfit)]
                    text-[11px]
                    text-gray-400
                  "
                >
                  Protective Packaging
                </p>

                <p
                  className="
                    mt-0.5
                    font-[var(--font-outfit)]
                    text-[13px]
                    font-bold
                    text-[#171717]
                  "
                >
                  View Product
                </p>

              </div>


              {/* ARROW */}

              <span
                className="
                  w-9
                  h-9
                  shrink-0
                  flex
                  items-center
                  justify-center
                  bg-[#fff0ea]
                  text-[#D95026]
                  group-hover:bg-[#D95026]
                  group-hover:text-white
                  transition-all
                  duration-300
                "
              >
                <ArrowUpRight size={15} />
              </span>

            </div>

          </div>

        </div>

      </a>

    </motion.div>
  );
}