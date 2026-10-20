export const SITE_URL = (
  process.env.NEXT_PUBLIC_URL || "http://localhost:3000"
).replace(/\/$/, "");

export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_ADMIN_NUMBER || "923260220581";

export const whatsappLink = (text) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

export const jsonLd = (data) => JSON.stringify(data).replace(/</g, "\\u003c");
