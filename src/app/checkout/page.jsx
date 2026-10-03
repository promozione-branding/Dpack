"use client";

import { useState } from "react";
import {
  ChevronRight,
  MapPin,
  Truck,
  ShieldCheck,
  CreditCard,
  WalletCards,
  Banknote,
  Check,
  LockKeyhole,
  ArrowRight,
  ShoppingBag,
  Minus,
  Plus,
} from "lucide-react";

const initialItems = [
  {
    id: 1,
    name: "Air Column Bag",
    sku: "ACB-001",
    price: 1499,
    image: "/Air column bag (2).webp",
    quantity: 1,
  },
  {
    id: 2,
    name: "Dunnage Air Bag",
    sku: "DAB-001",
    price: 1299,
    image: "/Dunnage.webp",
    quantity: 2,
  },
];

export default function CheckoutPage() {
  const [items, setItems] = useState(initialItems);

  const [paymentMethod, setPaymentMethod] = useState("cod");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [errors, setErrors] = useState({});

  const updateQuantity = (id, type) => {
    setItems((currentItems) =>
      currentItems.map((item) => {
        if (item.id !== id) return item;

        return {
          ...item,
          quantity:
            type === "increase"
              ? item.quantity + 1
              : Math.max(1, item.quantity - 1),
        };
      })
    );
  };

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shipping = subtotal >= 3000 ? 0 : 99;

  const total = subtotal + shipping;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!form.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email address is required";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!form.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!form.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!form.state.trim()) {
      newErrors.state = "State is required";
    }

    if (!form.pincode.trim()) {
      newErrors.pincode = "Pincode is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const placeOrder = () => {
    if (!validateForm()) {
      window.scrollTo({
        top: 250,
        behavior: "smooth",
      });

      return;
    }

    alert("Order placed successfully!");
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#F7F8FA] text-[#1d2939]">

      {/* =====================================================
          ANIMATIONS
      ===================================================== */}

      <style jsx global>{`
        @keyframes checkoutFadeUp {
          from {
            opacity: 0;
            transform: translateY(25px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes checkoutFloat {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-7px);
          }
        }

        @keyframes checkoutShine {
          0% {
            left: -100%;
          }

          100% {
            left: 120%;
          }
        }

        .checkout-fade {
          animation: checkoutFadeUp 0.7s ease-out both;
        }

        .checkout-float {
          animation: checkoutFloat 4s ease-in-out infinite;
        }

        .checkout-shine {
          position: relative;
          overflow: hidden;
        }

        .checkout-shine::after {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 40%;
          height: 100%;
          transform: skewX(-20deg);
          background: rgba(255, 255, 255, 0.22);
        }

        .checkout-shine:hover::after {
          animation: checkoutShine 0.8s ease;
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

          <a
            href="/"
            className="font-semibold text-[#081A33] transition-colors hover:text-[#F5A623]"
          >
            Home
          </a>

          <ChevronRight size={15} />

          <a
            href="/cart"
            className="font-semibold text-[#081A33] transition-colors hover:text-[#F5A623]"
          >
            Cart
          </a>

          <ChevronRight size={15} />

          <span className="font-medium text-[#081A33]">
            Checkout
          </span>

        </div>
      </div>

      {/* =====================================================
          CHECKOUT HEADER
      ===================================================== */}

      <section className="relative overflow-hidden bg-[#081A33]">

        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#F5A623]/10 blur-3xl" />

        <div className="absolute -bottom-32 left-20 h-80 w-80 rounded-full bg-[#F5A623]/5 blur-3xl" />

        <div className="relative mx-auto max-w-[1400px] px-5 py-14">

          <div className="checkout-fade flex flex-col justify-between gap-6 sm:flex-row sm:items-end">

            <div>

              <span className="mb-3 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-[#F5A623]">
                <span className="h-[2px] w-8 bg-[#F5A623]" />
                DPACK Checkout
              </span>

              <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
                Complete Your Order
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-7 text-white/60 sm:text-base">
                Enter your delivery details, choose your preferred payment
                method and place your order securely.
              </p>

            </div>

            <div className="flex h-16 w-16 items-center justify-center bg-[#F5A623] text-[#081A33] shadow-xl">
              <LockKeyhole size={28} />
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          CHECKOUT CONTENT
      ===================================================== */}

      <section className="mx-auto max-w-[1400px] px-5 py-10 lg:py-14">

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_390px]">

          {/* =================================================
              LEFT SIDE
          ================================================= */}

          <div className="checkout-fade space-y-7">

            {/* =================================================
                CONTACT INFORMATION
            ================================================= */}

            <section className="border border-gray-200 bg-white">

              <div className="border-b border-gray-200 p-6 sm:p-7">

                <div className="flex items-start gap-4">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-[#081A33] text-[#F5A623]">
                    <Check size={20} strokeWidth={3} />
                  </div>

                  <div>

                    <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#F5A623]">
                      Step 01
                    </span>

                    <h2 className="mt-1 text-2xl font-black text-[#081A33]">
                      Contact Information
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      Enter your contact details for order updates.
                    </p>

                  </div>

                </div>

              </div>

              <div className="p-6 sm:p-7">

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                  {/* FIRST NAME */}

                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#081A33]">
                      First Name *
                    </label>

                    <input
                      type="text"
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      placeholder="Enter first name"
                      className={`h-12 w-full border bg-white px-4 text-sm outline-none transition-all focus:border-[#F5A623] ${
                        errors.firstName
                          ? "border-red-400"
                          : "border-gray-300"
                      }`}
                    />

                    {errors.firstName && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  {/* LAST NAME */}

                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#081A33]">
                      Last Name *
                    </label>

                    <input
                      type="text"
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      placeholder="Enter last name"
                      className={`h-12 w-full border bg-white px-4 text-sm outline-none transition-all focus:border-[#F5A623] ${
                        errors.lastName
                          ? "border-red-400"
                          : "border-gray-300"
                      }`}
                    />

                    {errors.lastName && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.lastName}
                      </p>
                    )}
                  </div>

                  {/* EMAIL */}

                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#081A33]">
                      Email Address *
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className={`h-12 w-full border bg-white px-4 text-sm outline-none transition-all focus:border-[#F5A623] ${
                        errors.email
                          ? "border-red-400"
                          : "border-gray-300"
                      }`}
                    />

                    {errors.email && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* PHONE */}

                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#081A33]">
                      Phone Number *
                    </label>

                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 XXXXX XXXXX"
                      className={`h-12 w-full border bg-white px-4 text-sm outline-none transition-all focus:border-[#F5A623] ${
                        errors.phone
                          ? "border-red-400"
                          : "border-gray-300"
                      }`}
                    />

                    {errors.phone && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                </div>

              </div>
            </section>

            {/* =================================================
                SHIPPING ADDRESS
            ================================================= */}

            <section className="border border-gray-200 bg-white">

              <div className="border-b border-gray-200 p-6 sm:p-7">

                <div className="flex items-start gap-4">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-[#081A33] text-[#F5A623]">
                    <MapPin size={20} />
                  </div>

                  <div>

                    <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#F5A623]">
                      Step 02
                    </span>

                    <h2 className="mt-1 text-2xl font-black text-[#081A33]">
                      Delivery Address
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      Where should we deliver your order?
                    </p>

                  </div>

                </div>

              </div>

              <div className="p-6 sm:p-7">

                <div className="space-y-5">

                  {/* ADDRESS */}

                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#081A33]">
                      Street Address *
                    </label>

                    <input
                      type="text"
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      placeholder="House / Flat / Street address"
                      className={`h-12 w-full border bg-white px-4 text-sm outline-none transition-all focus:border-[#F5A623] ${
                        errors.address
                          ? "border-red-400"
                          : "border-gray-300"
                      }`}
                    />

                    {errors.address && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.address}
                      </p>
                    )}
                  </div>

                  {/* APARTMENT */}

                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#081A33]">
                      Apartment / Landmark
                      <span className="ml-1 font-normal text-gray-400">
                        (Optional)
                      </span>
                    </label>

                    <input
                      type="text"
                      name="apartment"
                      value={form.apartment}
                      onChange={handleChange}
                      placeholder="Apartment, floor or landmark"
                      className="h-12 w-full border border-gray-300 bg-white px-4 text-sm outline-none transition-all focus:border-[#F5A623]"
                    />
                  </div>

                  {/* CITY / STATE / PINCODE */}

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">

                    <div>
                      <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#081A33]">
                        City *
                      </label>

                      <input
                        type="text"
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        placeholder="City"
                        className={`h-12 w-full border bg-white px-4 text-sm outline-none transition-all focus:border-[#F5A623] ${
                          errors.city
                            ? "border-red-400"
                            : "border-gray-300"
                        }`}
                      />

                      {errors.city && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.city}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#081A33]">
                        State *
                      </label>

                      <input
                        type="text"
                        name="state"
                        value={form.state}
                        onChange={handleChange}
                        placeholder="State"
                        className={`h-12 w-full border bg-white px-4 text-sm outline-none transition-all focus:border-[#F5A623] ${
                          errors.state
                            ? "border-red-400"
                            : "border-gray-300"
                        }`}
                      />

                      {errors.state && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.state}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#081A33]">
                        Pincode *
                      </label>

                      <input
                        type="text"
                        name="pincode"
                        value={form.pincode}
                        onChange={handleChange}
                        placeholder="110001"
                        maxLength={6}
                        className={`h-12 w-full border bg-white px-4 text-sm outline-none transition-all focus:border-[#F5A623] ${
                          errors.pincode
                            ? "border-red-400"
                            : "border-gray-300"
                        }`}
                      />

                      {errors.pincode && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.pincode}
                        </p>
                      )}
                    </div>

                  </div>

                </div>

              </div>
            </section>

            {/* =================================================
                SHIPPING METHOD
            ================================================= */}

            <section className="border border-gray-200 bg-white">

              <div className="border-b border-gray-200 p-6 sm:p-7">

                <div className="flex items-start gap-4">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-[#081A33] text-[#F5A623]">
                    <Truck size={20} />
                  </div>

                  <div>

                    <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#F5A623]">
                      Step 03
                    </span>

                    <h2 className="mt-1 text-2xl font-black text-[#081A33]">
                      Shipping Method
                    </h2>

                  </div>

                </div>

              </div>

              <div className="p-6 sm:p-7">

                <div className="border-2 border-[#F5A623] bg-[#FFF9EF] p-5">

                  <div className="flex items-center gap-4">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-[#081A33] text-[#F5A623]">
                      <Truck size={20} />
                    </div>

                    <div className="flex-1">

                      <div className="flex flex-wrap items-center justify-between gap-2">

                        <h3 className="font-black text-[#081A33]">
                          Standard Delivery
                        </h3>

                        <span className="font-black text-green-600">
                          {shipping === 0 ? "FREE" : `₹${shipping}`}
                        </span>

                      </div>

                      <p className="mt-1 text-xs leading-5 text-gray-500">
                        Reliable delivery service. Estimated delivery time
                        depends on your location.
                      </p>

                    </div>

                    <div className="flex h-6 w-6 items-center justify-center bg-[#F5A623] text-[#081A33]">
                      <Check size={14} strokeWidth={3} />
                    </div>

                  </div>

                </div>

              </div>
            </section>

            {/* =================================================
                PAYMENT
            ================================================= */}

            <section className="border border-gray-200 bg-white">

              <div className="border-b border-gray-200 p-6 sm:p-7">

                <div className="flex items-start gap-4">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-[#081A33] text-[#F5A623]">
                    <CreditCard size={20} />
                  </div>

                  <div>

                    <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#F5A623]">
                      Step 04
                    </span>

                    <h2 className="mt-1 text-2xl font-black text-[#081A33]">
                      Payment Method
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      Select your preferred payment option.
                    </p>

                  </div>

                </div>

              </div>

              <div className="space-y-3 p-6 sm:p-7">

                {/* COD */}

                <button
                  onClick={() => setPaymentMethod("cod")}
                  className={`flex w-full items-center gap-4 border p-5 text-left transition-all duration-300 ${
                    paymentMethod === "cod"
                      ? "border-[#F5A623] bg-[#FFF9EF]"
                      : "border-gray-200 hover:border-[#081A33]"
                  }`}
                >

                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center ${
                      paymentMethod === "cod"
                        ? "bg-[#F5A623] text-[#081A33]"
                        : "bg-[#081A33] text-[#F5A623]"
                    }`}
                  >
                    <Banknote size={21} />
                  </div>

                  <div className="flex-1">

                    <h3 className="font-black text-[#081A33]">
                      Cash on Delivery
                    </h3>

                    <p className="mt-1 text-xs text-gray-500">
                      Pay when your order is delivered.
                    </p>

                  </div>

                  <div
                    className={`flex h-5 w-5 items-center justify-center border ${
                      paymentMethod === "cod"
                        ? "border-[#F5A623] bg-[#F5A623]"
                        : "border-gray-300"
                    }`}
                  >
                    {paymentMethod === "cod" && (
                      <Check size={12} strokeWidth={4} />
                    )}
                  </div>

                </button>

                {/* ONLINE */}

                <button
                  onClick={() => setPaymentMethod("online")}
                  className={`flex w-full items-center gap-4 border p-5 text-left transition-all duration-300 ${
                    paymentMethod === "online"
                      ? "border-[#F5A623] bg-[#FFF9EF]"
                      : "border-gray-200 hover:border-[#081A33]"
                  }`}
                >

                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center ${
                      paymentMethod === "online"
                        ? "bg-[#F5A623] text-[#081A33]"
                        : "bg-[#081A33] text-[#F5A623]"
                    }`}
                  >
                    <WalletCards size={21} />
                  </div>

                  <div className="flex-1">

                    <h3 className="font-black text-[#081A33]">
                      Online Payment
                    </h3>

                    <p className="mt-1 text-xs text-gray-500">
                      Secure payment through available online methods.
                    </p>

                  </div>

                  <div
                    className={`flex h-5 w-5 items-center justify-center border ${
                      paymentMethod === "online"
                        ? "border-[#F5A623] bg-[#F5A623]"
                        : "border-gray-300"
                    }`}
                  >
                    {paymentMethod === "online" && (
                      <Check size={12} strokeWidth={4} />
                    )}
                  </div>

                </button>

                {/* BANK */}

                <button
                  onClick={() => setPaymentMethod("bank")}
                  className={`flex w-full items-center gap-4 border p-5 text-left transition-all duration-300 ${
                    paymentMethod === "bank"
                      ? "border-[#F5A623] bg-[#FFF9EF]"
                      : "border-gray-200 hover:border-[#081A33]"
                  }`}
                >

                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center ${
                      paymentMethod === "bank"
                        ? "bg-[#F5A623] text-[#081A33]"
                        : "bg-[#081A33] text-[#F5A623]"
                    }`}
                  >
                    <CreditCard size={21} />
                  </div>

                  <div className="flex-1">

                    <h3 className="font-black text-[#081A33]">
                      Bank Transfer
                    </h3>

                    <p className="mt-1 text-xs text-gray-500">
                      Complete payment through direct bank transfer.
                    </p>

                  </div>

                  <div
                    className={`flex h-5 w-5 items-center justify-center border ${
                      paymentMethod === "bank"
                        ? "border-[#F5A623] bg-[#F5A623]"
                        : "border-gray-300"
                    }`}
                  >
                    {paymentMethod === "bank" && (
                      <Check size={12} strokeWidth={4} />
                    )}
                  </div>

                </button>

              </div>
            </section>

          </div>

          {/* =================================================
              RIGHT ORDER SUMMARY
          ================================================= */}

          <aside className="checkout-fade lg:sticky lg:top-5 lg:self-start">

            <div className="overflow-hidden border border-gray-200 bg-white shadow-sm">

              {/* HEADER */}

              <div className="relative overflow-hidden bg-[#081A33] p-6">

                <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#F5A623]/10 blur-2xl" />

                <div className="relative flex items-center justify-between">

                  <div>

                    <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#F5A623]">
                      Your Cart
                    </span>

                    <h2 className="mt-1 text-2xl font-black text-white">
                      Order Summary
                    </h2>

                  </div>

                  <ShoppingBag
                    size={24}
                    className="text-[#F5A623]"
                  />

                </div>

              </div>

              {/* PRODUCTS */}

              <div className="border-b border-gray-200 p-5">

                <div className="space-y-4">

                  {items.map((item) => (

                    <div
                      key={item.id}
                      className="group flex gap-4 border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                    >

                      <div className="relative flex h-[75px] w-[75px] shrink-0 items-center justify-center bg-[#F7F9FB]">

                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-contain p-2 transition-transform duration-300 group-hover:scale-110"
                        />

                        <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center bg-[#F5A623] text-[10px] font-black text-[#081A33]">
                          {item.quantity}
                        </span>

                      </div>

                      <div className="min-w-0 flex-1">

                        <h3 className="truncate text-sm font-black text-[#081A33]">
                          {item.name}
                        </h3>

                        <p className="mt-1 text-xs text-gray-400">
                          SKU: {item.sku}
                        </p>

                        <div className="mt-2 flex items-center justify-between gap-3">

                          <div className="flex h-8 border border-gray-200">

                            <button
                              onClick={() =>
                                updateQuantity(item.id, "decrease")
                              }
                              className="flex w-7 items-center justify-center text-gray-500 hover:bg-[#081A33] hover:text-white"
                            >
                              <Minus size={11} />
                            </button>

                            <span className="flex w-8 items-center justify-center border-x border-gray-200 text-xs font-bold">
                              {item.quantity}
                            </span>

                            <button
                              onClick={() =>
                                updateQuantity(item.id, "increase")
                              }
                              className="flex w-7 items-center justify-center text-gray-500 hover:bg-[#081A33] hover:text-white"
                            >
                              <Plus size={11} />
                            </button>

                          </div>

                          <span className="text-sm font-black text-[#081A33]">
                            ₹
                            {(item.price * item.quantity).toLocaleString(
                              "en-IN"
                            )}
                          </span>

                        </div>

                      </div>

                    </div>

                  ))}

                </div>

              </div>

              {/* PRICE */}

              <div className="p-6">

                <div className="space-y-4">

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      Subtotal
                    </span>

                    <span className="font-bold text-[#081A33]">
                      ₹{subtotal.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      Shipping
                    </span>

                    <span
                      className={
                        shipping === 0
                          ? "font-bold text-green-600"
                          : "font-bold text-[#081A33]"
                      }
                    >
                      {shipping === 0 ? "FREE" : `₹${shipping}`}
                    </span>
                  </div>

                </div>

                {/* TOTAL */}

                <div className="mt-5 border-t-2 border-[#081A33] pt-5">

                  <div className="flex items-end justify-between">

                    <div>

                      <span className="text-xs font-bold uppercase tracking-wide text-gray-400">
                        Total
                      </span>

                      <p className="mt-1 text-3xl font-black text-[#081A33]">
                        ₹{total.toLocaleString("en-IN")}
                      </p>

                    </div>

                    <span className="bg-[#FFF6E5] px-3 py-2 text-[10px] font-bold uppercase tracking-wide text-[#081A33]">
                      INR
                    </span>

                  </div>

                </div>

                {/* PLACE ORDER */}

                <button
                  onClick={placeOrder}
                  className="checkout-shine mt-6 flex h-14 w-full items-center justify-center gap-3 bg-[#F5A623] text-sm font-black uppercase tracking-wide text-[#081A33] transition-all duration-300 hover:-translate-y-1 hover:bg-[#ffb735] hover:shadow-xl"
                >
                  Place Order
                  <ArrowRight size={18} />
                </button>

                {/* SECURITY */}

                <div className="mt-5 flex items-start gap-3 border border-gray-200 bg-[#F7F8FA] p-4">

                  <ShieldCheck
                    size={18}
                    className="mt-0.5 shrink-0 text-[#F5A623]"
                  />

                  <div>

                    <p className="text-xs font-bold text-[#081A33]">
                      Secure Checkout
                    </p>

                    <p className="mt-1 text-[11px] leading-5 text-gray-500">
                      Your personal and order information is protected.
                    </p>

                  </div>

                </div>

              </div>

            </div>

            {/* BACK TO CART */}

            <a
              href="/cart"
              className="group mt-5 flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-wide text-[#081A33] transition-colors hover:text-[#F5A623]"
            >
              <ChevronRight
                size={17}
                className="rotate-180 transition-transform group-hover:-translate-x-1"
              />

              Back to Cart
            </a>

          </aside>

        </div>

      </section>

      {/* =====================================================
          BOTTOM TRUST SECTION
      ===================================================== */}

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
              Get your packaging products delivered safely to your location.
            </p>

          </div>

          <div className="group border-b border-white/10 p-7 transition-colors hover:bg-white/5 md:border-b-0 md:border-r">

            <ShieldCheck
              size={24}
              className="text-[#F5A623] transition-transform duration-300 group-hover:scale-110"
            />

            <h3 className="mt-4 text-lg font-black text-white">
              Quality Assurance
            </h3>

            <p className="mt-2 text-sm leading-6 text-white/50">
              Packaging solutions selected for dependable everyday use.
            </p>

          </div>

          <div className="group p-7 transition-colors hover:bg-white/5">

            <LockKeyhole
              size={24}
              className="text-[#F5A623] transition-transform duration-300 group-hover:-translate-y-1"
            />

            <h3 className="mt-4 text-lg font-black text-white">
              Secure Checkout
            </h3>

            <p className="mt-2 text-sm leading-6 text-white/50">
              Your checkout information is handled securely.
            </p>

          </div>

        </div>

      </section>

    </main>
  );
}