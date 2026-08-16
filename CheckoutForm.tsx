"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/cart-context";
import { formatEUR } from "@/lib/format";

export default function CheckoutForm() {
  const { items, subtotal } = useCart();
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Intentionally not processing payment here.
    // Integration point: mount Stripe Elements / Payment Element in the "Payment" section below,
    // create a PaymentIntent server-side, and confirm it on submit instead of this placeholder.
    setSubmitted(true);
  }

  if (items.length === 0 && !submitted) {
    return (
      <div className="max-w-lg spec-frame border border-steel/60 bg-panel p-8">
        <p className="spec-label mb-3">Cart Empty</p>
        <h2 className="font-display font-700 uppercase text-2xl text-bone mb-4">
          Nothing To Check Out Yet
        </h2>
        <Link
          href="/shop"
          className="inline-flex items-center justify-center bg-signal hover:bg-signal-dim transition-colors text-bone font-medium tracking-wide px-6 py-3 text-sm uppercase"
        >
          Browse Steering Wheels
        </Link>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="max-w-lg spec-frame border border-steel/60 bg-panel p-8">
        <p className="spec-label mb-3">Order Received</p>
        <h2 className="font-display font-700 uppercase text-2xl text-bone mb-3">
          Thanks — We've Got Your Order
        </h2>
        <p className="text-sm text-muted leading-relaxed">
          This is a placeholder confirmation. Payment processing isn't connected yet — plug
          Stripe (or your provider of choice) into the Payment section of this form to go live.
        </p>
      </div>
    );
  }

  const shipping = 0;
  const total = subtotal + shipping;

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
      <div className="lg:col-span-2 space-y-12">
        <fieldset>
          <p className="spec-label mb-4">Contact Information</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Email" name="email" type="email" required />
            <Field label="Phone" name="phone" type="tel" />
          </div>
        </fieldset>

        <fieldset>
          <p className="spec-label mb-4">Shipping Address</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Full Name" name="name" type="text" required className="sm:col-span-2" />
            <Field label="Address" name="address" type="text" required className="sm:col-span-2" />
            <Field label="City" name="city" type="text" required />
            <Field label="Postal Code" name="postal" type="text" required />
            <Field label="Country" name="country" type="text" required className="sm:col-span-2" />
          </div>
        </fieldset>

        <fieldset>
          <p className="spec-label mb-4">Payment</p>
          <div className="border border-dashed border-steel-light p-6 bg-panel">
            <p className="text-sm text-muted leading-relaxed mb-4">
              Payment is not processed on this demo storefront. This panel is the integration
              point for Stripe Elements (or another provider) — mount your Payment Element here
              and confirm the PaymentIntent on submit.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 opacity-50 pointer-events-none">
              <Field label="Card Number" name="card" type="text" placeholder="•••• •••• •••• ••••" />
              <Field label="Expiry" name="expiry" type="text" placeholder="MM / YY" />
            </div>
          </div>
        </fieldset>
      </div>

      <div className="lg:col-span-1">
        <div className="spec-frame border border-steel/60 bg-panel p-6 lg:sticky lg:top-24">
          <p className="spec-label mb-5">Order Summary</p>
          <ul className="space-y-4 mb-5 max-h-72 overflow-y-auto">
            {items.map((item) => (
              <li key={item.id} className="flex gap-3">
                <div className="relative w-14 h-14 shrink-0 bg-void border border-steel/60">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-bone leading-snug">{item.name}</p>
                  <p className="text-[11px] text-muted mt-0.5">Qty {item.quantity}</p>
                </div>
                <span className="font-mono text-xs text-bone shrink-0">
                  {formatEUR(item.unitPrice * item.quantity)}
                </span>
              </li>
            ))}
          </ul>

          <div className="space-y-2 border-t border-steel/60 pt-4">
            <div className="flex justify-between text-sm text-muted">
              <span>Subtotal</span>
              <span className="font-mono">{formatEUR(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm text-muted">
              <span>Shipping</span>
              <span className="font-mono">Included</span>
            </div>
            <div className="flex justify-between text-base text-bone pt-2 border-t border-steel/60">
              <span>Total</span>
              <span className="font-mono">{formatEUR(total)}</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-6 bg-signal hover:bg-signal-dim transition-colors text-bone font-medium tracking-wide px-6 py-4 text-sm uppercase"
          >
            Place Order
          </button>
        </div>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type,
  required,
  placeholder,
  className = "",
}: {
  label: string;
  name: string;
  type: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="spec-label block mb-2">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full bg-panel border border-steel-light text-bone text-sm px-4 py-3 placeholder:text-muted"
      />
    </label>
  );
}
