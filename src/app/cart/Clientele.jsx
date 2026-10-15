"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const clients = [
  { name: "Client 01", logo: "/7 (10).webp" },
  { name: "Client 02", logo: "/8 (4).webp" },
  { name: "Client 03", logo: "/9 (7).webp" },
  { name: "Client 04", logo: "/10 (5).webp" },
  { name: "Client 05", logo: "/11 (4).webp" },
  { name: "Client 06", logo: "/12 (6).webp" },
  { name: "Client 07", logo: "/logo (12) (1).webp" },
];

const duplicatedClients = [...clients, ...clients];

export default function Clientele() {
  return (
    <section className="relative overflow-hidden bg-[#f7f8fa] py-14 sm:py-10 md:py-15">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8 lg:px-12">

        {/* CENTER TITLE */}
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-black/40" />
            <span className="text-xs font-medium uppercase tracking-[0.22em] text-black/55">
              Our Clientele
            </span>
            <span className="h-px w-10 bg-black/40" />
          </div>

          <h2 className="text-3xl font-semibold leading-tight tracking-[-0.04em] text-[#081A33] sm:text-5xl lg:text-6xl">
            Trusted by{" "}
            <span className="text-[#F5A623]">
              leading brands.
            </span>
        </h2>

        
        </div>

        {/* CENTERED BRAND SLIDERS */}
        <div className="relative mx-auto max-w-[1200px]">

          {/* Left fade */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-[#f7f8fa] to-transparent sm:w-20" />

          {/* Right fade */}
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-[#f7f8fa] to-transparent sm:w-20" />

          {/* FIRST ROW */}
          <div className="overflow-hidden">
            <div className="client-slider flex w-max items-center gap-4 sm:gap-6">
              {duplicatedClients.map((client, index) => (
                <div
                  key={`top-${client.name}-${index}`}
                  className="flex h-24 w-36 shrink-0 items-center justify-center rounded-2xl border border-black/[0.07] bg-white px-5 shadow-[0_8px_28px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.09)] sm:h-32 sm:w-52 sm:px-7"
                >
                  <div className="relative h-12 w-full sm:h-16">
                    <Image
                      src={client.logo}
                      alt={client.name}
                      fill
                      sizes="(max-width: 640px) 144px, 208px"
                      className="object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .client-slider {
          animation: clientSlide 32s linear infinite;
        }

        .client-slider-reverse {
          animation: clientSlideReverse 36s linear infinite;
        }

        .client-slider:hover,
        .client-slider-reverse:hover {
          animation-play-state: paused;
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
            animation-duration: 35s;
          }

          .client-slider-reverse {
            animation-duration: 39s;
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
