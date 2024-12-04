import React, { useEffect, useState } from 'react';
import BasicLayout from '../../layouts/BasicLayout';
import ProductInfo from './ProductInfo';
import ProductDescription from './ProductDescription';
import ProductPricing from './ProductPricing';
import ProductSizeSelector from './ProductSizeSelector';
import AddToBagButton from './AddToBagButton';
import ImageSlider from './ImageSlider';
import { Typography, Button, Drawer } from '@mui/material';
import ProductCard from '../product_list/ProductCard';
import { useParams } from 'react-router-dom';
import useWindowWidth from '../../hooks/useWindowWidth';
import { useLazyFetchProductsQuery, useLazyGetProductByIdQuery } from '../../rtk-query/productApiSlice';
import { IProduct } from '../../types/products';
import ProductColor from './ProductColor';
import ProductSize from './ProductSize';
import ProductDrawer from './ProductDrawer';
import MobileProductDetails from './MobileProductDetails';

const ProductDetails = () => {
    const { productId } = useParams<{ productId: string }>();
    const [expanded, setExpanded] = useState(false);
    const { isMobileView } = useWindowWidth();
    const [getProductById, { data }] = useLazyGetProductByIdQuery();
    const [fetchProducts, { data: products = [], isLoading: isProductLoading }] = useLazyFetchProductsQuery();
    const [product, setProduct] = useState<IProduct>();
    const [totalAmount, setTotalAmount] = useState<number>(0);

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    useEffect(() => {
        if (productId) {
            void getProductById({ productId: +productId });
        }
    }, [productId]);

    useEffect(() => {
        if (data?.data) {
            setProduct(data?.data);
        }
    }, [data]);

    useEffect(() => {
        setExpanded(false);
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [productId]);

    const loadProducts = async () => {
        await fetchProducts({
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

    const handleOpenDrawer = () => {
        setIsDrawerOpen(true);
    }

    const handleCloseDrawer = () => {
        setIsDrawerOpen(false);
    }

    return (
        <BasicLayout showFooter={isMobileView ? false : true}>
            <div className="flex mt-[5rem] lg:mt-[12rem] flex-col gap-6">
                <div className="hidden lg:grid grid-cols-3 ">
                    <div className="flex flex-col p-4 gap-4 justify-end items-start">
                        <div className="min-w-full">
                            <ProductDescription product={product!} expanded={expanded} onToggle={handleToggle} />
                        </div>
                    </div>
                    <div className="p-4">
                        <ImageSlider product={product!} />
                    </div>
                    <div className="p-4">
                        <div className="flex flex-col items-start border p-4 border-black mx-12 2xl:mx-20">
                            {product && <ProductInfo product={product} />}
                            <div className="w-full my-2">
                                <ProductPricing product={product!} />
                                <ProductColor product={product!} openDrawer={handleOpenDrawer} />
                                <ProductSize product={product!} openDrawer={handleOpenDrawer} />
                            </div>
                            <AddToBagButton totalAmount={totalAmount} openDrawer={handleOpenDrawer} />
                        </div>
                    </div>
                </div>


                <ProductDrawer isOpen={isDrawerOpen} onClose={handleCloseDrawer} product={product!} />

                <div className="hidden lg:flex flex-col gap-4 my-2">
                    <Typography className="text-[#2D2D2A] text-sm tracking-widest px-4">YOU MAY ALSO LIKE</Typography>
                    <div className="grid grid-cols-6 gap-2 mx-1">
                        {products?.data &&
                            products?.data?.slice(0, 6).map((product: any) => {
                                return (
                                    <ProductCard
                                        key={product?.id}
                                        product={product}
                                        className='!rounded-lg shadow-md'
                                    />
                                );
                            })}
                    </div>
                </div>
            </div>
            <div className='lg:hidden'>
                <MobileProductDetails />
            </div>
        </BasicLayout>
    );
};

export default ProductDetails;