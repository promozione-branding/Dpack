"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ShoppingCart,
  Check,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { getHomeProducts } from "@/lib/homeProducts";
import { addToCart as addProductToCart } from "@/lib/cartBus";

const HIGHLIGHT_PRODUCT_TYPES = [
  ["dunnage bag", "dunnage"],
  ["gap filler", "gap-filler"],
  ["air pillow bag", "air pillow", "pillow bag"],
  ["air cushion bag", "air cushion"],
  ["shredder machine", "shredder"],

  // 3 MORE PRODUCTS
  ["air column roll", "air-column-roll", "air column"],
  ["air column bag", "air-column-bag", "air column"],
  ["packaging air bag", "packaging-air-bag", "packaging air"],
];

function getProductIdentity(product) {
  return `${product?.name || ""} ${product?.slug || ""}`
    .toLowerCase()
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getProductId(product) {
  return product?._id || product?.id || product?.slug;
}

function getProductImage(product) {
  if (typeof product?.image === "string" && product.image) {
    return product.image;
  }

  if (Array.isArray(product?.images) && product.images[0]) {
    const firstImage = product.images[0];

    return typeof firstImage === "string"
      ? firstImage
      : firstImage?.url || firstImage?.src || "/placeholder-product.webp";
  }

  if (typeof product?.thumbnail === "string" && product.thumbnail) {
    return product.thumbnail;
  }

  return "/placeholder-product.webp";
}

export default function Highlight() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(2);
  const [addedProducts, setAddedProducts] = useState({});

  const sliderRef = useRef(null);
  const autoSlideRef = useRef(null);

  const getMaxSlide = useCallback(() => {
    return Math.max(0, products.length - visibleCount);
  }, [products.length, visibleCount]);

  /* =========================================
     LOAD FEATURED PRODUCTS
  ========================================= */

  useEffect(() => {
    let cancelled = false;

    async function loadProducts() {
      try {
        const result = await getHomeProducts();

        if (cancelled) return;

        const activeProducts = (
          Array.isArray(result) ? result : []
        ).filter(
          (product) =>
            product &&
            product.isActive !== false
        );

        const usedProducts = new Set();
        const highlightedProducts = [];

        HIGHLIGHT_PRODUCT_TYPES.forEach((terms) => {
          const product = activeProducts.find((candidate) => {
            const id = getProductId(candidate);
            const identity = getProductIdentity(candidate);

            if (!id || usedProducts.has(id)) return false;

            const matches = terms.some((term) =>
              identity.includes(term)
            );

            if (!matches) return false;

            const isPillow =
              identity.includes("air pillow") ||
              identity.includes("pillow bag");

            if (
              terms.includes("air cushion") &&
              isPillow
            ) {
              return false;
            }

            return true;
          });

          if (product) {
            highlightedProducts.push(product);
            usedProducts.add(getProductId(product));
          }
        });

        setProducts(highlightedProducts);
      } catch (error) {
        console.error("Featured products error:", error);

        if (!cancelled) setProducts([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadProducts();

    return () => {
      cancelled = true;
    };
  }, []);

  /* =========================================
     RESPONSIVE CARD COUNT
     Desktop: 4 | Mobile and Tablet: 2
  ========================================= */

  useEffect(() => {
    const updateVisibleCount = () => {
      setVisibleCount(window.innerWidth >= 1024 ? 4 : 2);
    };

    updateVisibleCount();

    window.addEventListener("resize", updateVisibleCount);

    return () => {
      window.removeEventListener("resize", updateVisibleCount);
    };
  }, []);

  /* =========================================
     SLIDER NAVIGATION
  ========================================= */

  const goToSlide = useCallback(
    (index, behavior = "smooth") => {
      const slider = sliderRef.current;
      if (!slider) return;

      const maxSlide = Math.max(
        0,
        products.length - visibleCount
      );

      const safeIndex = Math.max(
        0,
        Math.min(index, maxSlide)
      );

      const card = slider.children[safeIndex];
      if (!card) return;

      const sliderRect = slider.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();

      const targetLeft =
        slider.scrollLeft +
        cardRect.left -
        sliderRect.left;

      slider.scrollTo({
        left: targetLeft,
        behavior,
      });

      setCurrentSlide(safeIndex);
    },
    [products.length, visibleCount]
  );

  useEffect(() => {
    const maxSlide = getMaxSlide();

    if (currentSlide > maxSlide) {
      goToSlide(maxSlide, "auto");
    }
  }, [currentSlide, getMaxSlide, goToSlide]);

  /* =========================================
     TRACK MANUAL SCROLL
  ========================================= */

  useEffect(() => {
    const slider = sliderRef.current;

    if (!slider || !products.length) return;

    let frameId;

    const handleScroll = () => {
      cancelAnimationFrame(frameId);

      frameId = requestAnimationFrame(() => {
        const cards = Array.from(slider.children);
        const sliderLeft = slider.getBoundingClientRect().left;

        let nearestIndex = 0;
        let nearestDistance = Infinity;

        cards.forEach((card, index) => {
          const distance = Math.abs(
            card.getBoundingClientRect().left - sliderLeft
          );

          if (distance < nearestDistance) {
            nearestDistance = distance;
            nearestIndex = index;
          }
        });

        setCurrentSlide(
          Math.min(nearestIndex, getMaxSlide())
        );
      });
    };

    slider.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      slider.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(frameId);
    };
  }, [products.length, getMaxSlide]);

  /* =========================================
     AUTOPLAY
  ========================================= */

  useEffect(() => {
    if (loading || products.length <= visibleCount) return;

    autoSlideRef.current = setInterval(() => {
      setCurrentSlide((previous) => {
        const maxSlide = getMaxSlide();
        const next = previous >= maxSlide ? 0 : previous + 1;

        goToSlide(next);
        return next;
      });
    }, 4000);

    return () => {
      clearInterval(autoSlideRef.current);
    };
  }, [
    loading,
    products.length,
    visibleCount,
    getMaxSlide,
    goToSlide,
  ]);

  /* =========================================
     ADD PRODUCT TO CART
  ========================================= */

  const handleAddToCart = (product) => {
    try {
      addProductToCart(product, 1);

      const id = getProductId(product);

      setAddedProducts((previous) => ({
        ...previous,
        [id]: true,
      }));

      window.setTimeout(() => {
        setAddedProducts((previous) => ({
          ...previous,
          [id]: false,
        }));
      }, 1500);
    } catch (error) {
      console.error("Add to cart error:", error);
    }
  };

  const nextSlide = () => {
    const maxSlide = getMaxSlide();
    goToSlide(currentSlide >= maxSlide ? 0 : currentSlide + 1);
  };

  const prevSlide = () => {
    const maxSlide = getMaxSlide();
    goToSlide(currentSlide <= 0 ? maxSlide : currentSlide - 1);
  };

  /* =========================================
     RENDER
  ========================================= */

  return (
    <section className="overflow-hidden bg-[#F7F8FA] px-4 py-5 sm:px-5 sm:py-12 lg:py-10">
      <div className="mx-auto max-w-7xl">

        {/* HEADING */}

        <div className="mb-7 flex flex-col gap-4 sm:mb-9 lg:mb-10 lg:flex-row lg:items-end lg:justify-between">
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
            Explore our range of dunnage bags, gap fillers,
            air pillow bags, air cushion bags, and shredder
            machines for safer packaging and transportation.
          </p>
        </div>

        {/* SLIDER */}

        <div className="relative">
          <div
            ref={sliderRef}
            className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth pb-2 sm:gap-4"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {products.map((product, index) => {
              const image = getProductImage(product);
              const id = getProductId(product);
              
              const productSlug = String(product.slug || "").trim();

const productUrl = productSlug
  ? `/products/${encodeURIComponent(productSlug)}`
  : "/products";

              const isAdded = Boolean(addedProducts[id]);

              return (
                <div
                  key={id || index}
                  className="min-w-0 shrink-0 snap-start basis-[calc((100%-0.75rem)/2)] sm:basis-[calc((100%-1rem)/2)] lg:basis-[calc((100%-3rem)/4)]"
                >
                  <div className="group flex h-[330px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-2.5 transition duration-300 hover:-translate-y-1 hover:border-[#F5A623]/60 hover:shadow-lg sm:h-[355px] sm:p-3 lg:h-[380px] lg:p-3.5">

                    {/* IMAGE */}

                    <Link
                      href={productUrl}
                      className="relative block h-[180px] shrink-0 overflow-hidden rounded-xl bg-[#F4F7F9] sm:h-[205px] lg:h-[235px]"
                    >
                      <Image
                        src={image}
                        alt={product.name || "Featured product"}
                        fill
                        sizes="(max-width: 639px) 46vw, (max-width: 1023px) 46vw, 23vw"
                        className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                      />

                      <span className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#081A33] text-white transition-colors group-hover:bg-[#F5A623] group-hover:text-[#081A33]">
                        <ArrowUpRight size={17} />
                      </span>
                    </Link>

                    {/* PRODUCT NAME */}

                    <Link
                      href={productUrl}
                      className="flex min-h-0 flex-1 items-center px-1 py-2"
                    >
                      <h3 className="line-clamp-2 text-sm font-bold leading-5 text-[#081A33] transition-colors group-hover:text-[#B87500] sm:text-base sm:leading-6">
                        {product.name || "Featured Product"}
                      </h3>
                    </Link>

                    {/* ADD TO CART */}

<Link
  href={productUrl}
  className="
    group/details
    flex
    h-11
    w-full
    items-center
    justify-center
    gap-2
    bg-[#081A33]
    px-4
    text-[#FFFFFF]
    shadow-[0_6px_18px_rgba(8,26,51,0.12)]
    transition-all
    duration-300
    hover:bg-[#F5A623]
    hover:text-[#081A33]
    hover:shadow-[0_8px_22px_rgba(245,166,35,0.20)]
  "
>
  <span
    className="
      text-[13px]
      font-black
      uppercase
      tracking-[0.08em]
    "
  >
    View Sizes
  </span>

  <ArrowRight
    size={14}
    strokeWidth={2.3}
    className="
      transition-transform
      duration-300
      group-hover/details:translate-x-1
    "
  />
</Link>

                  </div>
                </div>
              );
            })}

            {/* LOADING */}

            {loading &&
              Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={`skeleton-${index}`}
                  className="min-w-0 shrink-0 basis-[calc((100%-0.75rem)/2)] sm:basis-[calc((100%-1rem)/2)] lg:basis-[calc((100%-3rem)/4)]"
                >
                  <div className="h-[330px] animate-pulse rounded-2xl border border-slate-200 bg-white p-3 sm:h-[355px] lg:h-[380px]">
                    <div className="h-[180px] rounded-xl bg-slate-100 sm:h-[205px] lg:h-[235px]" />
                    <div className="mt-4 h-4 w-4/5 rounded bg-slate-100" />
                    <div className="mt-3 h-10 rounded-xl bg-slate-100" />
                  </div>
                </div>
              ))}

            {/* EMPTY STATE */}

            {!loading && products.length === 0 && (
              <div className="w-full rounded-2xl border border-slate-200 bg-white p-8 text-center">
                <p className="font-semibold text-[#081A33]">
                  No featured products are available right now.
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  Check product names and active status in your admin panel.
                </p>
              </div>
            )}
          </div>

          {/* SLIDER DOTS AND ARROWS */}

          <div className="mt-5 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              {Array.from({
                length: getMaxSlide() + 1,
              }).map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={
                    currentSlide === index ? "true" : undefined
                  }
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    currentSlide === index
                      ? "w-7 bg-[#F5A623]"
                      : "w-1.5 bg-slate-300"
                  }`}
                />
              ))}
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={prevSlide}
                aria-label="Previous products"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-[#081A33] transition hover:bg-[#081A33] hover:text-white sm:h-11 sm:w-11"
              >
                <ArrowLeft size={18} />
              </button>

              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next products"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#081A33] text-white transition hover:bg-[#F5A623] hover:text-[#081A33] sm:h-11 sm:w-11"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
