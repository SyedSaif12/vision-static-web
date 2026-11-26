import "server-only";
import { cache } from "react";
import {
  normalizeBlog,
  normalizeBlogList,
  normalizeCategoryList,
} from "./utils";

const API_URL = (
  process.env.NEXT_PUBLIC_SERVER_LINK ?? "http://localhost:1650"
).replace(/\/$/, "");

export const PAGE_SIZE = 6;

const headers = { accept: "application/json" };

/**
 * GET /api/blogs  (published only, backend ki taraf se)
 * @returns {{blogs: object[], total: number, hasMore: boolean}}
 */
export async function getBlogs({
  page = 1,
  limit = PAGE_SIZE,
  category,
  search,
} = {}) {
  const params = new URLSearchParams({ page: String(page), limit: String(limit) });
  if (category) params.set("category", category);
  if (search) params.set("search", search);

  const res = await fetch(`${API_URL}/api/blogs?${params}`, {
    headers,
    next: { revalidate: 300, tags: ["blogs"] },
  });
  if (!res.ok) throw new Error(`Blogs API failed (${res.status})`);

  return normalizeBlogList(await res.json(), limit);
}

/**
 * GET /api/blogs/:slug — backend views +1 karta hai, is liye cache() se
 * generateMetadata + page ek hi request me sirf ek hit karte hain.
 * 404 (invalid slug ya draft) par null.
 */
export const getBlog = cache(async (slug) => {
  const res = await fetch(`${API_URL}/api/blogs/${encodeURIComponent(slug)}`, {
    headers,
    cache: "no-store",
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Blog API failed (${res.status})`);

  const json = await res.json();
  return normalizeBlog(json?.data?.blog ?? json?.data ?? json?.blog ?? null);
});

/** GET /api/blog-category — blog counts ke saath. Fail ho to khali list. */
export async function getBlogCategories() {
  try {
    const res = await fetch(`${API_URL}/api/blog-category`, {
      headers,
      next: { revalidate: 600, tags: ["blogs"] },
    });
    if (!res.ok) return [];
    return normalizeCategoryList(await res.json());
  } catch {
    return [];
  }
}
