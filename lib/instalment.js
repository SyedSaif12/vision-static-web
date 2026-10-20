/**
 * Instalment helpers — product page aur /instalment-plan page dono yahi use karen.
 *
 * Backend format:
 * { hbl: { "3m": { months: 3, rates: 6 }, "6m": { months: 6, rates: 12 } }, ubl: {...} }
 *
 * `rates` = poore plan par TOTAL markup % (per month nahi).
 */

// ✏️ Naya bank aaye to yahan sirf naam/code add karo. (Na bhi karo to key se auto naam ban jata hai.)
// Key ko lowercase + symbols hata kar match kiya jata hai ("Bank_Alfalah" => "bankalfalah").
const BANKS = [
  { keys: ["hbl"], label: "HBL", code: "HBL" },
  { keys: ["mcb", "mcbbank"], label: "MCB Bank", code: "MCB" },
  { keys: ["alfalah", "bankalfalah", "baf"], label: "Bank Alfalah", code: "BAF" },
  { keys: ["ubl"], label: "UBL", code: "UBL" },
  { keys: ["scb", "standardchartered"], label: "Standard Chartered", code: "SC" },
  { keys: ["meezan", "meezanbank"], label: "Meezan Bank", code: "MZN", islamic: true },
  { keys: ["faysal", "faysalbank", "fbl"], label: "Faysal Bank", code: "FBL", islamic: true },
];

const normalizeKey = (key) => String(key).toLowerCase().replace(/[^a-z0-9]/g, "");

function getBankMeta(key) {
  const k = normalizeKey(key);
  const found = BANKS.find((b) => b.keys.includes(k));
  if (found) return found;

  const pretty = String(key).replace(/[_-]+/g, " ").trim();
  const label =
    pretty.length <= 4
      ? pretty.toUpperCase()
      : pretty.replace(/\b\w/g, (c) => c.toUpperCase());
  return { label, code: pretty.replace(/\s/g, "").slice(0, 3).toUpperCase() };
}

/**
 * API data => [{ key, label, code, islamic, plans: [{ months, markup }] }]
 */
export function getBankPlans(raw) {
  const source =
    raw?.data && typeof raw.data === "object" && !Array.isArray(raw.data)
      ? raw.data
      : raw;

  return Object.entries(source || {})
    .map(([key, plans]) => {
      const meta = getBankMeta(key);
      return {
        key,
        label: meta.label,
        code: meta.code,
        islamic: !!meta.islamic,
        plans: Object.values(plans || {})
          .map((p) => ({ months: Number(p?.months), markup: Number(p?.rates) }))
          .filter((p) => p.months > 0 && !Number.isNaN(p.markup))
          .sort((a, b) => a.months - b.months),
      };
    })
    .filter((bank) => bank.plans.length);
}

/** Sab banks ke unique months, sorted: [3, 6, 9, 12] */
export function getAllMonths(banks) {
  return [...new Set(banks.flatMap((b) => b.plans.map((p) => p.months)))].sort(
    (a, b) => a - b,
  );
}

export function calcInstalment(price, markup, months) {
  const markupAmount = Math.round((price * markup) / 100);
  const total = price + markupAmount;
  const monthly = months ? Math.round(total / months) : 0;
  return { markupAmount, total, monthly };
}

/** 4.5 => "4.50%", 11 => "11%", 0 => "0%" */
export function formatRate(rate) {
  return Number.isInteger(rate) ? `${rate}%` : `${rate.toFixed(2)}%`;
}

/** [3,6,9,12] => "3, 6, 9, or 12" */
export function formatList(nums) {
  if (nums.length <= 1) return nums.join("");
  if (nums.length === 2) return `${nums[0]} or ${nums[1]}`;
  return `${nums.slice(0, -1).join(", ")}, or ${nums[nums.length - 1]}`;
}
