"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";

/* ============================================================
   PRODUCT DATA
============================================================ */

const categories = [
  {
    id: "dunnage",
    number: "01",
    name: "Dunnage Bags",
    shortName: "Dunnage Bags",
    description:
      "Reliable cargo protection designed to prevent shifting and movement during transportation.",
    products: [
      {
        name: "Dunnage Air Bags",
        image: "https://packingairbag.com/cat/1.webp",
        tag: "DUNNAGE",
      },
      {
        name: "PP Dunnage Bag",
        image: "https://packingairbag.com/cat/1.webp",
        tag: "POPULAR",
      },
      {
        name: "Square Dunnage Air Bags",
        image: "https://packingairbag.com/cat/1.webp",
        tag: "CARGO",
      },
      {
        name: "Heavy Duty Dunnage Bag",
        image: "https://packingairbag.com/cat/1.webp",
        tag: "HEAVY DUTY",
      },
    ],
  },

  {
    id: "air-column-bags",
    number: "02",
    name: "Air Column Bags",
    shortName: "Air Column Bags",
    description:
      "Inflatable cushioning solutions for protecting fragile and high-value products.",
    products: [
      {
        name: "Air Column Bag for Laptop",
        image: "https://packingairbag.com/cat/5.webp",
        tag: "FRAGILE",
      },
      {
        name: "Air Column Bag for Electronics",
        image: "https://packingairbag.com/cat/5.webp",
        tag: "ELECTRONICS",
      },
      {
        name: "Bottle Air Column Bag",
        image: "https://packingairbag.com/cat/5.webp",
        tag: "BOTTLE",
      },
      {
        name: "Custom Air Column Bag",
        image: "https://packingairbag.com/cat/5.webp",
        tag: "CUSTOM",
      },
    ],
  },

  {
    id: "air-column-roll",
    number: "03",
    name: "Air Column Rolls",
    shortName: "Air Column Rolls",
    description:
      "Flexible roll-format cushioning for efficient product protection and packing.",
    products: [
      {
        name: "Air Column Roll",
        image: "https://packingairbag.com/cat/2.webp",
        tag: "ROLL",
      },
      {
        name: "Protective Air Roll",
        image: "https://packingairbag.com/cat/2.webp",
        tag: "PROTECTION",
      },
      {
        name: "Industrial Air Roll",
        image: "https://packingairbag.com/cat/2.webp",
        tag: "INDUSTRIAL",
      },
      {
        name: "Custom Air Column Roll",
        image: "https://packingairbag.com/cat/2.webp",
        tag: "CUSTOM",
      },
    ],
  },

  {
    id: "packaging-air-bags",
    number: "04",
    name: "Packaging Air Bags",
    shortName: "Packaging Air Bags",
    description:
      "Lightweight air-filled packaging solutions for faster and cleaner product packing.",
    products: [
      {
        name: "Packaging Air Bag",
        image: "https://packingairbag.com/cat/3.webp",
        tag: "PACKAGING",
      },
      {
        name: "Air Cushion Bag",
        image: "https://packingairbag.com/cat/3.webp",
        tag: "CUSHION",
      },
      {
        name: "Void Fill Air Bag",
        image: "https://packingairbag.com/cat/3.webp",
        tag: "VOID FILL",
      },
      {
        name: "Protective Air Bag",
        image: "https://packingairbag.com/cat/3.webp",
        tag: "PROTECTION",
      },
    ],
  },

  {
    id: "gap-fillers",
    number: "05",
    name: "Gap Fillers",
    shortName: "Gap Fillers",
    description:
      "Practical void-filling solutions that keep products stable throughout transportation.",
    products: [
      {
        name: "Paper Gap Filler",
        image: "https://packingairbag.com/sideimg.png",
        tag: "GAP FILL",
      },
      {
        name: "Air Gap Filler",
        image: "https://packingairbag.com/sideimg.png",
        tag: "AIR",
      },
      {
        name: "Cargo Gap Filler",
        image: "https://packingairbag.com/sideimg.png",
        tag: "CARGO",
      },
      {
        name: "Heavy Duty Gap Filler",
        image: "https://packingairbag.com/sideimg.png",
        tag: "HEAVY DUTY",
      },
    ],
  },
];

/* ============================================================
   PRODUCT CARD
============================================================ */

function ProductCard({ product, index }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 25,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.55,
        delay: index * 0.07,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <Link
        href="/products"
        className="group block"
      >
        <div
          className="
            relative
            overflow-hidden
            rounded-[16px]
            border
            border-[#DEDAD1]
            bg-white
            transition-all
            duration-500
            hover:-translate-y-1.5
            hover:border-[#C8C4BA]
            hover:shadow-[0_18px_45px_rgba(23,25,24,0.10)]
          "
        >
          {/* ==================================================
              IMAGE
          ================================================== */}

          <div
            className="
              relative
              aspect-[1.15]
              overflow-hidden
              bg-[#F0EEE8]
            "
          >
            {/* number */}

            <span
              className="
                absolute
                left-4
                top-4
                z-20
                font-mono
                text-[8px]
                font-bold
                text-[#969A91]
              "
            >
              0{index + 1}
            </span>

            {/* tag */}

            <span
              className="
                absolute
                right-4
                top-4
                z-20
                rounded-full
                bg-[#171918]
                px-2.5
                py-1.5
                text-[6px]
                font-bold
                uppercase
                tracking-[0.15em]
                text-white
              "
            >
              {product.tag}
            </span>

            {/* product image */}

            <div
              className="
                absolute
                inset-5
              "
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                unoptimized
                sizes="350px"
                className="
                  object-contain
                  transition-transform
                  duration-700
                  group-hover:scale-110
                "
              />
            </div>

            {/* hover circle */}

            <div
              className="
                absolute
                bottom-4
                right-4
                flex
                h-9
                w-9
                translate-y-2
                items-center
                justify-center
                rounded-full
                bg-[#E9B95F]
                text-white
                opacity-0
                transition-all
                duration-400
                group-hover:translate-y-0
                group-hover:opacity-100
              "
            >
              <ArrowUpRight
                size={14}
                strokeWidth={1.6}
              />
            </div>
          </div>

          {/* ==================================================
              INFO
          ================================================== */}

          <div className="p-4 sm:p-5">

            <p
              className="
                text-[7px]
                font-bold
                uppercase
                tracking-[0.2em]
                text-[##E9B95F]
              "
            >
              DPACK PACKAGING
            </p>

            <h3
              className="
                mt-1.5
                text-[15px]
                font-bold
                leading-tight
                tracking-[-0.025em]
                text-[#171918]
              "
            >
              {product.name}
            </h3>

            <div
              className="
                mt-4
                flex
                items-center
                justify-between
                border-t
                border-[#E8E4DC]
                pt-3
              "
            >
              <span
                className="
                  text-[7px]
                  font-bold
                  uppercase
                  tracking-[0.15em]
                  text-[#8B9188]
                "
              >
                Get Best Price
              </span>

              <ArrowRight
                size={12}
                className="
                  text-[##E9B95F]
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />
            </div>

          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ============================================================
   MAIN COMPONENT
============================================================ */

export default function CategoryProducts() {
  const [activeCategory, setActiveCategory] =
    useState(0);

  const active =
    categories[activeCategory];

  return (
    <section
      className="
        w-full
        overflow-hidden
        bg-[#F7F2EB]
        py-16
        sm:py-20
        lg:py-24
      "
    >
      <div
        className="
          mx-auto
          max-w-[1450px]
          px-5
          sm:px-8
          lg:px-12
        "
      >

        {/* ====================================================
            HEADER
        ==================================================== */}

        <div
          className="
            mb-10
            flex
            flex-col
            justify-between
            gap-5
            lg:mb-12
            lg:flex-row
            lg:items-end
          "
        >

          <div>

            <div
              className="
                mb-4
                flex
                items-center
                gap-3
              "
            >
              <span
                className="
                  h-[2px]
                  w-8
                  bg-[##E9B95F]
                "
              />

              <span
                className="
                  text-[8px]
                  font-bold
                  uppercase
                  tracking-[0.3em]
                  text-[#74796F]
                "
              >
                Product Collection
              </span>
            </div>

            <h2
              className="
                text-[38px]
                font-black
                leading-[0.92]
                tracking-[-0.06em]
                text-[#171918]
                sm:text-[48px]
                lg:text-[58px]
              "
            >
              Find the right
              <br />

              <span className="text-[##E9B95F]">
                packaging solution.
              </span>
            </h2>

          </div>

          <p
            className="
              max-w-[410px]
              text-[12px]
              leading-6
              text-[#74796F]
              sm:text-[13px]
            "
          >
            Explore our packaging range by category
            and find solutions designed around
            protection, performance and efficiency.
          </p>

        </div>

        {/* ====================================================
            MAIN SPLIT LAYOUT
        ==================================================== */}

        <div
          className="
            grid
            gap-6
            lg:grid-cols-[250px_1fr]
            xl:grid-cols-[280px_1fr]
          "
        >

          {/* ==================================================
              LEFT CATEGORY NAV
          ================================================== */}

          <aside
            className="
              lg:sticky
              lg:top-24
              lg:self-start
            "
          >

            <div
              className="
                rounded-[20px]
                border
                border-[#DDD9D0]
                bg-white/55
                p-3
              "
            >

              {/* nav label */}

              <div
                className="
                  px-4
                  pb-3
                  pt-2
                "
              >
                <span
                  className="
                    text-[12px]
                    font-bold
                    uppercase
                    tracking-[0.25em]
                    text-[#A0A49C]
                  "
                >
                  Categories
                </span>
              </div>

              {/* tabs */}

              <div
                className="
                  flex
                  gap-2
                  overflow-x-auto
                  lg:block
                  lg:overflow-visible
                  [scrollbar-width:none]
                  [&::-webkit-scrollbar]:hidden
                "
              >

                {categories.map(
                  (category, index) => {
                    const isActive =
                      activeCategory === index;

                    return (
                      <button
                        key={category.id}
                        type="button"
                        onClick={() =>
                          setActiveCategory(index)
                        }
                        className={`
                          group
                          relative
                          flex
                          min-w-[185px]
                          items-center
                          gap-4
                          rounded-[14px]
                          px-4
                          py-4
                          text-left
                          transition-all
                          duration-400
                          lg:min-w-0
                          lg:w-full
                          ${
                            isActive
                              ? "bg-[#171918] text-white shadow-[0_12px_30px_rgba(23,25,24,0.12)]"
                              : "text-[#74796F] hover:bg-[#EAE6DE]"
                          }
                        `}
                      >

                        {/* number */}

                        <span
                          className={`
                            font-mono
                            text-[8px]
                            font-bold
                            ${
                              isActive
                                ? "text-[#AAB596]"
                                : "text-[#A1A59D]"
                            }
                          `}
                        >
                          {category.number}
                        </span>

                        {/* name */}

                        <span
                          className="
                            flex-1
                            text-[15px]
                            font-bold
                            leading-tight
                          "
                        >
                          {category.shortName}
                        </span>

                        {/* arrow */}

                        <ArrowRight
                          size={13}
                          className={`
                            shrink-0
                            transition-all
                            duration-300
                            ${
                              isActive
                                ? "translate-x-0 text-[#AAB596] opacity-100"
                                : "-translate-x-1 opacity-0"
                            }
                          `}
                        />

                        {/* active indicator */}

                        {isActive && (
                          <motion.span
                            layoutId="categoryIndicator"
                            className="
                              absolute
                              bottom-3
                              left-4
                              h-[2px]
                              w-5
                              bg-[##E9B95F]
                            "
                          />
                        )}

                      </button>
                    );
                  }
                )}

              </div>
            </div>

            {/* ==================================================
                SIDE META
            ================================================== */}

            <div
              className="
                mt-4
                hidden
                rounded-[18px]
                bg-[##E9B95F]
                p-5
                lg:block
              "
            >

              <p
                className="
                  text-[8px]
                  font-bold
                  uppercase
                  tracking-[0.2em]
                  text-white/60
                "
              >
                Need bulk packaging?
              </p>

              <p
                className="
                  mt-2
                  text-[13px]
                  font-bold
                  leading-5
                  text-[#171918]
                "
              >
                Get customized sizes
                and business pricing.
              </p>

              <Link
                href="/contact"
                className="
                  mt-4
                  flex
                  items-center
                  justify-between
                  border-t
                  border-black/10
                  pt-3
                  text-[8px]
                  font-bold
                  uppercase
                  tracking-[0.12em]
                  text-[#171918]
                "
              >
                Request Quote

                <ArrowUpRight size={13} />
              </Link>

            </div>

          </aside>

          {/* ==================================================
              RIGHT PRODUCT AREA
          ================================================== */}

          <div className="min-w-0">

            {/* category heading */}

            <AnimatePresence
              mode="wait"
            >
              <motion.div
                key={active.id}
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -10,
                }}
                transition={{
                  duration: 0.35,
                }}
                className="
                  mb-5
                  flex
                  items-end
                  justify-between
                  gap-4
                "
              >

                <div>

                  <p
                    className="
                      text-[8px]
                      font-bold
                      uppercase
                      tracking-[0.2em]
                      text-[##E9B95F]
                    "
                  >
                    Category {active.number}
                  </p>

                  <h3
                    className="
                      mt-1
                      text-[25px]
                      font-black
                      tracking-[-0.04em]
                      text-[#171918]
                      sm:text-[29px]
                    "
                  >
                    {active.name}
                  </h3>

                </div>

                <span
                  className="
                    hidden
                    text-[8px]
                    font-semibold
                    uppercase
                    tracking-[0.2em]
                    text-[#A0A49C]
                    sm:block
                  "
                >
                  {active.products.length} Products
                </span>

              </motion.div>
            </AnimatePresence>

            {/* ==================================================
                PRODUCTS GRID
            ================================================== */}

            <AnimatePresence
              mode="wait"
            >

              <motion.div
                key={active.id}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -20,
                }}
                transition={{
                  duration: 0.4,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="
                  grid
                  grid-cols-2
                  gap-3
                  sm:gap-4
                  xl:grid-cols-4
                "
              >

                {active.products.map(
                  (product, index) => (
                    <ProductCard
                      key={`${active.id}-${index}`}
                      product={product}
                      index={index}
                    />
                  )
                )}

              </motion.div>

            </AnimatePresence>

            {/* ==================================================
                BOTTOM CATEGORY DESCRIPTION
            ================================================== */}

            <AnimatePresence
              mode="wait"
            >

              <motion.div
                key={`description-${active.id}`}
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
                  duration: 0.35,
                }}
                className="
                  mt-5
                  flex
                  flex-col
                  justify-between
                  gap-4
                  rounded-[16px]
                  border
                  border-[#DDD9D0]
                  bg-white/45
                  px-5
                  py-4
                  sm:flex-row
                  sm:items-center
                "
              >

                <p
                  className="
                    max-w-[600px]
                    text-[10px]
                    leading-5
                    text-[#74796F]
                    sm:text-[11px]
                  "
                >
                  {active.description}
                </p>

                <Link
                  href="/products"
                  className="
                    flex
                    shrink-0
                    items-center
                    gap-3
                    text-[8px]
                    font-bold
                    uppercase
                    tracking-[0.15em]
                    text-[#171918]
                  "
                >
                  View All Products

                  <span
                    className="
                      flex
                      h-7
                      w-7
                      items-center
                      justify-center
                      rounded-full
                      bg-[##E9B95F]
                      text-white
                    "
                  >
                    <ArrowRight size={12} />
                  </span>

                </Link>

              </motion.div>

            </AnimatePresence>

          </div>
        </div>
      </div>
    </section>
  );
}