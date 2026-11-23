// export const dynamic = "force-dynamic";
export const revalidate = 72000;
import { allApiFetched } from "@/lib/api";

const normalizeSitemapUrl = (item) => ({
  ...item,
  url: new URL(item.url).href.replace(/&/g, "&amp;"),
});

const STATIC_ROUTES = [
  { path: "", changeFrequency: "daily", priority: 1.0 },
  { path: "/categories", changeFrequency: "weekly", priority: 0.9 },
  { path: "/products", changeFrequency: "daily", priority: 0.9 },
  { path: "/corporate-procurement", changeFrequency: "monthly", priority: 0.8 },
  { path: "/refurb-technology", changeFrequency: "monthly", priority: 0.8 },
  // Support Services routes
  { path: "/support-services/contact-us", changeFrequency: "monthly", priority: 0.7 },
  { path: "/support-services/warranty-claim", changeFrequency: "monthly", priority: 0.7 },
  // Why Us routes
  { path: "/why-us/why-wegot", changeFrequency: "monthly", priority: 0.7 },
  { path: "/why-us/order-procedure", changeFrequency: "monthly", priority: 0.7 },
  { path: "/why-us/return-policy", changeFrequency: "yearly", priority: 0.6 },
  { path: "/why-us/privacy-policy", changeFrequency: "yearly", priority: 0.5 },
];

export default async function sitemap() {
  const public_url = (
    process.env.NEXT_PUBLIC_URL || "https://example.com"
  ).replace(/\/+$/, "");

  const newData = new Date().toISOString();
  
  const staticUrls = STATIC_ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: `${public_url}${path}`,
    lastModified: newData,
    changeFrequency,
    priority,
  }));

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