import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from '../types/products';

interface WishlistState {
    localWishList: number[];
    items: IProduct[];
    loading: boolean;
    error: string | null;
    wishlistTriggered: boolean;
}

const initialState: WishlistState = {
    items: [],
    loading: false,
    error: null,
    localWishList: [],
    wishlistTriggered: false
};

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        setWishlistItems(state, action: PayloadAction<IProduct[]>) {
            state.items = action.payload;
        },
        removeWishlistItem(state, action: PayloadAction<number>) {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        setError(state, action: PayloadAction<string | null>) {
            state.error = action.payload;
        },
        setLocalWishlistItems(state, action: PayloadAction<{ productId: number }>) {
            const { productId } = action.payload;

            const index = state.localWishList.findIndex(item => item === productId);

            if (index === -1) {                
                state.localWishList.push(productId);
            } else {                
                state.localWishList.splice(index, 1);
            }

            localStorage.setItem('localWishList', JSON.stringify(state.localWishList));
        },
        removeFromLocalWishlist(state, action: PayloadAction<{ productId: number }>) {
            const { productId } = action.payload;
            
            state.localWishList = state.localWishList.filter(item => item !== productId);
            
            localStorage.setItem('localWishList', JSON.stringify(state.localWishList));
        },
        setWishListTriggered: (state, action: PayloadAction<boolean>) => {
            state.wishlistTriggered = action.payload;
        }
    },
});

export const { setWishlistItems, removeWishlistItem, setLoading, setError, setLocalWishlistItems, removeFromLocalWishlist, setWishListTriggered } = wishlistSlice.actions;

export default wishlistSlice.reducer;