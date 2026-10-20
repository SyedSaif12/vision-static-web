import { baseURL } from "@/redux/utils";
  const BASE_URL = process.env.NEXT_PUBLIC_SERVER_LINK || "http://localhost:1650/";

export const allApiFetched = async () => {
  try {
    const allUrls = await fetch(`${baseURL}products/seo/sitemap`, {
      next: { revalidate: 72000 },
      signal: AbortSignal.timeout(60000),
    });

    const data = await allUrls.json();
    return {
      category: data?.category ?? [],
      subCategory: data?.subcategory ?? [],
      categoryWithChips: data?.chips ?? [],
      product: data?.products ?? [],
    };
  } catch (error) {
    console.error("Sitemap fetch error:", error);
    // fallback empty array return
    return {
      category: [],
      subCategory: [],
      categoryWithChips: [],
      product: [],
    };
  }
};

export const getNavbar = async () => {
  const response = await fetch(`${BASE_URL}/api/category?web=true&navbar=true`, {
    next: { revalidate: 86400 }
  })
  if (!response.ok) throw new Error('Category data fetched failed!')
    return (await response.json())
}
