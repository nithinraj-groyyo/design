import { ResponseDTO } from "../types/responseFormat";
import apiSlice from "./apiSlice";

const catalogueUrl = "catalogue";

const catalogueApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addCatalogue: builder.mutation({
            query: (formData: FormData) => ({
                url: `${catalogueUrl}/add`,
                method: "POST",
                body: formData,
            }),
            transformResponse: (response: ResponseDTO<any>) => {
                if (response.status && response.data) {
                    return response.data;
                } else {
                    throw new Error(response.errorReason || "Failed to add catalogue");
                }
            },
        }),

        fetchCategoryList: builder.query({
            query: () => ({
                url: `${catalogueUrl}/category/list`,
            }),
            transformResponse: (response: ResponseDTO<any>) => {
                if (response.status && response.data) {
                    return response.data;
                } else {
                    throw new Error(response.errorReason || "Failed to fetch category list");
                }
            },
        }),

        fetchCatalogueById: builder.query({
            query: (catalogueId: number) => ({
                url: `${catalogueUrl}/${catalogueId}`,
            }),
            transformResponse: (response: ResponseDTO<any>) => {
                if (response.status && response.data) {
                    return response.data;
                } else {
                    throw new Error(response.errorReason || "Failed to fetch catalogue by ID");
                }
            },
        }),
    }),
});

export const {
    useAddCatalogueMutation,
    useFetchCategoryListQuery,
    useFetchCatalogueByIdQuery,
} = catalogueApiSlice;
