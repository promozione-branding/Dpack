import Link from "next/link";
import {
  ArrowUpRight,
  ShieldCheck,
  PackageCheck,
  Truck,
  CheckCircle2,
} from "lucide-react";

export default function Importers() {
  const products = [
    "Air Cushion Bags",
    "Dunnage Air Bags",
    "Air Column Bags",
    "Air Tube Bag Packaging",
    "Air Column Packaging Rolls",
  ];



  return (
    <section className="relative overflow-hidden bg-[#F7F8FA] py-16 sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#F5A623]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

          {/* Left Content */}
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#F5A623]/40 bg-[#F5A623]/10 px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-[#F5A623]" />
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#9A5B00] sm:text-sm">
                Protective Packaging Solutions
              </span>
            </div>

            <h2 className="max-w-2xl text-3xl font-extrabold leading-tight tracking-tight text-[#081A33] sm:text-4xl lg:text-5xl">
              Inflatable Packaging{" "}
              <span className="text-[#D98708]">
                Manufacturer and Importer
              </span>
            </h2>

            <p className="mt-6 text-base leading-8 text-slate-700 sm:text-lg">
              D Pack is a trusted Inflatable Packaging Manufacturer and
              Importer, specializing in high-quality protective packaging
              solutions for safe shipping and transportation.
            </p>

            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
              Our product range includes Air Cushion Bags, Dunnage Air Bags,
              Air Column Bags, and Air Tube Bag Packaging, designed to help
              protect products from shocks and transit damage.
            </p>

            <h3 className="mt-7 text-sm font-bold uppercase tracking-wider text-[#081A33]">
              Our Packaging Solutions
            </h3>

            <div className="mt-4 flex flex-wrap gap-2.5">
              {products.map((product) => (
                <span
                  key={product}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 shadow-sm transition-all hover:border-[#F5A623]"
                >
                  <CheckCircle2
                    size={15}
                    className="shrink-0 text-[#D98708]"
                  />
                  {product}
                </span>
              ))}
            </div>

            <p className="mt-7 text-sm leading-7 text-slate-600 sm:text-base">
              As an Air Cushion Bag Manufacturer and Dunnage Bag Manufacturer,
              we offer reliable Air Column Packaging Rolls and Inflatable Air
              Column Bags for efficient, durable, and cost-effective product
              protection.
            </p>

        
          </div>

          {/* Right Image Area */}
          <div className="relative">
            <div className="absolute -inset-3 rounded-3xl border border-[#F5A623]/30" />

            <div className="relative flex min-h-[320px] items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_15px_50px_rgba(8,26,51,0.08)] sm:min-h-[420px] sm:p-8 lg:min-h-[500px]">


                <img
                  src="/images/inflatable-packaging.webp"
                  alt="D Pack inflatable packaging products"
                  className="h-full w-full object-contain"
                />
              

            
              <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-slate-200 bg-white/95 p-4 shadow-lg sm:bottom-6 sm:left-6 sm:right-6">
                <p className="text-xs font-bold uppercase tracking-wider text-[#B87508]">
                  D Pack
                </p>
                <p className="mt-1 text-sm font-bold text-[#081A33] sm:text-base">
                  Smart Protection for Safer Shipping
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
