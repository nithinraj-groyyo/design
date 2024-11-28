import { createApi, fetchBaseQuery, BaseQueryFn } from "@reduxjs/toolkit/query/react";
import type { FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { toast } from "react-toastify";

const baseQueryWithErrorHandling: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_USER_SERVICE_API,
    prepareHeaders: (headers, { getState }) => {
      return headers;
    },
  });

  try {
    const result: any = await baseQuery(args, api, extraOptions);
console.log(result)
    if (result.data) {
      if (result?.data?.httpStatusCode === 500) {
        toast.error(result?.data?.errorReason?.message);
      }
      if (result?.data?.statusCode === 500) {
        toast.error(result?.data?.message);
      }
      if (result?.data?.statusCode === 401) {
        toast.error(result?.data?.message);
      }
      if (result?.data?.statusCode === 400) {
        toast.error(result?.data?.message);
      }
    }
    return result;
  } catch (error) {
    return {
      error: { status: "FETCH_ERROR", error: "Something went wrong!" } as FetchBaseQueryError,
    };
  }
};

export const userApiSlice = createApi({
  baseQuery: baseQueryWithErrorHandling,
  endpoints: () => ({}),
  reducerPath: 'userApi',
  tagTypes: ["AUTH"],
});

export default userApiSlice;
