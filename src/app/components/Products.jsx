"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Heart, ArrowUpRight, ArrowRight, Star } from "lucide-react";

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
  return (
    <motion.article
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="
        group
        relative
        overflow-hidden
        rounded-[8px]
        border
        border-[#E3E7E9]
        bg-white
        transition-all
        duration-500
        hover:-translate-y-1
        hover:shadow-[0_18px_45px_rgba(18,59,93,0.10)]
      "
    >
      {/* IMAGE */}

      <Link
        href={product.link}
        target="_blank"
        rel="noopener noreferrer"
        className="
          relative
          block
          h-[255px]
          overflow-hidden
          bg-white
        "
      >
        {/* Discount */}

        <span
          className="
            absolute
            left-3
            top-3
            z-20
            bg-[#F5A623]
            px-2.5
            py-1
            text-[10px]
            font-black
            uppercase
            tracking-[0.04em]
            text-[#123B5D]
          "
        >
          {product.discount}
        </span>

        {/* Wishlist */}

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            console.log("Wishlist:", product);
          }}
          aria-label={`Add ${product.name} to wishlist`}
          className="
            absolute
            right-3
            top-3
            z-30
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-full
            bg-white
            text-[#6D777E]
            shadow-sm
            transition-all
            duration-300
            hover:bg-[#123B5D]
            hover:text-white
          "
        >
          <Heart size={15} />
        </button>

        {/* Product image */}

        <div className="absolute inset-5">
          <Image
            src={product.image}
            alt={product.name}
            fill
            unoptimized
            sizes="(max-width:768px) 50vw, 22vw"
            className="
              object-contain
              transition-all
              duration-700
              ease-out
              group-hover:scale-[1.08]
            "
          />
        </div>

        {/* Bottom line */}

        <span
          className="
            absolute
            bottom-0
            left-0
            h-[3px]
            w-0
            bg-[#F5A623]
            transition-all
            duration-500
            group-hover:w-full
          "
        />

        {/* Arrow */}

        <span
          className="
            absolute
            bottom-3
            right-3
            flex
            h-8
            w-8
            translate-y-3
            items-center
            justify-center
            bg-[#123B5D]
            text-white
            opacity-0
            transition-all
            duration-300
            group-hover:translate-y-0
            group-hover:opacity-100
          "
        >
          <ArrowUpRight
            size={14}
            className="transition-transform duration-300 group-hover:rotate-45"
          />
        </span>
      </Link>

      {/* CONTENT */}

      <div className="px-4 pb-4 pt-3.5">
        {/* Brand */}

        <p
          className="
            text-[10px]
            font-black
            uppercase
            tracking-[0.14em]
            text-[#2F7180]
          "
        >
          {product.brand}
        </p>

        {/* Name */}

        <Link
          href={product.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h3
            className="
              mt-1
              min-h-[40px]
              text-[15px]
              font-bold
              leading-[1.25]
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

        {/* Rating */}

        <div className="mt-2 flex items-center gap-2">
          <span
            className="
              flex
              items-center
              gap-1
              rounded-sm
              bg-[#EEF4F7]
              px-1.5
              py-1
            "
          >
            <span className="text-[10px] font-bold text-[#123B5D]">
              {product.rating}
            </span>

            <Star
              size={9}
              fill="currentColor"
              strokeWidth={0}
              className="text-[#F5A623]"
            />
          </span>

          <span className="text-[10px] text-[#929BA2]">
            {product.reviews} reviews
          </span>
        </div>

        {/* Price */}

        <div className="mt-2 flex items-center gap-2">
          <span className="text-[16px] font-black text-[#123B5D]">
            {product.price}
          </span>

          <span className="text-[11px] text-[#929BA2] line-through">
            {product.oldPrice}
          </span>
        </div>
      </div>
    </motion.article>
  );
}

/* =========================================================
   MAIN SECTION
========================================================= */

export default function TrendingProducts() {
  return (
    <section
      className=" hidden md:block
        relative
        w-full
        overflow-hidden
        bg-[#F5F4EF]
        py-8
        sm:py-10
        lg:py-12
      "
    >
      {/* Background dots */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.35]
        "
        style={{
          backgroundImage:
            "radial-gradient(#123B5D 0.7px, transparent 0.7px)",
          backgroundSize: "9px 9px",
        }}
      />

      {/* Main */}

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-[1400px]
          px-5
          sm:px-7
          lg:px-8
        "
      >
        <div
          className="
            grid
            grid-cols-1
            gap-5
            lg:grid-cols-[minmax(0,2fr)_minmax(330px,1fr)]
          "
        >
          {/* =================================================
              LEFT SIDE
          ================================================= */}

          <div className="min-w-0">
            {/* Heading */}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <h2
                className="
                  text-[28px]
                  font-black
                  leading-[1.05]
                  tracking-[-0.04em]
                  text-[#202830]
                  sm:text-[34px]
                  lg:text-[38px]
                "
              >
                Protective packaging
                <span className="text-[#123B5D]">
                  {" "}collection of the week
                </span>
              </h2>

              <p
                className="
                  mt-3
                  text-[14px]
                  leading-6
                  text-[#66737D]
                  sm:text-[15px]
                "
              >
                The most popular products from our protective packaging
                collection.
              </p>
            </motion.div>

            {/* PRODUCT GRID */}

            <div
              className="
                grid
                grid-cols-1
                gap-4
                sm:grid-cols-2
                xl:grid-cols-3
              "
            >
              {products.slice(0, 3).map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                />
              ))}
            </div>

            {/* Bottom button */}

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-5"
            >
              <Link
                href="/products"
                className="
                  group
                  inline-flex
                  items-center
                  gap-3
                  rounded-full
                  bg-[#123B5D]
                  px-5
                  py-3
                  text-[11px]
                  font-black
                  uppercase
                  tracking-[0.05em]
                  text-white
                  transition-all
                  duration-300
                  hover:bg-[#F5A623]
                  hover:text-[#123B5D]
                "
              >
                View All Products

                <span
                  className="
                    flex
                    h-6
                    w-6
                    items-center
                    justify-center
                    rounded-full
                    bg-white/10
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                >
                  <ArrowRight size={13} />
                </span>
              </Link>
            </motion.div>
          </div>

          {/* =================================================
              RIGHT FEATURE IMAGE
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              x: 40,
              scale: 0.97,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
              scale: 1,
            }}
            viewport={{
              once: true,
              amount: 0.15,
            }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="
              group
              relative
              min-h-[430px]
              overflow-hidden
              rounded-[8px]
              bg-[#123B5D]
            "
          >
            {/* Image */}

            <Image
              src="https://packingairbag.com/cat/1.webp"
              alt="Dpack protective packaging solutions"
              fill
              unoptimized
              priority
              className="
                object-contain
                p-12
                transition-transform
                duration-1000
                group-hover:scale-105
              "
            />

            {/* Gradient */}

            <div
              className="
                absolute
                inset-0
                bg-gradient-to-t
                from-[#071C2D]/90
                via-[#123B5D]/20
                to-transparent
              "
            />

            {/* Decorative circle */}

            <div
              className="
                pointer-events-none
                absolute
                -right-20
                -top-20
                h-64
                w-64
                rounded-full
                border
                border-white/10
              "
            />

            <div
              className="
                pointer-events-none
                absolute
                -right-10
                -top-10
                h-44
                w-44
                rounded-full
                border
                border-white/10
              "
            />

            {/* Content */}

            <div
              className="
                absolute
                bottom-0
                left-0
                right-0
                z-10
                p-6
                sm:p-7
              "
            >
              <div className="mb-3 flex items-center gap-2">
                <span className="h-[2px] w-8 bg-[#F5A623]" />

              </div>

              <h3
                className="
                  max-w-[330px]
                  text-[28px]
                  font-black
                  leading-[1]
                  tracking-[-0.04em]
                  text-white
                  sm:text-[32px]
                "
              >
                Smarter protection
                <br />
                for every shipment.
              </h3>


              <Link
                href="/products"
                className="
                  mt-5
                  inline-flex
                  items-center
                  gap-2
                  text-[11px]
                  font-black
                  uppercase
                  tracking-[0.07em]
                  text-white
                "
              >
                Explore Collection

                <ArrowUpRight
                  size={15}
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                    group-hover:-translate-y-1
                  "
                />
              </Link>
            </div>

            {/* Corner number */}

            <div
              className="
                absolute
                right-4
                top-4
                z-20
                rounded-sm
                bg-white
                px-3
                py-2
              "
            >
              <span
                className="
                  block
                  text-[20px]
                  font-black
                  leading-none
                  text-[#123B5D]
                "
              >
                01
              </span>

              <span
                className="
                  mt-1
                  block
                  text-[8px]
                  font-bold
                  uppercase
                  tracking-[0.08em]
                  text-[#8A959D]
                "
              >
                Featured
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}