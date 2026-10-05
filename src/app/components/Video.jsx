"use client";

import React from "react";
import { motion } from "framer-motion";

const videos = [
  {
    id: "op613Ic8GOk",
    title: "Air Column Bags",
    subtitle: "Smart Protection",
  },
  {
    id: "OOCSb_-BQKE",
    title: "Dunnage Air Bags",
    subtitle: "Cargo Safety",
  },
  {
    id: "hVquIfKanpY",
    title: "Air Column Rolls",
    subtitle: "Flexible Protection",
  },
  {
    id: "TQiadzdq6As",
    title: "Packaging Air Bags",
    subtitle: "Secure Packaging",
  },
  {
    id: "K38VkB34tZc",
    title: "Gap Fillers",
    subtitle: "Load Stability",
  },
];

export default function VideoSection() {
  return (
  <section
  className="
    relative
    w-full
    overflow-hidden

    bg-[#F8F8F6]

    py-12
    lg:py-14
    px-10

    before:pointer-events-none
    before:absolute
    before:inset-0
    before:z-0

    before:bg-[radial-gradient(circle_at_1px_1px,rgba(18,59,93,0.10)_1px,transparent_1px)]
    before:bg-[length:22px_22px]
  "
>
      {/* =====================================================
          DOT BACKGROUND
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.55]
        "
        style={{
          backgroundImage:
            "radial-gradient(rgba(18,59,93,0.14) 0.7px, transparent 0.7px)",
          backgroundSize: "9px 9px",
        }}
      />

      {/* =====================================================
          CONTENT WRAPPER
      ===================================================== */}

      <div className="relative z-10">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="mx-auto mb-9 max-w-[1400px]">

          <motion.h2
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
              text-[30px]
              font-extrabold
              tracking-[-0.04em]
              text-[#081A33]
              sm:text-[38px]
              lg:text-[42px]
            "
          >
            Packaging in motion
          </motion.h2>

          <motion.p
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
              delay: 0.1,
            }}
            className="
              mt-2
              text-[14px]
              text-[#667085]
              sm:text-[16px]
            "
          >
            Discover our protective packaging solutions in action
          </motion.p>

        </div>

        {/* =====================================================
            VIDEO ROW
        ===================================================== */}

        <div className="mx-auto max-w-[1400px]">

          <div
            className="
              grid
              grid-cols-1
              gap-4
              sm:grid-cols-2
              lg:grid-cols-5
            "
          >

            {videos.map((video, index) => (

              <motion.div
                key={video.id}
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
                  amount: 0.15,
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                }}
                whileHover={{
                  y: -6,
                }}
                className="
                  group
                  relative
                  overflow-hidden
                  bg-black
                  shadow-sm
                  transition-shadow
                  duration-500
                  hover:shadow-[0_18px_40px_rgba(8,26,51,0.18)]
                "
              >

                {/* =================================================
                    VIDEO
                ================================================= */}

                <div
                  className="
                    relative
                    aspect-[0.78]
                    w-full
                    overflow-hidden
                  "
                >

                  <iframe
                    src={`https://www.youtube.com/embed/${video.id}?autoplay=1&mute=1&loop=1&playlist=${video.id}&controls=0&modestbranding=1&rel=0&playsinline=1&iv_load_policy=3&disablekb=1`}
                    title={video.title}
                    className="
                      absolute
                      inset-0
                      h-full
                      w-full
                      scale-[1.03]
                    "
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  />

                  {/* =================================================
                      SOFT OVERLAY
                  ================================================= */}

                  <div
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                      bg-gradient-to-t
                      from-black/65
                      via-transparent
                      to-black/5
                    "
                  />

                  {/* =================================================
                      CONTENT
                  ================================================= */}

                  <div
                    className="
                      pointer-events-none
                      absolute
                      bottom-0
                      left-0
                      right-0
                      p-5
                    "
                  >

                    <p
                      className="
                        mb-1
                        text-[9px]
                        font-semibold
                        uppercase
                        tracking-[0.18em]
                        text-white/65
                      "
                    >
                      {video.subtitle}
                    </p>

                    <h3
                      className="
                        text-[18px]
                        font-extrabold
                        leading-tight
                        tracking-[-0.02em]
                        text-white
                      "
                    >
                      {video.title}
                    </h3>

                  </div>

                  {/* =================================================
                      HOVER BORDER
                  ================================================= */}

                  <div
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                      border
                      border-white/0
                      transition-all
                      duration-500
                      group-hover:border-white/40
                    "
                  />

                </div>

              </motion.div>

            ))}

          </div>

        </div>

      </div>

    </section>
  );
}