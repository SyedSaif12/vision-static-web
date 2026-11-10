// lib/product-query/breadcrumbs.js
import { DEFAULT_LIMIT, PRODUCTS_PATH, hrefFor } from "./query";

export const prettify = (label) => label.replace(/-/g, " ");

export function buildBreadcrumbs(query, filterLabel) {
  const { category, subCategory, name } = query;
  const base = { page: 1, limit: DEFAULT_LIMIT, filters: {} };

  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Products", href: PRODUCTS_PATH },
  ];

  if (category) {
    crumbs.push({
      label: prettify(category),
      href: hrefFor({ ...base, category }),
    });
  }
  if (subCategory) {
    crumbs.push({
      label: prettify(subCategory),
      href: hrefFor({ ...base, category, subCategory }),
    });
  }
  if (name) {
    crumbs.push({
      label: prettify(name),
      href: hrefFor({ ...base, category, subCategory, name }),
    });
  }
  // tag / isFeatured wala label (Deals, Featured...) hamesha aakhir me
  if (filterLabel) crumbs.push({ label: filterLabel, href: null });

  return crumbs;
}
