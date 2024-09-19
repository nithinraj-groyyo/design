import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { saveForLaterResponse } from '../api/productsApi';
import { setCartData } from '../redux/shoppingBagSlice';

interface UseSaveForLaterProps {
    productId: number;
    isSavedItem: boolean;
    userId: string;
}

export const useSaveForLater = () => {
    const dispatch = useDispatch();

    const saveForLaterHandler = useCallback(async ({ productId, isSavedItem, userId }: UseSaveForLaterProps) => {
        try {
            const status = isSavedItem ? 'Cart' : 'Saved';
            const response = await saveForLaterResponse({ productId, status, userId });
            if (response) {
                dispatch(setCartData(response));
            }
        } catch (error: any) {
            console.error('Error saving item:', error?.message);
        }
    }, [dispatch]);

    return { saveForLaterHandler };
};