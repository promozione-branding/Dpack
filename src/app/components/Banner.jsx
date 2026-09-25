"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowRight,
  ShoppingBag,
  PackageCheck,
} from "lucide-react";

/* =========================================================
   BANNERS DATA
========================================================= */

const banners = [
  {
    id: 1,
    label: "Bulk Savings",
    title: "Stock Up.",
    highlight: "Save More.",
    description:
      "Shop larger quantities of protective packaging and keep your shipping supplies ready.",
    button: "Shop Bulk Packs",
    link: "/products",
    image: "https://packingairbag.com/cat/1.webp",

    // Dark blue promotional banner
    bg: "#123B5D",
    text: "#FFFFFF",
    mutedText: "rgba(255,255,255,0.70)",
    accent: "#F5A623",
    type: "dark",
  },

  {
    id: 2,
    label: "Protect Every Order",
    title: "Pack Better.",
    highlight: "Ship Safer.",
    description:
      "Discover reliable air packaging designed to protect your products from packing to delivery.",
    button: "Shop Now",
    link: "/products",
    image: "https://packingairbag.com/cat/5.webp",

    // Light blue promotional banner
    bg: "#E6F1F6",
    text: "#123B5D",
    mutedText: "#66737D",
    accent: "#F5A623",
    type: "light",
  },
];

/* =========================================================
   ANIMATION VARIANTS
========================================================= */

const cardVariants = {
  hidden: (index) => ({
    opacity: 0,
    x: index === 0 ? -60 : 60,
    y: 25,
  }),

  visible: {
    opacity: 1,
    x: 0,
    y: 0,

    transition: {
      duration: 0.75,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function PromoBanners() {
  return (
    <section
      className="
        relative
        w-full
        overflow-hidden

        bg-[#EEF1F3]

        py-10
        sm:py-12
        lg:py-14
      "
    >
      {/* =====================================================
          BACKGROUND DECORATION
      ===================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.8,
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
          -top-[200px]

          h-[450px]
          w-[450px]

          bg-[#DCE7EC]

          blur-[100px]
        "
      />

      {/* BACKGROUND WORD */}

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
          right-6
          top-0

          hidden

          text-[150px]
          font-black
          leading-none
          tracking-[-0.08em]

          text-[#123B5D]/[0.025]

          xl:block
        "
      >
        DPACK
      </motion.span>

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
            SMALL SECTION TOP
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
            mb-5
            flex
            items-center
            justify-between
          "
        >
          {/* LEFT */}

          <div className="flex items-center gap-3">
            <motion.span
              initial={{
                width: 0,
              }}
              whileInView={{
                width: 34,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.7,
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
              Shop & Save
            </span>
          </div>

          {/* RIGHT */}

          <span
            className="
              hidden

              text-[12px]
              font-bold
              text-[#66737D]

              sm:block
            "
          >
            Protective packaging for every shipment
          </span>
        </motion.div>

        {/* =================================================
            BANNERS GRID
        ================================================= */}

        <div
          className="
            grid
            gap-4

            lg:grid-cols-2
          "
        >
          {banners.map((banner, index) => (
            <motion.div
              key={banner.id}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.25,
              }}
              transition={{
                delay: index * 0.1,
              }}
            >
              <Link
                href={banner.link}
                className="
                  group
                  relative
                  block

                  min-h-[255px]
                  overflow-hidden

                  border
                  border-[#123B5D]/10

                  transition-all
                  duration-500

                  hover:-translate-y-1

                  hover:shadow-[0_20px_50px_rgba(18,59,93,0.13)]

                  sm:min-h-[275px]
                  lg:min-h-[285px]
                "
                style={{
                  backgroundColor: banner.bg,
                }}
              >
                {/* ===========================================
                    BACKGROUND GRAPHICS
                =========================================== */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    -right-[70px]
                    -top-[90px]

                    h-[270px]
                    w-[270px]

                    border
                    border-white/10
                  "
                />

                <div
                  className="
                    pointer-events-none
                    absolute
                    right-[25%]
                    top-1/2

                    h-[180px]
                    w-[180px]

                    -translate-y-1/2

                    bg-white/[0.06]

                    blur-[55px]
                  "
                />

                {/* LARGE NUMBER */}

                <span
                  className={[
                    "pointer-events-none",
                    "absolute",
                    "-bottom-7",
                    "left-4",
                    "text-[110px]",
                    "font-black",
                    "leading-none",
                    "tracking-[-0.08em]",
                    banner.type === "dark"
                      ? "text-white/[0.035]"
                      : "text-[#123B5D]/[0.035]",
                  ].join(" ")}
                >
                  0{banner.id}
                </span>

                {/* ===========================================
                    CONTENT
                =========================================== */}

                <div
                  className="
                    relative
                    z-20

                    flex
                    min-h-[255px]
                    w-[61%]
                    flex-col
                    justify-center

                    px-6
                    py-7

                    sm:min-h-[275px]
                    sm:px-8

                    lg:min-h-[285px]
                    lg:w-[58%]
                    lg:px-9
                  "
                >
                  {/* LABEL */}

                  <motion.div
                    initial={{
                      opacity: 0,
                      x: -20,
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
                      delay: 0.2 + index * 0.1,
                    }}
                    className="
                      mb-3
                      flex
                      items-center
                      gap-2
                    "
                  >
                    {banner.id === 1 ? (
                      <ShoppingBag
                        size={15}
                        className="text-[#F5A623]"
                      />
                    ) : (
                      <PackageCheck
                        size={15}
                        className="text-[#F5A623]"
                      />
                    )}

                    <span
                      className="
                        text-[12px]
                        font-black
                        uppercase
                        tracking-[0.12em]
                      "
                      style={{
                        color:
                          banner.type === "dark"
                            ? "#F5A623"
                            : "#2F7180",
                      }}
                    >
                      {banner.label}
                    </span>
                  </motion.div>

                  {/* TITLE */}

                  <motion.h2
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
                      delay: 0.25 + index * 0.1,
                    }}
                    className="
                      max-w-[330px]

                      text-[30px]
                      font-black
                      leading-[0.95]
                      tracking-[-0.045em]

                      sm:text-[34px]
                      lg:text-[37px]
                    "
                    style={{
                      color: banner.text,
                    }}
                  >
                    {banner.title}

                    <br />

                    <span
                      style={{
                        color:
                          banner.type === "dark"
                            ? "#F5A623"
                            : "#2F7180",
                      }}
                    >
                      {banner.highlight}
                    </span>
                  </motion.h2>

                  {/* DESCRIPTION */}

                  <motion.p
                    initial={{
                      opacity: 0,
                    }}
                    whileInView={{
                      opacity: 1,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      duration: 0.6,
                      delay: 0.35 + index * 0.1,
                    }}
                    className="
                      mt-3
                      max-w-[300px]

                      text-[12px]
                      font-medium
                      leading-[1.6]
                    "
                    style={{
                      color: banner.mutedText,
                    }}
                  >
                    {banner.description}
                  </motion.p>

                  {/* CTA */}

                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 12,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      duration: 0.5,
                      delay: 0.4 + index * 0.1,
                    }}
                    className="mt-5"
                  >
                    <span
                      className={[
                        "inline-flex",
                        "items-center",
                        "gap-3",
                        "px-5",
                        "py-3",
                        "text-[12px]",
                        "font-black",
                        "uppercase",
                        "tracking-[0.06em]",
                        "transition-all",
                        "duration-300",
                        "group-hover:gap-4",
                        banner.type === "dark"
                          ? [
                              "bg-[#F5A623]",
                              "text-[#123B5D]",
                              "group-hover:bg-white",
                            ].join(" ")
                          : [
                              "bg-[#123B5D]",
                              "text-white",
                              "group-hover:bg-[#F5A623]",
                              "group-hover:text-[#123B5D]",
                            ].join(" "),
                      ].join(" ")}
                    >
                      {banner.button}

                      <ArrowRight
                        size={14}
                        strokeWidth={2}
                      />
                    </span>
                  </motion.div>
                </div>

                {/* ===========================================
                    PRODUCT IMAGE
                =========================================== */}

                <motion.div
                  initial={{
                    opacity: 0,
                    x: 50,
                    scale: 0.9,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                    scale: 1,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.8,
                    delay: 0.15 + index * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="
                    absolute
                    bottom-0
                    right-0
                    top-0
                    z-10

                    w-[47%]

                    overflow-hidden
                  "
                >
                  {/* IMAGE GLOW */}

                  <div
                    className={[
                      "pointer-events-none",
                      "absolute",
                      "left-1/2",
                      "top-1/2",
                      "h-[180px]",
                      "w-[180px]",
                      "-translate-x-1/2",
                      "-translate-y-1/2",
                      "blur-[45px]",
                      banner.type === "dark"
                        ? "bg-white/10"
                        : "bg-white/50",
                    ].join(" ")}
                  />

                  <Image
                    src={banner.image}
                    alt={banner.title}
                    fill
                    unoptimized
                    sizes="500px"
                    className="
                      relative
                      z-10

                      object-contain
                      object-center

                      p-5

                      transition-transform
                      duration-[900ms]
                      ease-out

                      group-hover:scale-[1.08]
                      group-hover:-rotate-2
                    "
                  />
                </motion.div>

                {/* ===========================================
                    SMALL NUMBER
                =========================================== */}

                <span
                  className={[
                    "absolute",
                    "bottom-4",
                    "right-5",
                    "z-30",
                    "font-mono",
                    "text-[12px]",
                    "font-bold",
                    banner.type === "dark"
                      ? "text-white/30"
                      : "text-[#123B5D]/30",
                  ].join(" ")}
                >
                  0{banner.id}
                </span>

                {/* ===========================================
                    BOTTOM HOVER LINE
                =========================================== */}

                <span
                  className="
                    absolute
                    bottom-0
                    left-0
                    z-40

                    h-[4px]
                    w-0

                    bg-[#F5A623]

                    transition-all
                    duration-700
                    ease-out

                    group-hover:w-full
                  "
                />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* =================================================
            BOTTOM TEXT
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
            mt-5

            flex
            items-center
            justify-between

            border-t
            border-[#123B5D]/10

            pt-4
          "
        >
          <span
            className="
              text-[12px]
              font-bold
              uppercase
              tracking-[0.08em]
              text-[#2F7180]
            "
          >
            DPACK Packaging
          </span>

          <span
            className="
              text-[12px]
              font-medium
              text-[#66737D]
            "
          >
            Shop • Pack • Protect
          </span>
        </motion.div>
      </div>
    </section>
  );
}