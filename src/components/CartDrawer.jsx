import { useEffect } from "react";
import { formatPrice } from "../utils/format.js";
import { useCart } from "../context/CartContext.jsx";
import ProductImage from "./ProductImage.jsx";

export default function CartDrawer({ open, onClose, onBuyNow }) {
  const { items, subtotal, grandTotal, setQty, remove } = useCart();

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Shopping cart">
      <div className="absolute inset-0 bg-[#2c050d]/70 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <aside className="animate-slide-in-right absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-[#fffaf1] shadow-2xl">
        <div className="bg-gradient-to-r from-[#3a0812] to-[#5e1220] px-4 py-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-bold text-[#f3e2a9]">
              ✦ Your Cart {items.length > 0 && <span className="font-body text-sm font-semibold text-[#d9bd9a]">({items.length} {items.length === 1 ? "item" : "items"})</span>}
            </h2>
            <button type="button" onClick={onClose} aria-label="Close cart" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20">✕</button>
          </div>
          <div className="mt-2 h-0.5 rounded bg-gradient-to-r from-[#9a7418] via-[#f7ecc8] to-[#9a7418]" aria-hidden="true" />
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-2 px-6 text-center">
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#faf3e2] to-[#efdfbc] text-4xl ring-2 ring-[#c9a24b]/50" aria-hidden="true">💎</span>
            <p className="font-script text-4xl text-[#c9a24b]">Empty for now</p>
            <p className="font-display text-xl font-semibold text-[#3a0812]">Your cart awaits sparkle</p>
            <p className="text-sm text-[#8a6d4b]">Browse our designs and add your favourites.</p>
            <button type="button" onClick={onClose} className="btn-maroon mt-3 rounded-full px-8 py-3 text-sm font-bold">
              Continue shopping
            </button>
          </div>
        ) : (
          <>
            <ul className="nice-scroll flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {items.map(({ product, qty }) => (
                <li key={product.id} className="flex gap-3 rounded-2xl border border-[#ecdcbb] bg-white p-2.5 shadow-[0_8px_20px_-12px_rgba(58,8,18,0.35)]">
                  <ProductImage product={product} className="h-20 w-20 shrink-0 rounded-xl" />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <p className="truncate text-sm font-semibold text-[#2a1a12]">{product.name}</p>
                    <p className="text-[11px] font-semibold text-[#9a7418]">{product.id}</p>
                    <p className="text-sm font-bold text-[#5e1220]">{formatPrice(product.price)}</p>
                    <div className="mt-auto flex items-center justify-between pt-1">
                      <div className="flex items-center rounded-full border border-[#e0c98f] bg-[#fffaf1]">
                        <button type="button" aria-label={`Decrease quantity of ${product.name}`} onClick={() => setQty(product.id, qty - 1)} className="px-2.5 py-0.5 font-bold text-[#5e1220]">−</button>
                        <span className="w-7 text-center text-sm font-bold" aria-live="polite">{qty}</span>
                        <button type="button" aria-label={`Increase quantity of ${product.name}`} onClick={() => setQty(product.id, qty + 1)} className="px-2.5 py-0.5 font-bold text-[#5e1220]">+</button>
                      </div>
                      <span className="text-sm font-bold text-[#2a1a12]">{formatPrice((Number(product.price) || 0) * qty)}</span>
                    </div>
                  </div>
                  <button type="button" onClick={() => remove(product.id)} aria-label={`Remove ${product.name} from cart`} className="self-start rounded-full p-1.5 text-[#a89576] hover:bg-red-50 hover:text-red-700">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m-9 0l1 13h8l1-13" strokeLinecap="round" /></svg>
                  </button>
                </li>
              ))}
            </ul>
            <div className="border-t border-[#e3cf9e] bg-gradient-to-b from-white to-[#fff3d9] px-4 py-4">
              <div className="flex justify-between text-sm text-[#4a3a2a]"><span>Subtotal</span><span className="font-semibold">{formatPrice(subtotal)}</span></div>
              <div className="mt-1 flex justify-between font-display text-lg font-bold text-[#3a0812]"><span>Grand total</span><span>{formatPrice(grandTotal)}</span></div>
              <p className="mt-1 text-[11px] text-[#8a6d4b]">✦ Shipping &amp; payment confirmed on WhatsApp — no online payment needed.</p>
              <button
                type="button"
                onClick={onBuyNow}
                disabled={items.length === 0}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#1f7a3d] to-[#25a244] py-3.5 text-sm font-bold text-white shadow-lg transition hover:brightness-110 disabled:cursor-not-allowed disabled:bg-[#c9c2b2] disabled:shadow-none"
              >
                💬 Buy Now — Order on WhatsApp
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
