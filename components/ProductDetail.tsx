"use client";

import ArrowIcon from "@/components/ArrowIcon";
import { useState } from "react";
import Link from "next/link";
import type { ApparelProduct } from "@/data/apparel";
import ProductGallery from "./ProductGallery";
import AddToCartButton from "./AddToCartButton";
import styles from "./ProductDetail.module.css";

export default function ProductDetail({ product }: { product: ApparelProduct }) {
  const [imageIndex, setImageIndex] = useState(0);
  const [color, setColor] = useState(product.colors[0]?.label ?? "");
  const [size, setSize] = useState("");
  const [sizeError, setSizeError] = useState(false);
  const selectedColor = product.colors.find(c => c.label === color);
  const canAdd = Boolean(color && size);

  function chooseColor(label: string) {
    setColor(label);
    const image = product.colors.find(c => c.label === label)?.image;
    const index = image ? product.images.indexOf(image) : -1;
    if (index >= 0) setImageIndex(index);
  }

  return <section className={styles.product}>
    <ProductGallery product={product} selectedImage={imageIndex} onSelect={setImageIndex} />
    <div className={styles.details}>
      <p className="eyebrow">{product.category} / The new collection</p>
      <h1>{product.name}</h1>
      <p className={styles.price}>{product.price}</p>
      <p className={styles.description}>{product.description}</p>
      <fieldset className={styles.fieldset}>
        <legend>Colour <span>{color || "Details coming soon"}</span></legend>
        <div className={styles.colors}>
          {product.colors.map(c => <button key={c.label} type="button" aria-label={`Select ${c.label}`} aria-pressed={color === c.label} onClick={() => chooseColor(c.label)}>
            <i style={{ backgroundColor: c.value }} /><span>{c.label}</span>
          </button>)}
        </div>
        {!product.colors.length && <p className={styles.notice}>Colour options will be added with the product photography.</p>}
      </fieldset>
      <fieldset className={styles.fieldset} aria-describedby={sizeError ? "size-error" : undefined}>
        <legend>Size <span>{size || "Select your size"}</span></legend>
        <div className={styles.sizes}>{product.sizes.map(s => <button key={s} type="button" aria-label={`Size ${s}`} aria-pressed={size === s} onClick={() => { setSize(s); setSizeError(false); }}>{s}</button>)}</div>
      </fieldset>
      {sizeError && <p className={styles.notice} id="size-error" role="alert">Please select a size above.</p>}
      <div className={styles.purchase}>
        {canAdd ? <AddToCartButton item={{ slug: product.slug, name: product.name, price: product.price, image: selectedColor?.image ?? product.images[0] ?? "", color, size }} /> : <button type="button" disabled={!color} onClick={() => setSizeError(true)}>{color ? "Select a size" : "Coming soon"}<span>+</span></button>}
      </div>
      <p className={styles.help}>Unsure about your fit? <Link href="/contact">Ask us <ArrowIcon /></Link></p>
      <div className={styles.accordions}>
        <details open><summary>What’s included <span>+</span></summary><p>{product.includes}</p></details>
        <details><summary>Size & colour <span>+</span></summary><p>Available sizes: {product.sizes.join(", ")}. Select your size and colour before adding to your bag. Colours may appear slightly different across screens.</p></details>
        <details><summary>Delivery & assistance <span>+</span></summary><p>Delivery across the UAE takes a maximum of 3 days. Contact our team for delivery charges and ordering assistance. <Link href="/contact">Get in touch <ArrowIcon /></Link></p></details>
      </div>
    </div>
  </section>;
}
