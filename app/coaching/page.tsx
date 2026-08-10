import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CoachingPlanCard from "./CoachingOlanCard";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Personal Coaching | HkFitness",
  description:
    "Personalized HkFitness coaching programs and transformation plans built around your goals.",
};

const programs = [
  {
    name: "Weight loss",
    image: "/images/t4.png",
    description: "Sustainable fat loss with a plan built around you.",
  },
  {
    name: "Muscle gain",
    image: "/images/t5.png",
    description: "Progressive strength programming for measurable growth.",
  },
  {
    name: "Nutrition",
    image: "/images/t6.png",
    description: "Practical nutrition that supports your training and life.",
  },
  {
    name: "Custom workouts",
    image: "/images/t2.png",
    description: "Every session shaped around your body and goals.",
  },
  {
    name: "Online coaching",
    image: "/images/t3.png",
    description: "Expert structure and accountability, wherever you train.",
  },
  {
    name: "Personal guidance",
    image: "/images/t1.png",
    description: "Focused one-to-one attention at every stage.",
  },
] as const;

const plans = [
  {
    name: "Basic",
    slug: "basic",
    price: "800",
    tone: "light" as const,
    features: [
      "Personalized workout plan",
      "Weekly progress check-in",
      "Nutrition guidance",
      "WhatsApp support",
    ],
  },
  {
    name: "Standard",
    slug: "standard",
    price: "1,200",
    tone: "blue" as const,
    badge: "Most popular",
    features: [
      "2 personalized weekly training sessions",
      "Customized workout plan",
      "Weekly progress tracking",
      "Ongoing support and motivation",
    ],
  },
  {
    name: "Premium",
    slug: "premium",
    price: "1,800",
    tone: "dark" as const,
    features: [
      "4 personalized weekly training sessions",
      "Full-body transformation coaching",
      "Personalized guidance and meal plan",
      "Weekly progress assessment",
      "Priority daily support",
    ],
  },
] as const;

export default function CoachingPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="coaching-title">
        <Image
          className={styles.heroImage}
          src="/images/coaching-bg.png"
          alt="HkFitness coach guiding an athlete through a strength exercise"
          fill
          preload
          sizes="100vw"
        />
        <div className={styles.heroShade} />

        <div className={styles.heroContent}>
          <p className={styles.eyebrow}><span /> Personal coaching / HkFitness</p>
          <h1 id="coaching-title">
            Build the body.<br />
            <em>Become the standard.</em>
          </h1>
          <p className={styles.heroCopy}>
            Personal training with the strategy, accountability, and expert
            guidance to make every session count.
          </p>
          <div className={styles.heroActions}>
            <Link className={styles.primaryButton} href="#plans">
              View coaching plans <span>↓</span>
            </Link>
            <Link className={styles.secondaryButton} href="/contact">
              Talk to a coach <span>↗</span>
            </Link>
          </div>

          <div className={styles.heroProof} aria-label="HkFitness coaching benefits">
            <div><span>01</span><p>Built around<br />your goals</p></div>
            <div><span>02</span><p>Progress tracked<br />every week</p></div>
            <div><span>03</span><p>Real support.<br />Real accountability.</p></div>
          </div>
        </div>
      </section>

      <section className={styles.programs} aria-labelledby="programs-heading">
        <div className={styles.sectionIntro}>
          <div>
            <p className={styles.sectionLabel}>01 / Coaching programs</p>
            <h2 id="programs-heading">A complete approach<br />to your <em>progress.</em></h2>
          </div>
          <p>
            Training is only one part of the transformation. Choose the focus
            you need, then we build every detail around you.
          </p>
        </div>

        <div className={styles.programGrid}>
          {programs.map((program, index) => (
            <Link
              className={styles.programCard}
              href="/contact"
              key={program.name}
              aria-label={`Ask about ${program.name} coaching`}
            >
              <Image
                src={program.image}
                alt={`${program.name} coaching program`}
                fill
                sizes="(max-width: 700px) 84vw, (max-width: 1000px) 50vw, 33vw"
              />
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
      </section>

      <section id="plans" className={styles.plans} aria-labelledby="plans-heading">
        <div className={styles.plansIntro}>
          <div>
            <p className={styles.sectionLabel}>02 / Coaching plans</p>
            <h2 id="plans-heading">Choose your level<br />of <em>support.</em></h2>
          </div>
          <div className={styles.plansCopy}>
            <p>
              Every plan is personal. The difference is how often we train,
              review, and move forward together.
            </p>
            <span>All prices are billed monthly in AED.</span>
          </div>
        </div>

        <div className={styles.planGrid}>
          {plans.map((plan) => (
            <div
              className={`${styles.planScene} ${plan.tone === "blue" ? styles.featuredScene : ""}`}
              key={plan.name}
            >
              <CoachingPlanCard {...plan} />
            </div>
          ))}
        </div>

        <div className={styles.planNote}>
          <p>Not sure which plan fits?</p>
          <Link href="/contact">Start with a free coaching conversation <span>→</span></Link>
        </div>
      </section>
    </main>
  );
}
