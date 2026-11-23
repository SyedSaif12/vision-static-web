import { getProducts } from "./product-query/fetch-api";

const COLLECTIONS = {
  featured: {
    isFeatured: true,
  },

  deals: {
    tag: "deals",
  },

  "new-arrivals": {
    tag: "new-arrivals",
  },

  "open-box": {
    type: "open-box",
  },

  "coming-soon": {
    isComingSoon: true,
  },

  refurbished: {
    type: "refurbished",
  },
};
export async function getCollectionProducts(collection, page = 1) {
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
