export const formatPhone = (phone = "") =>
  phone.length === 11 ? `${phone.slice(0, 4)} ${phone.slice(4)}` : phone;

export const fullAddressLine = (a) =>
  [a.fullAddress, a.area, a.city].filter(Boolean).join(", ");
