"use client";

import { useMemo, useState } from "react";
import { brands, compatibility, getProductsByBrand } from "@/lib/data";
import { BrandSlug } from "@/lib/types";
import Configurator from "./Configurator";

export default function CustomBuilder() {
  const [brand, setBrand] = useState<BrandSlug | "">("");
  const [model, setModel] = useState("");
  const [generation, setGeneration] = useState("");
  const [productSlug, setProductSlug] = useState("");

  const models = useMemo(() => compatibility.filter((c) => c.brand === brand), [brand]);
  const generations = useMemo(
    () => models.find((m) => m.model === model)?.generations ?? [],
    [models, model]
  );
  const matchingProducts = useMemo(
    () => (brand ? getProductsByBrand(brand) : []),
    [brand]
  );
  const chosenProduct = matchingProducts.find((p) => p.slug === productSlug);

  const step = !brand ? 1 : !generation ? 2 : !productSlug ? 3 : 4;

  return (
    <div>
      {/* Step indicator — encodes an actual sequence (vehicle -> wheel -> options), not decoration */}
      <div className="flex items-center gap-3 mb-12 spec-label">
        {["Vehicle", "Generation", "Wheel", "Configure"].map((label, idx) => (
          <div key={label} className="flex items-center gap-3">
            <span className={idx + 1 <= step ? "text-signal" : "text-muted"}>
              0{idx + 1} {label}
            </span>
            {idx < 3 && <span className="w-6 h-px bg-steel-light" />}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 max-w-3xl">
        <Select
          label="Brand"
          value={brand}
          onChange={(v) => {
            setBrand(v as BrandSlug);
            setModel("");
            setGeneration("");
            setProductSlug("");
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
            setProductSlug("");
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

      {generation && matchingProducts.length > 0 && !chosenProduct && (
        <div className="mb-16">
          <p className="spec-label mb-4">Step 03 — Choose Your Base Wheel</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
            {matchingProducts.map((p) => (
              <button
                key={p.slug}
                onClick={() => setProductSlug(p.slug)}
                className="text-left border border-steel-light hover:border-signal transition-colors p-5"
              >
                <p className="font-display font-700 uppercase text-lg text-bone">{p.name}</p>
                <p className="text-xs text-muted mt-1">{p.material}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {chosenProduct && (
        <div className="max-w-xl">
          <button
            onClick={() => setProductSlug("")}
            className="text-xs uppercase tracking-wide text-muted hover:text-bone mb-8"
          >
            ← Change base wheel
          </button>
          <Configurator product={chosenProduct} />
        </div>
      )}

      {!brand && (
        <p className="text-sm text-muted mt-4 max-w-md">
          Not sure which platform you have? You can also upload a photo of your current steering
          wheel — <a href="/contact" className="text-signal hover:underline">contact us here</a>.
        </p>
      )}
    </div>
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
