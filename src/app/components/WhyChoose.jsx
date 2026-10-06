"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";

import {
  BadgeDollarSign,
  Headphones,
  PackageCheck,
  ShieldCheck,
  Timer,
  Truck,
  ArrowRight,
} from "lucide-react";

/* =========================================================
   DATA
========================================================= */

const benefits = [
  {
    number: "01",
    title: "Built for Protection",
    description:
      "Protective air packaging designed to reduce movement, absorb impact and help your products arrive safely.",
    icon: ShieldCheck,
    label: "PROTECTION",
  },

  {
    number: "02",
    title: "Better Value",
    description:
      "Reliable packaging solutions that balance protection, performance and cost for everyday shipping.",
    icon: BadgeDollarSign,
    label: "VALUE",
  },

  {
    number: "03",
    title: "Easy Support",
    description:
      "Get help choosing the right packaging products for different sizes, applications and shipping requirements.",
    icon: Headphones,
    label: "SUPPORT",
  },

  {
    number: "04",
    title: "Reliable Delivery",
    description:
      "Packaging supplies prepared for dependable dispatch so your shipping workflow keeps moving.",
    icon: Timer,
    label: "DELIVERY",
  },
];

/* =========================================================
   COMPONENT
========================================================= */

export default function WhyChooseUs() {
  const sectionRef = useRef(null);

  const [active, setActive] = useState(0);

  /* =======================================================
     SCROLL
  ======================================================= */

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  /* =======================================================
     ACTIVE BENEFIT
  ======================================================= */

  useEffect(() => {
    const unsubscribe =
      scrollYProgress.on("change", (value) => {
        if (value < 0.25) {
          setActive(0);
        } else if (value < 0.5) {
          setActive(1);
        } else if (value < 0.75) {
          setActive(2);
        } else {
          setActive(3);
        }
      });

    return () => unsubscribe();
  }, [scrollYProgress]);

  /* =======================================================
     ADVANCED SCROLL MOVEMENTS
  ======================================================= */

  const packageY = useTransform(
    scrollYProgress,
    [0, 1],
    [-90, 130]
  );

  const packageRotate = useTransform(
    scrollYProgress,
    [0, 1],
    [-8, 10]
  );

  const routeProgress = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "100%"]
  );

  const bgTextX = useTransform(
    scrollYProgress,
    [0, 1],
    [100, -120]
  );

  const current = benefits[active];
  const Icon = current.icon;

  return (
    <section
      ref={sectionRef}
      className="
      hidden md:block
        relative
        h-[250vh]
        w-full
        bg-[#EEF1F3]
      "
    >
      {/* ===================================================
          STICKY SCREEN
      =================================================== */}

      <div
        className="
          sticky
          top-0
          h-screen
          min-h-[650px]
          w-full
          overflow-hidden
        "
      >
        {/* =================================================
            BACKGROUND
        ================================================= */}

        <div className="pointer-events-none absolute inset-0">

          {/* GRID */}

          <div
            className="
              absolute
              inset-0

              opacity-[0.035]

              [background-image:linear-gradient(#123B5D_1px,transparent_1px),linear-gradient(90deg,#123B5D_1px,transparent_1px)]
              [background-size:70px_70px]
            "
          />

          {/* BLUE GLOW */}

          <div
            className="
              absolute
              -left-[150px]
              top-[10%]

              h-[500px]
              w-[500px]

              rounded-full
              bg-[#D9E8EE]

              blur-[120px]
            "
          />

          {/* ORANGE GLOW */}

          <div
            className="
              absolute
              bottom-[-200px]
              right-[10%]

              h-[450px]
              w-[450px]

              rounded-full
              bg-[#F5A623]/10

              blur-[130px]
            "
          />

          {/* LARGE MOVING TEXT */}

          <motion.div
            style={{
              x: bgTextX,
            }}
            className="
              absolute
              bottom-[-40px]
              left-[25%]

              whitespace-nowrap

              text-[170px]
              font-black
              leading-none
              tracking-[-0.08em]

              text-[#123B5D]/[0.025]
            "
          >
            PROTECT • PACK • SHIP
          </motion.div>
        </div>

        {/* =================================================
            TOP BAR
        ================================================= */}

        <div
          className="
            absolute
            left-6
            right-6
            top-6
            z-50

            flex
            items-center
            justify-between

            sm:left-8
            sm:right-8

            lg:left-12
            lg:right-12
          "
        >
          <div className="flex items-center gap-3">

            <span
              className="
                h-[3px]
                w-9
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
              Why DPACK
            </span>

          </div>

          <span
            className="
              hidden

              text-[12px]
              font-bold
              uppercase
              tracking-[0.08em]
              text-[#66737D]

              sm:block
            "
          >
            Scroll to discover
          </span>
        </div>

        {/* =================================================
            LEFT DARK BLUE PANEL
        ================================================= */}

        <div
          className="
            absolute
            bottom-0
            left-0
            top-0

            w-[39%]

            bg-[#123B5D]
          "
        >
          {/* DECORATIVE NUMBER */}

          <AnimatePresence mode="wait">

            <motion.span
              key={current.number}
              initial={{
                opacity: 0,
                y: 40,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -40,
              }}
              transition={{
                duration: 0.45,
              }}
              className="
                absolute
                bottom-[4%]
                left-[5%]

                text-[190px]
                font-black
                leading-none
                tracking-[-0.1em]

                text-white/[0.035]
              "
            >
              {current.number}
            </motion.span>

          </AnimatePresence>

          {/* CONTENT */}

          <div
            className="
              absolute
              left-8
              top-1/2

              w-[72%]

              -translate-y-1/2

              lg:left-12
            "
          >
            <span
              className="
                text-[12px]
                font-black
                uppercase
                tracking-[0.15em]
                text-[#F5A623]
              "
            >
              The DPACK Difference
            </span>

            <h2
              className="
                mt-4

                text-[42px]
                font-black
                leading-[0.9]
                tracking-[-0.055em]
                text-white

                lg:text-[58px]
                xl:text-[66px]
              "
            >
              Packaging
              <br />

              built around

              <span className="text-[#F5A623]">
                {" "}protection.
              </span>
            </h2>

            <p
              className="
                mt-6
                max-w-[360px]

                text-[14px]
                leading-7
                text-white/60
              "
            >
              Four reasons to choose DPACK for your
              everyday protective packaging needs.
            </p>

            {/* =============================================
                BENEFIT NAVIGATION
            ============================================= */}

            <div
              className="
                mt-9
                flex
                flex-col
              "
            >
              {benefits.map((item, index) => {

                const BenefitIcon = item.icon;

                return (
                  <div
                    key={item.number}
                    className={`
                      relative

                      flex
                      items-center
                      gap-4

                      border-t
                      border-white/10

                      py-3

                      transition-all
                      duration-500

                      ${
                        index === active
                          ? "opacity-100"
                          : "opacity-35"
                      }
                    `}
                  >
                    {/* ACTIVE LINE */}

                    {index === active && (
                      <motion.span
                        layoutId="activeBenefit"
                        className="
                          absolute
                          left-0
                          top-0

                          h-[2px]
                          w-12

                          bg-[#F5A623]
                        "
                      />
                    )}

                    <span
                      className="
                        font-mono
                        text-[12px]
                        text-white/50
                      "
                    >
                      {item.number}
                    </span>

                    <BenefitIcon
                      size={15}
                      className={
                        index === active
                          ? "text-[#F5A623]"
                          : "text-white"
                      }
                    />

                    <span
                      className="
                        text-[12px]
                        font-bold
                        uppercase
                        tracking-[0.07em]
                        text-white
                      "
                    >
                      {item.label}
                    </span>

                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* =================================================
            CENTER PACKAGE JOURNEY
        ================================================= */}

        <div
          className="
            absolute
            bottom-0
            left-[39%]
            top-0

            hidden
            w-[17%]

            lg:block
          "
        >
          {/* ROUTE */}

          <div
            className="
              absolute
              left-1/2
              top-[14%]

              h-[72%]
              w-px

              -translate-x-1/2

              bg-[#123B5D]/10
            "
          >
            {/* ACTIVE ROUTE */}

            <motion.div
              style={{
                height: routeProgress,
              }}
              className="
                absolute
                left-0
                top-0

                w-[2px]

                bg-[#F5A623]
              "
            />

            {/* POINTS */}

            {[0, 1, 2, 3].map((item) => (
              <div
                key={item}
                style={{
                  top: `${item * 33.33}%`,
                }}
                className={`
                  absolute
                  left-1/2

                  h-3
                  w-3

                  -translate-x-1/2
                  -translate-y-1/2

                  rounded-full

                  border-[3px]
                  border-[#EEF1F3]

                  transition-all
                  duration-500

                  ${
                    item <= active
                      ? "bg-[#F5A623] shadow-[0_0_0_5px_rgba(245,166,35,0.12)]"
                      : "bg-[#BAC4CA]"
                  }
                `}
              />
            ))}
          </div>

          {/* MOVING PACKAGE */}

          <motion.div
            style={{
              y: packageY,
              rotate: packageRotate,
            }}
            className="
              absolute
              left-1/2
              top-[42%]

              z-20

              -translate-x-1/2
            "
          >
            <div
              className="
                relative

                flex
                h-[110px]
                w-[110px]
                items-center
                justify-center

                bg-[#123B5D]

                shadow-[0_25px_60px_rgba(18,59,93,0.22)]
              "
            >
              {/* PACKAGE ICON */}

              <PackageCheck
                size={42}
                strokeWidth={1.3}
                className="text-white"
              />

              {/* ORANGE CORNER */}

              <span
                className="
                  absolute
                  right-0
                  top-0

                  h-5
                  w-5

                  bg-[#F5A623]
                "
              />

              {/* SMALL LABEL */}

              <span
                className="
                  absolute
                  -bottom-7

                  whitespace-nowrap

                  text-[10px]
                  font-black
                  uppercase
                  tracking-[0.12em]
                  text-[#123B5D]
                "
              >
                DPACK
              </span>
            </div>
          </motion.div>
        </div>

        {/* =================================================
            RIGHT CONTENT
        ================================================= */}

        <div
          className="
            absolute
            right-[5%]
            top-1/2

            z-30

            w-[49%]

            -translate-y-1/2

            lg:w-[39%]
            xl:right-[7%]
            xl:w-[36%]
          "
        >
          <AnimatePresence mode="wait">

            <motion.div
              key={current.number}

              initial={{
                opacity: 0,
                x: 70,
              }}

              animate={{
                opacity: 1,
                x: 0,
              }}

              exit={{
                opacity: 0,
                x: -50,
              }}

              transition={{
                duration: 0.55,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {/* NUMBER */}

              <div
                className="
                  flex
                  items-end
                  gap-4
                "
              >
                <span
                  className="
                    text-[80px]
                    font-black
                    leading-none
                    tracking-[-0.08em]
                    text-[#123B5D]/[0.07]

                    lg:text-[110px]
                  "
                >
                  {current.number}
                </span>

                <span
                  className="
                    mb-3

                    text-[12px]
                    font-black
                    uppercase
                    tracking-[0.14em]
                    text-[#2F7180]
                  "
                >
                  {current.label}
                </span>
              </div>

              {/* ICON */}

              <motion.div
                initial={{
                  scale: 0.5,
                  rotate: -20,
                }}
                animate={{
                  scale: 1,
                  rotate: 0,
                }}
                transition={{
                  duration: 0.5,
                }}
                className="
                  mt-[-18px]

                  flex
                  h-14
                  w-14
                  items-center
                  justify-center

                  bg-[#123B5D]

                  text-white

                  shadow-[0_15px_35px_rgba(18,59,93,0.16)]
                "
              >
                <Icon
                  size={24}
                  strokeWidth={1.5}
                />
              </motion.div>

              {/* TITLE */}

              <h3
                className="
                  mt-6
                  max-w-[500px]

                  text-[34px]
                  font-black
                  leading-[0.95]
                  tracking-[-0.045em]
                  text-[#202830]

                  lg:text-[44px]
                  xl:text-[50px]
                "
              >
                {current.title}
              </h3>

              {/* DESCRIPTION */}

              <p
                className="
                  mt-5
                  max-w-[470px]

                  text-[14px]
                  leading-7
                  text-[#66737D]
                "
              >
                {current.description}
              </p>

              {/* FEATURE */}

              <div
                className="
                  mt-7

                  flex
                  items-center
                  gap-4

                  border-t
                  border-[#123B5D]/10

                  pt-5
                "
              >
                <div
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center

                    bg-[#F5A623]

                    text-[#123B5D]
                  "
                >
                  <Truck size={16} />
                </div>

                <div>
                  <p
                    className="
                      text-[12px]
                      font-black
                      uppercase
                      tracking-[0.07em]
                      text-[#123B5D]
                    "
                  >
                    Shop with confidence
                  </p>

                  <p
                    className="
                      mt-1
                      text-[12px]
                      text-[#7B858C]
                    "
                  >
                    Protection from packing to delivery
                  </p>
                </div>
              </div>

            </motion.div>

          </AnimatePresence>
        </div>

        {/* =================================================
            BOTTOM PROGRESS
        ================================================= */}

        <div
          className="
            absolute
            bottom-7
            right-[5%]

            z-50

            flex
            items-center
            gap-4

            xl:right-[7%]
          "
        >
          <div className="flex items-center gap-2">

            {benefits.map((item, index) => (
              <motion.span
                key={item.number}
                animate={{
                  width:
                    index === active
                      ? 36
                      : 7,

                  backgroundColor:
                    index === active
                      ? "#F5A623"
                      : "#B9C3C8",
                }}
                transition={{
                  duration: 0.4,
                }}
                className="h-[3px]"
              />
            ))}

          </div>

          <span
            className="
              font-mono
              text-[12px]
              font-bold
              text-[#66737D]
            "
          >
            0{active + 1} / 04
          </span>
        </div>

        {/* =================================================
            SCROLL INDICATOR
        ================================================= */}

        <div
          className="
            absolute
            bottom-7
            left-12

            z-50

            hidden
            items-center
            gap-3

            lg:flex
          "
        >
          <span
            className="
              text-[10px]
              font-bold
              uppercase
              tracking-[0.16em]
              text-white/45
            "
          >
            Keep scrolling
          </span>

          <motion.span
            animate={{
              x: [0, 7, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          >
            <ArrowRight
              size={14}
              className="text-[#F5A623]"
            />
          </motion.span>
        </div>

      </div>
    </section>
  );
}