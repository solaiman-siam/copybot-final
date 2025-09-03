import { baseApi } from "../../api/baseApi";

const promptApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    storePrompt: builder.mutation({
      query: (promptInfo) => ({
        url: "/custom/prompt/store",
        body: promptInfo,
        method: "POST",
      }),
      extraOptions: { requireAuth: true },
      invalidatesTags: ["promptList"],
    }),

    getpromptList: builder.query({
      query: () => ({
        url: "custom/prompt/index",
        method: "GET",
      }),
      extraOptions: { requireAuth: true },
      providesTags: ["promptList"],
    }),

    getPromptCategoryList: builder.query({
      query: () => ({
        url: '/prompt/category/list',
        method: 'GET'
      }),
      extraOptions: { requireAuth: true}
    }),

    getPromptSubcategoryList: builder.query({
      query: (id) => ({
        url: `/category/${id}/prompt`,
        method: 'GET'
      }),
      extraOptions: { requireAuth: true },
    }),

    getPromptDescription: builder.query({
      query: (id) => ({
        url: `/prompt/${id}/description`,
        method: 'GET'
      }),
      extraOptions: { requireAuth: true}
    }),

    deletePrompt: builder.mutation({
      query: (id) => ({
        url: `custom/prompt/${id}/delete`,
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
  useGetPromptDescriptionQuery,
  useGetPromptSubcategoryListQuery,
  useGetPromptCategoryListQuery
} = promptApi;
