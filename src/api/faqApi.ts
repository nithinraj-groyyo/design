import axios from 'axios';
import { FAQ } from '../types/faq';
import { ResponseFormat } from '../types/responseFormat';
import { handleError } from '.';

const BASE_URL = process.env.REACT_APP_NEW_SERVICE_API + 'faq';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

export const fetchFaqs = async (): Promise<FAQ[]> => {
    try {
        const response = await axiosInstance.get<ResponseFormat<FAQ[]>>('/');
        return response.data.data;
    } catch (error) {
        handleError(error);
        return []; 
    }
};

export const createFaq = async (faq: Partial<FAQ>) => {
    try {
        const response = await axiosInstance.post<ResponseFormat<FAQ>>('/', faq);
        return response.data; 
    } catch (error) {
        handleError(error);
    }
};

export const updateFaq = async (id: number, faq: Partial<FAQ>)=> {
    try {
        const response = await axiosInstance.put<ResponseFormat<FAQ>>(`/${id}`, faq);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const deleteFaq = async (id: number): Promise<ResponseFormat<void>> => {
    try {
        await axiosInstance.delete(`/${id}`);
        return {
            statusCode: 200,
            message: 'FAQ deleted successfully',
            data: undefined,
        };
    } catch (error) {
        handleError(error);
        return { statusCode: 500, message: 'Failed to delete FAQ', data: undefined };
    }
};


export const bulkUploadFaqs = async (faqs: Partial<FAQ>[]): Promise<FAQ[]> => {
    try {
        const response = await axiosInstance.post<ResponseFormat<FAQ[]>>('/bulk', faqs);
        return response.data.data;
    } catch (error) {
        handleError(error);
        return []; 
    }
};
