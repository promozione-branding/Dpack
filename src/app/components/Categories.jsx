"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";

/* ============================================================
   COLOR PALETTE
============================================================ */

const COLORS = {
  sage: "#8B9A6E",
  sageLight: "#AAB596",
  ivory: "#F7F2EB",
  beige: "#EAE2D6",
  charcoal: "#171918",
};

/* ============================================================
   CATEGORIES
============================================================ */

const categories = [
  {
    number: "01",
    name: "Dunnage Bag",
    image: "https://packingairbag.com/cat/1.webp",
    link: "https://packingairbag.com/categories/dunnage-bag",
    description:
      "Secure cargo and prevent shifting during transportation.",
    tag: "CARGO PROTECTION",
  },
  {
    number: "02",
    name: "Air Column Roll",
    image: "https://packingairbag.com/cat/2.webp",
    link: "https://packingairbag.com/categories/air-column-roll",
    description:
      "Flexible cushioning protection for fragile products.",
    tag: "CUSHIONING",
  },
  {
    number: "03",
    name: "Air Column Bag",
    image: "https://packingairbag.com/cat/5.webp",
    link: "https://packingairbag.com/categories/air-column-bag",
    description:
      "Lightweight inflatable protection for safe transit.",
    tag: "PRODUCT PROTECTION",
  },
  {
    number: "04",
    name: "Packaging Air Bag",
    image: "https://packingairbag.com/cat/3.webp",
    link: "https://packingairbag.com/categories/packaging-air-bag",
    description:
      "Efficient air packaging designed for modern logistics.",
    tag: "AIR PACKAGING",
  },
  {
    number: "05",
    name: "Gap Filler",
    image: "https://packingairbag.com/sideimg.png",
    link: "https://packingairbag.com/categories/gap-filler",
    description:
      "Fill empty spaces and keep cargo stable in transit.",
    tag: "VOID FILL",
  },
];

/* ============================================================
   CATEGORY CARD
============================================================ */

function CategoryCard({ item, index }) {
  const cardRef = useRef(null);

  const [hover, setHover] = useState(false);

  const [cursor, setCursor] = useState({
    x: 0,
    y: 0,
  });

  const heights = [
    "h-[430px]",
    "h-[465px]",
    "h-[440px]",
    "h-[475px]",
    "h-[435px]",
  ];

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const rect =
      cardRef.current.getBoundingClientRect();

    setCursor({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <Link
      ref={cardRef}
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onMouseMove={handleMouseMove}
      className={`
        group
        relative
        block
        shrink-0
        w-[290px]
        min-w-[290px]
        sm:w-[330px]
        sm:min-w-[330px]
        lg:w-[350px]
        lg:min-w-[350px]
        ${heights[index % heights.length]}
        overflow-hidden
        rounded-[6px]
        bg-[#EAE2D6]
        shadow-[0_20px_50px_rgba(23,25,24,0.14)]
      `}
    >
      {/* ======================================================
          IMAGE
      ====================================================== */}

      <motion.div
        className="absolute inset-0"
        animate={{
          scale: hover ? 1.07 : 1,
        }}
        transition={{
          duration: 0.9,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <Image
          src={item.image}
          alt={item.name}
          fill
          unoptimized
          sizes="350px"
          className="object-cover"
        />
      </motion.div>

      {/* ======================================================
          SAGE HOVER TINT
      ====================================================== */}

      <motion.div
        className="absolute inset-0 bg-[#8B9A6E]"
        animate={{
          opacity: hover ? 0.10 : 0,
        }}
        transition={{
          duration: 0.5,
        }}
      />

      {/* ======================================================
          GRADIENT
      ====================================================== */}

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-[#111411]
          via-[#111411]/25
          to-transparent
        "
      />

      {/* ======================================================
          NUMBER
      ====================================================== */}

      <div className="absolute left-6 top-6 z-20">
        <span
          className="
            font-serif
            text-[14px]
            italic
            text-white/75
          "
        >
          {item.number}
        </span>
      </div>

      {/* ======================================================
          TAG
      ====================================================== */}

      <div className="absolute right-6 top-6 z-20">
        <span
          className="
            rounded-full
            border
            border-white/25
            bg-white/10
            px-3
            py-1.5
            text-[7px]
            font-semibold
            uppercase
            tracking-[0.18em]
            text-white/80
            backdrop-blur-md
          "
        >
          {item.tag}
        </span>
      </div>

      {/* ======================================================
          CONTENT
      ====================================================== */}

      <div
        className="
          absolute
          bottom-0
          left-0
          right-0
          z-20
          p-6
          sm:p-7
        "
      >
        <div
          className="
            mb-4
            h-px
            w-8
            bg-[#AAB596]
            transition-all
            duration-500
            group-hover:w-16
          "
        />

        <h3
          className="
            max-w-[270px]
            text-[28px]
            font-medium
            leading-[0.98]
            tracking-[-0.045em]
            text-white
          "
        >
          {item.name}
        </h3>

        <p
          className="
            mt-4
            max-w-[245px]
            text-[11px]
            leading-[1.7]
            text-white/60
          "
        >
          {item.description}
        </p>

        <div className="mt-6 flex items-center justify-between">

          <span
            className="
              text-[8px]
              font-semibold
              uppercase
              tracking-[0.22em]
              text-white/45
            "
          >
            Explore
          </span>

          <span
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              bg-[#F7F2EB]
              text-[#171918]
              transition-all
              duration-500
              group-hover:rotate-45
              group-hover:bg-[#8B9A6E]
              group-hover:text-white
            "
          >
            <ArrowUpRight
              size={16}
              strokeWidth={1.5}
            />
          </span>

        </div>
      </div>

      {/* ======================================================
          INNER BORDER
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-3
          z-30
          rounded-[4px]
          border
          border-white/0
          transition-all
          duration-700
          group-hover:border-white/25
        "
      />

      {/* ======================================================
          DRAG CURSOR
      ====================================================== */}

      {hover && (
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.4,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            scale: 0.4,
          }}
          style={{
            left: cursor.x,
            top: cursor.y,
          }}
          className="
            pointer-events-none
            absolute
            z-50
            flex
            h-[78px]
            w-[78px]
            -translate-x-1/2
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            bg-[#8B9A6E]
            text-white
            shadow-[0_15px_45px_rgba(0,0,0,0.22)]
          "
        >
          <div className="text-center">

            <span
              className="
                block
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.12em]
              "
            >
              Drag
            </span>

            <ArrowRight
              size={14}
              className="mx-auto mt-1"
              strokeWidth={1.4}
            />

          </div>
        </motion.div>
      )}
    </Link>
  );
}

/* ============================================================
   MAIN COMPONENT
============================================================ */

export default function Categories() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  const [trackWidth, setTrackWidth] = useState(0);
  const [viewportWidth, setViewportWidth] =
    useState(0);

  /* ==========================================================
     CALCULATE HORIZONTAL DISTANCE
  ========================================================== */

  useEffect(() => {
    const updateDimensions = () => {
      if (trackRef.current) {
        setTrackWidth(
          trackRef.current.scrollWidth
        );
      }

      setViewportWidth(window.innerWidth);
    };

    updateDimensions();

    const resizeObserver =
      new ResizeObserver(updateDimensions);

    if (trackRef.current) {
      resizeObserver.observe(trackRef.current);
    }

    window.addEventListener(
      "resize",
      updateDimensions
    );

    return () => {
      resizeObserver.disconnect();

      window.removeEventListener(
        "resize",
        updateDimensions
      );
    };
  }, []);

  /* ==========================================================
     HORIZONTAL DISTANCE
  ========================================================== */

  const scrollDistance = Math.max(
    trackWidth - viewportWidth,
    0
  );

  /* ==========================================================
     VERTICAL SCROLL PROGRESS
  ========================================================== */

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: [
      "start start",
      "end end",
    ],
  });

  /* ==========================================================
     VERTICAL → HORIZONTAL
  ========================================================== */

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -scrollDistance]
  );

  /* ==========================================================
     SECTION HEIGHT

     If horizontal distance is 1500px,
     section gets approximately:

     1500px + viewport height

     This means vertical scroll distance
     equals horizontal travel distance.
  ========================================================== */

  const sectionHeight =
    viewportWidth && scrollDistance
      ? scrollDistance +
        window.innerHeight
      : 1000;

  return (
    <section
      ref={sectionRef}
      className="
        relative
        w-full
        bg-[#F7F2EB]
      "
      style={{
        height: `${sectionHeight}px`,
      }}
    >
      {/* ======================================================
          STICKY SCREEN
      ====================================================== */}

      <div
        className="
          sticky
          top-0
          flex
          h-screen
          items-center
          overflow-hidden
        "
      >

        {/* ====================================================
            SMALL TOP LABEL
        ==================================================== */}

        <div
          className="
            absolute
            left-6
            top-7
            z-50
            flex
            items-center
            gap-3
            sm:left-10
            lg:left-14
          "
        >
          <span
            className="
              h-px
              w-8
              bg-[#8B9A6E]
            "
          />

          <span
            className="
              text-[8px]
              font-semibold
              uppercase
              tracking-[0.3em]
              text-[#74796F]
            "
          >
            DPACK / Collection
          </span>
        </div>

        {/* ====================================================
            PROGRESS LINE
        ==================================================== */}

        <div
          className="
            absolute
            left-0
            top-0
            z-50
            h-[2px]
            w-full
            bg-black/[0.06]
          "
        >
          <motion.div
            style={{
              scaleX: scrollYProgress,
              transformOrigin: "left",
            }}
            className="
              h-full
              bg-[#8B9A6E]
            "
          />
        </div>

        {/* ====================================================
            HORIZONTAL TRACK
        ==================================================== */}

        <motion.div
          ref={trackRef}
          style={{
            x,
          }}
          className="
            flex
            h-full
            w-max
            items-center
          "
        >

          {/* ==================================================
              INTRO PANEL
          ================================================== */}

          <div
            className="
              relative
              flex
              h-screen
              w-[88vw]
              shrink-0
              items-center
              overflow-hidden
              bg-[#171918]
              px-8
              sm:w-[720px]
              sm:px-14
              lg:w-[850px]
              lg:px-20
            "
          >

            {/* Decorative circle */}

            <div
              className="
                pointer-events-none
                absolute
                -right-[220px]
                -top-[200px]
                h-[600px]
                w-[600px]
                rounded-full
                border
                border-white/[0.055]
              "
            />

            <div
              className="
                pointer-events-none
                absolute
                -right-[140px]
                -top-[120px]
                h-[430px]
                w-[430px]
                rounded-full
                border
                border-[#8B9A6E]/10
              "
            />

            {/* Giant background number */}

            <div
              className="
                pointer-events-none
                absolute
                bottom-[-30px]
                right-[-10px]
                text-[260px]
                font-black
                leading-none
                tracking-[-25px]
                text-white/[0.025]
              "
            >
              01
            </div>

            {/* Content */}

            <div className="relative z-10">

              <div className="flex items-center gap-4">

                <span
                  className="
                    h-[2px]
                    w-9
                    bg-[#8B9A6E]
                  "
                />

                <span
                  className="
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.3em]
                    text-[#AAB596]
                  "
                >
                  The collection
                </span>

              </div>

              <h2
                className="
                  mt-8
                  max-w-[650px]
                  text-[50px]
                  font-medium
                  leading-[0.93]
                  tracking-[-0.055em]
                  text-white
                  sm:text-[42px]
                  lg:text-[52px]
                "
              >
                Everything your

                <br />

                <span className="text-white/35">
                  packaging needs.
                </span>
              </h2>

              <p
                className="
                  mt-8
                  max-w-[520px]
                  text-[13px]
                  leading-[1.9]
                  text-white/45
                  sm:text-[15px]
                "
              >
                From cargo protection to product
                cushioning, explore our carefully
                selected range of packaging solutions
                designed for modern businesses.
              </p>

              <div
                className="
                  mt-10
                  flex
                  items-center
                  gap-4
                "
              >

                <span
                  className="
                    text-[8px]
                    font-semibold
                    uppercase
                    tracking-[0.25em]
                    text-white/30
                  "
                >
                  Scroll to explore
                </span>

                <span
                  className="
                    h-px
                    w-16
                    bg-[#8B9A6E]
                  "
                />

              </div>

            </div>
          </div>

          {/* ==================================================
              CATEGORY CARDS
          ================================================== */}

          {categories.map((item, index) => (
            <div
              key={item.number}
              className="
                relative
                flex
                h-screen
                w-[350px]
                shrink-0
                items-center
                px-2
                sm:w-[390px]
                lg:w-[420px]
              "
            >

              {/* Background number */}

              <div
                className="
                  pointer-events-none
                  absolute
                  bottom-[-10px]
                  left-0
                  z-0
                  text-[240px]
                  font-black
                  leading-none
                  tracking-[-20px]
                  text-black/[0.035]
                  lg:text-[280px]
                "
              >
                {item.number}
              </div>

              {/* Card */}

              <div className="relative z-10 w-full">
                <CategoryCard
                  item={item}
                  index={index}
                />
              </div>

            </div>
          ))}

         

        </motion.div>
      </div>
    </section>
  );
}