import { Metadata } from "next";
import ShopBrowser from "@/components/ShopBrowser";

export const metadata: Metadata = {
  title: "Shop All Steering Wheels",
  description:
    "Browse the full Carbonline collection — carbon fiber steering wheels for Audi, BMW, Mercedes-Benz, and Porsche.",
};

export default function ShopPage() {
  return (
    <main className="container-x py-16 md:py-24">
      <div className="max-w-2xl mb-12">
        <p className="spec-label mb-3">Shop</p>
        <h1 className="font-display font-800 uppercase text-4xl md:text-6xl text-bone">
          All Steering Wheels
        </h1>
      </div>
      <ShopBrowser />
    </main>
  );
}
