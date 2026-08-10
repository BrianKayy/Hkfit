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
      <section className={styles.intro}>
        <div><p>01 / The collection</p><h1>Engineered<br />for <em>the work.</em></h1></div>
        <p className={styles.introCopy}>Technical essentials designed to move from the gym to everything after it. Built with intention. Made to last.</p>
      </section>

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
        <span>↳</span><p>Every piece includes an 8-image product gallery. Add your own files to <code>public/images/apparel/&lt;product-slug&gt;/01.jpg</code> through <code>08.jpg</code>.</p>
      </aside>
    </main>
  );
}
