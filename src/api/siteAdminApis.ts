import axiosInstance from "./axiosConfig";

const token = localStorage.getItem("authToken")
const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
};

export const getAllAdminProductsResponse = async ({
    page,
    pageSize,
    sort,
    season,
    status,
}: {
    page: number;
    pageSize: number;
    status: string;
    sort?: string;
    season?: string;
}) => {
    try {
        const params = new URLSearchParams();
        if (sort) params.append('sort', sort);
        if (season) params.append('season', season);

      
        const url = `/siteAdmin/fetchProducts/${page}/${pageSize}/${status}?${params.toString()}`;

        const response = await axiosInstance.get(url, { headers });
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};