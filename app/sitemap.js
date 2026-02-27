export const dynamic = "force-dynamic";
import { allApiFetched } from "@/lib/api";


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
  const { category, product } = await allApiFetched();

  return [...staticUrls, ...category, ...product];
}
