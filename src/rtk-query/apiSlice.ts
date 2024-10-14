import { createApi, fetchBaseQuery, BaseQueryFn } from "@reduxjs/toolkit/query/react";
import type { FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { RootState } from "../redux/store";
import { toast } from "react-toastify";

const baseQueryWithErrorHandling: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_NEW_SERVICE_API,
    prepareHeaders: (headers, { getState }) => {
      // Example to add Authorization token from Redux state
      // const token = (getState() as RootState).auth?.token;
      // if (token) {
      //   headers.set('Authorization', `Bearer ${token}`);
      // }
      return headers;
    },
  });

  try {
    console.log(args, api, extraOptions, "args, api, extraOptions")
    const result: any = await baseQuery(args, api, extraOptions);
    console.log("args, api, extraOptions", result)
    if (result.data) {
      if(result?.data?.httpStatusCode === 500){
        toast.error(result?.data?.errorReason?.message)
      }
    }
    return result;
  } catch (error) {
    return {
      error: { status: "FETCH_ERROR", error: "Something went wrong!" } as FetchBaseQueryError,
    };
  }
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithErrorHandling,
  endpoints: () => ({}),
  tagTypes: ["FAQ", "Service", "Category", "CategorySubCategories", "Products", "UserProfile", "Sizes", "Colors"],
});

export default apiSlice;