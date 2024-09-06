import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IWishlistItem } from '../types/products';

interface WishlistState {
    localWishList: any[];
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
        setLocalWishlistItems(state, action: PayloadAction<{ product: IWishlistItem }>) {
            const { product } = action.payload;

            const index = state.localWishList.findIndex(item => item?.id === product?.id);

            if (index === -1) {                
                state.localWishList.push(product);
            } else {                
                state.localWishList.splice(index, 1);
            }

            localStorage.setItem('localWishList', JSON.stringify(state.localWishList));
        },
        removeFromLocalWishlist(state, action: PayloadAction<{ productId: number }>) {
            const { productId } = action.payload;
            
            state.localWishList = state.localWishList.filter(item => item?.id !== productId);
            
            localStorage.setItem('localWishList', JSON.stringify(state.localWishList));
        },
    },
});

export const { setWishlistItems, removeWishlistItem, setLoading, setError, setLocalWishlistItems, removeFromLocalWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;