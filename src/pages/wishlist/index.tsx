import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BasicLayout from '../../layouts/BasicLayout';
import ProductCard from '../product_list/ProductCard';
import { fetchWishlistResponse } from '../../api/userApi';
import { RootState } from '../../redux/store';
import { setWishlistItems, removeWishlistItem, setLoading, setError, removeFromLocalWishlist } from '../../redux/wishlistSlice';
import useWindowWidth from '../../hooks/useWindowWidth';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { motion } from 'framer-motion';

const WishList = () => {
    const userId = JSON.parse(localStorage.getItem("userId") as string);

    const dispatch = useDispatch();

    const { items: wishlistItems, loading, error } = useSelector((state: RootState) => state.wishlist);

    const navigate = useNavigate();

    const { isMobileView } = useWindowWidth();

    const [localWishlistState, setLocalWishlistState] = useState<any[]>([]);

    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const fetchWishlist = async () => {
            dispatch(setLoading(true));
            try {
                const response = await fetchWishlistResponse();
                dispatch(setWishlistItems(response?.wishlist));
            } catch (error: any) {
                dispatch(setError(error?.message || 'Failed to fetch wishlist'));
            } finally {
                dispatch(setLoading(false));
            }
        };

        if (userId) {
            fetchWishlist();
        } else {
            const localWishlist = JSON.parse(localStorage.getItem("localWishList") as string);
            setLocalWishlistState(localWishlist || []);
        }
    }, [dispatch, userId]);

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

    const handleRemoveFromWishlist = (productId: number) => {
        if (!userId) {
            dispatch(removeFromLocalWishlist({ productId }));
            window.location.reload();
            return;
        }
        dispatch(removeWishlistItem(productId));
    };

    const isWishlistEmpty = userId ? wishlistItems.length === 0 : localWishlistState.length === 0;

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
                        <div className='text-center mt-10'>
                            <p>Your wishlist is empty.</p>
                            <button 
                                onClick={() => navigate('/')}
                                className='mt-4 bg-blue-500 text-white px-6 py-2 rounded'
                            >
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        <div className='grid xss:grid-cols-1 md:grid-cols-3 lg:grid-cols-6 justify-center xxs:gap-4'>
                            {(userId ? wishlistItems : localWishlistState)?.map((item) => (
                                <motion.div
                                    key={userId ? item.Product.id : item.id}
                                    variants={cardVariants}
                                    initial="hidden"
                                    animate="visible"
                                    whileHover="hover"
                                    exit="exit"
                                    className='bg-white shadow-lg border border-gray-200 rounded-xl overflow-hidden'
                                >
                                    <ProductCard
                                        className='!rounded-none'
                                        isAlreadyInWishlist={true}
                                        product={userId ? item.Product : item}
                                        onRemoveFromWishlist={handleRemoveFromWishlist}
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
