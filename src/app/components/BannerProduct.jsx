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
    link: "https://packingairbag.com/categories/dunnage-bag",
    description:
      "Reliable cargo protection designed to prevent shifting and movement during transportation.",
    products: [
      {
        name: "Dunnage Air Bags",
        image: "https://packingairbag.com/cat/1.webp",
        tag: "DUNNAGE",
        link: "https://packingairbag.com/categories/dunnage-bag",
      },
      {
        name: "PP Dunnage Bag",
        image: "https://packingairbag.com/cat/1.webp",
        tag: "POPULAR",
        link: "https://packingairbag.com/categories/dunnage-bag",
      },
      {
        name: "Square Dunnage Air Bags",
        image: "https://packingairbag.com/cat/1.webp",
        tag: "CARGO",
        link: "https://packingairbag.com/categories/dunnage-bag",
      },
      {
        name: "Heavy Duty Dunnage Bag",
        image: "https://packingairbag.com/cat/1.webp",
        tag: "HEAVY DUTY",
        link: "https://packingairbag.com/categories/dunnage-bag",
      },
    ],
  },

  {
    id: "air-column-bags",
    number: "02",
    name: "Air Column Bags",
    shortName: "Air Column Bags",
    link: "https://packingairbag.com/categories/air-column-bag",
    description:
      "Inflatable cushioning solutions for protecting fragile and high-value products.",
    products: [
      {
        name: "Air Column Bag for Laptop",
        image: "https://packingairbag.com/cat/5.webp",
        tag: "FRAGILE",
        link: "https://packingairbag.com/categories/air-column-bag",
      },
      {
        name: "Air Column Bag for Electronics",
        image: "https://packingairbag.com/cat/5.webp",
        tag: "ELECTRONICS",
        link: "https://packingairbag.com/categories/air-column-bag",
      },
      {
        name: "Bottle Air Column Bag",
        image: "https://packingairbag.com/cat/5.webp",
        tag: "BOTTLE",
        link: "https://packingairbag.com/categories/air-column-bag",
      },
      {
        name: "Custom Air Column Bag",
        image: "https://packingairbag.com/cat/5.webp",
        tag: "CUSTOM",
        link: "https://packingairbag.com/categories/air-column-bag",
      },
    ],
  },

  {
    id: "air-column-roll",
    number: "03",
    name: "Air Column Rolls",
    shortName: "Air Column Rolls",
    link: "https://packingairbag.com/categories/air-column-roll",
    description:
      "Flexible roll-format cushioning for efficient product protection and packing.",
    products: [
      {
        name: "Air Column Roll",
        image: "https://packingairbag.com/cat/2.webp",
        tag: "ROLL",
        link: "https://packingairbag.com/categories/air-column-roll",
      },
      {
        name: "Protective Air Roll",
        image: "https://packingairbag.com/cat/2.webp",
        tag: "PROTECTION",
        link: "https://packingairbag.com/categories/air-column-roll",
      },
      {
        name: "Industrial Air Roll",
        image: "https://packingairbag.com/cat/2.webp",
        tag: "INDUSTRIAL",
        link: "https://packingairbag.com/categories/air-column-roll",
      },
      {
        name: "Custom Air Column Roll",
        image: "https://packingairbag.com/cat/2.webp",
        tag: "CUSTOM",
        link: "https://packingairbag.com/categories/air-column-roll",
      },
    ],
  },

  {
    id: "packaging-air-bags",
    number: "04",
    name: "Packaging Air Bags",
    shortName: "Packaging Air Bags",
    link: "https://packingairbag.com/categories/packaging-air-bag",
    description:
      "Lightweight air-filled packaging solutions for faster and cleaner product packing.",
    products: [
      {
        name: "Packaging Air Bag",
        image: "https://packingairbag.com/cat/3.webp",
        tag: "PACKAGING",
        link: "https://packingairbag.com/categories/packaging-air-bag",
      },
      {
        name: "Air Cushion Bag",
        image: "https://packingairbag.com/cat/3.webp",
        tag: "CUSHION",
        link: "https://packingairbag.com/categories/packaging-air-bag",
      },
      {
        name: "Void Fill Air Bag",
        image: "https://packingairbag.com/cat/3.webp",
        tag: "VOID FILL",
        link: "https://packingairbag.com/categories/packaging-air-bag",
      },
      {
        name: "Protective Air Bag",
        image: "https://packingairbag.com/cat/3.webp",
        tag: "PROTECTION",
        link: "https://packingairbag.com/categories/packaging-air-bag",
      },
    ],
  },

  {
    id: "gap-fillers",
    number: "05",
    name: "Gap Fillers",
    shortName: "Gap Fillers",
    link: "https://packingairbag.com/categories/gap-filler",
    description:
      "Practical void-filling solutions that keep products stable throughout transportation.",
    products: [
      {
        name: "Paper Gap Filler",
        image: "https://packingairbag.com/sideimg.png",
        tag: "GAP FILL",
        link: "https://packingairbag.com/categories/gap-filler",
      },
      {
        name: "Air Gap Filler",
        image: "https://packingairbag.com/sideimg.png",
        tag: "AIR",
        link: "https://packingairbag.com/categories/gap-filler",
      },
      {
        name: "Cargo Gap Filler",
        image: "https://packingairbag.com/sideimg.png",
        tag: "CARGO",
        link: "https://packingairbag.com/categories/gap-filler",
      },
      {
        name: "Heavy Duty Gap Filler",
        image: "https://packingairbag.com/sideimg.png",
        tag: "HEAVY DUTY",
        link: "https://packingairbag.com/categories/gap-filler",
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
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.45,
        delay: index * 0.06,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <Link
        href={product.link}
        target="_blank"
        rel="noopener noreferrer"
        className="group block"
      >
        <div
          className="
            relative
            overflow-hidden
            rounded-[14px]
            border
            border-[#DEDAD1]
            bg-white
            transition-all
            duration-500
            hover:-translate-y-1
            hover:border-[#C8C4BA]
            hover:shadow-[0_15px_35px_rgba(23,25,24,0.10)]
          "
        >
          {/* ==================================================
              IMAGE
          ================================================== */}

          <div
            className="
              relative
              h-[185px]
              overflow-hidden
              bg-[#F0EEE8]
              sm:h-[195px]
            "
          >
            {/* Product number */}

            <span
              className="
                absolute
                left-3
                top-3
                z-20
                font-mono
                text-[7px]
                font-bold
                text-[#969A91]
              "
            >
              0{index + 1}
            </span>

            {/* Product tag */}

            <span
              className="
                absolute
                right-3
                top-3
                z-20
                rounded-full
                bg-[#171918]
                px-2.5
                py-1.5
                text-[6px]
                font-bold
                uppercase
                tracking-[0.12em]
                text-white
              "
            >
              {product.tag}
            </span>

            {/* Product Image */}

            <div
              className="
                absolute
                inset-4
              "
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                unoptimized
                sizes="300px"
                className="
                  object-contain
                  transition-transform
                  duration-700
                  group-hover:scale-105
                "
              />
            </div>

            {/* Hover Arrow */}

            <div
              className="
                absolute
                bottom-3
                right-3
                flex
                h-8
                w-8
                translate-y-2
                items-center
                justify-center
                rounded-full
                bg-[#171918]
                text-white
                opacity-0
                transition-all
                duration-300
                group-hover:translate-y-0
                group-hover:opacity-100
              "
            >
              <ArrowUpRight
                size={13}
                strokeWidth={1.8}
              />
            </div>
          </div>

          {/* ==================================================
              PRODUCT INFO
          ================================================== */}

          <div className="p-3.5 sm:p-4">
            <p
              className="
                text-[6px]
                font-bold
                uppercase
                tracking-[0.18em]
                text-[#B38A38]
              "
            >
              DPACK PACKAGING
            </p>

            <h3
              className="
                mt-1.5
                min-h-[36px]
                text-[13px]
                font-bold
                leading-[1.25]
                tracking-[-0.02em]
                text-[#171918]
              "
            >
              {product.name}
            </h3>

            <div
              className="
                mt-3
                flex
                items-center
                justify-between
                border-t
                border-[#E8E4DC]
                pt-2.5
              "
            >
              <span
                className="
                  text-[6px]
                  font-bold
                  uppercase
                  tracking-[0.12em]
                  text-[#8B9188]
                "
              >
                Explore Product
              </span>

              <ArrowRight
                size={11}
                className="
                  text-[#B38A38]
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

export default function BannerProduct() {
  const [activeCategory, setActiveCategory] = useState(0);

  const active = categories[activeCategory];

  return (
    <section
      className="
        w-full
        overflow-hidden
        bg-[#F7F6F2]
        py-4
        sm:py-5
        lg:py-6
      "
    >
      <div
        className="
          mx-auto
          max-w-[1080px]
          px-3
          sm:px-5
          lg:px-6
        "
      >
        {/* ====================================================
            MAIN BANNER + PRODUCTS
        ==================================================== */}

        <div
          className="
            grid
            items-start
            gap-4
            lg:grid-cols-[minmax(300px,0.82fr)_minmax(0,1.5fr)]
            xl:grid-cols-[490px_minmax(0,1fr)]
          "
        >

          {/* ==================================================
              LEFT BANNER
          ================================================== */}

          <div
            className="
              relative
              h-[420px]
              overflow-hidden
              rounded-[18px]
              border
              border-[#D8D5CE]
              bg-[#EAE7DF]
              sm:h-[470px]
              lg:h-[515px]
              xl:h-[555px]
            "
          >
            <Image
              src="/left image.webp"
              alt="DPACK Packaging Solutions"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 490px"
            />

            {/* subtle overlay */}

            <div
              className="
                pointer-events-none
                absolute
                inset-0
                bg-gradient-to-t
                from-black/10
                via-transparent
                to-white/5
              "
            />
          </div>

          {/* ==================================================
              RIGHT PRODUCT AREA
          ================================================== */}

          <div className="min-w-0">

            {/* ==================================================
                CATEGORY TABS
            ================================================== */}

            <div
              className="
                mb-4
                flex
                gap-1.5
                overflow-x-auto
                pb-1
                [scrollbar-width:none]
                [&::-webkit-scrollbar]:hidden
              "
            >
              {categories.map((category, index) => {
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
                      flex
                      shrink-0
                      items-center
                      gap-2
                      rounded-full
                      border
                      px-3
                      py-2
                      transition-all
                      duration-300

                      ${
                        isActive
                          ? "border-[#171918] bg-[#171918] text-white"
                          : "border-[#D8D5CE] bg-white text-[#555951] hover:border-[#171918]"
                      }
                    `}
                  >
                    <span
                      className={`
                        font-mono
                        text-[6px]
                        font-bold
                        ${
                          isActive
                            ? "text-[#D5B56A]"
                            : "text-[#9A9D96]"
                        }
                      `}
                    >
                      {category.number}
                    </span>

                    <span
                      className="
                        text-[8px]
                        font-semibold
                        whitespace-nowrap
                      "
                    >
                      {category.shortName}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* ==================================================
                CATEGORY HEADING
            ================================================== */}

            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -8,
                }}
                transition={{
                  duration: 0.3,
                }}
                className="
                  mb-3
                  flex
                  items-end
                  justify-between
                  gap-3
                "
              >
                <div>
                  <p
                    className="
                      text-[6px]
                      font-bold
                      uppercase
                      tracking-[0.25em]
                      text-[#B38A38]
                    "
                  >
                    Category {active.number}
                  </p>

                  <h2
                    className="
                      mt-1
                      text-[24px]
                      font-black
                      leading-none
                      tracking-[-0.045em]
                      text-[#171918]
                      sm:text-[27px]
                    "
                  >
                    {active.name}
                  </h2>
                </div>

                <span
                  className="
                    hidden
                    text-[6px]
                    font-semibold
                    uppercase
                    tracking-[0.2em]
                    text-[#A0A49C]
                    sm:block
                  "
                >
                  3 Products
                </span>
              </motion.div>
            </AnimatePresence>

            {/* ==================================================
                3 PRODUCT GRID — ONLY ONE ROW
            ================================================== */}

            <AnimatePresence mode="wait">
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
                  y: -15,
                }}
                transition={{
                  duration: 0.35,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="
                  grid
                  grid-cols-1
                  gap-3
                  sm:grid-cols-3
                "
              >
                {/* ONLY FIRST 3 PRODUCTS */}

                {active.products
                  .slice(0, 3)
                  .map((product, index) => (
                    <ProductCard
                      key={`${active.id}-${index}`}
                      product={product}
                      index={index}
                    />
                  ))}
              </motion.div>
            </AnimatePresence>

            {/* ==================================================
                BOTTOM DESCRIPTION
            ================================================== */}

            <AnimatePresence mode="wait">
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
                  duration: 0.3,
                }}
                className="
                  mt-3
                  flex
                  items-center
                  justify-between
                  gap-3
                  rounded-[12px]
                  border
                  border-[#DDD9D0]
                  bg-white/60
                  px-4
                  py-3
                "
              >
                <p
                  className="
                    max-w-[500px]
                    text-[8px]
                    leading-4
                    text-[#74796F]
                    sm:text-[9px]
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
                    gap-2
                    text-[6px]
                    font-bold
                    uppercase
                    tracking-[0.12em]
                    text-[#171918]
                  "
                >
                  View All

                  <span
                    className="
                      flex
                      h-6
                      w-6
                      items-center
                      justify-center
                      rounded-full
                      bg-[#171918]
                      text-white
                    "
                  >
                    <ArrowRight size={10} />
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