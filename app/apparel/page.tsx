import Collection from "@/components/Collection";
import styles from "./page.module.css";
export const metadata = { title: "Activewear for Women & Men | HKFitness", description: "Explore HKFitness activewear sets, leggings, shirts, shorts and pants. Sizes S–XL, with prices in AED. Performance in every thread.", alternates: { canonical: "/apparel" } };
export default async function ApparelPage({ searchParams }: { searchParams: Promise<{ collection?: string }> }) {
  const params = await searchParams;
  const collection = ["Women","Men"].includes(params.collection ?? "") ? params.collection! : "All";
  return <main><header className={styles.intro}><p className="eyebrow">HK Fitness / The new collection</p><div><h1>{collection === "All" ? "THE EVERYDAY EDIT." : `${collection.toUpperCase()}. REDEFINED.`}</h1><p>Clean lines. Confident colours.<br />The pieces you’ll keep coming back to.</p></div></header><Collection key={collection} collection={collection} /></main>;
}
