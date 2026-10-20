import sanitizeHtml from "sanitize-html";

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
