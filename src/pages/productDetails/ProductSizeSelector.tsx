import { IconButton } from '@mui/material';
import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const ProductSizeSelector = () => {
    const { product } = useSelector((state: RootState) => state.products.singleProductData);

    if (!product?.productSizes || product.productSizes.length === 0) {
        return <div className="bg-gray-100 w-full p-4">No sizes available.</div>;
    }

    return (
        <div className="bg-gray-100 w-full p-4">
            <p className="text-[#8E8E8E] text-sm mb-4">Select Size</p>
            <div className="flex flex-col gap-4">
                {product.productSizes.map((size) => (
                    <div key={size.id} className="flex items-center justify-between">
                        <p className="text-gray-800 flex-1">{size.sizeName}</p>
                        <div className="flex items-center gap-2">
                            <IconButton>
                                <AddIcon sx={{ fontSize: "1rem" }} />
                            </IconButton>
                            <input
                                type="number"
                                className="w-12 bg-transparent border-b border-[#646463] text-[#646464] text-center outline-none"
                                placeholder="0"
                                min="0"
                                step="1"
                            />
                            <IconButton>
                                <RemoveIcon sx={{ fontSize: "1rem" }} />
                            </IconButton>
                        </div>
                        <p className="text-gray-800 text-center flex-1">₹ 0.00</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductSizeSelector;