import { useState } from 'react';
import BasicLayout from '../../layouts/BasicLayout';
import ProductInfo from './ProductInfo';
import ProductDescription from './ProductDescription';
import ProductPricing from './ProductPricing';
import ProductSizeSelector from './ProductSizeSelector';
import AddToBagButton from './AddToBagButton';
import ImageSlider from './ImageSlider';
import { Typography } from '@mui/material';
import ProductCard from '../product_list/ProductCard';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useParams } from 'react-router-dom';
import useFetchProducts from '../../hooks/useFetchProducts';
import useFetchProductById from '../../hooks/useFetchProductById';
import MobileViewProductDetails from './MobileViewProductDetails';
import useWindowWidth from '../../hooks/useWindowWidth';

const ProductDetails = () => {   
    const { productId, categoryKey } = useParams<{ productId: string, categoryKey: string }>();

    const [expanded, setExpanded] = useState(false);

    const { products } = useSelector((state: RootState) => state.products.productData);
    const { product } = useSelector((state: RootState) => state.products.singleProductData);

    const { isMobileView } = useWindowWidth();

    useFetchProducts({categoryKey});

    useFetchProductById({ productId: Number(productId) });

    const handleToggle = () => {
        setExpanded(!expanded);
    };

    return (
        <BasicLayout showFooter={isMobileView ? false : true}>
            <div className="hidden lg:grid grid-cols-3 min-h-[40rem] mt-[12rem] mb-[4rem]">
                <div className='flex flex-col gap-4 justify-end items-start border border-black p-[1rem] mx-[6rem]'>
                    <ProductDescription expanded={expanded} onToggle={handleToggle} />
                </div>
                <div>
                    <ImageSlider />
                </div>
                <div className="flex flex-col justify-between items-start border border-black p-4 mx-24">
                    {product && <ProductInfo product={product} />}
                    <ProductPricing />
                    <ProductSizeSelector />
                    <AddToBagButton />
                </div>
            </div>
            <div className='hidden lg:flex flex-col gap-4 my-[10rem]'>
                <Typography className='text-[#2D2D2A] text-sm tracking-widest px-4'>YOU MAY ALSO LIKE</Typography>
                <div className='grid grid-cols-6'>
                    {products?.slice(0, 6).map((product) => {
                        
                        return (
                        <ProductCard
                            key={product?.id}
                            className='border border-black !rounded-none'
                            product={product}
                        />
                    )})}
                </div>
            </div>
            <MobileViewProductDetails />
        </BasicLayout>
    );
};

export default ProductDetails;