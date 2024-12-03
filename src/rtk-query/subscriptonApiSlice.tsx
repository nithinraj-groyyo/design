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
    subscribeUser: builder.mutation({
      query: ({ userId, token }: { userId: number; token: string }) => ({
        url: `/user/subscribe/${userId}`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const {
  useCreateSubscriptionMutation,
  useGetSubscriptionListQuery,
  useGetSubscriptionByIdQuery,
  useSubscribeUserMutation, 
} = subscriptionApiSlice;