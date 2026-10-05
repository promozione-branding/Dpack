"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ArrowRight,
  ShieldCheck,
  Eye,
  PackageCheck,
} from "lucide-react";

/* ============================================================
   ANIMATION
============================================================ */

const ease = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease,
    },
  },
};

const fadeLeft = {
  hidden: {
    opacity: 0,
    x: -50,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease,
    },
  },
};

const fadeRight = {
  hidden: {
    opacity: 0,
    x: 50,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease,
    },
  },
};

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

/* ============================================================
   DOT BACKGROUND
============================================================ */

function DotPattern({ dark = false }) {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-60"
      style={{
        backgroundImage: dark
          ? "radial-gradient(rgba(255,255,255,0.12) 1px, transparent 1px)"
          : "radial-gradient(rgba(8,26,51,0.10) 1px, transparent 1px)",
        backgroundSize: "16px 16px",
      }}
    />
  );
}

/* ============================================================
   CORNER FRAME
============================================================ */

function CornerFrame({ children, className = "" }) {
  return (
    <div className={`relative ${className}`}>
      {/* top left */}
      <div className="absolute -left-4 -top-4 z-20 h-24 w-24 border-l-2 border-t-2 border-[#F5A623] sm:-left-5 sm:-top-5" />

      {/* bottom right */}
      <div className="absolute -bottom-4 -right-4 z-20 h-24 w-24 border-b-2 border-r-2 border-[#F5A623] sm:-bottom-5 sm:-right-5" />

      {children}
    </div>
  );
}

/* ============================================================
   MAIN
============================================================ */

export default function AboutUs() {
  const products = [
    {
      number: "01",
      name: "Air Column Packaging",
      image: "/Air column bag (2).webp",
      href: "/products/air-column-bags",
    },
    {
      number: "02",
      name: "Dunnage Packaging",
      image: "/Dannage.webp",
      href: "/products/dunnage-air-bags",
    },
    {
      number: "03",
      name: "Packaging Air Bags",
      image: "/packing bag.webp",
      href: "/products/packaging-air-bags",
    },
    {
      number: "04",
      name: "Gap Fillers",
      image: "/Gap filler (3).webp",
      href: "/products/gap-fillers",
    },
    {
      number: "05",
      name: "Air Column Rolls",
      image: "/Air Column Roll (2).webp",
      href: "/products/air-column-rolls",
    },
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-[#F7F7F5] text-[#081A33]">

      {/* ======================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden bg-[#F7F7F5] px-6 py-16 sm:px-8 lg:px-12 lg:py-20">

        <DotPattern />

        {/* Huge Background Text */}

        <motion.div
          initial={{
            opacity: 0,
            x: -80,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 1.2,
            ease,
          }}
          className="pointer-events-none absolute -left-4 top-0 select-none text-[25vw] font-black leading-none tracking-[-0.09em] text-[#081A33]/[0.045] sm:text-[21vw]"
        >
          DPACK
        </motion.div>

        {/* Decorative vertical line */}

        <div className="pointer-events-none absolute right-[7%] top-0 hidden h-full w-px bg-[#081A33]/[0.06] lg:block" />

        <div className="relative z-10 mx-auto max-w-[1450px]">

          <div className="grid min-h-[calc(100svh-160px)] items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">

            {/* LEFT */}

            <motion.div
              initial="hidden"
              animate="show"
              variants={stagger}
              className="relative z-10"
            >

              <motion.div
                variants={fadeUp}
                className="mb-6 flex items-center gap-3"
              >
                <span className="h-[3px] w-10 bg-[#F5A623]" />

                <span className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#D98C00]">
                  About DPack
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="max-w-2xl text-[46px] font-black leading-[0.89] tracking-[-0.06em] sm:text-[60px] lg:text-[76px]"
              >
                Packaging
                <span className="block text-[#F5A623]">
                  that protects.
                </span>

                <span className="mt-3 block">
                  Products that
                </span>

                <span className="block text-[#98A1AA]">
                  move forward.
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-8 max-w-xl text-sm leading-7 text-[#5E6873] sm:text-base"
              >
                DPack creates practical packaging solutions designed to
                protect products, simplify packing and support safer
                movement through every stage of the supply chain.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="mt-8 flex items-center gap-4"
              >
                <span className="h-px w-12 bg-[#081A33]" />

                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#081A33]">
                  Protect • Pack • Move
                </span>
              </motion.div>

            </motion.div>

            {/* RIGHT IMAGE */}

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.94,
                x: 70,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                x: 0,
              }}
              transition={{
                duration: 1,
                delay: 0.15,
                ease,
              }}
              className="relative"
            >

              <CornerFrame>

                <div className="relative overflow-hidden bg-[#081A33] p-2">

                  <motion.div
                    initial={{
                      scale: 1.12,
                    }}
                    animate={{
                      scale: 1,
                    }}
                    transition={{
                      duration: 1.4,
                      ease,
                    }}
                    className="relative h-[420px] overflow-hidden sm:h-[520px] lg:h-[590px]"
                  >

                    <Image
                      src="/Dannage.webp"
                      alt="DPack Dunnage Air Bags"
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, 60vw"
                      className="object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#081A33]/90 via-[#081A33]/10 to-transparent" />

                    <div className="absolute bottom-7 left-7 right-7 flex items-end justify-between">

                      <div>

                        <p className="text-5xl font-black leading-none text-white sm:text-6xl">
                          DPack
                        </p>

                        <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.35em] text-white/65">
                          Packaging Solutions
                        </p>

                      </div>

                      <PackageCheck
                        size={42}
                        strokeWidth={1.3}
                        className="text-[#F5A623]"
                      />

                    </div>

                  </motion.div>

                </div>

              </CornerFrame>

              {/* Floating badge */}

              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -bottom-6 -left-3 z-30 bg-[#F5A623] px-6 py-5 shadow-2xl sm:-left-8"
              >

                <p className="text-3xl font-black leading-none text-[#081A33]">
                  100%
                </p>

                <p className="mt-1 text-[8px] font-black uppercase tracking-[0.2em] text-[#081A33]/65">
                  Protection Focused
                </p>

              </motion.div>

            </motion.div>

          </div>

        </div>

      </section>


      {/* ======================================================
          ABOUT STORY
      ====================================================== */}

      <section className="relative overflow-hidden bg-white px-6 py-20 sm:px-8 lg:px-12 lg:py-28">

        <DotPattern />

        <div className="relative z-10 mx-auto max-w-[1400px]">

          <div className="grid items-center gap-14 lg:grid-cols-[1fr_0.95fr] lg:gap-20">

            {/* IMAGE */}

            <motion.div
              variants={fadeLeft}
              initial="hidden"
              whileInView="show"
              viewport={{
                once: true,
                amount: 0.2,
              }}
              className="relative"
            >

              <CornerFrame>

                <div className="overflow-hidden bg-[#081A33] p-2">

                  <motion.div
                    initial={{
                      scale: 1.08,
                    }}
                    whileInView={{
                      scale: 1,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      duration: 1.2,
                      ease,
                    }}
                    className="relative h-[420px] overflow-hidden sm:h-[520px] lg:h-[550px]"
                  >

                    <Image
                      src="/Air column bag (2).webp"
                      alt="DPack Air Column Packaging"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#081A33]/85 via-transparent to-transparent" />

                    <div className="absolute bottom-7 left-7">

                      <p className="text-4xl font-black text-white sm:text-5xl">
                        DPACK
                      </p>

                      <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.3em] text-white/60">
                        Protective Packaging
                      </p>

                    </div>

                  </motion.div>

                </div>

              </CornerFrame>

            </motion.div>


            {/* CONTENT */}

            <motion.div
              variants={fadeRight}
              initial="hidden"
              whileInView="show"
              viewport={{
                once: true,
                amount: 0.2,
              }}
            >

              <div className="flex items-center gap-3">

                <span className="h-[3px] w-10 bg-[#F5A623]" />

                <span className="text-[10px] font-black uppercase tracking-[0.32em] text-[#D98C00]">
                  Who We Are
                </span>

              </div>

              <h2 className="mt-6 text-5xl font-black leading-[0.9] tracking-[-0.05em] sm:text-6xl lg:text-7xl">

                About

                <span className="block text-[#F5A623]">
                  DPack.
                </span>

              </h2>

              <div className="mt-8 max-w-xl space-y-5 text-sm leading-7 text-[#65707B] sm:text-base">

                <p>
                  DPack is focused on providing dependable packaging
                  solutions for businesses that need to protect products
                  during handling, storage and transportation.
                </p>

                <p>
                  Our product range includes protective air packaging,
                  dunnage solutions, packaging bags, gap fillers and
                  other practical packaging products.
                </p>

                <p>
                  We believe packaging should not only protect a product,
                  but should also make the packing process easier,
                  faster and more efficient.
                </p>

              </div>

              {/* STATS */}

              <div className="mt-10 grid grid-cols-3 border-y border-[#081A33]/15">

                <div className="py-6">

                  <p className="text-3xl font-black text-[#081A33] sm:text-4xl">
                    01
                  </p>

                  <p className="mt-2 text-[8px] font-black uppercase tracking-[0.18em] text-[#8A939B] sm:text-[9px]">
                    Protection
                  </p>

                </div>

                <div className="border-x border-[#081A33]/15 px-4 py-6">

                  <p className="text-3xl font-black text-[#081A33] sm:text-4xl">
                    05+
                  </p>

                  <p className="mt-2 text-[8px] font-black uppercase tracking-[0.18em] text-[#8A939B] sm:text-[9px]">
                    Solutions
                  </p>

                </div>

                <div className="px-4 py-6">

                  <p className="text-3xl font-black text-[#081A33] sm:text-4xl">
                    PAN
                  </p>

                  <p className="mt-2 text-[8px] font-black uppercase tracking-[0.18em] text-[#8A939B] sm:text-[9px]">
                    Reach
                  </p>

                </div>

              </div>

              <div className="mt-7 flex items-center gap-4">

                <span className="h-px w-12 bg-[#081A33]/30" />

                <p className="text-[9px] font-black uppercase tracking-[0.25em] text-[#8A939B]">
                  Packaging • Protection • Performance
                </p>

              </div>

            </motion.div>

          </div>

        </div>

      </section>


      {/* ======================================================
          MISSION + VISION
      ====================================================== */}

      <section className="relative overflow-hidden bg-[#081A33] px-6 py-20 text-white sm:px-8 lg:px-12 lg:py-28">

        <DotPattern dark />

        {/* Decorative circles */}

        <div className="pointer-events-none absolute -right-40 bottom-[-250px] h-[600px] w-[600px] rounded-full border border-[#F5A623]/25" />

        <div className="pointer-events-none absolute -right-20 bottom-[-190px] h-[480px] w-[480px] rounded-full border border-[#F5A623]/15" />

        <div className="relative z-10 mx-auto max-w-[1400px]">

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
            }}
            transition={{
              duration: 0.7,
              ease,
            }}
          >

            <div className="flex items-center gap-3">

              <span className="h-[3px] w-10 bg-[#F5A623]" />

              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#F5A623]">
                What Drives Us
              </p>

            </div>

            <h2 className="mt-6 max-w-4xl text-5xl font-black leading-[0.9] tracking-[-0.05em] sm:text-6xl lg:text-7xl">

              Built around better

              <span className="block text-[#F5A623]">
                packaging.
              </span>

            </h2>

          </motion.div>


          <div className="mt-14 grid gap-5 lg:grid-cols-2">

            {/* MISSION */}

            <motion.div
              initial={{
                opacity: 0,
                x: -50,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.8,
                ease,
              }}
              className="relative overflow-hidden bg-[#F5A623] p-8 text-[#081A33] sm:p-10 lg:p-14"
            >

              <div className="absolute right-8 top-8 opacity-20">
                <ShieldCheck size={58} strokeWidth={1.2} />
              </div>

              <p className="text-[10px] font-black uppercase tracking-[0.3em]">
                01 / Mission
              </p>

              <h3 className="mt-8 max-w-md text-4xl font-black leading-[0.92] sm:text-5xl">
                Make protection

                <span className="block opacity-45">
                  simple.
                </span>
              </h3>

              <p className="mt-7 max-w-lg text-sm leading-7 text-[#081A33]/70 sm:text-base">
                Our mission is to provide practical packaging solutions
                that help businesses protect their products while making
                packing, handling and transportation more efficient.
              </p>

            </motion.div>


            {/* VISION */}

            <motion.div
              initial={{
                opacity: 0,
                x: 50,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.8,
                delay: 0.1,
                ease,
              }}
              className="relative overflow-hidden bg-white p-8 text-[#081A33] sm:p-10 lg:p-14"
            >

              <div className="absolute right-8 top-8 text-[#081A33]/10">
                <Eye size={58} strokeWidth={1.2} />
              </div>

              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#89929A]">
                02 / Vision
              </p>

              <h3 className="mt-8 max-w-md text-4xl font-black leading-[0.92] sm:text-5xl">

                A smarter way

                <span className="block text-[#8D969E]">
                  to move products.
                </span>

              </h3>

              <p className="mt-7 max-w-lg text-sm leading-7 text-[#68737E] sm:text-base">
                We aim to build a trusted packaging brand known for
                dependable products, practical innovation and solutions
                designed around the evolving needs of modern businesses.
              </p>

            </motion.div>

          </div>

        </div>

      </section>


      {/* ======================================================
          PRODUCT FOCUS
      ====================================================== */}

      <section className="relative overflow-hidden bg-[#F7F7F5] px-6 py-20 sm:px-8 lg:px-12 lg:py-28">

        <DotPattern />

        <div className="relative z-10 mx-auto max-w-[1400px]">

          <div className="grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">

            {/* PRODUCT IMAGE */}

            <motion.div
              initial={{
                opacity: 0,
                x: -50,
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
                ease,
              }}
              className="relative"
            >

              <CornerFrame>

                <div className="overflow-hidden bg-[#081A33] p-2">

                  <motion.div
                    initial={{
                      scale: 1.08,
                    }}
                    whileInView={{
                      scale: 1,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      duration: 1.2,
                      ease,
                    }}
                    className="relative h-[430px] overflow-hidden sm:h-[520px]"
                  >

                    <Image
                      src="/Air Column Roll (2).webp"
                      alt="DPack Air Column Roll"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#081A33]/90 via-transparent to-transparent" />

                    <div className="absolute bottom-7 left-7">

                      <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#F5A623]">
                        Product Focus
                      </p>

                      <h3 className="mt-2 text-3xl font-black text-white sm:text-4xl">
                        Protective Packaging
                      </h3>

                    </div>

                  </motion.div>

                </div>

              </CornerFrame>

            </motion.div>


            {/* CONTENT */}

            <motion.div
              variants={fadeRight}
              initial="hidden"
              whileInView="show"
              viewport={{
                once: true,
                amount: 0.2,
              }}
            >

              <div className="flex items-center gap-3">

                <span className="h-[3px] w-10 bg-[#F5A623]" />

                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#D98C00]">
                  What We Offer
                </span>

              </div>

              <h2 className="mt-6 text-5xl font-black leading-[0.9] tracking-[-0.05em] sm:text-6xl">

                Solutions for

                <span className="block text-[#8E979F]">
                  every stage
                </span>

                <span className="block text-[#F5A623]">
                  of movement.
                </span>

              </h2>

              <p className="mt-7 max-w-xl text-sm leading-7 text-[#66717C] sm:text-base">
                From cushioning fragile products to filling empty spaces
                and securing loads during transportation, DPack offers
                packaging solutions designed around real-world shipping
                requirements.
              </p>


              {/* PRODUCT LIST */}

              <div className="mt-9 border-t border-[#081A33]/15">

                {products.map((product, index) => (

                  <Link
                    href={product.href}
                    key={product.name}
                    className="group block"
                  >

                    <motion.div
                      initial={{
                        opacity: 0,
                        x: 20,
                      }}
                      whileInView={{
                        opacity: 1,
                        x: 0,
                      }}
                      viewport={{
                        once: true,
                      }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.07,
                      }}
                      className="flex items-center justify-between border-b border-[#081A33]/15 py-4 transition-all duration-300 hover:px-3"
                    >

                      <div className="flex items-center gap-4">

                        <span className="text-[10px] font-black text-[#F5A623]">
                          {product.number}
                        </span>

                        <span className="text-sm font-bold text-[#081A33] sm:text-base">
                          {product.name}
                        </span>

                      </div>

                      <div className="flex items-center gap-4">

                        <div className="hidden h-9 w-9 overflow-hidden opacity-0 transition-all duration-300 group-hover:opacity-100 sm:block">

                          <Image
                            src={product.image}
                            alt={product.name}
                            width={36}
                            height={36}
                            className="h-full w-full object-cover"
                          />

                        </div>

                        <ArrowRight
                          size={17}
                          className="text-[#081A33]/50 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#F5A623]"
                        />

                      </div>

                    </motion.div>

                  </Link>

                ))}

              </div>


              <Link
                href="/products"
                className="group mt-8 inline-flex items-center gap-3 bg-[#081A33] px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-[#F5A623] hover:text-[#081A33]"
              >

                Explore All Products

                <ArrowUpRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />

              </Link>

            </motion.div>

          </div>

        </div>

      </section>


      {/* ======================================================
          FINAL BRAND STRIP
      ====================================================== */}

      <section className="relative overflow-hidden bg-[#081A33] px-6 py-14 sm:px-8 lg:px-12">

        <div className="absolute inset-0 opacity-40">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "radial-gradient(rgba(245,166,35,0.25) 1px, transparent 1px)",
              backgroundSize: "18px 18px",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">

          <div>

            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#F5A623]">
              DPack
            </p>

            <h3 className="mt-2 text-3xl font-black tracking-tight text-white sm:text-4xl">
              Protect. Pack. Move.
            </h3>

          </div>

          <Link
            href="/contact"
            className="group flex items-center gap-3 border border-white/20 px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-white transition-all duration-300 hover:border-[#F5A623] hover:bg-[#F5A623] hover:text-[#081A33]"
          >
            Talk To Us

            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />

          </Link>

        </div>

      </section>

    </main>
  );
}