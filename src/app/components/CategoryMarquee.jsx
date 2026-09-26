"use client";

import { ArrowUpRight } from "lucide-react";

const categories = [
  "Dunnage Air Bags",
  "Air Column Bags",
  "Air Column Rolls",
  "Packaging Air Bags",
  "Gap Fillers",
  "PP Dunnage Bags",
  "Heavy Duty Dunnage Bags",
  "Protective Packaging",
];

export default function CategoryMarquee() {
  return (
    <section className="w-full overflow-hidden border-y border-[#E5E5E5] bg-white">
      <div className="relative flex h-[82px] items-center overflow-hidden">

        {/* LEFT FADE */}
        <div className="
          pointer-events-none
          absolute
          left-0
          top-0
          z-10
          h-full
          w-16
          bg-gradient-to-r
          from-white
          to-transparent
        " />

        {/* RIGHT FADE */}
        <div className="
          pointer-events-none
          absolute
          right-0
          top-0
          z-10
          h-full
          w-16
          bg-gradient-to-l
          from-white
          to-transparent
        " />

        {/* MOVING TRACK */}
        <div className="flex w-max animate-marquee">

          {/* FIRST SET */}
          <div className="flex shrink-0 items-center">

            {categories.map((category, index) => (
              <div
                key={`first-${index}`}
                className="
                  flex
                  shrink-0
                  items-center
                "
              >

                <span
                  className="
                    whitespace-nowrap
                    font-outfit
                    text-[28px]
                    font-medium
                    uppercase
                    tracking-[-0.035em]
                    text-[#171717]

                    sm:text-[32px]
                    lg:text-[36px]
                  "
                >
                  {category}
                </span>

                {/* SEPARATOR */}

                <span className="
                  mx-7
                  flex
                  h-[24px]
                  w-[24px]
                  shrink-0
                  items-center
                  justify-center

                  sm:mx-9
                ">
                  <ArrowUpRight
                    size={19}
                    strokeWidth={1.7}
                    className="text-[#D95026]"
                  />
                </span>

              </div>
            ))}

          </div>

          {/* SECOND SET
              Exact duplicate makes the animation seamless
          */}

          <div className="flex shrink-0 items-center">

            {categories.map((category, index) => (
              <div
                key={`second-${index}`}
                className="
                  flex
                  shrink-0
                  items-center
                "
              >

                <span
                  className="
                    whitespace-nowrap
                    font-outfit
                    text-[28px]
                    font-medium
                    uppercase
                    tracking-[-0.035em]
                    text-[#171717]

                    sm:text-[32px]
                    lg:text-[36px]
                  "
                >
                  {category}
                </span>

                <span className="
                  mx-7
                  flex
                  h-[24px]
                  w-[24px]
                  shrink-0
                  items-center
                  justify-center

                  sm:mx-9
                ">
                  <ArrowUpRight
                    size={19}
                    strokeWidth={1.7}
                    className="text-[#D95026]"
                  />
                </span>

              </div>
            ))}

          </div>

        </div>
      </div>

      {/* =====================================================
          MARQUEE ANIMATION
      ===================================================== */}

      <style jsx>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          animation: marquee 35s linear infinite;
          will-change: transform;
        }

        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}