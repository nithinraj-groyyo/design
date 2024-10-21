import React, { useEffect, useRef, useState } from 'react'
import { IProduct } from '../../types/products';

interface IProductSizeProps {
    product: IProduct;
    openDrawer: () => void;
}


const ProductSize = ({ product, openDrawer }: IProductSizeProps) => {
    const [visibleSizes, setVisibleSizes] = useState<any[]>([]);
    const [remainingCount, setRemainingCount] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const checkOverflow = () => {
            if (!containerRef.current) return;

            const containerWidth = containerRef.current.offsetWidth;

            let totalWidth = 0;
            let visible = [];
            let remaining = 0;

            for (let i = 0; i < product?.sizes.length; i++) {
                const sizeBoxWidth = 60;
                totalWidth += sizeBoxWidth;

                if (totalWidth <= containerWidth) {
                    visible.push(product?.sizes[i]);
                } else {
                    remaining = product?.sizes.length - visible.length;
                    break;
                }
            }

            setVisibleSizes(visible);
            setRemainingCount(remaining);
        };

        checkOverflow();

        window.addEventListener('resize', checkOverflow);
        return () => {
            window.removeEventListener('resize', checkOverflow);
        };
    }, [product]);

    return (
        <div className="bg-gray-100 w-full p-4">
            <p className="text-[#8E8E8E] text-xs 2xl:text-sm mb-4">Select Size</p>
            <div className="flex flex-wrap gap-3" ref={containerRef}>
                {visibleSizes?.map((size: any) => (
                    <div
                        className="rounded-lg w-8 h-8 border flex justify-center items-center border-1 cursor-pointer"
                        key={size?.id}
                        onClick={openDrawer}
                    >
                        {size?.name}
                    </div>
                ))}

                {remainingCount > 0 && (
                    <div className="rounded-lg w-8 h-8 flex items-center justify-center bg-gray-400 text-white">
                        +{remainingCount}
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProductSize