"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BadgeDollarSign,
  Headphones,
  Timer,
  Users,
} from "lucide-react";

/* =========================================================
   BENEFITS
========================================================= */

const benefits = [
  {
    number: "01",
    title: "Proven Experience",
    description:
      "Reliable packaging solutions backed by practical industry experience and a clear understanding of modern shipping requirements.",
    icon: Users,
    small: "EXPERIENCE",
  },
  {
    number: "02",
    title: "Affordable Solutions",
    description:
      "Smart packaging products designed to deliver the right balance of protection, performance and business value.",
    icon: BadgeDollarSign,
    small: "VALUE",
  },
  {
    number: "03",
    title: "Strong Support",
    description:
      "From product selection to bulk requirements, our team helps you find packaging solutions that fit your operation.",
    icon: Headphones,
    small: "SUPPORT",
  },
  {
    number: "04",
    title: "On-Time Delivery",
    description:
      "Dependable dispatch and delivery support designed to help keep your packaging supply chain moving.",
    icon: Timer,
    small: "DELIVERY",
  },
];

/* =========================================================
   COMPONENT
========================================================= */

export default function WhyChooseUs() {
  const [active, setActive] = useState(0);

  const current = benefits[active];
  const ActiveIcon = current.icon;

  return (
    <section className="relative w-full overflow-hidden bg-[#F5F1EA] py-16 sm:py-20 lg:py-24">

      {/* =====================================================
          BACKGROUND FLOATING CIRCLES
      ===================================================== */}

      <motion.div
        className="pointer-events-none absolute -right-32 top-10 h-[420px] w-[420px] rounded-full border border-[#17324D]/10"
        animate={{
          x: [0, 25, 0],
          y: [0, 20, 0],
          rotate: [0, 8, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="pointer-events-none absolute -right-20 top-24 h-[270px] w-[270px] rounded-full bg-[#17324D]/5"
        animate={{
          x: [0, -20, 0],
          y: [0, 25, 0],
          scale: [1, 1.12, 1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="pointer-events-none absolute -bottom-40 -left-32 h-[430px] w-[430px] rounded-full border border-[#D95026]/10"
        animate={{
          x: [0, 30, 0],
          y: [0, -25, 0],
          rotate: [0, -10, 0],
          scale: [1, 1.06, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="pointer-events-none absolute bottom-0 left-10 h-[180px] w-[180px] rounded-full bg-[#D95026]/5 blur-2xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* =====================================================
          MAIN CONTAINER
      ===================================================== */}

      <div className="relative z-10 mx-auto max-w-[1450px] px-5 sm:px-8 lg:px-12">

        {/* ===================================================
            TOP LABEL
        =================================================== */}

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
            amount: 0.3,
          }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mb-8 flex items-center gap-3"
        >
          <motion.span
            initial={{ width: 0 }}
            whileInView={{ width: 32 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: 0.2,
            }}
            className="h-[2px] bg-[#D95026]"
          />

          <span className="text-[8px] font-bold uppercase tracking-[0.32em] text-[#74796F]">
            Why DPACK
          </span>
        </motion.div>

        {/* ===================================================
            MAIN GRID
        =================================================== */}

        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center">

          {/* =================================================
              LEFT PANEL
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: 35,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.25,
            }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative min-h-[440px] overflow-hidden rounded-[32px] bg-[#17324D] p-8 text-white shadow-[25px_20px_80px_rgba(23,50,77,0.16)] sm:p-10 lg:min-h-[510px] lg:p-12"
          >

            {/* ===============================================
                FLOATING CIRCLE 1
            =============================================== */}

            <motion.div
              className="absolute -right-28 -top-28 h-[320px] w-[320px] rounded-full border border-white/10"
              animate={{
                x: [0, 20, 0],
                y: [0, 25, 0],
                rotate: [0, 10, 0],
                scale: [1, 1.08, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* ===============================================
                FLOATING CIRCLE 2
            =============================================== */}

            <motion.div
              className="absolute -right-10 -top-10 h-[180px] w-[180px] rounded-full bg-[#D95026]/10"
              animate={{
                x: [0, -18, 0],
                y: [0, 20, 0],
                scale: [1, 1.15, 1],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* ===============================================
                FLOATING CIRCLE 3
            =============================================== */}

            <motion.div
              className="absolute -bottom-32 -left-20 h-[300px] w-[300px] rounded-full border border-[#D95026]/15"
              animate={{
                x: [0, 30, 0],
                y: [0, -20, 0],
                rotate: [0, -8, 0],
                scale: [1, 1.06, 1],
              }}
              transition={{
                duration: 9,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* ===============================================
                CONTENT
            =============================================== */}

            <div className="relative z-10">

              <motion.p
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: 0.15,
                }}
                className="text-[8px] font-semibold uppercase tracking-[0.3em] text-white/55"
              >
                The DPACK Difference
              </motion.p>

              <motion.h2
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-5 text-[48px] font-black leading-[0.84] tracking-[-0.065em] sm:text-[58px] lg:text-[70px]"
              >
                Why
                <br />
                Choose
                <br />
                <span className="text-[#D95026]">Us?</span>
              </motion.h2>

              <motion.div
                initial={{
                  width: 0,
                }}
                whileInView={{
                  width: 40,
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: 0.45,
                }}
                className="my-6 h-[2px] bg-[#D95026]"
              />

              <motion.p
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: 0.5,
                }}
                className="max-w-[290px] text-[11px] font-medium leading-[1.7] text-white/65 sm:text-[12px]"
              >
                Four reasons businesses choose DPACK for dependable
                packaging. Built around protection, value, support and
                reliable delivery.
              </motion.p>

            </div>

            {/* ===============================================
                DECORATIVE DOT
            =============================================== */}

            <motion.div
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute bottom-10 right-10 h-2 w-2 rounded-full bg-[#D95026]"
            />

          </motion.div>

          {/* =================================================
              RIGHT BENEFITS
          ================================================= */}

          <div className="space-y-3">

            {benefits.map((benefit, index) => {
              const isActive = index === active;
              const BenefitIcon = benefit.icon;

              return (
                <motion.button
                  key={benefit.number}
                  type="button"
                  onClick={() => setActive(index)}
                  initial={{
                    opacity: 0,
                    x: 30,
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
                    duration: 0.55,
                    delay: index * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{
                    y: -3,
                  }}
                  whileTap={{
                    scale: 0.985,
                  }}
                  className={`group relative w-full overflow-hidden rounded-[24px] border p-5 text-left transition-all duration-500 sm:p-6 ${
                    isActive
                      ? "border-[#17324D] bg-white shadow-[0_18px_50px_rgba(23,50,77,0.13)]"
                      : "border-[#DFE2E1] bg-[#FAF8F4] hover:border-[#B9C1C6] hover:bg-white"
                  }`}
                >

                  {/* Active Orange Line */}

                  <motion.div
                    initial={false}
                    animate={{
                      height: isActive ? "100%" : "0%",
                      opacity: isActive ? 1 : 0,
                    }}
                    transition={{
                      duration: 0.45,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="absolute left-0 top-0 w-[4px] bg-[#D95026]"
                  />

                  <div className="flex items-start gap-4">

                    {/* ICON */}

                    <motion.div
                      animate={{
                        scale: isActive ? 1 : 0.96,
                        rotate: isActive ? 0 : 0,
                      }}
                      transition={{
                        duration: 0.4,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] transition-colors duration-500 ${
                        isActive
                          ? "bg-[#17324D] text-white"
                          : "bg-[#E9EDF0] text-[#17324D] group-hover:bg-[#17324D] group-hover:text-white"
                      }`}
                    >
                      <BenefitIcon
                        size={22}
                        strokeWidth={1.8}
                      />
                    </motion.div>

                    {/* CONTENT */}

                    <div className="min-w-0 flex-1">

                      <div className="mb-2 flex items-center justify-between gap-3">

                        <span
                          className={`text-[8px] font-bold uppercase tracking-[0.32em] transition-colors duration-300 ${
                            isActive
                              ? "text-[#D95026]"
                              : "text-[#747C82]"
                          }`}
                        >
                          {benefit.small}
                        </span>

                        <span
                          className={`font-mono text-[10px] font-bold transition-colors duration-300 ${
                            isActive
                              ? "text-[#17324D]"
                              : "text-[#8C9398]"
                          }`}
                        >
                          {benefit.number}
                        </span>

                      </div>

                      <h3
                        className={`text-[28px] font-black leading-[0.9] tracking-[-0.05em] transition-colors duration-300 sm:text-[32px] ${
                          isActive
                            ? "text-[#171918]"
                            : "text-[#27313A]"
                        }`}
                      >
                        {benefit.title}
                      </h3>

                      {/* SMOOTH DESCRIPTION */}

                      <AnimatePresence mode="wait">

                        {isActive && (
                          <motion.p
                            key={benefit.number}
                            initial={{
                              opacity: 0,
                              height: 0,
                              y: 8,
                            }}
                            animate={{
                              opacity: 1,
                              height: "auto",
                              y: 0,
                            }}
                            exit={{
                              opacity: 0,
                              height: 0,
                              y: -5,
                            }}
                            transition={{
                              duration: 0.4,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className="mt-3 overflow-hidden text-[13px] leading-[1.7] text-[#74796F]"
                          >
                            {benefit.description}
                          </motion.p>
                        )}

                      </AnimatePresence>

                    </div>

                    {/* ARROW */}

                    <motion.div
                      animate={{
                        x: isActive ? 0 : -5,
                        opacity: isActive ? 1 : 0.3,
                      }}
                      transition={{
                        duration: 0.35,
                        ease: "easeOut",
                      }}
                      className="hidden pt-1 sm:block"
                    >
                      <ArrowRight
                        size={17}
                        strokeWidth={1.7}
                        className={
                          isActive
                            ? "text-[#D95026]"
                            : "text-[#899198]"
                        }
                      />
                    </motion.div>

                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* =====================================================
            BOTTOM BAR
        ===================================================== */}

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
            amount: 0.2,
          }}
          transition={{
            duration: 0.7,
            delay: 0.2,
          }}
          className="mt-10 flex items-center justify-between gap-4 rounded-[22px] border border-[#D9DCD9] bg-white/80 px-5 py-4 backdrop-blur-sm"
        >

          {/* CURRENT ADVANTAGE */}

          <div className="flex items-center gap-3">

            <AnimatePresence mode="wait">

              <motion.div
                key={current.number}
                initial={{
                  opacity: 0,
                  scale: 0.7,
                  rotate: -10,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotate: 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.7,
                  rotate: 10,
                }}
                transition={{
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-[#17324D] text-white"
              >
                <ActiveIcon
                  size={21}
                  strokeWidth={1.7}
                />
              </motion.div>

            </AnimatePresence>

            <div>
              <p className="text-[8px] font-bold uppercase tracking-[0.3em] text-[#D95026]">
                DPACK Advantage
              </p>

              <AnimatePresence mode="wait">

                <motion.p
                  key={current.title}
                  initial={{
                    opacity: 0,
                    y: 6,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -6,
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                  className="mt-1 text-[12px] font-semibold text-[#171918]"
                >
                  {current.title}
                </motion.p>

              </AnimatePresence>
            </div>
          </div>

          {/* MOVING ARROW */}

          <div className="hidden items-center gap-3 sm:flex">

            <span className="text-[7px] font-bold uppercase tracking-[0.28em] text-[#8B9188]">
              Explore Advantages
            </span>

            <span className="h-px w-10 bg-[#D2CEC5]" />

            <motion.div
              animate={{
                x: [0, 6, 0],
              }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <ArrowRight
                size={13}
                className="text-[#D95026]"
              />
            </motion.div>

          </div>

        </motion.div>

      </div>
    </section>
  );
}