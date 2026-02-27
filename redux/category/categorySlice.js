import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "../utils";

export const categorySlice = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: ({ paginate = false, navbar = false }) => ({
        url: "category",
        params: { paginate, navbar },
      }),
    }),
    getAllCardCategories: builder.mutation({
      query: (cards) => ({
        url: "products/cards",
        method: "POST",
        body: { cards: cards },
      }),
    }),
  }),
});

export const { useGetCategoriesQuery, useGetAllCardCategoriesMutation } =
  categorySlice;
