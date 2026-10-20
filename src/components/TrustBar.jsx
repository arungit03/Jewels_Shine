import Reveal from "./Reveal.jsx";

const PERKS = [
  {
    title: "WhatsApp Ordering",
    text: "Order in 1 minute, no account needed",
    icon: (
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.2 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.4-.7-2.9-1.2-4.7-4.1-4.9-4.3-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5s.8 1.9.8 2c.1.1.1.3 0 .5-.3.6-.6.8-.4 1.1.6 1.1 1.4 1.8 2.5 2.4.3.1.5 0 .7-.2l.8-.9c.2-.3.4-.2.7-.1l1.9.9c.3.1.5.2.5.3 0 .2 0 .5-.1.8z" />
    ),
  },
  {
    title: "Pay After Confirmation",
    text: "UPI QR on chat, zero advance online",
    icon: (
      <path d="M12 2l2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.5-4.8 2.5.9-5.4L4.2 7.7l5.4-.8L12 2z" />
    ),
  },
  {
    title: "7-Day Exchange",
    text: "Easy exchange for defects / wrong item",
    icon: (
      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm-1.2 14.6l-4-4 1.4-1.4 2.6 2.6 5.6-5.6 1.4 1.4z" />
    ),
  },
  {
    title: "Pan-India Delivery",
    text: "Careful packing, tracking on WhatsApp",
    icon: (
      <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7zM7 20a1.8 1.8 0 1 0-1.8-1.8A1.8 1.8 0 0 0 7 20zm11 0a1.8 1.8 0 1 0-1.8-1.8A1.8 1.8 0 0 0 18 20z" />
    ),
  },
];

export default function TrustBar() {
  return (
    <section className="border-y border-[#e3cf9e] bg-[#faf3e2]">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 px-4 py-5 lg:grid-cols-4">
        {PERKS.map((p, i) => (
          <Reveal key={p.title} variant="up" delay={i * 80} className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#3a0812] to-[#842038] shadow">
              <svg className="h-5 w-5 fill-[#f3e2a9]" viewBox="0 0 24 24" aria-hidden="true">{p.icon}</svg>
            </span>
            <span>
              <span className="block text-[13px] font-bold text-[#3a0812]">{p.title}</span>
              <span className="block text-[11px] leading-snug text-[#8a6d4b]">{p.text}</span>
            </span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
