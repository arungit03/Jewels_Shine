import { useMemo, useRef, useState } from "react";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { CONFIG } from "../config.js";
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET, db, isFirebaseConfigured } from "../firebase.js";
import { toFirestoreProduct, toStoreProduct } from "../utils/productData.js";
import { CATEGORIES } from "./CategoryBar.jsx";

const emptyProduct = { id: "", name: "", price: "", category: "Chains", description: "", imageUrl: "" };

export default function AdminPage({ products, onProductsChange, onBack }) {
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [draft, setDraft] = useState(emptyProduct);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);

  const sortedProducts = useMemo(() => [...products].sort((a, b) => a.id.localeCompare(b.id)), [products]);
  const nextProductId = useMemo(() => {
    const highest = products.reduce((max, product) => {
      const match = String(product.id || "").match(/(\d+)$/);
      return Math.max(max, match ? Number(match[1]) : 0);
    }, 0);
    return `JW-${String(highest + 1).padStart(3, "0")}`;
  }, [products]);

  function unlock(event) {
    event.preventDefault();
    if (password === CONFIG.ADMIN_PASSWORD) {
      setUnlocked(true);
      setMessage("");
    } else setMessage("Incorrect password.");
  }

  function editProduct(product) {
    setDraft({ ...emptyProduct, ...product, imageUrl: product.imageUrl || product.images?.[0] || "" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function uploadImage(file) {
    if (!file.type.startsWith("image/")) {
      setMessage("Please select an image file.");
      return;
    }
    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
      setMessage("Add Cloudinary cloud name and upload preset to .env first.");
      return;
    }
    setUploading(true);
    setUploadProgress(0);
    setMessage("Uploading image…");
    try {
      const body = new FormData();
      body.append("file", file);
      body.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
      const result = await new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.open("POST", `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`);
        request.upload.onprogress = (event) => {
          if (event.lengthComputable) setUploadProgress(Math.round((event.loaded / event.total) * 100));
        };
        request.onload = () => {
          if (request.status >= 200 && request.status < 300) resolve(JSON.parse(request.responseText));
          else reject(new Error("Cloudinary upload failed."));
        };
        request.onerror = () => reject(new Error("Network error during upload."));
        request.send(body);
      });
      setDraft((current) => ({ ...current, imageUrl: result.secure_url }));
      setUploadProgress(100);
      setMessage("Image uploaded. Save the product next.");
    } finally {
      setUploading(false);
    }
  }

  function handleDrop(event) {
    event.preventDefault();
    setDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file) uploadImage(file).catch((error) => setMessage(error.message));
  }

  async function saveProduct(event) {
    event.preventDefault();
    if (!db) return setMessage("Firebase is not configured yet. Add the VITE_FIREBASE values to .env.");
    const product = toFirestoreProduct({ ...draft, id: draft.id || nextProductId });
    if (!product.id || !product.name || !product.price || !product.imageUrl) {
      return setMessage("ID, name, price, and image URL are required.");
    }
    setBusy(true);
    setMessage("");
    try {
      await setDoc(doc(db, "products", product.id), product);
      onProductsChange((current) => [
        ...current.filter((item) => item.id !== product.id),
        toStoreProduct(product),
      ]);
      setDraft(emptyProduct);
      setMessage("Product saved.");
    } catch (error) {
      setMessage(error.message || "Could not save product.");
    } finally {
      setBusy(false);
    }
  }

  async function removeProduct(product) {
    if (!db || !window.confirm(`Remove ${product.name}?`)) return;
    setBusy(true);
    try {
      await deleteDoc(doc(db, "products", product.id));
      onProductsChange((current) => current.filter((item) => item.id !== product.id));
      if (draft.id === product.id) setDraft(emptyProduct);
      setMessage("Product removed.");
    } catch (error) {
      setMessage(error.message || "Could not remove product.");
    } finally {
      setBusy(false);
    }
  }

  if (!unlocked) {
    return (
      <main className="min-h-screen bg-[#fffaf1] px-4 py-16">
        <div className="mx-auto max-w-md rounded-3xl border border-[#e3cf9e] bg-white p-6 shadow-xl">
          <button type="button" onClick={onBack} className="mb-8 text-sm font-semibold text-[#842038]">← Back to shop</button>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#9a7418]">Private area</p>
          <h1 className="mt-2 font-display text-3xl font-bold text-[#3a0812]">Admin products</h1>
          <p className="mt-2 text-sm text-[#806b59]">Enter the simple admin password to continue.</p>
          <form onSubmit={unlock} className="mt-6 space-y-3">
            <input autoFocus type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" className="w-full rounded-xl border border-[#e3cf9e] px-4 py-3" />
            <button className="btn-maroon w-full rounded-full py-3 font-bold">Open admin</button>
          </form>
          {message && <p className="mt-3 text-sm font-semibold text-[#842038]">{message}</p>}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fffaf1] px-4 py-8">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#9a7418]">Catalog editor</p><h1 className="font-display text-3xl font-bold text-[#3a0812]">Manage jewellery</h1></div>
          <button type="button" onClick={onBack} className="rounded-full border border-[#c9a24b] px-4 py-2 text-sm font-bold text-[#5e1220]">← Shop</button>
        </div>
        {!isFirebaseConfigured && <p className="mt-5 rounded-xl bg-[#fff0d0] p-3 text-sm text-[#5e1220]">Firebase is not configured. Add your environment values before saving.</p>}
        <form onSubmit={saveProduct} className="mt-6 grid gap-3 rounded-3xl border border-[#e3cf9e] bg-white p-5 shadow-sm sm:grid-cols-2">
          {[["id", "Product ID", nextProductId], ["name", "Name", "Gold Chain"], ["price", "Price", "450"], ["category", "Category", "Chains"]].map(([key, label, placeholder]) => <label key={key} className="text-sm font-semibold text-[#5e1220]">{label}{key === "category" ? <select value={draft[key]} onChange={(event) => setDraft({ ...draft, [key]: event.target.value })} className="mt-1 w-full rounded-xl border border-[#e3cf9e] bg-white px-3 py-2.5 font-normal">{CATEGORIES.filter((category) => category !== "All").map((category) => <option key={category} value={category}>{category}</option>)}</select> : <input required readOnly={key === "id"} type={key === "price" ? "number" : "text"} value={key === "id" ? (draft.id || nextProductId) : draft[key]} onChange={(event) => setDraft({ ...draft, [key]: event.target.value })} placeholder={placeholder} className={`mt-1 w-full rounded-xl border border-[#e3cf9e] px-3 py-2.5 font-normal ${key === "id" ? "cursor-not-allowed bg-[#f5eee2]" : ""}`} />}</label>)}
          <label className="text-sm font-semibold text-[#5e1220] sm:col-span-2">Description<textarea value={draft.description} onChange={(event) => setDraft({ ...draft, description: event.target.value })} className="mt-1 min-h-24 w-full rounded-xl border border-[#e3cf9e] px-3 py-2.5 font-normal" /></label>
          <div className="sm:col-span-2">
            <p className="text-sm font-semibold text-[#5e1220]">Product image</p>
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={(event) => event.target.files?.[0] && uploadImage(event.target.files[0]).catch((error) => setMessage(error.message))} />
            <button type="button" onClick={() => fileInputRef.current?.click()} onDragOver={(event) => { event.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={handleDrop} className={`mt-1 flex min-h-32 w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed px-4 py-6 text-center transition ${dragging ? "border-[#842038] bg-[#fff0d0]" : "border-[#c9a24b] bg-[#fffaf1] hover:bg-[#fff6e3]"}`}>
              {draft.imageUrl ? <img src={draft.imageUrl} alt="Selected product" className="mb-2 h-20 w-20 rounded-xl object-cover" /> : <span className="mb-2 text-3xl">↑</span>}
              <span className="font-semibold text-[#5e1220]">{uploading ? "Uploading…" : dragging ? "Drop image here" : "Select or drop an image"}</span>
              <span className="mt-1 text-xs text-[#806b59]">PNG, JPG, WEBP</span>
            </button>
            {uploading && <div className="mt-3"><div className="mb-1 flex justify-between text-xs font-bold text-[#1d64d6]"><span>Uploading image</span><span>{uploadProgress}%</span></div><div className="h-2 overflow-hidden rounded-full bg-[#dbeafe]"><div className="h-full rounded-full bg-[#2563eb] transition-[width] duration-200" style={{ width: `${uploadProgress}%` }} /></div></div>}
          </div>
          <div className="flex flex-wrap gap-2 sm:col-span-2"><button disabled={busy} className="btn-gold rounded-full px-5 py-2.5 font-bold">{busy ? "Saving…" : draft.id ? "Save product" : "Add product"}</button><button type="button" onClick={() => setDraft(emptyProduct)} className="rounded-full border border-[#c9a24b] px-5 py-2.5 font-bold text-[#5e1220]">Clear</button></div>
          {message && <p className="text-sm font-semibold text-[#842038] sm:col-span-2">{message}</p>}
        </form>
        <section className="mt-8 space-y-3"><h2 className="font-display text-2xl font-bold text-[#3a0812]">Products ({sortedProducts.length})</h2>{sortedProducts.map((product) => <div key={product.id} className="flex flex-wrap items-center gap-3 rounded-2xl border border-[#e3cf9e] bg-white p-3"><img src={product.imageUrl || product.images?.[0]} alt="" className="h-16 w-16 rounded-xl object-cover" /><div className="min-w-[180px] flex-1"><p className="text-xs font-bold uppercase tracking-wider text-[#9a7418]">{product.id} · {product.category}</p><p className="font-semibold text-[#3a0812]">{product.name}</p><p className="text-sm text-[#806b59]">Rs. {product.price}</p></div><button type="button" onClick={() => editProduct(product)} className="rounded-full border border-[#c9a24b] px-4 py-2 text-sm font-bold text-[#5e1220]">Edit</button><button type="button" onClick={() => removeProduct(product)} className="rounded-full border border-[#dca9a9] px-4 py-2 text-sm font-bold text-[#842038]">Remove</button></div>)}</section>
      </div>
    </main>
  );
}
