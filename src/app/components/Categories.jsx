"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

/* ============================================================
   CATEGORIES
============================================================ */

const categories = [
  {
    number: "01",
    name: "Dunnage Bag",
    image: "https://packingairbag.com/cat/1.webp",
    link: "https://packingairbag.com/categories/dunnage-bag",
    description:
      "Secure cargo and prevent shifting during transportation.",
    tag: "CARGO PROTECTION",
  },
  {
    number: "02",
    name: "Air Column Roll",
    image: "https://packingairbag.com/cat/2.webp",
    link: "https://packingairbag.com/categories/air-column-roll",
    description:
      "Flexible cushioning protection for fragile products.",
    tag: "CUSHIONING",
  },
  {
    number: "03",
    name: "Air Column Bag",
    image: "https://packingairbag.com/cat/5.webp",
    link: "https://packingairbag.com/categories/air-column-bag",
    description:
      "Lightweight inflatable protection for safe transit.",
    tag: "PRODUCT PROTECTION",
  },
  {
    number: "04",
    name: "Packaging Air Bag",
    image: "https://packingairbag.com/cat/3.webp",
    link: "https://packingairbag.com/categories/packaging-air-bag",
    description:
      "Efficient air packaging designed for modern logistics.",
    tag: "AIR PACKAGING",
  },
  {
    number: "05",
    name: "Gap Filler",
    image: "https://packingairbag.com/sideimg.png",
    link: "https://packingairbag.com/categories/gap-filler",
    description:
      "Fill empty spaces and keep cargo stable in transit.",
    tag: "VOID FILL",
  },
];

/* ============================================================
   CATEGORY CARD
============================================================ */

function CategoryCard({ item, index, direction }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: direction === "left" ? -100 : 100,
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
        duration: 0.8,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="h-full"
    >
      <Link
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        className="group block h-full"
      >
        <article
          className="
            relative
            h-full
            overflow-hidden
            rounded-[20px]
            border
            border-[#d8d8d8]
            bg-white
            shadow-[0_8px_30px_rgba(0,0,0,0.055)]
            transition-all
            duration-500
            group-hover:-translate-y-1.5
            group-hover:shadow-[0_18px_45px_rgba(0,0,0,0.10)]
          "
        >
          {/* IMAGE */}

          <div
            className="
              relative
              h-[230px]
              overflow-hidden
              bg-[#e9e9e9]
              sm:h-[250px]
              lg:h-[245px]
              xl:h-[260px]
            "
          >
            <motion.div
              className="absolute inset-0"
              whileHover={{
                scale: 1.06,
              }}
              transition={{
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <Image
                src={item.image}
                alt={item.name}
                fill
                unoptimized
                sizes="(max-width: 768px) 100vw, 20vw"
                className="object-cover"
              />
            </motion.div>

            {/* Image overlay */}

            <div
              className="
                pointer-events-none
                absolute
                inset-0
                bg-gradient-to-t
                from-black/25
                via-transparent
                to-transparent
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
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                border
                border-white/40
                bg-black/15
                backdrop-blur-md
              "
            >
              <span
                className="
                  text-[10px]
                  font-semibold
                  tracking-[0.1em]
                  text-white
                "
              >
                {item.number}
              </span>
            </div>

            {/* TAG */}

            <div className="absolute right-4 top-4 z-10">
              <span
                className="
                  rounded-full
                  border
                  border-white/40
                  bg-black/20
                  px-3
                  py-1.5
                  text-[7px]
                  font-semibold
                  uppercase
                  tracking-[0.14em]
                  text-white
                  backdrop-blur-md
                "
              >
                {item.tag}
              </span>
            </div>

            {/* ARROW */}

            <motion.div
              className="
                absolute
                bottom-4
                right-4
                z-10
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                bg-white
                text-[#171717]
                shadow-lg
              "
              whileHover={{
                rotate: 45,
              }}
              transition={{
                duration: 0.3,
              }}
            >
              <ArrowUpRight
                size={16}
                strokeWidth={1.8}
              />
            </motion.div>
          </div>

          {/* CONTENT */}

          <div className="px-5 pb-5 pt-5 sm:px-6">
            {/* Small line */}

            <div
              className="
                mb-4
                h-[2px]
                w-8
                bg-[#171717]
                transition-all
                duration-500
                group-hover:w-14
              "
            />

            {/* TITLE */}

            <h3
              className="
                text-[25px]
                font-semibold
                leading-[0.98]
                tracking-[-0.045em]
                text-[#111111]
                sm:text-[27px]
                lg:text-[28px]
              "
            >
              {item.name}
            </h3>

            {/* DESCRIPTION */}

            <p
              className="
                mt-3
                text-[11px]
                leading-[1.65]
                text-[#777777]
                sm:text-[12px]
              "
            >
              {item.description}
            </p>

            {/* BOTTOM */}

            <div
              className="
                mt-5
                flex
                items-center
                justify-between
                border-t
                border-[#e5e5e5]
                pt-4
              "
            >
              <span
                className="
                  text-[8px]
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-[#777777]
                "
              >
                Explore
              </span>

              <span
                className="
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.15em]
                  text-[#171717]
                  transition-all
                  duration-300
                  group-hover:tracking-[0.2em]
                "
              >
                View Category
              </span>
            </div>
          </div>

          {/* INNER BORDER */}

          <div
            className="
              pointer-events-none
              absolute
              inset-2
              rounded-[18px]
              border
              border-transparent
              transition-all
              duration-500
              group-hover:border-black/[0.08]
            "
          />
        </article>
      </Link>
    </motion.div>
  );
}

/* ============================================================
   MAIN COMPONENT
============================================================ */

export default function Categories() {
  return (
    <section
      className="
        relative
        w-full
        overflow-hidden
        bg-[#eeeeee]
        px-5
        py-16
        sm:px-8
        sm:py-20
        lg:px-10
        lg:py-24
        xl:px-14
      "
    >
      {/* ======================================================
          SUBTLE BACKGROUND
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -right-[180px]
          -top-[180px]
          h-[450px]
          w-[450px]
          rounded-full
          border
          border-black/[0.035]
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
          border
          border-black/[0.035]
        "
      />

      {/* ======================================================
          HEADER
      ====================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          mb-10
          max-w-[1450px]
          sm:mb-12
          lg:mb-14
        "
      >
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
          }}
          transition={{
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="
            flex
            flex-col
            gap-5
            sm:flex-row
            sm:items-end
            sm:justify-between
          "
        >
          {/* LEFT */}

          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-[2px] w-8 bg-[#171717]" />

              <span
                className="
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.25em]
                  text-[#666666]
                "
              >
                DPACK / Categories
              </span>
            </div>

            <h2
              className="
                text-[43px]
                font-semibold
                leading-[0.9]
                tracking-[-0.055em]
                text-[#111111]
                sm:text-[52px]
                lg:text-[60px]
              "
            >
              Packaging{" "}
              <span className="text-[#999999]">
                Solutions
              </span>
            </h2>
          </div>

          {/* RIGHT */}

          <div className="max-w-[350px]">
            <p
              className="
                text-[12px]
                leading-[1.7]
                text-[#6b6b6b]
                sm:text-[13px]
              "
            >
              Explore our range of protective packaging
              solutions designed for safer and smarter
              transportation.
            </p>
          </div>
        </motion.div>
      </div>

      {/* ======================================================
          CATEGORY GRID
      ====================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          grid
          max-w-[1450px]
          grid-cols-1
          gap-5
          sm:grid-cols-2
          lg:grid-cols-5
          lg:gap-4
          xl:gap-5
        "
      >
        {/* LEFT SIDE */}

        <CategoryCard
          item={categories[0]}
          index={0}
          direction="left"
        />

        <CategoryCard
          item={categories[1]}
          index={1}
          direction="left"
        />

        {/* RIGHT SIDE */}

        <CategoryCard
          item={categories[2]}
          index={2}
          direction="right"
        />

        <CategoryCard
          item={categories[3]}
          index={3}
          direction="right"
        />

        <CategoryCard
          item={categories[4]}
          index={4}
          direction="right"
        />
      </div>

      {/* ======================================================
          BOTTOM
      ====================================================== */}

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
          duration: 0.8,
          delay: 0.3,
        }}
        className="
          relative
          z-10
          mx-auto
          mt-10
          flex
          max-w-[1450px]
          items-center
          justify-between
          border-t
          border-[#d5d5d5]
          pt-5
        "
      >
        <span
          className="
            text-[8px]
            font-semibold
            uppercase
            tracking-[0.22em]
            text-[#777777]
          "
        >
          DPACK Solutions
        </span>

        <span
          className="
            text-[8px]
            font-semibold
            uppercase
            tracking-[0.18em]
            text-[#999999]
          "
        >
          05 Categories
        </span>
      </motion.div>
    </section>
  );
}