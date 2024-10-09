import { ResponseDTO } from "../types/responseFormat";
import apiSlice from "./apiSlice";

const productUrl = "product"
const sizesUrl = "size"

const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        fetchProducts: builder.query({
            query: ({page, limit}) => ({
                url: `${productUrl}/list`,
                params: {
                    page,
                    limit
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
        fetchSizes: builder.query({
            query:()=>({
                url: `${sizesUrl}/list`
            }),
            providesTags: ["Sizes"],
            transformResponse: (response: ResponseDTO<any>) => {
                if (response.status && response.data) {
                    return response.data;
                } else {
                    throw new Error(response.errorReason || "Failed to create FAQ");
                }
            }
        })
    })
});

export const {
    useLazyFetchProductsQuery,
    useLazyFetchSizesQuery
} = productApiSlice;