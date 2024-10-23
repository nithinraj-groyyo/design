import apiSlice from "./apiSlice";

const cartUrl = "cart";
const token = JSON.parse(localStorage.getItem("authToken") as string);

const cartApiSlice = apiSlice?.injectEndpoints({
    endpoints : (builder) => ({
        addToCart: builder.mutation({
            query: ({payload}) => ({
                url:  `${cartUrl}/add`,
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: payload
            })
        }),
        fetchCartList: builder.query({
            query: () => ({
                url:  `${cartUrl}/list`,
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            })
        })
    })
});

export const {
    useAddToCartMutation,
    useLazyFetchCartListQuery
} = cartApiSlice;