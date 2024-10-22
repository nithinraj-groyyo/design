import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BasicLayout from '../../layouts/BasicLayout';
import ProductCard from '../product_list/ProductCard';
import { fetchWishlistResponse } from '../../api/userApi';
import { RootState } from '../../redux/store';
import { setWishlistItems, removeWishlistItem, setLoading, setError, removeFromLocalWishlist } from '../../redux/wishlistSlice';
import useWindowWidth from '../../hooks/useWindowWidth';
import { Button, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { motion } from 'framer-motion';
import { useGetProductByIdsMutation } from '../../rtk-query/productApiSlice';
import { useLazyGetWishlistQuery, useRemoveWishListMutation } from '../../rtk-query/wishlistApiSlice';
import WishlistCard from './WishlistCard';

const WishList = () => {
    const userId = JSON.parse(localStorage.getItem("userId") as string);
    const token = JSON.parse(localStorage.getItem("authToken") as string);

    const dispatch = useDispatch();

    const { items: wishlistItems, loading, error } = useSelector((state: RootState) => state.wishlist);

    const navigate = useNavigate();

    const { isMobileView } = useWindowWidth();

    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const [getProductByIds, {data: localWishlistData}] = useGetProductByIdsMutation();
    const [getWishlist, {data: wishlistData}] = useLazyGetWishlistQuery();
    const [removeWishList, {data: removeWishListData}] = useRemoveWishListMutation()

    useEffect(() => {
        if(userId){
            if(wishlistItems?.length === 0){
                getWishlist({token})
            }
        }else{
            const localWishlist = JSON.parse(localStorage.getItem("localWishList") as string);
            getProductByIds(localWishlist);
        }
    },[]);

    useEffect(() => {
        if(wishlistData){
            dispatch(setWishlistItems(wishlistData?.data)) 
        }else if(localWishlistData){
            dispatch(setWishlistItems(localWishlistData?.data)) 
        }
    }, [wishlistData, localWishlistData, removeWishListData]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [lastScrollY]);

    const handleScroll = () => {
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY && currentScrollY > 50) {            
            setIsVisible(false);
          } else {            
            setIsVisible(true);
          }
          setLastScrollY(currentScrollY);
    }

    const handleRemoveFromWishlist = async(productId: number) => {
        if (!userId) {
            dispatch(removeFromLocalWishlist({ productId }));
            window.location.reload();
            return;
        }else{
           await removeWishList({productId, token});
        }
        dispatch(removeWishlistItem(productId));
    };

    const isWishlistEmpty = wishlistItems?.length === 0;

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        hover: { scale: 1.05 },
        exit: { opacity: 0, y: 50, transition: { duration: 0.3 } }
    };

    return (
        <BasicLayout showHeader={!isMobileView}>
            <section className='xxs:mt-[0rem] lg:mt-[10rem]'>
                <div className='m-0 lg:m-[4rem]'>
                    <motion.div 
                        className='flex gap-4'
                        initial={{ opacity: 1, y: 0 }}
                        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -100 }}
                        transition={{ duration: 0.5 }}
                    >
                        <IconButton className='!text-3xl !font-bold' onClick={() => {
                            navigate("/");
                        }}>
                            <ArrowBackIcon />
                        </IconButton>
                        <div
                            className='text-3xl font-medium my-[1rem]'
                        >
                            WISHLIST
                        </div>
                    </motion.div>
                    {loading && <p>Loading...</p>}
                    {error && <p className="text-red-500">{error}</p>}
                    {isWishlistEmpty ? (
                       <div className="flex flex-col items-center justify-center min-h-[40vh]">
                        <div className="bg-white shadow-md rounded-lg p-8 text-center max-w-md mx-auto">
                            <div className="mb-6">
                            <img
                                src="/images/empty-wishlist.webp" 
                                alt="Empty Wishlist"
                                className="w-40 h-40 mx-auto mb-4"
                            />
                            <p className="text-gray-600 text-lg font-semibold">Your wishlist is empty.</p>
                            <p className="text-gray-500 mt-2">
                                You haven’t added anything to your wishlist yet. Start browsing and add items you love.
                            </p>
                            </div>
                            <Button
                                onClick={() => navigate('/')}
                                className="mt-4 !bg-black !text-white transition-all duration-300 !px-6 !py-3 rounded-lg shadow-md hover:shadow-lg focus:ring focus:ring-blue-300 focus:outline-none"
                                >
                                Continue Shopping
                            </Button>
                        </div>
                        </div>
                     
                    ) : (
                        <div className='grid xss:grid-cols-1 md:grid-cols-3 lg:grid-cols-6 justify-center xxs:gap-4'>
                            {wishlistItems?.map((item) => (
                                <motion.div
                                    key={item.id}
                                    variants={cardVariants}
                                    initial="hidden"
                                    animate="visible"
                                    whileHover="hover"
                                    exit="exit"
                                    className='bg-white shadow-lg border border-gray-200 rounded-xl overflow-hidden'
                                >
                                    {/* <ProductCard
                                        className='!rounded-none'
                                        isAlreadyInWishlist={true}
                                        product={item}
                                        onRemoveFromWishlist={handleRemoveFromWishlist}
                                    /> */}
                                    <WishlistCard
                                        id={item.id}
                                        imageUrl={item?.productImages[0].signedUrl}
                                        name={item.name}
                                        onRemove={handleRemoveFromWishlist}
                                        price={item.productPrices[0].pricePerPiece}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </BasicLayout>
    );
};

export default WishList;
