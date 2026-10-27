import "server-only";
import { cache } from "react";
import { DEFAULT_LIMIT, hrefFor, toApiParams } from "./query";

export const API_URL =
  process.env.NEXT_PUBLIC_SERVER_LINK ?? "http://localhost:1650";

export const INSTALLMENT_API_URL = process.env.NEXT_PUBLIC_BANK_RATE_URL;

export const getFilters = cache(async (category, subCategory) => {
  const empty = { filters: {}, price: null };
  if (!category) return empty;

  const params = new URLSearchParams({ category, showBrands: "true" });
  if (subCategory) params.set("subCategory", subCategory);

  const res = await fetch(`${API_URL}/api/products/filters?${params}`, {
    method: "POST",
    headers: { accept: "*/*" },
    cache: "no-cache",
  });
  // category / subCategory does not exist  -> 404
  if (res.status === 404) return { ...empty, notFound: true };
  if (!res.ok) throw new Error(`Filters request failed (${res.status})`);

  const data = await res.json();
  const filters = {};
  for (const [key, options] of Object.entries(data.filters ?? {})) {
    // backend kabhi "" key aur khali arrays bhejta hai -> ignore
    if (key && Array.isArray(options) && options.length) {
      filters[key] = options;
    }
  }
  const price =
    Array.isArray(data.price) && data.price.length === 2
      ? [data.price[0], data.price[1]]
      : null;
  return { filters, price };
});

export const obj = (v) => (v && typeof v === "object" ? v : {});
export const str = (v) =>
  typeof v === "string" && v.trim() && v.trim() !== "-" ? v.trim() : null;
export const num = (v) =>
  typeof v === "number" && Number.isFinite(v) ? v : null;

const MAX_SPECS = 4;
const SPEC_SKIP_KEYS = new Set(["brand"]);

function pickSpecs(attrs) {
  const out = [];
  for (const [key, value] of Object.entries(attrs)) {
    if (out.length >= MAX_SPECS) break;
    if (SPEC_SKIP_KEYS.has(key)) continue;
    const text = typeof value === "number" ? String(value) : str(value);
    if (text) out.push(text);
  }
  return out;
}

function pickImage(raw) {
  const first = Array.isArray(raw.image) ? raw.image[0] : raw.image;
  if (typeof first === "string") return first;
  return str(obj(first).fileUrl);
}

function pickAlt(raw) {
  const first = Array.isArray(raw.image) ? raw.image[0] : raw.image;
  if (typeof first === "string") return first;
  return str(obj(first)?.alt) ?? raw?.productTitle;
}

function pickStock(raw) {
  if (raw.isComingSoon === true) return "coming_soon";
  return raw.status === "in_stock" ? "in_stock" : "out_of_stock";
}

export function normalizeSection(raw) {
  const id = str(raw.id);
  const heading = str(raw.heading);
  const mainDesc = str(raw?.mainDesc)
  const categoryName = str(obj(raw.category).name);
  const subCategoryName = str(obj(raw.subCategory).name);
  if (!id || !heading || !categoryName || !subCategoryName) return null;

  const products = Array.isArray(raw.products)
    ? raw.products.map(normalizeProduct)
    : [];

  if (!products.length) return null;

  return {
    id,
    heading,
    mainDesc,
    slug: str(raw.slug) ?? heading.toLowerCase(),
    description: str(raw.description),
    bgColor: str(raw.bgColor),
    checkBoxText: Array.isArray(raw.checkBoxText)
      ? raw.checkBoxText.map(str).filter((t) => Boolean(t))
      : [],
    category: {
      id: str(obj(raw.category).id) ?? categoryName,
      name: categoryName,
    },
    subCategory: {
      id: str(obj(raw.subCategory).id) ?? subCategoryName,
      name: subCategoryName,
    },
    products,
  };
}

function normalizeChips(root) {
  const chip = obj(root.data).chip;
  if (!Array.isArray(chip)) return [];
  return chip
    .map((c) => ({
      id: c?.id?.$oid ?? str(c?.id) ?? c?.title,
      label: str(c?.title),
      count: num(c?.count) ?? 0,
    }))
    .filter((c) => c.label);
}

export function normalizeProduct(raw) {
  const attrs = obj(raw.attributes);
  const price = num(raw.price) ?? 0;
  const oldPrice = num(raw.oldPrice);

  return {
    id: str(raw.id) ?? str(raw._id) ?? "",
    slug: str(raw.slug) ?? str(raw.id) ?? "",
    name: str(raw.productTitle) ?? "Untitled product",
    brand: str(attrs.brand),
    image: pickImage(raw),
    alt: pickAlt(raw),
    tag: str(raw?.tag) ?? "",
    price,
    oldPrice: oldPrice && oldPrice > price ? oldPrice : null,
    condition: str(attrs.condition),
    warranty: str(attrs.warranty),
    stock: pickStock(raw),
    specs: pickSpecs(attrs),
  };
}

function normalizeProducts(json, q) {
  const root = obj(json);
  const list = obj(root.data).list;
  const products = Array.isArray(list) ? list.map(normalizeProduct) : [];
  const chips = normalizeChips(root);
  const total = num(root.total) ?? products.length;
  const limit = num(root.limit) ?? q.limit;

  return {
    chips,
    products,
    total,
    page: num(root.page) ?? q.page,
    limit,
    totalPages: num(root.totalPages) ?? Math.max(1, Math.ceil(total / limit)),
  };
}

export const getProducts = cache(async (q) => {
  const res = await fetch(`${API_URL}/api/products?${toApiParams(q)}`, {
    headers: { accept: "*/*" },
    // 60s cache; admin update par revalidateTag("products") se foran refresh
    next: { revalidate: 60, tags: ["products"] },
  });
  if (res.status === 404) {
    return {
      products: [],
      chips: [],
      total: 0,
      page: q.page,
      limit: q.limit,
      totalPages: 1,
    };
  }
  if (!res.ok) throw new Error(`Products request failed (${res.status})`);
  const data = await res.json();
  return normalizeProducts(data, q);
});

export const getSingleProduct = cache(async (slug) => {
  const res = await fetch(`${API_URL}/api/products/${slug}`, {
    method: "GET",
    headers: { accept: "application/json" },
    cache: "no-store",
    // next: { revalidate: REVALIDATE_SECONDS },
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Product API failed: ${res.status}`);
  const json = await res.json();
  return json?.data ?? null;
});

export async function getBrandSections() {
  const res = await fetch(
    `${API_URL}/api/products/brand-section?paginate=true`,
    {
      headers: { accept: "*/*" },

      next: { revalidate: 300 },
    },
  );
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Brand sections request failed (${res.status})`);

  const json = obj(await res.json());
  const list = Array.isArray(json.data) ? json.data : [];
  return list
    .map((item) => normalizeSection(obj(item)))
    .filter((s) => s !== null);
}

export function brandHref(section) {
  return hrefFor({
    // category: section.category.name,
    subCategory: section.subCategory.name,
    page: 1,
    limit: DEFAULT_LIMIT,
    filters: {},
  });
}

export const getDeals = async () => {
  const res = await fetch(`${API_URL}/api/products/deals`, {
    headers: { accept: "*/*" },
    next: { revalidate: 60 },
  });
  if (res.status === 404) {
    return {
      data: [],
    };
  }
  if (!res.ok) throw new Error(`Deals request failed (${res.status})`);
  const data = await res.json();
  return data?.data?.[0];
};

export async function getInstallmentPlan() {
  const res = await fetch(INSTALLMENT_API_URL, {
    headers: { accept: "*/*" },
    next: { revalidate: 60 * 60 * 24 },
  });

  if (res.status === 404) {
    return {};
  }
  if (!res.ok) throw new Error(`Products request failed (${res.status})`);
  const data = await res.json();
  return data;
}
