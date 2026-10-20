import SectionHeading from "./SectionHeading.jsx";
import Reveal from "./Reveal.jsx";

const REVIEWS = [
  {
    quote: "The Kundan set looked even better in person. Ordered on WhatsApp in two minutes and it arrived beautifully packed.",
    name: "Priya Sharma",
    city: "Mumbai",
  },
  {
    quote: "Jhumkas are lightweight and the finish is so premium for the price. Seller confirmed everything patiently on chat.",
    name: "Ananya Reddy",
    city: "Hyderabad",
  },
  {
    quote: "Loved that I only paid after confirmation. The UPI process was smooth and delivery took just 4 days.",
    name: "Kavya Menon",
    city: "Chennai",
  },
];

function Stars() {
  return (
    <div className="flex justify-center gap-0.5" aria-label="5 star review">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="h-4 w-4 fill-[#c9a24b]" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2l2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.5-4.8 2.5.9-5.4L4.2 7.7l5.4-.8L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#3a0812] via-[#5e1220] to-[#3a0812]">
      <div className="pattern-royal-light absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-4 py-12">
        <SectionHeading
          dark
          eyebrow="Love notes"
          title="Loved by customers across India"
          sub="Real WhatsApp orders, real doorstep smiles."
        />
        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <Reveal as="figure" key={r.name} variant="zoom" delay={i * 110} className="rounded-3xl border border-[#c9a24b]/40 bg-[#fffaf1] p-5 text-center shadow-xl transition hover:-translate-y-1">
              <span className="font-display text-4xl leading-none text-[#c9a24b]" aria-hidden="true">“</span>
              <blockquote className="-mt-2 text-sm leading-relaxed text-[#4a3a2a]">{r.quote}</blockquote>
              <div className="mt-3"><Stars /></div>
              <figcaption className="mt-2 text-sm font-bold text-[#3a0812]">{r.name}</figcaption>
              <p className="text-xs text-[#8a6d4b]">{r.city}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
