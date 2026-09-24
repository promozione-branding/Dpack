"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Star,
} from "lucide-react";

/* ============================================================
   PRODUCTS
============================================================ */

const products = [
  {
    id: 1,
    brand: "D PACK PREMIUM",
    name: "Dunnage Air Bags",
    image: "https://packingairbag.com/cat/1.webp",
    rating: "4.8",
    reviews: "24",
    price: "₹499",
    oldPrice: "₹699",
    discount: "29% OFF",
    link: "https://packingairbag.com/categories/dunnage-bag",
  },
  {
    id: 2,
    brand: "D PACK PREMIUM",
    name: "PP Dunnage Bag",
    image: "https://packingairbag.com/cat/1.webp",
    rating: "4.7",
    reviews: "18",
    price: "₹399",
    oldPrice: "₹599",
    discount: "33% OFF",
    link: "https://packingairbag.com/categories/dunnage-bag",
  },
  {
    id: 3,
    brand: "D PACK PREMIUM",
    name: "Square Dunnage Air Bags",
    image: "https://packingairbag.com/cat/1.webp",
    rating: "4.9",
    reviews: "31",
    price: "₹549",
    oldPrice: "₹799",
    discount: "31% OFF",
    link: "https://packingairbag.com/categories/dunnage-bag",
  },
  {
    id: 4,
    brand: "D PACK PREMIUM",
    name: "Heavy Duty Dunnage Bag",
    image: "https://packingairbag.com/cat/1.webp",
    rating: "4.8",
    reviews: "26",
    price: "₹599",
    oldPrice: "₹899",
    discount: "33% OFF",
    link: "https://packingairbag.com/categories/dunnage-bag",
  },
  {
    id: 5,
    brand: "D PACK PREMIUM",
    name: "Air Column Bag for Laptop",
    image: "https://packingairbag.com/cat/5.webp",
    rating: "4.9",
    reviews: "42",
    price: "₹299",
    oldPrice: "₹449",
    discount: "33% OFF",
    link: "https://packingairbag.com/categories/air-column-bag",
  },
  {
    id: 6,
    brand: "D PACK PREMIUM",
    name: "Air Column Bag for Electronics",
    image: "https://packingairbag.com/cat/5.webp",
    rating: "4.8",
    reviews: "36",
    price: "₹349",
    oldPrice: "₹499",
    discount: "30% OFF",
    link: "https://packingairbag.com/categories/air-column-bag",
  },
  {
    id: 7,
    brand: "D PACK PREMIUM",
    name: "Air Column Packaging Bag",
    image: "https://packingairbag.com/cat/5.webp",
    rating: "4.7",
    reviews: "21",
    price: "₹379",
    oldPrice: "₹549",
    discount: "31% OFF",
    link: "https://packingairbag.com/categories/air-column-bag",
  },
  {
    id: 8,
    brand: "D PACK PREMIUM",
    name: "Protective Air Column Bag",
    image: "https://packingairbag.com/cat/5.webp",
    rating: "4.9",
    reviews: "29",
    price: "₹429",
    oldPrice: "₹599",
    discount: "28% OFF",
    link: "https://packingairbag.com/categories/air-column-bag",
  },
];

/* ============================================================
   PRODUCT CARD
============================================================ */

function ProductCard({ product }) {
  return (
    <Link
      href={product.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block h-full"
    >
      <article className="relative h-full overflow-hidden rounded-[20px] border border-[#E6E8EB] bg-white p-2.5 shadow-[0_4px_18px_rgba(13,46,75,0.04)] transition-all duration-500 hover:-translate-y-2 hover:border-[#D7D9DD] hover:shadow-[0_20px_45px_rgba(13,46,75,0.12)]">

        {/* IMAGE */}

        <div className="relative aspect-[1.12/1] overflow-hidden rounded-[16px] bg-[#F2F3F5]">

          {/* Glow */}

          <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D49A62]/0 blur-3xl transition-all duration-700 group-hover:bg-[#D49A62]/20" />

          {/* Image */}

          <Image
            src={product.image}
            alt={product.name}
            fill
            unoptimized
            className="object-contain p-5 transition-all duration-700 ease-out group-hover:scale-[1.1] group-hover:-translate-y-1"
          />

          {/* Discount */}

          <div className="absolute left-3 top-3 z-20">
            <span className="inline-flex bg-[#0D2E4B] px-2.5 py-1.5 font-[var(--font-outfit)] text-[9px] font-semibold uppercase tracking-[0.12em] text-white">
              {product.discount}
            </span>
          </div>

          {/* Hover Button */}

          <div className="absolute bottom-3 right-3 z-30 translate-y-3 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D49A62] text-[#0D2E4B] shadow-lg transition-transform duration-500 group-hover:rotate-45">
              <ArrowUpRight
                size={17}
                strokeWidth={1.8}
              />
            </div>

          </div>

          {/* Bottom Line */}

          <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-[#D49A62] transition-all duration-500 group-hover:w-full" />

        </div>

        {/* CONTENT */}

        <div className="px-1.5 pb-2 pt-4">

          <p className="font-[var(--font-outfit)] text-[9px] font-semibold uppercase tracking-[0.15em] text-[#95633D]">
            {product.brand}
          </p>

          <h3 className="mt-1.5 min-h-[40px] font-[var(--font-outfit)] text-[14px] font-medium leading-[1.3] text-[#0D2E4B] transition-colors duration-300 group-hover:text-[#95633D] sm:text-[15px]">
            {product.name}
          </h3>

          {/* Rating */}

          <div className="mt-2.5 flex items-center gap-1.5">

            <span className="flex items-center gap-1 rounded-sm bg-[#F4F1E9] px-1.5 py-1">

              <span className="font-[var(--font-outfit)] text-[10px] font-semibold text-[#0D2E4B]">
                {product.rating}
              </span>

              <Star
                size={10}
                fill="currentColor"
                strokeWidth={0}
                className="text-[#95633D]"
              />

            </span>

            <span className="font-[var(--font-outfit)] text-[10px] text-[#9A9FA5]">
              ({product.reviews})
            </span>

          </div>

          {/* PRICE */}

          <div className="mt-2.5 flex flex-wrap items-center gap-2">

            <span className="font-[var(--font-outfit)] text-[16px] font-semibold tracking-[-0.02em] text-[#111820]">
              {product.price}
            </span>

            <span className="font-[var(--font-outfit)] text-[10px] text-[#A7A9AD] line-through">
              {product.oldPrice}
            </span>

            <span className="font-[var(--font-outfit)] text-[9px] font-medium text-[#D04D61]">
              {product.discount}
            </span>

          </div>

        </div>

      </article>
    </Link>
  );
}


/* ============================================================
   MAIN SECTION
============================================================ */

export default function TrendingProducts() {

  const [current, setCurrent] = useState(0);

  /*
    0 = mobile
    1 = tablet
    2 = desktop
  */

  const [itemsPerView, setItemsPerView] = useState(2);

  /* ==========================================================
     RESPONSIVE SLIDES
  ========================================================== */

  useEffect(() => {

    const updateSlides = () => {

      if (window.innerWidth >= 1024) {
        setItemsPerView(4);
      } else if (window.innerWidth >= 768) {
        setItemsPerView(3);
      } else {
        setItemsPerView(2);
      }

    };

    updateSlides();

    window.addEventListener("resize", updateSlides);

    return () => {
      window.removeEventListener("resize", updateSlides);
    };

  }, []);


  /* ==========================================================
     MAX SLIDE
  ========================================================== */

  const maxSlide = Math.max(
    0,
    products.length - itemsPerView
  );


  /* ==========================================================
     AUTO SLIDE
  ========================================================== */

  useEffect(() => {

    if (maxSlide <= 0) return;

    const timer = setInterval(() => {

      setCurrent((prev) => {

        if (prev >= maxSlide) {
          return 0;
        }

        return prev + 1;

      });

    }, 3500);

    return () => clearInterval(timer);

  }, [maxSlide]);


  /* ==========================================================
     PREVIOUS
  ========================================================== */

  const previousSlide = () => {

    setCurrent((prev) => {

      if (prev <= 0) {
        return maxSlide;
      }

      return prev - 1;

    });

  };


  /* ==========================================================
     NEXT
  ========================================================== */

  const nextSlide = () => {

    setCurrent((prev) => {

      if (prev >= maxSlide) {
        return 0;
      }

      return prev + 1;

    });

  };


  /* ==========================================================
     DOT COUNT
  ========================================================== */

  const dots = Array.from(
    { length: maxSlide + 1 },
    (_, index) => index
  );


  return (
    <section className="w-full overflow-hidden bg-[#F8F9FA] py-12 sm:py-10 lg:py-15">

      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">

        {/* ==================================================
            CENTER HEADING
        ================================================== */}

        <div className="mx-auto max-w-[760px] text-center">

          <p className="mb-3 font-[var(--font-outfit)] text-[10px] font-semibold uppercase tracking-[0.3em] text-[#95633D]">
            Explore Collections
          </p>

          <h2 className="font-[var(--font-outfit)] text-[46px] font-bold leading-[0.84] tracking-[-0.055em] text-[#17181C] sm:text-[58px] lg:text-[68px]">

            Trending Now 

            

          </h2>

          <p className="mx-auto mt-5 max-w-[600px] font-[var(--font-outfit)] text-sm leading-6 text-[#69727B] sm:text-base">
            Discover our most popular protective packaging solutions,
            selected for reliable performance and safer product
            transportation.
          </p>

        </div>


        {/* ==================================================
            SLIDER
        ================================================== */}

        <div className="relative mt-10">

          {/* ==================================================
              PREVIOUS BUTTON
          ================================================== */}

          <button
            onClick={previousSlide}
            aria-label="Previous products"
            className="absolute left-[-15px] top-1/2 z-30 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#E0E2E5] bg-white text-[#0D2E4B] shadow-[0_8px_25px_rgba(13,46,75,0.10)] transition-all duration-300 hover:bg-[#0D2E4B] hover:text-white lg:flex"
          >
            <ArrowLeft
              size={17}
              strokeWidth={1.6}
            />
          </button>


          {/* ==================================================
              NEXT BUTTON
          ================================================== */}

          <button
            onClick={nextSlide}
            aria-label="Next products"
            className="absolute right-[-15px] top-1/2 z-30 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#E0E2E5] bg-white text-[#0D2E4B] shadow-[0_8px_25px_rgba(13,46,75,0.10)] transition-all duration-300 hover:bg-[#0D2E4B] hover:text-white lg:flex"
          >
            <ArrowRight
              size={17}
              strokeWidth={1.6}
            />
          </button>


          {/* ==================================================
              VIEWPORT
          ================================================== */}

          <div className="overflow-hidden px-1 py-3">

            {/* ==================================================
                TRACK
            ================================================== */}

            <div
              className="flex transition-transform duration-700 ease-[cubic-bezier(.22,.61,.36,1)]"
              style={{
                transform: `translateX(-${current * (100 / itemsPerView)}%)`,
              }}
            >

              {products.map((product) => (

                <div
                  key={product.id}
                  className="shrink-0 px-1.5 sm:px-2"
                  style={{
                    width: `${100 / itemsPerView}%`,
                  }}
                >

                  <ProductCard product={product} />

                </div>

              ))}

            </div>

          </div>


          {/* ==================================================
              PAGINATION DOTS
          ================================================== */}

          <div className="mt-5 flex items-center justify-center gap-1.5">

            {dots.map((dot) => (

              <button
                key={dot}
                onClick={() => setCurrent(dot)}
                aria-label={`Go to slide ${dot + 1}`}
                className={`h-[6px] rounded-full transition-all duration-500 ${
                  current === dot
                    ? "w-6 bg-[#0D2E4B]"
                    : "w-[6px] bg-[#D8DCE0] hover:bg-[#95633D]"
                }`}
              />

            ))}

          </div>

        </div>


        {/* ==================================================
            VIEW ALL
        ================================================== */}

        <div className="mt-8 flex justify-center">

          <Link
            href="https://packingairbag.com/categories/dunnage-bag"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 border border-[#0D2E4B] px-6 py-3.5 font-[var(--font-outfit)] text-[10px] font-semibold uppercase tracking-[0.17em] text-[#0D2E4B] transition-all duration-300 hover:bg-[#0D2E4B] hover:text-white"
          >

            View All Products

            <ArrowUpRight
              size={15}
              strokeWidth={1.6}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />

          </Link>

        </div>

      </div>

    </section>
  );
}