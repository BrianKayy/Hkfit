import { notFound } from "next/navigation";
import Link from "next/link";
import ProductOptions from "@/components/ProductOptions";
import ProductGallery from "@/components/ProductGallery";
import { apparelProducts, getApparelProduct } from "@/data/apparel";
import styles from "./page.module.css";
export function generateStaticParams(){return apparelProducts.map(p=>({slug:p.slug}));}
export default async function ProductPage({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const product=getApparelProduct(slug);if(!product)notFound();return <main className={styles.page}><p className={styles.crumb}><Link href="/apparel">Collection</Link> / {product.category}</p><section className={styles.product}><ProductGallery product={product}/><div className={styles.details}><p>{product.label}</p><h1>{product.name}</h1><strong>{Number(product.price)===0?"Price on request":product.price}</strong><div className={styles.rule}/><p className={styles.copy}>An effortless addition to your everyday wardrobe. Style it with your favourite essentials for a considered, understated look.</p><div className={styles.add}><ProductOptions product={product}/></div><p className={styles.delivery}>Need help finding your fit? <Link href="/contact">Contact customer care ↗</Link></p></div></section></main>}
