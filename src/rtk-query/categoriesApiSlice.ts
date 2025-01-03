import { ICategoryWithSubcategories } from "../types/categories";
import { ResponseDTO } from "../types/responseFormat";
import apiSlice from "./apiSlice";

const categoryUrl = "category";

const handleSuccessResponse = <T>(response: ResponseDTO<T>): T => {
  if (response.status) {
    return response.data as T;
  } else {
    throw new Error(response.errorReason || "Unknown error occurred");
  }
};
const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loadAllCategoriesWithSubCategories: builder.query<
      Record<string, ICategoryWithSubcategories>,
      void
    >({
      query: () => `${categoryUrl}/loadCategory-SubCategory`,
      transformResponse: (
        response: ResponseDTO<Record<string, ICategoryWithSubcategories>>
      ) => {
        try {
          return handleSuccessResponse(response);
        } catch (error) {
          if (error instanceof Error) {
            console.error("Error in transformResponse:", error.message);
          } else {
            console.error("Unknown error in transformResponse");
          }
          return {};
        }
      },
    }),

    loadCategoriesWithPagination: builder.query<
      Record<string, any>,
      { pageIndex: number; pageSize: number }
    >({
      query: ({ pageIndex, pageSize }) =>
        `${categoryUrl}/list?pageIndex=${pageIndex}&pageSize=${pageSize}`,
      transformResponse: (
        response: ResponseDTO<Record<string, any>>
      ) => {
        try {
          return handleSuccessResponse(response);
        } catch (error) {
          if (error instanceof Error) {
            console.error("Error in transformResponse:", error.message);
          } else {
            console.error("Unknown error in transformResponse");
          }
          return {};
        }
      },
    }),

    loadSubCategoriesWithId: builder.query<
      { id: number; name: string }[],
      { categoryId: number; pageIndex: number; pageSize: number }
    >({
      query: ({ categoryId, pageIndex, pageSize }) =>
        `${categoryUrl}/${categoryId}/list/subcategories?pageIndex=${pageIndex}&pageSize=${pageSize}`,

      transformResponse: (
        response: ResponseDTO<{ id: number; name: string }[]>
      ) => {
        try {
          return handleSuccessResponse(response);
        } catch (error) {
          if (error instanceof Error) {
            console.error("Error in transformResponse:", error.message);
          } else {
            console.error("Unknown error in transformResponse");
          }
          return [];
        }
      },
    }),
    
    updateCategory: builder.mutation<
    { message: string; data: any },
    { name: string;
      parentId?: number;  } 
  >({
    query: (categoryData) => ({
      url: `${categoryUrl}/add`,
      method: "POST",
      body: categoryData, 
    }),
    transformResponse: (
      response: ResponseDTO<{ message: string; data: any }>
    ) => {
      try {
        return handleSuccessResponse(response);
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error in transformResponse:", error.message);
        } else {
          console.error("Unknown error in transformResponse");
        }
        return { message: "Failed to update category", data: null };
      }
    },
  }),
}),
});

export const {
  useLazyLoadAllCategoriesWithSubCategoriesQuery,
  useLoadCategoriesWithPaginationQuery,
  useLoadSubCategoriesWithIdQuery,
  useLazyLoadSubCategoriesWithIdQuery,
  useUpdateCategoryMutation
} = categoriesApiSlice;
