import { FAQ } from "../types/faq";
import { ResponseDTO } from "../types/responseFormat";
import apiSlice from "./apiSlice";

const faqUrl = "faq"

const faqApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchFaqs: builder.query<FAQ[], void>({
      query: () => `${faqUrl}`,
      providesTags: ["FAQ"],
      transformResponse: (response: ResponseDTO<FAQ[]>) => {
        if (response.status && response.data) {
          return response.data;
        } else {
        
          throw new Error(response.errorReason || "Failed to fetch FAQs");
        }
      },
    }),

    createFaq: builder.mutation<FAQ, Partial<FAQ>>({
      query: (faq) => ({
        url: `${faqUrl}`,
        method: "POST",
        body: faq,
      }),
      transformResponse: (response: ResponseDTO<FAQ>) => {
        if (response.status && response.data) {
          return response.data;
        } else {
          throw new Error(response.errorReason || "Failed to create FAQ");
        }
      },
      invalidatesTags: ["FAQ"],
    }),

    updateFaq: builder.mutation<FAQ, { id: number; faq: Partial<FAQ> }>({
      query: ({ id, faq }) => ({
        url: `${faqUrl}/${id}`,
        method: "PUT",
        body: faq,
      }),
      transformResponse: (response: ResponseDTO<FAQ>) => {
        if (response.status && response.data) {
          return response.data;
        } else {
          throw new Error(response.errorReason || "Failed to update FAQ");
        }
      },
      invalidatesTags: ["FAQ"],
    }),

    deleteFaq: builder.mutation<void, number>({
      query: (id) => ({
        url: `${faqUrl}/${id}`,
        method: "DELETE",
      }),
      transformResponse: (response: ResponseDTO<void>) => {
        if (response.status) {
          return;
        } else {
          throw new Error(response.errorReason || "Failed to delete FAQ");
        }
      },
      invalidatesTags: ["FAQ"],
    }),
  })
});

export const {
  useFetchFaqsQuery,
  useCreateFaqMutation,
  useUpdateFaqMutation,
  useDeleteFaqMutation,
} = faqApiSlice;

export default faqApiSlice;