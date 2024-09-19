import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCartBadgeResponse } from '../api/productsApi';
import { setCartData } from '../redux/shoppingBagSlice';

const useFetchUserOrders = (userId: string, refreshOrders: boolean) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchUserOrders = async () => {
            try {
                const response = await getCartBadgeResponse(userId);
                if (response) {
                    dispatch(setCartData(response));
                }
            } catch (error: any) {
                console.error(error?.message);
            }
        };

        if (userId) {
            fetchUserOrders();
        }
    }, [dispatch, userId, refreshOrders]);
};

export default useFetchUserOrders;