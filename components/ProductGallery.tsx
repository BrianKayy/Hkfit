"use client";

import Image from "next/image";
import { useState } from "react";
import type { ApparelProduct } from "@/data/apparel";
import styles from "./ProductGallery.module.css";

type ProductGalleryProps = {
  product: ApparelProduct;
};

export default function ProductGallery({
  product,
}: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [imageFailed, setImageFailed] = useState(false);

  function selectImage(index: number) {
    setSelectedImage(index);
    setImageFailed(false);
  }

  function showPreviousImage() {
    const previousIndex =
      (selectedImage - 1 + product.images.length) %
      product.images.length;

    selectImage(previousIndex);
  }

  function showNextImage() {
    const nextIndex =
      (selectedImage + 1) % product.images.length;

    selectImage(nextIndex);
  }

  return (
    <div className={styles.gallery}>
      <div className={styles.primary}>
        {imageFailed ? (
          <div className={styles.fallback}>
            HK

            <span>
              {String(selectedImage + 1).padStart(2, "0")} / {String(product.images.length).padStart(2, "0")}
            </span>
          </div>
        ) : (
          <Image
            src={product.images[selectedImage]}
            alt={`${product.name}, gallery image ${selectedImage + 1}`}
            fill
            loading="eager"
            sizes="(max-width: 860px) 100vw, 62vw"
            onError={() => setImageFailed(true)}
          />
        )}

        <span>
          {String(selectedImage + 1).padStart(2, "0")} / {String(product.images.length).padStart(2, "0")}
        </span>

        <div className={styles.navigation}>
          <button
            type="button"
            onClick={showPreviousImage}
            aria-label="View previous image"
          >
            ←
          </button>

          <button
            type="button"
            onClick={showNextImage}
            aria-label="View next image"
          >
            →
          </button>
        </div>
      </div>

      <div className={styles.thumbnails}>
        {product.images.map((image, index) => (
          <button
            key={image}
            type="button"
            aria-label={`View ${product.name} image ${index + 1}`}
            aria-pressed={selectedImage === index}
            onClick={() => selectImage(index)}
          >
            {String(index + 1).padStart(2, "0")}
          </button>
        ))}
      </div>
    </div>
  );
}

