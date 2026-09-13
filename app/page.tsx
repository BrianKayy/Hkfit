import Image from "next/image";
import Link from "next/link";
import { apparelProducts } from "@/data/apparel";
import styles from "./page.module.css";
const edit = [2, 7, 0, 3];
export default function Home() {
  return <main>
    <section className={styles.hero} aria-labelledby="campaign-title">
      <div className={styles.heroVisual}>
        <Image src="/images/hk-campaign.jpeg" alt="Two models wearing HK Fitness essentials in charcoal and grey against a sunlit brick wall" fill loading="eager" fetchPriority="high" sizes="100vw" />
      </div>
      <div className={styles.heroCopy}>
        <p className="eyebrow">HK Fitness — The everyday collection</p>
        <h1 id="campaign-title">The art of<br /><em>moving well.</em></h1>
        <div className={styles.heroBottom}>
          <p>Refined in form. Effortless in motion.</p>
          <div className={styles.heroActions}>
            <Link href="/apparel?collection=Women">Shop women <span>↗</span></Link>
            <Link href="/apparel?collection=Men">Shop men <span>↗</span></Link>
          </div>
        </div>
      </div>
      <span className={styles.campaignIndex}>COLLECTION 01 / EVERYDAY, ELEVATED</span>
    </section>
    <div className={styles.strip}><span>Considered design</span><span>Everyday versatility</span><span>Understated by nature</span></div>
    <section className={styles.section}>
      <div className={styles.heading}><div><p className="eyebrow">01 / The curated edit</p><h2>Everyday. <em>Exceptional.</em></h2></div><Link className="text-link" href="/apparel">Explore the collection ↗</Link></div>
      <div className={styles.products}>{edit.map(index => { const p = apparelProducts[index]; return <Link className={styles.product} key={p.slug} href={`/apparel/${p.slug}`}><div><Image src={p.images[0]} alt={p.name} fill sizes="(max-width: 700px) 45vw, 23vw"/><span>Discover ↗</span></div><p>{p.category}</p><h3>{p.name}</h3><small>{Number(p.price) === 0 ? "Price on request" : p.price}</small></Link>; })}</div>
    </section>
    <section className={styles.categories} aria-label="Shop by collection">
      <Link href="/apparel?collection=Women"><Image src="/images/f3.jpeg" alt="Women's flared leggings" fill sizes="(max-width: 700px) 100vw, 50vw"/><div><p className="eyebrow">Form meets freedom</p><h2>For her.</h2><span>Shop women ↗</span></div></Link>
      <Link href="/apparel?collection=Men"><Image src="/images/s3.jpeg" alt="Men's fitted zip top" fill sizes="(max-width: 700px) 100vw, 50vw"/><div><p className="eyebrow">The modern uniform</p><h2>For him.</h2><span>Shop men ↗</span></div></Link>
    </section>
    <section className={styles.manifesto}><p className="eyebrow">The HK perspective</p><h2>Good style doesn’t<br />need to <em>say much.</em></h2><p>Clean lines. A considered palette. Pieces that belong together.<br />Discover a more effortless approach to getting dressed.</p><Link className="text-link" href="/about">Our philosophy ↗</Link></section>
  </main>;
}

