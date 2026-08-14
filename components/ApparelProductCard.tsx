"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { ApparelProduct } from "@/data/apparel";
import AddToCartButton from "./AddToCartButton";
import styles from "./ApparelProductCard.module.css";

export default function ApparelProductCard({ product }: { product: ApparelProduct }) {
  const [imageIndex, setImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[1] ?? product.sizes[0]);
  const [imageFailed, setImageFailed] = useState(false);

  function changeImage(offset: number) {
    setImageFailed(false);
    setImageIndex((current) => (current + offset + product.images.length) % product.images.length);
  }

  return (
    <article className={styles.card}>
      <div className={styles.visual}>
        <Link href={`/apparel/${product.slug}`} className={styles.imageLink} aria-label={`View ${product.name}`}>
          {imageFailed ? (
            <div className={styles.imageFallback}>
              <span>HK</span><small>Image {String(imageIndex + 1).padStart(2, "0")} / 08</small>
            </div>
          ) : (
            <Image src={product.images[imageIndex]} alt={`${product.name}, image ${imageIndex + 1}`} fill sizes="(max-width: 620px) 86vw, (max-width: 980px) 48vw, 25vw" onError={() => setImageFailed(true)} />
          )}
        </Link>
        <span className={styles.label}>{product.label}</span>
        <span className={styles.imageCount}>{String(imageIndex + 1).padStart(2, "0")} / 08</span>
        <div className={styles.imageActions}>
          <button type="button" onClick={() => changeImage(-1)} aria-label={`Previous ${product.name} image`}>←</button>
          <button type="button" onClick={() => changeImage(1)} aria-label={`Next ${product.name} image`}>→</button>
        </div>
      </div>

      <div className={styles.info}>
        <div className={styles.titleRow}>
          <div><p>{product.category}</p><Link href={`/apparel/${product.slug}`}><h2>{product.name}</h2></Link></div>
          <strong>{product.price}</strong>
        </div>

        <div className={styles.options}>
          <div className={styles.optionRow}>
            <span>Colour <b>{selectedColor.label}</b></span>
            <div className={styles.swatches}>
              {product.colors.map((color) => (
                <button key={color.label} type="button" aria-label={`Select ${color.label}`} aria-pressed={selectedColor.label === color.label} onClick={() => setSelectedColor(color)} style={{ "--swatch": color.value } as React.CSSProperties} />
              ))}
            </div>
          </div>
          <div className={styles.optionRow}>
            <span>Size <b>{selectedSize}</b></span>
            <div className={styles.sizes}>
              {product.sizes.map((size) => <button key={size} type="button" aria-pressed={selectedSize === size} onClick={() => setSelectedSize(size)}>{size}</button>)}
            </div>
          </div>
        </div>

        <div className={styles.addButton}>
          <div className={styles.addButton}>
  <AddToCartButton
    item={{
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.images[imageIndex] ?? product.images[0],
      color: selectedColor.label,
      size: selectedSize,
    }}
  />
</div>
        </div>
      </div>
    </article>
  );
}
