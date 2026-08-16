import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Brand } from "@/lib/types";

export default function BrandCard({ brand }: { brand: Brand }) {
  return (
    <Link
      href={`/shop/${brand.slug}`}
      className="group spec-frame relative block overflow-hidden bg-panel border border-steel/60 hover:border-signal/60 transition-colors duration-300"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={brand.cardImage}
          alt={`${brand.name} carbon fiber steering wheel`}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/10 to-transparent" />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-signal/[0.06]" />
      </div>

      <div className="absolute inset-x-0 bottom-0 p-6 transition-transform duration-300 group-hover:-translate-y-2">
        <p className="spec-label mb-1">{brand.tagline}</p>
        <h3 className="font-display font-700 text-3xl uppercase text-bone">{brand.name}</h3>
        <p className="mt-2 text-sm text-muted max-w-xs leading-relaxed hidden sm:block">
          {brand.description}
        </p>
        <span className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-widest2 text-bone opacity-80 group-hover:opacity-100">
          Explore
          <ArrowRight
            size={14}
            strokeWidth={2}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </span>
      </div>
    </Link>
  );
}
