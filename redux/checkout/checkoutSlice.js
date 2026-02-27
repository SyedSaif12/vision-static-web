import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "@/redux/utils";

export const checkoutSlice = createApi({
  reducerPath: "checkoutApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    postCheckout: builder.mutation({
      query: (payload) => ({
        url: "orders",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

// THIS NAME MUST MATCH EXACTLY
export const { usePostCheckoutMutation } = checkoutSlice;
