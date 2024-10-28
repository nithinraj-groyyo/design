import React from 'react';
import { IProduct } from '../../types/products';

interface IProductLargeViewProps {
  products: IProduct[];
}

const ProductLargeView = ({ products }: IProductLargeViewProps) => {
  return (
    <>
      <div className="xxs:hidden lg:flex flex-col w-full mt-[5rem] lg:mt-[12rem]">
        <div className="flex flex-row">
          <div className="flex-1 h-[88.188rem]">
            <img className="h-full w-full" src={"/images/products/pic1.png"} alt="Image 1" />
          </div>
          <div className="flex flex-col flex-1">
            <div className="h-[46.93rem]">
              <img className="h-full w-full" src={"/images/products/pic2.png"} alt="Image2" />
            </div>
            <div className="flex flex-row">
              <div className="flex-1 h-[41.25rem]">
                <img className="h-full w-full" src={"/images/products/pic3.png"} alt="Image 3" />
              </div>
              <div className="flex-1 h-[41.25rem]">
                <img className="h-full w-full" src={"/images/products/pic4.png"} alt="Image 4" />
              </div>
            </div>
          </div>
        </div>
        <div className="h-[164.5rem]">
          <img className="h-full w-full" src={"/images/products/pic5.png"} alt="Image 5" />
        </div>
      </div>
      <div className="lg:hidden mt-[5rem] lg:mt-[12rem]">
        {products && products?.map((product) => {
          return (
            <div className="flex-1" key={product?.id}>
              <img className="h-full w-full" src={(product?.productImages.find(image => image.isThumbnail === true))?.signedUrl} alt="Image 1" />
            </div>
          )
        })}
      </div>
    </>
  );
};

export default ProductLargeView;