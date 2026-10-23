fon# My Jewels — Online Jewellery Shop

A fast, mobile-first single-page jewellery store (React + Vite + Tailwind v4).
Ordering happens over **WhatsApp** — no backend, no payment gateway.

## Firebase catalog and admin

The shop reads products from the Firestore `products` collection. Each document uses `id`, `name`, `price`, `category`, `description`, and `imageUrl`. Images can be uploaded to Cloudinary from the Admin page, and the resulting secure URL is stored in Firestore.

Create a `.env` file from `.env.example` and add the Firebase Web App configuration plus the Cloudinary cloud name and unsigned upload preset. Enable only Firestore in Firebase. Products must be created from the Admin page and saved to Firestore.

The `Admin` button uses a simple frontend password from `src/config.js`; this is intentionally not secure authentication. With this no-auth setup, public write rules are required for the website editor, which means anyone who discovers the Firebase project could modify the catalog. Firebase Storage is not used because it requires the Blaze billing plan for current projects.

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

Open **Admin**, enter the password, select or drop a product image into Cloudinary, complete the product details, and save. The product and Cloudinary image URL are then stored in Firestore.

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
