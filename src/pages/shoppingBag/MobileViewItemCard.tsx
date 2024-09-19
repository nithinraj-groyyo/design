import React, { useEffect, useState } from 'react';
import { useSaveForLater } from '../../hooks/useSaveForLater';
import ConfirmationModal from './ConfirmationModal';
import { useDispatch } from 'react-redux';
import { getCartBadgeResponse  } from '../../api/productsApi';
import { updateWishlistResponse  } from '../../api/userApi';
import { setCartData, updateWishList } from '../../redux/shoppingBagSlice';
import { IconButton } from '@mui/material';
import { FavoriteBorderOutlined } from '@mui/icons-material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { setLocalWishlistItems } from '../../redux/wishlistSlice';

interface MobileViewItemCardProps {
    imageSrc: string;
    title: string;
    price: number;
    quantity: string;
    isSavedItem: boolean;    
    productId: number;
    isAlreadyInWishlist: boolean;
    product: any
}

const MobileViewItemCard: React.FC<MobileViewItemCardProps> = ({
    imageSrc,
    title,
    price,
    quantity,
    isSavedItem,
    productId,
    isAlreadyInWishlist,
    product
}) => {
    const userId = JSON.parse(localStorage.getItem("userId") as string);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isInWishlist, setIsInWishlist] = useState<boolean>(isAlreadyInWishlist);

    const { saveForLaterHandler } = useSaveForLater();

    const dispatch = useDispatch();

    useEffect(() => {
        setIsInWishlist(isAlreadyInWishlist);
    }, [isAlreadyInWishlist]);

    const handleSaveForLaterClick = () => {
        saveForLaterHandler({ productId, isSavedItem, userId });
    };

    const confirmRemoval = () => {
        const fetchUserOrders = async () => {
            try {
                const response = await getCartBadgeResponse(userId);
                if (response) {
                    dispatch(setCartData(response));
                }
            } catch (error: any) {
                console.error(error?.message);
            }
        };
        fetchUserOrders();
    };

    const handleWishlistToggle = async () => {
        if(!userId){
            dispatch(setLocalWishlistItems({product}))
            return 
        }
        try {
            const add = !isInWishlist;
            const response = await updateWishlistResponse({ add, productId, userId });
            if (response) {
                setIsInWishlist(add);
                dispatch(updateWishList({isInCart: !isSavedItem, productId, isInWishlist}))
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

    return (
        <div className="flex items-start w-full gap-3">
            <div className="w-[7rem] h-[10rem] md:w-[12rem] md:h-[16rem] overflow-hidden">
                <img src={imageSrc} className="object-cover w-full h-full" alt="item" />
            </div>
            <div className="flex flex-col justify-between h-[10rem] md:h-[16rem] w-full">
                <div className='flex justify-between items-start'>
                    <div>
                        <p className="text-black text-xs md:text-lg font-semibold uppercase">{title}</p>
                        <p className="text-black text-xs md:text-lg font-medium">
                            <span>&#8377; </span>{price}
                        </p>
                        <p className="text-gray-600 text-xs md:text-lg">Quantity: {quantity}</p>
                    </div>
                    <IconButton onClick={handleWishlistToggle}>
                        {isInWishlist ? (
                            <FavoriteIcon style={{ color: 'red' }} />
                        ) : (
                            <FavoriteBorderOutlined />
                        )}
                    </IconButton>
                </div>
                <div className='flex gap-2'>
                    <button
                        onClick={openModal}
                        className="p-2 bg-black text-white uppercase flex-1"
                    >
                        Remove
                    </button>
                    {!isSavedItem && <button className="p-2 bg-black text-white uppercase flex-1" onClick={handleSaveForLaterClick}>Buy later</button>}
                    {isSavedItem && <button className="p-2 bg-black text-white uppercase flex-1" onClick={handleSaveForLaterClick}>Add to Bag</button>}
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

export default MobileViewItemCard;