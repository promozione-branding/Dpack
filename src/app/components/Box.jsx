"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

/* =========================================================
   PRODUCTS
========================================================= */

const products = [
  {
    id: 1,
    name: "Air Column Bags",
    category: "Protective Packaging",
    description: "Shockproof. Safe. Reliable.",
    image: "/Air column bag (2).webp",
    tag: "Impact Protection",
  },
  {
    id: 2,
    name: "Dunnage Air Bags",
    category: "Cargo Safety",
    description: "Strong support for heavy loads.",
    image: "/Dannage.webp",
    tag: "Heavy Duty",
  },
  {
    id: 3,
    name: "Air Column Rolls",
    category: "Flexible Protection",
    description: "Flexible protection for every shipment.",
    image: "/Air Column Roll (2).webp",
    tag: "Flexible Shield",
  },
  {
    id: 4,
    name: "Gap Fillers",
    category: "Smart Protection",
    description: "Keep your products stable.",
    image: "/Gap filler (3).webp",
    tag: "Load Stability",
  },
  {
    id: 5,
    name: "Packaging Air Bags",
    category: "Product Protection",
    description: "Durable. Versatile. Secure.",
    image: "/packing bag.webp",
    tag: "Safe Packaging",
  },
];

/* =========================================================
   MAIN
========================================================= */

export default function Main() {
  const [activeProduct, setActiveProduct] = useState(0);

  const active = products[activeProduct];

  return (
    <section
  className="
    relative
    w-full
    overflow-hidden
    bg-[#F4F6F8]
    p-2
    sm:p-3
    min-h-[700px]
    md:h-[78vh]
    md:min-h-[590px]
  "
>
      {/* =====================================================
          MAIN GRID
      ===================================================== */}

      <div
        className="
          grid
          min-h-[744px]
          w-full
          grid-cols-1
          gap-2
          sm:gap-3
          md:h-full
          md:min-h-0
          md:grid-cols-[0.85fr_1.7fr_0.85fr]
        "
      >
        {/* ===================================================
            LEFT SIDE
        ==================================================== */}

      <div
  className="
    order-2
    hidden
    h-[380px]
    grid-rows-2
    gap-2
    sm:h-[430px]
    sm:gap-3
    md:order-1
    md:grid
    md:h-full
  "
>
          <SideCard
            product={products[0]}
            color="#F7774F"
            active={activeProduct === 0}
            onClick={() => setActiveProduct(0)}
          />

          <SideCard
            product={products[1]}
            color="#19B895"
            active={activeProduct === 1}
            onClick={() => setActiveProduct(1)}
          />
        </div>

        {/* ===================================================
            CENTER HERO
        ==================================================== */}

        <div
          className="
            order-1
            relative
            min-h-[520px]
            overflow-hidden
            rounded-[18px]
            bg-[#438FB8]
            sm:min-h-[580px]
            md:order-2
            md:min-h-0
            md:rounded-[22px]
          "
        >
          {/* BASE GRADIENT */}

          <div className="absolute inset-0 bg-[linear-gradient(135deg,#397FA8_0%,#4C9BC4_48%,#276F98_100%)]" />

          {/* SOFT LIGHT */}

          <div
            className="
              absolute
              -right-[18%]
              -top-[22%]
              h-[70%]
              w-[70%]
              rounded-full
              bg-white/[0.09]
              blur-[2px]
            "
          />

          <div
            className="
              absolute
              -bottom-[25%]
              -left-[18%]
              h-[65%]
              w-[65%]
              rounded-full
              bg-[#0D567C]/30
              blur-3xl
            "
          />

          {/* GRID / TECHNICAL PATTERN */}

          <div
            className="
              absolute
              inset-0
              opacity-[0.13]
            "
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.35) 1px, transparent 1px)",
              backgroundSize: "42px 42px",
              maskImage:
                "radial-gradient(circle at 65% 55%, black 0%, transparent 65%)",
              WebkitMaskImage:
                "radial-gradient(circle at 65% 55%, black 0%, transparent 65%)",
            }}
          />

          {/* STATIC LIGHT STREAKS */}

          <div
            className="
              absolute
              left-[20%]
              top-[28%]
              h-[1px]
              w-[55%]
              rotate-[-18deg]
              bg-gradient-to-r
              from-transparent
              via-white/25
              to-transparent
            "
          />

          <div
            className="
              absolute
              right-[5%]
              top-[52%]
              h-[1px]
              w-[45%]
              rotate-[20deg]
              bg-gradient-to-r
              from-transparent
              via-white/20
              to-transparent
            "
          />

          {/* =================================================
              STATIC ORBIT SYSTEM
          ================================================= */}

          <div
            className="
              pointer-events-none
              absolute
              bottom-[5%]
              left-[38%]
              top-[25%]
              aspect-square
              w-[65%]
              max-w-[520px]
            "
          >
            <div className="absolute inset-0 rounded-full border border-white/[0.15]" />

            <div className="absolute inset-[8%] rounded-full border border-dashed border-white/[0.18]" />

            <div className="absolute inset-[18%] rounded-full border border-white/[0.12]" />

            <span
              className="
                absolute
                right-[8%]
                top-[22%]
                h-2
                w-2
                rounded-full
                bg-[#FFE15A]
                shadow-[0_0_18px_rgba(255,225,90,.8)]
              "
            />
          </div>

          {/* =================================================
              CENTER TEXT
          ================================================= */}

          <div
            className="
              absolute
              left-[6%]
              right-[6%]
              top-[6%]
              z-30
              max-w-[620px]
              sm:left-[8%]
              sm:right-auto
              sm:top-[9%]
              sm:max-w-[65%]
            "
          >
            <div className="mb-3 flex items-center gap-2 sm:mb-4">
              <span className="h-[1px] w-7 bg-[#FFE15A]" />

              <p
                className="
                  text-[11px]
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                  text-white/75
                  sm:text-[11px]
                  sm:tracking-[0.25em]
                "
              >
                Smart Packaging Solutions
              </p>
            </div>

            <h1
              className="
                text-[30px]
                font-extrabold
                leading-[0.98]
                tracking-[-0.045em]
                text-white
                sm:text-[41px]
                md:text-[44px]
                lg:text-[40px]
                xl:text-[43px]
              "
            >
              Reliable Packaging
              <br />
              for{" "}
              <span className="relative inline-block text-[#FFE15A]">
                a Safer Tomorrow

                <span
                  className="
                    absolute
                    bottom-[-4px]
                    left-0
                    h-[2px]
                    w-full
                    bg-[#FFE15A]/70
                  "
                />
              </span>
            </h1>

            <p
              className="
                mt-3
                max-w-[340px]
                text-[12px]
                leading-[1.55]
                text-white/70
                sm:mt-4
                sm:text-[11px]
              "
            >
              Protective packaging solutions designed to keep your products
              secure throughout storage, handling and transportation.
            </p>

            <Link
              href="/products"
              className="
                group
                mt-4
                inline-flex
                items-center
                gap-3
                rounded-full
                bg-white
                px-5
                py-3
                text-[12px]
                font-bold
                text-[#172333]
                shadow-xl
                shadow-black/10
                transition-colors
                duration-300
                hover:bg-[#FFE15A]
                sm:mt-5
                sm:px-6
                sm:py-3.5
                sm:text-[12px]
              "
            >
              Explore Collection

              <ArrowRight
                size={15}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />
            </Link>
          </div>

          {/* =================================================
              PRODUCT SHOWCASE
          ================================================= */}

          <div
            className="
              absolute
              bottom-[2%]
              left-[18%]
              right-[1%]
              top-[27%]
              z-20
              sm:left-[24%]
              sm:top-[25%]
            "
          >
            {/* Product spotlight */}

            <div
              className="
                absolute
                left-[15%]
                top-[12%]
                h-[65%]
                w-[65%]
                rounded-full
                bg-white
                opacity-[0.13]
                blur-3xl
              "
            />

            {/* Product */}

            <div className="absolute inset-0">
              {/* Floor shadow */}

              <div
                className="
                  absolute
                  bottom-[9%]
                  left-[20%]
                  h-[7%]
                  w-[65%]
                  rounded-full
                  bg-[#063C5B]/40
                  blur-xl
                "
              />

              {/* Product image */}

              <div className="relative h-full w-full">
                <Image
                  src={active.image}
                  alt={active.name}
                  fill
                  priority={activeProduct === 0}
                  sizes="
                    (max-width: 640px) 80vw,
                    (max-width: 768px) 70vw,
                    (max-width: 1280px) 55vw,
                    60vw
                  "
                  className="
                    object-contain
                    object-center
                    drop-shadow-[0_30px_30px_rgba(0,35,60,0.28)]
                  "
                />
              </div>
            </div>

            {/* =================================================
                FEATURE BADGE
            ================================================= */}

            <div
              className="
                absolute
                right-[5%]
                top-[13%]
                z-30
                hidden
                sm:block
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-white/20
                  bg-white/10
                  px-3
                  py-2
                  backdrop-blur-md
                "
              >
                <span
                  className="
                    flex
                    h-6
                    w-6
                    items-center
                    justify-center
                    rounded-full
                    bg-[#FFE15A]
                    text-[#172333]
                  "
                >
                  <ShieldCheck size={12} />
                </span>

                <div>
                  <p
                    className="
                      text-[12px]
                      uppercase
                      tracking-[0.15em]
                      text-white/50
                    "
                  >
                    Designed For
                  </p>

                  <p className="text-[12px] font-bold text-white">
                    {active.tag}
                  </p>
                </div>
              </div>
            </div>

            {/* =================================================
                STATIC SPARK
            ================================================= */}

            <div
              className="
                absolute
                left-[12%]
                top-[25%]
                z-30
                hidden
                sm:block
              "
            >
              <Sparkles
                size={18}
                className="text-[#FFE15A]"
              />
            </div>
          </div>

          {/* =================================================
              PRODUCT INDICATORS
          ================================================= */}

          <div
            className="
              absolute
              bottom-[4%]
              left-[6%]
              z-30
              sm:left-[7%]
              sm:bottom-[5%]
            "
          >
            <div className="flex items-center gap-2">
              {products.map((product, index) => (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => setActiveProduct(index)}
                  className="group p-1"
                  aria-label={`Show ${product.name}`}
                  aria-pressed={activeProduct === index}
                >
                  <span
                    className={`
                      block
                      h-[4px]
                      rounded-full
                      ${
                        activeProduct === index
                          ? "w-9 bg-[#FFE15A]"
                          : "w-2 bg-white/35"
                      }
                    `}
                  />
                </button>
              ))}

              <span
                className="
                  ml-1
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.14em]
                  text-white/50
                  sm:ml-2
                  sm:text-[8px]
                "
              >
                05 Products
              </span>
            </div>
          </div>

          {/* =================================================
              CURRENT PRODUCT
          ================================================= */}

          <div
            className="
              absolute
              bottom-[5%]
              right-[6%]
              z-30
              hidden
              text-right
              sm:block
            "
          >
            <p
              className="
                text-[8px]
                uppercase
                tracking-[0.18em]
                text-white/45
              "
            >
              Featured Product
            </p>

            <p className="mt-1 text-[12px] font-bold text-white">
              {active.name}
            </p>
          </div>
        </div>

        {/* ===================================================
            RIGHT SIDE
        ==================================================== */}
<div
  className="
    order-3
    hidden
    h-[380px]
    grid-rows-2
    gap-2
    sm:h-[430px]
    sm:gap-3
    md:grid
    md:h-full
  "
>
          <SideCard
            product={products[3]}
            color="#ED4D78"
            active={activeProduct === 3}
            onClick={() => setActiveProduct(3)}
          />

          <SideCard
            product={products[4]}
            color="#A978EA"
            active={activeProduct === 4}
            onClick={() => setActiveProduct(4)}
          />
        </div>
      </div>

     
    </section>
  );
}

/* =========================================================
   SIDE PRODUCT CARD
========================================================= */

function SideCard({
  product,
  color,
  active,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        group
        relative
        min-h-0
        overflow-hidden
        rounded-[15px]
        text-left
        shadow-sm
        sm:rounded-[17px]
      "
      style={{
        backgroundColor: color,
      }}
      aria-pressed={active}
    >
      {/* Soft gradient */}

      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.12] via-transparent to-black/[0.10]" />

      {/* Decorative circle */}

      <div
        className="
          absolute
          -right-[25%]
          -top-[30%]
          h-[90%]
          w-[90%]
          rounded-full
          border
          border-white/[0.12]
          bg-white/[0.08]
        "
      />

      {/* Second circle */}

      <div
        className="
          absolute
          -bottom-[30%]
          -left-[15%]
          h-[70%]
          w-[80%]
          rounded-full
          border
          border-white/[0.08]
        "
      />

      {/* Decorative diagonal */}

      <div
        className="
          absolute
          bottom-[-25%]
          left-[20%]
          h-[65%]
          w-[90%]
          rotate-[-15deg]
          bg-white/[0.08]
        "
      />

      {/* Product image */}

      <div
        className="
          absolute
          bottom-[5%]
          right-[1%]
          top-[15%]
          w-[61%]
        "
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="
            (max-width: 640px) 45vw,
            (max-width: 768px) 48vw,
            25vw
          "
          className="
            object-contain
            drop-shadow-[0_18px_18px_rgba(0,0,0,0.14)]
            transition-transform
            duration-300
            group-hover:scale-[1.04]
          "
        />
      </div>

      {/* Text */}

      <div
        className="
          relative
          z-10
          flex
          h-full
          flex-col
          justify-between
          p-3
          sm:p-5
          lg:p-6
        "
      >
        {/* TOP CONTENT */}

        <div className="max-w-[55%]">
          <div className="flex items-center gap-2">
            <span className="h-[1px] w-4 bg-white/60" />

            <p
              className="
                truncate
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.12em]
                text-white/75
                sm:text-[12px]
                sm:tracking-[0.16em]
              "
            >
              {product.category}
            </p>
          </div>

          <h2
            className="
              mt-2
              text-[15px]
              font-extrabold
              leading-[1.05]
              tracking-[-0.035em]
              text-white
              sm:mt-3
              sm:text-[20px]
              lg:text-[23px]
            "
          >
            {product.name}
          </h2>

          <p
            className="
              mt-1
              max-w-[165px]
              text-[12px]
              leading-[1.4]
              text-white/75
              sm:mt-2
              sm:text-[11px]
            "
          >
            {product.description}
          </p>
        </div>

        {/* BOTTOM */}

        <div
          className="
            relative
            z-20
            flex
            items-end
            justify-between
            gap-2
          "
        >
          <div>
            <div className="h-[2px] w-7 bg-white/80" />
          </div>

          <span
            className="
              flex
              items-center
              gap-1
              text-[11px]
              font-semibold
              text-white/90
              sm:text-[11px]
            "
          >
            View Details

            <ArrowUpRight size={13} />
          </span>
        </div>
      </div>

      {/* Active Border */}

      <div
        className={`
          pointer-events-none
          absolute
          inset-0
          rounded-[15px]
          border-2
          border-white/75
          transition-opacity
          duration-200
          sm:rounded-[17px]
          ${active ? "opacity-100" : "opacity-0"}
        `}
      />

      {/* Hover */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-white/0
          transition-colors
          duration-200
          group-hover:bg-white/[0.035]
        "
      />
    </button>
  );
}

