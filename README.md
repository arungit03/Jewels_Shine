fon# My Jewels — Online Jewellery Shop

A fast, mobile-first single-page jewellery store (React + Vite + Tailwind v4).
Ordering happens over **WhatsApp** — no backend, no payment gateway.

## Run locally

```bash
npm install
npm run dev
```

Build (must pass before deploy):

```bash
npm run build
```

## Change shop name / WhatsApp number

Edit one file: `src/config.js`

```js
export const CONFIG = {
  SHOP_NAME: "My Jewels",
  TAGLINE: "Elegant jewellery for every occasion",
  WHATSAPP_NUMBER: "919159906098", // country code + number, digits only, no +
  SITE_URL: "", // e.g. https://myjewels.vercel.app — used for image links in WhatsApp order
  CURRENCY_SYMBOL: "Rs.",
};
```

## Add products and photos

1. Put photos in `public/images/`, e.g. `public/images/jw-013-1.jpg`.
2. Add entries in `src/data/products.json` (copy an existing one, extend to 50):

```json
{
  "id": "JW-013",
  "name": "Gold-Plated Temple Necklace",
  "category": "Necklaces",
  "price": 1999,
  "material": "Gold-plated brass",
  "weight": "70 g",
  "description": "Short description...",
  "images": ["/images/jw-013-1.jpg"],
  "soldOut": false
}
```

Categories: `Necklaces | Earrings | Bangles | Rings | Chains | Anklets`.
If a photo file is missing, a gradient placeholder with a category icon is shown automatically.
Set `"soldOut": true` to show a Sold out badge and disable Add to cart.

## Deploy on Vercel

1. Push this folder to GitHub.
2. Vercel → New Project → Import the repo.
3. Framework preset: Vite. Build command `npm run build`, output `dist`.
4. Deploy. Then set `SITE_URL` in `src/config.js` to your live URL
   (e.g. `https://myjewels.vercel.app`) so WhatsApp orders include image links, and redeploy.

Same steps work on Netlify (build `npm run build`, publish `dist`).

## Order flow

1. Customer adds items to cart → opens cart → clicks **Buy Now**.
2. Checkout asks only **Name + Phone** (10-digit Indian mobile validated).
3. Site opens `https://wa.me/<number>?text=<encoded order>` with order ID,
   name, phone, item lines and grand total.
4. Seller confirms on WhatsApp, collects address, sends a **UPI QR**,
   ships after payment. No payment form / COD / gateway on the website.
