import React, { useState } from 'react';
import { ShoppingBagIcon } from '../../assets/svg/home/ShoppingBagIcon';
import { FavoriteBorderOutlined } from '@mui/icons-material';
import MobileViewItemCard from './MobileViewItemCard';

interface Item {
    imageSrc: string;
    title: string;
    price: number;
    quantity: string;
}

type Tab = 'shoppingBag' | 'favourites';

const ShoppingBagMobileView: React.FC = () => {
    const [activeTab, setActiveTab] = useState<Tab>('shoppingBag');

    const handleTabClick = (tab: Tab) => {
        setActiveTab(tab);
    };

    const items: Item[] = [
        { imageSrc: "/images/products/pic1.png", title: 'Black Cutwork Embroidery Dress', price: 599, quantity: '1 ( XS )' },
        { imageSrc: "/images/products/pic2.png", title: 'Black Cutwork Embroidery Dress', price: 599, quantity: '1 ( XS )' },
    ];
    
    const favourites: Item[] = [
        { imageSrc: "/images/products/pic3.png", title: 'Black Cutwork Embroidery Dress', price: 599, quantity: '1 ( XS )' },
        { imageSrc: "/images/products/pic4.png", title: 'Black Cutwork Embroidery Dress', price: 599, quantity: '1 ( XS )' },
    ];

    return (
        <section className="xxs:flex lg:hidden w-full flex-col md:mt-[10rem]">
            <div className="flex">
                <div
                    onClick={() => handleTabClick('shoppingBag')}
                    className={`border border-[#000] flex-1 flex justify-center items-center gap-2 p-2 cursor-pointer ${activeTab === 'shoppingBag' ? 'bg-gray-200' : ''}`}
                >
                    <span className='w-[1rem] h-[1rem] mb-1'><ShoppingBagIcon /></span> <span>SHOPPING BAG (2)</span>
                </div>
                <div
                    onClick={() => handleTabClick('favourites')}
                    className={`border border-[#000] flex-1 flex justify-center items-center gap-2 p-2 cursor-pointer ${activeTab === 'favourites' ? 'bg-gray-200' : ''}`}
                >
                    <span><FavoriteBorderOutlined /></span>
                    <span>WISHLIST (1)</span>
                </div>
            </div>
            <div className="p-2 flex flex-col gap-2 mt-2">
                {(activeTab === 'shoppingBag' ? items : favourites).map((item, index) => (
                    <MobileViewItemCard
                        key={index}
                        imageSrc={item.imageSrc}
                        title={item.title}
                        price={item.price}
                        quantity={item.quantity}
                        onRemove={() => console.log('Remove item', index)}
                    />
                ))}
            </div>
        </section>
    );
}

export default ShoppingBagMobileView;