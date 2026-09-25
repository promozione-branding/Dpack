"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

/* =========================================================
   DPACK BANNER DATA
   EXISTING LOCAL IMAGES — NO EXTERNAL IMAGE LINKS
========================================================= */

const banners = {
  main: {
    tag: "FRAGILE PROTECTION",
    title: "Air Column Bags",
    highlight: "360° Protection",
    description:
      "Advanced inflatable cushioning designed to protect fragile products from impact during storage and transportation.",
    image: "/Air column bag (2).webp",
    href: "/",
  },

  dunnage: {
    tag: "CARGO PROTECTION",
    title: "Dunnage Air Bags",
    description:
      "Keep your cargo stable, secure and protected from movement during transportation.",
    image: "/Dannage.webp",
    href: "/products/dunnage-air-bags",
  },

  airRoll: {
    tag: "SMART PACKAGING",
    title: "Air Column Roll",
    description:
      "Flexible inflatable cushioning for safe and efficient protection of packaged products.",
    image: "/Air Column Roll (2).webp",
    href: "/products/air-column-roll",
  },

  packaging: {
    tag: "PROTECTIVE PACKAGING",
    title: "Packaging Air Bags",
    description:
      "Lightweight inflatable packaging solutions for fragile products and safer shipping.",
    image: "/packing bag.webp",
    href: "/products/packaging-air-bag",
  },

  gapFiller: {
    tag: "VOID FILL SOLUTION",
    title: "Gap Filler",
    description:
      "Fill empty spaces and prevent product movement during transportation.",
    image: "/Gap filler (3).webp",
    href: "/products/gap-filler",
  },
};

/* =========================================================
   FLOATING DOTS
========================================================= */

function FloatingDots() {
  return (
    <>
      <span className="absolute left-[8%] top-[18%] h-1 w-1 rounded-full bg-[#D95026]/40" />
      <span className="absolute left-[18%] bottom-[20%] h-1.5 w-1.5 rounded-full bg-[#17384D]/20" />
      <span className="absolute right-[18%] top-[15%] h-1 w-1 rounded-full bg-[#D95026]/35" />
      <span className="absolute right-[8%] bottom-[18%] h-1.5 w-1.5 rounded-full bg-[#17384D]/15" />
    </>
  );
}

/* =========================================================
   MAIN LARGE BANNER
========================================================= */

function MainBanner({ item }) {
  return (
    <Link href={item.href} className="block h-full">
      <motion.div
        whileHover={{ y: -4 }}
        transition={{
          duration: 0.35,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="
          group
          relative
          h-full
          min-h-[430px]
          overflow-hidden
          rounded-[22px]
          border
          border-[#17384D]/8
          bg-[#DDF4F8]
          shadow-[0_18px_60px_rgba(18,59,93,0.08)]
          sm:min-h-[500px]
          lg:min-h-[590px]
        "
      >
        {/* BACKGROUND */}
        <div className="absolute inset-0 bg-[#DDF4F8]" />

        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(circle_at_78%_22%,rgba(255,255,255,0.98),transparent_28%),radial-gradient(circle_at_5%_100%,rgba(217,80,38,0.08),transparent_35%),linear-gradient(145deg,#DDF4F8,#C8E9EF)]
          "
        />

        {/* Decorative large circle */}
        <div
          className="
            absolute
            -right-24
            -top-24
            h-72
            w-72
            rounded-full
            border
            border-white/60
            sm:h-96
            sm:w-96
          "
        />

        <div
          className="
            absolute
            -right-12
            -top-12
            h-48
            w-48
            rounded-full
            border
            border-[#D95026]/10
            sm:h-64
            sm:w-64
          "
        />

        {/* Orange glow */}
        <div
          className="
            absolute
            bottom-[-140px]
            left-[-100px]
            h-[360px]
            w-[360px]
            rounded-full
            bg-[#D95026]/10
            blur-[90px]
          "
        />

        <FloatingDots />

        {/* TOP LABEL */}
        <div
          className="
            absolute
            left-6
            top-6
            z-30
            sm:left-8
            sm:top-8
            lg:left-10
            lg:top-10
          "
        >
          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-[#17384D]/8
              bg-white/55
              px-3
              py-2
              backdrop-blur-md
            "
          >
            <span className="h-[6px] w-[6px] rounded-full bg-[#D95026]" />

            <span
              className="
                text-[8px]
                font-black
                uppercase
                tracking-[0.2em]
                text-[#17384D]
              "
            >
              {item.tag}
            </span>
          </div>
        </div>

        {/* TEXT */}
        <div
          className="
            absolute
            left-6
            top-[82px]
            z-30
            max-w-[390px]
            sm:left-8
            sm:top-[96px]
            lg:left-10
            lg:top-[105px]
          "
        >
          <div className="mb-3 flex items-center gap-2">
            <Sparkles
              size={13}
              className="text-[#D95026]"
            />

            <span
              className="
                text-[8px]
                font-bold
                uppercase
                tracking-[0.18em]
                text-[#D95026]
              "
            >
              Premium Packaging
            </span>
          </div>

          <h1
            className="
              max-w-[360px]
              text-[43px]
              font-black
              uppercase
              leading-[0.9]
              tracking-[-0.065em]
              text-[#123B5D]
              sm:text-[54px]
              lg:text-[64px]
            "
          >
            {item.title}
          </h1>

          <p
            className="
              mt-5
              max-w-[330px]
              text-[11px]
              font-medium
              leading-6
              text-[#46616D]
              sm:text-[12px]
            "
          >
            {item.description}
          </p>
        </div>

        {/* PRODUCT IMAGE */}
        <motion.div
          className="
            absolute
            bottom-[-18px]
            right-[-12px]
            z-10
            h-[57%]
            w-[79%]
            sm:bottom-[-15px]
            sm:right-[-5px]
            sm:h-[64%]
            sm:w-[72%]
            lg:right-[0px]
            lg:h-[67%]
            lg:w-[69%]
          "
          whileHover={{
            scale: 1.055,
            x: -7,
            y: -6,
          }}
          transition={{
            duration: 0.55,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {/* soft image backdrop */}
          <div
            className="
              absolute
              bottom-[8%]
              right-[7%]
              h-[55%]
              w-[65%]
              rounded-full
              bg-white/45
              blur-3xl
            "
          />

          <img
            src={item.image}
            alt={item.title}
            className="
              relative
              h-full
              w-full
              object-contain
              object-right-bottom
              drop-shadow-[0_30px_35px_rgba(18,59,93,0.20)]
            "
          />
        </motion.div>

        {/* BOTTOM INFO */}
        <div
          className="
            absolute
            bottom-7
            left-6
            z-30
            sm:bottom-9
            sm:left-8
            lg:bottom-10
            lg:left-10
          "
        >
          <div className="mb-3 flex items-center gap-2">
            <ShieldCheck
              size={14}
              className="text-[#D95026]"
            />

            <span
              className="
                text-[8px]
                font-black
                uppercase
                tracking-[0.15em]
                text-[#17384D]
              "
            >
              {item.highlight}
            </span>
          </div>

          <span
            className="
              inline-flex
              items-center
              gap-3
              bg-[#17384D]
              px-5
              py-3.5
              text-[8px]
              font-black
              uppercase
              tracking-[0.1em]
              text-white
              transition-all
              duration-300
              group-hover:bg-[#D95026]
            "
          >
            Explore Product

            <ArrowUpRight
              size={14}
              className="
                transition-transform
                duration-300
                group-hover:-translate-y-1
                group-hover:translate-x-1
              "
            />
          </span>
        </div>

        {/* NUMBER */}
        <span
          className="
            absolute
            bottom-8
            right-7
            z-20
            text-[10px]
            font-black
            tracking-[0.2em]
            text-[#123B5D]/20
          "
        >
          01
        </span>

        {/* HOVER BORDER */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            rounded-[22px]
            border
            border-transparent
            transition-all
            duration-300
            group-hover:border-[#D95026]/30
          "
        />
      </motion.div>
    </Link>
  );
}

/* =========================================================
   SMALL BANNER
========================================================= */

function SmallBanner({ item, number }) {
  return (
    <Link href={item.href} className="block h-full">
      <motion.div
        whileHover={{ y: -4 }}
        transition={{
          duration: 0.35,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="
          group
          relative
          h-full
          min-h-[205px]
          overflow-hidden
          rounded-[22px]
          border
          border-[#17384D]/8
          bg-[#EFF7F9]
          shadow-[0_15px_45px_rgba(18,59,93,0.06)]
          sm:min-h-[225px]
        "
      >
        {/* Background */}
        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(circle_at_78%_25%,rgba(255,255,255,0.98),transparent_30%),linear-gradient(145deg,#EFF7F9,#DDEEF1)]
          "
        />

        {/* Decorative ring */}
        <div
          className="
            absolute
            -right-16
            -top-16
            h-40
            w-40
            rounded-full
            border
            border-[#D95026]/10
          "
        />

        <div
          className="
            absolute
            bottom-[-70px]
            right-[-50px]
            h-44
            w-44
            rounded-full
            bg-[#D95026]/10
            blur-3xl
          "
        />

        {/* Content */}
        <div
          className="
            relative
            z-20
            flex
            h-full
            flex-col
            justify-between
            p-5
            sm:p-6
          "
        >
          <div className="max-w-[52%]">
            <span
              className="
                inline-flex
                rounded-full
                bg-[#D95026]/10
                px-2.5
                py-1.5
                text-[7px]
                font-black
                uppercase
                tracking-[0.17em]
                text-[#D95026]
              "
            >
              {item.tag}
            </span>

            <h2
              className="
                mt-3
                text-[22px]
                font-black
                uppercase
                leading-[0.92]
                tracking-[-0.055em]
                text-[#17384D]
                sm:text-[25px]
              "
            >
              {item.title}
            </h2>

            <span
              className="
                mt-5
                inline-flex
                items-center
                gap-2
                text-[8px]
                font-black
                uppercase
                tracking-[0.1em]
                text-[#17384D]
              "
            >
              View Product

              <ArrowRight
                size={12}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />
            </span>
          </div>
        </div>

        {/* Image */}
        <motion.div
          className="
            absolute
            bottom-[-10px]
            right-[-6px]
            z-10
            h-[86%]
            w-[61%]
            sm:h-[90%]
            sm:w-[62%]
          "
          whileHover={{
            scale: 1.09,
            x: -5,
            y: -5,
          }}
          transition={{
            duration: 0.45,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <div
            className="
              absolute
              bottom-[12%]
              right-[8%]
              h-[50%]
              w-[65%]
              rounded-full
              bg-white/60
              blur-2xl
            "
          />

          <img
            src={item.image}
            alt={item.title}
            className="
              relative
              h-full
              w-full
              object-contain
              object-right-bottom
              drop-shadow-[0_20px_25px_rgba(18,59,93,0.16)]
            "
          />
        </motion.div>

        {/* Number */}
        <span
          className="
            absolute
            bottom-5
            left-5
            z-20
            text-[8px]
            font-black
            tracking-[0.15em]
            text-[#123B5D]/20
          "
        >
          {number}
        </span>

        {/* Border */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            rounded-[22px]
            border
            border-transparent
            transition-all
            duration-300
            group-hover:border-[#D95026]/30
          "
        />
      </motion.div>
    </Link>
  );
}

/* =========================================================
   TALL RIGHT BANNER
========================================================= */

function TallBanner({ item }) {
  return (
    <Link href={item.href} className="block h-full">
      <motion.div
        whileHover={{ y: -4 }}
        transition={{
          duration: 0.35,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="
          group
          relative
          h-full
          min-h-[430px]
          overflow-hidden
          rounded-[22px]
          border
          border-[#17384D]/8
          bg-[#FFF0EB]
          shadow-[0_18px_55px_rgba(18,59,93,0.07)]
          sm:min-h-[500px]
          lg:min-h-[590px]
        "
      >
        {/* Background */}
        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(circle_at_50%_25%,rgba(255,255,255,0.98),transparent_33%),linear-gradient(145deg,#FFF3EE,#F2D7CC)]
          "
        />

        {/* Decorative circle */}
        <div
          className="
            absolute
            -right-20
            -top-20
            h-56
            w-56
            rounded-full
            border
            border-white/70
          "
        />

        <div
          className="
            absolute
            bottom-[-100px]
            left-1/2
            h-72
            w-72
            -translate-x-1/2
            rounded-full
            bg-[#D95026]/10
            blur-3xl
          "
        />

        <FloatingDots />

        {/* Content */}
        <div
          className="
            relative
            z-20
            h-full
            p-6
            sm:p-7
            lg:p-8
          "
        >
          <span
            className="
              inline-flex
              rounded-full
              bg-white/60
              px-3
              py-2
              text-[7px]
              font-black
              uppercase
              tracking-[0.18em]
              text-[#D95026]
              backdrop-blur-md
            "
          >
            {item.tag}
          </span>

          <h2
            className="
              mt-4
              max-w-[245px]
              text-[31px]
              font-black
              uppercase
              leading-[0.9]
              tracking-[-0.06em]
              text-[#17384D]
              sm:text-[35px]
              lg:text-[39px]
            "
          >
            {item.title}
          </h2>

          <p
            className="
              mt-4
              max-w-[225px]
              text-[9px]
              leading-5
              text-[#62696D]
              sm:text-[10px]
            "
          >
            {item.description}
          </p>

          {/* Button */}
          <span
            className="
              mt-6
              inline-flex
              items-center
              gap-2
              bg-[#17384D]
              px-4
              py-3.5
              text-[8px]
              font-black
              uppercase
              tracking-[0.1em]
              text-white
              transition-all
              duration-300
              group-hover:bg-[#D95026]
            "
          >
            Shop Now

            <ArrowUpRight
              size={13}
              className="
                transition-transform
                duration-300
                group-hover:-translate-y-0.5
                group-hover:translate-x-0.5
              "
            />
          </span>

          {/* Product Image */}
          <motion.div
            className="
              absolute
              bottom-[-18px]
              left-[2%]
              right-[2%]
              z-10
              h-[57%]
            "
            whileHover={{
              scale: 1.07,
              y: -6,
            }}
            transition={{
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div
              className="
                absolute
                bottom-[5%]
                left-[15%]
                h-[45%]
                w-[70%]
                rounded-full
                bg-white/55
                blur-3xl
              "
            />

            <img
              src={item.image}
              alt={item.title}
              className="
                relative
                h-full
                w-full
                object-contain
                object-bottom
                drop-shadow-[0_25px_30px_rgba(0,0,0,0.15)]
              "
            />
          </motion.div>

          {/* Bottom label */}
          <div
            className="
              absolute
              bottom-7
              left-7
              z-20
              flex
              items-center
              gap-2
              sm:bottom-8
              sm:left-8
            "
          >
            <span className="h-[5px] w-[5px] rounded-full bg-[#D95026]" />

            <span
              className="
                text-[7px]
                font-black
                uppercase
                tracking-[0.15em]
                text-[#17384D]/65
              "
            >
              Safe • Light • Reliable
            </span>
          </div>
        </div>

        {/* Border */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            rounded-[22px]
            border
            border-transparent
            transition-all
            duration-300
            group-hover:border-[#D95026]/30
          "
        />
      </motion.div>
    </Link>
  );
}

/* =========================================================
   GAP FILLER BANNER
========================================================= */

function GapFillerBanner({ item }) {
  return (
    <Link href={item.href} className="group block">
      <motion.div
        whileHover={{ y: -3 }}
        transition={{ duration: 0.35 }}
        className="
          relative
          min-h-[125px]
          overflow-hidden
          rounded-[22px]
          border
          border-[#17384D]/8
          bg-[#EEF7F4]
          shadow-[0_15px_45px_rgba(18,59,93,0.05)]
          sm:min-h-[145px]
        "
      >
        {/* Background */}
        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(circle_at_75%_50%,rgba(255,255,255,0.95),transparent_32%),linear-gradient(110deg,#EEF7F4,#D7EAE4)]
          "
        />

        {/* Decorative ring */}
        <div
          className="
            absolute
            -left-16
            -bottom-20
            h-44
            w-44
            rounded-full
            border
            border-[#D95026]/10
          "
        />

        <div
          className="
            absolute
            right-[28%]
            top-[-50px]
            h-32
            w-32
            rounded-full
            bg-white/50
            blur-2xl
          "
        />

        {/* Text */}
        <div
          className="
            relative
            z-20
            flex
            min-h-[125px]
            items-center
            px-6
            py-5
            sm:min-h-[145px]
            sm:px-8
          "
        >
          <div>
            <span
              className="
                inline-flex
                rounded-full
                bg-[#D95026]/10
                px-3
                py-1.5
                text-[7px]
                font-black
                uppercase
                tracking-[0.18em]
                text-[#D95026]
              "
            >
              {item.tag}
            </span>

            <h3
              className="
                mt-2
                text-[26px]
                font-black
                uppercase
                leading-none
                tracking-[-0.055em]
                text-[#17384D]
                sm:text-[30px]
              "
            >
              {item.title}
            </h3>

            <p
              className="
                mt-2
                hidden
                max-w-[300px]
                text-[9px]
                leading-4
                text-[#687878]
                sm:block
              "
            >
              {item.description}
            </p>
          </div>
        </div>

        {/* Image */}
        <motion.div
          className="
            absolute
            bottom-[-24px]
            right-[4%]
            z-10
            h-[165px]
            w-[300px]
            sm:right-[12%]
            sm:h-[185px]
            sm:w-[350px]
          "
          whileHover={{
            scale: 1.07,
            x: -5,
          }}
          transition={{
            duration: 0.45,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <img
            src={item.image}
            alt={item.title}
            className="
              h-full
              w-full
              object-contain
              object-right-bottom
              drop-shadow-[0_20px_25px_rgba(18,59,93,0.13)]
            "
          />
        </motion.div>

        {/* Button */}
        <div
          className="
            absolute
            right-6
            top-1/2
            z-20
            hidden
            -translate-y-1/2
            sm:block
            lg:right-8
          "
        >
          <span
            className="
              inline-flex
              items-center
              gap-2
              bg-[#17384D]
              px-5
              py-3.5
              text-[8px]
              font-black
              uppercase
              tracking-[0.1em]
              text-white
              transition-all
              duration-300
              group-hover:bg-[#D95026]
            "
          >
            Explore

            <ArrowRight
              size={12}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </span>
        </div>

        {/* Border */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            rounded-[22px]
            border
            border-transparent
            transition-all
            duration-300
            group-hover:border-[#D95026]/30
          "
        />
      </motion.div>
    </Link>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function Main() {
  return (
    <section
      className="
        w-full
        bg-[#FAFCFC]
        px-4
        py-6
        sm:px-6
        sm:py-8
        lg:px-8
        lg:py-10
      "
    >
      <div className="mx-auto max-w-[1500px]">

        {/* MAIN GRID */}
        <div
          className="
            grid
            grid-cols-1
            gap-4
            lg:grid-cols-[1.35fr_0.92fr_0.82fr]
          "
        >
          {/* LEFT */}
          <MainBanner item={banners.main} />

          {/* CENTER */}
          <div
            className="
              grid
              grid-cols-1
              gap-4
              sm:grid-cols-2
              lg:grid-cols-1
            "
          >
            <SmallBanner
              item={banners.dunnage}
              number="02"
            />

            <SmallBanner
              item={banners.airRoll}
              number="03"
            />
          </div>

          {/* RIGHT */}
          <TallBanner item={banners.packaging} />
        </div>

        {/* GAP FILLER */}
        <div className="mt-4">
          <GapFillerBanner item={banners.gapFiller} />
        </div>
      </div>
    </section>
  );
}