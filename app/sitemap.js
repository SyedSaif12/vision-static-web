// export const dynamic = "force-dynamic";
export const revalidate = 72000;
import { allApiFetched } from "@/lib/api";

const normalizeSitemapUrl = (item) => ({
  ...item,
  url: new URL(item.url).href.replace(/&/g, "&amp;"),
});

export default async function sitemap() {
  const public_url = process.env.NEXT_PUBLIC_URL;
  const newData = new Date().toISOString();
  const staticUrls = [
    {
      url: public_url,
      lastModified: newData,
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${public_url}/about-us`,
      lastModified: newData,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${public_url}/contact`,
      lastModified: newData,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${public_url}/return-policy`,
      lastModified: newData,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${public_url}/store-locator`,
      lastModified: newData,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
  const {
    staticListings,
    category,
    subCategory,
    categoryWithSubCategory,
    categoryWithChips,
    product,
  } = await allApiFetched();

  return [
    ...staticUrls,
    ...staticListings.map(normalizeSitemapUrl),
    ...category.map(normalizeSitemapUrl),
    ...subCategory.map(normalizeSitemapUrl),
    ...categoryWithSubCategory.map(normalizeSitemapUrl),
    ...categoryWithChips.map(normalizeSitemapUrl),
    ...product.map(normalizeSitemapUrl),
  ];
}