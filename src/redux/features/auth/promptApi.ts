import { baseApi } from "../../api/baseApi";

const promptApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    storePrompt: builder.mutation({
      query: (promptInfo) => ({
        url: "prompt/store",
        body: promptInfo,
        method: "POST",
      }),
      extraOptions: { requireAuth: true },
      invalidatesTags: ["promptList"],
    }),

    getpromptList: builder.query({
      query: () => ({
        url: "/prompt/index",
        method: "GET",
      }),
      extraOptions: { requireAuth: true },
      providesTags: ["promptList"],
    }),

    deletePrompt: builder.mutation({
      query: (id) => ({
        url: `/prompt/${id}/delete`,
        method: "DELETE",
      }),
      extraOptions: { requireAuth: true },
      invalidatesTags: ["promptList"],
    }),
  }),
});

export const {
  useStorePromptMutation,
  useGetpromptListQuery,
  useDeletePromptMutation,
} = promptApi;
