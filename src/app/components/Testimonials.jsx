"use client";

import React, { useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Quote,
  MapPin,
  Star,
} from "lucide-react";

/* ============================================================
   TESTIMONIAL DATA
============================================================ */

const testimonials = [
  {
    id: 1,
    text: "We needed customized Packaging Air Bags, and D Pack delivered exactly what we were looking for. Great quality and professional service.",
    company: "Manufacturing Company",
    location: "Mumbai",
    name: "Manufacturing Client",
    initials: "MC",
  },
  {
    id: 2,
    text: "D Pack's Packaging Air Bags have greatly reduced product damage during our shipments. The quality is excellent and the service is always reliable.",
    company: "Logistics Company",
    location: "Delhi",
    name: "Logistics Client",
    initials: "LC",
  },
  {
    id: 3,
    text: "We have been using their Air Column Bags for packaging electronics, and the protection level is outstanding. Highly recommended for fragile items.",
    company: "Electronics Distributor",
    location: "Bangalore",
    name: "Electronics Client",
    initials: "ED",
  },
  {
    id: 4,
    text: "The packaging quality has made our dispatch process much safer. Their team understood our requirements and delivered a reliable solution.",
    company: "E-Commerce Company",
    location: "Pune",
    name: "E-Commerce Client",
    initials: "EC",
  },
  {
    id: 5,
    text: "Their protective packaging solutions have helped us improve product safety during transportation. The overall experience has been excellent.",
    company: "Packaging Company",
    location: "Gurugram",
    name: "Packaging Client",
    initials: "PC",
  },
];

/* ============================================================
   TESTIMONIAL CARD
============================================================ */

function TestimonialCard({ testimonial }) {
  return (
    <article
      className="
        group
        relative
        flex
        min-h-[390px]
        w-[86vw]
        max-w-[430px]
        shrink-0
        flex-col
        justify-between
        overflow-hidden
        border
        border-black/[0.08]
        bg-white
        p-6
        shadow-[0_12px_45px_rgba(0,0,0,0.07)]
        transition-all
        duration-500
        hover:-translate-y-1
        hover:shadow-[0_20px_55px_rgba(0,0,0,0.11)]
        sm:w-[390px]
        md:w-[420px]
      "
    >
      {/* TOP */}

      <div>
        <div className="flex items-center justify-between">
          {/* QUOTE ICON */}

          <div
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              bg-[#171918]
              text-[#E9B95F]
            "
          >
            <Quote size={19} strokeWidth={1.5} />
          </div>

          {/* VERIFIED */}

          <span
            className="
              text-[9px]
              font-medium
              uppercase
              tracking-[0.2em]
              text-black/35
            "
          >
            Verified Client
          </span>
        </div>

        {/* RATING */}

        <div className="mt-7 flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={14}
              fill="#E9B95F"
              strokeWidth={0}
              className="text-[#E9B95F]"
            />
          ))}

          <span className="ml-2 text-[10px] text-black/35">
            5.0
          </span>
        </div>

        {/* REVIEW */}

        <p
          className="
            mt-6
            font-serif
            text-[21px]
            leading-[1.5]
            tracking-[-0.02em]
            text-[#171918]
            sm:text-[22px]
          "
        >
          “{testimonial.text}”
        </p>
      </div>

      {/* BOTTOM */}

      <div>
        <div className="mb-6 h-px w-full bg-black/[0.08]" />

        <div className="flex items-center justify-between">
          {/* CUSTOMER */}

          <div className="flex items-center gap-3">
            <div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-[#171918]
                text-[10px]
                font-semibold
                tracking-wider
                text-[#E9B95F]
              "
            >
              {testimonial.initials}
            </div>

            <div>
              <h3
                className="
                  text-[12px]
                  font-semibold
                  tracking-[-0.01em]
                  text-[#171918]
                "
              >
                {testimonial.company}
              </h3>

              <div className="mt-1 flex items-center gap-1 text-[10px] text-black/40">
                <MapPin size={10} strokeWidth={1.5} />

                {testimonial.location}
              </div>
            </div>
          </div>

          {/* NUMBER */}

          <span
            className="
              text-[10px]
              font-medium
              tracking-[0.2em]
              text-black/20
            "
          >
            0{testimonial.id}
          </span>
        </div>
      </div>

      {/* GOLD BOTTOM LINE */}

      <div
        className="
          absolute
          bottom-0
          left-0
          h-[3px]
          w-full
          origin-left
          scale-x-0
          bg-[#E9B95F]
          transition-transform
          duration-500
          group-hover:scale-x-100
        "
      />
    </article>
  );
}

/* ============================================================
   MAIN TESTIMONIAL SECTION
============================================================ */

export default function Testimonials() {
  const sliderRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);

  /* ============================================================
     SLIDER
  ============================================================ */

  const scrollSlider = (direction) => {
    if (!sliderRef.current) return;

    const amount = 450;

    sliderRef.current.scrollBy({
      left: direction === "next" ? amount : -amount,
      behavior: "smooth",
    });

    setActiveIndex((prev) => {
      if (direction === "next") {
        return Math.min(prev + 1, testimonials.length - 1);
      }

      return Math.max(prev - 1, 0);
    });
  };

  const scrollToCard = (index) => {
    if (!sliderRef.current) return;

    const cards = sliderRef.current.children;

    if (!cards[index]) return;

    cards[index].scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });

    setActiveIndex(index);
  };

  return (
    <section
      className="
        relative
        w-full
        overflow-hidden
        bg-[#F7F6F2]
        py-20
        sm:py-24
        lg:py-28
      "
    >
      {/* =====================================================
          BACKGROUND DETAILS
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -right-32
          -top-32
          h-[420px]
          w-[420px]
          rounded-full
          border
          border-[#E9B95F]/20
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -left-40
          bottom-[-220px]
          h-[450px]
          w-[450px]
          rounded-full
          border
          border-black/[0.04]
        "
      />

      {/* =====================================================
          CONTAINER
      ===================================================== */}

      <div className="relative mx-auto w-full max-w-[1500px]">
        {/* ===================================================
            HEADER
        =================================================== */}

        <div
          className="
            mb-12
            flex
            flex-col
            gap-8
            px-5
            sm:px-8
            lg:mb-14
            lg:flex-row
            lg:items-end
            lg:justify-between
            lg:px-14
          "
        >
          {/* LEFT */}

          <div className="max-w-[720px]">
            {/* EYEBROW */}

            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-[#E9B95F]" />

              <span
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.25em]
                  text-[#171918]/45
                "
              >
                Customer Reviews
              </span>
            </div>

            {/* HEADING */}

            <h2
              className="
                text-[42px]
                font-medium
                leading-[0.95]
                tracking-[-0.055em]
                text-[#171918]
                sm:text-[54px]
                md:text-[64px]
                lg:text-[76px]
              "
            >
              Loved by
              <span className="ml-2 text-[#B8860B]">
                businesses.
              </span>
            </h2>

            <p
              className="
                mt-5
                max-w-[550px]
                text-[13px]
                leading-6
                text-black/45
                sm:text-[14px]
              "
            >
              Trusted by manufacturers, logistics companies,
              e-commerce businesses and packaging professionals
              across India.
            </p>
          </div>

          {/* RIGHT CONTROLS */}

          <div className="flex items-center justify-between gap-5 lg:justify-end">
            {/* REVIEW COUNT */}

            <div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={13}
                    fill="#E9B95F"
                    strokeWidth={0}
                    className="text-[#E9B95F]"
                  />
                ))}
              </div>

              <p className="mt-2 text-[10px] uppercase tracking-[0.15em] text-black/35">
                5 Star Customer Experience
              </p>
            </div>

            {/* ARROWS */}

            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Previous testimonial"
                onClick={() => scrollSlider("prev")}
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  border
                  border-black/10
                  bg-white
                  text-[#171918]
                  transition-all
                  duration-300
                  hover:border-[#E9B95F]
                  hover:bg-[#E9B95F]
                "
              >
                <ArrowLeft size={17} strokeWidth={1.5} />
              </button>

              <button
                type="button"
                aria-label="Next testimonial"
                onClick={() => scrollSlider("next")}
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  bg-[#171918]
                  text-[#E9B95F]
                  transition-all
                  duration-300
                  hover:bg-[#E9B95F]
                  hover:text-[#171918]
                "
              >
                <ArrowRight size={17} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>

        {/* ===================================================
            SLIDER
        =================================================== */}

        <div
          ref={sliderRef}
          className="
            flex
            gap-5
            overflow-x-auto
            px-5
            pb-8
            sm:px-8
            lg:px-14
            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
            snap-x
            snap-mandatory
          "
        >
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="snap-start"
            >
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>

        {/* ===================================================
            BOTTOM NAVIGATION
        =================================================== */}

        <div
          className="
            mt-2
            flex
            items-center
            justify-between
            px-5
            sm:px-8
            lg:px-14
          "
        >
          {/* PAGINATION */}

          <div className="flex items-center gap-2">
            {testimonials.map((testimonial, index) => (
              <button
                key={testimonial.id}
                type="button"
                aria-label={`Go to testimonial ${index + 1}`}
                onClick={() => scrollToCard(index)}
                className={`
                  h-[3px]
                  transition-all
                  duration-300
                  ${
                    activeIndex === index
                      ? "w-10 bg-[#E9B95F]"
                      : "w-4 bg-black/10 hover:bg-black/25"
                  }
                `}
              />
            ))}
          </div>

          {/* SWIPE LABEL */}

          <div className="flex items-center gap-3">
            <span className="text-[9px] uppercase tracking-[0.2em] text-black/25">
              Swipe to explore
            </span>

            <span className="h-px w-8 bg-black/10" />
          </div>
        </div>
      </div>
    </section>
  );
}
