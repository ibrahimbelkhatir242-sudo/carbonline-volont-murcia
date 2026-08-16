"use client";

import { useState } from "react";
import { Product } from "@/lib/types";

export default function ProductInfoTabs({ product }: { product: Product }) {
  const tabs = [
    { id: "description", label: "Description", body: product.description },
    { id: "materials", label: "Materials", body: product.materialsInfo },
    { id: "compatibility", label: "Compatibility", body: product.compatibilityInfo },
    { id: "installation", label: "Installation", body: product.installationInfo },
    { id: "delivery", label: "Delivery", body: product.deliveryInfo },
  ];
  const [active, setActive] = useState(tabs[0].id);
  const current = tabs.find((t) => t.id === active)!;

  return (
    <div>
      <div className="flex flex-wrap gap-1 border-b border-steel/60 mb-8">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className={`px-5 py-3 text-xs uppercase tracking-widest2 border-b-2 -mb-px transition-colors ${
              active === t.id ? "border-signal text-bone" : "border-transparent text-muted hover:text-bone"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <p className="max-w-2xl text-sm md:text-base text-muted leading-relaxed">{current.body}</p>
    </div>
  );
}
