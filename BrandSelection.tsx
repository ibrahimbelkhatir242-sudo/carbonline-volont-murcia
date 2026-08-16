import { brands } from "@/lib/data";
import BrandCard from "./BrandCard";

export default function BrandSelection() {
  return (
    <section className="container-x py-24 md:py-32">
      <div className="max-w-xl mb-14">
        <p className="spec-label mb-3">REF. 00 / PLATFORM</p>
        <h2 className="font-display font-700 uppercase text-4xl md:text-5xl text-bone red-underline pb-2">
          Choose Your Brand
        </h2>
        <p className="mt-4 text-sm text-muted leading-relaxed">
          Every wheel is engineered against a specific hub, airbag pattern, and control layout —
          start with your platform.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {brands.map((b) => (
          <BrandCard key={b.slug} brand={b} />
        ))}
      </div>
    </section>
  );
}
