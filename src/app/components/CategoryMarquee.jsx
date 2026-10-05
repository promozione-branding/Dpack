"use client";

import {
  ArrowUpRight,
  Package,
  Box,
  Layers,
  ShieldCheck,
  Wind,
  Archive,
  Truck,
  CircleDot,
} from "lucide-react";

/* =========================================================
   CATEGORY DATA
========================================================= */

const categories = [
  {
    name: "Dunnage Air Bags",
    icon: Wind,
  },
  {
    name: "Air Column Bags",
    icon: Package,
  },
  {
    name: "Air Column Rolls",
    icon: Layers,
  },
  {
    name: "Packaging Air Bags",
    icon: Box,
  },
  {
    name: "Gap Fillers",
    icon: Archive,
  },
  {
    name: "PP Dunnage Bags",
    icon: ShieldCheck,
  },
  {
    name: "Heavy Duty Dunnage Bags",
    icon: Truck,
  },
  {
    name: "Protective Packaging",
    icon: CircleDot,
  },
];

/* =========================================================
   SINGLE CATEGORY ITEM
========================================================= */

function CategoryItem({ category }) {
  const Icon = category.icon;

  return (
    <div className="flex shrink-0 items-center">

      {/* ICON */}

      <span
        className="
          flex
          h-9
          w-9
          shrink-0
          items-center
          justify-center
          rounded-full
          border
          border-[#062033]/10
          bg-[#F7F5F0]
          text-[#062033]
          transition-all
          duration-300
          hover:border-[#F5A623]
          hover:bg-[#F5A623]
          hover:text-white
        "
      >
        <Icon
          size={16}
          strokeWidth={1.7}
        />
      </span>

      {/* TEXT */}

      <span
        className="
          ml-3
          whitespace-nowrap
          font-outfit
          text-[16px]
          font-medium
          uppercase
          tracking-[-0.015em]
          text-[#171717]

          sm:text-[17px]
          lg:text-[18px]
        "
      >
        {category.name}
      </span>

      {/* ARROW */}

      <span
        className="
          mx-7
          flex
          h-6
          w-6
          shrink-0
          items-center
          justify-center

          sm:mx-8
        "
      >
        <ArrowUpRight
          size={16}
          strokeWidth={1.7}
          className="text-[#F5A623]"
        />
      </span>

    </div>
  );
}

/* =========================================================
   COMPONENT
========================================================= */

export default function CategoryMarquee() {
  return (
    <section className="w-full overflow-hidden border-y border-[#E5E5E5] bg-white">

      <div className="relative flex h-[70px] items-center overflow-hidden">

        {/* =================================================
            LEFT FADE
        ================================================= */}

        <div
          className="
            pointer-events-none
            absolute
            left-0
            top-0
            z-10
            h-full
            w-14
            bg-gradient-to-r
            from-white
            to-transparent
          "
        />

        {/* =================================================
            RIGHT FADE
        ================================================= */}

        <div
          className="
            pointer-events-none
            absolute
            right-0
            top-0
            z-10
            h-full
            w-14
            bg-gradient-to-l
            from-white
            to-transparent
          "
        />

        {/* =================================================
            MOVING TRACK
        ================================================= */}

        <div className="dpack-marquee-track flex w-max">

          {/* FIRST SET */}

          <div className="flex shrink-0 items-center">

            {categories.map((category, index) => (
              <CategoryItem
                key={`first-${index}`}
                category={category}
              />
            ))}

          </div>

          {/* SECOND SET */}

          <div className="flex shrink-0 items-center">

            {categories.map((category, index) => (
              <CategoryItem
                key={`second-${index}`}
                category={category}
              />
            ))}

          </div>

        </div>

      </div>

    </section>
  );
}