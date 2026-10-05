"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight, ShieldCheck, Sparkles } from "lucide-react";

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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveProduct((prev) => (prev + 1) % products.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const active = products[activeProduct];

  return (
    <section className="relative h-[78vh] min-h-[590px] w-full overflow-hidden bg-[#F4F6F8] p-2 sm:p-3">

      {/* =====================================================
          MAIN GRID
      ===================================================== */}

      <div className="grid h-full w-full grid-cols-1 gap-2 sm:gap-3 md:grid-cols-[0.85fr_1.7fr_0.85fr]">

        {/* ===================================================
            LEFT SIDE
        ==================================================== */}

        <div className="grid h-full grid-rows-2 gap-2 sm:gap-3">
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

        <div className="relative overflow-hidden rounded-[22px] bg-[#438FB8]">

          {/* -------------------------------------------------
              BASE GRADIENT
          ------------------------------------------------- */}

          <div className="absolute inset-0 bg-[linear-gradient(135deg,#397FA8_0%,#4C9BC4_48%,#276F98_100%)]" />

          {/* -------------------------------------------------
              BIG SOFT LIGHT
          ------------------------------------------------- */}

          <motion.div
            animate={{
              scale: [1, 1.12, 1],
              x: [0, 25, 0],
              y: [0, -15, 0],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -right-[18%] -top-[22%] h-[70%] w-[70%] rounded-full bg-white/[0.09] blur-[2px]"
          />

          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              x: [0, -20, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -bottom-[25%] -left-[18%] h-[65%] w-[65%] rounded-full bg-[#0D567C]/30 blur-3xl"
          />

          {/* -------------------------------------------------
              GRID / TECHNICAL PATTERN
          ------------------------------------------------- */}

          <div
            className="absolute inset-0 opacity-[0.13]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.35) 1px, transparent 1px)",
              backgroundSize: "42px 42px",
              maskImage:
                "radial-gradient(circle at 65% 55%, black 0%, transparent 65%)",
            }}
          />

          {/* -------------------------------------------------
              DIAGONAL LIGHT STREAKS
          ------------------------------------------------- */}

          <motion.div
            animate={{
              x: ["-20%", "120%"],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-[28%] h-[1px] w-[65%] rotate-[-18deg] bg-gradient-to-r from-transparent via-white/60 to-transparent"
          />

          <motion.div
            animate={{
              x: ["100%", "-30%"],
              opacity: [0, 0.35, 0],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              delay: 2,
              ease: "easeInOut",
            }}
            className="absolute top-[52%] h-[1px] w-[55%] rotate-[20deg] bg-gradient-to-r from-transparent via-white/50 to-transparent"
          />

          {/* =================================================
              ORBIT SYSTEM
          ================================================= */}

          <div className="absolute bottom-[5%] left-[38%] top-[25%] aspect-square w-[65%] max-w-[520px]">

            {/* Outer orbit */}

            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 28,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-0 rounded-full border border-white/[0.15]"
            />

            {/* Middle orbit */}

            <motion.div
              animate={{ rotate: -360 }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-[8%] rounded-full border border-dashed border-white/[0.18]"
            />

            {/* Inner orbit */}

            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 14,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-[18%] rounded-full border border-white/[0.12]"
            />

            {/* Orbit dot */}

            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-0"
            >
              <span className="absolute right-[8%] top-[22%] h-2 w-2 rounded-full bg-[#FFE15A] shadow-[0_0_18px_rgba(255,225,90,.8)]" />
            </motion.div>

          </div>

          {/* =================================================
              CENTER TEXT
          ================================================= */}

          <div className="absolute left-[7%] top-[7%] z-30 max-w-[65%] sm:left-[8%] sm:top-[9%]">

            <motion.div
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="mb-4 flex items-center gap-2"
            >
              <span className="h-[1px] w-7 bg-[#FFE15A]" />

              <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-white/75 sm:text-[10px]">
                Smart Packaging Solutions
              </p>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.1,
              }}
              className="text-[31px] font-extrabold leading-[0.98] tracking-[-0.045em] text-white sm:text-[41px] md:text-[44px] lg:text-[40px] xl:text-[43px]"
            >
              Reliable Packaging
              <br />
              for a{" "}
              <span className="relative inline-block text-[#FFE15A]">
                Safer Tomorrow

                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="absolute bottom-[-4px] left-0 h-[2px] bg-[#FFE15A]/70"
                />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.25,
              }}
              className="mt-4 max-w-[340px] text-[10px] leading-[1.55] text-white/70 sm:text-[11px]"
            >
              Protective packaging solutions designed to keep your products
              secure throughout storage, handling and transportation.
            </motion.p>

            <Link
              href="/products"
              className="group mt-5 inline-flex items-center gap-3 rounded-full bg-white px-5 py-3 text-[11px] font-bold text-[#172333] shadow-xl shadow-black/10 transition-all duration-300 hover:gap-5 hover:bg-[#FFE15A] sm:px-6 sm:py-3.5 sm:text-[12px]"
            >
              Explore Collection

              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

          </div>

          {/* =================================================
              PRODUCT SHOWCASE
          ================================================= */}

          <div className="absolute bottom-[2%] left-[24%] right-[1%] top-[25%] z-20">

            {/* Product spotlight */}

            <motion.div
              animate={{
                scale: [0.95, 1.05, 0.95],
                opacity: [0.12, 0.2, 0.12],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute left-[15%] top-[12%] h-[65%] w-[65%] rounded-full bg-white blur-3xl"
            />

            <AnimatePresence mode="wait">

              <motion.div
                key={activeProduct}
                initial={{
                  opacity: 0,
                  scale: 0.7,
                  x: 90,
                  rotate: 5,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  x: 0,
                  rotate: 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.88,
                  x: -60,
                  rotate: -4,
                }}
                transition={{
                  duration: 0.9,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute inset-0"
              >

                {/* Floor shadow */}

                <motion.div
                  animate={{
                    scaleX: [0.85, 1, 0.85],
                    opacity: [0.18, 0.28, 0.18],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute bottom-[9%] left-[20%] h-[7%] w-[65%] rounded-full bg-[#063C5B]/40 blur-xl"
                />

                {/* Floating product */}

                <motion.div
                  animate={{
                    y: [0, -13, 0],
                    rotate: [0, 0.7, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative h-full w-full"
                >
                  <Image
                    src={active.image}
                    alt={active.name}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 60vw"
                    className="object-contain object-center drop-shadow-[0_30px_30px_rgba(0,35,60,0.28)]"
                  />
                </motion.div>

              </motion.div>

            </AnimatePresence>

            {/* =================================================
                FLOATING FEATURE BADGE
            ================================================= */}

            <AnimatePresence mode="wait">

              <motion.div
                key={`badge-${activeProduct}`}
                initial={{
                  opacity: 0,
                  y: 15,
                  scale: 0.9,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  y: -10,
                }}
                transition={{
                  duration: 0.5,
                }}
                className="absolute right-[5%] top-[13%] z-30 hidden sm:block"
              >

                <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2 backdrop-blur-md">

                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FFE15A] text-[#172333]">
                    <ShieldCheck size={12} />
                  </span>

                  <div>
                    <p className="text-[7px] uppercase tracking-[0.15em] text-white/50">
                      Designed For
                    </p>

                    <p className="text-[9px] font-bold text-white">
                      {active.tag}
                    </p>
                  </div>

                </div>

              </motion.div>

            </AnimatePresence>

            {/* =================================================
                FLOATING SPARK
            ================================================= */}

            <motion.div
              animate={{
                y: [0, -10, 0],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute left-[12%] top-[25%] z-30 hidden sm:block"
            >
              <Sparkles
                size={18}
                className="text-[#FFE15A]"
              />
            </motion.div>

          </div>

          {/* =================================================
              PRODUCT INDICATORS
          ================================================= */}

          <div className="absolute bottom-[5%] left-[7%] z-30">

            <div className="flex items-center gap-2">

              {products.map((product, index) => (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => setActiveProduct(index)}
                  className="group"
                  aria-label={`Show ${product.name}`}
                >
                  <span
                    className={`block h-[4px] rounded-full transition-all duration-500 ${
                      activeProduct === index
                        ? "w-9 bg-[#FFE15A]"
                        : "w-2 bg-white/35 group-hover:bg-white/60"
                    }`}
                  />
                </button>
              ))}

              <span className="ml-2 text-[8px] font-semibold uppercase tracking-[0.16em] text-white/50">
                05 Products
              </span>

            </div>

          </div>

          {/* =================================================
              CURRENT PRODUCT
          ================================================= */}

          <AnimatePresence mode="wait">

            <motion.div
              key={activeProduct}
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
                y: -10,
              }}
              className="absolute bottom-[5%] right-[6%] z-30 hidden text-right sm:block"
            >

              <p className="text-[8px] uppercase tracking-[0.18em] text-white/45">
                Featured Product
              </p>

              <p className="mt-1 text-[12px] font-bold text-white">
                {active.name}
              </p>

            </motion.div>

          </AnimatePresence>

        </div>

        {/* ===================================================
            RIGHT SIDE
        ==================================================== */}

        <div className="grid h-full grid-rows-2 gap-2 sm:gap-3">

          <SideCard
            product={products[3]}
            color="#ED4D78"
            active={activeProduct === 3}
            onClick={() => setActiveProduct(3)}
          />

          <SideCard
            product={products[4]}
            color="#9155E8"
            active={activeProduct === 4}
            onClick={() => setActiveProduct(4)}
          />

        </div>

      </div>

      {/* =====================================================
          MOBILE PRODUCT NAVIGATION
      ====================================================== */}

      <div className="absolute bottom-4 left-4 right-4 z-40 flex gap-2 overflow-x-auto md:hidden">

        {products.map((product, index) => (
          <button
            key={product.id}
            type="button"
            onClick={() => setActiveProduct(index)}
            className={`shrink-0 rounded-full px-4 py-2 text-[10px] font-semibold shadow-sm transition-all ${
              activeProduct === index
                ? "bg-[#081A33] text-white"
                : "bg-white/95 text-[#111827]"
            }`}
          >
            {product.name}
          </button>
        ))}

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
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{
        scale: 0.985,
      }}
      whileTap={{
        scale: 0.975,
      }}
      className="group relative min-h-0 overflow-hidden rounded-[17px] text-left shadow-sm"
      style={{
        backgroundColor: color,
      }}
    >

      {/* Soft gradient */}

      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.12] via-transparent to-black/[0.10]" />

      {/* Decorative circle */}

      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          rotate: [0, 4, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -right-[25%] -top-[30%] h-[90%] w-[90%] rounded-full border border-white/[0.12] bg-white/[0.08]"
      />

      {/* Second circle */}

      <div className="absolute -bottom-[30%] -left-[15%] h-[70%] w-[80%] rounded-full border border-white/[0.08]" />

      {/* Decorative diagonal */}

      <div className="absolute bottom-[-25%] left-[20%] h-[65%] w-[90%] rotate-[-15deg] bg-white/[0.08]" />

      {/* Product image */}

      <motion.div
        animate={{
          y: [0, -5, 0],
          rotate: [0, 1, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[5%] right-[1%] top-[15%] w-[61%]"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-contain transition-transform duration-700 group-hover:scale-[1.07] drop-shadow-[0_18px_18px_rgba(0,0,0,0.14)]"
        />
      </motion.div>

      {/* Text */}

      <div className="relative z-10 flex h-full flex-col justify-between p-4 sm:p-5 lg:p-6">

        <div className="max-w-[55%]">

          <div className="flex items-center gap-2">
            <span className="h-[1px] w-4 bg-white/60" />

            <p className="text-[8px] font-semibold uppercase tracking-[0.16em] text-white/75 sm:text-[9px]">
              {product.category}
            </p>
          </div>

          <h2 className="mt-3 text-[17px] font-extrabold leading-[1.05] tracking-[-0.035em] text-white sm:text-[20px] lg:text-[23px]">
            {product.name}
          </h2>

          <p className="mt-2 max-w-[165px] text-[10px] leading-[1.4] text-white/75 sm:text-[11px]">
            {product.description}
          </p>

        </div>

        {/* Bottom */}

        <div className="relative z-20 flex items-end justify-between gap-2">

          <div>
            <div className="h-[2px] w-7 bg-white/80 transition-all duration-300 group-hover:w-10" />
          </div>

          <span className="flex items-center gap-1 text-[14px] font-semibold text-white/90 transition-all duration-300 group-hover:gap-2 sm:text-[1px]">
            View Details

            <ArrowUpRight
              size={13}
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </span>

        </div>

      </div>

      {/* Active Border */}

      <motion.div
        initial={false}
        animate={{
          opacity: active ? 1 : 0,
        }}
        className="pointer-events-none absolute inset-0 rounded-[17px] border-2 border-white/75"
      />

      {/* Hover */}

      <div className="pointer-events-none absolute inset-0 bg-white/0 transition-all duration-300 group-hover:bg-white/[0.035]" />

    </motion.button>
  );
}

