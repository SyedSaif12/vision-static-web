import dayjs from "dayjs";
import { getProducts } from "./product-query/fetch-api";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_LINK;

// export async function fetchInitialProductOnServerSide({
//   category,
//   subCategory = "",
//   name,
//   paginate = true,
//   page = 1,
//   limit = 12,
//   orderBy = "price",
//   order = "asc",
//   chip = false,
// }) {
//   try {
//     const params = new URLSearchParams({
//       category,
//       ...(subCategory && { subCategory }),
//       ...(name && { name }),
//       paginate,
//       page,
//       limit,
//       orderBy,
//       order,
//       chip,
//     });

//     const response = await fetch(`${BASE_URL}/api/products?${params}`, {
//       next: {
//         tags: ["products"],
//         revalidate: 86400,
//       },
//     });
//     if (!response.ok && response.status === 404) {
//       return null;
//     }
//     const responseData = await response.json();
//     return {
//       response: responseData,
//       category,
//       ...(subCategory && { subCategory }),
//       ...(name && { name }),
//       paginate,
//       page,
//       limit,
//       orderBy,
//       order,
//       chip,
//     };
//   } catch (error) {
//     console.log("ERROR: ", error);
//     throw error;
//   }
// }

// export async function fetchChipsAndFilters({
//   category,
//   subCategory = "",
//   chip = true,
// }) {
//   const params = new URLSearchParams({
//     category,
//     ...(subCategory.length && { subCategory }),
//     chip,
//   });
//   const [productChipRes, filtersRes] = await Promise.all([
//     chip
//       ? fetch(`${BASE_URL}/api/products?${params}`, {
//           next: {
//             tags: ["products"],
//             revalidate: 1000,
//           },
//         })
//       : Promise.resolve(null),
//     fetch(
//       `${BASE_URL}/api/products/filters?category=${category}&subCategory=${subCategory}`,
//       {
//         method: "POST",
//         next: { revalidate: 1000 },
//       },
//     ),
//   ]);

//   const products =
//     chip && productChipRes.ok ? await productChipRes.json() : null;
//   const filters = filtersRes.ok ? await filtersRes.json() : null;

//   return {
//     ...(chip && { chips: products?.data?.chip }),
//     filters: filters,
//   };
// }

export async function getCollectionProducts(collection, page = 1) {
  const COLLECTIONS = {
    featured: {
      isFeatured: "true",
    },

    deals: {
      tag: "deals",
    },

    "new-arrivals": {
       tag: "new-arrivals",
      // createdAt: dayjs().subtract(1, "month").format("YYYY-MM-DD"),
    },

    "open-box": {
      tag: "open-box",
    },

    "coming-soon": {
      isComingSoon: "true",
    },

    refurbished: {
      tag: "refurbished",
    },
  };
  const collectionQuery = COLLECTIONS[collection];

  if (!collectionQuery) {
    throw new Error(`Unknown collection: ${collection}`);
  }

  const q = {
    page,
    limit: 12,

    orderBy: "createdAt",
    order: "desc",

    ...collectionQuery,

    filters: {},
  };

  return await getProducts(q);
}
