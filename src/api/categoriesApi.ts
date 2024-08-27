import { AxiosResponse } from "axios";
import axiosInstance from "./axiosConfig";

export const getCategoriesResponse = async (): Promise<any> => {
    try {
        const response: AxiosResponse<any> = await axiosInstance.get('/product/getCategories/');
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};


export const getSubCategoriesResponse = async ({ categoryId }:{categoryId: number}): Promise<any> => {
    try {
        const response: AxiosResponse<any> = await axiosInstance.get(`/product/getSubCategories/${categoryId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};

export const submitContactForm = async (formData: any) => {
    try {
        const response = await axiosInstance.post('/users/submitUserQuery', formData);
        return response?.data;
    } catch (error) {
        console.error('Error submitting Contact Form:', error);
        throw error;
    }
}