"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { brands, compatibility, products } from "@/lib/data";
import { BrandSlug } from "@/lib/types";
import ProductCard from "./ProductCard";

export default function CompatibilitySelector() {
  const [brand, setBrand] = useState<BrandSlug | "">("");
  const [model, setModel] = useState("");
  const [generation, setGeneration] = useState("");

  const models = useMemo(
    () => compatibility.filter((c) => c.brand === brand),
    [brand]
  );

  const generations = useMemo(
    () => models.find((m) => m.model === model)?.generations ?? [],
    [models, model]
  );

  const matches = useMemo(() => {
    if (!brand) return [];
    return products.filter((p) => p.brand === brand);
  }, [brand]);

  return (
    <section className="container-x py-24 md:py-32 border-t border-steel/60">
      <div className="max-w-xl mb-12">
        <p className="spec-label mb-3">REF. 06 / FITMENT</p>
        <h2 className="font-display font-700 uppercase text-4xl md:text-5xl text-bone red-underline pb-2">
          Find Your Steering Wheel
        </h2>
        <p className="mt-4 text-sm text-muted leading-relaxed">
          Not sure which steering wheel fits your car? Select your brand, model and generation
          below — no technical knowledge required.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 max-w-3xl">
        <Select
          label="Brand"
          value={brand}
          onChange={(v) => {
            setBrand(v as BrandSlug);
            setModel("");
            setGeneration("");
          }}
          options={brands.map((b) => ({ value: b.slug, label: b.name }))}
        />
        <Select
          label="Model"
          value={model}
          disabled={!brand}
          onChange={(v) => {
            setModel(v);
            setGeneration("");
          }}
          options={models.map((m) => ({ value: m.model, label: m.model }))}
        />
        <Select
          label="Generation"
          value={generation}
          disabled={!model}
          onChange={setGeneration}
          options={generations.map((g) => ({ value: g, label: g }))}
        />
      </div>

      {matches.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {matches.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      )}

      <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-4 border-t border-steel/60 pt-8">
        <p className="text-sm text-muted">Still not sure which steering wheel fits your car?</p>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center border border-steel-light hover:border-bone text-bone text-xs uppercase tracking-widest2 px-6 py-3 transition-colors"
        >
          Contact Us
        </Link>
      </div>
    </section>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
  disabled,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  disabled?: boolean;
}) {
  return (
    <label className="block">
      <span className="spec-label block mb-2">{label}</span>
      <select
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-panel border border-steel-light text-bone text-sm px-4 py-3 disabled:opacity-40 disabled:cursor-not-allowed appearance-none"
      >
        <option value="">Select {label.toLowerCase()}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
