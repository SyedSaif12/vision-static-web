import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "../utils";

export const reviewSlice = createApi({
  reducerPath: "reviewApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    getReviews: builder.query({
      query: () => {
        return {
          url: "review",
        };
      },
    }),
  }),
});

export const { useGetReviewsQuery } = reviewSlice;
