import { useEffect, useState } from "react";
import { CONFIG } from "../config.js";
import { formatPrice } from "../utils/format.js";
import { useCart } from "../context/CartContext.jsx";
import { buildOrderMessage, buildWhatsAppUrl, generateOrderId, isValidIndianPhone, normalizeIndianPhone } from "../utils/whatsapp.js";

export default function CheckoutModal({ open, onClose, onSuccess }) {
  const { items, grandTotal } = useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [touched, setTouched] = useState({ name: false, phone: false });

  useEffect(() => {
    if (!open) return;
    setTouched({ name: false, phone: false });
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const nameError = name.trim().length < 2 ? "Please enter your name." : "";
  const phoneError = !isValidIndianPhone(phone) ? "Enter a valid 10-digit mobile number." : "";
  const valid = !nameError && !phoneError && items.length > 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ name: true, phone: true });
    if (!valid) return;
    const now = new Date();
    const orderId = generateOrderId(now);
    const cleanName = name.trim();
    const cleanPhone = normalizeIndianPhone(phone);
    const message = buildOrderMessage({ orderId, name: cleanName, phone: cleanPhone, items, grandTotal, orderDate: now });
    if (import.meta.env.DEV) {
      console.log("[WhatsApp order message]\n" + message);
    }
    const url = buildWhatsAppUrl(CONFIG.WHATSAPP_NUMBER, message);
    window.open(url, "_blank");
    onSuccess({ orderId, url });
  };
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4" role="dialog" aria-modal="true" aria-label="Checkout">
      <div className="absolute inset-0 bg-[#2c050d]/70 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div className="animate-pop-in nice-scroll relative max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl border-t-4 border-[#c9a24b] bg-[#fffaf1] p-5 sm:rounded-3xl sm:border-4 sm:p-6">
        <button type="button" onClick={onClose} aria-label="Close checkout" className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#3a0812] text-white shadow transition hover:bg-[#5e1220]">✕</button>
        <p className="font-script text-3xl text-[#c9a24b]">Almost yours</p>
        <h2 className="font-display text-2xl font-bold text-[#3a0812]">Order on WhatsApp</h2>
        <p className="mt-1 text-sm text-[#8a6d4b]">Just your name and phone. Address is collected on chat.</p>
        <div className="mt-4 rounded-2xl border border-[#e3cf9e] bg-gradient-to-b from-white to-[#fff6e3] p-3.5 text-sm shadow-sm">
          <p className="flex items-center gap-1.5 font-bold text-[#3a0812]">✦ Order summary</p>
          <ul className="nice-scroll mt-2 max-h-40 space-y-1.5 overflow-y-auto">
            {items.map(({ product, qty }) => (
              <li key={product.id} className="flex justify-between gap-2 text-[13px]">
                <span className="truncate text-[#2a1a12]">{product.name} <span className="font-bold text-[#9a7418]">x {qty}</span></span>
                <span className="shrink-0 font-bold">{formatPrice((Number(product.price) || 0) * qty)}</span>
              </li>
            ))}
          </ul>
          <p className="mt-2 flex justify-between border-t border-dashed border-[#c9a24b] pt-2 font-display text-base font-bold text-[#3a0812]">
            <span>Total</span><span>{formatPrice(grandTotal)}</span>
          </p>
        </div>
        <form onSubmit={handleSubmit} noValidate className="mt-4 space-y-3">
          <div>
            <label htmlFor="co-name" className="text-sm font-bold text-[#3a0812]">Name *</label>
            <input id="co-name" value={name} onChange={(e) => setName(e.target.value)} onBlur={() => setTouched((t) => ({ ...t, name: true }))} placeholder="Your full name" autoComplete="name"
              className={`mt-1 w-full rounded-xl border-2 bg-white px-3.5 py-2.5 text-sm transition focus:border-[#c9a24b] ${touched.name && nameError ? "border-red-400" : "border-[#ecdcbb]"}`} />
            {touched.name && nameError && <p className="mt-1 text-xs font-semibold text-red-600" role="alert">{nameError}</p>}
          </div>
          <div>
            <label htmlFor="co-phone" className="text-sm font-bold text-[#3a0812]">Phone (10-digit mobile) *</label>
            <input id="co-phone" value={phone} onChange={(e) => setPhone(e.target.value)} onBlur={() => setTouched((t) => ({ ...t, phone: true }))} placeholder="98765 43210" inputMode="numeric" autoComplete="tel"
              className={`mt-1 w-full rounded-xl border-2 bg-white px-3.5 py-2.5 text-sm transition focus:border-[#c9a24b] ${touched.phone && phoneError ? "border-red-400" : "border-[#ecdcbb]"}`} />
            {touched.phone && phoneError && <p className="mt-1 text-xs font-semibold text-red-600" role="alert">{phoneError}</p>}
          </div>
          <button type="submit" disabled={!valid}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#1f7a3d] to-[#25a244] py-3.5 text-sm font-bold text-white shadow-lg transition hover:brightness-110 disabled:cursor-not-allowed disabled:from-[#c9c2b2] disabled:to-[#c9c2b2] disabled:shadow-none">
            💬 Send order on WhatsApp
          </button>
          <p className="text-center text-[11px] text-[#8a6d4b]">✦ Opens WhatsApp with your order pre-written. No payment taken here.</p>
        </form>
      </div>
    </div>
  );
}
