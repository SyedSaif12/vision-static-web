import { ADDRESS_LABELS } from "./constants";

const normalize = (s) => (s ?? "").trim().toLowerCase();

/** Same street address, city and phone → treated as a duplicate. */
export const isSameAddress = (a, b) =>
  normalize(a.fullAddress) === normalize(b.fullAddress) &&
  normalize(a.city) === normalize(b.city) &&
  a.phone === b.phone;

/** "Home 2" → "Home". Unknown labels fall back to "Other". */
export function getBaseLabel(label = "") {
  const base = String(label)
    .trim()
    .replace(/\s+\d+$/, "");
  return (
    ADDRESS_LABELS.find((l) => l.toLowerCase() === base.toLowerCase()) ??
    "Other"
  );
}

/**
 * Home → "Home" if free, otherwise "Home 2", "Home 3"… (smallest free slot).
 * `excludeId` lets an address being edited ignore its own current label.
 */
export function getUniqueLabel(base, addresses, excludeId) {
  const pattern = new RegExp(`^${base}(?:\\s+(\\d+))?$`, "i");
  const used = new Set();
  for (const a of addresses) {
    if (a.id === excludeId) continue;
    const m = String(a.label ?? "")
      .trim()
      .match(pattern);
    if (m) used.add(m[1] ? Number(m[1]) : 1);
  }
  let n = 1;
  while (used.has(n)) n += 1;
  return n === 1 ? base : `${base} ${n}`;
}

/** Only the fields the API should receive (no id / userId / timestamps). */
export const toAddressPayload = (a) => ({
  label: a.label,
  fullName: a.fullName,
  phone: a.phone,
  city: a.city,
  area: a.area,
  fullAddress: a.fullAddress,
  landmark: a.landmark ?? "",
  email: a.email ?? "",
});

/** Saved address → react-hook-form defaults (null-safe, base label for the chips). */
export const addressToFormValues = (a) => ({
  fullName: a.fullName ?? "",
  phone: a.phone ?? "",
  city: a.city ?? "",
  area: a.area ?? "",
  fullAddress: a.fullAddress ?? "",
  landmark: a.landmark ?? "",
  email: a.email ?? "",
  label: getBaseLabel(a.label),
});
