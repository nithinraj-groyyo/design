import { ResponseDTO } from "../types/responseFormat";
import apiSlice from "./apiSlice";

const rfqUrl = "rfq";

const rfqApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addRFQ: builder.mutation({
      query: ({formData,token}:{formData: FormData,token:string}) => ({
        url: `${rfqUrl}/add`,
        method: "POST",
        body: formData,
        providesTags: ["RFQ"],
        headers: {
            Authorization: `Bearer ${token}`, 
          },
      }),
      transformResponse: (response: ResponseDTO<any>) => {
        if (response.status && response.data) {
          return response.data;
        } else {
          throw new Error(response.errorReason || "Failed to add RFQ");
        }
      },
    }),

    getRFQList: builder.query({
      query: (token:string) => ({
        url: `${rfqUrl}/rfq-list`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      }),
      transformResponse: (response: ResponseDTO<any>) => {
        if (response.status && response.data) {
          return response.data;
        } else {
          throw new Error(response.errorReason || "Failed to fetch RFQ list");
        }
      },
      providesTags: ["RFQ"],
    }),

    getUserRFQList: builder.query({
      query: (token:string) => ({
        url: `${rfqUrl}/user/list`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      }),
      transformResponse: (response: ResponseDTO<any>) => {
        if (response.status && response.data) {
          return response.data; // Return the user's RFQs list
        } else {
          throw new Error(response.errorReason || "Failed to fetch user RFQ list");
        }
      },
      providesTags: ["RFQ"],
    }),
  }),
});

export const {
  useAddRFQMutation,
  useGetRFQListQuery,
  useGetUserRFQListQuery, 
} = rfqApiSlice;
