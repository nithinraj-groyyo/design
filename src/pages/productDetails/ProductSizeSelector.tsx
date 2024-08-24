import { IconButton } from '@mui/material';
import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';

const ProductSizeSelector = () => {
    

    return (
        <div className="bg-gray-100 w-full p-4">
            <p className="text-[#8E8E8E] text-sm mb-4">Select Size</p>
            <div className="flex flex-col gap-4">
                {['XS', 'SM', 'M'].map((size, index) => {
                    return (
                        <div key={index} className="flex items-center justify-between">
                            <p className="text-gray-800 flex-1">{size}</p>
                            <div className="flex items-center gap-2">
                                <IconButton>
                                    <AddIcon sx={{ fontSize: "1rem" }} />
                                </IconButton>
                                <input
                                    className="w-12 bg-transparent border-b border-[#646463] text-[#646464] text-center outline-none"
                                    placeholder="0"
                                />
                                <IconButton>
                                    <RemoveIcon sx={{ fontSize: "1rem" }} />
                                </IconButton>
                            </div>
                            <p className="text-gray-800 text-center flex-1">₹ 0.00</p>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default ProductSizeSelector;