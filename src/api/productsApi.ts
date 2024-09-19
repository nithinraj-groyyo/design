import { AxiosResponse } from "axios";
import axiosInstance from "./axiosConfig";
import { IAddToCartRequest } from "../types/cart";

const token = localStorage.getItem("authToken")
const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
};
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


export const createCartDataResponse = async (requestBody: IAddToCartRequest) => {
    try {
        const response: AxiosResponse<any> = await axiosInstance.post(
            `/product/addToCart`,
            requestBody,
            { headers }
        );
        return response.data;
    } catch (error) {
        console.error('Error creating cart data:', error);
        throw error;
    }
}



export const getCartBadgeResponse = async (userId: string) => {
    try {
        const response = await axiosInstance.get(`/product/getCartBadge?userid=${userId}`, { headers });
        return response.data;
    } catch (error) {
        console.error('Error fetching cart badge:', error);
        throw error;
    }
};

export const saveForLaterResponse = async ({productId, status, userId}:{
    userId: string;
    productId: number,
    status: "Saved" | "Cart"
}) => {
    try {
        const response = await axiosInstance.post(`/product/saveForLater`, {productId, status, userId}, { headers });
        return response.data;
    } catch (error) {
        console.error('Error fetching cart badge:', error);
        throw error;
    }
};


export const updateCartQuantityResponse = async (post: any) => {
    try {
        const response = await axiosInstance.post('/product/updateCartQty', post, { headers });
        return response.data;
    } catch (error) {
        console.error('Error updating cart quantity:', error);
        throw error;
    }
};


export const removeProductFromCartResponse = async ({ productId, userId}: { 
    userId: string;
    productId: number;
}) => {
    try {
        const response = await axiosInstance.post('/product/removeFromCart', { productId, userId}, { headers });
        return response.data;
    } catch (error) {
        console.error('Error removing product from cart:', error);
        throw error;
    }
};

export const updateProductStatusResponse = async ({ id, status}: { 
    id: number;
    status: boolean;
}) => {
    try {
        const response = await axiosInstance.post('/product/updateProductStatus', { id, status}, { headers });
        return response.data;
    } catch (error) {
        console.error('Error updating product status:', error);
        throw error;
    }
};

export const bulkProductUploadResponse = async (data: any) => {
    try {
        const response = await axiosInstance.post('/product/bulkProductUpload', data, { headers });
        return response.data;
    } catch (error) {
        console.error('Error in Bulk upload of products:', error);
        throw error;
    }
};

export const addUpdateProductResponse = async (data: any, type: "create" | "edit") => {
    try {
        const response = await axiosInstance.post('/product/addUpdateProduct', data, { headers });
        return response.data;
    } catch (error) {
        console.error(`Error in ${type === "create" ? "Creating" : "Updating" } of products: `, error);
        throw error;
    }
};


// Not Used
export const processOrderResponse = async (post: any) => {
    try {
        const response = await axiosInstance.post('/product/processOrder', post, { headers });
        return response.data;
    } catch (error) {
        console.error('Error processing order:', error);
        throw error;
    }
};

// Not Used
export const getOrdersResponse = async () => {
    try {
        const response = await axiosInstance.get('/product/getOrders');
        return response.data;
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
};





