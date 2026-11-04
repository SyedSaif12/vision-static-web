// lib/product-query/price-presets.js
// Quick price chips category ki asli price range se banti hain (hard-coded "80k" nahi)

const compact = (n) =>
  n >= 1e6
    ? `${(n / 1e6).toFixed(1).replace(/\.0$/, "")}M`
    : n >= 1e3
      ? `${Math.round(n / 1e3)}k`
      : String(n);

/** 215,000 -> 200,000 | 326,700 -> 350,000 (2 significant digits, 5 ke multiples) */
function roundNice(x) {
  const step = 5 * 10 ** (Math.floor(Math.log10(x)) - 1);
  return Math.max(step, Math.round(x / step) * step);
}

/** [min, max] -> [{ label, minPrice?, maxPrice? }] (max 4 chips) */
export function buildPricePresets(range) {
  if (!range) return [];
  const [min, max] = range;
  if (!(max > min)) return [];

  const cuts = [
    ...new Set([0.25, 0.5, 0.75].map((f) => roundNice(min + (max - min) * f))),
  ]
    .filter((c) => c > min && c < max)
    .sort((a, b) => a - b);
  if (!cuts.length) return [];

  const presets = [{ label: `Under ${compact(cuts[0])}`, maxPrice: cuts[0] }];
  for (let i = 0; i < cuts.length - 1; i++) {
    presets.push({
      label: `${compact(cuts[i])} to ${compact(cuts[i + 1])}`,
      minPrice: cuts[i],
      maxPrice: cuts[i + 1],
    });
  }
  const last = cuts[cuts.length - 1];
  presets.push({ label: `${compact(last)} and above`, minPrice: last });
  return presets;
}