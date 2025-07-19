import { baseApi } from "../../api/baseApi";

const subscribeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    subscribeNewsLetter: builder.mutation({
      query: (userEmail) => {
        const formData = new FormData();
        formData.append("email", userEmail.email);
        return {
          url: "/subscribe-newsletter",
          method: "POST",
          body: formData,
        };
      },
    }),
    promptLimit: builder.query({
      query: () => ({
        url: "/user/free-plan-usage",
        method: "GET",
      }),
      extraOptions: { requireAuth: true },
    }),
    upgradePlan: builder.mutation({
      query: (planInfo) => ({
        url: "/subscription/checkout",
        method: "POST",
        body: planInfo,
      }),
      extraOptions: { requireAuth: true },
    }),
    confirmPlan: builder.mutation({
      query: (id) => ({
        url: "/subscription/confirm",
        method: "POST",
        body: id,
      }),
      extraOptions: { requireAuth: true },
    }),
    currentPlan: builder.query({
      query: () => ({
        url: '/subscription/current-plan',
        method: 'GET',
      }),
      extraOptions: { requireAuth: true },
    }),
    transactionList: builder.query({
      query: () => ({
        url: '/transaction/invoice/list',
        method: 'GET',
      }),
      extraOptions: { requireAuth: true },
    }),
    cancelPlan: builder.query({
      query: () => ({
        url: '/subscription/cancel-subscription',
        method: 'GET',
      }),
      extraOptions: { requireAuth: true },
    })
  }),
});

export const {
  useSubscribeNewsLetterMutation,
  usePromptLimitQuery,
  useUpgradePlanMutation,
  useConfirmPlanMutation,
  useCurrentPlanQuery,
  useLazyCancelPlanQuery,
  useTransactionListQuery
} = subscribeApi;