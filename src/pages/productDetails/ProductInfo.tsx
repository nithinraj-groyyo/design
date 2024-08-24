
import FavoriteBorderOutlined from '@mui/icons-material/FavoriteBorderOutlined';

const ProductInfo = () => {
    return (
        <div className="flex items-start w-full">
            <div className='flex flex-col gap-2 flex-1'>
                <h1 className="text-sm text-black font-bold max-w-xs">Black Cutwork Embroidery Dress</h1>
                <p className="text-xs">₹1299</p>
                <p className="text-xs text-gray-500">MRP INC OF ALL TAXES</p>
            </div>
            <div className="flex justify-center items-center">
                <button className="p-2">
                    <FavoriteBorderOutlined />
                </button>
            </div>
        </div>
    );
};

export default ProductInfo;