"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Heart,
  ShoppingCart,
  PackageCheck,
} from "lucide-react";

/* =========================================================
   PRODUCTS
========================================================= */

const products = [
  {
    id: 1,
    name: "Dunnage Air Bags",
    image: "https://packingairbag.com/cat/1.webp",
    category: "Dunnage Bags",
    price: "₹1,299",
    oldPrice: "₹1,599",
    discount: "19% OFF",
    link: "/products/dunnage-air-bags",
  },

  {
    id: 2,
    name: "Air Column Bags",
    image: "https://packingairbag.com/cat/5.webp",
    category: "Protective Packaging",
    price: "₹899",
    oldPrice: "₹1,099",
    discount: "18% OFF",
    link: "/products/air-column-bags",
  },

  {
    id: 3,
    name: "Air Column Rolls",
    image: "https://packingairbag.com/cat/2.webp",
    category: "Air Packaging",
    price: "₹1,499",
    oldPrice: "₹1,799",
    discount: "17% OFF",
    link: "/products/air-column-rolls",
  },
];

/* =========================================================
   PRODUCT CARD
========================================================= */

function ProductCard({ product, index }) {
  const handleAddToCart = (e) => {
    e.preventDefault();

    // Yahan baad mein apna cart logic add karna.
    console.log("Added to cart:", product);
  };

  const handleWishlist = (e) => {
    e.preventDefault();

    // Yahan wishlist logic add karna.
    console.log("Wishlist:", product);
  };

  return (
    <motion.article
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
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="
        group
        flex
        h-full
        flex-col
        overflow-hidden
        border
        border-[#DCE3E7]
        bg-white

        transition-all
        duration-500

        hover:-translate-y-1
        hover:border-[#123B5D]/30
        hover:shadow-[0_18px_45px_rgba(18,59,93,0.10)]
      "
    >
      {/* ===================================================
          PRODUCT IMAGE
      =================================================== */}

      <Link
        href={product.link}
        className="
          relative
          block
          h-[220px]
          overflow-hidden
          bg-[#F7F8F9]

          xl:h-[235px]
        "
      >
        {/* DISCOUNT */}

        <span
          className="
            absolute
            left-4
            top-4
            z-20

            bg-[#F5A623]

            px-3
            py-1.5

            text-[12px]
            font-black
            text-[#123B5D]
          "
        >
          {product.discount}
        </span>

        {/* WISHLIST */}

        <button
          type="button"
          aria-label="Add to wishlist"
          onClick={handleWishlist}
          className="
            absolute
            right-4
            top-4
            z-20

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
          <Heart size={17} />
        </button>

        {/* IMAGE */}

        <div className="absolute inset-7">
          <Image
            src={product.image}
            alt={product.name}
            fill
            unoptimized
            sizes="(max-width: 768px) 100vw, 320px"
            className="
              object-contain

              transition-transform
              duration-700
              ease-out

              group-hover:scale-110
            "
          />
        </div>

        {/* QUICK VIEW ARROW */}

        <span
          className="
            absolute
            bottom-4
            right-4

            flex
            h-9
            w-9
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
          <ArrowUpRight size={16} />
        </span>
      </Link>

      {/* ===================================================
          PRODUCT DETAILS
      =================================================== */}

      <div
        className="
          flex
          flex-1
          flex-col
          p-5
        "
      >
        {/* CATEGORY */}

        <p
          className="
            text-[12px]
            font-bold
            uppercase
            tracking-[0.08em]
            text-[#2F7180]
          "
        >
          {product.category}
        </p>

        {/* PRODUCT NAME */}

        <Link href={product.link}>
          <h3
            className="
              mt-2

              text-[16px]
              font-bold
              leading-[1.3]
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
              text-[13px]
              tracking-[1px]
              text-[#F5A623]
            "
          >
            ★★★★★
          </span>

          <span
            className="
              text-[12px]
              text-[#8A959D]
            "
          >
            (24)
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
              text-[19px]
              font-black
              text-[#123B5D]
            "
          >
            {product.price}
          </span>

          <span
            className="
              text-[13px]
              text-[#8A959D]
              line-through
            "
          >
            {product.oldPrice}
          </span>
        </div>

        {/* ADD TO CART */}

        <button
          type="button"
          onClick={handleAddToCart}
          className="
            group/cart

            mt-4
            flex
            w-full
            items-center
            justify-center
            gap-2

            bg-[#123B5D]

            px-4
            py-3

            text-[12px]
            font-black
            uppercase
            tracking-[0.06em]
            text-white

            transition-all
            duration-300

            hover:bg-[#F5A623]
            hover:text-[#123B5D]
          "
        >
          <ShoppingCart size={16} />

          Add to Cart

          <ArrowRight
            size={14}
            className="
              transition-transform
              duration-300

              group-hover/cart:translate-x-1
            "
          />
        </button>
      </div>
    </motion.article>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function BannerProduct() {
  return (
    <section
      className="
        relative
        w-full
        overflow-hidden

        bg-white

        py-12
        lg:py-14
      "
    >
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -right-[180px]
          -top-[180px]

          h-[450px]
          w-[450px]

          bg-[#E6F1F6]

          blur-[120px]
        "
      />

      {/* =====================================================
          CONTAINER
      ===================================================== */}

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
            HEADER
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
                  w-9
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
                Featured Products
              </span>
            </div>

            <h2
              className="
                max-w-[650px]

                text-[34px]
                font-black
                leading-[1]
                tracking-[-0.045em]
                text-[#202830]

                sm:text-[42px]
                lg:text-[48px]
              "
            >
              Shop packaging
              <span className="text-[#123B5D]">
                {" "}built to protect.
              </span>
            </h2>
          </div>

          {/* RIGHT */}

          <div
            className="
              flex
              max-w-[430px]
              flex-col
              items-start

              lg:items-end
            "
          >
            <p
              className="
                text-[14px]
                leading-6
                text-[#66737D]

                lg:text-right
              "
            >
              Shop reliable air packaging products designed
              for secure storage, shipping and transportation.
            </p>

            <Link
              href="/products"
              className="
                group

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
              View All Products

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

                  group-hover:translate-x-1
                "
              >
                <ArrowRight size={14} />
              </span>
            </Link>
          </div>
        </motion.div>

        {/* =================================================
            BANNER + PRODUCTS
        ================================================= */}

        <div
          className="
            grid
            gap-4

            lg:grid-cols-[0.78fr_2.22fr]
          "
        >
          {/* =================================================
              LEFT SHOP BANNER
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
              duration: 0.65,
            }}
            className="
              group
              relative

              min-h-[460px]
              overflow-hidden

              bg-[#123B5D]

              lg:min-h-0
            "
          >
            {/* IMAGE */}

            <Image
              src="/left image.webp"
              alt="Protective Packaging"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 400px"
              className="
                object-cover

                transition-transform
                duration-[1200ms]

                group-hover:scale-105
              "
            />

            {/* OVERLAY */}

            <div
              className="
                absolute
                inset-0

                bg-gradient-to-t

                from-[#0B2A42]
                via-[#123B5D]/45
                to-[#123B5D]/5
              "
            />

            {/* TOP LABEL */}

            <div
              className="
                absolute
                left-5
                top-5

                flex
                items-center
                gap-2

                border
                border-white/20
                bg-[#123B5D]/40

                px-3
                py-2

                backdrop-blur-md
              "
            >
              <PackageCheck
                size={15}
                className="text-[#F5A623]"
              />

              <span
                className="
                  text-[12px]
                  font-bold
                  uppercase
                  tracking-[0.07em]
                  text-white
                "
              >
                Best Sellers
              </span>
            </div>

            {/* CONTENT */}

            <div
              className="
                absolute
                bottom-0
                left-0
                right-0

                p-6
                lg:p-7
              "
            >

            

              {/* SHOP NOW */}

              <Link
                href="/products"
                className="
                  group/shop

                  mt-5
                  inline-flex
                  items-center
                  gap-3

                  bg-[#F5A623]

                  px-5
                  py-3

                  text-[12px]
                  font-black
                  uppercase
                  tracking-[0.06em]
                  text-[#123B5D]

                  transition-all
                  duration-300

                  hover:bg-white
                "
              >
                Shop Now

                <ArrowRight
                  size={15}
                  className="
                    transition-transform
                    duration-300

                    group-hover/shop:translate-x-1
                  "
                />
              </Link>
            </div>
          </motion.div>

          {/* =================================================
              PRODUCT GRID
          ================================================= */}

          <div
            className="
              grid
              grid-cols-1
              gap-4

              sm:grid-cols-2
              xl:grid-cols-3
            "
          >
            {products.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}