import { createContext, useContext, useEffect, useMemo, useReducer } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "jw_cart_v1";

function safeLoad() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((it) => it && it.id && Number.isFinite(Number(it.qty)) && Number(it.qty) > 0)
      .map((it) => ({ id: String(it.id), qty: Math.min(99, Math.max(1, Math.floor(Number(it.qty)))) }));
  } catch {
    return [];
  }
}

function safeSave(cart) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  } catch {
    // ignore (private mode etc.)
  }
}

function reducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const { id, qty = 1 } = action;
      const existing = state.find((it) => it.id === id);
      if (existing) {
        return state.map((it) =>
          it.id === id ? { ...it, qty: Math.min(99, it.qty + qty) } : it
        );
      }
      return [...state, { id, qty: Math.min(99, Math.max(1, qty)) }];
    }
    case "SET_QTY": {
      const { id, qty } = action;
      if (qty <= 0) return state.filter((it) => it.id !== id);
      return state.map((it) =>
        it.id === id ? { ...it, qty: Math.min(99, Math.max(1, qty)) } : it
      );
    }
    case "REMOVE":
      return state.filter((it) => it.id !== action.id);
    case "CLEAR":
      return [];
    default:
      return state;
  }
}

export function CartProvider({ children, products }) {
  const [items, dispatch] = useReducer(reducer, undefined, safeLoad);

  useEffect(() => {
    safeSave(items);
  }, [items]);

  const productMap = useMemo(() => {
    const m = new Map();
    (products || []).forEach((p) => m.set(p.id, p));
    return m;
  }, [products]);

  const detailed = useMemo(
    () =>
      items
        .map((it) => ({ ...it, product: productMap.get(it.id) }))
        .filter((it) => it.product),
    [items, productMap]
  );

  const count = useMemo(() => detailed.reduce((s, it) => s + it.qty, 0), [detailed]);
  const subtotal = useMemo(
    () => detailed.reduce((s, it) => s + (Number(it.product.price) || 0) * it.qty, 0),
    [detailed]
  );
  const grandTotal = subtotal; // no tax/shipping — confirmed on WhatsApp

  const value = useMemo(
    () => ({
      items: detailed,
      count,
      subtotal,
      grandTotal,
      add: (id, qty = 1) => dispatch({ type: "ADD", id, qty }),
      setQty: (id, qty) => dispatch({ type: "SET_QTY", id, qty }),
      remove: (id) => dispatch({ type: "REMOVE", id }),
      clear: () => dispatch({ type: "CLEAR" }),
    }),
    [detailed, count, subtotal, grandTotal]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
