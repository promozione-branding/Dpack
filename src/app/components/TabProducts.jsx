"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Package,
  Sparkles,
} from "lucide-react";

/* =========================================================
   PRODUCT DATA
========================================================= */

const categories = [
  {
    id: "dunnage",
    number: "01",
    name: "Dunnage Bags",
    shortName: "Dunnage Bags",
    description:
      "Reliable cargo protection designed to prevent shifting and movement during transportation.",
    image: "/dunnage.webp",

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
    image: "/Air column bag (2).webp",

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
    image: "/Air Column Roll (2).webp",

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
    image: "/packing bag.webp",

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
    image: "/Gap filler (3).webp",

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

/* =========================================================
   PRODUCT CARD
========================================================= */

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
        duration: 0.5,
        delay: index * 0.06,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="h-full min-w-0"
    >
      <Link
        href="/products"
        className="
          group
          flex
          h-full
          flex-col
          overflow-hidden

          rounded-[18px]
          border
          border-[#DFE6EA]
          bg-white

          transition-all
          duration-500

          hover:-translate-y-2
          hover:border-[#2F7180]/30
          hover:shadow-[0_24px_55px_rgba(18,59,93,0.14)]
        "
      >
        {/* ================= IMAGE ================= */}

        <div
          className="
            relative
            aspect-square
            overflow-hidden
            bg-[#F4F7F9]
          "
        >
          {/* Product Tag */}

          <span
            className="
              absolute
              left-3
              top-3
              z-20

              rounded-[6px]
              bg-[#F5A623]

              px-3
              py-1.5

              text-[10px]
              font-black
              uppercase
              tracking-[0.05em]
              text-[#123B5D]
            "
          >
            {product.tag}
          </span>

          {/* Wishlist */}

          <button
            type="button"
            aria-label="Add to wishlist"
            onClick={(e) => e.preventDefault()}
            className="
              absolute
              right-3
              top-3
              z-20

              flex
              h-9
              w-9
              items-center
              justify-center

              rounded-full
              bg-white

              text-[18px]
              text-[#123B5D]

              shadow-sm

              transition-all
              duration-300

              hover:bg-[#123B5D]
              hover:text-white
            "
          >
            ♡
          </button>

          {/* Product Image */}

          <div className="absolute inset-5 sm:inset-6">
            <Image
              src={product.image}
              alt={product.name}
              fill
              unoptimized
              sizes="(max-width: 768px) 50vw, 260px"
              className="
                object-contain

                transition-all
                duration-700
                ease-out

                group-hover:scale-110
                group-hover:-rotate-2
              "
            />
          </div>

          {/* Hover Button */}

          <div
            className="
              absolute
              bottom-3
              left-3
              right-3
              z-20

              translate-y-4
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

                rounded-full
                bg-[#123B5D]

                px-4
                py-3

                text-[11px]
                font-bold
                uppercase
                tracking-[0.08em]
                text-white
              "
            >
              View Product
              <ArrowUpRight size={14} />
            </div>
          </div>
        </div>

        {/* ================= DETAILS ================= */}

        <div
          className="
            flex
            flex-1
            flex-col
            p-4
            sm:p-5
          "
        >
          <p
            className="
              text-[10px]
              font-black
              uppercase
              tracking-[0.1em]
              text-[#2F7180]
            "
          >
            DPACK PACKAGING
          </p>

          <h3
            className="
              mt-2
              min-h-[42px]

              text-[15px]
              font-bold
              leading-5
              tracking-[-0.02em]
              text-[#172321]
            "
          >
            {product.name}
          </h3>

          {/* Rating */}

          <div
            className="
              mt-3
              flex
              flex-wrap
              items-center
              gap-1
            "
          >
            <span className="text-[12px] tracking-[1px] text-[#F5A623]">
              ★★★★★
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function CategoryProducts() {
  const [activeCategory, setActiveCategory] = useState(0);

  const active = categories[activeCategory];

  return (
    <section
      className="
        relative
        overflow-hidden

        bg-[#F4F7F9]

        py-12
        sm:py-14
        lg:py-16
      "
    >
      {/* ===================================================
          BACKGROUND DECORATION
      =================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -right-40
          top-10

          h-[450px]
          w-[450px]

          rounded-full
          bg-[#DCE7ED]

          blur-[120px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -left-40
          bottom-0

          h-[350px]
          w-[350px]

          rounded-full
          bg-[#E7EEF2]

          blur-[100px]
        "
      />

      {/* ===================================================
          CONTAINER
      =================================================== */}

      <div
        className="
          relative
          z-10

          mx-auto
          w-full
          max-w-[1500px]

          px-4
          sm:px-6
          lg:px-10
          xl:px-12
        "
      >
        {/* =================================================
            HEADER
        ================================================= */}

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
            amount: 0.2,
          }}
          transition={{
            duration: 0.7,
          }}
          className="
            mb-7

            flex
            flex-col
            gap-5

            lg:flex-row
            lg:items-end
            lg:justify-between
          "
        >
          {/* LEFT */}

          <div>
            <div
              className="
                mb-3
                flex
                items-center
                gap-3
              "
            >
              <span
                className="
                  h-[3px]
                  w-10
                  rounded-full
                  bg-[#F5A623]
                "
              />

              <span
                className="
                  text-[11px]
                  font-black
                  uppercase
                  tracking-[0.18em]
                  text-[#2F7180]
                "
              >
                Shop by category
              </span>
            </div>

            <h2
              className="
                max-w-[700px]

                text-[34px]
                font-black
                leading-[0.95]
                tracking-[-0.05em]
                text-[#172321]

                sm:text-[44px]
                lg:text-[54px]
              "
            >
              Packaging made for
              <span className="text-[#123B5D]">
                {" "}
                every shipment.
              </span>
            </h2>
          </div>

          {/* RIGHT */}

          <div className="max-w-[420px]">
            <p
              className="
                text-[13px]
                leading-6
                text-[#66737D]
              "
            >
              Explore protective packaging solutions designed
              for safer transportation, efficient packing and
              reliable product protection.
            </p>

            <Link
              href="/products"
              className="
                group
                mt-4

                inline-flex
                items-center
                gap-3

                text-[11px]
                font-black
                uppercase
                tracking-[0.08em]
                text-[#123B5D]
              "
            >
              Browse all products

              <span
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center

                  rounded-full
                  bg-[#F5A623]

                  transition-transform
                  duration-300

                  group-hover:translate-x-1
                "
              >
                <ArrowRight size={14} />
              </span>
            </Link>
          </div>
        </motion.div>

        {/* =================================================
            CATEGORY TABS
        ================================================= */}

        <div
          className="
            mb-5

            flex
            gap-2
            overflow-x-auto

            rounded-[15px]
            border
            border-[#DDE5EA]
            bg-white

            p-1.5

            shadow-[0_8px_30px_rgba(18,59,93,0.04)]

            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
          "
        >
          {categories.map((category, index) => {
            const selected = activeCategory === index;

            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveCategory(index)}
                className={[
                  "relative",
                  "flex",
                  "min-w-max",
                  "flex-1",
                  "items-center",
                  "justify-center",
                  "gap-2",
                  "overflow-hidden",
                  "rounded-[10px]",
                  "px-4",
                  "py-3",
                  "text-[13px]",
                  "font-bold",
                  "transition-colors",
                  "duration-300",

                  selected
                    ? "text-white"
                    : "text-[#66737D] hover:bg-[#F4F7F9] hover:text-[#123B5D]",
                ].join(" ")}
              >
                {/* ACTIVE BACKGROUND */}

                {selected && (
                  <motion.div
                    layoutId="activeCategory"
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 30,
                    }}
                    className="
                      absolute
                      inset-0

                      rounded-[10px]
                      bg-[#123B5D]
                    "
                  />
                )}

                {/* NUMBER */}

                <span
                  className={[
                    "relative",
                    "z-10",
                    "font-mono",
                    "text-[10px]",
                    "font-bold",

                    selected
                      ? "text-[#F5A623]"
                      : "text-[#9AA6A1]",
                  ].join(" ")}
                >
                  {category.number}
                </span>

                {/* NAME */}

                <span className="relative z-10">
                  {category.shortName}
                </span>
              </button>
            );
          })}
        </div>

        {/* =================================================
            ACTIVE CATEGORY
        ================================================= */}

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
              y: -10,
            }}
            transition={{
              duration: 0.4,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div
              className="
                grid
                gap-4

                lg:grid-cols-[1.05fr_2.95fr]
              "
            >
              {/* ===========================================
                  FEATURED CATEGORY
              =========================================== */}

              <Link
                href="/products"
                className="
                  group
                  relative

                  min-h-[350px]
                  overflow-hidden

                  rounded-[20px]

                  bg-[#E5EDF2]

                  sm:min-h-[380px]
                  lg:min-h-[390px]
                "
              >
                {/* Decorative Circle */}

                <div
                  className="
                    absolute
                    -right-20
                    -top-20

                    h-64
                    w-64

                    rounded-full
                    bg-[#F5A623]/15

                    transition-transform
                    duration-700

                    group-hover:scale-125
                  "
                />

                {/* Blue Decorative Circle */}

                <div
                  className="
                    absolute
                    -bottom-24
                    -left-24

                    h-56
                    w-56

                    rounded-full
                    bg-[#123B5D]/[0.05]

                    transition-transform
                    duration-700

                    group-hover:scale-125
                  "
                />

                {/* TEXT */}

                <div
                  className="
                    relative
                    z-20

                    p-6
                    sm:p-7
                  "
                >
                  {/* Badge */}

                  <span
                    className="
                      inline-flex

                      rounded-full
                      bg-[#123B5D]

                      px-3.5
                      py-2

                      text-[10px]
                      font-black
                      uppercase
                      tracking-[0.08em]
                      text-white
                    "
                  >
                    Featured Category
                  </span>

                  {/* Category Number */}

                  <p
                    className="
                      mt-5

                      font-mono
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-[0.08em]
                      text-[#2F7180]
                    "
                  >
                    Category {active.number}
                  </p>

                  {/* Category Name */}

                  <h3
                    className="
                      mt-2
                      max-w-[310px]

                      text-[30px]
                      font-black
                      leading-[0.95]
                      tracking-[-0.05em]
                      text-[#123B5D]

                      sm:text-[36px]
                    "
                  >
                    {active.name}
                  </h3>

                  {/* Description */}

                  <p
                    className="
                      mt-3
                      max-w-[330px]

                      text-[12px]
                      leading-5
                      text-[#66737D]
                    "
                  >
                    {active.description}
                  </p>
                </div>

                {/* GIANT NUMBER */}

                <span
                  className="
                    pointer-events-none

                    absolute
                    -right-2
                    top-3

                    text-[130px]
                    font-black
                    leading-none

                    text-[#123B5D]/[0.045]
                  "
                >
                  {active.number}
                </span>

                {/* PRODUCT IMAGE */}

                <motion.div
                  key={active.image}
                  initial={{
                    opacity: 0,
                    scale: 0.85,
                    x: 25,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    x: 0,
                    y: [0, -6, 0],
                  }}
                  transition={{
                    opacity: {
                      duration: 0.4,
                    },

                    scale: {
                      duration: 0.6,
                    },

                    x: {
                      duration: 0.6,
                    },

                    y: {
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }}
                  className="
                    absolute
                    bottom-1
                    right-0

                    h-[46%]
                    w-[62%]

                    sm:h-[49%]
                    sm:w-[62%]
                  "
                >
                  <Image
                    src={active.image}
                    alt={active.name}
                    fill
                    unoptimized
                    sizes="500px"
                    className="
                      object-contain

                      drop-shadow-[0_20px_25px_rgba(18,59,93,0.16)]
                    "
                  />
                </motion.div>

                {/* CTA CIRCLE */}

                <div
                  className="
                    absolute
                    bottom-5
                    left-6
                    z-30

                    flex
                    h-11
                    w-11
                    items-center
                    justify-center

                    rounded-full
                    bg-[#F5A623]

                    text-[#123B5D]

                    transition-all
                    duration-300

                    group-hover:rotate-45
                    group-hover:scale-110
                  "
                >
                  <ArrowUpRight size={17} />
                </div>
              </Link>

              {/* ===========================================
                  PRODUCT GRID
              =========================================== */}

              <div
                className="
                  grid
                  grid-cols-2
                  gap-3

                  sm:gap-4
                  xl:grid-cols-4
                "
              >
                {active.products.map((product, index) => (
                  <ProductCard
                    key={`${active.id}-${product.name}`}
                    product={product}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* =================================================
            BULK ORDER BANNER
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
          }}
          className="
            relative
            mt-4

            overflow-hidden

            rounded-[18px]
            bg-[#123B5D]
          "
        >
          {/* Decoration */}

          <div
            className="
              absolute
              -left-12
              -top-16

              h-40
              w-40

              rounded-full
              border-[30px]
              border-white/[0.03]
            "
          />

          <div
            className="
              absolute
              -bottom-24
              right-[20%]

              h-52
              w-52

              rounded-full
              bg-[#2F7180]

              opacity-40
              blur-2xl
            "
          />

          {/* CONTENT */}

          <div
            className="
              relative
              z-10

              flex
              flex-col
              gap-5

              px-6
              py-6

              sm:flex-row
              sm:items-center
              sm:justify-between

              lg:px-8
              lg:py-7
            "
          >
            {/* LEFT */}

            <div className="flex items-center gap-4">
              <div
                className="
                  flex
                  h-12
                  w-12
                  shrink-0

                  items-center
                  justify-center

                  rounded-full
                  bg-[#F5A623]

                  text-[#123B5D]
                "
              >
                <Package size={20} />
              </div>

              <div>
                <div
                  className="
                    flex
                    items-center
                    gap-2
                  "
                >
                  <Sparkles
                    size={13}
                    className="text-[#F5A623]"
                  />

                  <span
                    className="
                      text-[10px]
                      font-black
                      uppercase
                      tracking-[0.12em]
                      text-[#F5A623]
                    "
                  >
                    Business Packaging
                  </span>
                </div>

                <h4
                  className="
                    mt-1.5

                    text-[17px]
                    font-bold
                    tracking-[-0.025em]
                    text-white

                    sm:text-[20px]
                  "
                >
                  Need custom sizes or bulk packaging?
                </h4>

                <p
                  className="
                    mt-1.5
                    text-[11px]
                    leading-5
                    text-white/60
                  "
                >
                  Talk to our team for custom requirements
                  and business pricing.
                </p>
              </div>
            </div>

            {/* CTA */}

            <Link
              href="/contact"
              className="
                group

                flex
                w-fit
                shrink-0
                items-center
                gap-3

                rounded-full
                bg-[#F5A623]

                px-5
                py-3

                text-[11px]
                font-black
                uppercase
                tracking-[0.08em]
                text-[#123B5D]

                transition-all
                duration-300

                hover:-translate-y-1
                hover:bg-white
                hover:shadow-xl
              "
            >
              Request a Quote

              <ArrowUpRight
                size={15}
                className="
                  transition-transform
                  duration-300
                  group-hover:rotate-45
                "
              />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}