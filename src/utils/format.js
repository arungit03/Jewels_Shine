import { CONFIG } from "../config.js";

export function formatPrice(n) {
  const num = Number(n) || 0;
  const formatted = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(num);
  const symbol = CONFIG.CURRENCY_SYMBOL || "Rs.";
  return `${symbol}${formatted}`;
}

// Plain number without symbol, for WhatsApp message: "Rs.1,499"
export function formatPricePlain(n) {
  const num = Number(n) || 0;
  const formatted = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(num);
  const symbol = CONFIG.CURRENCY_SYMBOL || "Rs.";
  return `${symbol}${formatted}`;
}

// Current order date/time for WhatsApp message, e.g. "20 Oct 2026, 2:30 pm"
export function formatOrderDate(date = new Date()) {
  const d = date instanceof Date ? date : new Date(date);
  const parts = new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).formatToParts(d);
  const get = (type) => parts.find((p) => p.type === type)?.value || "";
  const day = get("day");
  const month = get("month");
  const year = get("year");
  const hour = get("hour");
  const minute = get("minute");
  const dayPeriod = (get("dayPeriod") || "").toLowerCase();
  const time = hour && minute ? `, ${hour}:${minute} ${dayPeriod}`.trimEnd() : "";
  return `${day} ${month} ${year}${time}`;
}
