const FALLBACK = "#1e293b"; // slate-800

export function normalizeHex(input) {
  const hex = (input ?? "").trim().replace(/^#+/, "");
  if (/^[0-9a-f]{3}$/i.test(hex)) {
    return `#${[...hex].map((c) => c + c).join("")}`;
  }
  return /^[0-9a-f]{6}$/i.test(hex) ? `#${hex}` : FALLBACK;
}

/** Background dark ho to text white, warna dark (readable contrast). */
export function isDarkColor(hex) {
  const n = Number.parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 < 0.6;
}
