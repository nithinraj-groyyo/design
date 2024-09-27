import { toast } from 'react-toastify';


export class ApiError extends Error {
    constructor(public message: string, public statusCode: number) {
        super(message);
        this.name = "ApiError";
    }
}


export const handleError = (error: any): void => {
    const message = error.response?.data?.message || 'An unexpected error occurred';
    const statusCode = error.response?.status || 500;

    toast.error(message);
    throw new ApiError(message, statusCode);
};
