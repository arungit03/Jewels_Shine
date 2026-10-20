import { useEffect, useRef, useState } from "react";

let seq = 0;

function FlyDot({ dot, onDone }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const dx = dot.tx - dot.x;
    const dy = dot.ty - dot.y;
    const anim = el.animate(
      [
        { transform: "translate(-50%, -50%) scale(1)", opacity: 1 },
        {
          transform: `translate(calc(-50% + ${dx * 0.5}px), calc(-50% + ${dy * 0.5 - 110}px)) scale(0.85)`,
          opacity: 1,
          offset: 0.55,
        },
        { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(0.25)`, opacity: 0.6 },
      ],
      { duration: 700, easing: "cubic-bezier(0.22, 0.8, 0.3, 1)", fill: "forwards" }
    );
    const t = setTimeout(onDone, 720);
    return () => {
      clearTimeout(t);
      anim.cancel();
    };
  }, [dot, onDone]);

  return (
    <span
      ref={ref}
      className="absolute h-4 w-4 rounded-full"
      style={{
        left: dot.x,
        top: dot.y,
        background: "radial-gradient(circle at 35% 35%, #f7ecc8, #c9a24b 70%)",
        boxShadow: "0 0 12px 3px rgba(201,162,75,0.8)",
      }}
    />
  );
}

/**
 * Global overlay: listens for "fly-to-cart" events and animates a gold
 * dot arcing from the clicked button to the header cart icon (no libraries,
 * Web Animations API). Renders nothing until the first add.
 */
export default function FlyToCart() {
  const [dots, setDots] = useState([]);

  useEffect(() => {
    const handler = (e) => {
      if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
      const { x, y } = e.detail || {};
      if (typeof x !== "number" || typeof y !== "number") return;
      const cart = document.getElementById("cart-button");
      let tx = window.innerWidth - 32;
      let ty = 24;
      if (cart) {
        const r = cart.getBoundingClientRect();
        tx = r.left + r.width / 2;
        ty = r.top + r.height / 2;
      }
      const id = ++seq;
      setDots((prev) => [...prev.slice(-5), { id, x, y, tx, ty }]);
      // when the dot lands: remove it + celebrate the cart icon
      setTimeout(() => {
        setDots((prev) => prev.filter((d) => d.id !== id));
        if (cart) {
          cart.classList.remove("animate-cart-shake");
          void cart.offsetWidth;
          cart.classList.add("animate-cart-shake");
        }
      }, 700);
    };
    window.addEventListener("fly-to-cart", handler);
    return () => window.removeEventListener("fly-to-cart", handler);
  }, []);

  if (!dots.length) return null;
  return (
    <div className="pointer-events-none fixed inset-0 z-[70]" aria-hidden="true">
      {dots.map((d) => (
        <FlyDot key={d.id} dot={d} onDone={() => setDots((prev) => prev.filter((p) => p.id !== d.id))} />
      ))}
    </div>
  );
}
