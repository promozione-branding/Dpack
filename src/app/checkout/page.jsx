"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { ordersAPI, paymentsAPI } from "@/lib/apiClient";
import { clearCart, updateQty, useCart } from "@/lib/cartBus";
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

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCart();
  const { user, isLoggedIn, hydrated } = useAuth();

  const [paymentMethod, setPaymentMethod] = useState("online");
  const [submitting, setSubmitting] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");
  const [orderComplete, setOrderComplete] = useState(false);

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

  const nameParts = (user?.name || "").split(/\s+/);
  const checkoutValues = {
    ...form,
    firstName: form.firstName || nameParts[0] || "",
    lastName: form.lastName || nameParts.slice(1).join(" "),
    email: form.email || user?.email || "",
    phone: form.phone || user?.mobile || "",
    address: form.address || user?.address?.line1 || "",
    apartment: form.apartment || user?.address?.line2 || "",
    city: form.city || user?.address?.city || "",
    state: form.state || user?.address?.state || "",
    pincode: form.pincode || user?.address?.pincode || "",
  };

  const updateQuantity = (id, type) => {
    const item = items.find((entry) => entry.key === id);
    if (item) updateQty(id, type === "increase" ? item.qty + 1 : Math.max(1, item.qty - 1));
  };

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.qty,
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

    if (!checkoutValues.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!checkoutValues.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!checkoutValues.email.trim()) {
      newErrors.email = "Email address is required";
    }

    if (!checkoutValues.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!checkoutValues.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!checkoutValues.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!checkoutValues.state.trim()) {
      newErrors.state = "State is required";
    }

    if (!checkoutValues.pincode.trim()) {
      newErrors.pincode = "Pincode is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const placeOrder = async () => {
    setCheckoutError("");
    if (!items.length) {
      setCheckoutError("Your cart is empty. Add a product before checkout.");
      return;
    }
    if (!isLoggedIn) {
      setCheckoutError("Please sign in before placing your order.");
      return;
    }
    if (paymentMethod !== "online") {
      setCheckoutError("Only online payment is currently available.");
      return;
    }
    if (!validateForm()) {
      window.scrollTo({
        top: 250,
        behavior: "smooth",
      });

      return;
    }

    setSubmitting(true);
    try {
      const { order, razorpay } = await ordersAPI.create({
        items: items.map((item) => ({ productId: item.key, qty: item.qty })),
        customerName: `${checkoutValues.firstName} ${checkoutValues.lastName}`.trim(),
        customerEmail: checkoutValues.email,
        customerMobile: checkoutValues.phone,
        shippingAddress: {
          line1: checkoutValues.address,
          line2: checkoutValues.apartment,
          city: checkoutValues.city,
          state: checkoutValues.state,
          pincode: checkoutValues.pincode,
          country: "India",
        },
        sameAsShipping: true,
      });

      if (!window.Razorpay) {
        await new Promise((resolve, reject) => {
          const script = document.createElement("script");
          script.src = "https://checkout.razorpay.com/v1/checkout.js";
          script.onload = resolve;
          script.onerror = () => reject(new Error("Unable to load secure payment checkout."));
          document.body.appendChild(script);
        });
      }
      if (!window.Razorpay) throw new Error("Secure payment checkout is unavailable.");

      const checkout = new window.Razorpay({
        key: razorpay.keyId,
        amount: razorpay.amount,
        currency: razorpay.currency,
        name: "DPack",
        description: "Packaging products order",
        order_id: razorpay.orderId,
        prefill: {
          name: `${checkoutValues.firstName} ${checkoutValues.lastName}`.trim(),
          email: checkoutValues.email,
          contact: checkoutValues.phone,
        },
        handler: async (response) => {
          try {
            await paymentsAPI.verify({
              orderId: order._id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            clearCart();
            setOrderComplete(true);
          } catch (error) {
            setCheckoutError(error.message || "Payment verification failed. Contact support before retrying.");
          }
        },
        modal: {
          ondismiss: () => {
            paymentsAPI.markFailed(order._id).catch((error) => {
              console.error("Unable to mark payment as failed:", error);
            });
          },
        },
      });
      checkout.open();
    } catch (error) {
      setCheckoutError(error.message || "Unable to start checkout. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!hydrated) {
    return (
      <main className="flex min-h-[50vh] items-center justify-center text-sm text-gray-500">
        Loading checkout…
      </main>
    );
  }

  if (orderComplete) {
    return (
      <main className="flex min-h-[60vh] flex-col items-center justify-center gap-4 bg-[#F7F8FA] px-5 text-center text-[#081A33]">
        <h1 className="text-3xl font-black">Payment successful</h1>
        <p className="text-sm text-gray-500">Your order has been confirmed.</p>
        <Link href="/my-account" className="bg-[#081A33] px-6 py-3 text-sm font-bold text-white">
          View your account
        </Link>
      </main>
    );
  }

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

          <Link
            href="/"
            className="font-semibold text-[#081A33] transition-colors hover:text-[#F5A623]"
          >
            Home
          </Link>

          <ChevronRight size={15} />

          <Link
            href="/cart"
            className="font-semibold text-[#081A33] transition-colors hover:text-[#F5A623]"
          >
            Cart
          </Link>

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
                      value={checkoutValues.firstName}
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
                      value={checkoutValues.lastName}
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
                      value={checkoutValues.email}
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
                      value={checkoutValues.phone}
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
                      value={checkoutValues.address}
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
                      value={checkoutValues.apartment}
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
                        value={checkoutValues.city}
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
                        value={checkoutValues.state}
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
                        value={checkoutValues.pincode}
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
                  disabled
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
                  disabled
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
                      key={item.key}
                      className="group flex gap-4 border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                    >

                      <div className="relative flex h-[75px] w-[75px] shrink-0 items-center justify-center bg-[#F7F9FB]">

                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-contain p-2 transition-transform duration-300 group-hover:scale-110"
                        />

                        <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center bg-[#F5A623] text-[10px] font-black text-[#081A33]">
                          {item.qty}
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
                                updateQuantity(item.key, "decrease")
                              }
                              className="flex w-7 items-center justify-center text-gray-500 hover:bg-[#081A33] hover:text-white"
                            >
                              <Minus size={11} />
                            </button>

                            <span className="flex w-8 items-center justify-center border-x border-gray-200 text-xs font-bold">
                              {item.qty}
                            </span>

                            <button
                              onClick={() =>
                                updateQuantity(item.key, "increase")
                              }
                              className="flex w-7 items-center justify-center text-gray-500 hover:bg-[#081A33] hover:text-white"
                            >
                              <Plus size={11} />
                            </button>

                          </div>

                          <span className="text-sm font-black text-[#081A33]">
                            ₹
                            {(item.price * item.qty).toLocaleString(
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

                {!isLoggedIn && (
                  <p className="mt-4 text-sm text-gray-600">
                    <Link href="/login?next=%2Fcheckout" className="font-semibold text-[#081A33] underline">
                      Sign in
                    </Link>{" "}
                    with your account before paying.
                  </p>
                )}
                {checkoutError && (
                  <p role="alert" className="mt-4 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {checkoutError}
                  </p>
                )}
                <button
                  onClick={placeOrder}
                  disabled={submitting || items.length === 0}
                  className="checkout-shine mt-6 flex h-14 w-full items-center justify-center gap-3 bg-[#F5A623] text-sm font-black uppercase tracking-wide text-[#081A33] transition-all duration-300 hover:-translate-y-1 hover:bg-[#ffb735] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {submitting ? "Starting payment…" : "Pay securely"}
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