import React, { useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';
import { IProduct } from '../../types/products';
import { useParams } from 'react-router-dom';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

interface IProductSizeSelectorProps {
    product: IProduct;
    totalAmount: number;
    setTotalAmount: (val: number) => void;
}

const ProductSizeSelector = ({ product, setTotalAmount, totalAmount }: IProductSizeSelectorProps) => {
    const { productId } = useParams<{ productId: string }>();

    const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

    useEffect(() => {
        setQuantities({})
        // return () => {
        //     setQuantities({})
        // }
    }, [productId])

    const handleQuantityChange = (sizeId: number, increment: boolean) => {
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [sizeId]: Math.max(0, (prevQuantities[sizeId] || 0) + (increment ? 1 : -1)),
        }));
    };

    // Function to get the correct price per piece based on the total quantity
    const getPricePerPiece = (totalQuantity: number) => {
        if (!product?.productPrices) return 0;
        const priceRange = product.productPrices.find(
            (range) => totalQuantity >= range.minQty && totalQuantity <= (Boolean(range.maxQty) ? range?.maxQty : Number.MAX_SAFE_INTEGER)
        );
        return priceRange ? priceRange.pricePerPiece : 0;
    };

    // Function to calculate the price for a specific size based on its quantity and total quantity
    const calculatePriceForSize = (quantity: number, totalQuantity: number) => {
        const pricePerPiece = getPricePerPiece(totalQuantity);
        return quantity * pricePerPiece;
    };

    // Function to calculate the total price based on quantities of all sizes
    const calculateTotalPrice = () => {
        const totalQuantity = Object.values(quantities).reduce((sum, qty) => sum + qty, 0);
        const pricePerPiece = getPricePerPiece(totalQuantity);
        return totalQuantity * pricePerPiece;
    };

    // Calculate total quantity for applying the price range across all sizes
    const totalQuantity = Object.values(quantities).reduce((sum, qty) => sum + qty, 0);

    useEffect(() => {
        const newTotalAmount = calculateTotalPrice();
        setTotalAmount(newTotalAmount);
    }, [quantities, setTotalAmount]);

    if (!product || !product.sizes) {
        return <p>No product information available.</p>;
    }

    return (
        <div className="bg-gray-100 w-full p-4">
            <p className="text-[#8E8E8E] text-xs 2xl:text-sm mb-4">Select Size</p>
            <div className="flex flex-col 2xl:gap-4">
                {product?.sizes?.map((size) => {
                    const quantity = quantities[size.id] || 0;
                    const priceForSize = calculatePriceForSize(quantity, totalQuantity); 

                    return (
                        <div key={size?.id} className="flex items-center justify-between">
                            <p className="text-gray-800 text-xs 2xl:text-[1rem] flex-1">{size?.name}</p>
                            <div className="flex items-center gap-2">
                                <IconButton
                                    onClick={() => handleQuantityChange(size.id, true)}
                                >
                                    <AddIcon sx={{ fontSize: "1rem" }} />
                                </IconButton>
                                <input
                                    type="number"
                                    className="w-12 text-xs 2xl:text-[1rem] bg-transparent border-b border-[#646463] text-[#646464] text-center outline-none"
                                    value={quantity}
                                    onChange={(e) =>
                                        setQuantities((prevQuantities) => ({
                                            ...prevQuantities,
                                            [size.id]: Math.max(0, +e.target.value),
                                        }))
                                    }
                                    min="0"
                                    step="1"
                                />
                                <IconButton
                                    onClick={() => handleQuantityChange(size.id, false)}
                                >
                                    <RemoveIcon sx={{ fontSize: "1rem" }} />
                                </IconButton>
                            </div>
                            <p className="text-gray-800 text-xs 2xl:text-[1rem] text-center flex-1">
                                <CurrencyRupeeIcon sx={{ fontSize: 'inherit' }} /> {priceForSize}
                            </p>
                        </div>
                    );
                })}
            </div>

            <div className="mt-4">
                <div className="flex gap-2 items-center">
                    <span className='text-[#8E8E8E] font-bold text-xs 2xl:text-[1rem]'>Total Price :</span>
                    <span className=' font-bold text-xs 2xl:text-[1rem]'>
                        <CurrencyRupeeIcon sx={{ fontSize: 'inherit' }} />  {totalAmount}
                    </span>                     
                </div>
            </div>
        </div>
    );
};

export default ProductSizeSelector;
