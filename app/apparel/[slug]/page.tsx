import { notFound } from "next/navigation";
import Link from "next/link";
import ProductDetail from "@/components/ProductDetail";
import ApparelProductCard from "@/components/ApparelProductCard";
import { apparelProducts, getApparelProduct } from "@/data/apparel";
import styles from "./page.module.css";
import { absoluteUrl, productPath, jsonLd, SITE_URL } from "@/lib/seo";

export function generateStaticParams() { return apparelProducts.map(p => ({ slug: p.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const product = getApparelProduct((await params).slug);
  if (!product) return { title: "Piece not found | HKFitness", robots: { index: false } };
  const description = `${product.description} ${product.price}. Sizes ${product.sizes.join(", ")}.`;
  return { title: `${product.name} | HKFitness`, description, alternates: { canonical: productPath(product.slug) }, openGraph: { title: product.name, description, url: productPath(product.slug), images: product.images.slice(0, 4).map(url => ({ url: absoluteUrl(url), alt: product.name })) } };
}
export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const product = getApparelProduct((await params).slug);
  if (!product) notFound();
  const related = apparelProducts.filter(p => p.slug !== product.slug && p.category.startsWith(product.category.split(" / ")[0])).slice(0, 4);
  return <main className={styles.page}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd({ "@context": "https://schema.org", "@graph": [{ "@type": "Product", "@id": `${absoluteUrl(productPath(product.slug))}#product`, name: product.name, description: `${product.description} ${product.includes}`, url: absoluteUrl(productPath(product.slug)), image: product.images.map(absoluteUrl), category: product.category, brand: { "@type": "Brand", name: "HKFitness" }, size: product.sizes, color: product.colors.map(color => color.label).join(", "), offers: { "@type": "Offer", url: absoluteUrl(productPath(product.slug)), priceCurrency: "AED", price: Number(product.price.replace(/[^0-9.]/g, "")), seller: { "@id": `${SITE_URL}/#organization` } } }, { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Collection", item: absoluteUrl("/apparel") }, { "@type": "ListItem", position: 2, name: product.name, item: absoluteUrl(productPath(product.slug)) }] }] }) }} />
    <nav className={styles.crumb} aria-label="Breadcrumb"><Link href="/apparel">Collection</Link><span>/</span><span>{product.name}</span></nav>
    <ProductDetail product={product} />
    <section className={styles.related}><div><p className="eyebrow">Complete your rotation</p><h2>Consider these.</h2></div><div className={styles.relatedGrid}>{related.map(p => <ApparelProductCard product={p} key={p.slug} />)}</div></section>
  </main>;
}
