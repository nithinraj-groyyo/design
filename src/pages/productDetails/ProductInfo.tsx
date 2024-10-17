import { useEffect, useState } from 'react';
import FavoriteBorderOutlined from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { IProduct } from '../../types/products';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromLocalWishlist, setLocalWishlistItems, setWishListTriggered } from '../../redux/wishlistSlice';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { RootState } from '../../redux/store';
import { useAddToWishListMutation, useRemoveWishListMutation } from '../../rtk-query/wishlistApiSlice';

interface IProductInfoProps {
    product: IProduct;
}

const ProductInfo = ({ product}: IProductInfoProps) => {
    const [isInWishlist, setIsInWishlist] = useState(false);

    const {wishlistTriggered, items} = useSelector((state: RootState) => state.wishlist)

    const localWishList = JSON.parse(localStorage.getItem("localWishList") || '[]');

    useEffect(() => {
        if(product){
         if (!userId) {
           setIsInWishlist(localWishList.includes(product?.id));
         }else{
           const itemIds: number[] = items?.map((item) => item?.id)
           setIsInWishlist(itemIds?.includes(product?.id));
         }
        }
       }, [product, localWishList, wishlistTriggered, items]);

    const userId = JSON.parse(localStorage.getItem('userId') as string);
    const token = JSON.parse(localStorage.getItem("authToken") as string);

    const dispatch = useDispatch();

    const [addToWishlist] = useAddToWishListMutation();
    const [removeWishList] = useRemoveWishListMutation();


    const handleWishlistToggle = async () => {    
        const toggleWishlistState = (isInWishlist: boolean) => {
          setIsInWishlist(!isInWishlist);
          dispatch(setWishListTriggered(!wishlistTriggered));
        };
          
        if (!userId && product) {
          if (isInWishlist) {        
            dispatch(removeFromLocalWishlist({ productId: product?.id }));
          } else {        
            dispatch(setLocalWishlistItems({ productId: product?.id }));
          }      toggleWishlistState(isInWishlist);  
          return;
        }
          
        if (userId && product) {
          try {
            if (isInWishlist) {          
              await removeWishList({ productId: product?.id, token });
            } else {          
              await addToWishlist({ productId: product?.id, token });
            }        toggleWishlistState(isInWishlist);  
          } catch (error) {
            console.error('Error toggling wishlist:', error);        
          }
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