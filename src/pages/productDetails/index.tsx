import { useEffect, useState } from 'react';
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
import { useLazyFetchProductsQuery, useLazyGetProductByIdQuery } from '../../rtk-query/productApiSlice';
import { IProduct } from '../../types/products';

const ProductDetails = () => {   
    const { productId } = useParams<{ productId: string }>();

    const [expanded, setExpanded] = useState(false);

    const { isMobileView } = useWindowWidth();

    const [getProductById, {data}] = useLazyGetProductByIdQuery();
    const [fetchProducts, { data: products=[], isLoading: isProductLoading }] = useLazyFetchProductsQuery();
console.log(products)
    const [product, setProduct] = useState<IProduct>();

    useEffect(() => {
        if(productId){
            void getProductById({productId: +productId});
        }
    }, []);

    useEffect(() => {
        if(data?.data){
            setProduct(data?.data)
        }
    }, [data]);

    const loadProducts = async () => {
        const response = await fetchProducts({
          page: 1,
          limit: 10,
          isProductActive: true
        });
      };

      
    useEffect(() => {
        loadProducts();
    }, []);
    

    const handleToggle = () => {
        setExpanded(!expanded);
    };

    return (
        <BasicLayout showFooter={isMobileView ? false : true}>
            <div className="hidden lg:grid grid-cols-3 min-h-[40rem] mt-[12rem] mb-[4rem]">
                <div className='flex flex-col gap-4 justify-end items-start border border-black p-[1rem] mx-[6rem]'>
                    <ProductDescription product={product!} expanded={expanded} onToggle={handleToggle} />
                </div>
                <div>
                    <ImageSlider product={product!} />
                </div>
                <div className="flex flex-col justify-between items-start border border-black p-4 mx-24">
                    {product && <ProductInfo product={product} />}
                    <ProductPricing product={product!} />
                    <ProductSizeSelector product={product!} />
                    <AddToBagButton />
                </div>
            </div>
            <div className='hidden lg:flex flex-col gap-4 my-[10rem]'>
                <Typography className='text-[#2D2D2A] text-sm tracking-widest px-4'>YOU MAY ALSO LIKE</Typography>
                <div className='grid grid-cols-6'>
                    {products?.data && products?.data?.slice(0, 6).map((product: any) => {
                        
                        return (
                        <ProductCard
                            key={product?.id}
                            className='border border-black !rounded-none'
                            product={product}
                        />
                    )})}
                </div>
            </div>
            {/* <MobileViewProductDetails /> */}
        </BasicLayout>
    );
};

export default ProductDetails;