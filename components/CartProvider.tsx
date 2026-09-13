"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";

const STORAGE_KEY = "hkfitness-cart";
const STORAGE_VERSION = 1;
const MAX_QUANTITY = 99;

export type CartCurrency = "AED" | "USD";

export type CartItemInput = {
  slug: string;
  name: string;
  price: string;
  image: string;
  color?: string;
  size?: string;
  quantity?: number;
};

export type CartItem = {
  lineId: string;
  slug: string;
  name: string;
  unitPriceMinor: number;
  currency: CartCurrency;
  image: string;
  color?: string;
  size?: string;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotalMinor: number;
  currency: CartCurrency;
  ready: boolean;
  addItem: (item: CartItemInput) => void;
  removeItem: (lineId: string) => void;
  setQuantity: (lineId: string, quantity: number) => void;
  clearCart: () => void;
};

type CartAction =
  | { type: "add"; item: CartItem }
  | { type: "remove"; lineId: string }
  | { type: "quantity"; lineId: string; quantity: number }
  | { type: "replace"; items: CartItem[] }
  | { type: "clear" };

const CartContext = createContext<CartContextValue | null>(null);

function clampQuantity(quantity: number) {
  return Math.min(MAX_QUANTITY, Math.max(1, Math.floor(quantity)));
}

function parsePriceToMinor(price: string) {
  const numeric = Number(price.replace(/,/g, "").replace(/[^0-9.-]/g, ""));
  return Number.isFinite(numeric) ? Math.max(0, Math.round(numeric * 100)) : 0;
}

function detectCurrency(price: string): CartCurrency {
  if (/aed/i.test(price)) return "AED";
  if (price.includes("$")) return "USD";
  return "AED";
}

function createLineId(item: CartItemInput) {
  return [item.slug, item.color ?? "default", item.size ?? "default"]
    .map((value) => value.trim().toLowerCase().replace(/\s+/g, "-"))
    .join("::");
}

function isStoredItem(value: unknown): value is CartItem {
  if (!value || typeof value !== "object") return false;
  const item = value as Partial<CartItem>;
  return (
    typeof item.lineId === "string" &&
    typeof item.slug === "string" &&
    typeof item.name === "string" &&
    typeof item.unitPriceMinor === "number" &&
    Number.isFinite(item.unitPriceMinor) &&
    (item.currency === "AED" || item.currency === "USD") &&
    typeof item.image === "string" &&
    typeof item.quantity === "number" &&
    Number.isFinite(item.quantity)
  );
}

function readStoredCart() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const stored = JSON.parse(raw) as { version?: number; items?: unknown[] };
    if (stored.version !== STORAGE_VERSION || !Array.isArray(stored.items)) return [];
    return stored.items
      .filter(isStoredItem)
      .map((item) => ({ ...item, quantity: clampQuantity(item.quantity) }));
  } catch {
    return [];
  }
}

function cartReducer(items: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case "add": {
      const existing = items.find((item) => item.lineId === action.item.lineId);
      if (!existing) return [...items, action.item];
      return items.map((item) =>
        item.lineId === action.item.lineId
          ? { ...item, quantity: clampQuantity(item.quantity + action.item.quantity) }
          : item,
      );
    }
    case "remove":
      return items.filter((item) => item.lineId !== action.lineId);
    case "quantity":
      if (action.quantity <= 0) {
        return items.filter((item) => item.lineId !== action.lineId);
      }
      return items.map((item) =>
        item.lineId === action.lineId
          ? { ...item, quantity: clampQuantity(action.quantity) }
          : item,
      );
    case "replace":
      return action.items;
    case "clear":
      return [];
  }
}

export function formatCartMoney(amountMinor: number, currency: CartCurrency) {
  return new Intl.NumberFormat(currency === "AED" ? "en-AE" : "en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(amountMinor / 100);
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(cartReducer, []);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;
    queueMicrotask(() => {
      if (!active) return;
      dispatch({ type: "replace", items: readStoredCart() });
      setReady(true);
    });

    function syncCart(event: StorageEvent) {
      if (event.key === STORAGE_KEY) {
        dispatch({ type: "replace", items: readStoredCart() });
      }
    }

    window.addEventListener("storage", syncCart);
    return () => {
      active = false;
      window.removeEventListener("storage", syncCart);
    };
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ version: STORAGE_VERSION, items }),
      );
    } catch {
      // Keep the bag usable when browser storage is unavailable.
    }
  }, [items, ready]);

  const addItem = useCallback((input: CartItemInput) => {
    const quantity = clampQuantity(input.quantity ?? 1);
    dispatch({
      type: "add",
      item: {
        lineId: createLineId(input),
        slug: input.slug,
        name: input.name,
        unitPriceMinor: parsePriceToMinor(input.price),
        currency: detectCurrency(input.price),
        image: input.image,
        color: input.color,
        size: input.size,
        quantity,
      },
    });
  }, []);

  const removeItem = useCallback((lineId: string) => {
    dispatch({ type: "remove", lineId });
  }, []);

  const setQuantity = useCallback((lineId: string, quantity: number) => {
    dispatch({ type: "quantity", lineId, quantity });
  }, []);

  const clearCart = useCallback(() => dispatch({ type: "clear" }), []);

  const count = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items],
  );
  const subtotalMinor = useMemo(
    () => items.reduce((total, item) => total + item.unitPriceMinor * item.quantity, 0),
    [items],
  );
  const currency = items[0]?.currency ?? "AED";

  const value = useMemo(
    () => ({
      items,
      count,
      subtotalMinor,
      currency,
      ready,
      addItem,
      removeItem,
      setQuantity,
      clearCart,
    }),
    [items, count, subtotalMinor, currency, ready, addItem, removeItem, setQuantity, clearCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
