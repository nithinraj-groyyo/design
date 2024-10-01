import { Service } from '../types/service';
import { ResponseFormat } from '../types/responseFormat';
import apiSlice from './apiSlice';

const serviceUrl = "services";

const serviceApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        fetchAllServices: builder.query<Service[], void>({
            query: () => serviceUrl,
            transformResponse: (response: ResponseFormat<Service[]>) => response.data,
            providesTags: ['Service'],
        }),


        createService: builder.mutation<Service, Partial<Service>>({
            query: (serviceData) => ({
                url: serviceUrl,
                method: 'POST',
                body: serviceData,
            }),
            invalidatesTags: ['Service'],
        }),


        updateService: builder.mutation<Service, { id: number; serviceData: Partial<Service> }>({
            query: ({ id, serviceData }) => ({
                url: `${serviceUrl}/${id}`,
                method: 'PUT',
                body: serviceData,
            }),
            invalidatesTags: ['Service'],
        }),


        deleteService: builder.mutation<void, number>({
            query: (id) => ({
                url: `${serviceUrl}/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Service'],
        }),
    }),
});

export const {
    useFetchAllServicesQuery,
    useCreateServiceMutation,
    useUpdateServiceMutation,
    useDeleteServiceMutation,
} = serviceApiSlice;

export default serviceApiSlice;