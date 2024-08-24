import React from 'react';

interface MobileViewItemCardProps {
    imageSrc: string;
    title: string;
    price: number;
    quantity: string;
    onRemove: () => void;
}

const MobileViewItemCard: React.FC<MobileViewItemCardProps> = ({ imageSrc, title, price, quantity, onRemove }) => {
    return (
        <div className="flex items-start md:w-full gap-3">
            <div className="xxs:w-[7rem] md:w-[12rem] xxs:h-[10rem] md:h-[16rem] overflow-hidden">
                <img src={imageSrc} className="object-fill w-full h-full" alt="item" />
            </div>
            <div className="flex flex-col xxs:h-[10rem] md:h-[16rem] justify-between md:w-full">
                <div>
                    <p className="text-[#000000] text-xs md:text-lg font-semibold uppercase whitespace-wrap">{title}</p>
                    <p className="text-[#000000] text-xs md:text-lg font-medium "><span>&#8377; </span>{price}</p>
                    <p className="text-[#646463] text-xs md:text-lg font-normal">Quantity: {quantity}</p>
                </div>
                <div>
                    <button
                        onClick={onRemove}
                        className="w-full bg-black text-white p-2"
                    >
                        Remove
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MobileViewItemCard;