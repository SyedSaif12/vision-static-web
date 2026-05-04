const BASE_URL = process.env.NEXT_PUBLIC_SERVER_LINK;

export async function fetchInitialProductOnServerSide({
  category,
  subCategory = "",
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
      ...(subCategory && { subCategory }),
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
      ...(subCategory && { subCategory }),
      ...(name && { name }),
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
  subCategory = "",
  chip = true,
}) {
  const params = new URLSearchParams({
    category,
    ...(subCategory.length && { subCategory }),
    chip
  })
  const [productChipRes, filtersRes] = await Promise.all([
    chip ? fetch(
      `${BASE_URL}/api/products?${params}`,
      {
        next: { revalidate: 1000 },
      },
    ) : Promise.resolve(null),
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

  const products = chip && productChipRes.ok ? await productChipRes.json() : null
  const filters = filtersRes.ok ? await filtersRes.json() : null

  return {
    ...(chip && {chips: products?.data?.chip}),
    filters: filters,
  };
}
