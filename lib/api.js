import { baseURL } from "@/redux/utils";
const BASE_URL = process.env.NEXT_PUBLIC_SERVER_LINK || "http://localhost:1650/";

export const allApiFetched = async () => {
  try {
    const allUrls = await fetch(`${baseURL}products/seo/sitemap`, {
      next: { revalidate: 72000 },
      signal: AbortSignal.timeout(60000),
    });

    if (!allUrls.ok) throw new Error(`Sitemap API failed (${allUrls.status})`);

    const data = await allUrls.json();
    return {
      // /products, ?tag=..., ?isFeatured=true, ?isComingSoon=true
      staticListings: data?.static ?? [],
      // /products?category=laptops
      category: data?.category ?? [],
      // /products?subCategory=apple
      subCategory: data?.subcategory ?? [],
      // /products?category=laptops&subCategory=apple
      categoryWithSubCategory: data?.categorySubcategory ?? [],
      // /products?...&name=Macbook+Pro+16  aur  /products?name=...
      categoryWithChips: data?.chips ?? [],
      // /products/<variant-slug>
      product: data?.products ?? [],
    };
  } catch (error) {
    console.error("Sitemap fetch error:", error);
    // fallback empty array return
    return {
      staticListings: [],
      category: [],
      subCategory: [],
      categoryWithSubCategory: [],
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