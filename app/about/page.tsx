import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "About HkFitness | Apparel & Coaching",
  description:
    "Discover the HkFitness approach to premium performance apparel and personal coaching.",
};

const values = [
  ["01", "Purpose", "Everything we create must help you move, train, or live better."],
  ["02", "Quality", "From fabric to programming, every detail is chosen to perform."],
  ["03", "Progress", "Real confidence is built through consistent, measurable work."],
];

export default function AboutPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="about-title">
        <div className={styles.heroCopy}>
          <p><span /> About / HkFitness</p>
          <h1 id="about-title">
            Built for the work.<br />
            <em>Designed for the life.</em>
          </h1>
        </div>
        <div className={styles.heroMark} aria-hidden="true">
          <span>HK</span>
          <p>Apparel / Fitness</p>
        </div>
      </section>

      <section className={styles.intro} aria-labelledby="our-standard-title">
        <p className={styles.sectionLabel}>Our standard</p>
        <div>
          <h2 id="our-standard-title">
            More than what you wear.<br />
            More than how you train.
          </h2>
          <p>
            HkFitness brings premium performance apparel and personal coaching
            together under one idea: the way you show up matters. We create
            clothing that moves with you and coaching that moves you forward.
          </p>
        </div>
      </section>

      <section className={styles.pillars} aria-label="The two sides of HkFitness">
        <article className={styles.apparel}>
          <div className={styles.pillarTopline}><span>01</span><p>What you wear</p></div>
          <div>
            <h2>Apparel</h2>
            <p>
              Elevated essentials made for movement. Clean silhouettes,
              performance-focused materials, and comfort that works inside and
              outside the gym.
            </p>
          </div>
          <Link href="/apparel">Explore apparel <span aria-hidden="true">↗</span></Link>
        </article>

        <article className={styles.fitness}>
          <div className={styles.pillarTopline}><span>02</span><p>How you progress</p></div>
          <div>
            <h2>Fitness</h2>
            <p>
              Personal coaching shaped around your goals, experience, and
              lifestyle. Clear structure, honest accountability, and guidance
              built for lasting results.
            </p>
          </div>
          <Link href="/coaching">Explore coaching <span aria-hidden="true">↗</span></Link>
        </article>
      </section>

      <section className={styles.values} aria-labelledby="values-title">
        <div className={styles.valuesHeading}>
          <p className={styles.sectionLabel}>What guides us</p>
          <h2 id="values-title">One brand.<br /><em>One standard.</em></h2>
        </div>
        <div className={styles.valueList}>
          {values.map(([number, title, copy]) => (
            <article key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.closing}>
        <p>Wear the standard. Train the lifestyle.</p>
        <Link href="/contact">Start your journey <span aria-hidden="true">→</span></Link>
      </section>
    </main>
  );
}
