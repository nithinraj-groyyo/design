import React, { useState } from 'react';
import FavoriteBorderOutlined from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { IShoppingCartSize, setCartData } from '../../redux/shoppingBagSlice';
import { removeProductFromCartResponse, saveForLaterResponse, updateWishlistResponse } from '../../api/productsApi';
import { useDispatch } from 'react-redux';
import useFetchUserOrders from '../../hooks/useFetchUsersOrders';
import ConfirmationModal from './ConfirmationModal';
import { toast } from 'react-toastify';

interface ShoppingBagItemProps {
    imageSrc: string;
    productName: string;
    productId: number;
    price: number;
    sizes: IShoppingCartSize[];
    isSavedItem: boolean;
    isAlreadyInWishlist: boolean;
}

const ShoppingBagItem: React.FC<ShoppingBagItemProps> = ({ imageSrc, productId, productName, price, sizes, isSavedItem, isAlreadyInWishlist }) => {
    const userId = JSON.parse(localStorage.getItem("userId") as string);
    const dispatch = useDispatch();

    const [isInWishlist, setIsInWishlist] = useState(isAlreadyInWishlist);
    const [refreshOrders, setRefreshOrders] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const saveForLaterHandler = async () => {
        try {
            const status = isSavedItem ? "Cart" : "Saved";
            const response = await saveForLaterResponse({ productId, status, userId });
            if (response) {
                dispatch(setCartData(response));
            }
        } catch (error: any) {
            console.error(error?.message);
        }
    };

    useFetchUserOrders(userId, refreshOrders);

    const handleWishlistToggle = async () => {
        try {
            const add = !isInWishlist;
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
                    <span className="text-[#646463] text-sm font-light uppercase" onClick={saveForLaterHandler}>
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