import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const catalogueUrl = "catalogue"

export const catalogueApiSlice = createApi({
  reducerPath: 'catalogueApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${catalogueUrl}/list`,
  }),
  endpoints: (builder) => ({
    addCatalogue: builder.mutation({
      query: (formData: FormData) => ({
        url: '/catalogue/add',
        method: 'POST',
        body: formData,
      }),
    }),
  }),
});

export const { useAddCatalogueMutation } = catalogueApiSlice;
