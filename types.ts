export type BrandSlug = "audi" | "bmw" | "mercedes" | "porsche";

export interface Brand {
  slug: BrandSlug;
  name: string;
  tagline: string;
  description: string;
  heroImage: string;
  cardImage: string;
}

export interface CompatibilityEntry {
  brand: BrandSlug;
  model: string;
  generations: string[]; // e.g. ["8Y (2020-Present)", "8V (2016-2020)"]
}

export interface ProductOption {
  id: string;
  label: string;
  priceDelta: number; // in EUR, added to base price
  swatch?: string; // hex or texture keyword, used for UI dot
}

export interface ProductOptionGroup {
  id: string;
  label: string;
  type: "swatch" | "select" | "toggle";
  options: ProductOption[];
}

export interface Product {
  slug: string;
  name: string;
  brand: BrandSlug;
  vehicleCompatibility: string; // short display string, e.g. "RS3 / RS4 / RS6 (8Y-8W)"
  material: string;
  basePrice: number; // EUR
  shortDescription: string;
  description: string;
  materialsInfo: string;
  compatibilityInfo: string;
  installationInfo: string;
  deliveryInfo: string;
  images: string[];
  optionGroups: ProductOptionGroup[];
  featured?: boolean;
}

export interface CartLineItem {
  id: string; // unique per configuration
  productSlug: string;
  name: string;
  image: string;
  quantity: number;
  unitPrice: number;
  selectedOptions: { groupLabel: string; optionLabel: string }[];
}
