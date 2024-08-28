import React, { useState, useEffect, useMemo } from 'react';
import BasicLayout from '../../layouts/BasicLayout';
import ProductCard from '../product_list/ProductCard';
import { fetchWishlistResponse } from '../../api/productsApi';
import { IWishlistItem, IWishlistResponse } from '../../types/products';
import { getImagesFromUrl } from '../../utilities/helper';

const WishList = () => {
    const [wishlistItems, setWishlistItems] = useState<IWishlistItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const response: IWishlistResponse = await fetchWishlistResponse();
                setWishlistItems(response.wishlist);
            } catch (error: any) {
                setError(error?.message || 'Failed to fetch wishlist');
            } finally {
                setLoading(false);
            }
        };

        fetchWishlist();
    }, []);

    const handleRemoveFromWishlist = (productId: number) => {
        setWishlistItems(prevItems => prevItems.filter(item => item.Product.id !== productId));
    };

    const products = useMemo(() => 
        wishlistItems.map(item => ({
            id: item?.Product?.id,
            image: item?.Product?.CoverImageLink,
            name: item?.Product?.name,
            price: item?.Product?.price,
        })),
        [wishlistItems]
    );

    return (
        <BasicLayout>
            <section className='xxs:mt-[5rem] lg:mt-[10rem]'>
                <div className='m-[4rem]'>
                    <div className='text-3xl font-medium my-[1rem]'>WISHLIST</div>
                    {loading && <p>Loading...</p>}
                    {error && <p className="text-red-500">{error}</p>}
                    <div className='grid xss:grid-cols-1 md:grid-cols-3 lg:grid-cols-6 justify-center xxs:gap-4 '>
                        {products?.map((product) => (
                            <ProductCard
                                key={product.id}
                                className='border border-black !rounded-none'
                                isAlreadyInWishlist={true}
                                product={product}
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