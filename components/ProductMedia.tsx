"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./ProductMedia.module.css";

export default function ProductMedia({ src, alt, sizes = "50vw", eager = false }: {
  src?: string; alt: string; sizes?: string; eager?: boolean;
}) {
  const [failedSrc, setFailedSrc] = useState<string>();
  if (!src || failedSrc === src) return (
    <div className={styles.placeholder} role="img" aria-label={`${alt} — ${src ? "image unavailable" : "photography coming soon"}`}>
      <span className={styles.mark}>HK</span>
      <span>{src ? "Image temporarily unavailable" : "Photography coming soon"}</span>
    </div>
  );
  return <Image src={src} alt={alt} fill sizes={sizes} unoptimized={src.toLowerCase().endsWith(".png")} loading={eager ? "eager" : "lazy"} onError={() => setFailedSrc(src)} />;
}
