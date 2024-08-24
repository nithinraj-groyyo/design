import React from 'react';

const ProductLargeView: React.FC = () => {
  return (
    <>
      <div className="xxs:hidden lg:flex flex-col w-full">
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
      <div className="lg:hidden">
        <div className="flex-1">
          <img className="h-full w-full" src={"/images/products/pic1.png"} alt="Image 1" />
        </div>
        <div className="flex-1">
          <img className="h-full w-full" src={"/images/products/pic2.png"} alt="Image 2" />
        </div>
        <div className="flex-1">
          <img className="h-full w-full" src={"/images/products/pic3.png"} alt="Image 3" />
        </div>
        <div className="flex-1">
          <img className="h-full w-full" src={"/images/products/pic4.png"} alt="Image 4" />
        </div>
        <div className="flex-1">
          <img className="h-full w-full" src={"/images/products/pic5.png"} alt="Image 5" />
        </div>
      </div>
    </>
  );
};

export default ProductLargeView;