import React, { useMemo, useState } from 'react';
import BasicLayout from '../../layouts/BasicLayout';
import ProductInfo from './ProductInfo';
import ProductDescription from './ProductDescription';
import ProductPricing from './ProductPricing';
import ProductSizeSelector from './ProductSizeSelector';
import AddToBagButton from './AddToBagButton';
import ImageSlider from './ImageSlider';
import { Typography } from '@mui/material';
import ProductCard from '../product_list/ProductCard';


const ProductDetails = () => {
    const products = useMemo(() => 
        Array.from({ length: 20 }, (_, index) => ({
          id: index,
          image: `https://via.placeholder.com/200?text=Product+${index + 1}`,
          name: `Product ${index + 1}`,
          price: `$${(Math.random() * 100 + 1).toFixed(2)}`,
        }))
      , []);

    const [expanded, setExpanded] = useState(false);

    const handleToggle = () => {
        setExpanded(!expanded);
    };

    const handleAddToWishlist = (id: number) => {
        console.log(`Added Product ${id} to wishlist`);
      };

    return (
        <BasicLayout>
            <div className="grid grid-cols-3 min-h-[40rem] mt-[12rem] mb-[4rem]">
                <div className='flex flex-col gap-4 justify-end items-start border border-black p-[1rem] mx-[6rem]'>
                    <ProductDescription expanded={expanded} onToggle={handleToggle} />
                </div>
                <div>
                    <ImageSlider />
                </div>
                <div className="flex flex-col justify-between items-start border border-black p-4 mx-24">
                    <ProductInfo />
                    <ProductPricing />
                    <ProductSizeSelector />
                    <AddToBagButton />
                </div>
            </div>
            <div className='flex flex-col gap-4 my-[10rem]'>
                <Typography className='text-[#2D2D2A] text-sm tracking-widest px-4'>YOU MAY ALSO LIKE</Typography>
                <div className='grid grid-cols-6'>
                    {products.slice(0, 6).map((product: any) => (
                        <ProductCard
                            key={product.id}
                            image={product.image}
                            name={product.name}
                            price={product.price}
                            className='border border-black !rounded-none'
                            onAddToWishlist={() => handleAddToWishlist(product.id)}
                        />
                    ))}
                </div>
            </div>
        </BasicLayout>
    );
};

export default ProductDetails;