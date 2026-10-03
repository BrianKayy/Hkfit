"use client";

import { useState } from "react";
import Link from "next/link";
import ApparelProductCard from "./ApparelProductCard";
import { apparelProducts } from "@/data/apparel";
import styles from "@/app/apparel/page.module.css";

export default function Collection({ collection, initialCategory = "All" }: { collection: string; initialCategory?: string }) {
  const [category, setCategory] = useState(initialCategory);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("featured");
  const products = apparelProducts.filter(p =>
    (collection === "All" || p.category.startsWith(collection)) &&
    (initialCategory === "All" || p.category.endsWith(initialCategory)) &&
    (category === "All" || p.category.endsWith(category)) &&
    p.name.toLowerCase().includes(query.toLowerCase())
  ).sort((a,b) => sort === "low" ? Number(a.price.slice(4)) - Number(b.price.slice(4)) : sort === "high" ? Number(b.price.slice(4)) - Number(a.price.slice(4)) : 0);

  return <section className={styles.collection}>
    <div className={styles.collectionBar}>
      <nav className={styles.collections} aria-label="Collections">{["All","Women","Men"].map(c => <Link key={c} aria-current={collection === c ? "page" : undefined} href={c === "All" ? "/apparel" : `/collections/${c === "Women" ? "womens" : "mens"}-activewear`}>{c === "All" ? "All pieces" : c}</Link>)}</nav>
      <span className={styles.count} role="status">{products.length} pieces</span>
    </div>
    <div className={styles.tools}>
      <div className={styles.filters} aria-label="Product categories">{(initialCategory === "All" ? ["All","Tops","Bottoms","Sets"] : [initialCategory]).map(c => <button key={c} aria-pressed={category === c} onClick={() => setCategory(c)}>{c}</button>)}</div>
      <div className={styles.inputs}><input aria-label="Search apparel" placeholder="Find your next piece" value={query} onChange={e => setQuery(e.target.value)} /><select aria-label="Sort products" value={sort} onChange={e => setSort(e.target.value)}><option value="featured">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option></select></div>
    </div>
    <div className={styles.grid}>{products.map(p => <ApparelProductCard key={p.slug} product={p} />)}</div>
    {!products.length && <div className={styles.empty}><h2>No pieces found.</h2><p>Try a different search or category.</p><button className="text-link" onClick={() => { setCategory(initialCategory); setQuery(""); }}>Clear filters</button></div>}
  </section>;
}
