import { CONFIG } from "../config.js";
import { buildChatUrl } from "../utils/whatsapp.js";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden bg-[#2c050d] text-[#e3cfa5]">
      <div className="h-1.5 bg-gradient-to-r from-[#9a7418] via-[#f7ecc8] to-[#9a7418]" aria-hidden="true" />
      <div className="pattern-royal-light absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-2 px-4 py-10 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#dcbb55] to-[#9a7418] font-display text-2xl font-bold text-[#3a0812] ring-2 ring-[#f3e2a9]/50">
          {CONFIG.SHOP_NAME.charAt(0)}
        </span>
        <p className="gold-text font-display text-3xl font-bold">{CONFIG.SHOP_NAME}</p>
        <p className="font-script text-2xl text-[#dcbb55]">{CONFIG.TAGLINE}</p>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-3 text-[13px] font-semibold">
          <a href="#shop" className="transition hover:text-[#f3e2a9]">Shop</a>
          <span className="text-[#c9a24b]" aria-hidden="true">◆</span>
          <a href="#how-it-works" className="transition hover:text-[#f3e2a9]">How it works</a>
          <span className="text-[#c9a24b]" aria-hidden="true">◆</span>
          <a href="#faq" className="transition hover:text-[#f3e2a9]">FAQ</a>
        </div>
        <a
          href={buildChatUrl(CONFIG.WHATSAPP_NUMBER)}
          target="_blank"
          rel="noreferrer"
          className="mt-3 rounded-full bg-[#25d366] px-7 py-3 text-sm font-bold text-white shadow-xl transition hover:scale-105 hover:bg-[#1fb857]"
        >
          💬 Chat on WhatsApp
        </a>
        <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-[#a8845c]">© {year} {CONFIG.SHOP_NAME} · Crafted with love in India</p>
      </div>
    </footer>
  );
}
