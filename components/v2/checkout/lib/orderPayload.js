import {
  COUNTRY_VALUE,
  DELIVERY,
  INCLUDE_EXTENDED_ORDER_FIELDS,
} from "./constants";

export function splitFullName(fullName = "") {
  const [firstName = "", ...rest] = fullName.trim().split(/\s+/);
  return { firstName, lastName: rest.join(" ") };
}

function buildApartmentField(address, deliveryMethod) {
  const parts = [
    address.area,
    address.landmark ? `Near ${address.landmark}` : "",
  ];
  // Legacy API has no delivery-method field, so flag it in the note instead.
  if (!INCLUDE_EXTENDED_ORDER_FIELDS) {
    if (deliveryMethod === DELIVERY.PICKUP) parts.push("[STORE PICKUP]");
    if (deliveryMethod === DELIVERY.SAME_DAY) parts.push("[SAME-DAY DELIVERY]");
  }
  return parts.filter(Boolean).join(", ");
}

/** Builds the exact payload shape the existing placeOrder API expects. */
export function buildOrderPayload({
  address,
  deliveryMethod,
  paymentMethod,
  totals,
  products,
}) {
  const { firstName, lastName } = splitFullName(address.fullName);

  const payload = {
    country: COUNTRY_VALUE,
    firstName,
    lastName,
    address: address.fullAddress,
    appartment: buildApartmentField(address, deliveryMethod), // API spells it "appartment"
    city: address.city,
    postalCode: address.postalCode ?? "",
    phoneNo: address.phone,
    shipping: totals.shippingFee,
    codFee: totals.codFee,
    applyCode: totals.shouldApplyCODFee,
    paymentMethod,
    items: products.map((item) => ({
      variantId: item.id,
      quantity: item.qty,
    })),
  };

  if (INCLUDE_EXTENDED_ORDER_FIELDS) {
    Object.assign(payload, {
      deliveryMethod,
      area: address.area,
      landmark: address.landmark ?? "",
      email: address.email ?? "",
      addressLabel: address.label,
    });
  }

  return payload;
}
