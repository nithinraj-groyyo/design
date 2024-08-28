import React from 'react';
import ProductCard from './ProductCard';
import { ProductViewEnum } from '../../utilities/enum';
import { IProductResponse, IProductView } from '../../types/products';
import { getImagesFromUrl } from '../../utilities/helper';

interface ProductGridProps {
  products: IProductResponse[];
  currentView: IProductView;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, currentView }) => {
  return (
    <div className={`grid gap-0 p-4 ${currentView === ProductViewEnum.SMALL ? 'xxs:grid-cols-4 lg:grid-cols-12' : 'xxs:grid-cols-2 md:grid-cols-3 lg:grid-cols-6'}`}>
      {products.map((product: any) => {
        return (
          <ProductCard
            key={product.id}
            showDetails={currentView !== ProductViewEnum.SMALL}
            className='border border-black !rounded-none'
            product={product}
          />
        )
      })}
    </div>
  );
};

export default ProductGrid;