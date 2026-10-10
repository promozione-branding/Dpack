"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const clients = [
  {
    name: "Client 01",
    logo: "/7 (10).webp",
  },
  {
    name: "Client 02",
    logo: "/8 (4).webp",
  },
  {
    name: "Client 03",
    logo: "/9 (7).webp"  },
  {
    name: "Client 04",

    logo: "/10 (5).webp",},
  {
    name: "Client 05",
    logo: "/11 (4).webp",},
  {
    name: "Client 06",
    logo: "/12 (6).webp",
    
  },
    {
    name: "Client 06",
    logo: "/12 (6).webp",
  },
     {
    name: "Client 07",
    logo: "/logo (12) (1).webp",
  },
];

/* Duplicate logos for seamless infinite slider */
const duplicatedClients = [...clients, ...clients];

export default function Clientele() {
  return (
    <section className="relative overflow-hidden bg-[#f7f8fa] py-10 md:py-15">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="grid items-center gap-14 lg:grid-cols-[0.8fr_1.5fr] lg:gap-20">

          {/* LEFT CONTENT */}
          <div className="max-w-xl">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-[1px] w-10 bg-black/40" />

              <span className="text-xs font-medium uppercase tracking-[0.22em] text-black/55">
                Our Clientele
              </span>
            </div>

            <h2 className="text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-[#081A33] sm:text-5xl lg:text-6xl">
              Trusted by
              <br />
              <span className="text-[#F5A623]">
                leading brands.
              </span>
            </h2>

      

            <Link
              href="/contact"
              className="group mt-8 inline-flex items-center gap-3 rounded-full bg-[#081A33] px-6 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:bg-[#F5A623]"
            >
              Work With Us

              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight size={15} />
              </span>
            </Link>
          </div>

          {/* RIGHT LOGO AREA */}
          <div className="relative overflow-hidden">

            {/* Fade edges */}
            <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-[#f7f8fa] to-transparent" />

            <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-[#f7f8fa] to-transparent" />

            {/* TOP SLIDER */}
            <div className="overflow-hidden">
              <div className="client-slider flex w-max items-center gap-5 md:gap-6">
                {duplicatedClients.map((client, index) => (
                  <div
                    key={`${client.name}-${index}`}
                    className="flex h-28 w-44 shrink-0 items-center justify-center rounded-2xl border border-black/[0.07] bg-white px-7 shadow-[0_10px_35px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)] sm:h-32 sm:w-52"
                  >
                    <div className="relative h-14 w-full">
                      <Image
                        src={client.logo}
                        alt={client.name}
                        fill
                        sizes="208px"
                        className="object-contain"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SECOND SLIDER */}
            <div className="mt-5 overflow-hidden">
              <div className="client-slider-reverse flex w-max items-center gap-5 md:gap-6">
                {duplicatedClients.map((client, index) => (
                  <div
                    key={`reverse-${client.name}-${index}`}
                    className="flex h-28 w-44 shrink-0 items-center justify-center rounded-2xl border border-black/[0.07] bg-white px-7 shadow-[0_10px_35px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)] sm:h-32 sm:w-52"
                  >
                    <div className="relative h-14 w-full">
                      <Image
                        src={client.logo}
                        alt={client.name}
                        fill
                        sizes="208px"
                        className="object-contain"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .client-slider {
          animation: clientSlide 30s linear infinite;
        }

        .client-slider-reverse {
          animation: clientSlideReverse 34s linear infinite;
        }

        @keyframes clientSlide {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }

        @keyframes clientSlideReverse {
          from {
            transform: translateX(-50%);
          }

          to {
            transform: translateX(0);
          }
        }

        @media (max-width: 767px) {
          .client-slider {
            animation-duration: 40s;
          }

          .client-slider-reverse {
            animation-duration: 44s;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .client-slider,
          .client-slider-reverse {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
