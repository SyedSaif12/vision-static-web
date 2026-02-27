import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "@/redux/utils";

export const bargainSlice = createApi({
  reducerPath: "bargainApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    postBargain: builder.mutation({
      query: (payload) => ({
        url: "Bargain/create",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

// THIS NAME MUST MATCH EXACTLY
export const { usePostBargainMutation } = bargainSlice;
