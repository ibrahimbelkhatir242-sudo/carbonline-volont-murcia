import { MetadataRoute } from "next";
import { brands, products } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.carbonline-example.com";

  const staticRoutes = ["", "/shop", "/custom", "/about", "/contact"].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));

  const brandRoutes = brands.map((b) => ({
    url: `${base}/shop/${b.slug}`,
    lastModified: new Date(),
  }));

  const productRoutes = products.map((p) => ({
    url: `${base}/product/${p.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...brandRoutes, ...productRoutes];
}
