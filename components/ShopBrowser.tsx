"use client";

import { useMemo, useState } from "react";
import { brands, products } from "@/lib/data";
import { BrandSlug } from "@/lib/types";
import ProductCard from "./ProductCard";

const priceRanges = [
  { id: "all", label: "All Prices", test: () => true },
  { id: "u1000", label: "Under €1,000", test: (p: number) => p < 1000 },
  { id: "1000-1300", label: "€1,000 – €1,300", test: (p: number) => p >= 1000 && p <= 1300 },
  { id: "1300+", label: "€1,300+", test: (p: number) => p > 1300 },
];

const materialOptions = ["all", ...Array.from(new Set(products.map((p) => p.material)))];

const sortOptions = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "name", label: "Name: A–Z" },
];

export default function ShopBrowser({ initialBrand }: { initialBrand?: BrandSlug }) {
  const lockedBrand = Boolean(initialBrand);
  const [brand, setBrand] = useState<BrandSlug | "all">(initialBrand ?? "all");
  const [price, setPrice] = useState(priceRanges[0].id);
  const [material, setMaterial] = useState("all");
  const [sort, setSort] = useState(sortOptions[0].id);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const priceTest = priceRanges.find((r) => r.id === price)?.test ?? (() => true);
    let result = products.filter((p) => {
      const matchesBrand = brand === "all" || p.brand === brand;
      const matchesPrice = priceTest(p.basePrice);
      const matchesMaterial = material === "all" || p.material === material;
      const matchesQuery =
        query.trim() === "" ||
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.vehicleCompatibility.toLowerCase().includes(query.toLowerCase());
      return matchesBrand && matchesPrice && matchesMaterial && matchesQuery;
    });

    switch (sort) {
      case "price-asc":
        result = [...result].sort((a, b) => a.basePrice - b.basePrice);
        break;
      case "price-desc":
        result = [...result].sort((a, b) => b.basePrice - a.basePrice);
        break;
      case "name":
        result = [...result].sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        result = [...result].sort((a, b) => Number(b.featured) - Number(a.featured));
    }
    return result;
  }, [brand, price, material, sort, query]);

  return (
    <div>
      <div className="flex flex-col gap-4 mb-10 border-b border-steel/60 pb-6">
        {!lockedBrand && (
          <div className="flex flex-wrap gap-2">
            <FilterPill active={brand === "all"} onClick={() => setBrand("all")} label="All Brands" />
            {brands.map((b) => (
              <FilterPill
                key={b.slug}
                active={brand === b.slug}
                onClick={() => setBrand(b.slug)}
                label={b.name}
              />
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          <select
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="bg-panel border border-steel-light text-bone text-xs px-3 py-2 uppercase tracking-wide"
          >
            {priceRanges.map((r) => (
              <option key={r.id} value={r.id}>
                {r.label}
              </option>
            ))}
          </select>
          <select
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
            className="bg-panel border border-steel-light text-bone text-xs px-3 py-2 uppercase tracking-wide max-w-[180px]"
          >
            <option value="all">All Materials</option>
            {materialOptions
              .filter((m) => m !== "all")
              .map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
          </select>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="bg-panel border border-steel-light text-bone text-xs px-3 py-2 uppercase tracking-wide"
          >
            {sortOptions.map((s) => (
              <option key={s.id} value={s.id}>
                Sort: {s.label}
              </option>
            ))}
          </select>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search model…"
            className="bg-panel border border-steel-light text-bone text-xs px-3 py-2 placeholder:text-muted w-40 sm:w-56"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-muted py-16 text-center">
          No steering wheels match those filters. Try widening your search.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}

function FilterPill({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`text-xs uppercase tracking-wide px-4 py-2 border transition-colors ${
        active ? "bg-signal border-signal text-bone" : "border-steel-light text-muted hover:text-bone hover:border-bone"
      }`}
    >
      {label}
    </button>
  );
}
