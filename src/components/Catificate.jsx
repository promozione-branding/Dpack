"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  ShieldCheck,
  ShoppingBag,
  ExternalLink,
  X,
  Maximize2,
  Download,
} from "lucide-react";

const certificates = [
  {
    title: "ISO Certificate",
    image: "/58934_DPACK_9001.pdf",
    type: "pdf",
  },
  {
    title: "GEM Registered",
    image: "/gem (1).webp",
    type: "image",
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
    name: "Moglix",
    subtitle: "Explore our products",
    initials: "M",
    color: "#F5A623",
    href: "https://supplier.moglix.com/",
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
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  useEffect(() => {
    if (!selectedCertificate) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setSelectedCertificate(null);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [selectedCertificate]);

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
              {certificates.map((certificate) => (
                <button
                  type="button"
                  key={certificate.title}
                  onClick={() => setSelectedCertificate(certificate)}
                  className="group cursor-pointer overflow-hidden border border-white/10 bg-[#0C2342] text-left transition-all duration-300 hover:border-[#F5A623]/60"
                >
                  {/* Certificate Preview */}
                  <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-[#F7F8FA]">

                    {certificate.type === "pdf" ? (
                      <div className="flex h-full w-full items-center justify-center overflow-hidden bg-white">
                        <iframe
                          src={`${certificate.image}#toolbar=0&navpanes=0&scrollbar=0&view=Fit`}
                          title={certificate.title}
                          className="pointer-events-none h-full aspect-[210/297] max-w-full border-0 bg-white"
                          tabIndex={-1}
                          loading="lazy"
                        />
                      </div>
                    ) : (
                      <Image
                        src={certificate.image}
                        alt={certificate.title}
                        fill
                        sizes="(max-width: 639px) 100vw, 25vw"
                        className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                      />
                    )}

                    {/* Certificate Badge */}
                    <span className="absolute left-3 top-3 z-10 bg-[#081A33] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                      Certificate
                    </span>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#081A33]/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#081A33]">
                        <Maximize2 size={21} />
                      </div>
                    </div>

                    {/* Expand Icon */}
                    <div className="absolute bottom-3 right-3 z-20 flex h-9 w-9 items-center justify-center bg-[#081A33] text-white">
                      <Maximize2 size={16} />
                    </div>
                  </div>

                  {/* Certificate Details */}
                  <div className="flex items-center justify-between gap-3 p-4 sm:p-5">
                    <div>
                      <h4 className="text-base font-bold sm:text-lg">
                        {certificate.title}
                      </h4>

                      <p className="mt-1 text-xs text-slate-400">
                        Click to view certificate
                      </p>
                    </div>

                    <ArrowUpRight
                      size={20}
                      className="shrink-0 text-[#F5A623] transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                    />
                  </div>
                </button>
              ))}
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

      {/* Certificate Modal */}
      {selectedCertificate && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-3 backdrop-blur-sm sm:p-6"
          onClick={() => setSelectedCertificate(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="certificate-modal-title"
            onClick={(e) => e.stopPropagation()}
            className="flex h-[90dvh] w-full max-w-5xl flex-col overflow-hidden rounded-xl border border-white/10 bg-[#081A33] shadow-2xl"
          >
            {/* Modal Header */}
            <div className="flex shrink-0 items-center justify-between gap-3 border-b border-white/10 px-4 py-4 sm:px-6">
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#F5A623]">
                  Our Credentials
                </p>

                <h3
                  id="certificate-modal-title"
                  className="mt-1 truncate text-base font-bold text-white sm:text-xl"
                >
                  {selectedCertificate.title}
                </h3>
              </div>

              <div className="flex shrink-0 items-center gap-2">

                {/* Download Certificate */}
                <a
                  href={selectedCertificate.image}
                  download
                  title="Download certificate"
                  aria-label="Download certificate"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white transition-colors hover:bg-white/10"
                >
                  <Download size={19} />
                </a>

                {/* Open in New Tab */}
                <a
                  href={selectedCertificate.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Open in new tab"
                  aria-label="Open in new tab"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white transition-colors hover:bg-white/10"
                >
                  <ExternalLink size={19} />
                </a>

                {/* Close Modal */}
                <button
                  type="button"
                  onClick={() => setSelectedCertificate(null)}
                  aria-label="Close certificate"
                  className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg bg-[#F5A623] text-[#081A33] transition-colors hover:bg-white"
                >
                  <X size={22} />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="relative min-h-0 flex-1 overflow-hidden bg-[#F7F8FA]">
              {selectedCertificate.type === "pdf" ? (
                <iframe
                  src={`${selectedCertificate.image}#view=FitH`}
                  title={selectedCertificate.title}
                  className="h-full w-full border-0"
                />
              ) : (
                <Image
                  src={selectedCertificate.image}
                  alt={selectedCertificate.title}
                  fill
                  sizes="100vw"
                  className="object-contain p-4 sm:p-6"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
