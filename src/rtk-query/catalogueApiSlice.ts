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
                providesTags: ["Catalogue"],

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
            query: (token: string) => ({
                url: `${catalogueUrl}/category/list`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
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
            query: ({ catalogueId, token }: { catalogueId: number; token: string }) => ({
                url: `${catalogueUrl}/${catalogueId}`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
            transformResponse: (response: ResponseDTO<any>) => {
                if (response.status && response.data) {
                    return response.data;
                } else {
                    throw new Error(response.errorReason || "Failed to fetch catalogue by ID");
                }
            },
        }),

        fetchSubCategoriesList: builder.query({
            query: ({ categoryId, token }: { categoryId: number; token: string }) => ({
                url: `${catalogueUrl}/sub-categories/${categoryId}`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
            transformResponse: (response: ResponseDTO<any>) => {
                if (response.status && response.data) {
                    return response.data;
                } else {
                    throw new Error(response.errorReason || "Failed to fetch subcategories");
                }
            },
        }),

        fetchCatalogueList: builder.query({
            query: (token: string) => ({
                url: `${catalogueUrl}/list`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
            transformResponse: (response: ResponseDTO<any>) => {
                if (response.status && response.data) {
                    return response.data;
                } else {
                    throw new Error(response.errorReason || "Failed to fetch category list");
                }
            },
        }),

        addCatalogueCategory: builder.mutation({
            query: ({ name, numberOfFreeCatalogues, token }: { name: string; numberOfFreeCatalogues: number; token: string }) => ({
                url: `${catalogueUrl}/category`,
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: {
                    name,
                    numberOfFreeCatalogues,
                },
            }),
            transformResponse: (response: ResponseDTO<any>) => {
                if (response.status && response.data) {
                    return response.data;
                } else {
                    throw new Error(response.errorReason || "Failed to add catalogue category");
                }
            },
        }),

        addCatalogueSubCategory: builder.mutation({
            query: ({ name, parentId, token }: { name: string; parentId: number; token: string }) => ({
                url: `${catalogueUrl}/sub-category`,
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: {
                    name,
                    parentId,
                },
            }),
            transformResponse: (response: ResponseDTO<any>) => {
                if (response.status && response.data) {
                    return response.data;
                } else {
                    throw new Error(response.errorReason || "Failed to add sub-category");
                }
            },
        }),

        loadCatalogueCategoryAndSubCategories: builder.query({
            query: (token: string) => ({
                url: `${catalogueUrl}/load/category-subCategory`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
            transformResponse: (response: ResponseDTO<any>) => {
                if (response.status && response.data) {
                    return response.data;
                } else {
                    throw new Error(response.errorReason || "Failed to load category and subcategories");
                }
            },
        }),

        updateCatalogue: builder.mutation({
            query: ({ formData, catalogueId, token }: { formData: FormData; catalogueId: number; token: string }) => ({
                url: `${catalogueUrl}/update/${catalogueId}`,
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            }),
            transformResponse: (response: ResponseDTO<any>) => {
                if (response.status && response.data) {
                    return response.data;
                } else {
                    throw new Error(response.errorReason || "Failed to update catalogue");
                }
            },
        }),
    }),
});
export const {
    useAddCatalogueMutation,
    useFetchCategoryListQuery,
    useFetchCatalogueByIdQuery,
    useFetchSubCategoriesListQuery, 
    useLazyFetchCatalogueListQuery,
    useAddCatalogueCategoryMutation,
    useAddCatalogueSubCategoryMutation,
    useLazyLoadCatalogueCategoryAndSubCategoriesQuery,
    useUpdateCatalogueMutation
} = catalogueApiSlice;
