import React from 'react';
import { Tooltip } from '@mui/material';
import FilterBoxBig from '../../assets/svg/productList/FilterBoxBig';
import FilterBoxMedium from '../../assets/svg/productList/FilterBoxMedium';
import FilterBoxSmall from '../../assets/svg/productList/FilterBoxSmall';
import { IProductView } from '../../types/products';
import { ProductViewEnum } from '../../utilities/enum';

interface ProductFilterProps {
  currentView: IProductView;
  onFilterChange: (size: IProductView) => void;
}

const ProductFilter: React.FC<ProductFilterProps> = ({ currentView, onFilterChange }) => {
  return (
    <div className='flex justify-end px-[1rem] lg:px-[3.75rem]'>
      <div className="flex gap-3 xxs:mr-2 p-1 hover:p-1 hover:bg-white">
        
        <Tooltip title="Large View" arrow>
          <div
            className="cursor-pointer"
            onClick={() => onFilterChange(ProductViewEnum.LARGE)}
          >
            <FilterBoxBig color={`${currentView === ProductViewEnum.LARGE ? '#000' : '#8E8E8E'}`} />
          </div>
        </Tooltip>

        <Tooltip title="Medium View" arrow>
          <div
            className="cursor-pointer"
            onClick={() => onFilterChange(ProductViewEnum.MEDIUM)}
          >
            <FilterBoxMedium color={`${currentView === ProductViewEnum.MEDIUM ? '#000' : '#8E8E8E'}`} />
          </div>
        </Tooltip>

        <Tooltip title="Small View" arrow>
          <div
            className="cursor-pointer"
            onClick={() => onFilterChange(ProductViewEnum.SMALL)}
          >
            <FilterBoxSmall color={`${currentView === ProductViewEnum.SMALL ? '#000' : '#8E8E8E'}`} />
          </div>
        </Tooltip>

      </div>
    </div>
  );
};

export default ProductFilter;