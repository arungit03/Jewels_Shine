import { CONFIG } from "../config.js";
import { buildChatUrl } from "../utils/whatsapp.js";

export default function WhatsAppButton() {
  const url = buildChatUrl(CONFIG.WHATSAPP_NUMBER);
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      aria-label={`Chat with ${CONFIG.SHOP_NAME} on WhatsApp`}
      className="animate-pulse-ring group-wa fixed bottom-4 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#2fe673] to-[#1f9d4d] text-white shadow-2xl ring-2 ring-white/70 transition hover:scale-110"
    >
      <svg className="icon-wa h-7 w-7" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.2 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.4-.7-2.9-1.2-4.7-4.1-4.9-4.3-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5s.8 1.9.8 2c.1.1.1.3 0 .5-.3.6-.6.8-.4 1.1.6 1.1 1.4 1.8 2.5 2.4.3.1.5 0 .7-.2l.8-.9c.2-.3.4-.2.7-.1l1.9.9c.3.1.5.2.5.3 0 .2 0 .5-.1.8z" />
      </svg>
    </a>
  );
}
