import React from "react";
import { Typography, Link } from "@mui/material";
import { IProduct } from "../../types/products";

interface IProductDescriptionProps {
  expanded: any;
  onToggle: any;
  product: IProduct;
}

const ProductDescription = ({
  expanded,
  onToggle,
  product,
}: IProductDescriptionProps) => {
  return (
    <>
      <div className=" flex flex-col gap-4 border border-black p-4 mx-10 2xl:mx-14">
        <p className="text-[#8E8E8E] text-sm 2xl:text-[1rem] whitespace-nowrap !tracking-[0.3rem] font-semibold text-left">
          COMPOSITION, CARE AND ORIGIN
        </p>

        <div className="flex flex-col gap-2">
          <p className="text-[#8E8E8E] text-xs 2xl:text-[1rem] !tracking-[0.2rem] font-semibold text-left">
            {product?.leftTopHeader}
          </p>
          <p className="text-xs 2xl:text-sm text-[#8E8E8E]">
            {product?.leftTopContent}
          </p>
        </div>

        {expanded && (
          <>
            <div className="flex flex-col gap-2">
              <p className="text-[#8E8E8E] text-xs 2xl:text-[1rem] !tracking-[0.2rem] font-semibold text-left">
                {product?.leftBottomHeader}
              </p>
              <p className="text-xs 2xl:text-sm text-[#8E8E8E]">
                {product?.leftBottomContent}
              </p>
            </div>
          </>
        )}

        <Link
          onClick={onToggle}
          className="cursor-pointer !text-[#8E8E8E] whitespace-nowrap !text-xs 2xl:!text-[1rem]"
        >
          {expanded ? "View Less" : "View More"}
        </Link>
      </div>
    </>
  );
};

export default ProductDescription;
