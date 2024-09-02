import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IWishlistItem } from '../types/products';

interface WishlistState {
    localWishList: number[];
    items: IWishlistItem[];
    loading: boolean;
    error: string | null;
}

const initialState: WishlistState = {
    items: [],
    loading: false,
    error: null,
    localWishList: []
};

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        setWishlistItems(state, action: PayloadAction<IWishlistItem[]>) {
            state.items = action.payload;
        },
        removeWishlistItem(state, action: PayloadAction<number>) {
            state.items = state.items.filter(item => item.Product.id !== action.payload);
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        setError(state, action: PayloadAction<string | null>) {
            state.error = action.payload;
        },
        setLocalWishlistItems(state, action: PayloadAction<{productId: number}>) {
            const { productId } = action.payload;

            state.localWishList.push(productId);
        },
    },
});

export const { setWishlistItems, removeWishlistItem, setLoading, setError, setLocalWishlistItems } = wishlistSlice.actions;

export default wishlistSlice.reducer;