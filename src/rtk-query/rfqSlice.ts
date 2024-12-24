import { ResponseDTO } from "../types/responseFormat";
import apiSlice from "./apiSlice";

const rfqUrl = "rfq";

const rfqApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addRFQ: builder.mutation({
      query: ({ formData, token, catalogueId }: { formData: any; token: string; catalogueId: string }) => ({
        url: `${rfqUrl}/add/${catalogueId}`, 
        method: "POST",
        body: formData,
        invalidatesTags: ["RFQ"],
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
      providesTags: ["Address"],
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
    
    updateRFQStatus: builder.mutation({
      query: ({ id, status, token }: { id: string; status: string; token: string }) => ({
        url: `${rfqUrl}/${id}/update/status`,
        method: "PATCH",
        body: { status },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (response: ResponseDTO<any>) => {
        if (response.status && response.data) {
          return response.data;
        } else {
          throw new Error(response.errorReason || "Failed to update RFQ status");
        }
      },
      invalidatesTags: ["RFQ"],
    }),
  }),
});

export const {
  useAddRFQMutation,
  useGetRFQListQuery,
  useGetUserRFQListQuery,
  useUpdateRFQStatusMutation, 
} = rfqApiSlice;