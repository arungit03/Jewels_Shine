import { CONFIG } from "../config.js";
import { useCart } from "../context/CartContext.jsx";

export default function Header({ search, setSearch, onCartOpen }) {
  const { count } = useCart();
  return (
    <header className="sticky top-0 z-30">
      <div className="h-1 bg-gradient-to-r from-[#9a7418] via-[#f3e2a9] to-[#9a7418]" aria-hidden="true" />
      <div className="border-b border-[#e3cf9e] bg-[#3a0812]/95 shadow-lg backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-2 px-3 py-2.5 sm:gap-4 sm:px-4">
          <a href="#top" className="group flex items-center gap-2.5" aria-label={`${CONFIG.SHOP_NAME} home`}>
            <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#dcbb55] to-[#9a7418] font-display text-xl font-bold text-[#3a0812] ring-2 ring-[#f3e2a9]/60 transition group-hover:ring-[#f3e2a9]">
              {CONFIG.SHOP_NAME.charAt(0)}
              <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-[#25d366] ring-2 ring-[#3a0812]" aria-hidden="true" />
            </span>
            <span className="leading-tight">
              <span className="gold-text block font-display text-xl font-bold">{CONFIG.SHOP_NAME}</span>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.28em] text-[#d9bd9a]">
                Fine Jewellery
              </span>
            </span>
          </a>
          <nav className="ml-2 hidden items-center gap-4 text-[13px] font-semibold text-[#e3cfa5] lg:flex" aria-label="Sections">
            <a href="#shop" className="link-underline transition hover:text-[#f3e2a9]">Shop</a>
            <a href="#how-it-works" className="link-underline transition hover:text-[#f3e2a9]">How it works</a>
            <a href="#faq" className="link-underline transition hover:text-[#f3e2a9]">FAQ</a>
          </nav>
          <div className="relative ml-auto flex-1 lg:max-w-xs">
            <label htmlFor="site-search" className="sr-only">Search products</label>
            <input
              id="site-search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search jhumka, JW-002…"
              className="w-full rounded-full border border-[#c9a24b]/50 bg-white/10 py-2 pl-9 pr-3 text-sm text-[#faf3e2] placeholder:text-[#c8a98a] focus:border-[#f3e2a9] focus:bg-white/15"
            />
            <svg className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#c9a24b]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" />
            </svg>
          </div>
          <button
            type="button"
            id="cart-button"
            onClick={onCartOpen}
            aria-label={`Open cart, ${count} items`}
            className="btn-gold pressable relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M6 8h15l-1.5 8.5a1 1 0 0 1-1 .5H8.7a1 1 0 0 1-1-.8L5 4.5A1 1 0 0 0 4 3.7H2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="9.5" cy="20" r="1.3" /><circle cx="17" cy="20" r="1.3" />
            </svg>
            {count > 0 && (
              <span key={count} className="animate-badge-pop absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#3a0812] px-1 text-[11px] font-bold text-[#f3e2a9] ring-1 ring-[#f3e2a9]">
                {count > 99 ? "99+" : count}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

