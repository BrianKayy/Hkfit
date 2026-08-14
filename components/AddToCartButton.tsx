"use client";

import { useEffect, useRef, useState } from "react";
import { type CartItemInput, useCart } from "./CartProvider";

export default function AddToCartButton({ item }: { item: CartItemInput }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  function handleClick() {
    addItem(item);
    setAdded(true);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setAdded(false), 1400);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={added ? `${item.name} added to cart` : `Add ${item.name} to cart`}
    >
      <span aria-live="polite">{added ? "Added to cart" : "Add to cart"}</span>
      <span aria-hidden="true">{added ? "✓" : "+"}</span>
    </button>
  );
}
