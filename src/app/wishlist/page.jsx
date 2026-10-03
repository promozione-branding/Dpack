"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/app/context/AuthContext";
import { addToCart as addCartItem } from "@/lib/cartBus";
import {
  Heart,
  ShoppingCart,
  Trash2,
  ArrowRight,
  Star,
  ChevronRight,
  ShieldCheck,
  Truck,
  PackageCheck,
  ShoppingBag,
} from "lucide-react";

export default function WishlistPage() {
  const { wishlist, removeWishlistItem, clearWishlist } = useAuth();

  const removeItem = (id) => {
    removeWishlistItem(id);
  };

  const addToCart = (product) => {
    addCartItem(product);
    removeWishlistItem(product._id || product.id);

    alert(`${product.name} added to cart.`);
  };

  const addAllToCart = () => {
    if (wishlist.length === 0) return;

    wishlist.forEach((product) => addCartItem(product));
    clearWishlist()
      .then(() => alert("All wishlist items added to cart."))
      .catch(() => alert("Products were added to cart, but the wishlist could not be cleared."));
  };

  return (
    <>
      <style jsx global>{`
        @keyframes dpackFadeUp {
          from {
            opacity: 0;
            transform: translateY(18px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes dpackFadeRight {
          from {
            opacity: 0;
            transform: translateX(-18px);
          }

          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes dpackFloat {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-7px);
          }
        }

        @keyframes dpackHeart {
          0%,
          100% {
            transform: scale(1);
          }

          50% {
            transform: scale(1.08);
          }
        }

        @keyframes dpackShine {
          0% {
            left: -100%;
          }

          100% {
            left: 120%;
          }
        }

        .dpack-fade-up {
          animation: dpackFadeUp 0.65s ease forwards;
        }

        .dpack-fade-right {
          animation: dpackFadeRight 0.65s ease forwards;
        }

        .dpack-float {
          animation: dpackFloat 4s ease-in-out infinite;
        }

        .dpack-heart {
          animation: dpackHeart 2.5s ease-in-out infinite;
        }

        .dpack-shine {
          position: relative;
          overflow: hidden;
        }

        .dpack-shine::after {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 45%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.25),
            transparent
          );
          transform: skewX(-20deg);
          animation: dpackShine 3.5s infinite;
        }

        .wishlist-card {
          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease,
            border-color 0.3s ease;
        }

        .wishlist-card:hover {
          transform: translateY(-6px);
          border-color: rgba(245, 166, 35, 0.45);
          box-shadow: 0 18px 45px rgba(8, 26, 51, 0.1);
        }

        .wishlist-image {
          transition: transform 0.45s ease;
        }

        .wishlist-card:hover .wishlist-image {
          transform: scale(1.06);
        }

        .wishlist-button {
          transition: all 0.25s ease;
        }

        .wishlist-button:hover {
          transform: translateY(-2px);
        }
      `}</style>

      <main className="min-h-screen bg-[#F7F8FA] text-[#081A33]">

        {/* =====================================================
            PAGE HEADER
        ====================================================== */}
        <section className="relative overflow-hidden bg-[#081A33]">

          {/* Background Shapes */}
          <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#F5A623]/10 blur-3xl" />

          <div className="absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-[#F5A623]/10 blur-3xl" />

          <div className="absolute right-[18%] top-12 h-20 w-20 rotate-45 border border-white/10" />

          <div className="relative mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10">

            {/* Breadcrumb */}
            <div className="mb-7 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">
              <Link
                href="/"
                className="transition hover:text-[#F5A623]"
              >
                Home
              </Link>

              <ChevronRight size={13} />

              <span className="text-[#F5A623]">
                Wishlist
              </span>
            </div>

            <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">

              <div className="dpack-fade-right">

                <div className="mb-4 inline-flex items-center gap-2 border border-[#F5A623]/30 bg-[#F5A623]/10 px-3 py-1.5">
                  <Heart
                    size={13}
                    className="fill-[#F5A623] text-[#F5A623]"
                  />

                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#F5A623]">
                    My Wishlist
                  </span>
                </div>

                <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
                  Your
                  <span className="text-[#F5A623]">
                    {" "}Wishlist
                  </span>
                </h1>

                <p className="mt-3 max-w-xl text-sm leading-6 text-white/55">
                  Save your favourite packaging products and
                  easily add them to your cart whenever you are
                  ready to order.
                </p>

              </div>

              {/* Wishlist Count */}
              <div className="dpack-float flex w-fit items-center gap-3 border border-white/10 bg-white/5 px-5 py-3">

                <div className="flex h-10 w-10 items-center justify-center bg-[#F5A623]">
                  <Heart
                    size={19}
                    className="fill-[#081A33] text-[#081A33]"
                  />
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-[0.15em] text-white/40">
                    Saved Items
                  </p>

                  <p className="text-lg font-black text-white">
                    {wishlist.length}
                  </p>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* =====================================================
            WISHLIST CONTENT
        ====================================================== */}
        <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10 lg:py-14">

          {wishlist.length > 0 ? (
            <>
              {/* Top Action */}
              <div className="mb-7 flex flex-col justify-between gap-4 border-b border-[#081A33]/10 pb-5 sm:flex-row sm:items-center">

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#081A33]/40">
                    Wishlist Products
                  </p>

                  <h2 className="mt-1 text-xl font-black">
                    {wishlist.length}{" "}
                    {wishlist.length === 1
                      ? "Product"
                      : "Products"}{" "}
                    Saved
                  </h2>
                </div>

                <button
                  onClick={addAllToCart}
                  className="dpack-shine wishlist-button flex h-11 items-center justify-center gap-2 bg-[#081A33] px-5 text-xs font-black uppercase tracking-[0.08em] text-white hover:bg-[#F5A623] hover:text-[#081A33]"
                >
                  <ShoppingCart size={16} />
                  Add All To Cart
                </button>

              </div>

              {/* Product Grid */}
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                {wishlist.map((product, index) => (
                  <article
                    key={product._id || product.id}
                    className="wishlist-card border border-[#081A33]/10 bg-white"
                    style={{
                      animationDelay: `${index * 80}ms`,
                    }}
                  >

                    {/* Image */}
                    <div className="relative aspect-square overflow-hidden bg-[#F3F5F7]">

                      <Link href={`/products/${product.slug || ""}`}>
                        <Image
                          src={product.image || "/images/placeholder.png"}
                          alt={product.name}
                          fill
                          className="wishlist-image object-contain p-7"
                          unoptimized
                        />
                      </Link>

                      {/* Wishlist Button */}
                      <button
                        type="button"
                        onClick={() =>
                          removeItem(product._id || product.id)
                        }
                        aria-label="Remove from wishlist"
                        className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center border border-[#081A33]/10 bg-white text-[#081A33]/60 shadow-sm transition hover:bg-[#081A33] hover:text-white"
                      >
                        <Heart
                          size={16}
                          className="fill-[#F5A623] text-[#F5A623]"
                        />
                      </button>

                      {/* Sale Badge */}
                      {Number(product.compareAtPrice || product.oldPrice || 0) > Number(product.price || 0) && (
                        <div className="absolute left-3 top-3 bg-[#F5A623] px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.1em] text-[#081A33]">
                          Save ₹{(Number(product.compareAtPrice || product.oldPrice) - Number(product.price || 0)).toLocaleString("en-IN")}
                        </div>
                      )}

                    </div>

                    {/* Product Content */}
                    <div className="p-5">

                      <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#F5A623]">
                        {product.category}
                      </p>

                      <Link
                        href={`/products/${product.slug || ""}`}
                        className="mt-1 block"
                      >
                        <h3 className="line-clamp-1 text-base font-black text-[#081A33] transition hover:text-[#F5A623]">
                          {product.name}
                        </h3>
                      </Link>

                      <p className="mt-1 text-[10px] font-medium text-[#081A33]/35">
                        SKU: {product.sku || product.slug}
                      </p>

                      {/* Rating */}
                      <div className="mt-3 flex items-center gap-2">

                        <div className="flex items-center gap-0.5">
                          {[1, 2, 3, 4, 5].map(
                            (star) => (
                              <Star
                                key={star}
                                size={12}
                                className="fill-[#F5A623] text-[#F5A623]"
                              />
                            )
                          )}
                        </div>

                        <span className="text-[10px] font-bold text-[#081A33]/40">
                          {product.rating || "—"} ({product.reviews || 0})
                        </span>

                      </div>

                      {/* Price */}
                      <div className="mt-4 flex items-end gap-2">

                        <span className="text-xl font-black text-[#081A33]">
                          ₹
                          {Number(product.price || 0).toLocaleString(
                            "en-IN"
                          )}
                        </span>

                        {Number(product.compareAtPrice || product.oldPrice || 0) > Number(product.price || 0) && (
                          <span className="pb-0.5 text-xs font-medium text-[#081A33]/30 line-through">
                            ₹{Number(product.compareAtPrice || product.oldPrice).toLocaleString("en-IN")}
                          </span>
                        )}

                      </div>

                      {/* Add Cart */}
                      <button
                        type="button"
                        onClick={() => addToCart(product)}
                        className="dpack-shine wishlist-button mt-5 flex h-11 w-full items-center justify-center gap-2 bg-[#F5A623] text-xs font-black uppercase tracking-[0.08em] text-[#081A33] hover:bg-[#081A33] hover:text-white"
                      >
                        <ShoppingCart size={15} />
                        Add To Cart
                      </button>

                      {/* Remove */}
                      <button
                        type="button"
                        onClick={() =>
                          removeItem(product._id || product.id)
                        }
                        className="wishlist-button mt-3 flex w-full items-center justify-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.08em] text-[#081A33]/35 hover:text-red-500"
                      >
                        <Trash2 size={13} />
                        Remove From Wishlist
                      </button>

                    </div>
                  </article>
                ))}

              </div>
            </>
          ) : (
            /* =================================================
               EMPTY WISHLIST
            ================================================== */
            <div className="flex min-h-[480px] items-center justify-center">

              <div className="w-full max-w-lg border border-[#081A33]/10 bg-white p-8 text-center shadow-[0_15px_50px_rgba(8,26,51,0.06)] sm:p-12">

                <div className="dpack-float mx-auto flex h-20 w-20 items-center justify-center bg-[#081A33]">
                  <Heart
                    size={34}
                    className="text-[#F5A623]"
                  />
                </div>

                <p className="mt-7 text-[10px] font-bold uppercase tracking-[0.2em] text-[#F5A623]">
                  Your Wishlist
                </p>

                <h2 className="mt-2 text-2xl font-black sm:text-3xl">
                  Your Wishlist Is Empty
                </h2>

                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#081A33]/50">
                  You haven&apos;t saved any products yet. Explore
                  our packaging solutions and add your favourite
                  products to your wishlist.
                </p>

                <Link
                  href="/products"
                  className="dpack-shine mt-7 inline-flex h-12 items-center justify-center gap-2 bg-[#F5A623] px-7 text-xs font-black uppercase tracking-[0.08em] text-[#081A33] transition hover:bg-[#081A33] hover:text-white"
                >
                  <ShoppingBag size={16} />
                  Explore Products
                  <ArrowRight size={16} />
                </Link>

              </div>
            </div>
          )}

        </section>

        {/* =====================================================
            TRUST STRIP
        ====================================================== */}
        <section className="border-y border-[#081A33]/10 bg-white">

          <div className="mx-auto grid max-w-7xl md:grid-cols-3">

            {/* Item 1 */}
            <div className="flex items-center gap-4 border-b border-[#081A33]/10 px-5 py-6 sm:px-8 md:border-b-0 md:border-r lg:px-10">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-[#081A33]">
                <Truck
                  size={19}
                  className="text-[#F5A623]"
                />
              </div>

              <div>
                <h3 className="text-xs font-black uppercase tracking-[0.08em]">
                  Fast Delivery
                </h3>

                <p className="mt-1 text-[10px] text-[#081A33]/45">
                  Reliable shipping across India
                </p>
              </div>

            </div>

            {/* Item 2 */}
            <div className="flex items-center gap-4 border-b border-[#081A33]/10 px-5 py-6 sm:px-8 md:border-b-0 md:border-r lg:px-10">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-[#081A33]">
                <ShieldCheck
                  size={19}
                  className="text-[#F5A623]"
                />
              </div>

              <div>
                <h3 className="text-xs font-black uppercase tracking-[0.08em]">
                  Secure Shopping
                </h3>

                <p className="mt-1 text-[10px] text-[#081A33]/45">
                  Safe and secure checkout
                </p>
              </div>

            </div>

            {/* Item 3 */}
            <div className="flex items-center gap-4 px-5 py-6 sm:px-8 lg:px-10">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-[#081A33]">
                <PackageCheck
                  size={19}
                  className="text-[#F5A623]"
                />
              </div>

              <div>
                <h3 className="text-xs font-black uppercase tracking-[0.08em]">
                  Quality Products
                </h3>

                <p className="mt-1 text-[10px] text-[#081A33]/45">
                  Packaging built for protection
                </p>
              </div>

            </div>

          </div>

        </section>

        {/* =====================================================
            BOTTOM CTA
        ====================================================== */}
        <section className="bg-[#081A33]">

          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-5 py-9 text-center sm:px-8 md:flex-row md:text-left lg:px-10">

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#F5A623]">
                Need Packaging Solutions?
              </p>

              <h2 className="mt-1 text-xl font-black text-white sm:text-2xl">
                Find the right protection for your products.
              </h2>
            </div>

            <Link
              href="/products"
              className="dpack-shine flex h-11 shrink-0 items-center gap-2 bg-[#F5A623] px-6 text-xs font-black uppercase tracking-[0.08em] text-[#081A33] transition hover:bg-white"
            >
              Browse Products
              <ArrowRight size={16} />
            </Link>

          </div>

        </section>

      </main>
    </>
  );
}