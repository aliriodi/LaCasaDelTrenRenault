"use client";
import { useCallback, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "cart:v1";

export type CartItem = {
  id: string;          // productId
  name: string;
  price: number;       // precio unitario (USD o VES)
  qty: number;
  image?: string;
  variant?: string;    // ej: lado, marca, etc.
};

type CartState = { items: CartItem[]; currency: "USD" | "VES" };

const read = (): CartState => {
  if (typeof window === "undefined") return { items: [], currency: "USD" };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { items: [], currency: "USD" };
  } catch {
    return { items: [], currency: "USD" };
  }
};

const write = (state: CartState) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

export function useCart() {
  const [state, setState] = useState<CartState>({ items: [], currency: "USD" });

  useEffect(() => { setState(read()); }, []);
  useEffect(() => { write(state); }, [state]);

  const addItem = useCallback((item: CartItem) => {
    setState(prev => {
      const idx = prev.items.findIndex(i => i.id === item.id && i.variant === item.variant);
      const items = [...prev.items];
      if (idx >= 0) items[idx] = { ...items[idx], qty: items[idx].qty + item.qty };
      else items.push(item);
      return { ...prev, items };
    });
  }, []);

  const updateQty = useCallback((id: string, qty: number, variant?: string) => {
    setState(prev => {
      const items = prev.items.map(i => (i.id === id && i.variant === variant ? { ...i, qty } : i))
                              .filter(i => i.qty > 0);
      return { ...prev, items };
    });
  }, []);

  const removeItem = useCallback((id: string, variant?: string) => {
    setState(prev => ({ ...prev, items: prev.items.filter(i => !(i.id === id && i.variant === variant)) }));
  }, []);

  const clear = useCallback(() => setState({ items: [], currency: state.currency }), [state.currency]);

  const subtotal = useMemo(() => state.items.reduce((s, i) => s + i.price * i.qty, 0), [state.items]);

  return {
    items: state.items,
    currency: state.currency,
    addItem, updateQty, removeItem, clear,
    subtotal,
    total: subtotal, // agrega envíos/impuestos si corresponde
  };
}
