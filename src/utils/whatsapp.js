import { CONFIG } from "../config.js";
import { formatPricePlain, formatOrderDate } from "./format.js";

const COUNTER_KEY = "jw_order_counter";

function pad3(n) {
  return String(n).padStart(3, "0");
}

function yymmdd(date = new Date()) {
  const yy = String(date.getFullYear()).slice(2);
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yy}${mm}${dd}`;
}

function safeGet(key) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSet(key, value) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // storage unavailable (private mode) — ignore
  }
}

export function generateOrderId(date = new Date()) {
  let counter = parseInt(safeGet(COUNTER_KEY) || "0", 10);
  if (!Number.isFinite(counter) || counter < 0) counter = 0;
  counter = (counter % 999) + 1;
  safeSet(COUNTER_KEY, String(counter));
  return `JW-${yymmdd(date)}-${pad3(counter)}`;
}

function imageUrl(path) {
  const site = (CONFIG.SITE_URL || "").trim().replace(/\/$/, "");
  if (!site || !path) return "";
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${site}${p}`;
}

/**
 * items: [{ product, qty }] where product = { id, name, price, images }
 * orderDate: Date (defaults to now) — printed as the order date/time line.
 */
export function buildOrderMessage({ orderId, name, phone, items, grandTotal, orderDate = new Date() }) {
  const lines = [];
  lines.push(`New Order #${orderId}`);
  lines.push(`Date: ${formatOrderDate(orderDate)}`);
  lines.push(`Name: ${name}`);
  lines.push(`Phone: ${phone}`);
  lines.push(``);
  items.forEach((item, i) => {
    const p = item.product;
    const qty = item.qty;
    const unit = Number(p.price) || 0;
    const lineTotal = unit * qty;
    lines.push(
      `${i + 1}. ${p.name} (${p.id}) x${qty} - ${formatPricePlain(unit)} = ${formatPricePlain(lineTotal)}`
    );
    const img = p.images && p.images[0];
    const full = img ? imageUrl(img) : "";
    if (full) {
      lines.push(`   Image: ${full}`);
    }
  });
  lines.push(``);
  lines.push(`Total: ${formatPricePlain(grandTotal)}`);
  lines.push(`Please confirm availability and share the address and payment details.`);
  return lines.join("\n");
}

export function buildWhatsAppUrl(number, text) {
  const digits = String(number || "").replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}

export function buildChatUrl(number) {
  const digits = String(number || "").replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent("Hi")}`;
}

// Indian 10-digit mobile validation. Accepts "9876543210", "+91 98765 43210", "919876543210", "09876543210".
export function normalizeIndianPhone(input) {
  let d = String(input || "").replace(/\D/g, "");
  if (d.length === 12 && d.startsWith("91")) d = d.slice(2);
  else if (d.length === 11 && d.startsWith("0")) d = d.slice(1);
  return d;
}

export function isValidIndianPhone(input) {
  const d = normalizeIndianPhone(input);
  return /^[6-9]\d{9}$/.test(d);
}
