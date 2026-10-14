"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { getHomeProducts } from "@/lib/homeProducts";

const HIGHLIGHT_PRODUCT_TYPES = [
  ["dunnage"],
  ["gap filler"],
  ["air pillow", "pillow bag", "air cushion film roll"],
  ["air cushion", "cushion bag"],
  ["shredder"],
];

function getProductIdentity(product) {
  return `${product.name || ""} ${product.slug || ""}`
    .toLowerCase()
    .replace(/[_-]+/g, " ");
}

export default function Highlight() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(2);
  const sliderRef = useRef(null);

  const getMaxSlide = useCallback(() => {
    return Math.max(0, products.length - visibleCount);
  }, [products.length, visibleCount]);

  useEffect(() => {
    let cancelled = false;

    async function loadProducts() {
      try {
        const allProducts = await getHomeProducts();
        if (!cancelled) {
          const activeProducts = allProducts.filter(
            (product) => product && product.isActive !== false
          );
          const usedProducts = new Set();
          const highlightedProducts = HIGHLIGHT_PRODUCT_TYPES.flatMap((terms) => {
            const product = activeProducts.find((candidate) => {
              const identity = getProductIdentity(candidate);
              const id = candidate._id || candidate.id || candidate.slug;
              const isPillow =
                identity.includes("air pillow") ||
                identity.includes("air cushion film roll");
              if (usedProducts.has(id)) return false;
              if (terms.includes("air cushion") && isPillow) return false;
              return terms.some((term) => identity.includes(term));
            });

            if (!product) return [];
            usedProducts.add(product._id || product.id || product.slug);
            return [product];
          });
          setProducts(highlightedProducts);
        }
      } catch (error) {
        console.error("Featured products error:", error);
        if (!cancelled) setProducts([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void loadProducts();
    return () => {
      cancelled = true;
    };
  }, []);

  const goToSlide = useCallback((index) => {
    const slider = sliderRef.current;
    const card = slider?.children[index];
    if (!slider || !card) return;

    const cardLeft =
      card.getBoundingClientRect().left -
      slider.getBoundingClientRect().left +
      slider.scrollLeft;
    slider.scrollTo({ left: cardLeft, behavior: "smooth" });
    setCurrentSlide(index);
  }, []);

  useEffect(() => {
    const updateVisibleCount = () => {
      setVisibleCount(window.innerWidth >= 1024 ? 3 : 2);
    };
    const timer = setTimeout(updateVisibleCount, 0);
    window.addEventListener("resize", updateVisibleCount);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateVisibleCount);
    };
  }, []);

  useEffect(() => {
    if (currentSlide > getMaxSlide()) {
      goToSlide(getMaxSlide());
    }
  }, [currentSlide, getMaxSlide, goToSlide]);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider || products.length === 0) return undefined;

    const handleScroll = () => {
      const cards = Array.from(slider.children);
      const sliderLeft = slider.getBoundingClientRect().left;
      const nearestIndex = cards.reduce(
        (nearest, card, index) =>
          Math.abs(card.getBoundingClientRect().left - sliderLeft) <
          Math.abs(cards[nearest].getBoundingClientRect().left - sliderLeft)
            ? index
            : nearest,
        0
      );
      setCurrentSlide(Math.min(nearestIndex, getMaxSlide()));
    };

    slider.addEventListener("scroll", handleScroll, { passive: true });
    return () => slider.removeEventListener("scroll", handleScroll);
  }, [getMaxSlide, products.length]);

  useEffect(() => {
    if (loading || products.length === 0) return undefined;

    const interval = setInterval(() => {
      const maxSlide = getMaxSlide();
      goToSlide(currentSlide >= maxSlide ? 0 : currentSlide + 1);
    }, 3500);

    return () => clearInterval(interval);
  }, [currentSlide, getMaxSlide, goToSlide, loading, products.length]);

  const nextSlide = () => {
    goToSlide(currentSlide >= getMaxSlide() ? 0 : currentSlide + 1);
  };

  const prevSlide = () => {
    goToSlide(currentSlide <= 0 ? getMaxSlide() : currentSlide - 1);
  };

  return (
    <section className="bg-[#F7F8FA] py-11 sm:py-10 lg:py-15">
      <div className="mx-auto max-w-7xl ">

        {/* Heading */}
        <div className="mb-8 flex flex-col gap-5 lg:mb-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#F5A623] sm:text-sm">
              Featured Products
            </p>

            <h2 className="text-3xl font-bold leading-tight tracking-tight text-[#081A33] sm:text-4xl lg:text-5xl">
              Protective packaging built for
              <span className="block">
                safer transportation.
              </span>
            </h2>
          </div>

          <p className="max-w-md text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
            Explore dunnage bags, gap fillers, air pillow bags, air cushion
            bags, and shredder machines for safer packaging and transport.
          </p>
        </div>

        {/* =========================================
            SLIDER
        ========================================= */}
        <div className="relative">

          {/* Viewport */}
          <div
            ref={sliderRef}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth"
            style={{ scrollbarWidth: "none" }}
          >

            {/* Track */}
            {products.map((product, index) => {
              const image =
                product.image ||
                product.images?.[0] ||
                product.thumbnail ||
                "/placeholder-product.webp";
              const productUrl = product.slug
                ? `/products/${product.slug}`
                : "/products";
              const description =
                product.shortDescription ||
                product.description ||
                product.category ||
                "Explore our protective packaging solution.";

              return (
                <div
                  key={product._id || product.id || product.slug || index}
                  className="
                    shrink-0
                    snap-start
                    w-[calc((100%-1rem)/2)]
                    lg:w-[calc((100%-2rem)/3)]
                  "
                >
                  <Link
                    href={productUrl}
                    className="
                      group
                      flex
                      h-[360px]
                      flex-col
                      overflow-hidden
                      rounded-[24px]
                      border
                      border-slate-200
                      bg-white
                      p-3
                      transition
                      duration-300
                      hover:-translate-y-1
                      hover:shadow-xl
                      sm:h-[430px]
                      sm:p-5
                      lg:h-[390px]
                    "
                  >

                    {/* Product Image */}
                    <div
                      className="
                        relative
                        h-[190px]
                        shrink-0
                        overflow-hidden
                        rounded-2xl
                        bg-[#F4F7F9]
                        sm:h-[240px]
                        lg:h-[270px]
                      "
                    >
                      <Image
                        src={image}
                        alt={product.name}
                        fill
                        className="
                          object-cover
                          
                          transition
                          duration-500
                          group-hover:scale-105
                       
                        "
                        sizes="
                          (max-width: 640px) 50vw,
                          (max-width: 1024px) 50vw,
                          33vw
                        "
                      />

                      {/* Arrow */}
                      <span
                        className="
                          absolute
                          right-2
                          top-2
                          flex
                          h-8
                          w-8
                          items-center
                          justify-center
                          rounded-full
                          bg-[#081A33]
                          text-white
                          transition
                          duration-300
                          group-hover:bg-[#F5A623]
                          group-hover:text-[#081A33]
                          sm:right-3
                          sm:top-3
                          sm:h-10
                          sm:w-10
                        "
                      >
                        <ArrowUpRight size={16} />
                      </span>
                    </div>

                    {/* Product Content */}
                    <div className="flex flex-1 flex-col pt-4 sm:pt-5">

                      <h3
                        className="
                          line-clamp-2
                          
                          text-sm
                          font-bold
                          leading-5
                          text-[#081A33]
                      
                          sm:text-lg
                          sm:leading-6
                        "
                      >
                        {product.name}
                      </h3>

                    

                    </div>
                  </Link>
                </div>
              );
            })}

            {!loading && products.length === 0 && (
              <p className="w-full rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
                No featured products are available right now.
              </p>
            )}
          </div>

          {/* =========================================
              CONTROLS
          ========================================= */}
          <div className="mt-5 flex items-center justify-between">

            {/* Dots */}
            <div className="flex items-center gap-1.5">
              {products.slice(0, getMaxSlide() + 1).map((product, index) => (
                <button
                  key={product._id || product.id || index}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to product ${index + 1}`}
                  className={`
                    h-1.5
                    rounded-full
                    transition-all
                    duration-300
                    ${
                      currentSlide === index
                        ? "w-7 bg-[#F5A623]"
                        : "w-1.5 bg-slate-300"
                    }
                  `}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex gap-2">

              <button
                onClick={prevSlide}
                aria-label="Previous products"
                disabled={!products.length}
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-slate-200
                  bg-white
                  text-[#081A33]
                  transition
                  hover:bg-[#081A33]
                  hover:text-white
                  sm:h-11
                  sm:w-11
                "
              >
                <ArrowLeft size={17} />
              </button>

              <button
                onClick={nextSlide}
                aria-label="Next products"
                disabled={!products.length}
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  bg-[#081A33]
                  text-white
                  transition
                  hover:bg-[#F5A623]
                  hover:text-[#081A33]
                  sm:h-11
                  sm:w-11
                "
              >
                <ArrowRight size={17} />
              </button>

            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 flex justify-center sm:mt-10">
        
        </div>

      </div>
    </section>
  );
}