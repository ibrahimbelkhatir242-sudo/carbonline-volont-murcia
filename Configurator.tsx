"use client";

import { useMemo, useState } from "react";
import { Star } from "lucide-react";
import { Product } from "@/lib/types";
import { formatEUR } from "@/lib/format";
import { useCart } from "@/lib/cart-context";

export default function Configurator({ product }: { product: Product }) {
  const { addItem, openCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selected, setSelected] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    product.optionGroups.forEach((g) => {
      initial[g.id] = g.options[0].id;
    });
    return initial;
  });
  const [justAdded, setJustAdded] = useState(false);

  const totalPrice = useMemo(() => {
    let total = product.basePrice;
    product.optionGroups.forEach((g) => {
      const chosen = g.options.find((o) => o.id === selected[g.id]);
      if (chosen) total += chosen.priceDelta;
    });
    return total * quantity;
  }, [product, selected, quantity]);

  const selectedSummary = product.optionGroups.map((g) => {
    const chosen = g.options.find((o) => o.id === selected[g.id]);
    return { groupLabel: g.label, optionLabel: chosen?.label ?? "" };
  });

  function handleAdd() {
    addItem({
      id: `${product.slug}-${Object.values(selected).join("-")}-${Date.now()}`,
      productSlug: product.slug,
      name: product.name,
      image: product.images[0],
      quantity,
      unitPrice: totalPrice / quantity,
      selectedOptions: selectedSummary,
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
    openCart();
  }

  return (
    <div>
      <div className="flex items-baseline justify-between mb-8">
        <div>
          <h1 className="font-display font-800 uppercase text-3xl md:text-4xl text-bone leading-tight">
            {product.name}
          </h1>
          <p className="spec-label mt-2">{product.vehicleCompatibility}</p>
          <div className="flex items-center gap-2 mt-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={14} strokeWidth={1.4} className="text-steel-light" />
            ))}
            <span className="text-xs text-muted">No reviews yet</span>
          </div>
        </div>
      </div>

      <p className="text-sm text-muted leading-relaxed mb-8 max-w-md">{product.shortDescription}</p>

      <div className="space-y-8">
        {product.optionGroups.map((group) => (
          <div key={group.id}>
            <div className="flex items-baseline justify-between mb-3">
              <span className="spec-label">{group.label}</span>
              <span className="text-xs text-muted">
                {group.options.find((o) => o.id === selected[group.id])?.label}
              </span>
            </div>

            {group.type === "swatch" ? (
              <div className="flex flex-wrap gap-3">
                {group.options.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setSelected((s) => ({ ...s, [group.id]: opt.id }))}
                    aria-label={opt.label}
                    className={`w-10 h-10 rounded-full border-2 transition-all ${
                      selected[group.id] === opt.id
                        ? "border-signal scale-110"
                        : "border-steel-light"
                    }`}
                    style={{ backgroundColor: opt.swatch }}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {group.options.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setSelected((s) => ({ ...s, [group.id]: opt.id }))}
                    className={`px-4 py-2.5 text-xs uppercase tracking-wide border transition-colors ${
                      selected[group.id] === opt.id
                        ? "border-signal bg-signal/10 text-bone"
                        : "border-steel-light text-muted hover:border-bone hover:text-bone"
                    }`}
                  >
                    {opt.label}
                    {opt.priceDelta > 0 && (
                      <span className="ml-1.5 font-mono text-[10px] text-muted">
                        +{formatEUR(opt.priceDelta)}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Your configuration summary */}
      <div className="mt-10 spec-frame border border-steel/60 bg-panel p-6">
        <p className="spec-label mb-4">Your Configuration</p>
        <ul className="space-y-1.5 mb-5">
          {selectedSummary.map((s) => (
            <li key={s.groupLabel} className="flex justify-between text-sm">
              <span className="text-muted">{s.groupLabel}</span>
              <span className="text-bone">{s.optionLabel}</span>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between border-t border-steel/60 pt-4 mb-6">
          <div className="flex items-center gap-3">
            <span className="spec-label">Qty</span>
            <div className="flex items-center border border-steel-light">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-8 h-8 text-bone hover:bg-steel/40"
                aria-label="Decrease quantity"
              >
                –
              </button>
              <span className="w-8 text-center text-sm font-mono">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-8 h-8 text-bone hover:bg-steel/40"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>
          <div className="text-right">
            <p className="spec-label mb-0.5">Total</p>
            <p className="font-mono text-2xl text-bone">{formatEUR(totalPrice)}</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleAdd}
            className="flex-1 bg-signal hover:bg-signal-dim transition-colors text-bone font-medium tracking-wide px-6 py-4 text-sm uppercase"
          >
            {justAdded ? "Added ✓" : "Add to Cart"}
          </button>
          <button
            onClick={handleAdd}
            className="flex-1 border border-steel-light hover:border-bone transition-colors text-bone font-medium tracking-wide px-6 py-4 text-sm uppercase"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
