import React from 'react';
import { IconButton } from '@mui/material';
import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { addItem, updateQuantity } from '../../redux/productSizeSlice';

const ProductSizeSelector = () => {
    const { product } = useSelector((state: RootState) => state.products.singleProductData);
    const { items } = useSelector((state: RootState) => state.productSize);
    const dispatch = useDispatch();

    const handleQuantityChange = (sizeId: number, sizeName: string, price: number, quantity: number) => {
        const existingItem = items.find(item => item.sizeId === sizeId);
        if (existingItem) {
            dispatch(updateQuantity({ sizeId, quantity }));
        } else {
            dispatch(addItem({ sizeId, sizeName, quantity, price }));
        }
    };

    return (
        <div className="bg-gray-100 w-full p-4">
            <p className="text-[#8E8E8E] text-sm mb-4">Select Size</p>
            <div className="flex flex-col gap-4">
                {product?.productSizes?.map((size) => {
                    const existingItem = items.find(item => item.sizeId === size.id);
                    return (
                        <div key={size.id} className="flex items-center justify-between">
                            <p className="text-gray-800 flex-1">{size.sizeName}</p>
                            <div className="flex items-center gap-2">
                                <IconButton
                                    onClick={() => handleQuantityChange(size.id, size.sizeName, Number(product?.price), (existingItem?.quantity || 0) + 1)}
                                >
                                    <AddIcon sx={{ fontSize: "1rem" }} />
                                </IconButton>
                                <input
                                    type="number"
                                    className="w-12 bg-transparent border-b border-[#646463] text-[#646464] text-center outline-none"
                                    value={existingItem?.quantity || 0}
                                    onChange={(e) => handleQuantityChange(size.id, size.sizeName, Number(product?.price), parseInt(e.target.value, 10))}
                                    min="0"
                                    step="1"
                                />
                                <IconButton
                                    onClick={() => handleQuantityChange(size.id, size.sizeName, Number(product?.price), Math.max((existingItem?.quantity || 0) - 1, 0))}
                                >
                                    <RemoveIcon sx={{ fontSize: "1rem" }} />
                                </IconButton>
                            </div>
                            <p className="text-gray-800 text-center flex-1">₹ {Number(product?.price) * (existingItem?.quantity || 0)}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ProductSizeSelector;