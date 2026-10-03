import Link from "next/link";
import { apparelProducts } from "@/data/apparel";
import { productPath } from "@/lib/seo";
import styles from "@/app/apparel/page.module.css";

export const metadata = { title: "How to Choose Activewear: Sets, Fit & Styles | HKFitness", description: "Compare HKFitness activewear sets and separates, understand what is included, and choose sizes and colours. A practical guide for Dubai and UAE shoppers.", alternates: { canonical: "/guides/choosing-activewear" } };
export default function BuyingGuide() {
  return <main><header className={styles.intro}><p className="eyebrow">HKFitness / The wardrobe guide</p><div><h1>Choose your activewear.</h1><p className={styles.summary}>A practical starting point for Dubai and UAE shoppers comparing sets, separates and everyday gym wear.</p></div></header>
    <article className={styles.guide}><p>Start with what you want to wear, then compare the silhouette, included pieces and sizing. This guide explains the current HKFitness collection so you can make a considered choice.</p>
      <h2>A matching set or separates?</h2><p>A set gives you a coordinated outfit. Separates let you choose a different size or colour for your top and bottoms and combine new pieces with clothes you already own.</p>
      <h3>Women’s seamless sets</h3><p>The three-piece seamless set is {apparelProducts[0].price}; the two-piece wide-leg set is {apparelProducts[1].price}. Compare the photographs and the “What’s included” section on each product page. <Link href="/collections/seamless-activewear-sets">Explore seamless sets</Link>.</p>
      <h3>Flared leggings and wide-leg styles</h3><p>Flared leggings widen towards the hem, while a wide-leg silhouette gives a different overall shape. The <Link href={productPath(apparelProducts[2].slug)}>High-Waist Flared Leggings</Link> are sold as one pair at {apparelProducts[2].price}; the wide-leg option is part of the two-piece set.</p>
      <h3>Men’s tops, bottoms and matching sets</h3><p>Choose short or long sleeves, then pair your shirt with shorts or pants. The Zip-Up Set includes a matching top and bottoms. <Link href="/collections/mens-activewear">Compare the men’s collection</Link> to see individual prices and colour options.</p>
      <h2>Check fit before choosing a size.</h2><p>HKFitness products are offered in S, M, L and XL. A size label alone does not describe the fit of every garment. If you are between sizes or unsure about a particular style, <Link href="/contact">ask our team for help</Link> before ordering. Check the gallery for the silhouette you prefer.</p>
      <h2>What to check when shopping in Dubai.</h2><p>Consider where you will wear the outfit: indoors, outdoors or as an everyday layer. HKFitness delivers across the UAE, including Dubai, within a maximum of 3 days. Before ordering, confirm delivery charges, the applicable return or exchange terms and any fabric details that matter to you with our team. A product photograph cannot establish fabric composition or technical performance.</p>
      <h2>Compare colours and included pieces.</h2><p>On each product page, select a colour to view its associated photograph and use the gallery thumbnails for additional views. Screen settings can affect how colours appear. The included-items description explains what you are purchasing; other styling pieces in photographs may be sold separately.</p>
      <nav aria-label="Shop activewear"><Link href="/collections/womens-activewear">Women’s activewear ↗</Link><Link href="/collections/mens-activewear">Men’s activewear ↗</Link><Link href="/collections/seamless-activewear-sets">Seamless sets ↗</Link></nav>
    </article></main>;
}
