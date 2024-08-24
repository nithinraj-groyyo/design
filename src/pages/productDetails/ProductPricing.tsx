import React from 'react';

const ProductPricing = () => {
    return (
        <div className="bg-gray-100 w-full p-4">
            <div className="grid grid-cols-2 gap-4 text-xs text-gray-800 mb-2">
                <p className="font-medium text-center">Quantity</p>
                <p className="font-medium text-center">Price</p>
            </div>

            <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4 border-b border-gray-300 py-2">
                    <p className="text-gray-800 text-center">1 - 10 <span className="ml-2">pcs</span></p>
                    <p className="text-gray-800 text-center">₹599.00 <span className="ml-2">/ pc</span></p>
                </div>
                <div className="grid grid-cols-2 gap-4 border-b border-gray-300 py-2">
                    <p className="text-gray-800 text-center">11 - 30 <span className="ml-2">pcs</span></p>
                    <p className="text-gray-800 text-center">₹569.00 <span className="ml-2">/ pc</span></p>
                </div>
                <div className="grid grid-cols-2 gap-4 border-b border-gray-300 py-2">
                    <p className="text-gray-800 text-center">31 - 50 <span className="ml-2">pcs</span></p>
                    <p className="text-gray-800 text-center">₹539.00 <span className="ml-2">/ pc</span></p>
                </div>
                <div className="grid grid-cols-2 gap-4 py-2">
                    <p className="text-gray-800 text-center">51 - 100 <span className="ml-2">pcs</span></p>
                    <p className="text-gray-800 text-center">₹509.00 <span className="ml-2">/ pc</span></p>
                </div>
            </div>
        </div>
    );
};

export default ProductPricing;