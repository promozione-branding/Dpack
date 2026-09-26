"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

/* =========================================================
   CATEGORIES
========================================================= */

const categories = [
  {
   
    name: "Dunnage Air Bags",
    image: "/Dannage.webp",
    href: "/products/dunnage-air-bags",
  },
  {
   
    name: "Air Column Bags",
    image: "/Air column bag (2).webp",
    href: "/products/air-column-bags",
  },
  {
   
    name: "Air Column Rolls",
    image: "/Air Column Roll (2).webp",
    href: "/products/air-column-rolls",
  },
  {
   
    name: "Packaging Air Bags",
    image: "/packing bag.webp",
    href: "/products/packaging-air-bags",
  },
  {
 
    name: "Gap Fillers",
    image: "/Gap filler (3).webp",
    href: "/products/gap-fillers",
  },
];

/* =========================================================
   CARD ANIMATION
========================================================= */

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },

  show: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: index * 0.07,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

/* =========================================================
   COMPONENT
========================================================= */

export default function Categories() {
  return (
    <section className="w-full bg-[#F1EEE8] px-4 py-10 sm:px-6 sm:py-14 lg:px-8">

      <div className="mx-auto max-w-[1400px]">

        {/* =====================================================
            MAIN BOX
        ===================================================== */}

        <div
          className="
            relative
            overflow-hidden
            rounded-[14px]
            bg-[#062033]
            px-5
            py-5
            sm:px-6
            sm:py-6
            lg:px-7
            lg:py-7
          "
        >

          {/* BACKGROUND GLOW */}

          <div
            className="
              pointer-events-none
              absolute
              -left-20
              top-1/2
              h-48
              w-48
              -translate-y-1/2
              rounded-full
              bg-[#133C5E]
              blur-[80px]
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              -right-20
              top-1/2
              h-52
              w-52
              -translate-y-1/2
              rounded-full
              bg-[#143D5E]/5
              blur-[80px]
            "
          />

          {/* =================================================
              DESKTOP LAYOUT
          ================================================= */}

          <div
            className="
              relative
              z-10
              flex
              flex-col
              gap-6

              lg:flex-row
              lg:items-center
              lg:gap-7
            "
          >

            {/* =================================================
                LEFT TITLE
            ================================================= */}

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
              }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                shrink-0

                lg:w-[205px]
                xl:w-[220px]
              "
            >

              <div className="flex items-center gap-2">

                <span
                  className="
                    font-quicksand
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.18em]
                    text-[#F5A623]
                  "
                >
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

              <h2
                className="
                  mt-1.5
                  font-outfit
                  text-[24px]
                  font-semibold
                  leading-[1.05]
                  tracking-[-0.035em]
                  text-white

                  sm:text-[27px]
                  lg:text-[29px]
                "
              >
                Explore
                <br />
                Categories
              </h2>

              <p
                className="
                  mt-2
                  max-w-[190px]
                  font-quicksand
                  text-[14px]
                  leading-4
                  text-white/55

                  sm:text-[11px]
                  sm:leading-5
                "
              >
                Protective packaging solutions
                designed for safe and secure
                transportation.
              </p>

              {/* SEE ALL */}

              <Link
                href="/products"
                className="
                  group
                  mt-3
                  inline-flex
                  items-center
                  gap-1.5
                  border-b
                  border-white/30
                  pb-1
                  font-quicksand
                  text-[13px]
                  font-semibold
                  text-white/80
                  transition-all
                  duration-300
                  hover:border-[#F5A623]
                  hover:text-[#F5A623]
                "
              >
                See all

                <ArrowUpRight
                  size={12}
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-0.5
                    group-hover:-translate-y-0.5
                  "
                />
              </Link>

            </motion.div>

            {/* =================================================
                CATEGORY CARDS
            ================================================= */}

            <div
              className="
                min-w-0
                flex-1
                overflow-x-auto
                scrollbar-hide
              "
            >

              <div
                className="
                  grid
                  grid-flow-col
                  auto-cols-[175px]
                  gap-3

                  sm:auto-cols-[190px]
                  sm:gap-4

                  lg:grid-flow-col
                  lg:auto-cols-fr
                "
              >

                {categories.map((category, index) => (

                  <motion.div
                   
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
                      className="
                        group
                        relative
                        block
                        overflow-hidden
                        rounded-[8px]
                        bg-[#F5F2ED]
                      "
                    >

                      {/* =================================================
                          IMAGE
                      ================================================= */}

                      <div
                        className="
                          relative
                          h-[125px]
                          overflow-hidden

                          sm:h-[135px]

                          lg:h-[140px]
                          xl:h-[145px]
                        "
                      >

                        <Image
                          src={category.image}
                          alt={category.name}
                          fill
                          sizes="200px"
                          className="
                            object-contain
                            p-3.5
                            transition-transform
                            duration-700
                            ease-out
                            group-hover:scale-[1.1]
                          "
                        />

                        {/* IMAGE OVERLAY */}

                        <div
                          className="
                            absolute
                            inset-0
                            bg-[#D95026]/0
                            transition-all
                            duration-500
                            group-hover:bg-[#D95026]/[0.05]
                          "
                        />

                        {/* NUMBER */}

                        <span
                          className="
                            absolute
                            left-2.5
                            top-2.5
                            flex
                            h-6
                            w-6
                            items-center
                            justify-center
                            rounded-full
                            bg-white/90
                            font-outfit
                            text-[8px]
                            font-bold
                            text-[#151515]
                            shadow-sm
                          "
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        {/* ARROW */}

                        <span
                          className="
                            absolute
                            right-2.5
                            top-2.5
                            flex
                            h-7
                            w-7
                            items-center
                            justify-center
                            rounded-full
                            bg-[#143D5E]
                            text-white
                            opacity-0
                            transition-all
                            duration-300
                            group-hover:opacity-100
                            group-hover:rotate-[-8deg]
                          "
                        >
                          <ArrowUpRight size={13} />
                        </span>

                      </div>

                      {/* =================================================
                          CARD TEXT
                      ================================================= */}

                      <div
                        className="
                          border-t
                          border-black/[0.06]
                          px-3
                          py-2.5
                        "
                      >

                        <h3
                          className="
                            line-clamp-1
                            font-outfit
                            text-[12px]
                            font-semibold
                            leading-tight
                            text-[#181818]
                            transition-colors
                            duration-300
                            group-hover:text-[#F5A623]

                            sm:text-[13px]
                          "
                        >
                          {category.name}
                        </h3>

                        <div
                          className="
                            mt-1.5
                            h-[2px]
                            w-5
                            bg-[#F5A623]
                            transition-all
                            duration-500
                            group-hover:w-9
                          "
                        />

                      </div>

                      {/* BOTTOM LINE */}

                      <div
                        className="
                          absolute
                          bottom-0
                          left-0
                          h-[2px]
                          w-0
                          bg-[#F5A623]
                          transition-all
                          duration-500
                          group-hover:w-full
                        "
                      />

                    </Link>

                  </motion.div>

                ))}

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}