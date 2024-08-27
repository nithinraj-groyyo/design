import React, { useMemo } from 'react'
import BasicLayout from '../../layouts/BasicLayout'
import ProductCard from '../product_list/ProductCard'

const WishList = () => {
    const products = useMemo(() =>
        Array.from({ length: 20 }, (_, index) => ({
            id: index,
            image: `https://via.placeholder.com/200?text=Product+${index + 1}`,
            name: `Product ${index + 1}`,
            price: `$${(Math.random() * 100 + 1).toFixed(2)}`,
        }))
        , []);


    const handleAddToWishlist = (id: number) => {
        console.log(`Added Product ${id} to wishlist`);
    };

    return (
        <BasicLayout>
            <section className='xxs:mt-[5rem] lg:mt-[10rem]'>
                <div className='m-[4rem]'>
                    <div className='text-3xl font-medium my-[1rem]'>WISHLIST</div>
                    <div className='grid xss:grid-cols-1 md:grid-cols-3 lg:grid-cols-6 justify-center xxs:gap-4 '>
                        {products.slice(0, 6).map((product: any) => (
                            <ProductCard
                                key={product.id}
                                productId={product.id}
                                image={product.image}
                                name={product.name}
                                price={product.price}
                                className='border border-black !rounded-none'
                                onAddToWishlist={() => handleAddToWishlist(product.id)}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </BasicLayout>
    )
}

export default WishList