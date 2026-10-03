"use client";

import Link from "next/link";
import { useState } from "react";
import { removeFromCart, updateQty, useCart } from "@/lib/cartBus";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  ChevronRight,
  Truck,
  ShieldCheck,
  Tag,
  X,
} from "lucide-react";

export default function CartPage() {
  const cart = useCart();
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  const updateQuantity = (id, type) => {
    const item = cart.find((entry) => entry.key === id);
    if (item) updateQty(id, type === "increase" ? item.qty + 1 : Math.max(1, item.qty - 1));
  };

  const removeItem = (id) => {
    removeFromCart(id);
  };

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  const shipping = subtotal >= 3000 ? 0 : 99;

  const discount = couponApplied ? 150 : 0;

  const total = subtotal + shipping - discount;

  const applyCoupon = () => {
    if (coupon.trim().length > 0) {
      setCouponApplied(true);
    }
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#F7F8FA] text-[#1d2939]">

      {/* =====================================================
          ANIMATIONS
      ===================================================== */}

      <style jsx global>{`
        @keyframes cartFadeUp {
          from {
            opacity: 0;
            transform: translateY(25px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes cartFloat {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-7px);
          }
        }

        @keyframes cartShine {
          0% {
            left: -100%;
          }

          100% {
            left: 120%;
          }
        }

        .cart-fade {
          animation: cartFadeUp 0.7s ease-out both;
        }

        .cart-float {
          animation: cartFloat 4s ease-in-out infinite;
        }

        .cart-shine {
          position: relative;
          overflow: hidden;
        }

        .cart-shine::after {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 40%;
          height: 100%;
          transform: skewX(-20deg);
          background: rgba(255, 255, 255, 0.2);
        }

        .cart-shine:hover::after {
          animation: cartShine 0.8s ease;
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      {/* =====================================================
          BREADCRUMB
      ===================================================== */}

      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-[1400px] items-center gap-2 px-5 py-4 text-sm text-gray-500">

          <Link
            href="/"
            className="font-semibold text-[#081A33] transition-colors hover:text-[#F5A623]"
          >
            Home
          </Link>

          <ChevronRight size={15} />

          <span className="font-medium text-[#081A33]">
            Shopping Cart
          </span>

        </div>
      </div>

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <section className="relative overflow-hidden bg-[#081A33]">

        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#F5A623]/10 blur-3xl" />

        <div className="absolute -bottom-32 left-20 h-80 w-80 rounded-full bg-[#F5A623]/5 blur-3xl" />

        <div className="relative mx-auto max-w-[1400px] px-5 py-14 sm:py-16">

          <div className="cart-fade flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

            <div>
              <span className="mb-3 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-[#F5A623]">
                <span className="h-[2px] w-8 bg-[#F5A623]" />
                DPACK Shopping
              </span>

              <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
                Your Shopping Cart
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-7 text-white/60 sm:text-base">
                Review your selected packaging products and proceed securely
                to checkout.
              </p>
            </div>

            <div className="flex h-16 w-16 items-center justify-center bg-[#F5A623] text-[#081A33] shadow-xl">
              <ShoppingBag size={28} />
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          CART CONTENT
      ===================================================== */}

      <section className="mx-auto max-w-[1400px] px-5 py-10 lg:py-14">

        {cart.length === 0 ? (

          /* =================================================
             EMPTY CART
          ================================================= */

          <div className="cart-fade border border-gray-200 bg-white px-5 py-20 text-center">

            <div className="cart-float mx-auto flex h-24 w-24 items-center justify-center bg-[#FFF6E5] text-[#F5A623]">
              <ShoppingBag size={40} />
            </div>

            <h2 className="mt-8 text-3xl font-black text-[#081A33]">
              Your Cart is Empty
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-gray-500">
              Looks like you haven&apos;t added any products to your cart yet.
              Explore our packaging solutions and find the right products
              for your requirements.
            </p>

            <Link
              href="/products"
              className="cart-shine mt-8 inline-flex h-14 items-center gap-3 bg-[#F5A623] px-8 text-sm font-black uppercase tracking-wide text-[#081A33] transition-all duration-300 hover:-translate-y-1 hover:bg-[#ffb735] hover:shadow-xl"
            >
              Continue Shopping
              <ArrowRight size={18} />
            </Link>

          </div>

        ) : (

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_390px]">

            {/* =================================================
                LEFT CART
            ================================================= */}

            <div className="cart-fade">

              {/* CART HEADER */}

              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">

                <div>
                  <h2 className="text-2xl font-black text-[#081A33]">
                    Cart Items
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    {cart.length} product
                    {cart.length > 1 ? "s" : ""} in your cart
                  </p>
                </div>

                <span className="bg-[#FFF6E5] px-4 py-2 text-xs font-bold uppercase tracking-wide text-[#081A33]">
                  Secure Cart
                </span>

              </div>

              {/* CART ITEMS */}

              <div className="space-y-4">

                {cart.map((item) => (

                  <div
                    key={item.key}
                    className="group relative border border-gray-200 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#F5A623] hover:shadow-lg sm:p-5"
                  >

                    <div className="grid grid-cols-[90px_1fr] gap-4 sm:grid-cols-[130px_1fr_auto] sm:gap-6">

                      {/* IMAGE */}

                      <div className="relative flex h-[110px] items-center justify-center overflow-hidden bg-[#F7F9FB] sm:h-[140px]">

                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-contain p-3 transition-transform duration-500 group-hover:scale-110"
                        />

                        <span className="absolute bottom-0 left-0 h-[3px] w-0 bg-[#F5A623] transition-all duration-500 group-hover:w-full" />
                      </div>

                      {/* INFO */}

                      <div className="flex min-w-0 flex-col justify-between">

                        <div>

                          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#F5A623]">
                            {item.category}
                          </span>

                          <h3 className="mt-1 text-lg font-black text-[#081A33] transition-colors group-hover:text-[#F5A623] sm:text-xl">
                            {item.name}
                          </h3>

                          <p className="mt-1 text-xs text-gray-400">
                            SKU: {item.sku || item.slug || item.key}
                          </p>

                          <div className="mt-3 flex items-center gap-2">
                            <span className="text-xl font-black text-[#081A33]">
                              ₹{Number(item.price || 0).toLocaleString("en-IN")}
                            </span>

                            <span className="text-xs text-gray-400">
                              / unit
                            </span>
                          </div>

                        </div>

                        {/* QUANTITY */}

                        <div className="mt-4 flex items-center gap-4">

                          <span className="text-xs font-bold uppercase tracking-wide text-gray-400">
                            Qty
                          </span>

                          <div className="flex h-10 border border-gray-300">

                            <button
                              onClick={() =>
                                updateQuantity(item.key, "decrease")
                              }
                              className="flex w-9 items-center justify-center text-[#081A33] transition-colors hover:bg-[#081A33] hover:text-white"
                            >
                              <Minus size={14} />
                            </button>

                            <span className="flex w-10 items-center justify-center border-x border-gray-300 text-sm font-bold text-[#081A33]">
                              {item.qty}
                            </span>

                            <button
                              onClick={() =>
                                updateQuantity(item.key, "increase")
                              }
                              className="flex w-9 items-center justify-center text-[#081A33] transition-colors hover:bg-[#081A33] hover:text-white"
                            >
                              <Plus size={14} />
                            </button>

                          </div>

                        </div>

                      </div>

                      {/* RIGHT */}

                      <div className="col-span-2 flex items-end justify-between border-t border-gray-100 pt-4 sm:col-span-1 sm:flex-col sm:items-end sm:justify-between sm:border-0 sm:pt-0">

                        <div className="text-right">

                          <span className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">
                            Total
                          </span>

                          <span className="mt-1 block text-xl font-black text-[#081A33]">
                            ₹
                            {(item.price * item.qty).toLocaleString(
                              "en-IN"
                            )}
                          </span>

                        </div>

                        <button
                          onClick={() => removeItem(item.key)}
                          className="group/remove flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-gray-400 transition-colors hover:text-red-500"
                        >
                          <Trash2
                            size={16}
                            className="transition-transform group-hover/remove:scale-110"
                          />
                          Remove
                        </button>

                      </div>

                    </div>

                  </div>

                ))}

              </div>

              {/* CONTINUE SHOPPING */}

              <div className="mt-5">

                <Link
                  href="/products"
                  className="group inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-[#081A33] transition-colors hover:text-[#F5A623]"
                >
                  <ChevronRight
                    size={17}
                    className="rotate-180 transition-transform group-hover:-translate-x-1"
                  />

                  Continue Shopping
                </Link>

              </div>

              {/* =================================================
                  TRUST STRIP
              ================================================= */}

              <div className="mt-8 grid grid-cols-1 border border-gray-200 bg-white sm:grid-cols-3">

                <div className="group flex items-center gap-4 border-b border-gray-200 p-5 transition-colors hover:bg-[#FFF8EA] sm:border-b-0 sm:border-r">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-[#081A33] text-[#F5A623] transition-transform duration-300 group-hover:-translate-y-1">
                    <Truck size={20} />
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-[#081A33]">
                      Fast Delivery
                    </h4>

                    <p className="mt-1 text-xs text-gray-500">
                      Quick dispatch
                    </p>
                  </div>

                </div>

                <div className="group flex items-center gap-4 border-b border-gray-200 p-5 transition-colors hover:bg-[#FFF8EA] sm:border-b-0 sm:border-r">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-[#081A33] text-[#F5A623] transition-transform duration-300 group-hover:-translate-y-1">
                    <ShieldCheck size={20} />
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-[#081A33]">
                      Secure Payment
                    </h4>

                    <p className="mt-1 text-xs text-gray-500">
                      Safe checkout
                    </p>
                  </div>

                </div>

                <div className="group flex items-center gap-4 p-5 transition-colors hover:bg-[#FFF8EA]">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-[#081A33] text-[#F5A623] transition-transform duration-300 group-hover:-translate-y-1">
                    <Tag size={20} />
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-[#081A33]">
                      Bulk Orders
                    </h4>

                    <p className="mt-1 text-xs text-gray-500">
                      Special pricing
                    </p>
                  </div>

                </div>

              </div>

            </div>

            {/* =================================================
                ORDER SUMMARY
            ================================================= */}

            <aside className="cart-fade lg:sticky lg:top-5 lg:self-start">

              <div className="overflow-hidden border border-gray-200 bg-white shadow-sm">

                {/* SUMMARY HEADER */}

                <div className="relative overflow-hidden bg-[#081A33] p-6">

                  <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#F5A623]/10 blur-2xl" />

                  <div className="relative">

                    <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#F5A623]">
                      Checkout
                    </span>

                    <h2 className="mt-2 text-2xl font-black text-white">
                      Order Summary
                    </h2>

                  </div>

                </div>

                {/* SUMMARY BODY */}

                <div className="p-6">

                  {/* SUBTOTAL */}

                  <div className="flex items-center justify-between border-b border-gray-100 pb-4">

                    <span className="text-sm text-gray-500">
                      Subtotal
                    </span>

                    <span className="font-bold text-[#081A33]">
                      ₹{subtotal.toLocaleString("en-IN")}
                    </span>

                  </div>

                  {/* SHIPPING */}

                  <div className="flex items-center justify-between border-b border-gray-100 py-4">

                    <span className="text-sm text-gray-500">
                      Shipping
                    </span>

                    {shipping === 0 ? (
                      <span className="text-sm font-bold text-green-600">
                        FREE
                      </span>
                    ) : (
                      <span className="font-bold text-[#081A33]">
                        ₹{shipping}
                      </span>
                    )}

                  </div>

                  {/* DISCOUNT */}

                  {couponApplied && (
                    <div className="flex items-center justify-between border-b border-gray-100 py-4">

                      <span className="text-sm text-gray-500">
                        Coupon Discount
                      </span>

                      <span className="font-bold text-green-600">
                        -₹{discount}
                      </span>

                    </div>
                  )}

                  {/* COUPON */}

                  <div className="mt-6">

                    <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#081A33]">
                      Have a Coupon?
                    </label>

                    <div className="flex h-12">

                      <input
                        type="text"
                        value={coupon}
                        onChange={(e) => {
                          setCoupon(e.target.value);
                          setCouponApplied(false);
                        }}
                        placeholder="Enter coupon code"
                        className="min-w-0 flex-1 border border-gray-300 bg-white px-4 text-sm outline-none transition-colors focus:border-[#F5A623]"
                      />

                      <button
                        onClick={applyCoupon}
                        className="bg-[#081A33] px-5 text-xs font-black uppercase tracking-wide text-white transition-colors hover:bg-[#F5A623] hover:text-[#081A33]"
                      >
                        Apply
                      </button>

                    </div>

                    {couponApplied && (
                      <p className="mt-2 text-xs font-semibold text-green-600">
                        Coupon applied successfully.
                      </p>
                    )}

                  </div>

                  {/* TOTAL */}

                  <div className="mt-7 border-t-2 border-[#081A33] pt-5">

                    <div className="flex items-end justify-between">

                      <div>
                        <span className="text-xs font-bold uppercase tracking-wide text-gray-400">
                          Total Amount
                        </span>

                        <p className="mt-1 text-3xl font-black text-[#081A33]">
                          ₹{total.toLocaleString("en-IN")}
                        </p>
                      </div>

                      <span className="bg-[#FFF6E5] px-3 py-2 text-[10px] font-bold uppercase tracking-wide text-[#081A33]">
                        Secure
                      </span>

                    </div>

                  </div>

                  {/* CHECKOUT */}

                 <Link
  href="/checkout"
  className="cart-shine mt-6 flex h-14 w-full items-center justify-center gap-3 bg-[#F5A623] text-sm font-black uppercase tracking-wide text-[#081A33] transition-all duration-300 hover:-translate-y-1 hover:bg-[#ffb735] hover:shadow-xl"
>
  Proceed to Checkout

  <ArrowRight
    size={18}
    className="transition-transform duration-300 group-hover:translate-x-1"
  />
</Link>

                  {/* PAYMENT NOTE */}

                  <div className="mt-5 flex items-start gap-3 border border-gray-200 bg-[#F7F8FA] p-4">

                    <ShieldCheck
                      size={18}
                      className="mt-0.5 shrink-0 text-[#F5A623]"
                    />

                    <p className="text-xs leading-5 text-gray-500">
                      Your order information is protected with secure
                      checkout processing.
                    </p>

                  </div>

                </div>

              </div>

            </aside>

          </div>
        )}

      </section>

      {/* =====================================================
          BOTTOM FEATURE BAND
      ===================================================== */}

      {cart.length > 0 && (
        <section className="bg-[#081A33]">

          <div className="mx-auto grid max-w-[1400px] grid-cols-1 md:grid-cols-3">

            <div className="group border-b border-white/10 p-7 transition-colors hover:bg-white/5 md:border-b-0 md:border-r">

              <Truck
                size={24}
                className="text-[#F5A623] transition-transform duration-300 group-hover:translate-x-1"
              />

              <h3 className="mt-4 text-lg font-black text-white">
                Reliable Delivery
              </h3>

              <p className="mt-2 text-sm leading-6 text-white/50">
                Packaging products delivered safely to your location.
              </p>

            </div>

            <div className="group border-b border-white/10 p-7 transition-colors hover:bg-white/5 md:border-b-0 md:border-r">

              <ShieldCheck
                size={24}
                className="text-[#F5A623] transition-transform duration-300 group-hover:scale-110"
              />

              <h3 className="mt-4 text-lg font-black text-white">
                Quality Products
              </h3>

              <p className="mt-2 text-sm leading-6 text-white/50">
                Packaging solutions designed for dependable protection.
              </p>

            </div>

            <div className="group p-7 transition-colors hover:bg-white/5">

              <ShoppingBag
                size={24}
                className="text-[#F5A623] transition-transform duration-300 group-hover:-translate-y-1"
              />

              <h3 className="mt-4 text-lg font-black text-white">
                Bulk Requirements
              </h3>

              <p className="mt-2 text-sm leading-6 text-white/50">
                Contact our team for larger quantity requirements and
                customized solutions.
              </p>

            </div>

          </div>

        </section>
      )}

    </main>
  );
}