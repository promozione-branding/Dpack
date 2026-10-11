"use client";

import { useState } from "react";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  ArrowLeft,
  ArrowRight,
  Check,
  MapPin,
  Quote,
  ShieldCheck,
  Star,
} from "lucide-react";

/* =========================================================
   TESTIMONIAL DATA
========================================================= */

const testimonials = [
  {
    id: 1,
    text:
      "We needed customized Packaging Air Bags, and D Pack delivered exactly what we were looking for. Great quality and professional service.",
    company: "Manufacturing Client",
    location: "Mumbai",
    initials: "MC",
  },

  {
    id: 2,
    text:
      "D Pack's Packaging Air Bags have greatly reduced product damage during our shipments. The quality is excellent and the service is always reliable.",
    company: "Logistics Client",
    location: "Delhi",
    initials: "LC",
  },

  {
    id: 3,
    text:
      "We have been using their Air Column Bags for packaging electronics, and the protection level is outstanding. Highly recommended for fragile items.",
    company: "Electronics Client",
    location: "Bangalore",
    initials: "EC",
  },

  {
    id: 4,
    text:
      "The packaging quality has made our dispatch process much safer. Their team understood our requirements and delivered a reliable solution.",
    company: "E-Commerce Client",
    location: "Pune",
    initials: "EC",
  },

  {
    id: 5,
    text:
      "Their protective packaging solutions have helped us improve product safety during transportation. The overall experience has been excellent.",
    company: "Packaging Client",
    location: "Gurugram",
    initials: "PC",
  },
];

/* =========================================================
   MAIN
========================================================= */

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const activeTestimonial =
    testimonials[activeIndex];

  /* =======================================================
     NEXT
  ======================================================= */

  const nextTestimonial = () => {
    setDirection(1);

    setActiveIndex((prev) =>
      prev === testimonials.length - 1
        ? 0
        : prev + 1
    );
  };

  /* =======================================================
     PREVIOUS
  ======================================================= */

  const previousTestimonial = () => {
    setDirection(-1);

    setActiveIndex((prev) =>
      prev === 0
        ? testimonials.length - 1
        : prev - 1
    );
  };

  /* =======================================================
     DIRECT PAGINATION
  ======================================================= */

  const goToTestimonial = (index) => {
    setDirection(
      index > activeIndex ? 1 : -1
    );

    setActiveIndex(index);
  };

  return (
    <section
      className="
        relative
        w-full
        overflow-hidden

        bg-[#EEF1F3]

        py-16
        sm:py-20
        lg:py-24
      "
    >
      {/* ===================================================
          BACKGROUND GRID
      =================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0

          opacity-[0.025]

          [background-image:linear-gradient(#123B5D_1px,transparent_1px),linear-gradient(90deg,#123B5D_1px,transparent_1px)]
          [background-size:75px_75px]
        "
      />

      {/* ===================================================
          BLUE GLOW
      =================================================== */}

      <motion.div
        animate={{
          x: [0, 60, 0],
          y: [0, 30, 0],
          scale: [1, 1.12, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute
          -left-[180px]
          top-[5%]

          h-[500px]
          w-[500px]

          rounded-full
          bg-[#D6E7EE]

          blur-[130px]
        "
      />

      {/* ===================================================
          ORANGE GLOW
      =================================================== */}

      <motion.div
        animate={{
          x: [0, -50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute
          -right-[150px]
          bottom-[-100px]

          h-[430px]
          w-[430px]

          rounded-full
          bg-[#F5A623]/10

          blur-[120px]
        "
      />

      {/* ===================================================
          BIG BACKGROUND TEXT
      =================================================== */}

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
          right-[-20px]
          top-[3%]

          hidden

          text-[150px]
          font-black
          leading-none
          tracking-[-0.08em]

          text-[#123B5D]/[0.025]

          xl:block
        "
      >
        REVIEWS
      </motion.span>

      {/* ===================================================
          CONTAINER
      =================================================== */}

      <div
        className="
          relative
          z-10

          mx-auto
          w-full
          max-w-[1450px]

          px-5
          sm:px-8
          lg:px-12
        "
      >
        <div
          className="
            grid
            items-center
            gap-14

            lg:grid-cols-[0.85fr_1.25fr]
            lg:gap-12

            xl:grid-cols-[0.8fr_1.3fr]
            xl:gap-16
          "
        >
          {/* =================================================
              LEFT CONTENT
          ================================================= */}

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
              amount: 0.3,
            }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="
              relative
              z-10
            "
          >
            {/* EYEBROW */}

            <div
              className="
                mb-5
                flex
                items-center
                gap-3
              "
            >
              <motion.span
                initial={{
                  width: 0,
                }}
                whileInView={{
                  width: 38,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.2,
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
                Customer Reviews
              </span>
            </div>

            {/* HEADING */}

            <h2
              className="
                max-w-[600px]

                text-[43px]
                font-black
                leading-[0.91]
                tracking-[-0.055em]
                text-[#202830]

                sm:text-[55px]
                lg:text-[60px]
                xl:text-[68px]
              "
            >
              Trusted by
              <br />

              businesses that

              <span
                className="
                  text-[#123B5D]
                "
              >
                {" "}ship.
              </span>
            </h2>

            {/* DESCRIPTION */}

            <p
              className="
                mt-6
                max-w-[450px]

                text-[14px]
                leading-7
                text-[#66737D]
              "
            >
              Manufacturers, logistics teams and
              e-commerce businesses trust DPACK
              protective packaging for safer
              deliveries across India.
            </p>

            {/* =============================================
                TRUST STAT
            ============================================= */}

            <motion.div
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
              }}
              transition={{
                duration: 0.7,
                delay: 0.25,
              }}
              className="
                mt-8

                flex
                w-fit
                items-center
                gap-5

                border-l-[3px]
                border-[#F5A623]

                pl-5
              "
            >
              <div>
                <div
                  className="
                    flex
                    items-center
                    gap-1
                  "
                >
                  {[1, 2, 3, 4, 5].map(
                    (star) => (
                      <Star
                        key={star}
                        size={13}
                        fill="currentColor"
                        strokeWidth={0}
                        className="
                          text-[#F5A623]
                        "
                      />
                    )
                  )}
                </div>

                <p
                  className="
                    mt-1

                    text-[12px]
                    font-black
                    uppercase
                    tracking-[0.06em]
                    text-[#123B5D]
                  "
                >
                  5.0 Customer Rating
                </p>
              </div>

              <div
                className="
                  h-10
                  w-px
                  bg-[#123B5D]/10
                "
              />

              <div
                className="
                  flex
                  items-center
                  gap-2
                "
              >
                <ShieldCheck
                  size={18}
                  className="
                    text-[#2F7180]
                  "
                />

                <span
                  className="
                    text-[12px]
                    font-bold
                    text-[#66737D]
                  "
                >
                  Verified
                  <br />
                  clients
                </span>
              </div>
            </motion.div>

            {/* =============================================
                NAVIGATION
            ============================================= */}

            <div
              className="
                mt-9
                flex
                items-center
                gap-3
              "
            >
              <motion.button
                whileHover={{
                  x: -3,
                }}
                whileTap={{
                  scale: 0.92,
                }}
                type="button"
                onClick={previousTestimonial}
                aria-label="Previous testimonial"
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center

                  border
                  border-[#123B5D]/15

                  bg-white

                  text-[#123B5D]

                  transition-colors
                  duration-300

                  hover:bg-[#123B5D]
                  hover:text-white
                "
              >
                <ArrowLeft size={16} />
              </motion.button>

              <motion.button
                whileHover={{
                  x: 3,
                }}
                whileTap={{
                  scale: 0.92,
                }}
                type="button"
                onClick={nextTestimonial}
                aria-label="Next testimonial"
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center

                  bg-[#123B5D]

                  text-white

                  transition-colors
                  duration-300

                  hover:bg-[#F5A623]
                  hover:text-[#123B5D]
                "
              >
                <ArrowRight size={16} />
              </motion.button>

              {/* CURRENT NUMBER */}

              <div
                className="
                  ml-2
                  flex
                  items-center
                  gap-2
                "
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={activeIndex}
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
                    className="
                      font-mono
                      text-[12px]
                      font-bold
                      text-[#123B5D]
                    "
                  >
                    0{activeIndex + 1}
                  </motion.span>
                </AnimatePresence>

                <span
                  className="
                    text-[12px]
                    text-[#9BA4A9]
                  "
                >
                  / 0{testimonials.length}
                </span>
              </div>
            </div>
          </motion.div>

          {/* =================================================
              RIGHT TESTIMONIAL AREA
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              x: 60,
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
            }}
            className="
              relative

              min-h-[510px]
              w-full

              lg:min-h-[540px]
            "
          >
            {/* ===============================================
                DECORATIVE TEXT
            =============================================== */}

            <span
              className="
                absolute
                left-[3%]
                top-[4%]

                hidden

                font-mono
                text-[10px]
                font-bold
                uppercase
                tracking-[0.15em]
                text-[#2F7180]

                sm:block
              "
            >
              Client Stories / 2026
            </span>

            {/* ===============================================
                BACK CARD 1
            =============================================== */}

            <motion.div
              animate={{
                rotate:
                  activeIndex % 2 === 0
                    ? 3
                    : 1,

                x:
                  activeIndex % 2 === 0
                    ? 8
                    : 15,

                y:
                  activeIndex % 2 === 0
                    ? 8
                    : 14,
              }}
              transition={{
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="
                absolute
                right-[3%]
                top-[6%]

                h-[430px]
                w-[82%]

                border
                border-[#123B5D]/5

                bg-[#C9DDE5]

                shadow-[0_20px_50px_rgba(18,59,93,0.05)]

                sm:h-[455px]

                lg:right-[5%]
                lg:h-[465px]
                lg:w-[78%]
              "
            />

            {/* ===============================================
                BACK CARD 2
            =============================================== */}

            <motion.div
              animate={{
                rotate:
                  activeIndex % 2 === 0
                    ? -1.5
                    : -3,

                x:
                  activeIndex % 2 === 0
                    ? 0
                    : -7,

                y:
                  activeIndex % 2 === 0
                    ? 2
                    : 8,
              }}
              transition={{
                duration: 0.6,
              }}
              className="
                absolute
                right-[1%]
                top-[3%]

                h-[430px]
                w-[82%]

                bg-[#DDE8EC]

                sm:h-[455px]

                lg:right-[3%]
                lg:h-[465px]
                lg:w-[78%]
              "
            />

            {/* ===============================================
                ORANGE CARD EDGE
            =============================================== */}

            <motion.div
              animate={{
                y: [0, -7, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                absolute
                right-[-5px]
                top-[18%]

                h-[190px]
                w-[14px]

                bg-[#F5A623]
              "
            />

            {/* ===============================================
                MAIN CARD
            =============================================== */}

            <AnimatePresence
              mode="wait"
              custom={direction}
            >
              <motion.article
                key={activeTestimonial.id}

                custom={direction}

                initial={{
                  opacity: 0,
                  x: direction * 70,
                  rotate:
                    direction === 1
                      ? 2
                      : -2,
                  scale: 0.97,
                }}

                animate={{
                  opacity: 1,
                  x: 0,
                  rotate: 0,
                  scale: 1,
                }}

                exit={{
                  opacity: 0,
                  x: direction * -60,
                  rotate:
                    direction === 1
                      ? -2
                      : 2,
                  scale: 0.97,
                }}

                transition={{
                  duration: 0.55,
                  ease: [0.16, 1, 0.3, 1],
                }}

                whileHover={{
                  y: -5,
                }}

                className="
                  absolute
                  right-[5%]
                  top-0
                  z-20

                  flex
                  h-[430px]
                  w-[82%]

                  flex-col
                  justify-between

                  border
                  border-[#DCE3E7]

                  bg-white

                  p-7

                  shadow-[0_30px_80px_rgba(18,59,93,0.10)]

                  sm:h-[455px]
                  sm:p-8

                  lg:right-[7%]
                  lg:h-[465px]
                  lg:w-[78%]
                  lg:p-9
                "
              >
                {/* =========================================
                    CARD BACKGROUND NUMBER
                ========================================= */}

                <span
                  className="
                    pointer-events-none

                    absolute
                    -right-1
                    -top-7

                    text-[150px]
                    font-black
                    leading-none
                    tracking-[-0.09em]

                    text-[#123B5D]/[0.035]
                  "
                >
                  0{activeTestimonial.id}
                </span>

                {/* =========================================
                    CARD TOP
                ========================================= */}

                <div
                  className="
                    relative
                    z-10
                  "
                >
                  <div
                    className="
                      flex
                      items-start
                      justify-between
                    "
                  >
                    {/* QUOTE ICON */}

                    <motion.div
                      initial={{
                        scale: 0,
                        rotate: -45,
                      }}
                      animate={{
                        scale: 1,
                        rotate: 0,
                      }}
                      transition={{
                        duration: 0.5,
                        delay: 0.1,
                        type: "spring",
                      }}
                      className="
                        flex
                        h-[55px]
                        w-[55px]
                        items-center
                        justify-center

                        bg-[#123B5D]

                        text-[#F5A623]
                      "
                    >
                      <Quote
                        size={23}
                        strokeWidth={1.5}
                        fill="currentColor"
                      />
                    </motion.div>

                    {/* VERIFIED */}

                    <motion.div
                      initial={{
                        opacity: 0,
                        x: 15,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        delay: 0.2,
                      }}
                      className="
                        flex
                        items-center
                        gap-2
                      "
                    >
                      <span
                        className="
                          flex
                          h-5
                          w-5
                          items-center
                          justify-center

                          rounded-full
                          bg-[#DCEBF0]

                          text-[#2F7180]
                        "
                      >
                        <Check
                          size={11}
                          strokeWidth={3}
                        />
                      </span>

                      <span
                        className="
                          text-[10px]
                          font-black
                          uppercase
                          tracking-[0.12em]
                          text-[#2F7180]
                        "
                      >
                        Verified Client
                      </span>
                    </motion.div>
                  </div>

                  {/* =======================================
                      STARS
                  ======================================= */}

                  <div
                    className="
                      mt-6
                      flex
                      items-center
                      gap-1
                    "
                  >
                    {[1, 2, 3, 4, 5].map(
                      (star) => (
                        <motion.div
                          key={`${activeTestimonial.id}-${star}`}
                          initial={{
                            opacity: 0,
                            scale: 0,
                            rotate: -30,
                          }}
                          animate={{
                            opacity: 1,
                            scale: 1,
                            rotate: 0,
                          }}
                          transition={{
                            delay:
                              0.12 +
                              star * 0.07,
                            type: "spring",
                            stiffness: 250,
                          }}
                        >
                          <Star
                            size={16}
                            fill="currentColor"
                            strokeWidth={0}
                            className="
                              text-[#F5A623]
                            "
                          />
                        </motion.div>
                      )
                    )}

                    <motion.span
                      initial={{
                        opacity: 0,
                      }}
                      animate={{
                        opacity: 1,
                      }}
                      transition={{
                        delay: 0.55,
                      }}
                      className="
                        ml-2
                        text-[12px]
                        font-bold
                        text-[#123B5D]
                      "
                    >
                      5.0
                    </motion.span>
                  </div>

                  {/* =======================================
                      REVIEW TEXT
                  ======================================= */}

                  <motion.p
                    initial={{
                      opacity: 0,
                      y: 25,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.55,
                      delay: 0.2,
                    }}
                    className="
                      mt-6
                      max-w-[620px]

                      text-[19px]
                      font-medium
                      leading-[1.55]
                      tracking-[-0.02em]
                      text-[#202830]

                      sm:text-[21px]
                      lg:text-[23px]
                    "
                  >
                    “{activeTestimonial.text}”
                  </motion.p>
                </div>

                {/* =========================================
                    CARD BOTTOM
                ========================================= */}

                <motion.div
                  initial={{
                    opacity: 0,
                    y: 15,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.35,
                  }}
                  className="
                    relative
                    z-10
                  "
                >
                  <div
                    className="
                      mb-5
                      h-px
                      w-full
                      bg-[#123B5D]/10
                    "
                  />

                  <div
                    className="
                      flex
                      items-end
                      justify-between
                    "
                  >
                    {/* CLIENT */}

                    <div
                      className="
                        flex
                        items-center
                        gap-3
                      "
                    >
                      {/* AVATAR */}

                      <motion.div
                        whileHover={{
                          rotate: 8,
                          scale: 1.08,
                        }}
                        className="
                          relative

                          flex
                          h-[48px]
                          w-[48px]
                          shrink-0
                          items-center
                          justify-center

                          bg-[#123B5D]

                          text-[12px]
                          font-black
                          tracking-[0.08em]
                          text-[#F5A623]
                        "
                      >
                        {activeTestimonial.initials}

                        {/* PULSE */}

                        <motion.span
                          animate={{
                            scale: [1, 1.8, 1],
                            opacity: [
                              0.6,
                              0,
                              0.6,
                            ],
                          }}
                          transition={{
                            duration: 2.5,
                            repeat: Infinity,
                          }}
                          className="
                            absolute
                            -right-1
                            -top-1

                            h-3
                            w-3

                            rounded-full
                            bg-[#F5A623]
                          "
                        />
                      </motion.div>

                      <div>
                        <h3
                          className="
                            text-[16px]
                            font-bold
                            text-[#123B5D]
                          "
                        >
                          {activeTestimonial.company}
                        </h3>

                        <div
                          className="
                            mt-1

                            flex
                            items-center
                            gap-1.5

                            text-[12px]
                            text-[#7B858C]
                          "
                        >
                          <MapPin
                            size={12}
                            strokeWidth={1.7}
                          />

                          {
                            activeTestimonial.location
                          }
                        </div>
                      </div>
                    </div>

                    {/* NUMBER */}

                    <div
                      className="
                        text-right
                      "
                    >
                      <span
                        className="
                          block

                          font-mono
                          text-[12px]
                          font-bold
                          text-[#2F7180]
                        "
                      >
                        STORY
                      </span>

                      <span
                        className="
                          mt-1
                          block

                          font-mono
                          text-[12px]
                          text-[#9BA4A9]
                        "
                      >
                        0
                        {
                          activeTestimonial.id
                        }
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* =========================================
                    ANIMATED BOTTOM LINE
                ========================================= */}

                <motion.div
                  key={`line-${activeTestimonial.id}`}
                  initial={{
                    width: "0%",
                  }}
                  animate={{
                    width: "100%",
                  }}
                  transition={{
                    duration: 0.8,
                    delay: 0.15,
                  }}
                  className="
                    absolute
                    bottom-0
                    left-0

                    h-[4px]

                    bg-[#F5A623]
                  "
                />
              </motion.article>
            </AnimatePresence>

            {/* ===============================================
                PAGINATION
            =============================================== */}

            <div
              className="
                absolute
                bottom-0
                right-[7%]
                z-40

                flex
                items-center
                gap-2
              "
            >
              {testimonials.map(
                (item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() =>
                      goToTestimonial(index)
                    }
                    aria-label={`Go to testimonial ${
                      index + 1
                    }`}
                    className="
                      relative

                      h-[4px]
                      w-8

                      overflow-hidden

                      bg-[#C8D0D4]
                    "
                  >
                    {activeIndex ===
                      index && (
                      <motion.span
                        layoutId="activeReview"
                        className="
                          absolute
                          inset-0

                          bg-[#F5A623]
                        "
                      />
                    )}
                  </button>
                )
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}