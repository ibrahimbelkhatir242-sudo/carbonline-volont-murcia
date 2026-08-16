"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/types";
import { formatEUR } from "@/lib/format";
import { useCart } from "@/lib/cart-context";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  function quickAdd() {
    addItem({
      id: `${product.slug}-default-${Date.now()}`,
      productSlug: product.slug,
      name: product.name,
      image: product.images[0],
      quantity: 1,
      unitPrice: product.basePrice,
      selectedOptions: [],
    });
  }

  return (
    <div className="group spec-frame relative bg-panel border border-steel/60 hover:border-steel-light transition-colors duration-300 flex flex-col">
      <Link href={`/product/${product.slug}`} className="relative aspect-square overflow-hidden block">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 group-hover:rotate-1"
        />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-signal/10 to-transparent" />
        <span className="absolute top-4 left-4 spec-label bg-void/70 px-2 py-1">
          {product.material.split(",")[0]}
        </span>
      </Link>

      <div className="p-5 flex flex-col flex-1">
        <p className="spec-label mb-1">{product.vehicleCompatibility}</p>
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-display font-700 text-xl uppercase text-bone leading-tight hover:text-signal transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="mt-2 text-sm text-muted flex-1">{product.shortDescription}</p>

        <div className="mt-5 flex items-center justify-between">
          <span className="font-mono text-lg text-bone">{formatEUR(product.basePrice)}</span>
          <div className="flex gap-2">
            <Link
              href={`/product/${product.slug}`}
              className="text-xs uppercase tracking-wide border border-steel-light px-3 py-2 text-bone hover:border-bone transition-colors"
            >
              View
            </Link>
            <button
              onClick={quickAdd}
              className="text-xs uppercase tracking-wide bg-signal hover:bg-signal-dim px-3 py-2 text-bone transition-colors"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
