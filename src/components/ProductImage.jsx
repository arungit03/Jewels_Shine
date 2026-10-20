import { useState } from "react";

const CATEGORY_STYLES = {
  Necklaces: { bg: "radial-gradient(circle at 50% 30%, #a8324a 0%, #5e1220 55%, #2c050d 100%)", icon: "necklace" },
  Earrings: { bg: "radial-gradient(circle at 50% 30%, #dcbb55 0%, #9a7418 55%, #4d3a08 100%)", icon: "earring" },
  Bangles: { bg: "radial-gradient(circle at 50% 30%, #b03a4b 0%, #6d1423 55%, #33060f 100%)", icon: "bangle" },
  Rings: { bg: "radial-gradient(circle at 50% 30%, #8f6fc0 0%, #4d3572 55%, #241235 100%)", icon: "ring" },
  Chains: { bg: "radial-gradient(circle at 50% 30%, #4aa88c 0%, #1f4e4a 55%, #0b2422 100%)", icon: "chain" },
  Anklets: { bg: "radial-gradient(circle at 50% 30%, #e09b4a 0%, #8a4d12 55%, #3d2206 100%)", icon: "anklet" },
};

function CategoryIcon({ icon }) {
  const common = {
    fill: "none",
    stroke: "rgba(255,255,255,0.92)",
    strokeWidth: 1.6,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
  switch (icon) {
    case "necklace":
      return (
        <svg width="44" height="44" viewBox="0 0 24 24" {...common} aria-hidden="true">
          <path d="M4 4c3 5 5 9 8 9s5-4 8-9" />
          <circle cx="12" cy="15.5" r="2.2" />
          <circle cx="12" cy="15.5" r="0.6" fill="rgba(255,255,255,0.92)" />
        </svg>
      );
    case "earring":
      return (
        <svg width="44" height="44" viewBox="0 0 24 24" {...common} aria-hidden="true">
          <circle cx="12" cy="6" r="2.4" />
          <path d="M12 8.5v4" />
          <path d="M9 15.5c0 2 1.2 3.5 3 3.5s3-1.5 3-3.5c0-2-1.2-3-3-3s-3 1-3 3z" />
        </svg>
      );
    case "bangle":
      return (
        <svg width="44" height="44" viewBox="0 0 24 24" {...common} aria-hidden="true">
          <ellipse cx="12" cy="12" rx="7.5" ry="5.5" />
          <ellipse cx="12" cy="12" rx="4.5" ry="3" />
        </svg>
      );
    case "ring":
      return (
        <svg width="44" height="44" viewBox="0 0 24 24" {...common} aria-hidden="true">
          <path d="M9 8l3-4 3 4" />
          <circle cx="12" cy="14" r="5" />
          <circle cx="12" cy="14" r="1" fill="rgba(255,255,255,0.92)" />
        </svg>
      );
    case "chain":
      return (
        <svg width="44" height="44" viewBox="0 0 24 24" {...common} aria-hidden="true">
          <path d="M9 15l6-6" />
          <rect x="3.5" y="12.5" width="7" height="5" rx="2.5" transform="rotate(-45 7 15)" />
          <rect x="13.5" y="6.5" width="7" height="5" rx="2.5" transform="rotate(-45 17 9)" />
        </svg>
      );
    default:
      return (
        <svg width="44" height="44" viewBox="0 0 24 24" {...common} aria-hidden="true">
          <path d="M3 17c4 1.5 6-1 9 0s5 1.5 9 0" />
          <circle cx="12" cy="18.5" r="1.2" />
          <circle cx="7" cy="9" r="1.4" />
          <circle cx="17" cy="9" r="1.4" />
        </svg>
      );
  }
}

export default function ProductImage({ product, className = "", imgClassName = "" }) {
  const [failed, setFailed] = useState(false);
  const src = product?.images?.[0];
  const style = CATEGORY_STYLES[product?.category] || CATEGORY_STYLES.Necklaces;

  if (!src || failed) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center gap-2 overflow-hidden ${className}`}
        style={{ background: style.bg }}
        role="img"
        aria-label={`${product?.name || "Jewellery"} placeholder`}
      >
        {/* soft glow + sparkles */}
        <span className="absolute left-1/2 top-1/3 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/20 blur-2xl" aria-hidden="true" />
        <span className="animate-twinkle absolute left-[18%] top-[18%] h-1.5 w-1.5 rounded-full bg-white/90" style={{ boxShadow: "0 0 8px 2px rgba(255,255,255,0.7)" }} aria-hidden="true" />
        <span className="animate-twinkle absolute right-[20%] top-[30%] h-1 w-1 rounded-full bg-white/80" style={{ boxShadow: "0 0 6px 2px rgba(255,255,255,0.6)", animationDelay: "-0.9s" }} aria-hidden="true" />
        <span className="animate-twinkle absolute bottom-[24%] left-[28%] h-1 w-1 rounded-full bg-[#f7ecc8]" style={{ boxShadow: "0 0 6px 2px rgba(247,236,200,0.7)", animationDelay: "-1.8s" }} aria-hidden="true" />
        {/* jewel medallion */}
        <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white/10 ring-2 ring-[#f7ecc8]/70" style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.4)" }} aria-hidden="true">
          <CategoryIcon icon={style.icon} />
        </span>
        <span className="rounded-full border border-[#f7ecc8]/50 bg-black/25 px-3 py-0.5 text-[10px] font-bold uppercase tracking-[0.22em] text-[#fdf3d0]">
          {product?.category || "Jewels"}
        </span>
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={product?.name || "Jewellery product"}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`object-cover ${className} ${imgClassName}`}
    />
  );
}
