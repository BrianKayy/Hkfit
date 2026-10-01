import type { MetadataRoute } from "next";
import { apparelProducts } from "@/data/apparel";
import { absoluteUrl, productPath } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...["/", "/apparel", "/about", "/contact"].map(path => ({ url: absoluteUrl(path) })),
    ...apparelProducts.map(product => ({
      url: absoluteUrl(productPath(product.slug)),
      images: product.images.map(absoluteUrl),
    })),
  ];
}
