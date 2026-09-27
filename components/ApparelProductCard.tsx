import Link from "next/link";
import type { ApparelProduct } from "@/data/apparel";
import ProductMedia from "./ProductMedia";
import styles from "./ApparelProductCard.module.css";

export default function ApparelProductCard({ product }: { product: ApparelProduct }) {
  return <article className={styles.card}>
    <Link href={`/apparel/${product.slug}`} className={styles.visual} aria-label={`View ${product.name}`}>
      <ProductMedia src={product.images[0]} alt={product.name} sizes="(max-width: 600px) 45vw, (max-width: 1000px) 30vw, 23vw" />
      <span className={styles.tag}>{product.images.length ? product.label : "Preview"}</span>
      <span className={styles.discover}>Discover this piece <span>↗</span></span>
    </Link>
    <div className={styles.info}>
      <p>{product.category}</p>
      <div className={styles.title}><Link href={`/apparel/${product.slug}`}><h2>{product.name}</h2></Link><span>{product.price}</span></div>
      <div className={styles.swatches} aria-label="Available colours">{product.colors.map(c => <span key={c.label} title={c.label} style={{ background: c.value }} />)}<small>{product.colors.length ? `${product.colors.length} colour${product.colors.length === 1 ? "" : "s"}` : "Colours coming soon"}</small></div>
    </div>
  </article>;
}
