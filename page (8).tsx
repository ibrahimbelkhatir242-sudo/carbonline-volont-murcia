import { Metadata } from "next";
import { notFound } from "next/navigation";
import { products, getProductBySlug } from "@/lib/data";
import ProductGallery from "@/components/ProductGallery";
import Configurator from "@/components/Configurator";
import ProductInfoTabs from "@/components/ProductInfoTabs";
import FAQ from "@/components/FAQ";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = getProductBySlug(params.slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: [product.images[0]],
    },
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    image: product.images,
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      price: product.basePrice,
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <main className="container-x py-12 md:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 lg:items-start">
        <ProductGallery images={product.images} name={product.name} />
        <div className="lg:sticky lg:top-24">
          <Configurator product={product} />
        </div>
      </div>

      <div className="mt-24">
        <ProductInfoTabs product={product} />
      </div>

      <div className="mt-24">
        <p className="spec-label mb-4">FAQ</p>
        <FAQ />
      </div>
    </main>
  );
}
