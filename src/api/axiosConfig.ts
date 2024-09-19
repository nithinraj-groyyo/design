import axios, { AxiosResponse, AxiosError } from 'axios';
import { toast } from 'react-toastify';

const url = process.env.REACT_APP_API_URL;
// const url =  "http://localhost:3002";

const axiosInstance = axios.create({
    baseURL: url,
    headers: {
        'Content-Type': 'application/json',
        "ngrok-skip-browser-warning": "any" // to skip ngrok warning
    },
});

axiosInstance.interceptors.request.use(
    (config: any) => {
        const requirePath = ["/payment"].some((path) => config.url?.includes(path));

        if (requirePath) {
            const token = localStorage.getItem('authToken');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            } else {
                toast.warn('Access token is missing for an authenticated request.');
                window.location.href = "/login";
            }
        }
        return config;
    },
    (error: AxiosError) => {
        if (error.response && error.response.status === 401) {
            toast.warn('Unauthorized, redirecting to login.');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;