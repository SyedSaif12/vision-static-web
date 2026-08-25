import { baseURL } from "@/redux/utils";

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
