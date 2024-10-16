import { useEffect, useState } from 'react';
import FavoriteBorderOutlined from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { updateWishlistResponse } from '../../api/userApi';
import { IProduct, IProductResponse } from '../../types/products';
import { useDispatch } from 'react-redux';
import { updateProductWishlist, updateSingleProductWishlist } from '../../redux/productsSlice';
import { setLocalWishlistItems } from '../../redux/wishlistSlice';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

interface IProductInfoProps {
    product: IProduct;
}

const ProductInfo = ({ product }: IProductInfoProps) => {
    const [isInWishlist, setIsInWishlist] = useState(false);

    // useEffect(() => {
    //     setIsInWishlist(product?.WishLists?.length > 0 ? +product?.WishLists[0]?.productId === +product?.id : false)
    // },[isInWishlist, product])

    const userId = JSON.parse(localStorage.getItem('userId') as string);

    const dispatch = useDispatch();

    const handleWishlistToggle = async () => {
        if(!userId && product){
            dispatch(setLocalWishlistItems({product} as any))
            return 
        }
        try {
            const add = !isInWishlist;
            const response = await updateWishlistResponse({ add, productId: product.id, userId });
            if (response) {
                setIsInWishlist(add);
                dispatch(updateSingleProductWishlist({isInWishlist: add,  productId: product?.id}))
                dispatch(updateProductWishlist({isInWishlist:!isInWishlist, productId: product?.id}));
            }
        } catch (error: any) {
            console.error('Error updating wishlist:', error.message);
        }
    };

    return (
        <div className="flex items-start w-full">
            <div className="flex flex-col gap-2 flex-1">
                <h1 className="text-sm 2xl:text-[1rem] text-black font-bold max-w-xs">{product?.name}</h1>
                <div className="text-xs 2xl:text-sm">
                    <CurrencyRupeeIcon sx={{ fontSize: 'inherit' }} />
                    <span>{product?.productPrices[0]?.pricePerPiece}</span>
                </div>
                <p className="text-xs 2xl:text-sm text-gray-500">MRP INC OF ALL TAXES</p>
            </div>
            <div className="flex justify-center items-center">
                <button className="p-2" onClick={handleWishlistToggle}>
                    {isInWishlist ? (
                        <FavoriteIcon sx={{ color: 'red' }} />
                    ) : (
                        <FavoriteBorderOutlined />
                    )}
                </button>
            </div>
        </div>
    );
};

export default ProductInfo;