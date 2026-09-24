"use client";

import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  Quote,
  Star,
} from "lucide-react";

/* ============================================================
   TESTIMONIAL DATA
============================================================ */

const testimonials = [
  {
    id: 1,
    text: "We needed customized Packaging Air Bags, and D Pack delivered exactly what we were looking for. Great quality and professional service.",
    company: "Manufacturing Client",
    location: "Mumbai",
    initials: "MC",
  },
  {
    id: 2,
    text: "D Pack's Packaging Air Bags have greatly reduced product damage during our shipments. The quality is excellent and the service is always reliable.",
    company: "Logistics Client",
    location: "Delhi",
    initials: "LC",
  },
  {
    id: 3,
    text: "We have been using their Air Column Bags for packaging electronics, and the protection level is outstanding. Highly recommended for fragile items.",
    company: "Electronics Client",
    location: "Bangalore",
    initials: "EC",
  },
  {
    id: 4,
    text: "The packaging quality has made our dispatch process much safer. Their team understood our requirements and delivered a reliable solution.",
    company: "E-Commerce Client",
    location: "Pune",
    initials: "EC",
  },
  {
    id: 5,
    text: "Their protective packaging solutions have helped us improve product safety during transportation. The overall experience has been excellent.",
    company: "Packaging Client",
    location: "Gurugram",
    initials: "PC",
  },
];

/* ============================================================
   MAIN
============================================================ */

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeTestimonial = testimonials[activeIndex];

  /* ==========================================================
     NEXT
  ========================================================== */

  const nextTestimonial = () => {
    setActiveIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  /* ==========================================================
     PREVIOUS
  ========================================================== */

  const previousTestimonial = () => {
    setActiveIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  return (
    <section
      className="
        relative
        w-full
        overflow-hidden
        bg-[#F8F7F3]
        py-20
        sm:py-24
        lg:min-h-[650px]
        lg:py-24
      "
    >
      {/* ======================================================
          BACKGROUND DECORATION
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -right-[180px]
          -top-[180px]
          h-[420px]
          w-[420px]
          rounded-full
          border
          border-[#D4A017]/10
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -left-[220px]
          bottom-[-250px]
          h-[500px]
          w-[500px]
          rounded-full
          border
          border-black/[0.035]
        "
      />

      {/* ======================================================
          MAIN CONTAINER
      ====================================================== */}

      <div
        className="
          relative
          mx-auto
          w-full
          max-w-[1450px]
          px-5
          sm:px-8
          lg:px-12
          xl:px-16
        "
      >
        <div
          className="
            grid
            items-center
            gap-14
            lg:grid-cols-[0.95fr_1.25fr]
            lg:gap-10
            xl:grid-cols-[0.9fr_1.35fr]
            xl:gap-16
          "
        >
          {/* ==================================================
              LEFT CONTENT
          ================================================== */}

          <div
            className="
              relative
              z-10
              flex
              flex-col
              items-start
            "
          >
            {/* EYEBROW */}

            <div
              className="
                mb-6
                flex
                items-center
                gap-4
              "
            >
              <span
                className="
                  h-[2px]
                  w-12
                  bg-[#D4A017]
                "
              />

              <span
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.25em]
                  text-[#8B7B55]
                "
              >
                Customer Reviews
              </span>
            </div>

            {/* HEADING */}

            <h2
              className="
                max-w-[650px]
                font-[var(--font-outfit)]
                text-[46px]
                font-black
                leading-[0.9]
                tracking-[-0.055em]
                text-[#101A26]
                sm:text-[58px]
                md:text-[68px]
                lg:text-[66px]
                xl:text-[78px]
              "
            >
              Trusted Clients
              <br />
              <span className="text-[#101A26]">
                Testimonial
              </span>
            </h2>

            {/* DESCRIPTION */}

            <p
              className="
                mt-7
                max-w-[500px]
                text-[13px]
                leading-[1.8]
                text-[#4D5863]
                sm:text-[14px]
                lg:max-w-[470px]
              "
            >
              Trusted by manufacturers, logistics companies,
              e-commerce businesses and packaging professionals
              across India.
            </p>

            {/* EXPLORE BUTTON */}

            <button
              type="button"
              className="
                group
                mt-9
                flex
                h-[130px]
                w-[130px]
                flex-col
                items-center
                justify-center
                rounded-full
                border
                border-[#D4A017]/30
                bg-transparent
                text-left
                transition-all
                duration-500
                hover:border-[#D4A017]
                hover:bg-[#D4A017]
              "
            >
              <span
                className="
                  flex
                  items-center
                  gap-3
                  font-[var(--font-outfit)]
                  text-[11px]
                  font-bold
                  uppercase
                  leading-[1.3]
                  tracking-[0.02em]
                  text-[#101A26]
                  transition-colors
                  duration-500
                  group-hover:text-white
                "
              >
                Explore Us
                <ArrowRight
                  size={15}
                  strokeWidth={1.5}
                  className="
                    transition-transform
                    duration-500
                    group-hover:translate-x-1
                  "
                />
              </span>

              <span
                className="
                  mt-1
                  font-[var(--font-outfit)]
                  text-[11px]
                  font-bold
                  uppercase
                  leading-none
                  text-[#101A26]
                  transition-colors
                  duration-500
                  group-hover:text-white
                "
              >
                More
              </span>
            </button>
          </div>

          {/* ==================================================
              RIGHT TESTIMONIAL AREA
          ================================================== */}

          <div
            className="
              relative
              min-h-[500px]
              w-full
              lg:min-h-[520px]
            "
          >
            {/* =================================================
                LEFT NAVIGATION ARROW
            ================================================= */}

            <button
              type="button"
              onClick={previousTestimonial}
              aria-label="Previous testimonial"
              className="
                absolute
                left-0
                top-1/2
                z-40
                hidden
                h-[58px]
                w-[58px]
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                border
                border-[#D4A017]/40
                bg-[#F8F7F3]
                text-[#101A26]
                transition-all
                duration-300
                hover:bg-[#D4A017]
                hover:text-white
                lg:flex
                xl:left-[-15px]
              "
            >
              <ArrowLeft
                size={20}
                strokeWidth={1.5}
              />
            </button>

            {/* =================================================
                RIGHT NAVIGATION ARROW
            ================================================= */}

            <button
              type="button"
              onClick={nextTestimonial}
              aria-label="Next testimonial"
              className="
                absolute
                right-0
                top-1/2
                z-40
                hidden
                h-[58px]
                w-[58px]
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                border
                border-[#D4A017]/40
                bg-[#F8F7F3]
                text-[#101A26]
                transition-all
                duration-300
                hover:bg-[#D4A017]
                hover:text-white
                lg:flex
                xl:right-[-15px]
              "
            >
              <ArrowRight
                size={20}
                strokeWidth={1.5}
              />
            </button>

            {/* =================================================
                BACK CARD
            ================================================= */}

            <div
              className="
                absolute
                right-[7%]
                top-[4%]
                h-[410px]
                w-[78%]
                rotate-[1.5deg]
                border
                border-black/[0.04]
                bg-[#E7E5DE]
                shadow-[0_20px_50px_rgba(0,0,0,0.04)]
                sm:h-[440px]
                lg:right-[8%]
                lg:h-[445px]
                lg:w-[75%]
              "
            />

            {/* =================================================
                MIDDLE CARD
            ================================================= */}

            <div
              className="
                absolute
                right-[4%]
                top-[2%]
                h-[410px]
                w-[78%]
                rotate-[-1deg]
                bg-[#DCDAD3]
                sm:h-[440px]
                lg:right-[5%]
                lg:h-[445px]
                lg:w-[75%]
              "
            />

            {/* =================================================
                MAIN CARD
            ================================================= */}

            <div
              key={activeTestimonial.id}
              className="
                absolute
                right-[2%]
                top-0
                z-20
                flex
                h-[410px]
                w-[78%]
                flex-col
                justify-between
                border
                border-black/[0.06]
                bg-[#FFFFFF]
                p-7
                shadow-[0_25px_70px_rgba(0,0,0,0.09)]
                sm:h-[440px]
                sm:p-8
                lg:right-[3%]
                lg:h-[445px]
                lg:w-[75%]
                lg:p-9
              "
            >
              {/* =================================================
                  CARD TOP
              ================================================= */}

              <div>
                <div
                  className="
                    flex
                    items-start
                    justify-between
                  "
                >
                  {/* QUOTE */}

                  <div
                    className="
                      flex
                      h-[56px]
                      w-[56px]
                      items-center
                      justify-center
                      bg-[#101A26]
                      text-[#D4A017]
                    "
                  >
                    <Quote
                      size={24}
                      strokeWidth={1.5}
                      fill="currentColor"
                    />
                  </div>

                  {/* VERIFIED */}

                  <span
                    className="
                      pt-1
                      text-[9px]
                      font-semibold
                      uppercase
                      tracking-[0.2em]
                      text-black/30
                    "
                  >
                    Verified Client
                  </span>
                </div>

                {/* =================================================
                    RATING
                ================================================= */}

                <div
                  className="
                    mt-6
                    flex
                    items-center
                    gap-1.5
                  "
                >
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={17}
                      fill="#D4A017"
                      strokeWidth={0}
                      className="text-[#D4A017]"
                    />
                  ))}

                  <span
                    className="
                      ml-2
                      text-[12px]
                      font-medium
                      text-black/40
                    "
                  >
                    5.0
                  </span>
                </div>

                {/* =================================================
                    REVIEW
                ================================================= */}

                <p
                  className="
                    mt-7
                    max-w-[620px]
                    font-serif
                    text-[20px]
                    leading-[1.55]
                    tracking-[-0.015em]
                    text-[#18202A]
                    sm:text-[22px]
                    lg:text-[24px]
                  "
                >
                  “{activeTestimonial.text}”
                </p>
              </div>

              {/* =================================================
                  CARD BOTTOM
              ================================================= */}

              <div>
                {/* DIVIDER */}

                <div
                  className="
                    mb-6
                    h-px
                    w-full
                    bg-black/[0.08]
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
                    <div
                      className="
                        flex
                        h-[48px]
                        w-[48px]
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-[#101A26]
                        text-[11px]
                        font-bold
                        tracking-wider
                        text-[#D4A017]
                      "
                    >
                      {activeTestimonial.initials}
                    </div>

                    <div>
                      <h3
                        className="
                          font-[var(--font-outfit)]
                          text-[13px]
                          font-bold
                          text-[#101A26]
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
                          text-[10px]
                          text-black/40
                        "
                      >
                        <MapPin
                          size={11}
                          strokeWidth={1.5}
                        />

                        {activeTestimonial.location}
                      </div>
                    </div>
                  </div>

                  {/* NUMBER */}

                  <span
                    className="
                      text-[11px]
                      font-medium
                      tracking-[0.18em]
                      text-black/25
                    "
                  >
                    0{activeTestimonial.id}
                  </span>
                </div>
              </div>

              {/* GOLD LINE */}

              <div
                className="
                  absolute
                  bottom-0
                  left-0
                  h-[3px]
                  w-full
                  bg-[#D4A017]
                "
              />
            </div>

            {/* =================================================
                MOBILE ARROWS
            ================================================= */}

            <div
              className="
                absolute
                bottom-[-5px]
                left-1/2
                z-50
                flex
                -translate-x-1/2
                items-center
                gap-2
                lg:hidden
              "
            >
              <button
                type="button"
                onClick={previousTestimonial}
                aria-label="Previous testimonial"
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-black/10
                  bg-white
                  text-[#101A26]
                  shadow-sm
                "
              >
                <ArrowLeft
                  size={17}
                  strokeWidth={1.5}
                />
              </button>

              <button
                type="button"
                onClick={nextTestimonial}
                aria-label="Next testimonial"
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-full
                  bg-[#101A26]
                  text-[#D4A017]
                  shadow-sm
                "
              >
                <ArrowRight
                  size={17}
                  strokeWidth={1.5}
                />
              </button>
            </div>

            {/* =================================================
                PAGINATION
            ================================================= */}

            <div
              className="
                absolute
                bottom-[-3px]
                right-[4%]
                z-30
                hidden
                items-center
                gap-3
                lg:flex
              "
            >
              {testimonials.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                  className={`
                    h-[5px]
                    rounded-full
                    transition-all
                    duration-300

                    ${
                      activeIndex === index
                        ? "w-[25px] bg-[#D4A017]"
                        : "w-[15px] bg-black/10 hover:bg-black/20"
                    }
                  `}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ======================================================
            MOBILE PAGINATION
        ====================================================== */}

        <div
          className="
            mt-10
            flex
            items-center
            justify-center
            gap-2
            lg:hidden
          "
        >
          {testimonials.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to testimonial ${index + 1}`}
              className={`
                h-[4px]
                rounded-full
                transition-all
                duration-300

                ${
                  activeIndex === index
                    ? "w-8 bg-[#D4A017]"
                    : "w-3 bg-black/10"
                }
              `}
            />
          ))}
        </div>
      </div>
    </section>
  );
}