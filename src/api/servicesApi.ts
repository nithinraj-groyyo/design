import axios from 'axios';
import { Service } from '../types/service';
import { ResponseFormat } from '../types/responseFormat';

const BASE_URL = process.env.REACT_APP_NEW_SERVICE_API + 'services';

export const fetchAllServices = async (): Promise<Service[]> => {
    const response = await axios.get<Service[]>(`${BASE_URL}`);
    console.log(response, "response")
    return response.data;
};

export const createService = async (serviceData: Partial<Service>) => {
    const response = await axios.post<Service>(`${BASE_URL}`, serviceData);
    return response.data;
};

export const updateService = async (id: number, serviceData: Partial<Service>) => {
    const response = await axios.put<Service>(`${BASE_URL}/${id}`, serviceData);
    return response.data;
};

export const deleteService = async (id: number) => {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
};