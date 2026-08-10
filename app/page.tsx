import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";
import styles from "./page.module.css";

const products = [
  { name: "Women’s 3 Set Seamless Active Wear", price: "00.00", image: "/images/s1.jpeg", tag: "New" },
  { name: "Men’s Athletic Training Shorts", price: "00.00", image: "/images/s2.jpeg", tag: "Best seller" },
  { name: "Men’s Physique Zipper Slim Fit Long Sleeve T-Shirt", price: "00.00", image: "/images/s3.jpeg", tag: "Limited" },
];

const programs = [
  { name: "Weight loss", image: "/images/t4.png", description: "Sustainable fat loss with a plan built around you." },
  { name: "Muscle gain", image: "/images/t5.png", description: "Progressive strength programming for measurable growth." },
  { name: "Nutrition", image: "/images/t6.png", description: "Practical nutrition that supports your training and life." },
  { name: "Custom workouts", image: "/images/t2.png", description: "Every session shaped around your body and goals." },
  { name: "Online coaching", image: "/images/t3.png", description: "Expert structure and accountability, wherever you train." },
  { name: "Personal guidance", image: "/images/t1.png", description: "Focused one-to-one attention at every stage." },
];

export default function Home() {
  return (
    <main>
      <section className={styles.hero} aria-labelledby="hero-heading">
        <Image className={styles.heroImage} src="/images/hero.png" alt="HkFitness athlete in a concrete training studio" fill priority sizes="100vw" />
        <div className={styles.heroShade} />
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}><span /> Performance, redefined</p>
          <h1 id="hero-heading">Wear the standard.<br /><em>Train the lifestyle.</em></h1>
          <p className={styles.heroCopy}>Premium apparel, expert coaching,<br className={styles.desktopBreak} /> unstoppable results.</p>
          <div className={styles.heroActions}>
            <Link className={styles.primaryButton} href="/apparel">Shop collection <span>↗</span></Link>
            <Link className={styles.secondaryButton} href="/coaching">Start training <span>→</span></Link>
          </div>
        </div>
        <div className={styles.heroIndex}>HK / 001</div>
      </section>

      <section className={styles.promises} aria-label="Why choose HkFitness">
        <article className={styles.promise}>
          <div className={`${styles.promiseIcon} ${styles.qualityIcon}`} aria-hidden="true"><span /></div>
          <div><h2>Premium quality</h2><p>High-performance fabrics<br />built to last.</p></div>
        </article>
        <article className={styles.promise}>
          <div className={`${styles.promiseIcon} ${styles.coachIcon}`} aria-hidden="true"><span /></div>
          <div><h2>Expert coaching</h2><p>Programs designed by a<br />certified professional.</p></div>
        </article>
      </section>

      <section id="featured" className={styles.featured} aria-labelledby="featured-heading">
        <div className={styles.sectionHeader}>
          <div><p className={styles.sectionNumber}>01 / Apparel</p><h2 id="featured-heading">Featured pieces</h2></div>
          <Link href="/apparel">View all apparel <span>↗</span></Link>
        </div>
        <div className={styles.productGrid}>
          {products.map((product) => (
            <article className={styles.productCard} key={product.name}>
              <Link className={styles.productVisual} href="/apparel">
                <Image src={product.image} alt={product.name} fill sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 33vw" />
                <span className={styles.productTag}>{product.tag}</span>
                <span className={styles.productArrow} aria-hidden="true">↗</span>
              </Link>
              <div className={styles.productDetails}>
                <div><h3>{product.name}</h3><p>{product.price}</p></div>
                <AddToCartButton productName={product.name} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.training} aria-labelledby="training-heading">
        <div className={styles.trainingHeader}>
          <div>
            <p className={styles.sectionNumber}>02 / Coaching</p>
            <h2 id="training-heading">Built around<br /><em>your goals.</em></h2>
          </div>
          <p>Tailored coaching with the structure, expertise, and accountability to move you forward.</p>
        </div>
        <div className={styles.programGrid}>
          {programs.map((program, index) => (
            <Link className={styles.programCard} href="/coaching" key={program.name}>
              <Image src={program.image} alt={`${program.name} training program`} fill sizes="(max-width: 700px) 100vw, (max-width: 1050px) 50vw, 33vw" />
              <span className={styles.programShade} />
              <span className={styles.programNumber}>0{index + 1}</span>
              <span className={styles.programContent}>
                <b>{program.name}</b>
                <small>{program.description}</small>
              </span>
              <span className={styles.programArrow} aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
        <Link className={styles.trainingCta} href="/coaching">Explore all coaching <span>→</span></Link>
      </section>
    </main>
  );
}
