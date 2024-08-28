import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getProductByIdResponse } from '../api/productsApi';
import { setSingleProductFailure, setSingleProductLoading, setSingleProductSuccess } from '../redux/productsSlice';
import { resetState, setProduct } from '../redux/productSizeSlice';

interface UseFetchProductByIdProps {
  productId: number | undefined;
}

const useFetchProductById = ({ productId}: UseFetchProductByIdProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!productId) {
      navigate('/404', { state: { message: 'Product Not Available' } });
      return;
    }

    dispatch(setProduct(+productId));

    const fetchProductById = async () => {
      dispatch(setSingleProductLoading());
      try {
        const response = await getProductByIdResponse({ productId: +productId });
        if (response) {
          dispatch(setSingleProductSuccess(response));
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        }
      } catch (error: any) {
        dispatch(setSingleProductFailure(error?.message));
        console.error(error?.message);
        navigate('/404');
      }
    };

   
      fetchProductById();
    

    return () => {
      dispatch(resetState());
    };
  }, [productId, dispatch, navigate]);
};

export default useFetchProductById;