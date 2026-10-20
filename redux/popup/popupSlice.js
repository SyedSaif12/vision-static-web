import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "@/redux/utils";

export const popupSlice = createApi({
  reducerPath: "popupApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    postPopup: builder.mutation({
      query: (payload) => ({
        url: "contacts",
        method: "POST",
        body: payload,
      }),
    }),
    Corporate: builder.mutation({
      query: (payload) => ({
        url: "contacts/corporate-procurement",
        method: "POST",
        body: payload,
      }),
    }),

    warrantyClaim: builder.mutation({
      query: (payload) => ({
        url: "contacts/warranty-claim",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

// THIS NAME MUST MATCH EXACTLY
export const {
  usePostPopupMutation,
  useCorporateMutation,
  useWarrantyClaimMutation,
} = popupSlice;
