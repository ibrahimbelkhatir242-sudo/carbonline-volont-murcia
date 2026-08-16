import Link from "next/link";
import { getFeaturedProducts } from "@/lib/data";
import ProductCard from "./ProductCard";

export default function FeaturedProducts() {
  const featured = getFeaturedProducts();

  return (
    <section className="container-x py-24 md:py-32 border-t border-steel/60">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
        <div className="max-w-xl">
          <p className="spec-label mb-3">REF. 01 / LINEUP</p>
          <h2 className="font-display font-700 uppercase text-4xl md:text-5xl text-bone red-underline pb-2">
            Built For Performance
          </h2>
        </div>
        <Link
          href="/shop"
          className="text-xs uppercase tracking-widest2 text-bone border-b border-signal pb-1 w-fit"
        >
          View Full Collection
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {featured.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </section>
  );
}
