import React, { useEffect, useState } from 'react';
import BasicLayout from '../../layouts/BasicLayout';
import ProductInfo from './ProductInfo';
import ProductDescription from './ProductDescription';
import ProductPricing from './ProductPricing';
import ProductSizeSelector from './ProductSizeSelector';
import AddToBagButton from './AddToBagButton';
import ImageSlider from './ImageSlider';
import { Typography } from '@mui/material';
import ProductCard from '../product_list/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductByIdResponse } from '../../api/productsApi';
import { setSingleProductFailure, setSingleProductLoading, setSingleProductSuccess } from '../../redux/productsSlice';
import useFetchProducts from '../../hooks/useFetchProducts';
import { getImagesFromUrl } from '../../utilities/helper';

const ProductDetails = () => {   
    const { productId, categoryKey } = useParams<{ productId: string, categoryKey: string }>();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [expanded, setExpanded] = useState(false);

    const {products} = useSelector((state: RootState) => state.products.productData)

    useFetchProducts(categoryKey);

    useEffect(() => {
        if (!productId) {
            navigate('/404', {state : {message: "Product Not Available"}});
            return;
        }

        const fetchProductById = async () => {
            dispatch(setSingleProductLoading());
            try {
                const response = await getProductByIdResponse({ productId: +productId });
                if (response) {
                    dispatch(setSingleProductSuccess(response));
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                } 
            } catch (error: any) {
                dispatch(setSingleProductFailure(error?.message));
                console.error(error?.message);
                navigate('/404'); 
            }
        };

        fetchProductById();
    }, [productId, dispatch, navigate]);

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
                    {products?.slice(0, 6).map((product) => (
                        <ProductCard
                            key={product.id}
                            productId={product.id}
                            image={getImagesFromUrl(product?.CoverImageLink)}
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