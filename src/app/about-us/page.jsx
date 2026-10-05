"use client";

import Image from "next/image";
import { motion } from "framer-motion";

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
   MAIN
============================================================ */

export default function AboutUs() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#F7F7F5] text-[#081A33]">

      {/* ======================================================
          HERO
      ====================================================== */}

      <section className="relative min-h-[100svh] overflow-hidden bg-[#F7F7F5] px-6 py-16 sm:px-8 lg:px-12 lg:py-20">

        {/* Background Typography */}
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
          className="pointer-events-none absolute -left-5 top-[18%] select-none text-[25vw] font-black leading-none tracking-[-0.08em] text-[#081A33]/[0.035] sm:text-[21vw]"
        >
          DPACK
        </motion.div>


        <div className="relative z-10 mx-auto flex min-h-[calc(100svh-128px)] max-w-[1450px] items-center">

          <div className="grid w-full items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">

            {/* LEFT CONTENT */}

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
                <span className="h-[2px] w-12 bg-[#F5A623]" />

                <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#D98C00]">
                  About DPack
                </span>
              </motion.div>


              <motion.h1
                variants={fadeUp}
                className="max-w-3xl text-[42px] font-black leading-[0.9] tracking-[-0.055em] sm:text-[55px] lg:text-[68px]"
              >
                Packaging

                <span className="block text-[#F5A623]">
                  that protects.
                </span>

                <span className="mt-2 block">
                  Products that
                </span>

                <span className="block text-gray-400">
                  move forward.
                </span>
              </motion.h1>


              <motion.p
                variants={fadeUp}
                className="mt-7 max-w-xl text-sm leading-7 text-gray-500 sm:text-base"
              >
                DPack creates practical packaging solutions designed to
                protect products, simplify packing and support safer
                movement through every stage of the supply chain.
              </motion.p>


              <motion.div
                variants={fadeUp}
                className="mt-8 flex items-center gap-4"
              >
                <span className="h-[1px] w-12 bg-[#081A33]/20" />

                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-gray-400">
                  Protect • Pack • Move
                </span>
              </motion.div>

            </motion.div>


            {/* RIGHT IMAGE */}

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.92,
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

              {/* Decorative Border */}

              <div className="absolute -right-3 -top-3 h-full w-full border border-[#F5A623]/50 sm:-right-5 sm:-top-5" />


              <div className="relative overflow-hidden bg-[#081A33] p-2">

                <motion.div
                  initial={{
                    scale: 1.15,
                  }}
                  animate={{
                    scale: 1,
                  }}
                  transition={{
                    duration: 1.4,
                    ease,
                  }}
                  className="relative h-[420px] overflow-hidden sm:h-[500px] lg:h-[570px]"
                >

                  <Image
                    src="/Dannage.webp"
                    alt="DPack Packaging Solutions"
                    fill
                    priority
                    className="object-cover"
                  />


                  {/* Gradient */}

                  <div className="absolute inset-0 bg-gradient-to-t from-[#081A33]/80 via-transparent to-transparent" />


                  {/* Image Text */}

                  <div className="absolute bottom-7 left-7 right-7 flex items-end justify-between">

                    <div>

                      <p className="text-5xl font-black leading-none text-white sm:text-6xl">
                        DPack
                      </p>

                      <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.3em] text-white/60">
                        Packaging Solutions
                      </p>

                    </div>

                  </div>

                </motion.div>

              </div>


              {/* Floating Badge */}

              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -bottom-5 -left-3 bg-[#F5A623] px-5 py-4 shadow-xl sm:-left-7"
              >

                <p className="text-2xl font-black leading-none text-[#081A33]">
                  100%
                </p>

                <p className="mt-1 text-[8px] font-bold uppercase tracking-[0.2em] text-[#081A33]/60">
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

      <section className="relative min-h-[100svh] overflow-hidden bg-white px-6 py-16 sm:px-8 lg:px-12 lg:py-20">

        <div className="mx-auto flex min-h-[calc(100svh-128px)] max-w-[1400px] items-center">

          <div className="grid w-full items-center gap-12 lg:grid-cols-[1fr_0.95fr] lg:gap-20">

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

              <div className="absolute -left-4 -top-4 h-32 w-32 border-l border-t border-[#F5A623] sm:-left-7 sm:-top-7 sm:h-40 sm:w-40" />

              <div className="relative ml-3 overflow-hidden bg-[#081A33] p-2 sm:ml-7">

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
                  className="relative h-[430px] overflow-hidden sm:h-[520px] lg:h-[570px]"
                >

                  <Image
                    src="/Air column bag (2).webp"
                    alt="DPack Air Column Packaging"
                    fill
                    className="object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#081A33]/70 via-transparent to-transparent" />

                  <div className="absolute bottom-6 left-6">

                    <p className="text-4xl font-black text-white sm:text-5xl">
                      DPACK
                    </p>

                    <p className="mt-1 text-[9px] uppercase tracking-[0.3em] text-white/60">
                      Protective Packaging
                    </p>

                  </div>

                </motion.div>

              </div>

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

                <span className="h-[2px] w-10 bg-[#F5A623]" />

                <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#D98C00]">
                  Who We Are
                </span>

              </div>


              <h2 className="mt-5 text-4xl font-black leading-[0.94] tracking-tight sm:text-5xl lg:text-6xl">

                About
<span className="block text-[#F5A623]">
                  DPack.
                </span>

              </h2>


              <div className="mt-7 max-w-xl space-y-4 text-sm leading-7 text-gray-500 sm:text-base">

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

              <div className="mt-9 grid grid-cols-3 border-y border-[#081A33]/10">

                <div className="px-2 py-5 text-center sm:px-5 sm:text-left">

                  <p className="text-2xl font-black leading-none text-[#081A33] sm:text-3xl">
                    01
                  </p>

                  <p className="mt-2 text-[8px] font-bold uppercase tracking-[0.15em] text-gray-400 sm:text-[9px]">
                    Protection
                  </p>

                </div>


                <div className="border-x border-[#081A33]/10 px-2 py-5 text-center sm:px-5 sm:text-left">

                  <p className="text-2xl font-black leading-none text-[#081A33] sm:text-3xl">
                    05+
                  </p>

                  <p className="mt-2 text-[8px] font-bold uppercase tracking-[0.15em] text-gray-400 sm:text-[9px]">
                    Solutions
                  </p>

                </div>


                <div className="px-2 py-5 text-center sm:px-5 sm:text-left">

                  <p className="text-2xl font-black leading-none text-[#081A33] sm:text-3xl">
                    PAN
                  </p>

                  <p className="mt-2 text-[8px] font-bold uppercase tracking-[0.15em] text-gray-400 sm:text-[9px]">
                    Reach
                  </p>

                </div>

              </div>


              <div className="mt-7 flex items-center gap-4">

                <span className="h-[1px] w-12 bg-[#081A33]/20" />

                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
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

      <section className="relative min-h-[100svh] overflow-hidden bg-[#081A33] px-6 py-16 text-white sm:px-8 lg:px-12 lg:py-20">

        <div className="mx-auto flex min-h-[calc(100svh-128px)] max-w-[1400px] flex-col justify-center">

          {/* TOP */}

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
            }}
          >

            <div className="flex items-center gap-3">

              <span className="h-[2px] w-10 bg-[#F5A623]" />

              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#F5A623]">
                What Drives Us
              </p>

            </div>

            <h2 className="mt-6 max-w-4xl text-4xl font-black leading-[0.95] tracking-[-0.04em] sm:text-5xl lg:text-7xl">

              Built around better
              <span className="block text-white/35">
                packaging.
              </span>

            </h2>

          </motion.div>


          {/* MISSION / VISION */}

          <div className="mt-14 grid gap-px bg-white/10 lg:grid-cols-2">

            {/* MISSION */}

            <motion.div
              initial={{
                opacity: 0,
                x: -40,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.7,
              }}
              className="bg-[#F5A623] p-8 text-[#081A33] sm:p-10 lg:p-14"
            >

              <p className="text-[10px] font-bold uppercase tracking-[0.3em]">
                01 / Mission
              </p>

              <h3 className="mt-8 text-4xl font-black leading-[0.95] sm:text-5xl">
                Make protection
                <span className="block opacity-50">
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
                x: 40,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.7,
                delay: 0.1,
              }}
              className="bg-white p-8 text-[#081A33] sm:p-10 lg:p-14"
            >

              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">
                02 / Vision
              </p>

              <h3 className="mt-8 text-4xl font-black leading-[0.95] sm:text-5xl">
                A smarter way
                <span className="block text-gray-400">
                  to move products.
                </span>
              </h3>

              <p className="mt-7 max-w-lg text-sm leading-7 text-gray-500 sm:text-base">
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

      <section className="relative min-h-[100svh] overflow-hidden bg-white px-6 py-16 sm:px-8 lg:px-12 lg:py-20">

        <div className="mx-auto flex min-h-[calc(100svh-128px)] max-w-[1400px] items-center">

          <div className="grid w-full items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">

            {/* IMAGE */}

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
              }}
              className="relative"
            >

              <div className="relative overflow-hidden bg-[#081A33] p-2">

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
                  }}
                  className="relative h-[450px] overflow-hidden sm:h-[530px] lg:h-[600px]"
                >

                  <Image
                    src="/Air Column Roll (2).webp"
                    alt="DPack Air Column Roll"
                    fill
                    className="object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#081A33]/80 via-transparent to-transparent" />

                  <div className="absolute bottom-7 left-7">

                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/60">
                      Product Focus
                    </p>

                    <h3 className="mt-2 text-3xl font-black text-white sm:text-4xl">
                      Protective Packaging
                    </h3>

                  </div>

                </motion.div>

              </div>

            </motion.div>


            {/* CONTENT */}

            <motion.div
              variants={fadeRight}
              initial="hidden"
              whileInView="show"
              viewport={{
                once: true,
              }}
            >

              <div className="flex items-center gap-3">

                <span className="h-[2px] w-10 bg-[#F5A623]" />

                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D98C00]">
                  What We Offer
                </span>

              </div>


              <h2 className="mt-6 text-4xl font-black leading-[0.94] tracking-tight sm:text-5xl lg:text-6xl">

                Solutions for

                <span className="block text-gray-400">
                  every stage
                </span>

                <span className="block text-[#F5A623]">
                  of movement.
                </span>

              </h2>


              <p className="mt-7 max-w-xl text-sm leading-7 text-gray-500 sm:text-base">
                From cushioning fragile products to filling empty spaces
                and securing loads during transportation, DPack offers
                packaging solutions designed around real-world shipping
                requirements.
              </p>


              {/* Product List */}

              <div className="mt-9 border-t border-[#081A33]/10">

                {[
                  "Air Column Packaging",
                  "Dunnage Packaging",
                  "Packaging Air Bags",
                  "Gap Fillers",
                  "Protective Packaging",
                ].map((item, index) => (

                  <div
                    key={item}
                    className="flex items-center justify-between border-b border-[#081A33]/10 py-4"
                  >

                    <div className="flex items-center gap-4">

                      <span className="text-[10px] font-bold text-[#F5A623]">
                        0{index + 1}
                      </span>

                      <span className="text-sm font-bold text-[#081A33] sm:text-base">
                        {item}
                      </span>

                    </div>

                    <span className="h-[1px] w-8 bg-[#081A33]/20" />

                  </div>

                ))}

              </div>

            </motion.div>

          </div>

        </div>

      </section>
    </main>
  );
}