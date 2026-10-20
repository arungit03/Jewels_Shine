export const CATEGORIES = ["All", "Necklaces", "Earrings", "Bangles", "Rings", "Chains", "Anklets"];

export default function CategoryBar({ category, setCategory, sort, setSort, resultCount }) {
  return (
    <div className="space-y-3">
      <div className="flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Filter by category">
        {CATEGORIES.map((c) => {
          const active = category === c;
          return (
            <button
              key={c}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setCategory(c)}
              className={`pressable shrink-0 rounded-full px-5 py-2.5 text-[13px] font-bold transition duration-200 ${
                active
                  ? "btn-maroon ring-2 ring-[#c9a24b]/70"
                  : "border border-[#e0c98f] bg-white text-[#5e1220] shadow-sm hover:-translate-y-0.5 hover:border-[#c9a24b] hover:shadow"
              }`}
            >
              {c}
            </button>
          );
        })}
      </div>
      <div className="flex items-center justify-between gap-2 rounded-2xl border border-[#ecdcbb] bg-white/70 px-3 py-2">
        <p className="text-xs font-semibold text-[#8a6d4b]" aria-live="polite">
          ✦ {resultCount} {resultCount === 1 ? "design" : "designs"}
        </p>
        <label className="flex items-center gap-2 text-xs font-bold text-[#5e1220]">
          Sort
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-full border border-[#e0c98f] bg-white px-3 py-1.5 text-xs font-semibold text-[#2a1a12]"
            aria-label="Sort products"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="newest">Newest</option>
          </select>
        </label>
      </div>
    </div>
  );
}
