import { Service } from '../types/service';
import { ResponseDTO } from '../types/responseFormat';
import apiSlice from './apiSlice';

const serviceUrl = "services";

const serviceApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        fetchAllServices: builder.query<Service[], void>({
            query: () => serviceUrl,
            transformResponse: (response: ResponseDTO<Service[]>) => {
                if (response.status && response.data) {
                    return response.data;
                } else {
                    throw new Error(response.errorReason || 'Failed to fetch services');
                }
            },
            providesTags: ['Service'],
        }),

        createService: builder.mutation<Service, Partial<Service>>({
            query: (serviceData) => ({
                url: serviceUrl,
                method: 'POST',
                body: serviceData,
            }),
            transformResponse: (response: ResponseDTO<Service>) => {
                if (response.status && response.data) {
                    return response.data;
                } else {
                    throw new Error(response.errorReason || 'Failed to create service');
                }
            },
            invalidatesTags: ['Service'],
        }),

        updateService: builder.mutation<Service, { id: number; serviceData: Partial<Service> }>({
            query: ({ id, serviceData }) => ({
                url: `${serviceUrl}/${id}`,
                method: 'PUT',
                body: serviceData,
            }),
            transformResponse: (response: ResponseDTO<Service>) => {
                if (response.status && response.data) {
                    return response.data;
                } else {
                    throw new Error(response.errorReason || 'Failed to update service');
                }
            },
            invalidatesTags: ['Service'],
        }),

        deleteService: builder.mutation<void, number>({
            query: (id) => ({
                url: `${serviceUrl}/${id}`,
                method: 'DELETE',
            }),
            transformResponse: (response: ResponseDTO<void>) => {
                if (response.status) {
                    return;
                } else {
                    throw new Error(response.errorReason || 'Failed to delete service');
                }
            },
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