import { useMemo, useState } from "react";
import { CartProvider } from "./context/CartContext.jsx";
import products from "./data/products.json";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import CategoryBar from "./components/CategoryBar.jsx";
import ProductGrid from "./components/ProductGrid.jsx";
import ProductModal from "./components/ProductModal.jsx";
import CartDrawer from "./components/CartDrawer.jsx";
import CheckoutModal from "./components/CheckoutModal.jsx";
import OrderSuccess from "./components/OrderSuccess.jsx";
import TrustBar from "./components/TrustBar.jsx";
import HowItWorks from "./components/HowItWorks.jsx";
import Testimonials from "./components/Testimonials.jsx";
import SectionHeading from "./components/SectionHeading.jsx";
import Faq from "./components/Faq.jsx";
import WhatsAppButton from "./components/WhatsAppButton.jsx";
import FlyToCart from "./components/FlyToCart.jsx";
import Footer from "./components/Footer.jsx";

function Shop() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");
  const [selected, setSelected] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [successInfo, setSuccessInfo] = useState(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = products.filter((p) => {
      const matchCat = category === "All" || p.category === category;
      const matchQ =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    else if (sort === "newest") list = [...list].sort((a, b) => (b.id > a.id ? 1 : -1));
    return list;
  }, [search, category, sort]);

  return (
    <div id="top" className="min-h-screen overflow-x-hidden">
      <Header search={search} setSearch={setSearch} onCartOpen={() => setCartOpen(true)} />
      <Hero />
      <TrustBar />
      <main id="shop" className="relative scroll-mt-20 overflow-hidden">
        <div className="pattern-royal absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-3 py-10 sm:px-4 sm:py-12">
          <SectionHeading
            eyebrow="Handpicked for you"
            title="Shop jewellery"
            sub="Tap a design for details. Add to cart, then Buy Now to order on WhatsApp."
          />
          <div className="mt-6">
            <CategoryBar
              category={category}
              setCategory={setCategory}
              sort={sort}
              setSort={setSort}
              resultCount={filtered.length}
            />
          </div>
          <div className="mt-5">
            <ProductGrid products={filtered} onView={setSelected} />
          </div>
        </div>
      </main>
      <HowItWorks />
      <Testimonials />
      <Faq />
      <Footer />
      <WhatsAppButton />
      <FlyToCart />

      <ProductModal
        product={selected}
        onClose={() => setSelected(null)}
        onAddAndOpenCart={() => { setSelected(null); setCartOpen(true); }}
      />
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onBuyNow={() => { setCartOpen(false); setCheckoutOpen(true); }}
      />
      <CheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        onSuccess={(info) => { setCheckoutOpen(false); setSuccessInfo(info); }}
      />
      <OrderSuccess
        info={successInfo}
        onClose={() => setSuccessInfo(null)}
        onClearAndClose={() => setSuccessInfo(null)}
      />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider products={products}>
      <Shop />
    </CartProvider>
  );
}
