"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Phone,
  Mail,
  MapPin,
  Clock3,
  Send,
} from "lucide-react";

/* =========================================================
   CONTACT PAGE
========================================================= */

export default function ContactPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#F6F7F9] text-[#123B5D]">

      {/* =====================================================
          COMPACT HERO
      ====================================================== */}

      <section className="relative overflow-hidden bg-[#123B5D]">

        {/* Decorative circles */}

        <motion.div
          animate={{
            x: [0, 15, 0],
            y: [0, -10, 0],
            rotate: [0, 4, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-32 -top-36 h-[400px] w-[400px] rounded-full border border-white/[0.07]"
        />

        <motion.div
          animate={{
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-16 -top-20 h-[260px] w-[260px] rounded-full border border-[#F5A623]/40"
        />

        <div className="absolute -bottom-32 -left-20 h-[280px] w-[280px] rounded-full bg-[#F5A623]/15 blur-3xl" />

        {/* Decorative lines */}

        <div className="absolute left-[38%] top-[28%] h-px w-32 rotate-[25deg] bg-white/[0.08]" />

        <div className="absolute right-[20%] bottom-[20%] h-px w-24 rotate-[-25deg] bg-white/[0.08]" />

        {/* Hero Content */}

        <div className="relative mx-auto flex min-h-[245px] max-w-[1450px] items-center px-5 py-10 sm:min-h-[265px] sm:px-8 lg:px-12">

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-[850px]"
          >

            {/* Small Label */}

            <div className="mb-4 flex items-center gap-3">

              <span className="h-[2px] w-8 bg-[#F5A623]" />

              <span className="text-[9px] font-bold uppercase tracking-[0.28em] text-white/50">
                Contact DPACK
              </span>

            </div>

            {/* Heading */}

            <h1 className="text-[40px] font-extrabold leading-[0.95] tracking-[-0.055em] text-white sm:text-[52px] lg:text-[62px]">

              Let&apos;s talk about{" "}

              <span className="text-[#F5A623]">
                your packaging.
              </span>

            </h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.2,
              }}
              className="mt-4 max-w-[600px] text-[11px] leading-6 text-white/55 sm:text-[12px]"
            >
              Have a product enquiry, packaging requirement or business
              question? Get in touch with the DPACK team.
            </motion.p>

          </motion.div>

        </div>
      </section>


      {/* =====================================================
          MAIN CONTACT AREA
      ====================================================== */}

      <section className="relative px-4 sm:px-6 lg:px-10">

        <div className="mx-auto max-w-[1350px]">

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7 }}
            className="relative z-10 -mt-5 grid overflow-hidden bg-white shadow-[0_18px_55px_rgba(8,26,51,0.09)] sm:-mt-7 lg:grid-cols-[0.72fr_1.28fr]"
          >

            {/* =================================================
                LEFT CONTACT INFORMATION
            ================================================== */}

            <div className="relative overflow-hidden bg-[#0D2443] p-6 sm:p-8 lg:p-9">

              {/* Decorative circle */}

              <motion.div
                animate={{
                  scale: [1, 1.08, 1],
                  rotate: [0, 8, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#F5A623]/90"
              />

              <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full border border-white/[0.05]" />

              <div className="relative z-10">

                {/* Label */}

                <p className="text-[16px] font-bold uppercase tracking-[0.24em] text-white/40">
                  Contact Information
                </p>

                <h2 className="mt-2 text-[27px] font-extrabold leading-[1.02] tracking-[-0.04em] text-white sm:text-[31px]">

                  Talk to our{" "}

                  <span className="text-[#F5A623]">
                    team.
                  </span>

                </h2>


                {/* Contact Items */}

                <div className="mt-7 space-y-5">

                  {/* PHONE */}

                  <motion.a
                    href="tel:+917669988825"
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.25 }}
                    className="group block"
                  >

                    <div className="flex gap-3">

                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/[0.07] text-[#F5A623] transition-all duration-300 group-hover:bg-[#F5A623] group-hover:text-[#123B5D]">
                        <Phone size={15} />
                      </div>

                      <div>

                        <p className="text-[16px] font-semibold uppercase tracking-[0.16em] text-white/35">
                          Call Us
                        </p>

                        <p className="mt-1 text-[15px] font-semibold text-white transition-colors group-hover:text-[#F5A623]">
                          +91-7669988825
                        </p>

                      </div>

                    </div>

                  </motion.a>


                  {/* EMAIL */}

                  <motion.a
                    href="mailto:dpacksolutionindia@gmail.com"
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.25 }}
                    className="group block"
                  >

                    <div className="flex gap-3">

                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/[0.07] text-[#F5A623] transition-all duration-300 group-hover:bg-[#F5A623] group-hover:text-[#123B5D]">
                        <Mail size={15} />
                      </div>

                      <div className="min-w-0">

                        <p className="text-[16px] font-semibold uppercase tracking-[0.16em] text-white/35">
                          Send An Email
                        </p>

                        <p className="mt-1 break-all text-[15px] font-semibold text-white transition-colors group-hover:text-[#F5A623]">
                          dpacksolutionindia@gmail.com
                        </p>

                      </div>

                    </div>

                  </motion.a>


                  {/* ADDRESS */}

                  <motion.div
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.25 }}
                  >

                    <div className="flex gap-3">

                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/[0.07] text-[#F5A623]">
                        <MapPin size={15} />
                      </div>

                      <div>

                        <p className="text-[16px] font-semibold uppercase tracking-[0.16em] text-white/35">
                          Our Address
                        </p>

                        <p className="mt-1 max-w-[290px] text-[15px] leading-5 text-white/70">
                          Shakti Auto, Second Floor,
                          24/54B, Lala Ganesh Das Marg,
                          Tilak Nagar, West Delhi,
                          New Delhi - 110018, Delhi, India.
                        </p>

                      </div>

                    </div>

                  </motion.div>

                </div>

            
              </div>
            </div>


            {/* =================================================
                RIGHT ENQUIRY FORM
            ================================================== */}

            <div
              id="contact-form"
              className="bg-white p-6 sm:p-8 lg:p-9"
            >

              {/* Form Header */}

              <div className="flex items-start justify-between gap-5">

                <div>

                  <p className="text-[16px] font-bold uppercase tracking-[0.24em] text-[#F5A623]">
                    Send An Enquiry
                  </p>

                  <h2 className="mt-2 text-[28px] font-extrabold leading-none tracking-[-0.045em] text-[#123B5D] sm:text-[34px]">
                    How can we help?
                  </h2>

                </div>

                <motion.div
                  animate={{
                    y: [0, -4, 0],
                    rotate: [0, 3, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="hidden h-10 w-10 items-center justify-center rounded-full bg-[#F6F7F9] sm:flex"
                >
                  <Send
                    size={16}
                    className="text-[#123B5D]"
                  />
                </motion.div>

              </div>

              <p className="mt-3 max-w-[560px] text-[14px] leading-5 text-slate-500">
                Tell us about your requirement and our team will get
                back to you with the right packaging solution.
              </p>


              {/* Form */}

              <form
                className="mt-6 space-y-4"
                onSubmit={(e) => e.preventDefault()}
              >

                {/* Row 1 */}

                <div className="grid gap-4 sm:grid-cols-2">

                  <InputField
                    label="Your Name"
                    placeholder="Enter your name"
                    type="text"
                  />

                  <InputField
                    label="Company Name"
                    placeholder="Enter company name"
                    type="text"
                  />

                </div>


                {/* Row 2 */}

                <div className="grid gap-4 sm:grid-cols-2">

                  <InputField
                    label="Email Address"
                    placeholder="Enter your email"
                    type="email"
                  />

                  <InputField
                    label="Phone Number"
                    placeholder="Enter phone number"
                    type="tel"
                  />

                </div>



                {/* Message */}

                <div>

                  <label className="mb-1.5 block text-[9px] font-bold uppercase tracking-[0.08em] text-[#123B5D]">
                    Message
                  </label>

                  <textarea
                    rows={3}
                    placeholder="Tell us about your requirement..."
                    className="w-full resize-none border-b border-slate-200 bg-[#FAFBFC] px-3 py-2.5 text-[10px] text-[#123B5D] outline-none transition-all placeholder:text-slate-400 focus:border-[#F5A623]"
                  />

                </div>


                {/* Submit */}

                <div className="flex flex-col gap-4 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">

                  <p className="max-w-[310px] text-[16px] leading-4 text-slate-400">
                    Your information will only be used to respond to
                    your enquiry.
                  </p>

                  <button
                    type="submit"
                    className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#123B5D] px-6 py-3 text-[9px] font-bold uppercase tracking-[0.08em] text-white transition-all duration-300 hover:gap-5 hover:bg-[#F5A623] hover:text-[#123B5D]"
                  >

                    Send Enquiry

                    <ArrowRight
                      size={13}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />

                  </button>

                </div>

              </form>

            </div>

          </motion.div>

        </div>

      </section>


      {/* =====================================================
          COMPACT LOCATION SECTION
      ====================================================== */}

      <section className="px-4 py-9 sm:px-6 lg:px-10 lg:py-11">

        <div className="mx-auto max-w-[1350px]">

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid overflow-hidden bg-[#E9EDF1] lg:grid-cols-[1.35fr_0.65fr]"
          >

            {/* LOCATION */}

            <div className="relative min-h-[190px] overflow-hidden p-6 sm:p-8 lg:p-9">

              {/* Abstract map circles */}

              <div className="absolute inset-0 opacity-40">

                <div className="absolute right-[12%] top-[5%] h-32 w-32 rounded-full border border-[#123B5D]/10" />

                <div className="absolute right-[20%] top-[15%] h-48 w-48 rounded-full border border-[#123B5D]/10" />

                <div className="absolute bottom-[5%] right-[5%] h-24 w-24 rounded-full border border-[#123B5D]/10" />

                <div className="absolute left-[8%] top-[55%] h-px w-[60%] rotate-[-15deg] bg-[#123B5D]/10" />

                <div className="absolute left-[25%] top-[30%] h-px w-[50%] rotate-[18deg] bg-[#123B5D]/10" />

              </div>


              <div className="relative z-10">

                <div className="flex items-center gap-2">

                  <MapPin
                    size={14}
                    className="text-[#F5A623]"
                  />

                  <span className="text-[16px] font-bold uppercase tracking-[0.22em] text-[#123B5D]/45">
                    Find Us
                  </span>

                </div>

                <h3 className="mt-3 text-[25px] font-extrabold leading-none tracking-[-0.04em] text-[#123B5D] sm:text-[32px]">

                  Shakti Auto,{" "}

                  <span className="text-[#F5A623]">
                    Tilak Nagar.
                  </span>

                </h3>

                <p className="mt-3 max-w-[620px] text-[15px] leading-5 text-slate-500">
                  Second Floor, 24/54B, Lala Ganesh Das Marg,
                  Tilak Nagar, West Delhi, New Delhi - 110018,
                  Delhi, India.
                </p>

              </div>


              {/* Floating Pin */}

              <motion.div
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute bottom-6 right-7 flex h-10 w-10 items-center justify-center rounded-full bg-[#123B5D] text-[#F5A623] shadow-lg sm:bottom-8 sm:right-9"
              >
                <MapPin size={17} />
              </motion.div>

            </div>


            {/* QUICK CONTACT */}

            <div className="flex min-h-[190px] flex-col justify-center bg-[#123B5D] p-6 sm:p-8 lg:p-9">

              <p className="text-[16px] font-bold uppercase tracking-[0.22em] text-white/35">
                Need help?
              </p>

              <h3 className="mt-2 text-[24px] font-extrabold leading-[1.05] tracking-[-0.04em] text-white">
                Let&apos;s discuss your
                <br />
                <span className="text-[#F5A623]">
                  requirement.
                </span>
              </h3>

              <div className="mt-5 flex flex-wrap gap-2">

                <a
                  href="tel:+917669988825"
                  className="group inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-[16px] font-bold uppercase tracking-[0.06em] text-[#123B5D] transition-all hover:bg-[#F5A623]"
                >
                  <Phone size={12} />
                  Call Us
                </a>

                <a
                  href="mailto:dpacksolutionindia@gmail.com"
                  className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-[16px] font-bold uppercase tracking-[0.06em] text-white transition-all hover:border-[#F5A623] hover:text-[#F5A623]"
                >
                  <Mail size={12} />
                  Email Us
                </a>

              </div>

            </div>

          </motion.div>

        </div>

      </section>

      {/* =====================================================
    FULL WIDTH GOOGLE MAP
====================================================== */}

<section className="w-full px-0 pb-0 pt-6 sm:pt-8">

  <div className="relative h-[280px] w-full overflow-hidden sm:h-[340px] lg:h-[390px]">

    {/* Google Map */}

    <iframe
      src="https://www.google.com/maps?q=Shakti%20Auto,%20Second%20Floor,%2024/54B,%20Lala%20Ganesh%20Das%20Marg,%20Tilak%20Nagar,%20West%20Delhi,%20New%20Delhi%20110018,%20Delhi,%20India&output=embed"
      width="100%"
      height="100%"
      style={{
        border: 0,
      }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title="DPACK Location - Shakti Auto, Tilak Nagar"
    />

    {/* Map Label */}

    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="absolute left-4 top-4 z-10 sm:left-6 sm:top-6"
    >

      <div className="flex items-center gap-3 bg-[#123B5D] px-4 py-3 shadow-lg sm:px-5">

        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F5A623] text-[#123B5D]">
          <MapPin size={15} />
        </div>

        <div>

          <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-white/45">
            Visit Us
          </p>

          <p className="mt-0.5 text-[10px] font-semibold text-white sm:text-[11px]">
            Tilak Nagar, New Delhi
          </p>

        </div>

      </div>

    </motion.div>

  </div>

</section>

    </main>
  );
}


  /* =========================================================
   INPUT FIELD
  ========================================================= */

   function InputField({
  label,
  placeholder,
  type,
     }) {
  return (
    <div>

      <label className="mb-1.5 block text-[9px] font-bold uppercase tracking-[0.08em] text-[#123B5D]">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        className="h-11 w-full border-b border-slate-200 bg-[#FAFBFC] px-3 text-[10px] text-[#123B5D] outline-none transition-all placeholder:text-slate-400 focus:border-[#F5A623]"
      />

    </div>

    
  );

  
}