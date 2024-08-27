import { AxiosResponse } from "axios";
import axiosInstance from "./axiosConfig";

export const getProductsResponse = async ({url}:{url: string}): Promise<any> => {
    try {
        const response: AxiosResponse<any> = await axiosInstance.get(`/product/fetchProducts/${url}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

export const getProductByIdResponse = async ({productId}:{productId: number}): Promise<any> => {
    try {
        const response: AxiosResponse<any> = await axiosInstance.get(`/product/getProductById/${productId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};