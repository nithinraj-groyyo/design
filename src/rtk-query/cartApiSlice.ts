import apiSlice from "./apiSlice";

const cartUrl = "cart";

const cartApiSlice = apiSlice?.injectEndpoints({
    endpoints : (builder) => ({
        addToCart: builder.mutation({
            query: ({payload, token}: {payload: any, token: string}) => ({
                url:  `${cartUrl}/add`,
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: payload
            }),
            invalidatesTags: ["BAG"]
        }),
        fetchCartList: builder.query({
            query: ({token}: {token: string}) => ({
                url:  `${cartUrl}/list`,
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            }),
            providesTags: ["BAG"]
        }),
        updateCartQuantity: builder.mutation({
            query: ({token, cartId, payload}: {token: string; cartId:number, payload: Array<{cartItemVariantId: number, quantity: number}>}) => ({
                url: `${cartUrl}/update/${cartId}`,
                method: "PATCH",
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: payload
            }),
            invalidatesTags: ["BAG"]
        }),
        removeCart: builder.mutation({
            query: ({cartId, productId, token}: {token: string; cartId: number; productId: number}) => ({
                url: `${cartUrl}/delete/${cartId}/${productId}`,
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            }),
            invalidatesTags: ["BAG"]
        })
    })
});

export const {
    useAddToCartMutation,
    useLazyFetchCartListQuery,
    useUpdateCartQuantityMutation,
    useRemoveCartMutation
} = cartApiSlice;