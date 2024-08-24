import React from 'react';
import ProductCard from './ProductCard';
import { ProductViewEnum } from '../../utilities/enum';
import { IProductView } from '../../types/products';

interface ProductGridProps {
  products: any;
  currentView: IProductView;
  onAddToWishlist: (id: number) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, currentView, onAddToWishlist }) => {
  return (
    <div className={`grid gap-0 p-4 ${currentView === ProductViewEnum.SMALL ? 'xxs:grid-cols-4 lg:grid-cols-12' : 'xxs:grid-cols-2 md:grid-cols-3 lg:grid-cols-6'}`}>
      {products.map((product: any) => (
        <ProductCard
          key={product.id}
          image={product.image}
          name={product.name}
          price={product.price}
          showDetails={currentView !== ProductViewEnum.SMALL}
          className='border border-black !rounded-none'
          onAddToWishlist={() => onAddToWishlist(product.id)}
        />
      ))}
    </div>
  );
};

export default ProductGrid;