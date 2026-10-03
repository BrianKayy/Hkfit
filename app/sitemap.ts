import type { MetadataRoute } from "next";
import { apparelProducts } from "@/data/apparel";
import { absoluteUrl, productPath } from "@/lib/seo";
import { collections } from "@/data/collections";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...["/", "/apparel", "/about", "/contact", "/guides/choosing-activewear", ...collections.map(c => `/collections/${c.slug}`)].map(path => ({ url: absoluteUrl(path) })),
    ...apparelProducts.map(product => ({
      url: absoluteUrl(productPath(product.slug)),
      images: product.images.map(absoluteUrl),
    })),
  ];
}
