import ProductCard from "./ProductCard.jsx";
import Reveal from "./Reveal.jsx";

export default function ProductGrid({ products, onView }) {
  if (!products.length) {
    return (
      <div className="rounded-3xl border border-dashed border-[#c9a24b] bg-white/70 px-4 py-12 text-center">
        <p className="font-script text-4xl text-[#c9a24b]">Oh no!</p>
        <p className="mt-1 font-display text-xl font-semibold text-[#3a0812]">No designs found</p>
        <p className="mt-1 text-sm text-[#8a6d4b]">Try a different search or category.</p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
      {products.map((p, i) => (
        <Reveal key={p.id} variant="up" delay={Math.min((i % 8) * 70, 490)}>
          <ProductCard product={p} onView={onView} />
        </Reveal>
      ))}
    </div>
  );
}
