"use client";

import Link from "next/link";

const categories = [
  {
    name: "DUNNAGE BAG",
    href: "https://packingairbag.com/categories/dunnage-bag",
    color: "white",
  },
  {
    name: "AIR COLUMN ROLL",
    href: "https://packingairbag.com/categories/air-column-roll",
    color: "gradient",
  },
  {
    name: "AIR COLUMN BAG",
    href: "https://packingairbag.com/categories/air-column-bag",
    color: "white",
  },
  {
    name: "PACKAGING AIR BAG",
    href: "https://packingairbag.com/categories/packaging-air-bag",
    color: "gradient",
  },
  {
    name: "GAP FILLER",
    href: "https://packingairbag.com/categories/gap-filler",
    color: "white",
  },
];

export default function Marquee() {
  // Duplicate for seamless infinite scrolling
  const marqueeItems = [...categories, ...categories];

  return (
    <section className="w-full overflow-hidden bg-black">
      <div
        className="
          relative
          flex
          h-[76px]
          items-center
          overflow-hidden
          sm:h-[82px]
          md:h-[88px]
          lg:h-[94px]
        "
      >
        <div
          className="dpack-marquee-track flex w-max items-center"
          style={{
            animation: "dpackMarquee 32s linear infinite",
            willChange: "transform",
          }}
        >
          {marqueeItems.map((category, index) => (
            <div
              key={`${category.name}-${index}`}
              className="flex shrink-0 items-center"
            >
              <Link
                href={category.href}
                target="_self"
                className="group flex items-center"
              >
                <span
                  className={[
                    "whitespace-nowrap",
                    "text-[25px]",
                    "font-bold",
                    "uppercase",
                    "leading-none",
                    "tracking-[-0.035em]",
                    "transition-opacity",
                    "duration-200",
                    "sm:text-[29px]",
                    "md:text-[34px]",
                    "lg:text-[40px]",
                    "xl:text-[46px]",
                    category.color === "gradient"
                      ? [
                          "bg-gradient-to-r",
                          "from-[#a83cff]",
                          "via-[#ef4c9b]",
                          "to-[#ff7a18]",
                          "bg-clip-text",
                          "text-transparent",
                        ].join(" ")
                      : "text-white",
                    "group-hover:opacity-75",
                  ].join(" ")}
                >
                  {category.name}
                </span>
              </Link>

              {/* Star Separator */}

              <span
                className="
                  mx-[20px]
                  flex
                  shrink-0
                  items-center
                  justify-center
                  text-[23px]
                  leading-none
                  text-white

                  sm:mx-[25px]
                  sm:text-[27px]

                  md:mx-[30px]
                  md:text-[31px]

                  lg:mx-[38px]
                  lg:text-[35px]
                "
              >
                ✦
              </span>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}