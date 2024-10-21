import React, { useEffect, useState, useRef } from 'react';
import { IProduct } from '../../types/products';

interface IProductColorProps {
  product: IProduct;
  openDrawer: () => void;
}

const ProductColor = ({ product, openDrawer }: IProductColorProps) => {
  const [visibleColors, setVisibleColors] = useState<any[]>([]);
  const [remainingCount, setRemainingCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkOverflow = () => {
      if (!containerRef.current) return;

      const containerWidth = containerRef.current.offsetWidth;
      console.log(containerWidth)
      let totalWidth = 0;
      let visible = [];
      let remaining = 0;

      for (let i = 0; i < product?.productColors.length; i++) {
        const colorWidth = 50;
        totalWidth += colorWidth;

        if (totalWidth <= containerWidth) {
          visible.push(product.productColors[i]);
        } else {
          remaining = product.productColors.length - visible.length;
          break;
        }
      }

      setVisibleColors(visible);
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
      <p className="text-[#8E8E8E] text-xs 2xl:text-sm mb-4">Select Color</p>
      <div className="flex flex-wrap gap-3" ref={containerRef}>
        {visibleColors?.map((color: any) => (
          <div
            className="rounded-lg w-8 h-8 cursor-pointer"
            key={color?.id}
            style={{ backgroundColor: color?.name }}
            onClick={openDrawer}
          ></div>
        ))}

        {remainingCount > 0 && (
          <div className="rounded-lg w-8 h-8 flex items-center justify-center bg-gray-400 text-white">
            +{remainingCount}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductColor;