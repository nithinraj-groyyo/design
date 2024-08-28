import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SizeAndQuantity {
    sizeId: number;
    sizeName: string;
    quantity: number;
    price: number;
}

interface ProductSizeState {
    productId: number | null;
    items: SizeAndQuantity[];
}

const initialState: ProductSizeState = {
    productId: null,
    items: [],
};

const productSizeSlice = createSlice({
    name: 'productSize',
    initialState,
    reducers: {
        setProduct: (state, action: PayloadAction<number>) => {
            if (state.productId !== action.payload) {
                state.productId = action.payload;
                state.items = [];
            }
        },
        addItem: (state, action: PayloadAction<SizeAndQuantity>) => {
            const existingItem = state.items.find(item => item.sizeId === action.payload.sizeId);
            if (existingItem) {
                existingItem.quantity += action.payload.quantity;
            } else {
                state.items.push(action.payload);
            }
        },
        removeItem: (state, action: PayloadAction<number>) => {
            const index = state.items.findIndex(item => item.sizeId === action.payload);
            if (index !== -1) {
                state.items.splice(index, 1);
            }
        },
        updateQuantity: (state, action: PayloadAction<{ sizeId: number; quantity: number }>) => {
            const item = state.items.find(item => item.sizeId === action.payload.sizeId);
            if (item) {
                item.quantity = action.payload.quantity;
            }
        },
        resetState: (state) => {
            state.productId = null;
            state.items = [];
        },
    },
});

export const { setProduct, addItem, removeItem, updateQuantity, resetState } = productSizeSlice.actions;

export default productSizeSlice.reducer;