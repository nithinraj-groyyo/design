
import { FAQ } from "../types/faq";
import { ResponseFormat } from "../types/responseFormat";
import apiSlice from "./apiSlice";

const faqUrl = "faq"

const faqApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchFaqs: builder.query<FAQ[], void>({
      query: () => `${faqUrl}`,
      providesTags: ["FAQ"],
      transformResponse: (response: ResponseFormat<FAQ[]>) => response.data,
    }),
  
    createFaq: builder.mutation<ResponseFormat<FAQ>, Partial<FAQ>>({
      query: (faq) => ({
        url: `${faqUrl}`,
        method: "POST",
        body: faq,
      }),
      invalidatesTags: ["FAQ"],
    }),

  
    updateFaq: builder.mutation<ResponseFormat<FAQ>, { id: number; faq: Partial<FAQ> }>({
      query: ({ id, faq }) => ({
        url: `${faqUrl}/${id}`,
        method: "PUT",
        body: faq,
      }),
      invalidatesTags: ["FAQ"],
    }),

  
    deleteFaq: builder.mutation<ResponseFormat<void>, number>({
      query: (id) => ({
        url: `${faqUrl}/${id}`,
        method: "DELETE",
      }),
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