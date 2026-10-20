export const PRODUCTS_PATH = "/products";
export const DEFAULT_LIMIT = 12;

const RESERVED = new Set([
  "category",
  "subCategory",
  "minPrice",
  "maxPrice",
  "orderBy",
  "order",
  "page",
  "limit",
  "paginate",
  "chip",
  "search",
  "searchQuery",
  "name",
  "isFeatured",
  "isComingSoon",
  "tag",
  "createdAt",
]);

/** Multi-select values URL me comma separated: ram=8GB,16GB */
const MULTI_SEP = ",";

const first = (v) => (Array.isArray(v) ? v[0] : v);

const toInt = (v, fallback) => {
  const n = Number.parseInt(v ?? "", 10);
  return Number.isFinite(n) && n > 0 ? n : fallback;
};

const toPrice = (v) => {
  if (!v) return undefined;
  const n = Number(v);
  return Number.isFinite(n) && n >= 0 ? n : undefined;
};

export function parseQuery(raw) {
  const filters = {};

  for (const [key, value] of Object.entries(raw)) {
    if (RESERVED.has(key)) continue;
    const values = (Array.isArray(value) ? value : [value])
      .flatMap((v) => (v ?? "").split(MULTI_SEP))
      .map((v) => v.trim())
      .filter(Boolean);
    if (values.length) filters[key] = [...new Set(values)];
  }

  const order = first(raw.order);

  return {
    category: first(raw.category) || undefined,
    subCategory: first(raw.subCategory) || undefined,
    name: first(raw.name) || undefined,
    searchQuery: first(raw.searchQuery) || undefined,
    minPrice: toPrice(first(raw.minPrice)),
    maxPrice: toPrice(first(raw.maxPrice)),
    orderBy: first(raw.orderBy) || undefined,
    order: order === "asc" || order === "desc" ? order : undefined,
    page: toInt(first(raw.page), 1),
    limit: toInt(first(raw.limit), DEFAULT_LIMIT),
    isFeatured: first(raw.isFeatured) || undefined,
    isComingSoon: first(raw.isComingSoon) || undefined,
    tag: first(raw.tag) || undefined,
    createdAt: first(raw.createdAt) || undefined,
    filters,
  };
}

/** Browser URL ke params (defaults hata kar, taake URL saaf rahe). */
export function toSearchParams(q) {
  const p = new URLSearchParams();
  if (q.category) p.set("category", q.category);
  if (q.subCategory) p.set("subCategory", q.subCategory);
  if (q.name) p.set("name", q.name);
  if (q.searchQuery) p.set("searchQuery", q.searchQuery);
  for (const [key, values] of Object.entries(q.filters)) {
    if (values.length) p.set(key, values.join(MULTI_SEP));
  }
  if (q.minPrice !== undefined) p.set("minPrice", String(q.minPrice));
  if (q.maxPrice !== undefined) p.set("maxPrice", String(q.maxPrice));
  if (q.isFeatured !== undefined) p.set("isFeatured", String(q.isFeatured));
  if (q.isComingSoon !== undefined)
    p.set("isComingSoon", String(q.isComingSoon));
  if (q.tag) p.set("tag", q.tag);
  if (q.createdAt) p.set("createdAt", q.createdAt);
  if (q.orderBy) p.set("orderBy", q.orderBy);
  if (q.order) p.set("order", q.order);
  if (q.limit !== DEFAULT_LIMIT) p.set("limit", String(q.limit));
  if (q.page > 1) p.set("page", String(q.page));
  return p;
}

export function hrefFor(q) {
  const qs = toSearchParams(q).toString();
  return qs ? `${PRODUCTS_PATH}?${qs}` : PRODUCTS_PATH;
}

/** Backend ke liye params (paginate hamesha true). */
export function toApiParams(q) {
  const p = new URLSearchParams();
  if (q.category) p.set("category", q.category);
  if (q.subCategory) p.set("subCategory", q.subCategory);
  if (q.name) p.set("name", q.name);
  if (q.searchQuery) p.set("searchQuery", q.searchQuery);
  p.set("chip", q.subCategory ? "true" : "false"); // if hata diya
  for (const [key, values] of Object.entries(q.filters)) {
    // backend ko multi-value kaise chahiye? Sirf yahan badalna hai.
    if (values.length) p.set(key, values.join(MULTI_SEP));
  }
  if (q.minPrice !== undefined) p.set("minPrice", String(q.minPrice));
  if (q.maxPrice !== undefined) p.set("maxPrice", String(q.maxPrice));
  if (q.isFeatured !== undefined) p.set("isFeatured", String(q.isFeatured));
  if (q.isComingSoon !== undefined)
    p.set("isComingSoon", String(q.isComingSoon));
  if (q.tag) p.set("tag", q.tag);
  if (q.createdAt) p.set("createdAt", q.createdAt);
  if (q.orderBy) p.set("orderBy", q.orderBy);
  if (q.order) p.set("order", q.order);
  p.set("paginate", "true");
  p.set("page", String(q.page));
  p.set("limit", String(q.limit));
  return p;
}

/** Suspense key: query badli => skeleton dobara dikhe. */
export const queryKey = (q) => toSearchParams(q).toString();

// ---------- pure helpers: hamesha NAYA query return karte hain ----------

/** Koi bhi filter badle to page 1 par wapas (jab tak page khud na diya ho). */
export function withPatch(q, patch) {
  return { ...q, page: 1, ...patch };
}

export function toggleFilter(q, key, value) {
  const current = q.filters[key] ?? [];
  const next = current.includes(value)
    ? current.filter((v) => v !== value)
    : [...current, value];
  const filters = { ...q.filters, [key]: next };
  if (!next.length) delete filters[key];
  return withPatch(q, { filters });
}

/** Brand (subCategory) badalne par purane dynamic filters invalid ho jate hain. */
export function selectBrand(q, brand) {
  return withPatch(q, { subCategory: brand, filters: {} });
}

export function selectProductPills(q, name) {
  return withPatch(q, { name, filters: {} });
}

export function clearAll(q) {
  return { page: 1, limit: q.limit, category: q.category, filters: {} };
}

export const hasActiveFilters = (q) =>
  Boolean(
    q.subCategory ||
    q.name ||
    q.minPrice !== undefined ||
    q.maxPrice !== undefined ||
    q.searchQuery ||
    Object.keys(q.filters).length,
  );

// ---------- sorting ----------
export const SORT_OPTIONS = [
  { label: "Newest first", orderBy: "createdAt", order: "desc" },
  { label: "A to Z", orderBy: "productTitle", order: "asc" },
  { label: "Z to A", orderBy: "productTitle", order: "desc" },
  { label: "Price: low to high", orderBy: "price", order: "asc" },
  { label: "Price: high to low", orderBy: "price", order: "desc" },
];
