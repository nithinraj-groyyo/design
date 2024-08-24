import React, { useEffect, useMemo, useState } from 'react';
import BasicLayout from '../../layouts/BasicLayout';
import ProductFilter from './ProductFilter';
import ProductGrid from './ProductGrid';
import { ProductViewEnum } from '../../utilities/enum';
import { IProductView } from '../../types/products';
import ProductLargeView from './ProductLargeView';

const ProductList: React.FC = () => {
  const [currentView, setCurrentView] = useState(ProductViewEnum.LARGE);
  const [opacity, setOpacity] = useState(1);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  const dummyProducts = useMemo(() => 
    Array.from({ length: 20 }, (_, index) => ({
      id: index,
      image: `https://via.placeholder.com/200?text=Product+${index + 1}`,
      name: `Product ${index + 1}`,
      price: `$${(Math.random() * 100 + 1).toFixed(2)}`,
    }))
  , []);

  const handleFilterChange = (size: IProductView) => {
    setCurrentView(size);
  };

  const handleAddToWishlist = (id: number) => {
    console.log(`Added Product ${id} to wishlist`);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;

      const isScrollingDown = scrollTop > lastScrollTop;

      if (isScrollingDown) {
        const newOpacity = 1 - Math.min(scrollTop / 300, 1);
        setOpacity(newOpacity);
      } else if (!isScrollingDown && opacity < 1) {
        const newOpacity = opacity + 0.05;
        setOpacity(Math.min(newOpacity, 1));
      }

      if (scrollTop + clientHeight >= scrollHeight && !isScrollingDown) {
        setOpacity(1);
      }

      setLastScrollTop(scrollTop <= 0 ? 0 : scrollTop);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollTop, opacity]);

  return (
    <BasicLayout>
      <div className='mt-[10rem] fixed w-full' style={{opacity}}>
        <ProductFilter currentView={currentView} onFilterChange={handleFilterChange} />
      </div>

      <div className='mt-[12rem]'>
        {currentView === ProductViewEnum.LARGE ? (
          <>
            <ProductLargeView />
          </>
        ) : (
          <ProductGrid
            products={dummyProducts}
            currentView={currentView}
            onAddToWishlist={handleAddToWishlist}
          />
        )}
      </div>
    </BasicLayout>
  );
};

export default ProductList;