"use client";

import ArrowIcon from "@/components/ArrowIcon";
import { useState } from "react";
import type { ApparelProduct } from "@/data/apparel";
import ProductMedia from "./ProductMedia";
import styles from "./ProductGallery.module.css";

type Props = {
  product: ApparelProduct;
  selectedImage?: number;
  onSelect?: (index: number) => void;
};

export default function ProductGallery({ product, selectedImage, onSelect }: Props) {
  const [internalIndex, setInternalIndex] = useState(0);
  const index = selectedImage ?? internalIndex;
  const select = (next: number) => { setInternalIndex(next); onSelect?.(next); };
  const count = product.images.length;
  return <div className={styles.gallery}>
    <div className={styles.primary}>
      <ProductMedia src={product.images[index]} alt={`${product.name}, view ${index + 1}`} sizes="(max-width: 860px) 100vw, 55vw" eager />
      {count > 0 && <span className={styles.count} aria-live="polite">{String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}</span>}
      {count > 1 && <div className={styles.navigation}>
        <button type="button" onClick={() => select((index - 1 + count) % count)} aria-label="Previous product image"><ArrowIcon direction="left" /></button>
        <button type="button" onClick={() => select((index + 1) % count)} aria-label="Next product image"><ArrowIcon direction="right" /></button>
      </div>}
    </div>
    {count > 1 && <div className={styles.thumbnails} aria-label="Product image gallery">
      {product.images.map((src, i) => <button key={src} type="button" aria-label={`View ${product.name} image ${i + 1}`} aria-pressed={index === i} onClick={() => select(i)}>
        <ProductMedia src={src} alt={`${product.name} thumbnail ${i + 1}`} sizes="90px" />
      </button>)}
    </div>}
  </div>;
}
