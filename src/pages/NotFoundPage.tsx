import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const NotFoundPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { message } = location.state || { message: "The page you're looking for doesn't exist." };

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-9xl font-bold text-black">404</h1>
                <p className="mt-4 text-2xl font-semibold text-gray-800">
                    Oops! Page not found.
                </p>
                <p className="mt-2 text-gray-600">
                    {message}
                </p>
                <button
                    onClick={handleGoHome}
                    className="mt-6 px-6 py-3 !bg-black text-white text-sm font-medium rounded-md hover:bg-blue-500 transition duration-300"
                >
                    Go Back Home
                </button>
            </div>
        </div>
    );
};

export default NotFoundPage;