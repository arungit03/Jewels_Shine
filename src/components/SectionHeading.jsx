import Reveal from "./Reveal.jsx";

export default function SectionHeading({ eyebrow, title, sub, dark = false }) {
  return (
    <Reveal variant="up" className="text-center">
      {eyebrow && (
        <p className="font-script text-3xl text-[#c9a24b]">{eyebrow}</p>
      )}
      <h2 className={`font-display text-2xl font-bold sm:text-3xl ${dark ? "text-[#faf3e2]" : "text-[#3a0812]"}`}>
        {title}
      </h2>
      <div className="mt-3 flex items-center justify-center gap-2" aria-hidden="true">
        <span className={`h-px w-14 sm:w-24 ${dark ? "bg-gradient-to-r from-transparent to-[#c9a24b]" : "bg-gradient-to-r from-transparent to-[#c9a24b]"}`} />
        <span className="text-[#c9a24b]">◆</span>
        <span className={`h-px w-14 sm:w-24 ${dark ? "bg-gradient-to-l from-transparent to-[#c9a24b]" : "bg-gradient-to-l from-transparent to-[#c9a24b]"}`} />
      </div>
      {sub && (
        <p className={`mx-auto mt-2 max-w-xl text-sm ${dark ? "text-[#e3cfa5]" : "text-[#8a6d4b]"}`}>{sub}</p>
      )}
    </Reveal>
  );
}
