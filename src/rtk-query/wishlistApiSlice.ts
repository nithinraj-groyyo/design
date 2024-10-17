import apiSlice from "./apiSlice";

const wishlistUrl = 'wishlist';

const wishlistApiSlice = apiSlice?.injectEndpoints({
    endpoints: (builder) => ({
        getWishlist: builder.query({
            query: ({token}: {token: string}) => ({
                url: `${wishlistUrl}/list`,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
        }),
        updateLocalWishlist: builder.mutation({
            query: ({token, payload}: {token: string, payload: number[]}) => ({
                url: `${wishlistUrl}/update`,
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                method:"POST",
                body: {
                    productIds: payload
                }
            })
        }),
        removeWishList: builder.mutation({
            query: ({productId, token}: {productId:number, token: string}) => ({
                url: `${wishlistUrl}/remove-item/${productId}`,
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                method:"PATCH",
            })
        }),
        addToWishList: builder.mutation({
            query: ({productId, token}: {productId:number, token: string}) => ({
                url: `${wishlistUrl}/add/${productId}`,
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                method:"POST",
            })
        })
    })
})

export const {
    useLazyGetWishlistQuery,
    useGetWishlistQuery,
    useUpdateLocalWishlistMutation,
    useRemoveWishListMutation,
    useAddToWishListMutation
} = wishlistApiSlice