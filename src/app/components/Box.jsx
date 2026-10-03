"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";

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
  },
  {
    id: 2,
    name: "Dunnage Air Bags",
    category: "Cargo Safety",
    description: "Strong support for heavy loads.",
    image: "/Dannage.webp",
  },
  {
    id: 3,
    name: "Air Column Rolls",
    category: "Flexible Protection",
    description: "Flexible protection for every shipment.",
    image: "/Air Column Roll (2).webp",
  },
  {
    id: 4,
    name: "Gap Fillers",
    category: "Smart Protection",
    description: "Keep your products stable.",
    image: "/Gap filler (3).webp",
  },
  {
    id: 5,
    name: "Packaging Air Bags",
    category: "Product Protection",
    description: "Durable. Versatile. Secure.",
    image: "/packing bag.webp",
  },
];

export default function Main() {
  const [activeProduct, setActiveProduct] = useState(0);

  /* =======================================================
     AUTO CHANGE CENTER PRODUCT
  ======================================================== */

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveProduct((prev) => (prev + 1) % products.length);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const active = products[activeProduct];

  return (
    <section className="relative h-[78vh] min-h-[590px] w-full overflow-hidden bg-[#F7F8FA] p-2 sm:p-3">
      {/* =====================================================
          MAIN GRID
      ====================================================== */}

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
            CENTER PRODUCT SHOWCASE
        ==================================================== */}

        <div className="relative overflow-hidden rounded-[20px] bg-[#4C9BC4]">

          {/* Soft background gradient */}

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(255,255,255,0.18),transparent_34%),radial-gradient(circle_at_20%_100%,rgba(0,45,80,0.22),transparent_40%)]" />

          {/* Animated glow */}

          <motion.div
            animate={{
              x: [0, 25, 0],
              y: [0, -15, 0],
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -right-[15%] -top-[15%] h-[75%] w-[75%] rounded-full bg-white/[0.08]"
          />

          <motion.div
            animate={{
              x: [0, -20, 0],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-[-25%] left-[-10%] h-[60%] w-[65%] rounded-full bg-[#236F9A]/30 blur-3xl"
          />

          {/* Decorative lines */}

          <div className="absolute left-[7%] top-[18%] h-[1px] w-[30%] rotate-[-25deg] bg-white/10" />

          <div className="absolute right-[8%] top-[30%] h-[1px] w-[22%] rotate-[25deg] bg-white/10" />

          <div className="absolute bottom-[20%] left-[10%] h-[1px] w-[25%] rotate-[20deg] bg-white/10" />

          {/* =================================================
              CENTER TEXT
          ================================================== */}

          <div className="absolute left-[7%] top-[8%] z-20 max-w-[62%] sm:left-[8%] sm:top-[10%]">

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-4 flex items-center gap-2"
            >
              <span className="h-[1px] w-6 bg-white/60" />

              <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-white/75 sm:text-[10px]">
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
              className="group mt-5 inline-flex items-center gap-3 rounded-full bg-white px-5 py-3 text-[11px] font-bold text-[#172333] shadow-lg shadow-black/10 transition-all duration-300 hover:gap-5 hover:bg-[#FFE15A] sm:px-6 sm:py-3.5 sm:text-[12px]"
            >
              Explore Collection

              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>

          {/* =================================================
              CENTER PRODUCT IMAGE
          ================================================== */}

          <div className="absolute bottom-[2%] left-[23%] right-[1%] top-[27%] z-10">

            <AnimatePresence mode="wait">
              <motion.div
                key={activeProduct}
                initial={{
                  opacity: 0,
                  scale: 0.75,
                  x: 80,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  x: 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.9,
                  x: -45,
                }}
                transition={{
                  duration: 0.85,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute inset-0"
              >
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 0.5, 0],
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
                    className="object-contain object-center drop-shadow-[0_25px_30px_rgba(0,40,70,0.18)]"
                  />
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* =================================================
              PRODUCT INDICATORS
          ================================================== */}

          <div className="absolute bottom-[5%] left-[7%] z-20">

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
                        ? "w-8 bg-white"
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
          ================================================== */}

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
              className="absolute bottom-[5%] right-[6%] z-20 hidden text-right sm:block"
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

      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.10] via-transparent to-black/[0.08]" />

      {/* Decorative circle */}

      <motion.div
        animate={{
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -right-[25%] -top-[30%] h-[90%] w-[90%] rounded-full bg-white/[0.10]"
      />

      {/* Decorative diagonal */}

      <div className="absolute bottom-[-25%] left-[20%] h-[65%] w-[90%] rotate-[-15deg] bg-white/[0.08]" />

      {/* =================================================
          PRODUCT IMAGE
      ================================================== */}

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
          className="object-contain transition-transform duration-700 group-hover:scale-[1.07] drop-shadow-[0_18px_18px_rgba(0,0,0,0.12)]"
        />
      </motion.div>

      {/* =================================================
          TEXT
      ================================================== */}

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

          <span className="flex items-center gap-1 text-[9px] font-semibold text-white/90 transition-all duration-300 group-hover:gap-2 sm:text-[10px]">
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

      {/* Hover overlay */}

      <div className="pointer-events-none absolute inset-0 bg-white/0 transition-all duration-300 group-hover:bg-white/[0.035]" />
    </motion.button>
  );
}