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

export interface AddressResponse {
  id: number;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  state: string;
  zip: string;
  addressType: string;
  flag: boolean;
}

const addressUrl = "user/address";

export const addressApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addAddress: builder.mutation({
      query: ({ body, token }: { body: AddAddressDTO, token: string }) => ({
        url: `${addressUrl}/add`,
        method: 'POST',
        body,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getAddresses: builder.query<{data: AddressResponse[]}, { token: string }>({
      query: ({ token }) => ({
        url: `${addressUrl}/list`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    deleteAddress: builder.mutation({
      query: ({ addressId, token }: { addressId: number, token: string }) => ({
        url: `${addressUrl}/delete/${addressId}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    updateDefaultAddress: builder.mutation({
      query: ({ addressId, token }: { addressId: number, token: string }) => ({
        url: `${addressUrl}/update/default/${addressId}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const { 
  useAddAddressMutation, 
  useGetAddressesQuery, 
  useDeleteAddressMutation, 
  useUpdateDefaultAddressMutation, 
} = addressApiSlice;
