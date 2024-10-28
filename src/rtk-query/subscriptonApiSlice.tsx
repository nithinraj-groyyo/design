import apiSlice from "./apiSlice";

const subscriptionUrl = "subscription"

const subscriptionApiSlice =  apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createSubscription: builder.mutation({
            query: ({payload, token}: {payload: any, token: string}) => ({
                url: `${subscriptionUrl}/createSubscription`,
                method: "POST",
                body: payload
            })
        })
    })
});

export const {
    useCreateSubscriptionMutation
} = subscriptionApiSlice