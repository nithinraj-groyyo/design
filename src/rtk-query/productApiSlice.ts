import { ResponseDTO } from "../types/responseFormat";
import apiSlice from "./apiSlice";

const productUrl = "product";
const sizeUrl = "size";
const colorUrl = "color";

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
            invalidatesTags: ["Products"]
        }),
        getAllSizes: builder.query({
            query: () => ({
                url: `${sizeUrl}/list`,
            }),
            providesTags: ["Sizes"],
        }),
        getAllColors: builder.query({
            query: () => ({
                url: `${colorUrl}/list`,
            }),
            providesTags: ["Colors"],
        }),
        getProductById: builder.query({
            query: ({productId}: {productId: number}) => ({
                url: `${productUrl}/${productId}`
            })
        }),
        addNewSize: builder.mutation({
            query: ({size}:{size: string}) => ({
                url: `${sizeUrl}/add`,
                body: {name: size},
                method: "POST", 
            }),
            invalidatesTags: ["Sizes"]
        }),
        addNewColor: builder.mutation({
            query: ({color}:{color: string}) => ({
                url: `${colorUrl}/add`,
                body: {name: color},
                method: "POST", 
            }),
            invalidatesTags: ["Colors"]
        }),
        updateProduct: builder.mutation({
            query: ({productId, payload}: {productId: number, payload: any}) => ({
               url: `${productUrl}/${productId}`,
               method: "PUT",
               body: payload
            })
        })
    })
});

export const {
    useLazyFetchProductsQuery,
    useUpdateProductStatusMutation,
    useGetAllSizesQuery,
    useGetAllColorsQuery,
    useGetProductByIdQuery,
    useAddNewSizeMutation,
    useAddNewColorMutation,
    useUpdateProductMutation
} = productApiSlice;