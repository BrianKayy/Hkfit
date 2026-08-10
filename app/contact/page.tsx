"use client";

import { FormEvent, useState } from "react";
import styles from "./page.module.css";

const programs = [
  "Weight loss",
  "Muscle gain",
  "Nutrition",
  "Custom workouts",
  "Online coaching",
  "Personal guidance",
];

const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/",
    icon: "https://cdn.simpleicons.org/instagram/ffffff",
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/",
    icon: "https://cdn.simpleicons.org/youtube/ffffff",
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/",
    icon: "https://cdn.simpleicons.org/tiktok/ffffff",
  },
  {
    name: "WhatsApp",
    href: "https://www.whatsapp.com/",
    icon: "https://cdn.simpleicons.org/whatsapp/ffffff",
  },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    event.currentTarget.reset();
  }

  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="contact-title">
        <div>
          <p className={styles.eyebrow}><span /> Contact / Coaching</p>
          <h1 id="contact-title">Your next level<br />starts with <em>one step.</em></h1>
        </div>
        <p className={styles.heroCopy}>Tell us where you are, where you want to go, and what has been getting in the way. We will help you build the path forward.</p>
      </section>

      <section className={styles.contactSection}>
        <aside className={styles.infoPanel}>
          <div>
            <p className={styles.panelLabel}>Start the conversation</p>
            <h2>Training built<br />around <em>you.</em></h2>
            <p className={styles.panelCopy}>No templates. No guesswork. Every recommendation begins with your goals, schedule, experience, and lifestyle.</p>
          </div>

          <ol className={styles.steps}>
            <li><span>01</span><div><b>Tell us your goal</b><p>Choose the program that best matches where you want to go.</p></div></li>
            <li><span>02</span><div><b>We review your needs</b><p>Your enquiry is considered personally, not automatically.</p></div></li>
            <li><span>03</span><div><b>Build your plan</b><p>We align the right coaching structure with your lifestyle.</p></div></li>
          </ol>

          <div className={styles.contactMeta}>
            <div><span>Email</span><a href="mailto:hello@hkfitness.com">hello@hkfitness.com</a></div>
            <div><span>Response time</span><p>Within 24 hours</p></div>
          </div>

          <div className={styles.socialBlock}>
            <p>Follow the movement</p>
            <nav className={styles.socialLinks} aria-label="HkFitness social media">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Visit HkFitness on ${social.name}`}
                >
                  <img src={social.icon} alt="" width="18" height="18" aria-hidden="true" />
                  <span>{social.name}</span>
                  <b aria-hidden="true">↗</b>
                </a>
              ))}
            </nav>
          </div>
        </aside>

        <div className={styles.formWrap}>
          <div className={styles.formHeading}>
            <p>Coaching enquiry</p>
            <h2>Let&apos;s get to work.</h2>
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.twoColumns}>
              <div className={styles.field}>
                <label htmlFor="name">Full name</label>
                <input id="name" name="name" type="text" autoComplete="name" placeholder="YOUR NAME" required />
              </div>
              <div className={styles.field}>
                <label htmlFor="email">Email address</label>
                <input id="email" name="email" type="email" autoComplete="email" placeholder="YOU@EMAIL.COM" required />
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="program">Choose a training program</label>
              <div className={styles.selectWrap}>
                <select id="program" name="program" defaultValue="" required>
                  <option value="" disabled>Select your program</option>
                  {programs.map((program) => <option key={program} value={program}>{program}</option>)}
                </select>
                <span aria-hidden="true">↓</span>
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="message">Tell us more</label>
              <textarea id="message" name="message" rows={6} placeholder="SHARE YOUR GOALS, EXPERIENCE, SCHEDULE, OR ANYTHING ELSE WE SHOULD KNOW..." required />
              <small>Be as detailed as you like.</small>
            </div>

            <button className={styles.submit} type="submit">
              <span>Submit enquiry</span><b aria-hidden="true">↗</b>
            </button>

            <p className={styles.status} role="status" aria-live="polite">
              {submitted ? "Thank you — your enquiry has been prepared successfully." : "By submitting, you agree to be contacted about HkFitness coaching."}
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}
