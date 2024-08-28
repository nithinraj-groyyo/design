import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BasicLayout from '../../layouts/BasicLayout';
import ProductCard from '../product_list/ProductCard';
import { fetchWishlistResponse } from '../../api/productsApi';
import { RootState } from '../../redux/store';
import { setWishlistItems, removeWishlistItem, setLoading, setError } from '../../redux/wishlistSlice';
import useWindowWidth from '../../hooks/useWindowWidth';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const WishList = () => {
    const dispatch = useDispatch();
    const { items: wishlistItems, loading, error } = useSelector((state: RootState) => state.wishlist);

    const navigate = useNavigate();

    const { isMobileView } = useWindowWidth();

    useEffect(() => {
        const fetchWishlist = async () => {
            dispatch(setLoading(true));
            try {
                const response = await fetchWishlistResponse();
                dispatch(setWishlistItems(response.wishlist));
            } catch (error: any) {
                dispatch(setError(error?.message || 'Failed to fetch wishlist'));
            } finally {
                dispatch(setLoading(false));
            }
        };

        fetchWishlist();
    }, [dispatch]);

    const handleRemoveFromWishlist = (productId: number) => {
        dispatch(removeWishlistItem(productId));
    };

    return (
        <BasicLayout showHeader={!isMobileView}>
            <section className='xxs:mt-[0rem] lg:mt-[10rem]'>
                <div className='m-0 lg:m-[4rem]'>
                    <div className='flex gap-4'>
                        <IconButton className='!text-3xl !font-bold' onClick={() => {
                            navigate("/")
                        }}>
                            <ArrowBackIcon />
                        </IconButton>
                        <div className='text-3xl font-medium my-[1rem]'>
                            WISHLIST
                        </div>
                    </div>
                    {loading && <p>Loading...</p>}
                    {error && <p className="text-red-500">{error}</p>}
                    <div className='grid xss:grid-cols-1 md:grid-cols-3 lg:grid-cols-6 justify-center xxs:gap-4 '>
                        {wishlistItems?.map((item) => (
                            <ProductCard
                                key={item.Product.id}
                                className='border border-black !rounded-none'
                                isAlreadyInWishlist={true}
                                product={item.Product}
                                onRemoveFromWishlist={handleRemoveFromWishlist}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </BasicLayout>
    );
};

export default WishList;