"use server";

import { getProducts } from "./fetch-api";

const MIN_CHARS = 3;

export async function searchProducts(term, limit = 5) {
  const searchQuery = typeof term === "string" ? term.trim() : "";
  if (searchQuery.length < MIN_CHARS) return { products: [], total: 0 };

  try {
    const { products, total } = await getProducts({
      searchQuery,
      page: 1,
      limit,
      filters: {},
    });

    return {
      total,
      products: products.map((p) => ({
        id: p.id,
        slug: p.slug,
        name: p.name,
        image: p.image,
        price: p.price,
        oldPrice: p.oldPrice,
        stock: p.stock,
        specs: p.specs,
      })),
    };
  } catch (err) {
    console.error("searchProducts failed:", err);
    return { products: [], total: 0, error: true };
  }
}
