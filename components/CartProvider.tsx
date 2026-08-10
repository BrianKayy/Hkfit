"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type CartContextValue = {
  count: number;
  addItem: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [count, setCount] = useState(0);

  const addItem = useCallback(() => {
    setCount((current) => current + 1);
  }, []);

  const value = useMemo(
    () => ({
      count,
      addItem,
    }),
    [count, addItem],
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}