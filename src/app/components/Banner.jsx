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
    bg: "#DDD9D0",
  },
];

export default function PromoBanners() {
  return (
    <section className="w-full bg-[#F1F0EC] py-10 sm:py-12 lg:py-14">
      <div className="mx-auto max-w-[1450px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-2">
          {banners.map((banner) => (
            <Link
              key={banner.id}
              href={banner.link}
              className="
                group
                relative
                block
                min-h-[245px]
                overflow-hidden
                rounded-[20px]
                border
                border-black/[0.08]
                shadow-[0_10px_35px_rgba(0,0,0,0.06)]
                transition-all
                duration-500
                hover:-translate-y-1
                hover:shadow-[0_18px_45px_rgba(0,0,0,0.10)]
                sm:min-h-[270px]
                lg:min-h-[290px]
              "
              style={{
                backgroundColor: banner.bg,
              }}
            >
              {/* ==================================================
                  SUBTLE BACKGROUND SHAPE
              ================================================== */}

              <div
                className="
                  pointer-events-none
                  absolute
                  -right-20
                  -top-20
                  h-64
                  w-64
                  rounded-full
                  border
                  border-white/20
                "
              />

              <div
                className="
                  pointer-events-none
                  absolute
                  -bottom-24
                  right-[25%]
                  h-52
                  w-52
                  rounded-full
                  bg-white/[0.10]
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
                  min-h-[245px]
                  w-[60%]
                  flex-col
                  justify-center
                  px-6
                  py-7
                  sm:min-h-[270px]
                  sm:px-8
                  lg:min-h-[290px]
                  lg:w-[58%]
                  lg:px-10
                "
              >
                {/* LABEL */}

                <div className="mb-3 flex items-center gap-2">
                  <span className="h-[2px] w-6 bg-[#171717]" />

                  <span
                    className="
                      text-[8px]
                      font-bold
                      uppercase
                      tracking-[0.24em]
                      text-[#171717]
                    "
                  >
                    DPACK
                  </span>
                </div>

                {/* TITLE */}

                <h2
                  className="
                    max-w-[330px]
                    text-[29px]
                    font-bold
                    leading-[0.95]
                    tracking-[-0.05em]
                    text-[#171717]
                    sm:text-[33px]
                    lg:text-[36px]
                  "
                >
                  {banner.title}

                  <br />

                  <span className="text-[#171717]/55">
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
                    leading-[1.6]
                    text-[#171717]/65
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
                      bg-[#171717]
                      px-5
                      py-3
                      text-[8px]
                      font-bold
                      uppercase
                      tracking-[0.12em]
                      text-white
                      shadow-[0_6px_18px_rgba(0,0,0,0.15)]
                      transition-all
                      duration-300
                      group-hover:gap-4
                      group-hover:bg-[#2B2B2B]
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
                  IMAGE
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
                {/* Image fade */}

                <div
                  className="
                    pointer-events-none
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
                    ease-out
                    group-hover:scale-[1.06]
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
                  text-[#171717]/25
                "
              >
                0{banner.id}
              </span>

              {/* ==================================================
                  INNER BORDER
              ================================================== */}

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-2
                  z-30
                  rounded-[17px]
                  border
                  border-black/[0.04]
                  transition-all
                  duration-500
                  group-hover:border-black/[0.10]
                "
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}