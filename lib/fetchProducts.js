import dayjs from "dayjs";
import { getProducts } from "./product-query/fetch-api";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_LINK;

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
