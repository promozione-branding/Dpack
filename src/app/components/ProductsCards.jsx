"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

const products = {
  left: [
    {
      id: 1,
      name: "Dunnage Air Bag",
      subtitle: "Heavy Duty Packaging Protection",
      image: "/products/dunnage-bag.webp",
      price: "₹450.00",
      oldPrice: "",
      discount: "",
    },
    {
      id: 2,
      name: "Air Column Bag",
      subtitle: "Premium Product Protection",
      image: "/products/air-column-bag.webp",
      price: "₹320.00",
      oldPrice: "₹380.00",
      discount: "-5%",
    },
    {
      id: 3,
      name: "Air Pillow Packaging",
      subtitle: "Lightweight Protective Solution",
      image: "/products/air-pillow.webp",
      price: "₹280.00",
      oldPrice: "₹310.00",
      discount: "-10%",
    },
  ],

  right: [
    {
      id: 4,
      name: "Bubble Wrap Roll",
      subtitle: "Strong & Flexible Protection",
      image: "/products/bubble-wrap.webp",
      price: "₹699.00",
      oldPrice: "₹799.00",
      discount: "-9%",
    },
    {
      id: 5,
      name: "Packaging Air Bag",
      subtitle: "Fast & Secure Packaging",
      image: "/products/packaging-air-bag.webp",
      price: "₹599.00",
      oldPrice: "",
      discount: "",
    },
    {
      id: 6,
      name: "Protective Packaging",
      subtitle: "High Performance Packaging",
      image: "/products/protective-packaging.webp",
      price: "₹799.00",
      oldPrice: "",
      discount: "",
    },
  ],

  featured: {
    image: "/products/featured-product.webp",
    name: "Premium Packaging Solution",
  },

  bottom: {
    id: 7,
    name: "Industrial Packaging Bag",
    subtitle: "High Performance Protection",
    image: "/products/industrial-bag.webp",
    price: "₹599.00",
    oldPrice: "",
    discount: "",
  },
};

function Rating() {
  return (
    <div className="flex items-center gap-[2px] mt-2">
      {[1, 2, 3, 4, 5].map((item) => (
        <Star
          key={item}
          size={13}
          strokeWidth={1.2}
          className="text-[#c7c7c7]"
        />
      ))}

      <span className="text-[10px] text-[#999] ml-1">
        (0)
      </span>
    </div>
  );
}

function ProductCard({ product }) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="
        group
        relative
        w-full
        h-[180px]
        md:h-[180px]
        lg:h-[182px]
        border
        border-[#e3e3e3]
        rounded-[15px]
        bg-white
        flex
        items-center
        overflow-hidden
        transition-all
        duration-300
        hover:border-[#cfcfcf]
        hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]
      "
    >

      {/* DISCOUNT */}

      {product.discount && (
        <div
          className="
            absolute
            top-[10px]
            left-[10px]
            z-10
            bg-[#ef3973]
            text-white
            px-[10px]
            py-[5px]
            text-[11px]
            font-medium
            rounded-tl-[3px]
            rounded-br-[3px]
          "
        >
          {product.discount}
        </div>
      )}


      {/* PRODUCT IMAGE */}

      <div
        className="
          relative
          w-[42%]
          h-full
          flex
          items-center
          justify-center
          p-5
          shrink-0
        "
      >

        <div
          className="
            relative
            w-full
            h-[125px]
            transition-transform
            duration-500
            group-hover:scale-105
          "
        >

          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="180px"
            className="object-contain"
          />

        </div>

      </div>


      {/* PRODUCT CONTENT */}

      <div
        className="
          flex-1
          pr-5
          py-5
          min-w-0
        "
      >

        <h3
          className="
            text-[14px]
            md:text-[14px]
            font-semibold
            leading-[1.5]
            text-[#111]
            group-hover:text-[#b48a45]
            transition-colors
          "
        >
          {product.name}
        </h3>


        <p
          className="
            text-[13px]
            md:text-[13px]
            leading-[1.5]
            text-[#111]
            mt-[1px]
          "
        >
          {product.subtitle}
        </p>


        <Rating />


        {/* PRICE */}

        <div
          className="
            flex
            items-center
            flex-wrap
            gap-2
            mt-3
          "
        >

          <span
            className={`
              text-[14px]
              font-semibold
              ${
                product.oldPrice
                  ? "text-[#ef3973]"
                  : "text-[#111]"
              }
            `}
          >
            {product.price}
          </span>


          {product.oldPrice && (
            <span
              className="
                text-[13px]
                text-[#888]
                line-through
              "
            >
              {product.oldPrice}
            </span>
          )}

        </div>

      </div>

    </Link>
  );
}

export default function FeaturedProducts() {
  return (
    <section
      className="
        w-full
        bg-white
        py-10
        md:py-12
        lg:py-14
      "
    >

      {/* =====================================================
          SECTION HEADING
      ===================================================== */}

      <div className="text-center mb-10">

        <h2
          className="
            text-[28px]
            md:text-[32px]
            lg:text-[34px]
            leading-none
            font-semibold
            text-[#111]
          "
        >
          Featured Products
        </h2>

      </div>


      {/* =====================================================
          PRODUCT GRID
      ===================================================== */}

      <div
        className="
          max-w-[1290px]
          mx-auto
          px-5
          lg:px-0
        "
      >

        {/* DESKTOP */}

        <div
          className="
            hidden
            lg:grid
            grid-cols-[1fr_1fr_1fr]
            grid-rows-[182px_182px_182px]
            gap-[14px]
          "
        >

          {/* LEFT TOP */}

          <ProductCard
            product={products.left[0]}
          />


          {/* CENTER FEATURED IMAGE */}

          <Link
            href="/shop"
            className="
              relative
              row-span-2
              rounded-[15px]
              overflow-hidden
              group
              bg-[#eeeeee]
            "
          >

            <Image
              src={products.featured.image}
              alt={products.featured.name}
              fill
              sizes="430px"
              className="
                object-cover
                transition-transform
                duration-700
                group-hover:scale-105
              "
            />

            {/* IMAGE OVERLAY */}

            <div
              className="
                absolute
                inset-0
                bg-gradient-to-t
                from-black/20
                via-transparent
                to-transparent
              "
            />

          </Link>


          {/* RIGHT TOP */}

          <ProductCard
            product={products.right[0]}
          />


          {/* LEFT MIDDLE */}

          <ProductCard
            product={products.left[1]}
          />


          {/* RIGHT MIDDLE */}

          <ProductCard
            product={products.right[1]}
          />


          {/* LEFT BOTTOM */}

          <ProductCard
            product={products.left[2]}
          />


          {/* CENTER BOTTOM */}

          <ProductCard
            product={products.bottom}
          />


          {/* RIGHT BOTTOM */}

          <ProductCard
            product={products.right[2]}
          />

        </div>


        {/* =================================================
            TABLET / MOBILE
        ================================================= */}

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            gap-4
            lg:hidden
          "
        >

          {/* FEATURED IMAGE */}

          <Link
            href="/shop"
            className="
              relative
              sm:col-span-2
              w-full
              h-[320px]
              sm:h-[380px]
              rounded-[15px]
              overflow-hidden
              group
              bg-[#eeeeee]
            "
          >

            <Image
              src={products.featured.image}
              alt={products.featured.name}
              fill
              sizes="100vw"
              className="
                object-cover
                transition-transform
                duration-700
                group-hover:scale-105
              "
            />

          </Link>


          {products.left.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}


          {products.right.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}


          <ProductCard
            product={products.bottom}
          />

        </div>

      </div>

    </section>
  );
}