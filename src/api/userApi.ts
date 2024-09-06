import { IAddressRequest, IUserDetailsRequest } from "../types/users";
import axiosInstance from "./axiosConfig";

const token = localStorage.getItem("authToken")
const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
};

export const createUser = async ({ email, password }: { email: string; password: string }) => {
    try {
        const response = await axiosInstance.post("/users/signup", { email, password });
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

export const loginUser = async ({ email, password }: { email: string; password: string }) => {
    try {
        const response = await axiosInstance.post("/users/login", { email, password });
        return response.data;
    } catch (error) {
        console.error('Error logging in user:', error);
        throw error;
    }
};

export const updateWishlistResponse = async ({ add, productId, userId }: {
    userId: string;
    productId: number;
    add: boolean;
}) => {
    try {
        const response = await axiosInstance.post('/users/updateWishlist', { add, productId, userId }, { headers });
        return response.data;
    } catch (error) {
        console.error('Error updating wishlist:', error);
        throw error;
    }
};

export const fetchWishlistResponse = async () => {
    try {
        const response = await axiosInstance.get('/users/fetchWishlist', { headers });
        return response.data;
    } catch (error) {
        console.error('Error fetching wishlist:', error);
        throw error;
    }
};

export const fetchUserProfileResponse = async ({ userId }: { userId: string }) => {
    try {
        const response = await axiosInstance.post('/users/getProfileData', { userId }, { headers });
        return response.data;
    } catch (error) {
        console.error('Error fetching user profile:', error);
        throw error;
    }
};

export const updateUserProfileResponse = async ({ data }: { data: IUserDetailsRequest }) => {
    try {
        const response = await axiosInstance.post('/users/updateUser', { data }, { headers });
        return response.data;
    } catch (error) {
        console.error('Error updating user profile:', error);
        throw error;
    }
};

export const addUpdateAddressResponse = async ({ data }: { data: IAddressRequest }) => {
    try {
        const response = await axiosInstance.post('/users/addUpdateAddress', { data }, { headers });
        return response.data;
    } catch (error) {
        console.error('Error adding or updating address:', error);
        throw error;
    }
};

export const getProfileAddressResponse = async ({ userId }: { userId: string }) => {
    try {
        const response = await axiosInstance.post('/users/getAddressByUserId', { userId }, { headers });
        return response.data;
    } catch (error) {
        console.error('Error fetching profile address:', error);
        throw error;
    }
};

export const setDefaultAddressResponse = async ({ addressId }: { addressId: number }) => {
    try {
        const response = await axiosInstance.post('/users/setDefaultAddress', { addressId }, { headers });
        return response.data;
    } catch (error) {
        console.error('Error setting default address:', error);
        throw error;
    }
};

export const removeAddressResponse = async ({ addressId }: { addressId: number }) => {
    try {
        const response = await axiosInstance.post('/users/deleteAddress', { addressId }, { headers });
        return response.data;
    } catch (error) {
        console.error('Error removing address:', error);
        throw error;
    }
};

export const fetchUserOrdersResponse = async ({ userId }: { userId: number }) => {
    try {
        const response = await axiosInstance.get(`/users/fetchUserOrders/${userId}/Admin/all`, { headers });
        return response.data;
    } catch (error) {
        console.error('Error removing address:', error);
        throw error;
    }
};