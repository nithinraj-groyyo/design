import { createApi } from '@reduxjs/toolkit/query/react';
import apiSlice from './apiSlice';

export interface AddAddressDTO {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean; 
  addressType: string;
}


export interface IAddressResponse {
  id: number;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  addressType: "Home" | "Work"; 
  isDefault: boolean;
  name: string;
  phoneNumber: string;
  landMark: string;
}

const addressUrl = "user/address";

export const addressApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addAddress: builder.mutation({
      query: ({ body, token }: { body: Partial<IAddressResponse>, token: string }) => ({
        url: `${addressUrl}/add`,
        method: 'POST',
        body,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Address"],
    }),
    getAddresses: builder.query<{data: IAddressResponse[]}, { token: string }>({
      query: ({ token }) => ({
        url: `${addressUrl}/list`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["Address"],
    }),
    deleteAddress: builder.mutation({
      query: ({ addressId, token }: { addressId: number, token: string }) => ({
        url: `${addressUrl}/delete/${addressId}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Address"],
    }),
    updateAddress: builder.mutation({
      query: ({ addressId, token, body }: { addressId: number, token: string, body: Partial<IAddressResponse> }) => ({
        url: `${addressUrl}/update/${addressId}`,
        method: 'POST',
        body,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Address"],
    }),
    updateDefaultAddress: builder.mutation({
      query: ({ addressId, token }: { addressId: number, token: string }) => ({
        url: `${addressUrl}/update/default/${addressId}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Address"],
    }),
  }),
});

export const { 
  useAddAddressMutation, 
  useGetAddressesQuery, 
  useDeleteAddressMutation, 
  useUpdateDefaultAddressMutation, 
  useUpdateAddressMutation
} = addressApiSlice;
