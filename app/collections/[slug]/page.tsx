import ArrowIcon from "@/components/ArrowIcon";
import Link from "next/link";
import { notFound } from "next/navigation";
import Collection from "@/components/Collection";
import { collections, collectionProducts } from "@/data/collections";
import { absoluteUrl, jsonLd, productPath } from "@/lib/seo";
import styles from "@/app/apparel/page.module.css";

export function generateStaticParams() { return collections.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const collection = collections.find(c => c.slug === slug);
  if (!collection) return { title: "Collection not found", robots: { index: false } };
  return { title: `${collection.name} in Dubai & UAE | HKFitness`, description: collection.description, alternates: { canonical: `/collections/${collection.slug}` }, openGraph: { title: `${collection.name} | HKFitness`, description: collection.description, url: `/collections/${collection.slug}`, images: collectionProducts(collection).slice(0, 1).flatMap(p => p.images.slice(0, 1)) } };
}
export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const collection = collections.find(c => c.slug === slug);
  if (!collection) notFound();
  const products = collectionProducts(collection);
  return <main>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd({ "@context": "https://schema.org", "@type": "CollectionPage", name: collection.name, description: collection.description, url: absoluteUrl(`/collections/${slug}`), mainEntity: { "@type": "ItemList", itemListElement: products.map((p, i) => ({ "@type": "ListItem", position: i + 1, name: p.name, url: absoluteUrl(productPath(p.slug)) })) } }) }} />
    <header className={styles.intro}><p className="eyebrow"><Link href="/apparel">The collection</Link> / HKFitness</p><div><h1>{collection.name}</h1><p className={styles.summary}>{collection.description}</p></div></header>
    <Collection key={slug} collection={collection.audience} initialCategory={collection.category} />
    <section className={styles.guide}><p className="eyebrow">A considered choice</p><h2>Find your next outfit.</h2><p>{collection.guide}</p><h3>{collection.question}</h3><p>{collection.answer}</p><h3>Do you deliver to Dubai and the UAE?</h3><p>Yes. Delivery across the UAE, including Dubai, takes a maximum of 3 days. Contact our team for delivery charges and ordering assistance.</p><h3>Which size should I choose?</h3><p>The collection is offered in S, M, L and XL. For help with the fit of a specific piece, <Link href="/contact">contact our team</Link> before ordering.</p><Link className="text-link" href="/guides/choosing-activewear">Read our activewear buying guide <ArrowIcon /></Link><nav aria-label="Explore more collections">{collections.filter(c => c.slug !== slug).map(c => <Link key={c.slug} href={`/collections/${c.slug}`}>{c.name} <ArrowIcon /></Link>)}</nav></section>
  </main>;
}
