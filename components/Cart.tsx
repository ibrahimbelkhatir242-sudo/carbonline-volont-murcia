"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/lib/cart-context";
import { formatEUR } from "@/lib/format";

const SHIPPING = 0; // included, per delivery policy

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-void/80 z-[60]"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
            className="fixed right-0 top-0 h-full w-full sm:w-[420px] bg-carbon border-l border-steel/60 z-[70] flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-steel/60">
              <span className="spec-label">Cart ({items.length})</span>
              <button onClick={closeCart} aria-label="Close cart" className="text-muted hover:text-bone">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <p className="text-sm text-muted mt-10 text-center">Your cart is empty.</p>
              ) : (
                <ul className="space-y-6">
                  {items.map((item) => (
                    <motion.li
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex gap-4"
                    >
                      <div className="relative w-20 h-20 shrink-0 bg-panel border border-steel/60">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-bone font-medium leading-snug">{item.name}</p>
                        {item.selectedOptions.length > 0 && (
                          <p className="text-xs text-muted mt-1 leading-relaxed">
                            {item.selectedOptions.map((o) => o.optionLabel).join(" · ")}
                          </p>
                        )}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-steel-light">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-6 h-6 text-bone text-xs"
                            >
                              –
                            </button>
                            <span className="w-6 text-center text-xs font-mono">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 text-bone text-xs"
                            >
                              +
                            </button>
                          </div>
                          <span className="font-mono text-sm text-bone">
                            {formatEUR(item.unitPrice * item.quantity)}
                          </span>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-[11px] uppercase tracking-wide text-muted hover:text-signal mt-2"
                        >
                          Remove
                        </button>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>

            <div className="border-t border-steel/60 px-6 py-5 space-y-2">
              <div className="flex justify-between text-sm text-muted">
                <span>Subtotal</span>
                <span className="font-mono">{formatEUR(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm text-muted">
                <span>Shipping</span>
                <span className="font-mono">{SHIPPING === 0 ? "Included" : formatEUR(SHIPPING)}</span>
              </div>
              <div className="flex justify-between text-base text-bone pt-2 border-t border-steel/60">
                <span>Total</span>
                <span className="font-mono">{formatEUR(subtotal + SHIPPING)}</span>
              </div>
              {items.length === 0 ? (
                <button
                  disabled
                  className="w-full mt-3 bg-signal opacity-40 cursor-not-allowed transition-colors text-bone font-medium tracking-wide px-6 py-4 text-sm uppercase"
                >
                  Proceed to Checkout
                </button>
              ) : (
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="block w-full mt-3 text-center bg-signal hover:bg-signal-dim transition-colors text-bone font-medium tracking-wide px-6 py-4 text-sm uppercase"
                >
                  Proceed to Checkout
                </Link>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
