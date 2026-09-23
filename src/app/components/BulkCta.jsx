"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  Package,
  Boxes,
  BadgeDollarSign,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";

const benefits = [
  "Customized sizes",
  "Bulk quantities",
  "Business pricing",
];

export default function BulkCTA() {
  return (
    <section className="relative w-full overflow-hidden bg-[#F4F5F5] px-4 py-5 sm:px-6 lg:px-8">
      <div
        className="
          relative
          mx-auto
          max-w-[1500px]
          overflow-hidden
          rounded-[30px]
          bg-[#102033]
          shadow-[0_30px_90px_rgba(16,32,51,0.16)]
        "
      >
        {/* =====================================================
            BACKGROUND
        ====================================================== */}

        <div className="pointer-events-none absolute inset-0">

          {/* Grid */}
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
              backgroundSize: "70px 70px",
            }}
          />

          {/* Orange glow */}
          <div className="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-[#D95026]/20 blur-[90px]" />

          <div className="absolute -bottom-40 left-[25%] h-[400px] w-[400px] rounded-full bg-[#D95026]/10 blur-[100px]" />

          {/* Decorative rings */}
          <div className="absolute -right-[180px] top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full border border-white/[0.06]" />

          <div className="absolute -right-[130px] top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full border border-white/[0.05]" />

          <div className="absolute -right-[80px] top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full border border-[#D95026]/20" />
        </div>

        {/* =====================================================
            MAIN CONTENT
        ====================================================== */}

        <div className="relative z-10 grid min-h-[520px] items-center lg:grid-cols-[1.1fr_0.9fr]">

          {/* ===================================================
              LEFT CONTENT
          ==================================================== */}

          <div className="px-7 py-14 sm:px-10 lg:px-16 lg:py-16 xl:px-20">

            {/* Eyebrow */}

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-6 flex items-center gap-3"
            >
              <span className="h-[2px] w-9 bg-[#D95026]" />

              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#E87954]">
                B2B • BULK ORDERS
              </span>
            </motion.div>

            {/* Heading */}

            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="
                max-w-[700px]
                text-[46px]
                font-black
                leading-[0.95]
                tracking-[-0.06em]
                text-white
                sm:text-[58px]
                lg:text-[66px]
              "
            >
              Need Packaging
              <br />

              <span className="text-[#E66A42]">
                in Bulk?
              </span>
            </motion.h2>

            {/* Description */}

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="
                mt-6
                max-w-[580px]
                text-[15px]
                leading-7
                text-white/55
                sm:text-[16px]
              "
            >
              Get customized sizes, bulk quantities and business
              pricing for your packaging requirements.
            </motion.p>

            {/* Benefits */}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-7 flex flex-wrap gap-x-6 gap-y-3"
            >
              {benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-center gap-2"
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#D95026] text-white">
                    <Check size={11} strokeWidth={3} />
                  </span>

                  <span className="text-[11px] font-medium text-white/70">
                    {benefit}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* Buttons */}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-9 flex flex-wrap gap-3"
            >

              {/* Primary */}

              <Link
                href="/bulk-quote"
                className="
                  group
                  inline-flex
                  items-center
                  gap-3
                  rounded-full
                  bg-[#D95026]
                  px-6
                  py-3.5
                  text-[12px]
                  font-bold
                  text-white
                  shadow-[0_12px_35px_rgba(217,80,38,0.25)]
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-[#E96843]
                "
              >
                Request Bulk Quote

                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15">
                  <ArrowUpRight
                    size={15}
                    className="transition-transform duration-300 group-hover:rotate-45"
                  />
                </span>
              </Link>

              {/* Secondary */}

              <Link
                href="/contact"
                className="
                  group
                  inline-flex
                  items-center
                  gap-3
                  rounded-full
                  border
                  border-white/15
                  bg-white/[0.04]
                  px-6
                  py-3.5
                  text-[12px]
                  font-bold
                  text-white
                  backdrop-blur
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-white/30
                  hover:bg-white/10
                "
              >
                <MessageCircle size={15} />

                Talk to Sales
              </Link>

            </motion.div>
          </div>

          {/* ===================================================
              RIGHT VISUAL
          ==================================================== */}

          <div className="relative hidden min-h-[520px] lg:block">

            {/* Central package visual */}

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.8,
                rotate: -5,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
                rotate: 0,
              }}
              viewport={{ once: true }}
              transition={{
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="
                absolute
                left-1/2
                top-1/2
                z-20
                flex
                h-[280px]
                w-[280px]
                -translate-x-1/2
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                border
                border-white/[0.08]
                bg-white/[0.035]
                backdrop-blur-sm
              "
            >

              <div className="absolute inset-5 rounded-full border border-[#D95026]/20" />

              <div className="text-center">

                <Package
                  size={52}
                  strokeWidth={1.2}
                  className="mx-auto text-[#E66A42]"
                />

                <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
                  DPACK
                </p>

                <p className="mt-2 text-[20px] font-bold tracking-[-0.03em] text-white">
                  Business
                  <br />
                  Packaging
                </p>

              </div>
            </motion.div>

            {/* =================================================
                FLOATING CARD 01
            ================================================== */}

            <motion.div
              initial={{ opacity: 0, x: 40, y: -20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="
                absolute
                right-[5%]
                top-[12%]
                z-30
                w-[190px]
                rounded-2xl
                border
                border-white/[0.08]
                bg-white/[0.06]
                p-4
                backdrop-blur-md
              "
            >

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D95026]/15 text-[#E66A42]">
                  <Boxes size={19} strokeWidth={1.7} />
                </div>

                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-white/35">
                    Quantity
                  </p>

                  <p className="mt-1 text-[13px] font-bold text-white">
                    Bulk Orders
                  </p>
                </div>

              </div>

            </motion.div>

            {/* =================================================
                FLOATING CARD 02
            ================================================== */}

            <motion.div
              initial={{ opacity: 0, x: 40, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="
                absolute
                bottom-[13%]
                right-[9%]
                z-30
                w-[190px]
                rounded-2xl
                border
                border-white/[0.08]
                bg-white/[0.06]
                p-4
                backdrop-blur-md
              "
            >

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D95026]/15 text-[#E66A42]">
                  <BadgeDollarSign
                    size={19}
                    strokeWidth={1.7}
                  />
                </div>

                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-white/35">
                    Pricing
                  </p>

                  <p className="mt-1 text-[13px] font-bold text-white">
                    Business Rates
                  </p>
                </div>

              </div>

            </motion.div>

            {/* =================================================
                FLOATING CARD 03
            ================================================== */}

            <motion.div
              initial={{ opacity: 0, x: -30, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="
                absolute
                bottom-[21%]
                left-[3%]
                z-30
                w-[175px]
                rounded-2xl
                border
                border-white/[0.08]
                bg-white/[0.06]
                p-4
                backdrop-blur-md
              "
            >

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D95026]/15 text-[#E66A42]">
                  <PackageCheck
                    size={19}
                    strokeWidth={1.7}
                  />
                </div>

                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-white/35">
                    Solutions
                  </p>

                  <p className="mt-1 text-[13px] font-bold text-white">
                    Custom Sizes
                  </p>
                </div>

              </div>

            </motion.div>

          </div>
        </div>

        {/* =====================================================
            BOTTOM LABEL
        ====================================================== */}

        <div className="absolute bottom-5 right-7 z-30 hidden items-center gap-3 lg:flex">
          <span className="h-px w-8 bg-white/15" />

          <span className="text-[8px] font-bold uppercase tracking-[0.28em] text-white/30">
            Built for business
          </span>
        </div>
      </div>
    </section>
  );
}