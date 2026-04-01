const BASE_URL = process.env.NEXT_PUBLIC_SERVER_LINK;

export async function fetchInitialProductOnServerSide({
  category,
  subCategory,
  name,
  paginate = true,
  page = 1,
  limit = 12,
  orderBy = "price",
  order = "asc",
  chip = false,
}) {
  try {
    const params = new URLSearchParams({
      category,
      subCategory,
      ...(name && { name }),
      paginate,
      page,
      limit,
      orderBy,
      order,
      chip,
    });

    const response = await fetch(`${BASE_URL}/api/products?${params}`, {
      next: {
        tags: ["products"],
        revalidate: 86400,
      },
    });
    if (!response.ok) throw new Error("Products fetch failed");
    const responseData = await response.json();
    return {
      response: responseData,
      category,
      subCategory,
      name,
      paginate,
      page,
      limit,
      orderBy,
      order,
      chip,
    };
  } catch (error) {
    console.log("data fetching error from server side");
    throw new Error(error?.message);
  }
}

export async function fetchChipsAndFilters({
  category,
  subCategory,
  chip = true,
}) {
  const [productChipRes, filtersRes] = await Promise.all([
    fetch(
      `${BASE_URL}/api/products?category=${category}&subCategory=${subCategory}&chip=${chip}`,
      {
        next: { revalidate: 1000 },
      },
    ),
    fetch(
      `${BASE_URL}/api/products/filters?category=${category}&subCategory=${subCategory}`,
      {
        method: "POST",
      },
      {
        next: { revalidate: 1000 },
      },
    ),
  ]);

  const [products, filters] = await Promise.all([
    productChipRes.json(),
    filtersRes.json(),
  ]);

  return {
    chips: products?.data?.chip,
    filters: filters,
  };
}
