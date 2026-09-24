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
  UsersRound,
  BadgeDollarSign,
  Headphones,
  Timer,
  ArrowUpRight,
  ArrowRight,
} from "lucide-react";

/* ============================================================
   DATA
============================================================ */

const benefits = [
  {
    number: "01",
    title: "Proven Experience",
    description:
      "Reliable packaging solutions backed by practical industry experience and a clear understanding of modern shipping requirements.",
    icon: UsersRound,
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

/* ============================================================
   MAIN COMPONENT
============================================================ */

export default function WhyChooseUs() {
  const sectionRef = useRef(null);

  const [active, setActive] = useState(0);

  /* ==========================================================
     SCROLL
  ========================================================== */

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  /* ==========================================================
     DETERMINE ACTIVE BENEFIT
  ========================================================== */

  useEffect(() => {
    const unsubscribe =
      scrollYProgress.on("change", (value) => {
        let next = 0;

        if (value >= 0.25) {
          next = 1;
        }

        if (value >= 0.5) {
          next = 2;
        }

        if (value >= 0.75) {
          next = 3;
        }

        setActive(next);
      });

    return () => unsubscribe();
  }, [scrollYProgress]);

  /* ==========================================================
     CIRCLE MOVEMENT
  ========================================================== */

  const circleRotate = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 12]
  );

  const circleScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.96, 1, 1.03]
  );

  /* ==========================================================
     BACKGROUND ORBIT
  ========================================================== */

  const orbitRotate = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 180]
  );

  /* ==========================================================
     CURRENT DATA
  ========================================================== */

  const current = benefits[active];

  const Icon = current.icon;

  return (
    <section
      ref={sectionRef}
      className="
        relative
        h-[400vh]
        w-full
        bg-[#F7F2EB]
      "
    >
      {/* ======================================================
          STICKY VIEWPORT
      ====================================================== */}

      <div
        className="
          sticky
          top-0
          h-screen
          w-full
          overflow-hidden
        "
      >

        {/* ====================================================
            BACKGROUND
        ==================================================== */}

        <div className="pointer-events-none absolute inset-0">

          {/* soft glow */}

          <div
            className="
              absolute
              right-[8%]
              top-[18%]
              h-[420px]
              w-[420px]
              rounded-full
              bg-[#EAE2D6]/70
              blur-[120px]
            "
          />

          <div
            className="
              absolute
              bottom-[-120px]
              right-[28%]
              h-[350px]
              w-[350px]
              rounded-full
              bg-[#2F7180]/10
              blur-[120px]
            "
          />

          {/* subtle grid */}

          <div
            className="
              absolute
              inset-0
              opacity-[0.025]
              [background-image:linear-gradient(#171918_1px,transparent_1px),linear-gradient(90deg,#171918_1px,transparent_1px)]
              [background-size:70px_70px]
            "
          />

        </div>

        {/* ====================================================
            TOP LABEL
        ==================================================== */}

        <div
          className="
            absolute
            left-6
            top-6
            z-[100]
            flex
            items-center
            gap-3
            sm:left-8
            sm:top-8
            lg:left-12
          "
        >

          <span
            className="
              h-[2px]
              w-8
              bg-[#2F7180]
            "
          />

          <span
            className="
              text-[8px]
              font-bold
              uppercase
              tracking-[0.32em]
              text-[#74796F]
            "
          >
            Why DPACK
          </span>

        </div>

        {/* ====================================================
            LEFT HALF CIRCLE
        ==================================================== */}

        <motion.div
          style={{
            rotate: circleRotate,
            scale: circleScale,
          }}
          className="
            absolute
            left-0
            top-1/2
            z-20
            h-[780px]
            w-[780px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-[#2F7180]
            shadow-[25px_20px_80px_rgba(23,25,24,0.10)]
            sm:h-[850px]
            sm:w-[850px]
            lg:h-[920px]
            lg:w-[920px]
          "
        >

          {/* ==================================================
              INNER RING
          ================================================== */}

          <div
            className="
              absolute
              inset-[24px]
              rounded-full
              border
              border-white/20
            "
          />

          <div
            className="
              absolute
              inset-[50px]
              rounded-full
              border
              border-white/10
            "
          />

          {/* ==================================================
              CIRCLE CONTENT
          ================================================== */}

          <div
            className="
              absolute
              left-[48%]
              top-1/2
              w-[43%]
              -translate-y-1/2
              text-center
            "
          >

            <motion.div
              key={active}
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
              }}
            >

              <p
                className="
                  text-[8px]
                  font-semibold
                  uppercase
                  tracking-[0.3em]
                  text-white/60
                "
              >
                The DPACK Difference
              </p>

              <h2
                className="
                  mt-5
                  text-[48px]
                  font-black
                  leading-[0.84]
                  tracking-[-0.065em]
                  text-[#171918]
                  sm:text-[58px]
                  lg:text-[70px]
                "
              >
                Why

                <br />

                Choose

                <br />

                <span className="text-white">
                  Us?
                </span>
              </h2>

              <div className="mx-auto my-6 h-[2px] w-10 bg-[#171918]/35" />

              <p
                className="
                  mx-auto
                  max-w-[230px]
                  text-[11px]
                  font-medium
                  leading-[1.7]
                  text-[#171918]/60
                  sm:text-[12px]
                "
              >
                Four reasons businesses choose
                DPACK for dependable packaging.
              </p>

            </motion.div>

          </div>

          {/* ==================================================
              CIRCLE NUMBER
          ================================================== */}

          <div
            className="
              absolute
              bottom-[115px]
              left-[57%]
              text-[9px]
              font-bold
              tracking-[0.25em]
              text-white/50
            "
          >
            0{active + 1} / 04
          </div>

        </motion.div>

        {/* ====================================================
            ORBIT RING
        ==================================================== */}

        <motion.div
          style={{
            rotate: orbitRotate,
          }}
          className="
            pointer-events-none
            absolute
            left-[390px]
            top-1/2
            z-10
            h-[590px]
            w-[590px]
            -translate-y-1/2
            rounded-full
            border
            border-[#2F7180]/25
            sm:left-[430px]
            lg:left-[470px]
            lg:h-[680px]
            lg:w-[680px]
          "
        >

          {/* orbit dot */}

          <div
            className="
              absolute
              right-[10px]
              top-1/2
              h-3
              w-3
              -translate-y-1/2
              rounded-full
              bg-[#2F7180]
              shadow-[0_0_0_8px_rgba(139,154,110,0.10)]
            "
          />

        </motion.div>

        {/* ====================================================
            RIGHT ACTIVE CONTENT
        ==================================================== */}

        <div
          className="
            absolute
            right-5
            top-1/2
            z-50
            w-[44%]
            -translate-y-1/2
            sm:right-10
            sm:w-[43%]
            lg:right-20
            lg:w-[39%]
            xl:right-28
            xl:w-[36%]
          "
        >

          <AnimatePresence
            mode="wait"
          >

            <motion.div
              key={current.number}
              initial={{
                opacity: 0,
                x: 80,
                scale: 0.94,
              }}
              animate={{
                opacity: 1,
                x: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                x: -80,
                scale: 0.94,
              }}
              transition={{
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
            >

              {/* NUMBER */}

              <div
                className="
                  font-black
                  text-[90px]
                  leading-none
                  tracking-[-0.08em]
                  text-[#171918]/[0.055]
                  sm:text-[110px]
                  lg:text-[140px]
                "
              >
                {current.number}
              </div>

              {/* ICON */}

              <motion.div
                initial={{
                  scale: 0,
                  rotate: -15,
                }}
                animate={{
                  scale: 1,
                  rotate: 0,
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.1,
                }}
                className="
                  mt-[-28px]
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-[17px]
                  bg-[#171918]
                  text-[#F7F2EB]
                  shadow-[0_15px_35px_rgba(23,25,24,0.14)]
                  sm:h-16
                  sm:w-16
                "
              >
                <Icon
                  size={25}
                  strokeWidth={1.5}
                />
              </motion.div>

              {/* SMALL LABEL */}

              <p
                className="
                  mt-7
                  text-[8px]
                  font-bold
                  uppercase
                  tracking-[0.32em]
                  text-[#2F7180]
                "
              >
                {current.small}
              </p>

              {/* TITLE */}

              <h3
                className="
                  mt-3
                  max-w-[520px]
                  text-[38px]
                  font-black
                  leading-[0.92]
                  tracking-[-0.055em]
                  text-[#171918]
                  sm:text-[45px]
                  lg:text-[56px]
                "
              >
                {current.title}
              </h3>

              {/* DESCRIPTION */}

              <p
                className="
                  mt-6
                  max-w-[470px]
                  text-[13px]
                  leading-[1.8]
                  text-[#74796F]
                  sm:text-[14px]
                  lg:text-[15px]
                "
              >
                {current.description}
              </p>

              {/* LINE */}

              <div className="mt-8 flex items-center gap-4">

                <div
                  className="
                    h-px
                    w-14
                    bg-[#2F7180]
                  "
                />

                <span
                  className="
                    text-[8px]
                    font-semibold
                    uppercase
                    tracking-[0.25em]
                    text-[#999D95]
                  "
                >
                  DPACK Advantage
                </span>

              </div>

            </motion.div>

          </AnimatePresence>
        </div>

        {/* ====================================================
            BOTTOM PROGRESS
        ==================================================== */}

        <div
          className="
            absolute
            bottom-7
            right-6
            z-[100]
            flex
            items-center
            gap-4
            sm:right-10
            lg:right-16
          "
        >

          {/* progress numbers */}

          <div className="flex items-center gap-2">

            {benefits.map(
              (item, index) => (
                <motion.div
                  key={item.number}
                  animate={{
                    width:
                      index === active
                        ? 38
                        : 8,
                    opacity:
                      index === active
                        ? 1
                        : 0.35,
                  }}
                  className="
                    h-[3px]
                    rounded-full
                    bg-[#2F7180]
                  "
                />
              )
            )}

          </div>

          <span
            className="
              font-mono
              text-[8px]
              font-bold
              tracking-[0.18em]
              text-[#74796F]
            "
          >
            0{active + 1} / 04
          </span>

        </div>

        {/* ====================================================
            SCROLL INDICATOR
        ==================================================== */}

        <div
          className="
            absolute
            bottom-7
            left-6
            z-[100]
            hidden
            items-center
            gap-3
            sm:flex
            sm:left-8
            lg:left-12
          "
        >

          <span
            className="
              text-[7px]
              font-bold
              uppercase
              tracking-[0.28em]
              text-[#8B9188]
            "
          >
            Scroll to explore
          </span>

          <span className="h-px w-10 bg-[#D2CEC5]" />

          <ArrowRight
            size={12}
            className="text-[#2F7180]"
          />

        </div>

      </div>
    </section>
  );
}