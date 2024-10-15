import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { getImagesFromUrl } from "../../utilities/helper";
import { IProduct } from "../../types/products";

interface IImageSliderProps {
  product: IProduct
}

const ImageSlider = ({product}:IImageSliderProps) => {
  const [nav1, setNav1] = useState<Slider | null>(null);
  const [nav2, setNav2] = useState<Slider | null>(null);

  return (
    <div className="flex-1">
      <div className="flex h-[47rem]">
    
        <div className="flex-shrink-0 w-[80%]">
          <Slider
            asNavFor={nav2 ?? undefined}
            ref={(slider1) => setNav1(slider1)}
            slidesToShow={1}
            slidesToScroll={1}
            arrows={false}
            vertical={true}
            className="product-img"
          >
            {product?.productImages?.map((img, index) => (
              <div key={index}>
                <img
                  src={img?.signedUrl}
                  alt={`Product ${index}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </Slider>
        </div>

        
        <div className="w-[20%]">
          <Slider
            asNavFor={nav1 ?? undefined}
            ref={(slider2) => setNav2(slider2)}
            swipeToSlide={true}
            slidesToShow={4}
            slidesToScroll={1}
            vertical={true}
            dots={false}
            focusOnSelect={true}
            centerPadding="0px"
            className="product-img-nav h-[47rem]"
          >
            {product?.productImages?.map((img, index) => (
              <div key={index}>
                <img
                   src={img?.signedUrl}
                  alt={`Thumbnail ${index}`}
                  className="w-full h-[10rem] object-cover"
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;