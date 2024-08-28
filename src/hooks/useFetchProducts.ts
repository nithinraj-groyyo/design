import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setProductsLoading, setProductsSuccess, setProductsFailure } from '../redux/productsSlice';
import { getProductsResponse } from '../api/productsApi';

interface FetchProductsOptions {
  categoryKey?: string;
}

const useFetchProducts = ({ categoryKey }: FetchProductsOptions) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!categoryKey) return;

    const fetchProducts = async () => {
      const currentPage = 1;
      const pageSize = "10";
      const sort = "new";
      const season = "";

      dispatch(setProductsLoading());

      try {
        const response = await getProductsResponse({
          url: `${categoryKey}/${currentPage}/${pageSize}/${sort}/${season}`
        });
        dispatch(setProductsSuccess(response?.products));
      } catch (error: any) {
        console.error(error);
        dispatch(setProductsFailure(error.message));
      }
    };

    fetchProducts();
  }, [categoryKey, dispatch,]);
};

export default useFetchProducts;