import { formatPrice } from "../utils/format.js";
import { useCart } from "../context/CartContext.jsx";
import ProductImage from "./ProductImage.jsx";
import AddToCartButton from "./AddToCartButton.jsx";

export default function ProductCard({ product, onView }) {
  const { add } = useCart();
  const soldOut = !!product.soldOut;
  return (
    <article className="card-shine group flex flex-col overflow-hidden rounded-3xl border border-[#e3cf9e] bg-white shadow-[0_8px_24px_-12px_rgba(58,8,18,0.35)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_40px_-16px_rgba(58,8,18,0.45)]">
      <button
        type="button"
        onClick={() => onView(product)}
        className="relative block w-full text-left"
        aria-label={`View ${product.name}`}
      >
        <ProductImage product={product} className="aspect-square w-full transition duration-500 group-hover:scale-105" />
        <span className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#3a0812]/35 to-transparent opacity-0 transition group-hover:opacity-100" aria-hidden="true" />
        {soldOut ? (
          <span className="absolute left-2 top-2 rounded-full bg-[#2a1a12]/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#f3e2a9] ring-1 ring-[#c9a24b]/60">
            Sold out
          </span>
        ) : (
          <span className="absolute left-2 top-2 rounded-full bg-gradient-to-r from-[#9a7418] to-[#dcbb55] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#3a0812] shadow">
            ✦ Bestseller
          </span>
        )}
        <span className="absolute bottom-2 right-2 rounded-full bg-[#3a0812]/80 px-2 py-1 text-[10px] font-bold tracking-wider text-[#f3e2a9] backdrop-blur-sm">
          {product.id}
        </span>
      </button>
      <div className="flex flex-1 flex-col gap-1 border-t border-[#f0e2c0] bg-gradient-to-b from-white to-[#fff6e3] p-3">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9a7418]">{product.category}</p>
        <button type="button" onClick={() => onView(product)} className="text-left">
          <h3 className="line-clamp-2 min-h-10 text-[13px] font-semibold leading-snug text-[#2a1a12] transition group-hover:text-[#5e1220]">
            {product.name}
          </h3>
        </button>
        <p className="font-display text-lg font-bold text-[#5e1220]">
          {formatPrice(product.price)}
          <span className="ml-1 align-middle text-[10px] font-body font-semibold uppercase tracking-wider text-[#9a7418]">✦ incl. taxes</span>
        </p>
        {soldOut ? (
          <button
            type="button"
            disabled
            aria-label={`${product.name} is sold out`}
            className="mt-auto cursor-not-allowed rounded-full bg-[#eee5d3] py-2.5 text-[13px] font-bold text-[#a89576]"
          >
            Sold out
          </button>
        ) : (
          <AddToCartButton
            onAdd={() => add(product.id, 1)}
            ariaLabel={`Add ${product.name} to cart`}
            className="mt-auto py-2.5 text-[13px]"
          >
            ＋ Add to cart
          </AddToCartButton>
        )}
      </div>
    </article>
  );
}

