import Link from "next/link";
import Image from "next/image";
import BrandLogo from "./BrandLogo";
import styles from "./Footer.module.css";
const paymentMethods = [
  ["visa", "Visa"], ["mastercard", "Mastercard"],
  ["american-express", "American Express"], ["discover", "Discover"],
  ["diners", "Diners Club"], ["jcb", "JCB"], ["unionpay", "UnionPay"],
  ["apple-pay", "Apple Pay"], ["google-pay", "Google Pay"], ["samsung-pay", "Samsung Pay"],
];
export default function Footer(){return <footer className={styles.footer}><div className={styles.top}><div><Link className={styles.logo} href="/" aria-label="HKFitness home"><BrandLogo inverse /></Link><p>Performance in every thread</p></div><nav aria-label="Shop"><h2>Collections</h2><Link href="/apparel">All apparel</Link><Link href="/collections/womens-activewear">Women</Link><Link href="/collections/mens-activewear">Men</Link><Link href="/collections/seamless-activewear-sets">Seamless sets</Link><Link href="/guides/choosing-activewear">Activewear guide</Link></nav><nav aria-label="Customer care"><h2>At your service</h2><Link href="/account">My account</Link><Link href="/cart">Shopping bag</Link><Link href="/contact">Contact us</Link></nav><div className={styles.note}><p className="eyebrow">HKFitness apparel</p><h2>Performance<br /><em>in every thread</em></h2><Link className="text-link" href="/about">Discover our world ↗</Link></div></div><section className={styles.payments} aria-labelledby="footer-payments-title"><div><h2 id="footer-payments-title">Payment options</h2><p>Coming soon · availability will depend on our payment provider.</p></div><ul className={styles.paymentLogos}>{paymentMethods.map(([slug, name]) => <li key={slug}><Image src={`/images/payments/${slug}.svg`} alt={name} width={60} height={40} /></li>)}</ul></section><div className={styles.bottom}><span>© {new Date().getFullYear()} HKFitness</span><span>Performance in every thread</span><span>United Arab Emirates / AED</span></div></footer>}

