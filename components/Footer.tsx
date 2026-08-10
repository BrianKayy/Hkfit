"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import styles from "./Footer.module.css";

const exploreLinks = [
  { label: "Home", href: "/" },
  { label: "Apparel", href: "/apparel" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const coachingLinks = [
  "Personal coaching",
  "Online coaching",
  "Custom workouts",
  "Nutrition",
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
  }

  return (
    <footer className={styles.footer}>
      <section className={styles.cta} aria-labelledby="footer-cta-title">
        <div>
          <p><span /> Your next level starts here</p>
          <h2 id="footer-cta-title">No shortcuts.<br /><em>Just progress.</em></h2>
        </div>
        <Link href="/coaching" aria-label="Start your HkFitness journey">
          <span>Start your<br />journey</span>
          <b aria-hidden="true">↗</b>
        </Link>
      </section>

      <div className={styles.main}>
        <div className={styles.topGrid}>
          <div className={styles.intro}>
            <Link className={styles.logo} href="/" aria-label="HkFitness home"><span>HK</span>FITNESS</Link>
            <p>Premium performance apparel and expert coaching for people committed to becoming more.</p>
            <div className={styles.socials} aria-label="Social media links">
              <a href="#" aria-label="HkFitness on Instagram">IG</a>
              <a href="#" aria-label="HkFitness on TikTok">TK</a>
              <a href="#" aria-label="HkFitness on YouTube">YT</a>
            </div>
          </div>

          <nav className={styles.linkColumn} aria-label="Footer navigation">
            <p>Explore</p>
            {exploreLinks.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
          </nav>

          <nav className={styles.linkColumn} aria-label="Coaching services">
            <p>Coaching</p>
            {coachingLinks.map((link) => <Link key={link} href="/coaching">{link}</Link>)}
          </nav>

          <div className={styles.newsletter}>
            <p>Stay in the loop</p>
            <h3>Get training insights and first access to new drops.</h3>
            <form onSubmit={handleSubmit}>
              <label htmlFor="footer-email">Email address</label>
              <input id="footer-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="YOUR@EMAIL.COM" required />
              <button type="submit" aria-label="Subscribe to the HkFitness newsletter">{subscribed ? "✓" : "→"}</button>
            </form>
            <span className={styles.formMessage} aria-live="polite">{subscribed ? "You’re on the list." : "No noise. Just value."}</span>
          </div>
        </div>

        <div className={styles.wordmark} aria-hidden="true"><span>HK</span>FITNESS</div>

        <div className={styles.bottomBar}>
          <p>© {new Date().getFullYear()} HkFitness. All rights reserved.</p>
          <div><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Back to top ↑</button></div>
        </div>
      </div>
    </footer>
  );
}
