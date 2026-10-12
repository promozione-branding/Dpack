"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const featuredProducts = [
  {
    name: "Dunnage Air Bags",
    slug: "dunnage-air-bags",
    description:
      "Heavy-duty inflatable protection designed to stabilize and secure cargo during transportation.",
    image: "/Dunnage.webp",
    large: true,
  },
  {
    name: "Air Pillow Bags",
    slug: "air-pillow-bags",
    description: "Lightweight cushioning for safe and efficient product protection.",
    image: "/Air pillow bag.webp",
  },
  {
    name: "Air Cushion Bags",
    slug: "air-cushion-bags",
    description: "Flexible air-filled packaging for shock and impact protection.",
    image: "/Air cushion bag.webp",
  },
  {
    name: "Gap Fillers",
    slug: "gap-fillers",
    description: "Prevent product movement and fill empty spaces inside cartons.",
    image: "/Gap filler (3).webp",
  },
  {
    name: "Shredder Machine",
    slug: "shredder-machine",
    description: "Efficient packaging material processing for modern operations.",
    image: "/Shredder machine.webp",
  },
];

export default function Highlight() {
  return (
    <section className="bg-[#F7F8FA] py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

        {/* Heading */}
        <div className="mb-12 flex flex-col gap-6 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-[#F5A623]">
              Featured Products
            </p>

            <h2 className="text-3xl font-bold leading-tight tracking-tight text-[#081A33] sm:text-4xl lg:text-5xl">
              Protective packaging built for
              <span className="block">safer transportation.</span>
            </h2>
          </div>

          <p className="max-w-md text-sm leading-7 text-slate-600 sm:text-base">
            Explore our range of inflatable and protective packaging solutions
            designed to reduce transit damage and keep products secure.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid gap-5 lg:grid-cols-2">

          {/* Large Product */}
          <Link
            href={`/products/${featuredProducts[0].slug}`}
            className="group relative min-h-[500px] overflow-hidden rounded-[28px] bg-[#081A33] sm:min-h-[580px]"
          >
            <div className="absolute inset-0">
              <Image
                src={featuredProducts[0].image}
                alt={featuredProducts[0].name}
                fill
                className="object-contain p-8 transition duration-700 group-hover:scale-105 sm:p-12"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#081A33] via-[#081A33]/80 to-transparent p-7 pt-32 sm:p-9 sm:pt-40">
              <div className="flex items-end justify-between gap-5">
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#F5A623]">
                    Heavy Duty Protection
                  </p>

                  <h3 className="text-2xl font-bold text-white sm:text-3xl">
                    {featuredProducts[0].name}
                  </h3>

                  <p className="mt-3 max-w-lg text-sm leading-6 text-white/70">
                    {featuredProducts[0].description}
                  </p>
                </div>

                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F5A623] text-[#081A33] transition duration-300 group-hover:rotate-45">
                  <ArrowUpRight size={21} />
                </span>
              </div>
            </div>
          </Link>

          {/* Four Smaller Products */}
          <div className="grid gap-5 sm:grid-cols-2">
            {featuredProducts.slice(1).map((product) => (
              <Link
                key={product.name}
                href={`/products/${product.slug}`}
                className="group relative overflow-hidden rounded-[28px] border border-slate-200 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-6"
              >
                <div className="relative h-[190px] overflow-hidden rounded-2xl bg-[#F4F7F9]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-5 transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 25vw"
                  />

                  <span className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#081A33] text-white transition duration-300 group-hover:bg-[#F5A623] group-hover:text-[#081A33]">
                    <ArrowUpRight size={17} />
                  </span>
                </div>

                <div className="pt-5">
                  <h3 className="text-lg font-bold text-[#081A33]">
                    {product.name}
                  </h3>

                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
                    {product.description}
                  </p>

                  <div className="mt-4 text-sm font-bold text-[#F5A623]">
                    Explore Product →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-full bg-[#081A33] px-7 py-3.5 text-sm font-bold text-white transition hover:bg-[#F5A623] hover:text-[#081A33]"
          >
            View All Products
            <ArrowUpRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}
