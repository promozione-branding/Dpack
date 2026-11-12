"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Loader2, Minus, Phone, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";
import {
  cartCount,
  cartSubtotal,
  formatINR,
  removeFromCart,
  updateQty,
  useCart,
} from "@/lib/cartBus";

export default function CartDrawer() {
  const router = useRouter();
  const { user, hydrated, sendOtp, resetOtp, loginWithOtp } = useAuth();
  const cart = useCart();
  const [open, setOpen] = useState(false);
  const [checkoutAuthOpen, setCheckoutAuthOpen] = useState(false);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const itemCount = cartCount(cart);
  const subtotal = cartSubtotal(cart);

  useEffect(() => {
    const openCart = () => setOpen(true);
    window.addEventListener("cart:open", openCart);
    return () => window.removeEventListener("cart:open", openCart);
  }, []);

  useEffect(() => {
    if (!open && !checkoutAuthOpen) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        if (checkoutAuthOpen) {
          setCheckoutAuthOpen(false);
          setOtpSent(false);
          setOtp("");
          setAuthError("");
          resetOtp();
        } else {
          setOpen(false);
        }
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open, checkoutAuthOpen, resetOtp]);

  const proceedToCheckout = () => {
    if (user) {
      setOpen(false);
      router.push("/checkout");
      return;
    }

    setAuthError("");
    setCheckoutAuthOpen(true);
  };

  const handleCheckoutAuth = async (event) => {
    event.preventDefault();
    setAuthError("");
    setAuthLoading(true);

    try {
      if (!otpSent) {
        const normalizedName = name.trim();
        if (!normalizedName) throw new Error("Enter your name to continue.");
        if (!/^\d{10}$/.test(mobile)) {
          throw new Error("Enter a valid 10-digit mobile number.");
        }

        const result = await sendOtp(mobile, "checkout-recaptcha-container");
        if (!result.ok) throw new Error(result.error || "Could not send verification code.");
        setOtpSent(true);
      } else {
        if (!/^\d{6}$/.test(otp)) {
          throw new Error("Enter the 6-digit verification code.");
        }

        const result = await loginWithOtp(mobile, otp, name.trim());
        if (!result.ok) throw new Error(result.error || "Could not verify the code.");

        resetOtp();
        setCheckoutAuthOpen(false);
        setOpen(false);
        router.push("/checkout");
      }
    } catch (error) {
      setAuthError(error.message || "Could not continue to checkout.");
    } finally {
      setAuthLoading(false);
    }
  };

  const resetCheckoutAuth = () => {
    setCheckoutAuthOpen(false);
    setOtpSent(false);
    setOtp("");
    setAuthError("");
    resetOtp();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Close cart"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[9998] cursor-default bg-black/35 backdrop-blur-[1px]"
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed right-0 top-0 z-[9999] flex h-[100dvh] w-full max-w-[420px] flex-col bg-white shadow-[-15px_0_50px_rgba(0,0,0,0.16)]"
          >
            <header className="flex h-[74px] shrink-0 items-center justify-between border-b border-[#E3E7EB] px-6">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center bg-[#F7F8FA] text-[#081A33]">
                  <ShoppingBag size={17} />
                </span>
                <div>
                  <h2 className="text-[15px] font-black text-[#081A33]">Your cart</h2>
                  <p className="mt-0.5 text-[10px] text-gray-400">
                    {itemCount} {itemCount === 1 ? "item" : "items"}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close cart"
                className="flex h-9 w-9 items-center justify-center text-gray-400 transition hover:bg-[#F7F8FA] hover:text-[#081A33]"
              >
                <X size={18} />
              </button>
            </header>

            <div className="min-h-0 flex-1 overflow-y-auto">
              {cart.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center px-6 text-center">
                  <ShoppingBag size={30} className="text-[#081A33]" />
                  <h3 className="mt-5 text-base font-black text-[#081A33]">Your cart is empty</h3>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="mt-6 bg-[#081A33] px-6 py-3 text-[10px] font-black uppercase tracking-wide text-white hover:bg-[#F5A623] hover:text-[#081A33]"
                  >
                    Continue shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-3 p-5">
                  {cart.map((item) => (
                    <article key={item.key} className="flex gap-3 border border-[#E3E7EB] p-3">
                      <div className="flex h-[78px] w-[78px] shrink-0 items-center justify-center overflow-hidden bg-[#F7F8FA]">
                        {item.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={item.image} alt={item.name || "Product"} className="h-full w-full object-contain p-2" />
                        ) : (
                          <ShoppingBag size={22} className="text-gray-300" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <p className="line-clamp-2 text-[13px] font-bold leading-[1.35] text-[#081A33]">{item.name}</p>
                          <button
                            type="button"
                            aria-label={`Remove ${item.name} from cart`}
                            onClick={() => removeFromCart(item.key)}
                            className="flex h-7 w-7 shrink-0 items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-500"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <p className="mt-2 text-sm font-black text-[#081A33]">
                          {formatINR(Number(item.price || 0) * item.qty)}
                        </p>
                        <div className="mt-2 flex items-center">
                          <button
                            type="button"
                            aria-label="Decrease quantity"
                            onClick={() => updateQty(item.key, item.qty - 1)}
                            className="flex h-8 w-8 items-center justify-center border border-[#E1E5E8] text-[#081A33] hover:bg-[#081A33] hover:text-white"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="flex h-8 min-w-[42px] items-center justify-center border-y border-[#E1E5E8] px-2 text-[11px] font-black text-[#081A33]">
                            {item.qty}
                          </span>
                          <button
                            type="button"
                            aria-label="Increase quantity"
                            onClick={() => updateQty(item.key, item.qty + 1)}
                            className="flex h-8 w-8 items-center justify-center border border-[#E1E5E8] text-[#081A33] hover:bg-[#081A33] hover:text-white"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <footer className="shrink-0 border-t border-[#E3E7EB] px-6 pb-7 pt-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Subtotal</span>
                  <span className="text-xl font-black text-[#081A33]">{formatINR(subtotal)}</span>
                </div>
                <p className="mt-1 text-[10px] text-gray-400">Shipping and taxes calculated at checkout.</p>
                <button
                  type="button"
                  onClick={proceedToCheckout}
                  disabled={!hydrated}
                  className="mt-5 flex h-12 w-full items-center justify-center gap-2 bg-[#081A33] text-[11px] font-black uppercase tracking-wide text-white hover:bg-[#F5A623] hover:text-[#081A33] disabled:cursor-wait disabled:opacity-60"
                >
                  Proceed to checkout <ArrowRight size={15} />
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="mt-4 block w-full text-center text-[11px] font-bold text-gray-400 hover:text-[#081A33]"
                >
                  Continue shopping
                </button>
              </footer>
            )}
          </motion.aside>
          <AnimatePresence>
            {checkoutAuthOpen && (
              <>
                <motion.button
                  type="button"
                  aria-label="Close checkout sign-in"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={resetCheckoutAuth}
                  className="fixed inset-0 z-[10000] bg-black/50 backdrop-blur-sm"
                />
                <motion.div
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="checkout-auth-title"
                  initial={{ opacity: 0, y: 12, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 12, scale: 0.98 }}
                  className="fixed left-1/2 top-1/2 z-[10001] max-h-[90dvh] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 overflow-y-auto bg-white p-6 shadow-2xl sm:p-8"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#F5A623]">
                        Secure checkout
                      </p>
                      <h2 id="checkout-auth-title" className="mt-2 text-xl font-black text-[#081A33]">
                        {otpSent ? "Verify your mobile" : "Continue as a customer"}
                      </h2>
                      <p className="mt-2 text-sm leading-6 text-gray-500">
                        {otpSent
                          ? `Enter the verification code sent to +91 ${mobile}.`
                          : "Enter your name and mobile number to continue. We’ll verify your number and create an account if needed."}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={resetCheckoutAuth}
                      aria-label="Close"
                      className="flex h-9 w-9 shrink-0 items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-[#081A33]"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <form onSubmit={handleCheckoutAuth} className="mt-6 space-y-4">
                    {!otpSent ? (
                      <>
                        <div>
                          <label htmlFor="checkout-customer-name" className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#081A33]/60">
                            Name
                          </label>
                          <input
                            id="checkout-customer-name"
                            type="text"
                            autoComplete="name"
                            maxLength={100}
                            required
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            placeholder="Your name"
                            className="h-12 w-full border border-gray-200 px-4 text-sm text-[#081A33] outline-none focus:border-[#F5A623]"
                          />
                        </div>
                        <div>
                          <label htmlFor="checkout-customer-mobile" className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#081A33]/60">
                            Mobile number
                          </label>
                          <div className="flex h-12 items-center border border-gray-200 focus-within:border-[#F5A623]">
                            <span className="border-r border-gray-200 px-3 text-sm text-gray-500">+91</span>
                            <Phone size={16} className="ml-3 text-gray-400" />
                            <input
                              id="checkout-customer-mobile"
                              type="tel"
                              inputMode="numeric"
                              autoComplete="tel-national"
                              pattern="[0-9]{10}"
                              maxLength={10}
                              required
                              value={mobile}
                              onChange={(event) => setMobile(event.target.value.replace(/\D/g, ""))}
                              placeholder="10-digit number"
                              className="h-full min-w-0 flex-1 px-3 text-sm text-[#081A33] outline-none"
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <div>
                        <label htmlFor="checkout-customer-otp" className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#081A33]/60">
                          Verification code
                        </label>
                        <input
                          id="checkout-customer-otp"
                          type="text"
                          inputMode="numeric"
                          autoComplete="one-time-code"
                          pattern="[0-9]{6}"
                          maxLength={6}
                          required
                          value={otp}
                          onChange={(event) => setOtp(event.target.value.replace(/\D/g, ""))}
                          placeholder="6-digit code"
                          className="h-12 w-full border border-gray-200 px-4 text-sm tracking-[0.3em] text-[#081A33] outline-none focus:border-[#F5A623]"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setOtpSent(false);
                            setOtp("");
                            setAuthError("");
                          }}
                          className="mt-3 text-xs font-semibold text-gray-500 hover:text-[#081A33]"
                        >
                          Change name or mobile number
                        </button>
                      </div>
                    )}

                    {authError && (
                      <p role="alert" className="text-sm text-red-600">{authError}</p>
                    )}
                    <div id="checkout-recaptcha-container" />
                    <button
                      type="submit"
                      disabled={authLoading}
                      className="flex h-12 w-full items-center justify-center gap-2 bg-[#F5A623] px-4 text-xs font-black uppercase tracking-wide text-[#081A33] hover:bg-[#ffb735] disabled:cursor-wait disabled:opacity-60"
                    >
                      {authLoading ? (
                        <Loader2 size={17} className="animate-spin" />
                      ) : (
                        otpSent ? "Verify and continue" : "Continue"
                      )}
                      {!authLoading && <ArrowRight size={15} />}
                    </button>
                  </form>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
}
