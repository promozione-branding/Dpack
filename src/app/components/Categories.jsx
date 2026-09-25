"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";

/* =========================================================
   CATEGORIES
========================================================= */

const categories = [
  {
    number: "01",
    name: "Dunnage Bag",
    image: "https://packingairbag.com/cat/1.webp",
    link: "https://packingairbag.com/categories/dunnage-bag",
    description:
      "Secure cargo and prevent movement during transportation.",
    tag: "Cargo Protection",
  },

  {
    number: "02",
    name: "Air Column Roll",
    image: "https://packingairbag.com/cat/2.webp",
    link: "https://packingairbag.com/categories/air-column-roll",
    description:
      "Flexible cushioning designed for fragile products.",
    tag: "Cushioning",
  },

  {
    number: "03",
    name: "Air Column Bag",
    image: "https://packingairbag.com/cat/5.webp",
    link: "https://packingairbag.com/categories/air-column-bag",
    description:
      "Lightweight inflatable protection for safer shipping.",
    tag: "Product Protection",
  },

  {
    number: "04",
    name: "Packaging Air Bag",
    image: "https://packingairbag.com/cat/3.webp",
    link: "https://packingairbag.com/categories/packaging-air-bag",
    description:
      "Efficient air packaging made for modern logistics.",
    tag: "Air Packaging",
  },

  {
    number: "05",
    name: "Gap Filler",
    image: "https://packingairbag.com/sideimg.png",
    link: "https://packingairbag.com/categories/gap-filler",
    description:
      "Fill empty spaces and keep packages stable in transit.",
    tag: "Void Fill",
  },
];

/* =========================================================
   CATEGORY CARD
========================================================= */

function CategoryCard({ item, index }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 35,
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
        duration: 0.65,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="h-full"
    >
      <Link
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        className="
          group
          relative
          flex
          h-full
          flex-col
          overflow-hidden
          rounded-[18px]
          border
          border-[#E2E7EA]
          bg-white
          shadow-[0_5px_25px_rgba(18,59,93,0.04)]
          transition-all
          duration-500
          hover:-translate-y-2
          hover:border-[#D5DDE1]
          hover:shadow-[0_18px_45px_rgba(18,59,93,0.12)]
        "
      >
        {/* =================================================
            IMAGE
        ================================================= */}

        <div
          className="
            relative
            h-[190px]
            overflow-hidden
            bg-[#F4F6F7]

            sm:h-[205px]

            lg:h-[185px]

            xl:h-[205px]
          "
        >
          <Image
            src={item.image}
            alt={item.name}
            fill
            unoptimized
            sizes="
              (max-width: 640px) 100vw,
              (max-width: 1024px) 50vw,
              20vw
            "
            className="
              object-cover
              transition-transform
              duration-700
              ease-out
              group-hover:scale-[1.08]
            "
          />

          {/* IMAGE GRADIENT */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              bg-gradient-to-t
              from-[#123B5D]/35
              via-transparent
              to-transparent
              opacity-60
              transition-opacity
              duration-500
              group-hover:opacity-90
            "
          />

          {/* NUMBER */}

          <div
            className="
              absolute
              left-4
              top-4
              z-10
              flex
              h-8
              min-w-8
              items-center
              justify-center
              rounded-full
              bg-white/95
              px-2
              shadow-sm
            "
          >
            <span
              className="
                font-mono
                text-[10px]
                font-bold
                tracking-wide
                text-[#123B5D]
              "
            >
              {item.number}
            </span>
          </div>

          {/* TAG */}

          <div
            className="
              absolute
              right-4
              top-4
              z-10
              rounded-full
              bg-[#F5A623]
              px-3
              py-1.5
              shadow-sm
            "
          >
            <span
              className="
                text-[9px]
                font-black
                uppercase
                tracking-[0.08em]
                text-[#123B5D]
              "
            >
              {item.tag}
            </span>
          </div>

          {/* HOVER ARROW */}

          <div
            className="
              absolute
              bottom-4
              right-4
              z-20
              flex
              h-10
              w-10
              translate-y-3
              items-center
              justify-center
              rounded-full
              bg-white
              text-[#123B5D]
              opacity-0
              shadow-lg
              transition-all
              duration-300
              group-hover:translate-y-0
              group-hover:opacity-100
            "
          >
            <ArrowUpRight
              size={17}
              strokeWidth={2}
              className="
                transition-transform
                duration-300
                group-hover:rotate-45
              "
            />
          </div>
        </div>

        {/* =================================================
            CONTENT
        ================================================= */}

        <div
          className="
            flex
            flex-1
            flex-col
            px-5
            pb-5
            pt-5
          "
        >
          {/* SMALL LABEL */}

          <div
            className="
              mb-2
              flex
              items-center
              gap-2
            "
          >
            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-[#F5A623]
              "
            />

            <span
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.12em]
                text-[#2F7180]
              "
            >
              Packaging Solution
            </span>
          </div>

          {/* TITLE */}

          <h3
            className="
              text-[18px]
              font-black
              leading-[1.15]
              tracking-[-0.025em]
              text-[#202830]
              transition-colors
              duration-300
              group-hover:text-[#123B5D]
            "
          >
            {item.name}
          </h3>

          {/* DESCRIPTION */}

          <p
            className="
              mt-2
              line-clamp-2
              text-[12px]
              leading-[1.6]
              text-[#66737D]
            "
          >
            {item.description}
          </p>

          {/* CTA */}

          <div
            className="
              mt-5
              flex
              items-center
              justify-between
              border-t
              border-[#E8ECEE]
              pt-4
            "
          >
            <span
              className="
                text-[11px]
                font-black
                uppercase
                tracking-[0.08em]
                text-[#123B5D]
              "
            >
              Explore Category
            </span>

            <span
              className="
                flex
                h-7
                w-7
                items-center
                justify-center
                rounded-full
                bg-[#F5A623]/15
                text-[#123B5D]
                transition-all
                duration-300
                group-hover:bg-[#F5A623]
                group-hover:translate-x-1
              "
            >
              <ArrowRight size={13} />
            </span>
          </div>
        </div>

        {/* HOVER BORDER */}

        <span
          className="
            absolute
            bottom-0
            left-0
            h-[3px]
            w-0
            rounded-r-full
            bg-[#F5A623]
            transition-all
            duration-500
            group-hover:w-full
          "
        />
      </Link>
    </motion.div>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function Categories() {
  return (
    <section
      className="
        relative
        w-full
        overflow-hidden
        bg-[#F7F8F9]

        px-5
        py-12

        sm:px-8
        sm:py-14

        lg:flex
        lg:min-h-screen
        lg:items-center
        lg:px-10
        lg:py-10

        xl:px-12
      "
    >
      {/* =====================================================
          SOFT BACKGROUND
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -right-[180px]
          -top-[180px]
          h-[450px]
          w-[450px]
          rounded-full
          bg-[#F5A623]/[0.07]
          blur-[100px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-[200px]
          -left-[180px]
          h-[450px]
          w-[450px]
          rounded-full
          bg-[#123B5D]/[0.035]
          blur-[100px]
        "
      />

      {/* =====================================================
          MAIN CONTAINER
      ===================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-[1400px]
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
            duration: 0.65,
          }}
          className="
            mb-7
            flex
            flex-col
            gap-5

            sm:mb-8

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
                  w-8
                  rounded-full
                  bg-[#F5A623]
                "
              />

              <span
                className="
                  text-[11px]
                  font-black
                  uppercase
                  tracking-[0.16em]
                  text-[#2F7180]
                "
              >
                Shop by Category
              </span>
            </div>

            <h2
              className="
                max-w-[700px]
                text-[34px]
                font-black
                leading-[1]
                tracking-[-0.045em]
                text-[#202830]

                sm:text-[42px]

                lg:text-[48px]
              "
            >
              Find the right{" "}
              <span className="text-[#123B5D]">
                packaging solution.
              </span>
            </h2>
          </div>

          {/* RIGHT */}

          <div
            className="
              max-w-[400px]
              lg:pb-1
            "
          >
            <p
              className="
                text-[13px]
                leading-[1.65]
                text-[#66737D]
              "
            >
              Explore our complete range of protective
              packaging solutions designed for safer,
              smarter shipping.
            </p>

            <Link
              href="/products"
              className="
                group/all
                mt-3
                inline-flex
                items-center
                gap-2.5
                text-[11px]
                font-black
                uppercase
                tracking-[0.08em]
                text-[#123B5D]
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
                  bg-[#F5A623]
                  transition-transform
                  duration-300
                  group-hover/all:translate-x-1
                "
              >
                <ArrowRight size={13} />
              </span>
            </Link>
          </div>
        </motion.div>

        {/* =================================================
            CATEGORY CARDS
        ================================================= */}

        <div
          className="
            grid
            grid-cols-1
            gap-4

            sm:grid-cols-2

            lg:grid-cols-5
            lg:gap-4
          "
        >
          {categories.map((item, index) => (
            <CategoryCard
              key={item.number}
              item={item}
              index={index}
            />
          ))}
        </div>

        {/* =================================================
            BOTTOM INFO
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
            delay: 0.25,
          }}
          className="
            mt-5
            flex
            flex-col
            gap-2

            border-t
            border-[#DCE3E7]

            pt-4

            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <span
            className="
              text-[10px]
              font-bold
              uppercase
              tracking-[0.12em]
              text-[#2F7180]
            "
          >
            DPACK Protective Packaging
          </span>

          <div
            className="
              flex
              items-center
              gap-3
            "
          >
            <span
              className="
                text-[10px]
                font-bold
                text-[#66737D]
              "
            >
              05 Categories
            </span>

            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-[#F5A623]
              "
            />

            <span
              className="
                text-[10px]
                font-bold
                text-[#66737D]
              "
            >
              Protective Packaging Solutions
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

