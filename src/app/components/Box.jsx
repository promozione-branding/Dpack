"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const banners = [
  {
    id: 1,
    title: "Bulk Packaging",
    highlight: "Solutions",
    description:
      "Customized sizes, bulk quantities and business pricing for your packaging needs.",
    button: "Request Bulk Quote",
    link: "/contact",
    image: "https://packingairbag.com/cat/1.webp",
    bg: "#E9B95F",
    imagePosition: "right",
  },
  {
    id: 2,
    title: "Protect Every",
    highlight: "Shipment",
    description:
      "Reliable air packaging solutions designed to keep your products protected in transit.",
    button: "Explore Products",
    link: "/products",
    image: "https://packingairbag.com/cat/5.webp",
    bg: "#B8C9DE",
    imagePosition: "right",
  },
];

export default function Box() {
  return (
    <section className="w-full bg-[#F7F2EB] py-8 sm:py-10 lg:py-12">
      <div className="mx-auto max-w-[1450px] px-4 sm:px-6 lg:px-8">

        <div className="grid gap-4 lg:grid-cols-2">

          {banners.map((banner) => (
            <Link
              key={banner.id}
              href={banner.link}
              className="
                group
                relative
                block
                min-h-[230px]
                overflow-hidden
                rounded-[18px]
                sm:min-h-[260px]
                lg:min-h-[280px]
              "
              style={{
                backgroundColor: banner.bg,
              }}
            >

              {/* ==================================================
                  BACKGROUND DECORATION
              ================================================== */}

              <div
                className="
                  pointer-events-none
                  absolute
                  -right-16
                  -top-16
                  h-52
                  w-52
                  rounded-full
                  bg-white/10
                  blur-2xl
                "
              />

              <div
                className="
                  pointer-events-none
                  absolute
                  bottom-[-80px]
                  right-[25%]
                  h-48
                  w-48
                  rounded-full
                  bg-white/10
                  blur-3xl
                "
              />

              {/* ==================================================
                  CONTENT
              ================================================== */}

              <div
                className="
                  relative
                  z-20
                  flex
                  h-full
                  min-h-[230px]
                  w-[58%]
                  flex-col
                  justify-center
                  px-6
                  py-7
                  sm:min-h-[260px]
                  sm:px-8
                  lg:min-h-[280px]
                  lg:w-[58%]
                  lg:px-9
                "
              >

                {/* SMALL LABEL */}

                <div
                  className="
                    mb-3
                    flex
                    items-center
                    gap-2
                  "
                >
                  <span className="h-[2px] w-5 bg-black/50" />

                  <span
                    className="
                      text-[8px]
                      font-bold
                      uppercase
                      tracking-[0.2em]
                      text-black/55
                    "
                  >
                    DPACK
                  </span>
                </div>

                {/* TITLE */}

                <h2
                  className="
                    max-w-[310px]
                    text-[27px]
                    font-black
                    leading-[0.95]
                    tracking-[-0.045em]
                    text-[#171918]
                    sm:text-[31px]
                    lg:text-[34px]
                  "
                >
                  {banner.title}

                  <br />

                  <span className="text-black/65">
                    {banner.highlight}
                  </span>
                </h2>

                {/* DESCRIPTION */}

                <p
                  className="
                    mt-3
                    max-w-[300px]
                    text-[10px]
                    font-medium
                    leading-[1.55]
                    text-black/60
                    sm:text-[11px]
                  "
                >
                  {banner.description}
                </p>

                {/* CTA */}

                <div className="mt-5">

                  <span
                    className="
                      inline-flex
                      items-center
                      gap-3
                      rounded-[7px]
                      bg-[#171918]
                      px-4
                      py-2.5
                      text-[8px]
                      font-bold
                      uppercase
                      tracking-[0.1em]
                      text-white
                      transition-all
                      duration-300
                      group-hover:gap-4
                      group-hover:bg-[#8B9A6E]
                    "
                  >
                    {banner.button}

                    <ArrowRight
                      size={13}
                      strokeWidth={2}
                    />
                  </span>

                </div>

              </div>

              {/* ==================================================
                  IMAGE AREA
              ================================================== */}

              <div
                className="
                  absolute
                  bottom-0
                  right-0
                  top-0
                  z-10
                  w-[48%]
                  overflow-hidden
                "
              >

                {/* Soft image fade */}

                <div
                  className="
                    absolute
                    inset-y-0
                    left-0
                    z-20
                    w-24
                    bg-gradient-to-r
                    from-transparent
                    to-transparent
                    lg:w-32
                  "
                />

                <Image
                  src={banner.image}
                  alt={banner.title}
                  fill
                  unoptimized
                  sizes="500px"
                  className="
                    object-contain
                    object-right
                    p-2
                    transition-transform
                    duration-700
                    group-hover:scale-105
                  "
                />

              </div>

              {/* ==================================================
                  NUMBER
              ================================================== */}

              <span
                className="
                  absolute
                  bottom-4
                  right-5
                  z-30
                  text-[8px]
                  font-bold
                  tracking-[0.15em]
                  text-black/20
                "
              >
                0{banner.id}
              </span>

            </Link>
          ))}

        </div>
      </div>
    </section>
  );
}