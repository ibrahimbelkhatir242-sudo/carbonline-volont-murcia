import { Metadata } from "next";
import CheckoutForm from "@/components/CheckoutForm";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your order — Carbonline carbon fiber steering wheels.",
};

export default function CheckoutPage() {
  return (
    <main className="container-x py-16 md:py-24">
      <div className="max-w-2xl mb-12">
        <p className="spec-label mb-3">REF. 09 / CHECKOUT</p>
        <h1 className="font-display font-800 uppercase text-4xl md:text-6xl text-bone">
          Checkout
        </h1>
      </div>
      <CheckoutForm />
    </main>
  );
}
