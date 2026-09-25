"use client";

import React, { useState } from "react";

const productImages = [
  "https://images.unsplash.com/photo-1519314069741-9f69a9daddfa?auto=format&fit=crop&q=85&w=1400",
  "https://images.unsplash.com/photo-1675301590589-c56007c935d4?auto=format&fit=crop&q=85&w=1400",
  "https://images.unsplash.com/photo-1727622738048-29e6f37b2a8c?auto=format&fit=crop&q=85&w=1400",
  "https://images.unsplash.com/photo-1675301590589-c56007c935d4?auto=format&fit=crop&q=85&w=1000",
];

const colors = [
  {
    name: "Racing Red",
    value: "#C62828",
  },
  {
    name: "Stealth Black",
    value: "#171717",
  },
  {
    name: "Electric Blue",
    value: "#2563EB",
  },
  {
    name: "Neon Green",
    value: "#65A30D",
  },
];

const relatedProducts = [
  {
    name: "Mini Racing RC Car",
    category: "2.4GHz Remote Control",
    price: "₹1,499",
    image:
      "https://images.unsplash.com/photo-1519314069741-9f69a9daddfa?auto=format&fit=crop&q=80&w=700",
  },
  {
    name: "4WD Rock Crawler",
    category: "Off-Road RC Vehicle",
    price: "₹3,299",
    image:
      "https://images.unsplash.com/photo-1675301590589-c56007c935d4?auto=format&fit=crop&q=80&w=700",
  },
  {
    name: "Drift Speedster",
    category: "High Speed RC Car",
    price: "₹2,799",
    image:
      "https://images.unsplash.com/photo-1727622738048-29e6f37b2a8c?auto=format&fit=crop&q=80&w=700",
  },
  {
    name: "Monster Truck RC",
    category: "All Terrain Truck",
    price: "₹3,999",
    image:
      "https://images.unsplash.com/photo-1675301590589-c56007c935d4?auto=format&fit=crop&q=80&w=700",
  },
];

export default function Page() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("Racing Red");
  const [selectedVersion, setSelectedVersion] = useState("4WD Standard");

  const price = 2499;
  const totalPrice = price * quantity;

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  return (
    <main className="min-h-screen bg-[#f7f7f5] text-[#171717]">
      {/* Breadcrumb */}
      <section className="mx-auto max-w-7xl px-4 pb-4 pt-6 sm:px-6 lg:px-8 lg:pt-8">
        <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500">
          <span className="cursor-pointer transition hover:text-black">
            Home
          </span>

          <span>/</span>

          <span className="cursor-pointer transition hover:text-black">
            Toys
          </span>

          <span>/</span>

          <span className="cursor-pointer transition hover:text-black">
            Remote Control Cars
          </span>

          <span>/</span>

          <span className="text-[#d1432d]">TurboX RC Car</span>
        </div>
      </section>

      {/* Product Hero */}
      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 xl:gap-12">
          {/* ================= GALLERY ================= */}
          <section className="lg:col-span-7">
      <div className="lg:sticky lg:top-6">

        <div className="flex flex-col gap-4 md:flex-row">

          {/* Thumbnails */}
          <div className="order-2 flex gap-3 overflow-x-auto pb-1 md:order-1 md:w-24 md:flex-col md:overflow-visible">
            {productImages.map((image, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setSelectedImage(index)}
                className={`h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl bg-white p-1 transition sm:h-24 sm:w-24 ${
                  selectedImage === index
                    ? "border-2 border-[#d1432d]"
                    : "border border-neutral-200 hover:border-neutral-400"
                }`}
              >
                <img
                  src={image}
                  alt={`TurboX remote car view ${index + 1}`}
                  className="h-full w-full rounded-xl object-cover"
                />
              </button>
            ))}
          </div>

          {/* Fixed Height Image */}
          <div
            className="
              order-1
              relative
              w-full
              overflow-hidden
              rounded-3xl
              border
              border-neutral-200
              bg-white
              shadow-sm
              md:order-2
              md:h-[550px]
              
            "
          >
            {/* Badges */}
            <div className="absolute left-4 top-4 z-10 flex flex-wrap gap-2 sm:left-6 sm:top-6">
              <span className="rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-neutral-900 shadow-sm backdrop-blur">
                Bestseller
              </span>

              <span className="rounded-full bg-[#171717] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white">
                4WD
              </span>
            </div>

            {/* Zoom */}
            <button
              type="button"
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-neutral-800 shadow-md backdrop-blur transition hover:scale-105 sm:right-6 sm:top-6"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35m2.35-5.65a8 8 0 11-16 0 8 8 0 0116 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 7v6m3-3H7"
                />
              </svg>
            </button>

            {/* Main Image */}
            <img
              src={productImages[selectedImage]}
              alt="TurboX RC Off-Road Remote Car"
              className="h-full w-full object-cover transition duration-700 hover:scale-[1.03]"
            />

            {/* Previous */}
            <button
              type="button"
              onClick={() =>
                setSelectedImage((prev) =>
                  prev === 0 ? productImages.length - 1 : prev - 1
                )
              }
              className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-neutral-800 shadow-md transition hover:scale-110 sm:left-5"
              aria-label="Previous image"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Next */}
            <button
              type="button"
              onClick={() =>
                setSelectedImage(
                  (prev) => (prev + 1) % productImages.length
                )
              }
              className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#171717] text-white shadow-md transition hover:scale-110 sm:right-5"
              aria-label="Next image"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/70 px-3 py-1 text-[11px] font-medium text-white">
              {selectedImage + 1} / {productImages.length}
            </div>
          </div>
        </div>
      </div>
    </section>


          {/* ================= PRODUCT INFO ================= */}
          <section className="lg:col-span-5">
            {/* Rating */}
            <div className="flex flex-col gap-3 border-b border-neutral-200 pb-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex text-sm text-yellow-500">
                  ★★★★★
                </div>

                <span className="text-xs font-bold text-[#171717]">
                  4.8 / 5
                </span>

                <span className="text-xs text-neutral-500 underline">
                  327 Reviews
                </span>
              </div>

              <span className="w-fit rounded-full bg-red-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-red-600">
                Only 6 left
              </span>
            </div>

            {/* Title */}
            <div className="mt-5">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#d1432d]">
                High Performance RC Vehicle
              </p>

              <h1 className="mt-2 text-3xl font-bold leading-tight tracking-tight text-neutral-950 sm:text-4xl xl:text-5xl">
                TurboX 4WD Remote Control Off-Road Car
              </h1>

              <p className="mt-2 text-sm text-neutral-500">
                Fast • Durable • All-Terrain • Rechargeable
              </p>
            </div>

            {/* Price */}
            <div className="mt-6 rounded-2xl border border-neutral-200 bg-white p-4 sm:p-5">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-3xl font-bold tracking-tight text-neutral-950 sm:text-4xl">
                  ₹2,499
                </span>

                <span className="text-lg text-neutral-400 line-through">
                  ₹3,499
                </span>

                <span className="rounded-md bg-red-50 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-red-600">
                  29% OFF
                </span>
              </div>

              <p className="mt-2 text-xs text-neutral-500">
                Inclusive of all taxes • Free delivery on this product
              </p>
            </div>

            {/* Product Description */}
            <p className="mt-5 text-sm leading-7 text-neutral-600 sm:text-base">
              Built for exciting off-road adventures, the TurboX RC Car
              features 4-wheel drive, rugged tyres, responsive steering and a
              powerful rechargeable motor. Perfect for indoor and outdoor play.
            </p>

            {/* Version */}
            <div className="mt-6">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                  Select Version
                </span>

                <span className="text-xs text-neutral-500">
                  Choose your setup
                </span>
              </div>

              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {["4WD Standard", "4WD Pro Speed"].map((version) => (
                  <button
                    key={version}
                    type="button"
                    onClick={() => setSelectedVersion(version)}
                    className={`rounded-xl border px-4 py-3 text-left text-xs font-semibold transition ${
                      selectedVersion === version
                        ? "border-[#d1432d] bg-red-50 text-[#d1432d]"
                        : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-400"
                    }`}
                  >
                    {version}

                    <span className="mt-1 block text-[10px] font-normal text-neutral-500">
                      {version === "4WD Standard"
                        ? "Top speed up to 20 km/h"
                        : "Top speed up to 28 km/h"}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Color */}
            <div className="mt-6">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                  Color:
                  <span className="ml-1 text-neutral-950">
                    {selectedColor}
                  </span>
                </span>

                <span className="text-xs text-neutral-500">
                  4 colors available
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    type="button"
                    onClick={() => setSelectedColor(color.name)}
                    title={color.name}
                    className={`flex h-10 w-10 items-center justify-center rounded-full transition ${
                      selectedColor === color.name
                        ? "ring-2 ring-[#f7f7f5] ring-offset-2 ring-offset-[#171717]"
                        : "border-2 border-white shadow-sm"
                    }`}
                    style={{ backgroundColor: color.value }}
                  />
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-neutral-200 bg-white p-3">
                <p className="text-sm font-bold">2.4GHz</p>
                <p className="mt-1 text-[11px] text-neutral-500">
                  Stable Remote Control
                </p>
              </div>

              <div className="rounded-xl border border-neutral-200 bg-white p-3">
                <p className="text-sm font-bold">4WD</p>
                <p className="mt-1 text-[11px] text-neutral-500">
                  All Terrain Drive
                </p>
              </div>

              <div className="rounded-xl border border-neutral-200 bg-white p-3">
                <p className="text-sm font-bold">30 Min</p>
                <p className="mt-1 text-[11px] text-neutral-500">
                  Play Time
                </p>
              </div>

              <div className="rounded-xl border border-neutral-200 bg-white p-3">
                <p className="text-sm font-bold">LED</p>
                <p className="mt-1 text-[11px] text-neutral-500">
                  Front Lights
                </p>
              </div>
            </div>

            {/* Quantity + Cart */}
            <div className="mt-7 border-t border-neutral-200 pt-6">
              <div className="flex flex-col gap-3 sm:flex-row">
                {/* Quantity */}
                <div className="flex h-14 items-center justify-between rounded-2xl border border-neutral-200 bg-white px-3 sm:w-36">
                  <button
                    type="button"
                    onClick={decreaseQuantity}
                    className="flex h-9 w-9 items-center justify-center rounded-xl text-lg font-semibold text-neutral-600 transition hover:bg-neutral-100"
                  >
                    −
                  </button>

                  <span className="text-sm font-bold">
                    {String(quantity).padStart(2, "0")}
                  </span>

                  <button
                    type="button"
                    onClick={increaseQuantity}
                    className="flex h-9 w-9 items-center justify-center rounded-xl text-lg font-semibold text-neutral-600 transition hover:bg-neutral-100"
                  >
                    +
                  </button>
                </div>

                {/* Add To Cart */}
                <button
                  type="button"
                  className="flex h-14 flex-1 items-center justify-center gap-2 rounded-2xl bg-[#d1432d] px-6 text-sm font-bold text-white shadow-sm transition hover:bg-[#b93623] hover:shadow-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 2h13m-8 4a1 1 0 100-2 1 1 0 000 2zm7 0a1 1 0 100-2 1 1 0 000 2z"
                    />
                  </svg>

                  Add to Cart • ₹{totalPrice.toLocaleString("en-IN")}
                </button>
              </div>

              {/* Buy Now */}
              <button
                type="button"
                className="mt-3 h-12 w-full rounded-2xl border-2 border-neutral-900 bg-white text-sm font-bold text-neutral-900 transition hover:bg-neutral-900 hover:text-white"
              >
                Buy It Now
              </button>
            </div>

            {/* Trust Features */}
            <div className="mt-6 grid grid-cols-3 gap-2 border-t border-neutral-200 pt-5">
              <div className="rounded-xl bg-white p-3 text-center">
                <span className="block text-sm font-bold">6 Months</span>
                <span className="mt-1 block text-[10px] leading-4 text-neutral-500">
                  Warranty
                </span>
              </div>

              <div className="rounded-xl bg-white p-3 text-center">
                <span className="block text-sm font-bold">Free</span>
                <span className="mt-1 block text-[10px] leading-4 text-neutral-500">
                  Shipping
                </span>
              </div>

              <div className="rounded-xl bg-white p-3 text-center">
                <span className="block text-sm font-bold">7 Days</span>
                <span className="mt-1 block text-[10px] leading-4 text-neutral-500">
                  Easy Returns
                </span>
              </div>
            </div>
          </section>
        </div>
      </section>

      {/* ================= PRODUCT DETAILS ================= */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left */}
          <div className="lg:col-span-7">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#d1432d]">
              Product Details
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-neutral-950 sm:text-4xl">
              Built for Fast, Fun Adventures
            </h2>

            <p className="mt-4 leading-7 text-neutral-600">
              TurboX is designed for kids and hobby users who want an RC car
              that can handle everyday play, sharp turns and different
              surfaces. Its rugged construction and high-grip tyres make it
              suitable for both indoor floors and outdoor tracks.
            </p>

            {/* Feature Cards */}
            <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-neutral-200 bg-white p-5">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-[#d1432d]">
                  ⚡
                </div>

                <h3 className="text-sm font-bold uppercase tracking-wide">
                  High Speed Motor
                </h3>

                <p className="mt-2 text-xs leading-6 text-neutral-600">
                  Responsive acceleration and smooth control for exciting
                  racing sessions.
                </p>
              </div>

              <div className="rounded-2xl border border-neutral-200 bg-white p-5">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-[#d1432d]">
                  🛞
                </div>

                <h3 className="text-sm font-bold uppercase tracking-wide">
                  All-Terrain Tyres
                </h3>

                <p className="mt-2 text-xs leading-6 text-neutral-600">
                  Large-grip tyres provide stability across tiles, concrete,
                  dirt and rough surfaces.
                </p>
              </div>
            </div>

            {/* Specifications */}
            <div className="mt-8 overflow-hidden rounded-2xl border border-neutral-200 bg-white">
              <div className="border-b border-neutral-200 px-5 py-4">
                <h3 className="text-sm font-bold uppercase tracking-wider">
                  Specifications
                </h3>
              </div>

              <div className="divide-y divide-neutral-100">
                {[
                  ["Product Type", "Remote Control Off-Road Car"],
                  ["Drive System", "4-Wheel Drive"],
                  ["Remote Frequency", "2.4GHz"],
                  ["Battery", "Rechargeable Lithium Battery"],
                  ["Charging Time", "Approx. 3 Hours"],
                  ["Play Time", "Up to 30 Minutes"],
                  ["Top Speed", "Up to 20 km/h"],
                  ["Recommended Age", "8+ Years"],
                  ["Control Distance", "Up to 50 Metres"],
                  ["Lighting", "Front LED Headlights"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="grid grid-cols-1 gap-1 px-5 py-3 sm:grid-cols-2"
                  >
                    <span className="text-xs font-semibold text-neutral-500">
                      {label}
                    </span>

                    <span className="text-xs font-medium text-neutral-900 sm:text-right">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-white aspect-[4/5]">
              <img
                src={productImages[1]}
                alt="TurboX remote control off road car"
                className="h-full w-full object-cover transition duration-700 hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">
                  TurboX Performance
                </span>

                <p className="mt-2 text-2xl font-bold leading-tight">
                  Built to race. Ready for every terrain.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= HIGHLIGHT BANNER ================= */}
      <section className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-[#171717] px-6 py-10 text-white sm:px-10 lg:px-16 lg:py-14">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-400">
                Performance Package
              </p>

              <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                More speed.
                <br />
                More control.
                <br />
                More fun.
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-neutral-400">
                From quick indoor races to outdoor off-road adventures,
                TurboX brings responsive controls and rugged performance to
                every drive.
              </p>

              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-xs font-semibold uppercase tracking-wider text-neutral-300">
                <span>✓ 4WD DRIVE</span>
                <span>✓ LED LIGHTS</span>
                <span>✓ RECHARGEABLE</span>
              </div>
            </div>

            <div className="flex justify-center lg:col-span-5">
              <div className="h-64 w-64 overflow-hidden rounded-full border-4 border-white/10 p-2 shadow-2xl sm:h-80 sm:w-80">
                <img
                  src={productImages[0]}
                  alt="Remote control car detail"
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= RELATED PRODUCTS ================= */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#d1432d]">
            You May Also Like
          </p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight text-neutral-950 sm:text-4xl">
            More RC Cars
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {relatedProducts.map((product) => (
            <div
              key={product.name}
              className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative aspect-square overflow-hidden bg-neutral-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-4">
                <div className="mb-1 text-xs text-yellow-500">★★★★★</div>

                <h3 className="text-base font-bold text-neutral-900">
                  {product.name}
                </h3>

                <p className="mt-1 text-xs text-neutral-500">
                  {product.category}
                </p>

                <div className="mt-4 flex items-center justify-between border-t border-neutral-100 pt-3">
                  <span className="text-base font-bold">
                    {product.price}
                  </span>

                  <button
                    type="button"
                    className="rounded-lg bg-red-50 px-3 py-2 text-xs font-bold text-[#d1432d] transition hover:bg-[#d1432d] hover:text-white"
                  >
                    + Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= REVIEWS ================= */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            {/* Rating Summary */}
            <div className="border-b border-neutral-200 pb-8 lg:col-span-4 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-8">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#d1432d]">
                Customer Reviews
              </p>

              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-6xl font-bold">4.8</span>
                <span className="text-lg text-neutral-400">/ 5</span>
              </div>

              <div className="mt-1 text-lg text-yellow-500">
                ★★★★★
              </div>

              <p className="mt-2 text-xs text-neutral-500">
                Based on 327 verified customer reviews.
              </p>

              <div className="mt-6 space-y-2">
                {[
                  ["5 Stars", "92%"],
                  ["4 Stars", "6%"],
                  ["3 Stars", "2%"],
                ].map(([label, percentage]) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 text-xs"
                  >
                    <span className="w-14 text-neutral-600">
                      {label}
                    </span>

                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-neutral-100">
                      <div
                        className="h-full rounded-full bg-[#171717]"
                        style={{ width: percentage }}
                      />
                    </div>

                    <span className="w-9 text-right text-neutral-500">
                      {percentage}
                    </span>
                  </div>
                ))}
              </div>

              <button
                type="button"
                className="mt-7 w-full rounded-xl border border-neutral-900 py-3 text-xs font-bold uppercase tracking-wider transition hover:bg-neutral-900 hover:text-white"
              >
                Write A Review
              </button>
            </div>

            {/* Reviews */}
            <div className="lg:col-span-8">
              <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-xl font-bold">What Customers Say</h3>

                <span className="text-xs font-bold uppercase tracking-wide text-[#d1432d]">
                  Most Helpful
                </span>
              </div>

              <div className="space-y-4">
                <article className="rounded-2xl border border-neutral-200 bg-[#fafafa] p-5">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="text-xs text-yellow-500">
                        ★★★★★
                      </div>

                      <h4 className="mt-1 text-sm font-bold">
                        “Really fast and surprisingly strong”
                      </h4>
                    </div>

                    <span className="text-[11px] text-neutral-400">
                      Verified Buyer • 2 weeks ago
                    </span>
                  </div>

                  <p className="mt-3 text-xs leading-6 text-neutral-600">
                    The car is much faster than I expected. It works well on
                    the floor and outside on rough ground. My son has been
                    playing with it every day.
                  </p>

                  <div className="mt-3 text-[11px] text-neutral-400">
                    Rahul • Delhi
                  </div>
                </article>

                <article className="rounded-2xl border border-neutral-200 bg-[#fafafa] p-5">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="text-xs text-yellow-500">
                        ★★★★★
                      </div>

                      <h4 className="mt-1 text-sm font-bold">
                        “Great remote control and battery”
                      </h4>
                    </div>

                    <span className="text-[11px] text-neutral-400">
                      Verified Buyer • 1 month ago
                    </span>
                  </div>

                  <p className="mt-3 text-xs leading-6 text-neutral-600">
                    Controls are easy to understand and the steering feels
                    very responsive. Battery life is also good for regular
                    play sessions.
                  </p>

                  <div className="mt-3 text-[11px] text-neutral-400">
                    Amit • Gurugram
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}