import { COD_FEE_RATE, DELIVERY, HOME_CITY, PAYMENT, SHIPPING_FEE } from "./constants";

const round2 = (n) => Math.round((n + Number.EPSILON) * 100) / 100;

export const normalizeCity = (city) => (city ?? "").trim().toLowerCase();
export const isKarachi = (city) => normalizeCity(city) === normalizeCity(HOME_CITY);

/** Karachi → 200, everywhere else → 400. */
export const getBaseShippingFee = (city) =>
  isKarachi(city) ? SHIPPING_FEE.KARACHI : SHIPPING_FEE.OTHER;

export const getUnitPrice = (item) => Number(item?.price || item?.oldPrice || 0);

/**
 * Single source of truth for order maths.
 *  - Shipping: 200 in Karachi, 400 elsewhere (0 for store pickup)
 *  - COD fee: 4% of subtotal, only when paying COD outside Karachi
 */
export function calculateOrderTotals({
  subtotal,
  city,
  deliveryMethod = DELIVERY.STANDARD,
  paymentMethod = null,
}) {
  const karachi = isKarachi(city);
  const shippingFee =
    deliveryMethod === DELIVERY.PICKUP ? 0 : getBaseShippingFee(city);
  const shouldApplyCODFee = paymentMethod === PAYMENT.COD && !karachi;
  const codFee = shouldApplyCODFee ? round2(subtotal * COD_FEE_RATE) : 0;

  return {
    subtotal,
    shippingFee,
    codFee,
    shouldApplyCODFee,
    total: round2(subtotal + codFee + shippingFee),
    isKarachi: karachi,
    deliveryMethod,
    paymentMethod,
  };
}
