import { useEffect, useMemo, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { CartProvider } from "./context/CartContext.jsx";
import { db } from "./firebase.js";
import { toStoreProduct } from "./utils/productData.js";
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
import AdminPage from "./components/AdminPage.jsx";

function Shop({ products, loading, firebaseError, onAdmin }) {
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
  }, [products, search, category, sort]);

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
          {firebaseError && <div className="mt-5 rounded-2xl border border-[#e7b6a8] bg-[#fff1ec] px-4 py-3 text-sm text-[#842038]" role="alert">{firebaseError}</div>}
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
            <ProductGrid
              products={filtered}
              onView={setSelected}
              loading={loading}
              onClearFilters={() => { setSearch(""); setCategory("All"); setSort("featured"); }}
            />
          </div>
        </div>
      </main>
      <HowItWorks />
      <Testimonials />
      <Faq />
      <Footer onAdmin={onAdmin} />
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
  const [products, setProducts] = useState([]);
  const [adminOpen, setAdminOpen] = useState(false);
  const [loading, setLoading] = useState(Boolean(db));
  const [firebaseError, setFirebaseError] = useState("");

  useEffect(() => {
    if (!db) return setLoading(false);
    const unsubscribe = onSnapshot(
      collection(db, "products"),
      (snapshot) => {
        setProducts(snapshot.docs.map((item) => toStoreProduct({ ...item.data(), id: item.data().id || item.id })));
        setFirebaseError("");
        setLoading(false);
      },
      () => {
        setFirebaseError("Products could not be loaded. Please check your Firebase setup.");
        setLoading(false);
      },
    );
    return unsubscribe;
  }, []);

  if (adminOpen) {
    return <AdminPage products={products} onProductsChange={setProducts} onBack={() => setAdminOpen(false)} />;
  }

  return <CartProvider products={products}><Shop products={products} loading={loading} firebaseError={firebaseError} onAdmin={() => setAdminOpen(true)} /></CartProvider>;
}
