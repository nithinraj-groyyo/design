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

    const [getProductById, { data }] = useLazyGetProductByIdQuery();
    const [fetchProducts, { data: products = [], isLoading: isProductLoading }] = useLazyFetchProductsQuery();

    const [product, setProduct] = useState<IProduct>();

    const [totalAmount, setTotalAmount] = useState<number>(0)

    useEffect(() => {
        if (productId) {
            void getProductById({ productId: +productId });
        }
    }, [productId]);

    useEffect(() => {
        if (data?.data) {
            setProduct(data?.data)
        }
    }, [data]);

    useEffect(() => {
        setExpanded(false)
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [productId]);

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
            <div className='flex mt-[12rem] flex-col gap-6'>
                <div className="hidden lg:grid grid-cols-3 ">
                    <div className='flex flex-col p-4 gap-4 justify-end items-start'>
                        <div className='min-w-full'>
                            <ProductDescription product={product!} expanded={expanded} onToggle={handleToggle} />
                        </div>
                    </div>
                    <div className='p-4'>
                        <ImageSlider product={product!} />
                    </div>
                    <div className='p-4'>
                        <div className="flex flex-col  items-start border p-4 border-black mx-12 2xl:mx-20">
                            {product && <ProductInfo product={product} />}
                            <div className='w-full my-2'>
                                <ProductPricing product={product!} />
                                <ProductSizeSelector product={product!} setTotalAmount={setTotalAmount} totalAmount={totalAmount} />
                            </div>
                            <AddToBagButton totalAmount={totalAmount} />
                        </div>
                    </div>
                </div>
                <div className='hidden lg:flex flex-col gap-4 '>
                    <Typography className='text-[#2D2D2A] text-sm tracking-widest px-4'>YOU MAY ALSO LIKE</Typography>
                    <div className='grid grid-cols-6'>
                        {products?.data && products?.data?.slice(0, 6).map((product: any) => {

                            return (
                                <ProductCard
                                    key={product?.id}
                                    className='border border-black !rounded-none'
                                    product={product}
                                />
                            )
                        })}
                    </div>
                </div>
            </div>
            {/* <MobileViewProductDetails /> */}
        </BasicLayout>
    );
};

export default ProductDetails;