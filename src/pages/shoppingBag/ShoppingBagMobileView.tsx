import React, { useState } from 'react';
import { ShoppingBagIcon } from '../../assets/svg/home/ShoppingBagIcon';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import MobileViewItemCard from './MobileViewItemCard';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { getImagesFromUrl } from '../../utilities/helper';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

type Tab = 'shoppingBag' | 'favourites';

const ShoppingBagMobileView: React.FC = () => {
    const [activeTab, setActiveTab] = useState<Tab>('shoppingBag');

    const navigate = useNavigate();

    const handleTabClick = (tab: Tab) => {
        setActiveTab(tab);
    };

    const { cart } = useSelector((state: RootState) => state.shoppingBag);

    const formatSizes = (sizes: any[]) => {
        return sizes.map(size => `${size.quantity} (${size.size})`).join(', ');
    };


    const shoppingBagItems = cart.data.map(item => ({
        imageSrc: getImagesFromUrl(item.product.CoverImageLink ?? ""),
        title: item?.product?.name,
        price: parseFloat(item?.product?.price),
        quantity: formatSizes(item?.sizes),
        isSavedItem: false,
        productId: item?.product?.id,
        isAlreadyInWishlist: item.product.WishLists?.length > 0 && item.product.WishLists[0]?.productId === item.product.id,
    }));

    const savedItems = cart.savedItems.map(item => ({
        imageSrc: getImagesFromUrl(item.product.CoverImageLink ?? ""),
        title: item?.product?.name,
        price: parseFloat(item?.product?.price),
        quantity: formatSizes(item?.sizes),
        isSavedItem: true,
        productId: item?.product?.id,
        isAlreadyInWishlist: item.product.WishLists?.length > 0 && item.product.WishLists[0]?.productId === item.product.id,
    }));

    const activeItems = activeTab === 'shoppingBag' ? shoppingBagItems : savedItems;

    return (
        <section className="xxs:flex lg:hidden w-full flex-col">
            <div className="flex items-center">
                <IconButton onClick={() => {
                    navigate("/")
                }}>
                    <ArrowBackIcon />
                </IconButton>
                <div
                    onClick={() => handleTabClick('shoppingBag')}
                    className={` flex-1 flex justify-center items-center gap-2 p-2 cursor-pointer ${activeTab === 'shoppingBag' ? 'bg-gray-200' : ''}`}
                >
                    <span className='w-[1rem] h-[1rem] mb-1'><ShoppingBagIcon /></span>
                    <span>SHOPPING BAG ({shoppingBagItems.length})</span>
                </div>
                <div
                    onClick={() => handleTabClick('favourites')}
                    className={` flex-1 flex justify-center items-center gap-2 p-2 cursor-pointer ${activeTab === 'favourites' ? 'bg-gray-200' : ''}`}
                >
                    <span><TurnedInNotIcon /></span>
                    <span>SAVED ITEMS ({savedItems.length})</span>
                </div>
            </div>
            <div className="p-2 flex flex-col gap-2 mt-2">
                {activeItems.length > 0 ? (
                    activeItems.map((item, index) => (
                        <MobileViewItemCard
                            key={index}
                            imageSrc={item?.imageSrc}
                            title={item?.title}
                            price={item?.price}
                            quantity={item?.quantity}
                            isSavedItem={item?.isSavedItem}
                            productId={item?.productId}
                            isAlreadyInWishlist={item?.isAlreadyInWishlist}
                            product={item}
                        />
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center min-h-[20vh] text-center">
                        <div className="text-[5rem] text-gray-400"><ShoppingBagIcon /></div>
                        <p className="text-2xl font-semibold text-gray-600 mt-4">Your {activeTab === 'shoppingBag' ? 'Shopping Bag' : 'Saved Items'} is Empty</p>
                        <p className="text-lg text-gray-500 mt-2">Add items to see them here</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ShoppingBagMobileView;