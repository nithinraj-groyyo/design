import { ResponseDTO } from "../types/responseFormat";
import apiSlice from "./apiSlice";

const productUrl = "product"

const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        fetchProducts: builder.query({
            query: ({ page, limit, isProductActive }) => ({
                url: `${productUrl}/list`,
                params: {
                    page,
                    limit,
                    isProductActive
                }
            }),
            providesTags: ["Products"],
            transformResponse: (response: ResponseDTO<any>) => {
                if (response.status && response.data) {
                    return response.data;
                } else {
                    throw new Error(response.errorReason || "Failed to create FAQ");
                }
            }
        }),
        updateProductStatus: builder.mutation({
            query: ({ id, isProductActive }) => ({
                url: `${productUrl}/${id}/status`,
                method: 'PATCH',
                body: { isProductActive },
            }),
        }),
    })
});

export const {
    useLazyFetchProductsQuery,
    useUpdateProductStatusMutation
} = productApiSlice;