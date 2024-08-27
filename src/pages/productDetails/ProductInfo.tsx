
import FavoriteBorderOutlined from '@mui/icons-material/FavoriteBorderOutlined';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const ProductInfo = () => {
    const { product } = useSelector((state: RootState) => state.products.singleProductData);

    return (
        <div className="flex items-start w-full">
            <div className='flex flex-col gap-2 flex-1'>
                <h1 className="text-sm text-black font-bold max-w-xs">{product?.name}</h1>
                <div className="text-xs">
                    <span>&#8377;</span>
                    <span>{product?.price}</span>
                </div>
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