import ApparelProductCard from "@/components/ApparelProductCard";
import { apparelProducts } from "@/data/apparel";
import styles from "./page.module.css";

export const metadata = {
  title: "Apparel | HkFitness",
  description: "Premium performance apparel engineered for the work.",
};

export default function ApparelPage() {
  return (
    <main className={styles.page}>
      

      <section className={styles.collection} aria-labelledby="collection-title">
        <div className={styles.collectionBar}>
          <div><h2 id="collection-title">The collection</h2><span>{apparelProducts.length} pieces</span></div>
          <div className={styles.filters} aria-label="Product categories"><button type="button" className={styles.active}>All</button><button type="button">Tops</button><button type="button">Bottoms</button><button type="button">Layers</button></div>
        </div>
        <div className={styles.grid}>
          {apparelProducts.map((product) => <ApparelProductCard key={product.slug} product={product} />)}
        </div>
      </section>

      <aside className={styles.imageNote}>
        
      </aside>
    </main>
  );
}
