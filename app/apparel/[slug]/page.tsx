import { notFound } from "next/navigation";
import Link from "next/link";
import ProductDetail from "@/components/ProductDetail";
import ApparelProductCard from "@/components/ApparelProductCard";
import { apparelProducts, getApparelProduct } from "@/data/apparel";
import styles from "./page.module.css";

export function generateStaticParams() { return apparelProducts.map(p => ({ slug: p.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const product = getApparelProduct((await params).slug);
  return { title: product ? `${product.name} | HKFitness` : "Piece not found | HKFitness" };
}
export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const product = getApparelProduct((await params).slug);
  if (!product) notFound();
  const related = apparelProducts.filter(p => p.slug !== product.slug && p.category.startsWith(product.category.split(" / ")[0])).slice(0, 4);
  return <main className={styles.page}>
    <nav className={styles.crumb} aria-label="Breadcrumb"><Link href="/apparel">Collection</Link><span>/</span><span>{product.name}</span></nav>
    <ProductDetail product={product} />
    <section className={styles.related}><div><p className="eyebrow">Complete your rotation</p><h2>Consider these.</h2></div><div className={styles.relatedGrid}>{related.map(p => <ApparelProductCard product={p} key={p.slug} />)}</div></section>
  </main>;
}
