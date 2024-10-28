import apiSlice from "./apiSlice";

const subscriptionUrl = "subscription";

const subscriptionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createSubscription: builder.mutation({
      query: ({ payload, token }: { payload: any, token: string }) => ({
        url: `${subscriptionUrl}/createSubscription`,
        method: "POST",
        body: payload,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getSubscriptionList: builder.query({
      query: () => ({
        url: `${subscriptionUrl}/list`,
        method: "GET",
      }),
    }),
    getSubscriptionById: builder.query({
      query: (id: number) => ({
        url: `${subscriptionUrl}/byId/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateSubscriptionMutation,
  useGetSubscriptionListQuery,
  useGetSubscriptionByIdQuery,
} = subscriptionApiSlice;
