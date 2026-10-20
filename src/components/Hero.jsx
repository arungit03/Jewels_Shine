import { CONFIG } from "../config.js";

const SPARKLES = [
  { left: "8%", top: "22%", size: 5, delay: "0s" },
  { left: "18%", top: "68%", size: 4, delay: "0.7s" },
  { left: "32%", top: "30%", size: 3, delay: "1.4s" },
  { left: "47%", top: "72%", size: 5, delay: "0.4s" },
  { left: "61%", top: "26%", size: 4, delay: "1.1s" },
  { left: "74%", top: "62%", size: 5, delay: "0.2s" },
  { left: "86%", top: "30%", size: 3, delay: "1.8s" },
  { left: "92%", top: "70%", size: 4, delay: "0.9s" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#3a0812]">
      {/* layered royal ambience */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#3a0812] via-[#5e1220] to-[#7a4a08]" aria-hidden="true" />
      <div className="pattern-royal-light absolute inset-0 opacity-70" aria-hidden="true" />
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse 70% 55% at 50% 110%, rgba(201,162,75,0.4), transparent 70%)" }}
        aria-hidden="true"
      />
      {/* twinkling sparkles */}
      {SPARKLES.map((s, i) => (
        <span
          key={i}
          className="animate-floaty absolute rounded-full bg-[#f7ecc8]"
          style={{ left: s.left, top: s.top, width: s.size, height: s.size, animationDelay: s.delay, boxShadow: "0 0 10px 2px rgba(247,236,200,0.8)" }}
          aria-hidden="true"
        />
      ))}
      {/* giant watermark ring */}
      <div className="animate-drift-slow absolute -right-20 -top-20 h-72 w-72 rounded-full border-[10px] border-[#c9a24b]/15 sm:h-96 sm:w-96" aria-hidden="true" />
      <div className="animate-drift-slow absolute -bottom-24 -left-16 h-64 w-64 rounded-full border-[8px] border-[#c9a24b]/10" style={{ animationDelay: "-4.5s" }} aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-4 pb-14 pt-12 text-center sm:pb-20 sm:pt-16">
        <p className="animate-fade-up mb-4 inline-flex items-center gap-2 rounded-full border border-[#c9a24b]/60 bg-white/5 px-5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#f3e2a9]">
          <span className="text-[#dcbb55]">✦</span> New festive collection <span className="text-[#dcbb55]">✦</span>
        </p>
        <p className="animate-fade-up delay-1 font-script text-4xl text-[#dcbb55] sm:text-5xl">Adorn yourself</p>
        <h1 className="animate-fade-up delay-2 mx-auto mt-1 max-w-3xl font-display text-4xl font-bold leading-tight text-[#fffaf1] sm:text-6xl">
          {CONFIG.TAGLINE}
        </h1>
        <p className="animate-fade-up delay-3 mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#e3cfa5] sm:text-base">
          Necklaces, earrings, bangles, rings, chains &amp; anklets — order in 1 minute on WhatsApp.
          No advance payment online. Pay by UPI QR only after we confirm on chat.
        </p>
        <div className="animate-fade-up delay-3 mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a href="#shop" className="btn-gold animate-glow pressable w-full rounded-full px-8 py-3.5 text-sm font-bold sm:w-auto">
            ✦ Shop now
          </a>
          <a
            href="#how-it-works"
            className="pressable w-full rounded-full border border-[#f3e2a9]/50 px-8 py-3.5 text-sm font-semibold text-[#fffaf1] transition hover:bg-white/10 sm:w-auto"
          >
            How ordering works
          </a>
        </div>
        {/* mini stats */}
        <dl className="animate-fade-up delay-3 mx-auto mt-9 grid max-w-lg grid-cols-3 gap-2">
          {[
            ["500+", "Happy customers"],
            ["4.9 ★", "Average rating"],
            ["Pan-India", "Fast delivery"],
          ].map(([v, l]) => (
            <div key={l} className="rounded-2xl border border-[#c9a24b]/30 bg-white/5 px-2 py-3 backdrop-blur-sm">
              <dt className="sr-only">{l}</dt>
              <dd className="font-display text-xl font-bold text-[#f3e2a9]">{v}</dd>
              <dd className="mt-0.5 text-[11px] uppercase tracking-wider text-[#c8a98a]">{l}</dd>
            </div>
          ))}
        </dl>
      </div>
      {/* gold scallop divider */}
      <svg className="relative block h-6 w-full text-[#c9a24b] sm:h-8" viewBox="0 0 1200 32" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 32 Q30 4 60 32 T120 32 T180 32 T240 32 T300 32 T360 32 T420 32 T480 32 T540 32 T600 32 T660 32 T720 32 T780 32 T840 32 T900 32 T960 32 T1020 32 T1080 32 T1140 32 T1200 32 L1200 32 L0 32 Z" fill="currentColor" opacity="0.9" />
      </svg>
      <div className="relative h-1.5 bg-gradient-to-r from-[#9a7418] via-[#f7ecc8] to-[#9a7418]" aria-hidden="true" />
    </section>
  );
}

