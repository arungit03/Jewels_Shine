import { useEffect, useRef, useState } from "react";

/**
 * Lightweight scroll-reveal wrapper (no libraries).
 * Fades + slides content in once when it enters the viewport.
 * Respects prefers-reduced-motion via CSS.
 */
export default function Reveal({
  children,
  variant = "up",
  delay = 0,
  className = "",
  as: Tag = "div",
  ...rest
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={`reveal reveal-${variant}${visible ? " is-visible" : ""} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}
