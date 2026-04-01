import { baseURL } from "@/redux/utils";

export const allApiFetched = async () => {
  const public_url = process.env.NEXT_PUBLIC_URL;

  try {
    const [categoryResponse, productResponse] = await Promise.allSettled([
      fetch(`${baseURL}category?navbar=true&web=true`, {
        next: { revalidate: 3600 },
        signal: AbortSignal.timeout(60000),
      }),
      fetch(`${baseURL}products/variants?paginate=false`, {
        cache: "no-store",
        signal: AbortSignal.timeout(60000),
      }),
    ]);

    let allCats = { data: [] };
    let allProducts = { data: [] };

    if (categoryResponse.status === "fulfilled" && categoryResponse.value.ok) {
      allCats = await categoryResponse.value.json();
    } else {
      console.error(
        "Categories fetch failed:",
        categoryResponse.reason || "Unknown error",
      );
    }

    if (productResponse.status === "fulfilled" && productResponse.value.ok) {
      allProducts = await productResponse.value.json();
    } else {
      console.error(
        "Products fetch failed:",
        productResponse.reason || "Unknown error",
      );
    }

    const currentDate = new Date().toISOString();
    const allCategoryUrls = [];
    const combineCats = [];

    for (const cat of allCats?.data || []) {
      if (!cat?.name) continue;

      // Category URL
      allCategoryUrls.push({
        url: `${public_url}/${encodeURIComponent(cat.name)}`,
        lastModified: currentDate,
        changeFrequency: "daily",
        priority: 0.9,
      });

      await Promise.allSettled(
        (cat?.subCategories || []).map(async (sub) => {
          if (!sub?.name) return;

          // Subcategory URL
          allCategoryUrls.push({
            url: `${public_url}/${encodeURIComponent(cat.name)}/${encodeURIComponent(sub.name)}`,
            lastModified: currentDate,
            changeFrequency: "daily",
            priority: 0.8,
          });

          try {
            const res = await fetch(
              `${baseURL}products?category=${encodeURIComponent(cat.name)}&subCategory=${encodeURIComponent(sub.name)}`,
              {
                cache: "no-store",
                signal: AbortSignal.timeout(60000),
              },
            );

            if (!res.ok) {
              console.error(
                `Chips fetch failed [${cat.name}/${sub.name}]: HTTP ${res.status}`,
              );
              return;
            }

            const data = await res.json();

            for (const chip of data?.data?.chip || []) {
              if (!chip?.title) continue;

              combineCats.push({
                url: `${public_url}/${encodeURIComponent(cat.name)}/${encodeURIComponent(sub.name)}?name=${encodeURIComponent(chip.title)}`,
                lastModified: currentDate,
                changeFrequency: "weekly",
                priority: 0.6,
              });
            }
          } catch (err) {
            console.error(
              `Chips fetch error [${cat.name}/${sub.name}]:`,
              err?.message || err,
            );
          }
        }),
      );
    }

    // Product URLs
    const productUrls =
      allProducts?.data
        ?.filter((product) => product?.slug)
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
      categoryWithChips: combineCats,
      product: productUrls,
    };
  } catch (error) {
    console.error("Sitemap fetch error:", error);
    // fallback empty array return
    return {
      category: [],
      categoryWithChips: [],
      product: [],
    };
  }
};
