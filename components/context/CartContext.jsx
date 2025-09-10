// /context/CartContext.jsx
"use client";
import { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";

const STORAGE_KEY = "cart:v1";
const CartCtx = createContext(null);

function readStorage() {
  if (typeof window === "undefined") return { items: [] };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { items: [] };
  } catch { return { items: [] }; }
}
function writeStorage(items) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ items }));
  window.dispatchEvent(new Event("cart:changed"));
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  // init & sync
  useEffect(() => {
    setItems(readStorage().items || []);
    const onStorage = () => setItems(readStorage().items || []);
    window.addEventListener("storage", onStorage);
    window.addEventListener("cart:changed", onStorage);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("cart:changed", onStorage);
    };
  }, []);

  const save = (nextItems) => {
    setItems(nextItems);
    writeStorage(nextItems);
  };

  const getQty = useCallback((id, variant) => {
    const it = items.find(i => i.id === id && i.variant === variant);
    return it ? it.qty : 0;
  }, [items]);

  // addItem con límite de stock (max)
  const addItem = useCallback((item, opts = {}) => {
    const want = Math.max(1, Number(item.qty || 1));
    const max = Number.isFinite(opts.max) ? Number(opts.max) : Infinity;

    const next = [...items];
    const idx = next.findIndex(i => i.id === item.id && i.variant === item.variant);
    const existing = idx >= 0 ? next[idx].qty : 0;

    const canAdd = Math.max(0, Math.min(want, max - existing));
    if (canAdd <= 0) {
      return { ok: false, added: 0, newQty: existing, reason: "max_reached" };
    }
    if (idx >= 0) next[idx] = { ...next[idx], qty: existing + canAdd };
    else next.push({ ...item, qty: canAdd });

    save(next);
    return { ok: true, added: canAdd, newQty: (idx >= 0 ? existing + canAdd : canAdd) };
  }, [items]);

  const updateQty = useCallback((id, qty, variant) => {
    const q = Math.max(0, Number(qty || 0));
    const next = items.map(i => (i.id === id && i.variant === variant ? { ...i, qty: q } : i))
                      .filter(i => i.qty > 0);
    save(next);
  }, [items]);

  const removeItem = useCallback((id, variant) => {
    save(items.filter(i => !(i.id === id && i.variant === variant)));
  }, [items]);

  const clear = useCallback(() => save([]), []);

  const count = useMemo(() => items.reduce((n, i) => n + i.qty, 0), [items]);
  const subtotal = useMemo(() => items.reduce((s, i) => s + i.price * i.qty, 0), [items]);

  const value = { items, addItem, updateQty, removeItem, clear, count, subtotal, getQty };
  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

export function useCart() {
  const ctx = useContext(CartCtx);
  if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return ctx;
}

// "use client";
// import { createContext, useContext, useEffect, useMemo, useState } from "react";

// const STORAGE_KEY = "cart:v1";
// const CartCtx = createContext(null);

// function readStorage() {
//   if (typeof window === "undefined") return { items: [] };
//   try {
//     const raw = localStorage.getItem(STORAGE_KEY);
//     return raw ? JSON.parse(raw) : { items: [] };
//   } catch { return { items: [] }; }
// }
// function writeStorage(state) {
//   if (typeof window === "undefined") return;
//   localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
//   window.dispatchEvent(new Event("cart:changed"));
// }

// export function CartProvider({ children }) {
//   const [items, setItems] = useState([]);

//   // init & sync entre pestañas/componentes
//   useEffect(() => {
//     setItems(readStorage().items || []);
//     const onStorage = (e) => {
//       if (e.key === STORAGE_KEY || e.type === "cart:changed") {
//         setItems(readStorage().items || []);
//       }
//     };
//     window.addEventListener("storage", onStorage);
//     window.addEventListener("cart:changed", onStorage);
//     return () => {
//       window.removeEventListener("storage", onStorage);
//       window.removeEventListener("cart:changed", onStorage);
//     };
//   }, []);

//   const save = (next) => {
//     setItems(next);
//     writeStorage({ items: next });
//   };

//   const addItem = (item) => {
//     // item = { id, name, price, qty, image, variant }
//     save((prev => {
//       const list = Array.isArray(items) ? [...items] : [];
//       const idx = list.findIndex(i => i.id === item.id && i.variant === item.variant);
//       if (idx >= 0) list[idx] = { ...list[idx], qty: list[idx].qty + (item.qty || 1) };
//       else list.push({ ...item, qty: item.qty || 1 });
//       return list;
//     })());
//   };

//   const updateQty = (id, qty, variant) => {
//     save(items.map(i => (i.id === id && i.variant === variant ? { ...i, qty } : i)).filter(i => i.qty > 0));
//   };

//   const removeItem = (id, variant) => {
//     save(items.filter(i => !(i.id === id && i.variant === variant)));
//   };

//   const clear = () => save([]);

//   const count = useMemo(() => items.reduce((n, i) => n + i.qty, 0), [items]);
//   const subtotal = useMemo(() => items.reduce((s, i) => s + i.price * i.qty, 0), [items]);

//   const value = { items, addItem, updateQty, removeItem, clear, count, subtotal };
//   return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
// }

// export function useCart() {
//   const ctx = useContext(CartCtx);
//   if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider>");
//   return ctx;
// }
