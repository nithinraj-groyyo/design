import { AxiosResponse } from "axios";
import axiosInstance from "./axiosConfig";

const token = localStorage.getItem("authToken")
const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
};


export const processPayment = async (payload: any): Promise<any> => {
    try {
        const response: AxiosResponse<any> = await axiosInstance.post('/payment/processPayment/', payload, {headers});
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};

export const processOrder = async (payload: any): Promise<any> => {
    try {
        const response: AxiosResponse<any> = await axiosInstance.post('/product/processOrder/', payload, {headers});
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};