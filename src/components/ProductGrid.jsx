import ProductCard from "./ProductCard.jsx";
import Reveal from "./Reveal.jsx";

export default function ProductGrid({ products, onView, loading = false, onClearFilters }) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4" aria-busy="true" aria-label="Loading products">
        {Array.from({ length: 8 }, (_, index) => (
          <div key={index} className="overflow-hidden rounded-3xl border border-[#eadcbe] bg-white">
            <div className="aspect-square animate-pulse bg-[#f1e8d5]" />
            <div className="space-y-3 p-4"><div className="h-3 w-1/3 animate-pulse rounded bg-[#eadcbe]" /><div className="h-4 w-4/5 animate-pulse rounded bg-[#eadcbe]" /><div className="h-9 animate-pulse rounded-full bg-[#f1e8d5]" /></div>
          </div>
        ))}
      </div>
    );
  }
  if (!products.length) {
    return (
      <div className="rounded-3xl border border-dashed border-[#c9a24b] bg-white/70 px-4 py-14 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#fff3d9] text-2xl" aria-hidden="true">✦</span>
        <p className="mt-4 font-display text-xl font-semibold text-[#3a0812]">No designs to show yet</p>
        <p className="mt-1 text-sm text-[#8a6d4b]">Try another search or reset the filters.</p>
        {onClearFilters && <button type="button" onClick={onClearFilters} className="btn-maroon mt-5 rounded-full px-6 py-2.5 text-sm font-bold">Reset filters</button>}
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
