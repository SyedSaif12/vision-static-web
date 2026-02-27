import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "../utils";

export const productSlice = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (params = {}) => {
        const defaultParams = { paginate: true };
        const finalParams = { ...defaultParams, ...params };
        return {
          url: "products",
          params: finalParams,
        };
      },
    }),

    getSingleProduct: builder.query({
      query: (slug) => `products/${slug}`,
    }),

    getFilters: builder.mutation({
      query: (params = {}) => ({
        url: "products/filters",
        method: "POST",
        params,
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetSingleProductQuery,
  useGetFiltersMutation,
} = productSlice;
