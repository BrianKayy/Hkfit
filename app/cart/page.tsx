"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { formatCartMoney, useCart } from "@/components/CartProvider";
import styles from "./page.module.css";

export default function CartPage() {
  const {
    items,
    count,
    subtotalMinor,
    currency,
    ready,
    removeItem,
    setQuantity,
    clearCart,
  } = useCart();
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState("");

  function remove(lineId: string, name: string) {
    removeItem(lineId);
    setStatus(`${name} removed from your cart.`);
  }

  function clear() {
    clearCart();
    setStatus("Your cart has been cleared.");
  }

  if (!ready) {
    return (
      <main className={styles.page}>
        <section className={styles.hero}>
          <p>Cart / HkFitness</p>
          <h1>Loading your<br /><em>selection.</em></h1>
        </section>
        <div className={styles.loading} aria-label="Loading shopping cart" />
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="cart-title">
        <div>
          <p>Cart / HkFitness</p>
          <h1 id="cart-title">Your<br /><em>selection.</em></h1>
        </div>
        <div className={styles.heroCount}>
          <span>{String(count).padStart(2, "0")}</span>
          <p>{count === 1 ? "Item" : "Items"}<br />in your bag</p>
        </div>
      </section>

      <p className={styles.srStatus} role="status" aria-live="polite">{status}</p>

      {items.length === 0 ? (
        <section className={styles.empty} aria-labelledby="empty-cart-title">
          <span aria-hidden="true">HK / 00</span>
          <h2 id="empty-cart-title">Your cart is empty.</h2>
          <p>Explore performance apparel built to move through every part of your day.</p>
          <Link href="/apparel">Shop the collection <span aria-hidden="true">↗</span></Link>
        </section>
      ) : (
        <section className={styles.cartLayout} aria-label="Shopping cart">
          <div className={styles.itemsPanel}>
            <div className={styles.itemsHeader}>
              <p>Your items</p>
              <button type="button" onClick={clear}>Clear cart</button>
            </div>

            <div className={styles.itemList}>
              {items.map((item) => (
                <article className={styles.item} key={item.lineId}>
                  <Link
                    className={styles.itemImage}
                    href={`/apparel/${item.slug}`}
                    aria-label={`View ${item.name}`}
                  >
                    {failedImages[item.lineId] ? (
                      <span className={styles.imageFallback}>HK</span>
                    ) : (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="(max-width: 650px) 110px, 180px"
                        onError={() =>
                          setFailedImages((current) => ({ ...current, [item.lineId]: true }))
                        }
                      />
                    )}
                  </Link>

                  <div className={styles.itemInfo}>
                    <div>
                      <p>HkFitness apparel</p>
                      <Link href={`/apparel/${item.slug}`}><h2>{item.name}</h2></Link>
                    </div>
                    {(item.color || item.size) && (
                      <p className={styles.variant}>
                        {item.color && <span>Colour <b>{item.color}</b></span>}
                        {item.size && <span>Size <b>{item.size}</b></span>}
                      </p>
                    )}
                    <button
                      className={styles.remove}
                      type="button"
                      onClick={() => remove(item.lineId, item.name)}
                    >
                      Remove
                    </button>
                  </div>

                  <div className={styles.itemActions}>
                    <strong>{(item.unitPriceMinor === 0 ? "Price on request" : formatCartMoney(item.unitPriceMinor * item.quantity, item.currency))}</strong>
                    <div className={styles.quantity} aria-label={`Quantity for ${item.name}`}>
                      <button
                        type="button"
                        onClick={() => setQuantity(item.lineId, item.quantity - 1)}
                        aria-label={`Decrease ${item.name} quantity`}
                      >
                        −
                      </button>
                      <span aria-live="polite">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => setQuantity(item.lineId, item.quantity + 1)}
                        aria-label={`Increase ${item.name} quantity`}
                        disabled={item.quantity >= 99}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className={styles.summary} aria-labelledby="summary-title">
            <p>Order summary</p>
            <h2 id="summary-title">Ready when<br />you are.</h2>
            <dl>
              <div><dt>Subtotal</dt><dd>{(items.some(item => item.unitPriceMinor === 0) ? "Price on request" : formatCartMoney(subtotalMinor, currency))}</dd></div>
              <div><dt>Delivery</dt><dd>Confirmed with your order</dd></div>
              <div className={styles.total}><dt>Estimated total</dt><dd>{(items.some(item => item.unitPriceMinor === 0) ? "Price on request" : formatCartMoney(subtotalMinor, currency))}</dd></div>
            </dl>
            <button className={styles.checkout} type="button" disabled title="Payment checkout will be connected next">
              Online checkout coming soon <span aria-hidden="true">→</span>
            </button>
            <p className={styles.checkoutNote}>Your selection is saved on this device. Contact customer care for pricing and ordering assistance.</p>
            <Link className={styles.continue} href="/apparel">← Continue shopping</Link>
          </aside>
        </section>
      )}
    </main>
  );
}

