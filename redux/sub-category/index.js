import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "../utils";

export const subCategorySlice = createApi({
  reducerPath: "subCategoryApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    getSubCategories: builder.query({
      //   query: (id) => `subSubCategory/${id}`,
      query: (params) => {
        const defaultParams = { paginate: false };
        const setParams = { ...defaultParams, ...(params && { name: params }) };
        return {
          url: "SubCategory",
          params: setParams,
        };
      },
    }),
  }),
});

export const { useGetSubCategoriesQuery } = subCategorySlice;
