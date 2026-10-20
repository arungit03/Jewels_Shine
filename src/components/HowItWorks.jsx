import SectionHeading from "./SectionHeading.jsx";
import Reveal from "./Reveal.jsx";

const STEPS = [
  { n: "1", icon: "🛍️", title: "Order on WhatsApp", text: "Add designs to cart, tap Buy Now, enter name + phone. WhatsApp opens pre-written — just press send." },
  { n: "2", icon: "💬", title: "We confirm & take address", text: "We reply on chat, confirm availability and collect your full delivery address." },
  { n: "3", icon: "📱", title: "Pay by UPI QR", text: "We send a UPI QR on WhatsApp. Pay only after confirmation — nothing is charged here." },
  { n: "4", icon: "🚚", title: "We ship to you", text: "Packed with care and dispatched after payment. Tracking shared on WhatsApp." },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative scroll-mt-20 overflow-hidden bg-[#faf3e2]">
      <div className="pattern-royal absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-4 py-12">
        <SectionHeading
          eyebrow="Effortless ordering"
          title="How ordering works"
          sub="Simple 4-step WhatsApp ordering — no account, no online payment."
        />
        <ol className="relative mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <span className="absolute left-0 right-0 top-10 hidden h-0.5 bg-gradient-to-r from-transparent via-[#c9a24b]/60 to-transparent lg:block" aria-hidden="true" />
          {STEPS.map((s, i) => (
            <Reveal as="li" key={s.n} variant="up" delay={i * 100} className="card-shine relative rounded-3xl border border-[#e3cf9e] bg-white p-5 text-center shadow-[0_12px_30px_-14px_rgba(58,8,18,0.4)] transition hover:-translate-y-1">
              <span className="absolute right-3 top-3 font-display text-4xl font-bold text-[#c9a24b]/25" aria-hidden="true">{s.n}</span>
              <span className="animate-bob-soft relative mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#3a0812] to-[#842038] text-3xl shadow-lg ring-4 ring-[#f3e2a9]" style={{ animationDelay: `${i * 0.5}s` }}>
                {s.icon}
              </span>
              <h3 className="mt-3 text-sm font-bold text-[#3a0812]">{s.title}</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-[#6b5636]">{s.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
