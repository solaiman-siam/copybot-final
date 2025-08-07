import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";
type CustomBaseQuery = ReturnType<typeof fetchBaseQuery>;

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders: (headers, { getState, extraOptions }) => {
      const typedExtra = extraOptions as { requireAuth?: boolean };

      if (!typedExtra?.requireAuth) return headers;

      const token = (getState() as RootState).auth.token;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }) as CustomBaseQuery,
  tagTypes: ['promptList', 'chatList' , 'freeLimit'],
  endpoints: () => ({}),
});
