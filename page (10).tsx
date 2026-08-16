import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { brands, getBrandBySlug } from "@/lib/data";
import ShopBrowser from "@/components/ShopBrowser";

export function generateStaticParams() {
  return brands.map((b) => ({ brand: b.slug }));
}

export function generateMetadata({ params }: { params: { brand: string } }): Metadata {
  const brand = getBrandBySlug(params.brand);
  if (!brand) return {};
  return {
    title: `${brand.name} Carbon Fiber Steering Wheels`,
    description: brand.description,
  };
}

export default function BrandPage({ params }: { params: { brand: string } }) {
  const brand = getBrandBySlug(params.brand);
  if (!brand) notFound();

  return (
    <main>
      <section className="relative h-[50vh] min-h-[380px] overflow-hidden">
        <Image src={brand.heroImage} alt={`${brand.name} carbon fiber steering wheel`} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/50 to-void/30" />
        <div className="relative h-full container-x flex flex-col justify-end pb-12">
          <p className="spec-label mb-2">{brand.tagline}</p>
          <h1 className="font-display font-800 uppercase text-5xl md:text-7xl text-bone">{brand.name}</h1>
          <p className="mt-4 max-w-lg text-muted text-sm md:text-base">{brand.description}</p>
        </div>
      </section>

      <section className="container-x py-16 md:py-24">
        <ShopBrowser initialBrand={brand.slug} />
      </section>
    </main>
  );
}
