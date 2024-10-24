import apiSlice from "./apiSlice";

const orderUrl = "order"

const orderApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrderCheckout: builder.mutation({
            query: ({token, payload}:{token: string, payload: { cartId: number; addressId: number; phoneNumber: string;}}) => ({
                url : `${orderUrl}/add`,
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: payload
            })
        })
    })
});

export const {
    useCreateOrderCheckoutMutation
} = orderApiSlice