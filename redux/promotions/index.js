import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "../utils";

export const promotionSlice = createApi({
  reducerPath: "promotionApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    promotions: builder.query({
      query: () => ({
        url: "Promotions",
        params: { paginate: true },
      }),
    }),
  }),
});

export const { usePromotionsQuery } = promotionSlice;
