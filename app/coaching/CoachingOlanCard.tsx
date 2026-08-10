"use client";

import Link from "next/link";
import type { PointerEvent as ReactPointerEvent } from "react";
import styles from "./page.module.css";

type CoachingPlanCardProps = {
  name: string;
  slug: string;
  price: string;
  features: readonly string[];
  tone: "light" | "blue" | "dark";
  badge?: string;
};

const tiltQuery =
  "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

function handleTilt(event: ReactPointerEvent<HTMLElement>) {
  if (event.pointerType !== "mouse" || !window.matchMedia(tiltQuery).matches) return;

  const card = event.currentTarget;
  const bounds = card.getBoundingClientRect();
  const x = (event.clientX - bounds.left) / bounds.width;
  const y = (event.clientY - bounds.top) / bounds.height;

  card.style.setProperty("--rotate-x", `${(0.5 - y) * 6}deg`);
  card.style.setProperty("--rotate-y", `${(x - 0.5) * 8}deg`);
  card.style.setProperty("--pointer-x", `${x * 100}%`);
  card.style.setProperty("--pointer-y", `${y * 100}%`);
  card.dataset.tilting = "true";
}

function resetTilt(event: ReactPointerEvent<HTMLElement>) {
  const card = event.currentTarget;
  card.style.setProperty("--rotate-x", "0deg");
  card.style.setProperty("--rotate-y", "0deg");
  delete card.dataset.tilting;
}

export default function CoachingPlanCard({
  name,
  slug,
  price,
  features,
  tone,
  badge,
}: CoachingPlanCardProps) {
  return (
    <article
      className={`${styles.planCard} ${styles[tone]}`}
      aria-labelledby={`plan-${slug}`}
      onPointerMove={handleTilt}
      onPointerLeave={resetTilt}
      onPointerCancel={resetTilt}
    >
      <span className={styles.cardGlow} aria-hidden="true" />

      <div className={styles.planTopline}>
        <span>Hk / Coaching plan</span>
        {badge && <b>{badge}</b>}
      </div>

      <div className={styles.planHeading}>
        <h3 id={`plan-${slug}`}>{name}</h3>
        <p className={styles.price} aria-label={`AED ${price} per month`}>
          <span>AED</span>
          <strong aria-hidden="true">{price}</strong>
          <small aria-hidden="true">/ month</small>
        </p>
      </div>

      <div className={styles.planDivider} aria-hidden="true" />

      <ul className={styles.featureList}>
        {features.map((feature) => (
          <li key={feature}>
            <span aria-hidden="true">✓</span>
            {feature}
          </li>
        ))}
      </ul>

      <Link
        className={styles.planButton}
        href={`/contact?plan=${slug}`}
        aria-label={`Choose the ${name} coaching plan`}
      >
        <span>Choose {name}</span>
        <b aria-hidden="true">↗</b>
      </Link>
    </article>
  );
}
