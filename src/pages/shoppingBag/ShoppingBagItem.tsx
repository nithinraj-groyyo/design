import React, { useState } from 'react';
import FavoriteBorderOutlined from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { IShoppingCartSize } from '../../redux/shoppingBagSlice';
import { removeProductFromCartResponse } from '../../api/productsApi';
import { updateWishlistResponse } from '../../api/userApi';
import useFetchUserOrders from '../../hooks/useFetchUsersOrders';
import ConfirmationModal from './ConfirmationModal';
import { toast } from 'react-toastify';
import { useSaveForLater } from '../../hooks/useSaveForLater';
import { useDispatch } from 'react-redux';
import { setLocalWishlistItems } from '../../redux/wishlistSlice';
interface ShoppingBagItemProps {
    imageSrc: string;
    productName: string;
    productId: number;
    price: number;
    sizes: IShoppingCartSize[];
    isSavedItem: boolean;
    isAlreadyInWishlist: boolean;
    product: any
}

const ShoppingBagItem: React.FC<ShoppingBagItemProps> = ({ imageSrc, productId, productName, price, sizes, isSavedItem, isAlreadyInWishlist, product }) => {
    const userId = JSON.parse(localStorage.getItem("userId") as string);
    const dispatch = useDispatch();
    
    const [isInWishlist, setIsInWishlist] = useState(isAlreadyInWishlist);
    const [refreshOrders, setRefreshOrders] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { saveForLaterHandler } = useSaveForLater();

    const handleSaveForLaterClick = () => {
        saveForLaterHandler({ productId, isSavedItem, userId });
    };

    useFetchUserOrders(userId, refreshOrders);

    const handleWishlistToggle = async () => {
        const add = !isInWishlist;

        if(!userId){
            dispatch(setLocalWishlistItems({product}))
            return 
        }
        try {
            const response = await updateWishlistResponse({ add, productId, userId });
            if (response) {
                setIsInWishlist(add);
                setRefreshOrders(prev => !prev);
            }
        } catch (error: any) {
            console.error('Error updating wishlist:', error?.message);
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const confirmRemoval = async() => {
        try {
            const response = await removeProductFromCartResponse({productId, userId});
            if(response) {
                setRefreshOrders(prev => !prev);
                toast.success("Product removed from Bag Successfully")
            }
        } catch (error: any) {
            console.log(error?.message)
        }
        setIsModalOpen(false);
    };

    return (
        <div className="border-b-1 border-[#E6E6E6]">
            <div className="flex items-start gap-4">
                <img src={imageSrc} className="w-[6.25rem] h-[10rem]" alt={productName} />
                <div>
                    <p className="text-[#000000] text-sm font-light uppercase">{productName}</p>
                    <p className="text-[#000000] text-sm font-light"><span>&#8377; </span>{price}</p>
                    <div className="text-[#646463] text-sm font-normal flex gap-2">
                        <span>Quantity:</span>
                        {sizes?.map((size, index) => {
                            const isLastItem = index === sizes.length - 1;
                            return (
                                <span key={size?.cartId} className='flex'>
                                    <p>{size?.size}</p>
                                    <p>({size?.quantity})</p>
                                    {!isLastItem && <p>&#44;</p>}
                                </span>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div className="flex gap-4 mt-1">
                <div className="flex items-center gap-2 cursor-pointer" >
                    <span onClick={handleWishlistToggle}>
                        {(isInWishlist || isAlreadyInWishlist) ? (
                            <FavoriteIcon style={{ color: 'red' }} />
                        ) : (
                            <FavoriteBorderOutlined />
                        )}
                    </span>
                    <span className="text-[#646463] text-sm font-light uppercase" onClick={handleSaveForLaterClick}>
                        {isSavedItem ? 'Add to Bag' : 'Buy Later'}
                    </span>
                </div>
                <div className="cursor-pointer" onClick={openModal}>
                    <span className="text-[#646463] text-sm font-light uppercase">Remove</span>
                </div>
            </div>
            <ConfirmationModal
                isOpen={isModalOpen} 
                onClose={closeModal} 
                onConfirm={confirmRemoval} 
            />
        </div>
    );
};

export default ShoppingBagItem;