import sanitizeHtml from "sanitize-html";
// Old UI ke markups ke hisaab se. Final percentages confirm kar lena.
const BANK_LABELS = {
  hbl: "HBL",
  ubl: "UBL",
  meezan: "Meezan",
  alfalah: "Bank Alfalah",
};

// Attributes jo table mein nahi dikhane (stale / duplicate)
const HIDDEN_SPEC_KEYS = new Set(["price"]);

const SPEC_LABELS = {
  no_of_typec: "Number of Type-C ports",
  usb_typec: "USB Type-C",
  wifi_wireless_fidelity: "Wi-Fi",
  no_of_effective_pixels: "Camera resolution",
  dimensions_wxhxd: "Dimensions (W x H x D)",
  battery_life: "Battery capacity",
  official_page: "Official page",
};


// storage prefix keys
const prefix = process.env.NEXT_PUBLIC_ENV;
export function StorageKey() {
  return {
    tokens: `${prefix}:tokens`,
    user: `${prefix}:user`,
  };
}

// validate to stirng is email or not
export function isEmail(value) {
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;

  return emailRegex.test(value.trim());
}

// validate to stirng is number or not
export function isPhoneNumber(value) {
  return /^03\d{9}$/.test(value.trim());
}

// hex color convert into rgba
export const getReadableTextColor = (hex = "#1a56db") => {
  let c = String(hex).replace("#", "").trim();
  if (c.length === 3)
    c = c
      .split("")
      .map((x) => x + x)
      .join("");
  if (!/^[0-9a-fA-F]{6}$/.test(c)) return "#ffffff";

  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  return luminance > 0.62 ? "#0f1830" : "#ffffff";
};

// price formatter
const pkr = new Intl.NumberFormat("en-PK", { maximumFractionDigits: 0 });
export const formatPrice = (price, currency = "PKR") =>
  `${currency} ${pkr.format(price)}`;

// format name product-name convert into Product name
export const formatName = (name) => {
  return name
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

export const slugify = (value) =>
  value.trim().toLowerCase().replace(/\s+/g, "-");

// category url return
export const getCategoryHref = (categoryName) => {
  return `/products?category=${slugify(categoryName)}`;
};

// sub category url return
export const getSubCategoryHref = (categoryName, subCategoryName) => {
  return `/products?category=${slugify(categoryName)}&subCategory=${slugify(subCategoryName)}`;
};

export const humanize = (str = "") =>
  str
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());

export const stripHtml = (html = "") =>
  sanitizeHtml(html, {
    allowedTags: [],
    allowedAttributes: {},
  })
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim() ?? "";


// Backend ka tag field: string, array of strings ya array of {name}. Sab handle.
export function getTags(product) {
  const raw = product.tags ?? product.tag ?? [];
  const list = Array.isArray(raw) ? raw : [raw];
  return list
    .map((t) => (typeof t === "string" ? t : t?.name || t?.title || t?.slug))
    .filter(Boolean)
    .map(humanize);
}

export function getBankPlans(raw) {
  return Object.entries(raw || {})
    .map(([key, plans]) => ({
      key,
      label: BANK_LABELS[key.toLowerCase()] ?? key.toUpperCase(),
      plans: Object.values(plans || {})
        .map((p) => ({ months: Number(p.months), markup: Number(p.rates) }))
        .filter((p) => p.months > 0 && !Number.isNaN(p.markup))
        .sort((a, b) => a.months - b.months),
    }))
    .filter((bank) => bank.plans.length);
}

export function getSpecs(attributes = {}) {
  return Object.entries(attributes)
    .filter(
      ([key, value]) =>
        value && String(value).trim() && !HIDDEN_SPEC_KEYS.has(key),
    )
    .map(([key, value]) => ({
      key,
      label: SPEC_LABELS[key] ?? humanize(key),
      value: String(value).trim(),
    }));
}

// faq HTML string => [{ q, a (html), text }]
export function parseFaq(html = "") {
  const items = [];
  const re = /<h3[^>]*>([\s\S]*?)<\/h3>\s*<p[^>]*>([\s\S]*?)<\/p>/gi;
  let m;
  while ((m = re.exec(html))) {
    items.push({ q: stripHtml(m[1]), a: m[2], text: stripHtml(m[2]) });
  }
  return items;
}

export const jsonLd = (data) => JSON.stringify(data).replace(/</g, "\\u003c");