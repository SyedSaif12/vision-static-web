import { PAYMENT, SUPPORT_WHATSAPP } from "./constants";
import { getUnitPrice } from "./pricing";

export function buildWhatsAppMessage({
  address,
  deliveryOption,
  paymentMethod,
  products,
  totals,
}) {
  const items = products
    .map((i) => `${i.productTitle} x ${i.qty} = PKR ${getUnitPrice(i) * i.qty}`)
    .join("\n");

  return [
    "*New Order Request*",
    "",
    "*Customer Details:*",
    `Name: ${address.fullName}`,
    `Phone: ${address.phone}`,
    `Address: ${address.fullAddress}${address.area ? `, ${address.area}` : ""}`,
    address.landmark ? `Landmark: ${address.landmark}` : null,
    `City: ${address.city}`,
    address.email ? `Email: ${address.email}` : null,
    "",
    "*Delivery:*",
    deliveryOption?.title ?? "Standard delivery",
    "",
    "*Order Items:*",
    items,
    "",
    `*Payment:* ${paymentMethod === PAYMENT.COD ? "Cash on Delivery" : "Bank Deposit"}`,
    "",
    "*Order Summary:*",
    `Subtotal: PKR ${totals.subtotal.toFixed(2)}`,
    totals.codFee > 0 ? `COD Fee (4%): PKR ${totals.codFee.toFixed(2)}` : null,
    `Shipping: PKR ${totals.shippingFee}`,
    `*Total: PKR ${totals.total.toFixed(2)}*`,
  ]
    .filter((line) => line !== null)
    .join("\n");
}

/** Returns false when the WhatsApp number isn't configured. */
export function openWhatsAppOrder(message) {
  if (!SUPPORT_WHATSAPP) return false;
  window.open(
    `https://wa.me/${SUPPORT_WHATSAPP}?text=${encodeURIComponent(message)}`,
    "_blank",
    "noopener,noreferrer",
  );
  return true;
}
