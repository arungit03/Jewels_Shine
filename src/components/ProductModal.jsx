import { useEffect, useState } from "react";
import { formatPrice } from "../utils/format.js";
import { useCart } from "../context/CartContext.jsx";
import ProductImage from "./ProductImage.jsx";
import AddToCartButton from "./AddToCartButton.jsx";

export default function ProductModal({ product, onClose, onAddAndOpenCart }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    setQty(1);
    setActiveImg(0);
  }, [product?.id]);

  useEffect(() => {
    if (!product) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [product, onClose]);

  if (!product) return null;
  const images = product.images?.length ? product.images : [];
  const soldOut = !!product.soldOut;
  const shown = { ...product, images: [images[activeImg] || images[0]] };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4" role="dialog" aria-modal="true" aria-label={product.name}>
      <div className="absolute inset-0 bg-[#2c050d]/70 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div className="animate-pop-in nice-scroll relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl border-t-4 border-[#c9a24b] bg-[#fffaf1] p-4 sm:rounded-3xl sm:border-4 sm:p-6">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close product details"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-[#3a0812] text-white shadow transition hover:bg-[#5e1220]"
        >
          ✕
        </button>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <div className="gold-frame overflow-hidden rounded-2xl">
              <ProductImage product={shown} className="aspect-square w-full" />
            </div>
            {images.length > 1 && (
              <div className="mt-2 flex gap-2">
                {images.map((src, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveImg(i)}
                    aria-label={`View image ${i + 1}`}
                    className={`h-14 w-14 overflow-hidden rounded-xl border-2 ${i === activeImg ? "border-[#c9a227]" : "border-transparent"}`}
                  >
                    <ProductImage product={{ ...product, images: [src] }} className="h-full w-full" />
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <p className="inline-flex w-fit items-center gap-1 rounded-full bg-[#faf3e2] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#9a7418] ring-1 ring-[#c9a24b]/50">
              ✦ {product.category} · {product.id}
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold leading-tight text-[#3a0812]">{product.name}</h2>
            <p className="mt-1 font-display text-2xl font-bold text-[#5e1220]">{formatPrice(product.price)}</p>
            <div className="mt-1 h-0.5 w-16 rounded bg-gradient-to-r from-[#c9a24b] to-transparent" aria-hidden="true" />
            <dl className="mt-3 space-y-1.5 rounded-2xl border border-[#ecdcbb] bg-white p-3 text-sm">
              <div className="flex gap-2"><dt className="w-20 shrink-0 font-bold text-[#5e1220]">Material</dt><dd className="text-[#4a3a2a]">{product.material}</dd></div>
              <div className="flex gap-2"><dt className="w-20 shrink-0 font-bold text-[#5e1220]">Weight</dt><dd className="text-[#4a3a2a]">{product.weight}</dd></div>
            </dl>
            <p className="mt-3 text-sm leading-relaxed text-[#4a3a2a]">{product.description}</p>
            {soldOut ? (
              <p className="mt-4 rounded-2xl bg-[#eee5d3] px-4 py-3 text-center text-sm font-bold text-[#8a6d4b]">
                Currently sold out — message us on WhatsApp for restock.
              </p>
            ) : (
              <>
                <div className="mt-4 flex items-center gap-3">
                  <span className="text-sm font-bold text-[#3a0812]">Qty</span>
                  <div className="flex items-center rounded-full border border-[#e0c98f] bg-white shadow-sm">
                    <button type="button" aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-3.5 py-1.5 text-lg font-bold text-[#5e1220]">−</button>
                    <span className="w-8 text-center font-bold" aria-live="polite">{qty}</span>
                    <button type="button" aria-label="Increase quantity" onClick={() => setQty((q) => Math.min(99, q + 1))} className="px-3.5 py-1.5 text-lg font-bold text-[#5e1220]">+</button>
                  </div>
                </div>
                <AddToCartButton
                  onAdd={() => add(product.id, qty)}
                  onAdded={() => onAddAndOpenCart?.()}
                  ariaLabel={`Add ${qty} ${product.name} to cart`}
                  className="mt-4 py-3.5 text-sm"
                >
                  ✦ Add to cart — {formatPrice((Number(product.price) || 0) * qty)}
                </AddToCartButton>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
