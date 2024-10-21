import apiSlice from "./apiSlice";

const cartUrl = "cart"

const cartApiSlice = apiSlice?.injectEndpoints({
    endpoints : (builder) => ({
        addToCart: builder.mutation({
            query: ({payload, token}) => ({
                url:  `${cartUrl}/add`,
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
    useAddToCartMutation
} = cartApiSlice;