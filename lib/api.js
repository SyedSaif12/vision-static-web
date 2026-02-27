import { baseURL } from "@/redux/utils";

export const allApiFetched = async () => {
  const public_url = process.env.NEXT_PUBLIC_URL;

  try {
    // Parallel fetching with individual error handling
    const [categoryResponse, productResponse] = await Promise.allSettled([
      fetch(`${baseURL}category?navbar=true`, {
        next: { revalidate: 3600 },
        //  Add timeout to prevent hanging
        signal: AbortSignal.timeout(60000), // 60 seconds
      }),
      fetch(`${baseURL}products/variants?paginate=false`, {
        next: { revalidate: 3600 },
        signal: AbortSignal.timeout(60000),
      }),
    ]);

    //  Safe data extraction with fallbacks
    let allCats = { data: [] };
    let allProducts = { data: [] };

    // Handle category response
    if (categoryResponse.status === "fulfilled" && categoryResponse.value.ok) {
      allCats = await categoryResponse.value.json();
    } else {
      console.error(
        "Categories fetch failed:",
        categoryResponse.reason || "Unknown error",
      );
    }

    // Handle product response
    if (productResponse.status === "fulfilled" && productResponse.value.ok) {
      allProducts = await productResponse.value.json();
    } else {
      console.error(
        "Products fetch failed:",
        productResponse.reason || "Unknown error",
      );
    }

    //  Use ISO string instead of locale string (better for sitemap)
    const currentDate = new Date().toISOString();

    //  Optimized category URLs generation
    const allCategoryUrls = [];

    allCats?.data?.forEach((cat) => {
      if (!cat?.name) return; // Skip invalid entries

      // Category page
      allCategoryUrls.push({
        url: `${public_url}/${encodeURIComponent(cat.name)}`, //  URL encode
        lastModified: currentDate,
        changeFrequency: "daily",
        priority: 0.9,
      });

      // Subcategory pages
      cat?.subCategories?.forEach((sub) => {
        if (!sub?.name) return;

        allCategoryUrls.push({
          url: `${public_url}/${encodeURIComponent(cat.name)}/${encodeURIComponent(sub.name)}`,
          lastModified: currentDate,
          changeFrequency: "daily",
          priority: 0.8,
        });
      });
    });

    //  Optimized product URLs generation
    const productUrls =
      allProducts?.data
        ?.filter((product) => product?.slug) // Skip products without slug
        .map((product) => ({
          url: `${public_url}/product/${product.slug}`,
          lastModified: product?.updatedAt
            ? new Date(product.updatedAt).toISOString()
            : currentDate,
          changeFrequency: "weekly",
          priority: 0.7,
        })) || [];

    return {
      category: allCategoryUrls,
      product: productUrls,
    };
  } catch (error) {
    console.error("Sitemap fetch error:", error);
    //  Return empty arrays instead of throwing (sitemap won't crash)
    return {
      category: [],
      product: [],
    };
  }
};
