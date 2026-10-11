"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import {
  cartCount,
  cartSubtotal,
  formatINR,
  removeFromCart,
  updateQty,
  useCart,
} from "@/lib/cartBus";

export default function CartDrawer() {
  const cart = useCart();
  const [open, setOpen] = useState(false);
  const itemCount = cartCount(cart);
  const subtotal = cartSubtotal(cart);

  useEffect(() => {
    const openCart = () => setOpen(true);
    window.addEventListener("cart:open", openCart);
    return () => window.removeEventListener("cart:open", openCart);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

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
                <Link
                  href="/checkout"
                  onClick={() => setOpen(false)}
                  className="mt-5 flex h-12 w-full items-center justify-center gap-2 bg-[#081A33] text-[11px] font-black uppercase tracking-wide text-white hover:bg-[#F5A623] hover:text-[#081A33]"
                >
                  Proceed to checkout <ArrowRight size={15} />
                </Link>
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
        </>
      )}
    </AnimatePresence>
  );
}
