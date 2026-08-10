import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";
import ProductGallery from "@/components/ProductGallery";
import { apparelProducts, getApparelProduct } from "@/data/apparel";
import styles from "./page.module.css";

export function generateStaticParams() {
  return apparelProducts.map((product) => ({ slug: product.slug }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getApparelProduct(slug);
  if (!product) notFound();

  return (
    <main className={styles.page}>
      <p className={styles.crumb}>Apparel / {product.category} / {product.name}</p>
      <section className={styles.product}>
        <ProductGallery product={product} />
        <div className={styles.details}>
          <p>{product.label}</p><h1>{product.name}</h1><strong>{product.price}</strong>
          <div className={styles.rule} />
          <p className={styles.copy}>Made for movement without compromise. Your eight product images will appear in this gallery once placed in the matching apparel folder.</p>
          <div className={styles.choices}><span>Available colours</span><div>{product.colors.map((color) => <i key={color.label} title={color.label} style={{ background: color.value }} />)}</div></div>
          <div className={styles.choices}><span>Available sizes</span><div>{product.sizes.map((size) => <i key={size}>{size}</i>)}</div></div>
          <div className={styles.add}><AddToCartButton productName={product.name} /></div>
          <p className={styles.delivery}>Complimentary delivery on orders over $150.</p>
        </div>
      </section>
    </main>
  );
}
