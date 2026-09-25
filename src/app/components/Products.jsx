"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "motion/react";

import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Heart,
  ShoppingCart,
  Star,
} from "lucide-react";

/* =========================================================
   PRODUCTS
========================================================= */

const products = [
  {
    id: 1,
    brand: "D PACK",
    name: "Dunnage Air Bags",
    image: "https://packingairbag.com/cat/1.webp",
    rating: "4.8",
    reviews: "24",
    price: "₹499",
    oldPrice: "₹699",
    discount: "29% OFF",
    link: "https://packingairbag.com/categories/dunnage-bag",
  },

  {
    id: 2,
    brand: "D PACK",
    name: "PP Dunnage Bag",
    image: "https://packingairbag.com/cat/1.webp",
    rating: "4.7",
    reviews: "18",
    price: "₹399",
    oldPrice: "₹599",
    discount: "33% OFF",
    link: "https://packingairbag.com/categories/dunnage-bag",
  },

  {
    id: 3,
    brand: "D PACK",
    name: "Square Dunnage Air Bags",
    image: "https://packingairbag.com/cat/1.webp",
    rating: "4.9",
    reviews: "31",
    price: "₹549",
    oldPrice: "₹799",
    discount: "31% OFF",
    link: "https://packingairbag.com/categories/dunnage-bag",
  },

  {
    id: 4,
    brand: "D PACK",
    name: "Heavy Duty Dunnage Bag",
    image: "https://packingairbag.com/cat/1.webp",
    rating: "4.8",
    reviews: "26",
    price: "₹599",
    oldPrice: "₹899",
    discount: "33% OFF",
    link: "https://packingairbag.com/categories/dunnage-bag",
  },

  {
    id: 5,
    brand: "D PACK",
    name: "Air Column Bag for Laptop",
    image: "https://packingairbag.com/cat/5.webp",
    rating: "4.9",
    reviews: "42",
    price: "₹299",
    oldPrice: "₹449",
    discount: "33% OFF",
    link: "https://packingairbag.com/categories/air-column-bag",
  },

  {
    id: 6,
    brand: "D PACK",
    name: "Air Column Bag for Electronics",
    image: "https://packingairbag.com/cat/5.webp",
    rating: "4.8",
    reviews: "36",
    price: "₹349",
    oldPrice: "₹499",
    discount: "30% OFF",
    link: "https://packingairbag.com/categories/air-column-bag",
  },

  {
    id: 7,
    brand: "D PACK",
    name: "Air Column Packaging Bag",
    image: "https://packingairbag.com/cat/5.webp",
    rating: "4.7",
    reviews: "21",
    price: "₹379",
    oldPrice: "₹549",
    discount: "31% OFF",
    link: "https://packingairbag.com/categories/air-column-bag",
  },

  {
    id: 8,
    brand: "D PACK",
    name: "Protective Air Column Bag",
    image: "https://packingairbag.com/cat/5.webp",
    rating: "4.9",
    reviews: "29",
    price: "₹429",
    oldPrice: "₹599",
    discount: "28% OFF",
    link: "https://packingairbag.com/categories/air-column-bag",
  },
];

/* =========================================================
   PRODUCT CARD
========================================================= */

function ProductCard({ product, index }) {
  const addToCart = (e) => {
    e.preventDefault();

    // Connect your cart functionality here
    console.log("Added to cart:", product);
  };

  const addToWishlist = (e) => {
    e.preventDefault();

    console.log("Added to wishlist:", product);
  };

  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 45,
        scale: 0.97,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: 0.65,
        delay: (index % 4) * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="
        group
        relative
        h-full
        overflow-hidden

        border
        border-[#DCE3E7]

        bg-white

        transition-all
        duration-500

        hover:-translate-y-1
        hover:border-[#123B5D]/25

        hover:shadow-[0_20px_50px_rgba(18,59,93,0.10)]
      "
    >
      {/* ===================================================
          IMAGE
      =================================================== */}

      <Link
        href={product.link}
        target="_blank"
        rel="noopener noreferrer"
        className="
          relative
          block
          aspect-[1.08/1]
          overflow-hidden

          bg-[#F4F6F7]
        "
      >
        {/* NUMBER */}

        <span
          className="
            absolute
            bottom-3
            left-4
            z-20

            font-mono
            text-[12px]
            font-bold
            text-[#123B5D]/25
          "
        >
          {String(product.id).padStart(2, "0")}
        </span>

        {/* DISCOUNT */}

        <span
          className="
            absolute
            left-4
            top-4
            z-30

            bg-[#F5A623]

            px-3
            py-1.5

            text-[12px]
            font-black
            uppercase
            tracking-[0.04em]
            text-[#123B5D]
          "
        >
          {product.discount}
        </span>

        {/* WISHLIST */}

        <button
          type="button"
          onClick={addToWishlist}
          aria-label={`Add ${product.name} to wishlist`}
          className="
            absolute
            right-4
            top-4
            z-40

            flex
            h-9
            w-9
            items-center
            justify-center

            border
            border-[#DCE3E7]
            bg-white

            text-[#123B5D]

            transition-all
            duration-300

            hover:border-[#123B5D]
            hover:bg-[#123B5D]
            hover:text-white
          "
        >
          <Heart size={16} />
        </button>

        {/* DECORATIVE CIRCLE */}

        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-1/2

            h-[160px]
            w-[160px]

            -translate-x-1/2
            -translate-y-1/2

            rounded-full
            border
            border-[#123B5D]/[0.05]

            transition-all
            duration-700

            group-hover:h-[190px]
            group-hover:w-[190px]
            group-hover:border-[#2F7180]/10
          "
        />

        {/* PRODUCT IMAGE */}

        <div className="absolute inset-7">
          <Image
            src={product.image}
            alt={product.name}
            fill
            unoptimized
            sizes="(max-width:768px) 50vw, 25vw"
            className="
              object-contain

              transition-all
              duration-[850ms]
              ease-out

              group-hover:-translate-y-2
              group-hover:scale-[1.10]
            "
          />
        </div>

        {/* QUICK ARROW */}

        <span
          className="
            absolute
            bottom-4
            right-4
            z-30

            flex
            h-10
            w-10

            translate-y-4
            items-center
            justify-center

            bg-[#123B5D]

            text-white

            opacity-0

            transition-all
            duration-400

            group-hover:translate-y-0
            group-hover:opacity-100
          "
        >
          <ArrowUpRight
            size={16}
            className="
              transition-transform
              duration-300

              group-hover:rotate-45
            "
          />
        </span>

        {/* BOTTOM ORANGE LINE */}

        <span
          className="
            absolute
            bottom-0
            left-0

            h-[3px]
            w-0

            bg-[#F5A623]

            transition-all
            duration-700

            group-hover:w-full
          "
        />
      </Link>

      {/* ===================================================
          PRODUCT INFORMATION
      =================================================== */}

      <div className="p-4 sm:p-5">
        {/* BRAND */}

        <p
          className="
            text-[12px]
            font-black
            uppercase
            tracking-[0.12em]
            text-[#2F7180]
          "
        >
          {product.brand}
        </p>

        {/* PRODUCT NAME */}

        <Link
          href={product.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h3
            className="
              mt-1.5
              min-h-[42px]

              text-[16px]
              font-bold
              leading-[1.3]
              tracking-[-0.02em]
              text-[#202830]

              transition-colors
              duration-300

              hover:text-[#123B5D]
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
          <span
            className="
              flex
              items-center
              gap-1

              bg-[#E6F1F6]

              px-2
              py-1
            "
          >
            <span
              className="
                text-[12px]
                font-bold
                text-[#123B5D]
              "
            >
              {product.rating}
            </span>

            <Star
              size={11}
              fill="currentColor"
              strokeWidth={0}
              className="text-[#F5A623]"
            />
          </span>

          <span
            className="
              text-[12px]
              text-[#8A959D]
            "
          >
            {product.reviews} reviews
          </span>
        </div>

        {/* PRICE */}

        <div
          className="
            mt-3
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
              text-[12px]
              text-[#929BA2]
              line-through
            "
          >
            {product.oldPrice}
          </span>
        </div>

        {/* =================================================
            ADD TO CART
        ================================================= */}

        <button
          type="button"
          onClick={addToCart}
          className="
            group/cart

            mt-4

            flex
            w-full
            items-center
            justify-between

            border-t
            border-[#DCE3E7]

            pt-4

            text-[#123B5D]
          "
        >
          <span
            className="
              flex
              items-center
              gap-2

              text-[12px]
              font-black
              uppercase
              tracking-[0.06em]
            "
          >
            <ShoppingCart size={15} />

            Add to Cart
          </span>

          <span
            className="
              flex
              h-8
              w-8
              items-center
              justify-center

              bg-[#E6F1F6]

              transition-all
              duration-300

              group-hover/cart:bg-[#F5A623]
            "
          >
            <ArrowRight
              size={14}
              className="
                transition-transform
                duration-300

                group-hover/cart:translate-x-1
              "
            />
          </span>
        </button>
      </div>
    </motion.article>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function TrendingProducts() {
  const [current, setCurrent] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(2);

  /* =========================================================
     RESPONSIVE SLIDES
  ========================================================= */

  useEffect(() => {
    const updateSlides = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerView(4);
      } else if (window.innerWidth >= 768) {
        setItemsPerView(3);
      } else {
        setItemsPerView(2);
      }
    };

    updateSlides();

    window.addEventListener("resize", updateSlides);

    return () => {
      window.removeEventListener("resize", updateSlides);
    };
  }, []);

  /* =========================================================
     MAX SLIDE
  ========================================================= */

  const maxSlide = Math.max(
    0,
    products.length - itemsPerView
  );

  /* =========================================================
     FIX CURRENT AFTER RESIZE
  ========================================================= */

  useEffect(() => {
    if (current > maxSlide) {
      setCurrent(maxSlide);
    }
  }, [maxSlide, current]);

  /* =========================================================
     AUTO SLIDE
  ========================================================= */

  useEffect(() => {
    if (maxSlide <= 0) return;

    const timer = setInterval(() => {
      setCurrent((prev) =>
        prev >= maxSlide ? 0 : prev + 1
      );
    }, 3500);

    return () => clearInterval(timer);
  }, [maxSlide]);

  /* =========================================================
     PREVIOUS
  ========================================================= */

  const previousSlide = () => {
    setCurrent((prev) =>
      prev <= 0 ? maxSlide : prev - 1
    );
  };

  /* =========================================================
     NEXT
  ========================================================= */

  const nextSlide = () => {
    setCurrent((prev) =>
      prev >= maxSlide ? 0 : prev + 1
    );
  };

  const dots = Array.from(
    { length: maxSlide + 1 },
    (_, index) => index
  );

  return (
    <section
      className="
        relative
        w-full
        overflow-hidden

        bg-[#EEF1F3]

        py-12
        sm:py-14
        lg:py-16
      "
    >
      {/* =====================================================
          BACKGROUND GRAPHICS
      ===================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.7,
        }}
        whileInView={{
          opacity: 1,
          scale: 1,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 1.2,
        }}
        className="
          pointer-events-none
          absolute
          -right-[180px]
          -top-[180px]

          h-[450px]
          w-[450px]

          rounded-full
          bg-[#DCE7EC]

          blur-[100px]
        "
      />

      {/* HUGE BACKGROUND TEXT */}

      <motion.span
        initial={{
          opacity: 0,
          x: 100,
        }}
        whileInView={{
          opacity: 1,
          x: 0,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 1,
        }}
        className="
          pointer-events-none

          absolute
          right-0
          top-4

          hidden

          text-[150px]
          font-black
          leading-none
          tracking-[-0.08em]

          text-[#123B5D]/[0.025]

          xl:block
        "
      >
        TREND
      </motion.span>

      <div
        className="
          relative
          z-10

          mx-auto
          max-w-[1400px]

          px-5
          sm:px-8
          lg:px-10
        "
      >
        {/* =================================================
            HEADING
        ================================================= */}

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
            amount: 0.3,
          }}
          transition={{
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="
            mb-8

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
            <div
              className="
                mb-3
                flex
                items-center
                gap-3
              "
            >
              <motion.span
                initial={{
                  width: 0,
                }}
                whileInView={{
                  width: 36,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.7,
                  delay: 0.15,
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
                  tracking-[0.16em]
                  text-[#2F7180]
                "
              >
                Customer Favorites
              </span>
            </div>

            <h2
              className="
                text-[36px]
                font-black
                leading-[0.95]
                tracking-[-0.05em]
                text-[#202830]

                sm:text-[44px]
                lg:text-[50px]
              "
            >
              Trending
              <span className="text-[#123B5D]">
                {" "}right now.
              </span>
            </h2>
          </div>

          {/* RIGHT */}

          <div
            className="
              max-w-[410px]

              sm:text-right
            "
          >
            <p
              className="
                text-[14px]
                leading-6
                text-[#66737D]
              "
            >
              Explore popular protective packaging products
              chosen for secure storage and safer shipping.
            </p>

            <Link
              href="/products"
              className="
                group/all

                mt-3
                inline-flex
                items-center
                gap-3

                text-[12px]
                font-black
                uppercase
                tracking-[0.07em]
                text-[#123B5D]
              "
            >
              Shop All Products

              <span
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center

                  bg-[#F5A623]

                  transition-transform
                  duration-300

                  group-hover/all:translate-x-1
                "
              >
                <ArrowRight size={14} />
              </span>
            </Link>
          </div>
        </motion.div>

        {/* =================================================
            SLIDER
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.1,
          }}
          transition={{
            duration: 0.7,
            delay: 0.15,
          }}
          className="relative"
        >
          {/* PREVIOUS */}

          <button
            type="button"
            onClick={previousSlide}
            aria-label="Previous products"
            className="
              absolute
              -left-5
              top-[42%]
              z-40

              hidden
              h-11
              w-11
              -translate-y-1/2
              items-center
              justify-center

              border
              border-[#DCE3E7]
              bg-white

              text-[#123B5D]

              shadow-[0_8px_25px_rgba(18,59,93,0.10)]

              transition-all
              duration-300

              hover:bg-[#123B5D]
              hover:text-white

              lg:flex
            "
          >
            <ArrowLeft size={17} />
          </button>

          {/* NEXT */}

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next products"
            className="
              absolute
              -right-5
              top-[42%]
              z-40

              hidden
              h-11
              w-11
              -translate-y-1/2
              items-center
              justify-center

              border
              border-[#DCE3E7]
              bg-white

              text-[#123B5D]

              shadow-[0_8px_25px_rgba(18,59,93,0.10)]

              transition-all
              duration-300

              hover:bg-[#123B5D]
              hover:text-white

              lg:flex
            "
          >
            <ArrowRight size={17} />
          </button>

          {/* ===============================================
              VIEWPORT
          =============================================== */}

          <div className="overflow-hidden py-3">
            <div
              className="
                flex

                transition-transform
                duration-700

                ease-[cubic-bezier(.22,.61,.36,1)]
              "
              style={{
                transform: `translateX(-${
                  current * (100 / itemsPerView)
                }%)`,
              }}
            >
              {products.map((product, index) => (
                <div
                  key={product.id}
                  className="
                    shrink-0

                    px-1.5
                    sm:px-2
                  "
                  style={{
                    width: `${100 / itemsPerView}%`,
                  }}
                >
                  <ProductCard
                    product={product}
                    index={index}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* =================================================
              SLIDER CONTROLS
          ================================================= */}

          <div
            className="
              mt-5
              flex
              items-center
              justify-center
              gap-2
            "
          >
            {dots.map((dot) => (
              <button
                key={dot}
                type="button"
                onClick={() => setCurrent(dot)}
                aria-label={`Go to slide ${dot + 1}`}
                className={[
                  "h-[5px]",
                  "transition-all",
                  "duration-500",
                  current === dot
                    ? "w-8 bg-[#123B5D]"
                    : "w-2 bg-[#C9D1D6] hover:bg-[#F5A623]",
                ].join(" ")}
              />
            ))}
          </div>
        </motion.div>

        {/* =================================================
            BOTTOM STRIP
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 15,
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
            delay: 0.25,
          }}
          className="
            mt-7

            flex
            flex-col
            gap-3

            border-t
            border-[#123B5D]/10

            pt-4

            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <div className="flex items-center gap-3">
            <span
              className="
                text-[12px]
                font-black
                uppercase
                tracking-[0.08em]
                text-[#2F7180]
              "
            >
              DPACK Packaging
            </span>

            <span
              className="
                h-1.5
                w-1.5

                bg-[#F5A623]
              "
            />

            <span
              className="
                text-[12px]
                text-[#66737D]
              "
            >
              Protective packaging solutions
            </span>
          </div>

          <Link
            href="/products"
            className="
              group

              inline-flex
              w-fit
              items-center
              gap-2

              text-[12px]
              font-black
              uppercase
              tracking-[0.07em]
              text-[#123B5D]
            "
          >
            View Full Collection

            <ArrowUpRight
              size={14}
              className="
                transition-transform
                duration-300

                group-hover:translate-x-1
                group-hover:-translate-y-1
              "
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}