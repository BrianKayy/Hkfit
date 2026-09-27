import Image from "next/image";
import Link from "next/link";
import ApparelProductCard from "@/components/ApparelProductCard";
import ProductMedia from "@/components/ProductMedia";
import { apparelProducts } from "@/data/apparel";
import styles from "./page.module.css";

export default function Home() {
  const women = apparelProducts[2];
  const men = apparelProducts[8];
  const edit = [apparelProducts[0], apparelProducts[4], apparelProducts[5], apparelProducts[8]];
  return <main>
    <section className={styles.hero} aria-labelledby="campaign-title">
      <Image src="/images/hk-campaign.jpeg" alt="Two models wearing the HK Fitness collection in sunlight" fill loading="eager" fetchPriority="high" sizes="100vw" />
      <div className={styles.shade} />
      <div className={styles.heroContent}>
        <p className="eyebrow">HK Fitness / Collection 2026</p>
        <h1 id="campaign-title">Performance<br />in every thread</h1>
        <div className={styles.heroBottom}><p>Apparel for women and men.<br />Explore the new collection.</p><Link href="/apparel">Explore the new collection <span>↗</span></Link></div>
      </div>
      <span className={styles.index}>01 — THE EVERYDAY SERIES</span>
    </section>
    <div className={styles.collectionNav}><span>Performance in every thread</span><Link href="/apparel?collection=Women">Women ↗</Link><Link href="/apparel?collection=Men">Men ↗</Link><Link href="/apparel">All pieces ↗</Link></div>
    <section className={styles.edit}>
      <div className={styles.heading}><div><p className="eyebrow">A fresh perspective</p><h2>Your next<br /><span>everyday favourites.</span></h2></div><Link className="text-link" href="/apparel">Shop the collection ↗</Link></div>
      <div className={styles.grid}>{edit.map(p => <ApparelProductCard key={p.slug} product={p} />)}</div>
    </section>
    <section className={styles.collections} aria-label="Shop collections">
      {[{product:women,title:"The women's edit.",collection:"Women",number:"01"},{product:men,title:"The men's edit.",collection:"Men",number:"02"}].map(({product,title,collection,number}) => <Link href={`/apparel?collection=${collection}`} key={collection}>
        <div className={styles.collectionImage}><ProductMedia src={product.images[0]} alt={title} sizes="(max-width:700px) 100vw, 50vw" /><span>{number} / THE COLLECTION</span></div>
        <div className={styles.collectionTitle}><h2>{title}</h2><span>Discover ↗</span></div>
      </Link>)}
    </section>
    <section className={styles.statement}><p className="eyebrow">The HK point of view</p><h2>Performance<br /><span>in every thread</span></h2><div><p>A considered wardrobe begins with pieces you want to wear again. Clean silhouettes, a confident palette, and room to make it your own.</p><Link className="text-link" href="/about">Inside HK Fitness ↗</Link></div></section>
    <section className={styles.service}><div><span>01</span><h3>A complete wardrobe</h3><p>Discover ten pieces for your everyday rotation.</p></div><div><span>02</span><h3>Find your fit</h3><p>Explore the collection in sizes S to XL.</p></div><div><span>03</span><h3>Here to help</h3><p><Link href="/contact">Talk to our team about your next piece ↗</Link></p></div></section>
  </main>;
}
