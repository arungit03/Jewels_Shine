import { useCart } from "../context/CartContext.jsx";

export default function OrderSuccess({ info, onClose, onClearAndClose }) {
  const { clear } = useCart();
  if (!info) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4" role="dialog" aria-modal="true" aria-label="Order sent">
      <div className="absolute inset-0 bg-[#2c050d]/70 backdrop-blur-sm" aria-hidden="true" />
      <div className="animate-pop-in relative w-full max-w-md rounded-t-3xl border-t-4 border-[#25a244] bg-[#fffaf1] p-6 text-center sm:rounded-3xl sm:border-4">
        <span className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#25a244] to-[#1f7a3d] text-4xl text-white shadow-xl" aria-hidden="true">
          ✓
          <span className="absolute inset-0 rounded-full ring-4 ring-[#25a244]/30" aria-hidden="true" />
        </span>
        <p className="mt-2 font-script text-3xl text-[#c9a24b]">Shukriya!</p>
        <h2 className="font-display text-2xl font-bold text-[#3a0812]">Order sent to WhatsApp!</h2>
        <p className="mt-1 text-sm text-[#4a3a2a]">
          New Order <span className="font-bold">#{info.orderId}</span> is ready in WhatsApp.
          Just press send there — we&apos;ll confirm availability, collect your address and share a UPI QR for payment.
        </p>
        <div className="mt-5 flex flex-col gap-2">
          <a
            href={info.url}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-gradient-to-r from-[#1f7a3d] to-[#25a244] py-3 text-sm font-bold text-white shadow-lg transition hover:brightness-110"
          >
            💬 Open WhatsApp again
          </a>
          <button
            type="button"
            onClick={() => { clear(); onClearAndClose(); }}
            className="rounded-full border-2 border-[#c9a24b] py-3 text-sm font-bold text-[#3a0812] transition hover:bg-[#faf3e2]"
          >
            Clear cart &amp; continue shopping
          </button>
          <button type="button" onClick={onClose} className="py-1 text-xs font-semibold text-[#8a6d4b] transition hover:text-[#3a0812]">
            Keep cart as it is
          </button>
        </div>
      </div>
    </div>
  );
}
