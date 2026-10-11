
"use client";

import Image from "next/image";
import {
  ArrowUpRight,
  BadgeCheck,
  Award,
  ShieldCheck,
  ShoppingBag,
  ExternalLink,
  Building2,
} from "lucide-react";

const certificates = [
  {
 
    title: "ISRO Certif",
    image: "/gem (1).webp",

  },
  {
  
    title: "GeM Registered",
    image: "/iso.webp",
  },
];

const marketplaces = [
  {
    name: "Amazon",
    subtitle: "Shop on Amazon",
    initials: "a",
    color: "#F59E0B",
    href: "https://www.amazon.in/",
  },
  {
    name: "Moblix",
    subtitle: "Explore our products",
    initials: "M",
    color: "#F5A623",
    href: "#",
  },
  {
    name: "Toolsvilla",
    subtitle: "Find us on Toolsvilla",
    initials: "T",
    color: "#F97316",
    href: "https://www.toolsvilla.com/",
  },
  {
    name: "IndustryBuying",
    subtitle: "Shop industrial products",
    initials: "IB",
    color: "#2563EB",
    href: "https://www.industrybuying.com/",
  },
];

export default function Cartificat() {
  return (
    <section className="relative overflow-hidden bg-[#081A33] py-11 text-white sm:py-10 lg:py-15">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-[#F5A623]/10 blur-[100px]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-blue-500/10 blur-[110px]" />

      <div className="relative mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-8">
        {/* Section heading */}


        {/* Main two-column layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          {/* LEFT: Certifications */}
          <div className="border border-white/10 bg-white/[0.035] p-4 sm:p-6 lg:p-7">
            <div className="mb-6 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#F5A623]">
                  Our Credentials
                </p>
                <h3 className="mt-2 text-xl font-bold sm:text-2xl">
                  Certifications & Registration
                </h3>
              </div>

              <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#F5A623]/30 bg-[#F5A623]/10 text-[#F5A623]">
                <ShieldCheck size={23} />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {certificates.map((certificate) => {
              

                return (
                  <article
                    key={certificate.title}
                    className="group overflow-hidden border border-white/10 bg-[#0C2342] transition-colors duration-300 hover:border-[#F5A623]/60"
                  >
                    {/* Certificate preview */}
                    <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-[#F7F8FA] p-3">
                      <Image
                        src={certificate.image}
                        alt={certificate.title}
                        fill
                        sizes="(max-width: 639px) 100vw, (max-width: 1023px) 45vw, 25vw"
                        className="object-contain p-3 transition-transform duration-500 group-hover:scale-[1.03]"
                      />

                      <span className="absolute left-3 top-3 z-10 bg-[#081A33] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                        Certificate
                      </span>
                    </div>

                    <div className="p-4 sm:p-5">
                      <div className="mb-3 flex items-center gap-2">
                    
                        <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                          {certificate.number} 
                        </span>
                      </div>

                      <h4 className="text-lg font-bold">
                        {certificate.title}
                      </h4>

                      <p className="mt-2 text-xs leading-6 text-slate-400 sm:text-sm">
                        {certificate.description}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>

    
          </div>

          {/* RIGHT: Marketplaces */}
          <div className="border border-white/10 bg-white/[0.035] p-4 sm:p-6 lg:p-7">
            <div className="mb-6 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#F5A623]">
                  Shop Our Products
                </p>
                <h3 className="mt-2 text-xl font-bold sm:text-2xl">
                  Available On
                </h3>
              </div>

              <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#F5A623]/30 bg-[#F5A623]/10 text-[#F5A623]">
                <ShoppingBag size={22} />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {marketplaces.map((marketplace, index) => (
                <a
                  key={marketplace.name}
                  href={marketplace.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-[108px] items-center gap-3 border border-white/10 bg-[#0C2342] p-4 transition-all duration-300 hover:border-[#F5A623]/60 hover:bg-[#102B4D]"
                >
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center text-lg font-extrabold"
                    style={{
                      color: marketplace.color,
                      backgroundColor: `${marketplace.color}18`,
                    }}
                  >
                    {marketplace.initials}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-bold leading-5 sm:text-base">
                      {marketplace.name}
                    </h4>
                    <p className="mt-1 text-[11px] leading-5 text-slate-400 sm:text-xs">
                      {marketplace.subtitle}
                    </p>
                  </div>

                  <ArrowUpRight
                    size={18}
                    className="shrink-0 text-slate-500 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#F5A623]"
                  />
                </a>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
