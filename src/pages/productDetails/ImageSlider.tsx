import React, { useRef, useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IProduct } from "../../types/products";
import _Slider from "react-slick";
const Slider: any = _Slider;
interface IImageSliderProps {
  product: IProduct;
}

const ImageSlider = ({ product }: IImageSliderProps) => {
  const slider1 = useRef<_Slider>(null);
  const slider2 = useRef<_Slider>(null);
  const [nav1, setNav1] = useState<_Slider | null>(null);
  const [nav2, setNav2] = useState<_Slider | null>(null);

  useEffect(() => {
    setNav1(slider1.current);
    setNav2(slider2.current);
  }, []);

  return (
    <div className="flex-1">
      <div className="flex">
        {/* Main Slider */}
        <div className="flex-shrink-0 w-[80%]">
          <Slider
            asNavFor={nav2 ?? undefined}
            ref={slider1}
            slidesToShow={1}
            slidesToScroll={1}
            arrows={false}
            vertical={true}
            dots={true}
            infinite={true}
            speed={500}
          >
            {product?.productImages?.map((img, index) => (
              <div key={index} className="w-full">
                <div
                  className="relative"
                  style={{ paddingBottom: "133.33%" /* 12:9 aspect ratio */ }}
                >
                  <img
                    src={img?.signedUrl}
                    alt={`Product ${index}`}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* Thumbnail Slider */}
        <div className="w-[20%]">
          <Slider
            asNavFor={nav1 ?? undefined}
            ref={slider2}
            swipeToSlide={true}
            slidesToShow={4}
            slidesToScroll={1}
            vertical={true}
            dots={false}
            focusOnSelect={true}
            centerPadding="0px"
          >
            {product?.productImages?.map((img, index) => (
              <div key={index} className="w-full">
                <div
                  className="relative"
                  style={{ paddingBottom: "111%" /* 12:9 aspect ratio */ }}
                >
                  <img
                    src={img?.signedUrl}
                    alt={`Thumbnail ${index}`}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
