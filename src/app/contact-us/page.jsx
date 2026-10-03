import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Mail,
  Phone,
  MapPin,
  Clock3,
  MessageSquare,
  Send,
} from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#F7F8FA] text-[#081A33]">

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden bg-[#081A33] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">

        {/* Background shapes */}

        <div className="absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full bg-[#F5A623]/10 blur-3xl" />

        <div className="absolute -bottom-40 -left-32 h-[420px] w-[420px] rounded-full bg-white/[0.04] blur-3xl" />

        <div className="absolute right-[18%] top-[35%] h-px w-32 rotate-[25deg] bg-white/10" />

        <div className="relative mx-auto max-w-[1400px]">

          <div className="max-w-[760px]">

            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-[#F5A623]" />

              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/60">
                Get In Touch
              </p>
            </div>

            <h1 className="text-[42px] font-extrabold leading-[0.98] tracking-[-0.045em] text-white sm:text-[58px] lg:text-[72px]">
              Let&apos;s Talk About
              <br />
              Your{" "}
              <span className="text-[#F5A623]">
                Packaging Needs.
              </span>
            </h1>

            <p className="mt-6 max-w-[620px] text-[13px] leading-7 text-white/65 sm:text-[15px]">
              Looking for reliable protective packaging solutions?
              Connect with DPACK and let our team help you find the
              right solution for your products and shipments.
            </p>

          </div>

          {/* Hero bottom */}

          <div className="mt-12 flex flex-wrap items-center gap-4">

            <Link
              href="#contact-form"
              className="group inline-flex items-center gap-3 rounded-full bg-[#F5A623] px-6 py-3.5 text-[12px] font-bold text-[#081A33] transition-all duration-300 hover:gap-5 hover:bg-white"
            >
              Send an Enquiry

              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-[12px] font-semibold text-white transition-all duration-300 hover:border-white/50 hover:bg-white/5"
            >
              Explore Products

              <ArrowUpRight size={15} />
            </Link>

          </div>

        </div>
      </section>


      {/* =====================================================
          CONTACT INFO
      ====================================================== */}

      <section className="px-5 py-14 sm:px-8 lg:px-12 lg:py-20">

        <div className="mx-auto max-w-[1400px]">

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

            <ContactCard
              icon={<Phone size={21} />}
              title="Call Us"
              value="+91 00000 00000"
              description="Speak directly with our team."
            />

            <ContactCard
              icon={<Mail size={21} />}
              title="Email Us"
              value="info@dpack.in"
              description="Send us your requirements."
            />

            <ContactCard
              icon={<MapPin size={21} />}
              title="Visit Us"
              value="New Delhi, India"
              description="Connect with our team."
            />

            <ContactCard
              icon={<Clock3 size={21} />}
              title="Working Hours"
              value="Mon – Sat"
              description="10:00 AM – 6:00 PM"
            />

          </div>

        </div>
      </section>


      {/* =====================================================
          FORM + INFORMATION
      ====================================================== */}

      <section
        id="contact-form"
        className="px-5 pb-16 sm:px-8 lg:px-12 lg:pb-24"
      >

        <div className="mx-auto grid max-w-[1400px] gap-5 lg:grid-cols-[0.8fr_1.2fr]">

          {/* =================================================
              LEFT INFORMATION
          ================================================== */}

          <div className="relative overflow-hidden bg-[#081A33] p-7 sm:p-9 lg:p-11">

            <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-[#F5A623]/10 blur-3xl" />

            <div className="relative">

              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#F5A623] text-[#081A33]">
                <MessageSquare size={21} />
              </div>

              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45">
                Start A Conversation
              </p>

              <h2 className="mt-3 max-w-[440px] text-[32px] font-extrabold leading-[1.02] tracking-[-0.04em] text-white sm:text-[42px]">
                Tell us what you
                <br />
                <span className="text-[#F5A623]">
                  need.
                </span>
              </h2>

              <p className="mt-5 max-w-[430px] text-[12px] leading-6 text-white/60 sm:text-[13px]">
                Whether you need protective packaging for e-commerce,
                logistics, industrial products or transportation,
                share your requirements with us.
              </p>

              {/* Points */}

              <div className="mt-9 space-y-5">

                <InfoPoint
                  number="01"
                  title="Share Your Requirement"
                  text="Tell us about your product and packaging needs."
                />

                <InfoPoint
                  number="02"
                  title="Get The Right Solution"
                  text="Our team will help identify a suitable packaging option."
                />

                <InfoPoint
                  number="03"
                  title="Move Forward"
                  text="Discuss quantity, specifications and delivery requirements."
                />

              </div>

            </div>
          </div>


          {/* =================================================
              CONTACT FORM
          ================================================== */}

          <div className="bg-white p-6 shadow-[0_15px_50px_rgba(8,26,51,0.06)] sm:p-9 lg:p-11">

            <div className="mb-8">

              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#F5A623]">
                Contact Form
              </p>

              <h2 className="mt-2 text-[30px] font-extrabold tracking-[-0.04em] text-[#081A33] sm:text-[38px]">
                Send An Enquiry
              </h2>

              <p className="mt-2 max-w-[520px] text-[12px] leading-6 text-slate-500">
                Fill in the details below and our team will get back
                to you with the required information.
              </p>

            </div>

            <form className="space-y-5">

              <div className="grid gap-5 sm:grid-cols-2">

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

              <div className="grid gap-5 sm:grid-cols-2">

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

              <div>

                <label className="mb-2 block text-[11px] font-bold text-[#081A33]">
                  Product / Requirement
                </label>

                <select
                  defaultValue=""
                  className="h-12 w-full appearance-none border border-slate-200 bg-[#F8F9FA] px-4 text-[12px] text-slate-600 outline-none transition-all focus:border-[#F5A623]"
                >
                  <option value="" disabled>
                    Select a product
                  </option>

                  <option>Air Column Bags</option>
                  <option>Dunnage Air Bags</option>
                  <option>Air Column Rolls</option>
                  <option>Gap Fillers</option>
                  <option>Packaging Air Bags</option>
                  <option>Other Requirement</option>
                </select>

              </div>

              <div>

                <label className="mb-2 block text-[11px] font-bold text-[#081A33]">
                  Message
                </label>

                <textarea
                  rows={5}
                  placeholder="Tell us about your packaging requirement..."
                  className="w-full resize-none border border-slate-200 bg-[#F8F9FA] px-4 py-3 text-[12px] text-[#081A33] outline-none transition-all placeholder:text-slate-400 focus:border-[#F5A623]"
                />

              </div>

              <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">

                <p className="max-w-[320px] text-[10px] leading-5 text-slate-400">
                  By submitting this form, you agree to be contacted
                  regarding your enquiry.
                </p>

                <button
                  type="submit"
                  className="group inline-flex shrink-0 items-center justify-center gap-3 rounded-full bg-[#081A33] px-7 py-3.5 text-[11px] font-bold text-white transition-all duration-300 hover:gap-5 hover:bg-[#F5A623] hover:text-[#081A33]"
                >
                  Send Enquiry

                  <Send
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>

              </div>

            </form>
          </div>

        </div>
      </section>


      {/* =====================================================
          LOCATION / BOTTOM CTA
      ====================================================== */}

      <section className="px-5 pb-8 sm:px-8 lg:px-12">

        <div className="mx-auto max-w-[1400px]">

          <div className="relative overflow-hidden bg-[#EDEFF2] p-7 sm:p-10 lg:p-14">

            {/* Decorative */}

            <div className="absolute right-[-100px] top-[-100px] h-[300px] w-[300px] rounded-full bg-[#F5A623]/10" />

            <div className="relative grid items-center gap-8 md:grid-cols-[1fr_auto]">

              <div>

                <div className="mb-4 flex items-center gap-3">
                  <MapPin size={16} className="text-[#F5A623]" />

                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#081A33]/50">
                    Our Location
                  </p>
                </div>

                <h3 className="text-[27px] font-extrabold tracking-[-0.035em] text-[#081A33] sm:text-[36px]">
                  DPACK — New Delhi, India
                </h3>

                <p className="mt-3 max-w-[650px] text-[12px] leading-6 text-slate-500">
                  Connect with DPACK for protective packaging solutions,
                  product information and business enquiries.
                </p>

              </div>

              <Link
                href="/products"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#081A33] px-6 py-3.5 text-[11px] font-bold text-white transition-all duration-300 hover:gap-5 hover:bg-[#F5A623] hover:text-[#081A33]"
              >
                View Products

                <ArrowUpRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </Link>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}


/* =========================================================
   CONTACT CARD
========================================================= */

function ContactCard({
  icon,
  title,
  value,
  description,
}) {
  return (
    <div className="group bg-white p-6 shadow-[0_10px_35px_rgba(8,26,51,0.05)] transition-all duration-300 hover:-translate-y-1">

      <div className="flex items-start justify-between">

        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#081A33] text-[#F5A623] transition-all duration-300 group-hover:bg-[#F5A623] group-hover:text-[#081A33]">
          {icon}
        </div>

        <ArrowUpRight
          size={17}
          className="text-slate-300 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[#F5A623]"
        />

      </div>

      <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
        {title}
      </p>

      <h3 className="mt-2 text-[16px] font-extrabold text-[#081A33]">
        {value}
      </h3>

      <p className="mt-1 text-[11px] text-slate-500">
        {description}
      </p>

    </div>
  );
}


/* =========================================================
   INFO POINT
========================================================= */

function InfoPoint({
  number,
  title,
  text,
}) {
  return (
    <div className="flex gap-4">

      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 text-[9px] font-bold text-[#F5A623]">
        {number}
      </span>

      <div>
        <h4 className="text-[12px] font-bold text-white">
          {title}
        </h4>

        <p className="mt-1 text-[10px] leading-5 text-white/45">
          {text}
        </p>
      </div>

    </div>
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

      <label className="mb-2 block text-[11px] font-bold text-[#081A33]">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        className="h-12 w-full border border-slate-200 bg-[#F8F9FA] px-4 text-[12px] text-[#081A33] outline-none transition-all placeholder:text-slate-400 focus:border-[#F5A623]"
      />

    </div>
  );
}