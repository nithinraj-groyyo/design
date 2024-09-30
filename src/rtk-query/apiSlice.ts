import { createApi, fetchBaseQuery, BaseQueryFn } from "@reduxjs/toolkit/query/react";
import type { FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { RootState } from "../redux/store";

const baseQueryWithErrorHandling: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: (headers, { getState }) => {
      //   const token = (getState() as RootState).auth?.token; // Fix: Type the getState properly

      //   if (token) {
      //     headers.set('Authorization', `Bearer ${token}`);
      //   }
      return headers;
    },
  });

  try {
    const result = await baseQuery(args, api, extraOptions);
    if (result.error) {
      console.error("API Error:", result.error);
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
  tagTypes: ["SomeTag"],
});

export default apiSlice;
