"use client";

import { useState } from "react";
import { useCart } from "@/components/CartProvider";

type AddToCartButtonProps = {
  productName: string;
};

export default function AddToCartButton({
  productName,
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    addItem();
    setAdded(true);

    window.setTimeout(() => {
      setAdded(false);
    }, 1200);
  }

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      aria-label={`Add ${productName} to cart`}
    >
      <span>{added ? "Added" : "Add to cart"}</span>
      <span aria-hidden="true">{added ? "✓" : "+"}</span>
    </button>
  );
}