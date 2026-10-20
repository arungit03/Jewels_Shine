import { useEffect, useRef, useState } from "react";

const SPARKS = [
  { tx: "-34px", ty: "-26px" },
  { tx: "30px", ty: "-30px" },
  { tx: "-42px", ty: "6px" },
  { tx: "40px", ty: "10px" },
  { tx: "-16px", ty: "-40px" },
  { tx: "18px", ty: "36px" },
];

/**
 * Add-to-cart button with click delight (no libraries):
 * button pops, gold sparkles burst, a dot flies to the cart icon,
 * and the label flips to a green "Added" confirmation before resetting.
 */
export default function AddToCartButton({
  onAdd,
  onAdded,
  addedDelay = 600,
  disabled = false,
  ariaLabel,
  className = "",
  children,
}) {
  const [added, setAdded] = useState(false);
  const [popKey, setPopKey] = useState(0);
  const timers = useRef([]);
  useEffect(() => () => timers.current.forEach((t) => clearTimeout(t)), []);

  const handleClick = (e) => {
    if (disabled) return;
    onAdd?.();
    if (!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      const r = e.currentTarget.getBoundingClientRect();
      window.dispatchEvent(
        new CustomEvent("fly-to-cart", { detail: { x: r.left + r.width / 2, y: r.top + 6 } })
      );
    }
    timers.current.forEach((t) => clearTimeout(t));
    timers.current = [];
    setAdded(true);
    setPopKey((k) => k + 1);
    if (onAdded) timers.current.push(setTimeout(() => onAdded(), addedDelay));
    timers.current.push(setTimeout(() => setAdded(false), 1600));
  };

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={handleClick}
      aria-label={ariaLabel}
      aria-live="polite"
      className={`pressable relative rounded-full font-bold ${
        added
          ? "bg-gradient-to-r from-[#1f7a3d] to-[#25a244] text-white shadow-lg"
          : "btn-maroon"
      } ${className}`}
    >
      <span
        key={popKey}
        className={
          popKey
            ? "animate-add-pop inline-flex items-center justify-center gap-1"
            : "inline-flex items-center justify-center gap-1"
        }
      >
        {added ? "✓ Added to cart" : children}
      </span>
      {added && (
        <span className="pointer-events-none absolute inset-0" aria-hidden="true">
          {SPARKS.map((s, i) => (
            <span
              key={i}
              className="animate-sparkle absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full bg-[#f7ecc8]"
              style={{ "--tx": s.tx, "--ty": s.ty, boxShadow: "0 0 6px 1px rgba(247,236,200,0.9)" }}
            />
          ))}
        </span>
      )}
    </button>
  );
}
