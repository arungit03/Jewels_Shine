import { useState } from "react";
import SectionHeading from "./SectionHeading.jsx";
import Reveal from "./Reveal.jsx";

const FAQS = [
  { q: "How do I pay?", a: "Payment is by UPI QR sent on WhatsApp after we confirm your order and address. There is no payment form, COD, or payment gateway on this website." },
  { q: "When do I share my address?", a: "After you send the order on WhatsApp, the seller chats with you and collects your full delivery address there." },
  { q: "How much is shipping? How long does delivery take?", a: "Shipping charges and delivery time depend on your city and order size. We confirm both on WhatsApp before payment. Typically dispatch in 1–2 days, delivery in 3–7 days across India." },
  { q: "What about returns / exchange?", a: "Unworn items in original packing can be exchanged within 7 days of delivery for manufacturing defects or wrong item. Share an unboxing video on WhatsApp for fastest help. No cash refunds — exchange or store credit." },
  { q: "Is the jewellery real gold / silver?", a: "Most designs are gold/silver-plated fashion jewellery unless the product description says otherwise. Material and weight are listed on every product — please read before ordering." },
];

export default function Faq() {
  const [openIdx, setOpenIdx] = useState(0);
  return (
    <section id="faq" className="mx-auto max-w-3xl scroll-mt-20 px-4 py-12">
      <SectionHeading
        eyebrow="Good to know"
        title="Policies & FAQ"
        sub="Shipping, exchange and payment — answered simply."
      />
      <div className="mt-6 space-y-2.5">
        {FAQS.map((f, i) => {
          const open = openIdx === i;
          return (
            <Reveal key={i} variant="up" delay={Math.min(i * 60, 240)} className={`overflow-hidden rounded-2xl border bg-white transition ${open ? "border-[#c9a24b] shadow-[0_12px_28px_-14px_rgba(58,8,18,0.45)]" : "border-[#ecdcbb]"}`}>
              <button
                type="button"
                onClick={() => setOpenIdx(open ? -1 : i)}
                aria-expanded={open}
                className="flex w-full items-center justify-between gap-2 px-4 py-3.5 text-left text-sm font-bold text-[#3a0812]"
              >
                {f.q}
                <span aria-hidden="true" className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-lg transition ${open ? "rotate-45 bg-[#3a0812] text-[#f3e2a9]" : "bg-[#faf3e2] text-[#9a7418]"}`}>＋</span>
              </button>
              {open && <p className="animate-accordion border-t border-[#f0e2c0] px-4 py-3 text-[13px] leading-relaxed text-[#4a3a2a]">{f.a}</p>}
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
