"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  ShoppingBag,
  Star,
  ShieldCheck,
} from "lucide-react";

/* =========================================================
   PRODUCT DATA
   Price / links apne actual products ke according change karein
========================================================= */

const products = [
  {
    id: "01",
    name: "Air Column Bag",
    category: "Fragile Protection",
    price: "₹299",
    oldPrice: "₹399",
    rating: "4.9",
    reviews: "124",
    image: "https://packingairbag.com/cat/1.webp",
    link: "/products/air-column-bag",
    tag: "BEST SELLER",
  },
  {
    id: "02",
    name: "Air Column Roll",
    category: "Protective Packaging",
    price: "₹549",
    oldPrice: "₹699",
    rating: "4.8",
    reviews: "89",
    image: "https://packingairbag.com/cat/5.webp",
    link: "/products/air-column-roll",
    tag: "POPULAR",
  },
  {
    id: "03",
    name: "Air Cushion Film",
    category: "Void Fill",
    price: "₹449",
    oldPrice: "₹599",
    rating: "4.8",
    reviews: "76",
    image: "https://packingairbag.com/cat/3.webp",
    link: "/products/air-cushion-film",
    tag: "TRENDING",
  },
  {
    id: "04",
    name: "Dunnage Air Bag",
    category: "Cargo Protection",
    price: "₹799",
    oldPrice: "₹999",
    rating: "4.7",
    reviews: "58",
    image: "https://packingairbag.com/cat/4.webp",
    link: "/products/dunnage-air-bag",
    tag: "TOP RATED",
  },
];

const featured = products[0];
const sideProducts = products.slice(1);

/* =========================================================
   ANIMATION
========================================================= */

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 50,
  },

  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/* =========================================================
   COMPONENT
========================================================= */

export default function BestSellingProducts() {
  return (
    <section
      className="
        relative
        w-full
        overflow-hidden
        bg-[#E9EDF0]
        py-16
        lg:py-20
      "
    >
      {/* ===================================================
          BACKGROUND GRID
      =================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.035]

          [background-image:linear-gradient(#123B5D_1px,transparent_1px),linear-gradient(90deg,#123B5D_1px,transparent_1px)]
          [background-size:70px_70px]
        "
      />

      {/* BACKGROUND GLOW */}

      <div
        className="
          pointer-events-none
          absolute
          -left-[200px]
          top-[20%]

          h-[450px]
          w-[450px]

          rounded-full
          bg-[#2F7180]/10
          blur-[130px]
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
          max-w-[1450px]
          px-4
          sm:px-6
          lg:px-8
      "
      >
        {/* =================================================
            SECTION HEADER
        ================================================= */}

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            amount: 0.3,
          }}
          variants={fadeUp}
          className="
            mb-10
            flex
            flex-col
            justify-between
            gap-7

            lg:mb-12
            lg:flex-row
            lg:items-end
          "
        >
          {/* LEFT */}

          <div>
            <div
              className="
                mb-4
                flex
                items-center
                gap-3
              "
            >
              <motion.span
                initial={{ width: 0 }}
                whileInView={{ width: 42 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                }}
                className="
                  h-[3px]
                  bg-[#F5A623]
                "
              />

              <span
                className="
                  text-[12px]
                  font-black
                  uppercase
                  tracking-[0.2em]
                  text-[#2F7180]
                "
              >
                Customer Favorites
              </span>
            </div>

            <h2
              className="
                text-[42px]
                font-black
                uppercase
                leading-[0.9]
                tracking-[-0.06em]
                text-[#202830]

                sm:text-[55px]
                lg:text-[68px]
              "
            >
              BEST
              <span
                className="
                  relative
                  ml-3
                  inline-block
                  text-[#123B5D]
                "
              >
                SELLERS

                <span
                  className="
                    absolute
                    -bottom-2
                    left-0

                    h-[5px]
                    w-[42%]

                    bg-[#F5A623]
                  "
                />
              </span>
            </h2>
          </div>

          {/* RIGHT */}

          <div
            className="
              flex
              max-w-[430px]
              flex-col
              gap-5
            "
          >
            <p
              className="
                text-[13px]
                font-medium
                leading-6
                text-[#66737D]
              "
            >
              Explore packaging solutions trusted for
              reliable protection, efficient packing and
              safer deliveries.
            </p>

            <Link
              href="/products"
              className="
                group
                flex
                w-fit
                items-center
                gap-3

                text-[12px]
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
                  h-8
                  w-8
                  items-center
                  justify-center

                  bg-[#F5A623]

                  transition-all
                  duration-300

                  group-hover:translate-x-1
                  group-hover:bg-[#123B5D]
                  group-hover:text-white
                "
              >
                <ArrowUpRight size={14} />
              </span>
            </Link>
          </div>
        </motion.div>

        {/* =================================================
            PRODUCT SHOWCASE GRID
        ================================================= */}

        <div
          className="
            grid
            overflow-hidden

            border
            border-[#123B5D]/10

            bg-white

            shadow-[0_30px_80px_rgba(18,59,93,0.08)]

            lg:grid-cols-[1.08fr_0.92fr]
          "
        >
          {/* =================================================
              FEATURED PRODUCT
          ================================================= */}

          <motion.article
            initial={{
              opacity: 0,
              x: -60,
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
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="
              group
              relative

              min-h-[600px]
              overflow-hidden

              bg-[#123B5D]

              lg:min-h-[650px]
            "
          >
            {/* ===============================================
                GIANT NUMBER
            =============================================== */}

            <motion.span
              initial={{
                opacity: 0,
                x: -70,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{ once: true }}
              transition={{
                duration: 1,
                delay: 0.2,
              }}
              className="
                pointer-events-none
                absolute
                -left-3
                -top-8

                text-[230px]
                font-black
                leading-none
                tracking-[-0.1em]

                text-white/[0.035]

                sm:text-[290px]
              "
            >
              {featured.id}
            </motion.span>

            {/* ===============================================
                TOP BADGE
            =============================================== */}

            <div
              className="
                absolute
                left-6
                top-6
                z-30

                flex
                items-center
                gap-3
              "
            >
              <span
                className="
                  bg-[#F5A623]

                  px-3
                  py-2

                  text-[10px]
                  font-black
                  uppercase
                  tracking-[0.12em]
                  text-[#123B5D]
                "
              >
                {featured.tag}
              </span>

              <span
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.15em]
                  text-white/45
                "
              >
                DPACK / {featured.id}
              </span>
            </div>

            {/* ===============================================
                SIDE TEXT
            =============================================== */}

            <span
              className="
                absolute
                right-5
                top-7
                z-20

                hidden

                [writing-mode:vertical-rl]

                text-[9px]
                font-black
                uppercase
                tracking-[0.25em]
                text-white/30

                sm:block
              "
            >
              Engineered Protection
            </span>

            {/* ===============================================
                ORANGE CIRCLE
            =============================================== */}

            <motion.div
              animate={{
                scale: [1, 1.08, 1],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                absolute
                left-1/2
                top-[42%]

                h-[310px]
                w-[310px]

                -translate-x-1/2
                -translate-y-1/2

                rounded-full
                bg-[#F5A623]

                sm:h-[370px]
                sm:w-[370px]
              "
            />

            {/* CIRCLE RINGS */}

            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear",
              }}
              className="
                absolute
                left-1/2
                top-[42%]

                h-[430px]
                w-[430px]

                -translate-x-1/2
                -translate-y-1/2

                rounded-full

                border
                border-dashed
                border-white/15
              "
            >
              <span
                className="
                  absolute
                  left-1/2
                  top-[-5px]

                  h-[10px]
                  w-[10px]

                  -translate-x-1/2

                  rounded-full
                  bg-white
                "
              />
            </motion.div>

            {/* ===============================================
                PRODUCT IMAGE
            =============================================== */}

            <div
              className="
                absolute
                left-1/2
                top-[42%]
                z-20

                h-[330px]
                w-[75%]

                -translate-x-1/2
                -translate-y-1/2

                sm:h-[400px]
              "
            >
              <motion.img
                src={featured.image}
                alt={featured.name}
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
                  h-full
                  w-full

                  object-contain

                  drop-shadow-[0_35px_30px_rgba(0,0,0,0.22)]

                  transition-transform
                  duration-700

                  group-hover:scale-[1.08]
                  group-hover:-rotate-2
                "
              />
            </div>

            {/* ===============================================
                PRODUCT INFORMATION
            =============================================== */}

            <div
              className="
                absolute
                bottom-0
                left-0
                right-0
                z-30

                bg-gradient-to-t
                from-[#081E2F]
                via-[#123B5D]/95
                to-transparent

                px-6
                pb-7
                pt-24

                sm:px-8
              "
            >
              {/* CATEGORY */}

              <div
                className="
                  mb-3
                  flex
                  items-center
                  justify-between
                  gap-4
                "
              >
                <span
                  className="
                    text-[11px]
                    font-black
                    uppercase
                    tracking-[0.15em]
                    text-[#F5A623]
                  "
                >
                  {featured.category}
                </span>

                <div
                  className="
                    flex
                    items-center
                    gap-1
                  "
                >
                  <Star
                    size={13}
                    fill="currentColor"
                    className="text-[#F5A623]"
                  />

                  <span
                    className="
                      text-[11px]
                      font-bold
                      text-white
                    "
                  >
                    {featured.rating}
                  </span>

                  <span
                    className="
                      text-[10px]
                      text-white/40
                    "
                  >
                    ({featured.reviews})
                  </span>
                </div>
              </div>

              {/* NAME */}

              <h3
                className="
                  text-[30px]
                  font-black
                  uppercase
                  leading-none
                  tracking-[-0.045em]
                  text-white

                  sm:text-[38px]
                "
              >
                {featured.name}
              </h3>

              {/* PRICE + BUTTON */}

              <div
                className="
                  mt-6
                  flex
                  items-end
                  justify-between
                  gap-4
                "
              >
                <div>
                  <span
                    className="
                      block

                      text-[10px]
                      font-bold
                      uppercase
                      tracking-[0.1em]
                      text-white/40
                    "
                  >
                    Starting From
                  </span>

                  <div
                    className="
                      mt-1
                      flex
                      items-center
                      gap-2
                    "
                  >
                    <span
                      className="
                        text-[24px]
                        font-black
                        text-white
                      "
                    >
                      {featured.price}
                    </span>

                    <span
                      className="
                        text-[12px]
                        font-semibold
                        text-white/35
                        line-through
                      "
                    >
                      {featured.oldPrice}
                    </span>
                  </div>
                </div>

                <Link
                  href={featured.link}
                  className="
                    group/button

                    flex
                    h-[48px]
                    items-center
                    gap-3

                    bg-[#F5A623]

                    px-5

                    text-[11px]
                    font-black
                    uppercase
                    tracking-[0.06em]
                    text-[#123B5D]

                    transition-all
                    duration-300

                    hover:-translate-y-1
                    hover:bg-white
                  "
                >
                  Shop Now

                  <ArrowRight
                    size={14}
                    className="
                      transition-transform
                      duration-300

                      group-hover/button:translate-x-1
                    "
                  />
                </Link>
              </div>
            </div>
          </motion.article>

          {/* =================================================
              RIGHT PRODUCTS
          ================================================= */}

          <div
            className="
              flex
              flex-col
              bg-[#F7F8F9]
            "
          >
            {sideProducts.map((product, index) => (
              <motion.article
                key={product.id}
                initial={{
                  opacity: 0,
                  x: 60,
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
                  duration: 0.7,
                  delay: index * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="
                  group/item
                  relative

                  flex
                  min-h-[215px]
                  flex-1

                  overflow-hidden

                  border-b
                  border-[#123B5D]/10

                  bg-[#F7F8F9]

                  transition-colors
                  duration-500

                  last:border-b-0

                  hover:bg-[#E7EDF0]
                "
              >
                {/* ===========================================
                    GIANT HOVER NUMBER
                =========================================== */}

                <span
                  className="
                    pointer-events-none
                    absolute
                    -bottom-8
                    right-4

                    translate-y-8

                    text-[140px]
                    font-black
                    leading-none
                    tracking-[-0.1em]

                    text-[#123B5D]/[0.035]

                    opacity-0

                    transition-all
                    duration-500

                    group-hover/item:translate-y-0
                    group-hover/item:opacity-100
                  "
                >
                  {product.id}
                </span>

                {/* ===========================================
                    IMAGE
                =========================================== */}

                <div
                  className="
                    relative

                    flex
                    w-[38%]
                    shrink-0
                    items-center
                    justify-center

                    overflow-hidden

                    border-r
                    border-[#123B5D]/10
                  "
                >
                  {/* CIRCLE */}

                  <div
                    className="
                      absolute

                      h-[130px]
                      w-[130px]

                      scale-75

                      rounded-full
                      bg-[#DCE7EB]

                      transition-all
                      duration-500

                      group-hover/item:scale-100
                      group-hover/item:bg-[#F5A623]
                    "
                  />

                  <img
                    src={product.image}
                    alt={product.name}
                    className="
                      relative
                      z-10

                      h-[150px]
                      w-[85%]

                      object-contain

                      drop-shadow-[0_18px_18px_rgba(18,59,93,0.13)]

                      transition-all
                      duration-700

                      group-hover/item:-translate-y-2
                      group-hover/item:rotate-[-4deg]
                      group-hover/item:scale-[1.08]
                    "
                  />

                  {/* NUMBER */}

                  <span
                    className="
                      absolute
                      left-4
                      top-4
                      z-20

                      font-mono
                      text-[10px]
                      font-black
                      text-[#2F7180]
                    "
                  >
                    {product.id}
                  </span>
                </div>

                {/* ===========================================
                    CONTENT
                =========================================== */}

                <div
                  className="
                    relative
                    z-20

                    flex
                    flex-1
                    flex-col
                    justify-center

                    px-5
                    py-5

                    sm:px-7
                  "
                >
                  {/* TAG */}

                  <div
                    className="
                      mb-2
                      flex
                      items-center
                      justify-between
                      gap-3
                    "
                  >
                    <span
                      className="
                        text-[10px]
                        font-black
                        uppercase
                        tracking-[0.13em]
                        text-[#2F7180]
                      "
                    >
                      {product.category}
                    </span>

                    <span
                      className="
                        bg-[#123B5D]

                        px-2
                        py-1

                        text-[8px]
                        font-black
                        uppercase
                        tracking-[0.08em]
                        text-white
                      "
                    >
                      {product.tag}
                    </span>
                  </div>

                  {/* PRODUCT */}

                  <Link href={product.link}>
                    <h3
                      className="
                        text-[20px]
                        font-black
                        uppercase
                        leading-tight
                        tracking-[-0.035em]
                        text-[#202830]

                        transition-colors
                        duration-300

                        group-hover/item:text-[#123B5D]

                        sm:text-[23px]
                      "
                    >
                      {product.name}
                    </h3>
                  </Link>

                  {/* RATING */}

                  <div
                    className="
                      mt-2
                      flex
                      items-center
                      gap-2
                    "
                  >
                    <div className="flex items-center gap-[2px]">
                      {[1, 2, 3, 4, 5].map(
                        (star) => (
                          <Star
                            key={star}
                            size={10}
                            fill="currentColor"
                            className="text-[#F5A623]"
                          />
                        )
                      )}
                    </div>

                    <span
                      className="
                        text-[10px]
                        font-bold
                        text-[#7A858B]
                      "
                    >
                      {product.rating} ({product.reviews})
                    </span>
                  </div>

                  {/* BOTTOM */}

                  <div
                    className="
                      mt-4
                      flex
                      items-center
                      justify-between
                      gap-4
                    "
                  >
                    {/* PRICE */}

                    <div
                      className="
                        flex
                        items-center
                        gap-2
                      "
                    >
                      <span
                        className="
                          text-[18px]
                          font-black
                          text-[#123B5D]
                        "
                      >
                        {product.price}
                      </span>

                      <span
                        className="
                          text-[11px]
                          font-semibold
                          text-[#9AA3A8]
                          line-through
                        "
                      >
                        {product.oldPrice}
                      </span>
                    </div>

                    {/* CART */}

                    <Link
                      href={product.link}
                      aria-label={`Add ${product.name} to cart`}
                      className="
                        group/cart

                        flex
                        h-10
                        w-10
                        items-center
                        justify-center

                        bg-[#123B5D]

                        text-white

                        transition-all
                        duration-300

                        hover:bg-[#F5A623]
                        hover:text-[#123B5D]
                      "
                    >
                      <ShoppingBag
                        size={15}
                        className="
                          transition-transform
                          duration-300

                          group-hover/cart:scale-110
                        "
                      />
                    </Link>
                  </div>
                </div>

                {/* ===========================================
                    BOTTOM HOVER LINE
                =========================================== */}

                <span
                  className="
                    absolute
                    bottom-0
                    left-0
                    z-30

                    h-[3px]
                    w-full

                    origin-left
                    scale-x-0

                    bg-[#F5A623]

                    transition-transform
                    duration-500

                    group-hover/item:scale-x-100
                  "
                />
              </motion.article>
            ))}
          </div>
        </div>

        {/* =================================================
            TRUST STRIP
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
          viewport={{ once: true }}
          transition={{
            duration: 0.7,
            delay: 0.2,
          }}
          className="
            mt-5

            flex
            flex-wrap
            items-center
            justify-between
            gap-5

            border-t
            border-[#123B5D]/10

            pt-5
          "
        >
          <div
            className="
              flex
              items-center
              gap-3
            "
          >
            <ShieldCheck
              size={17}
              className="text-[#F5A623]"
            />

            <span
              className="
                text-[11px]
                font-bold
                uppercase
                tracking-[0.08em]
                text-[#66737D]
              "
            >
              Protective Packaging
            </span>
          </div>

          <p
            className="
              text-[10px]
              font-bold
              uppercase
              tracking-[0.14em]
              text-[#123B5D]/40
            "
          >
            DPACK SOLUTIONS / PACK • PROTECT • DELIVER
          </p>
        </motion.div>
      </div>
    </section>
  );
}