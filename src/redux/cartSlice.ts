import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  id: string;
  productid: number;
  userid: string;
  size: string;
  quantity: number;
  price: number;
}

interface CartState {
  items: CartItem[];
  updateCartApi: boolean;
  finalCount: number;
}

const initialState: CartState = {
  items: [],
  updateCartApi: false,
  finalCount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      state.items.push(action.payload);
    },
    updateItemQuantity(state, action: PayloadAction<{ id: string; quantity: number; price: number }>) {
      const { id, quantity, price } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        item.quantity = quantity;
        item.price = price;
      }
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    emptyCart(state) {
      state.items = [];
    },
    setUpdateCartApi(state, action: PayloadAction<boolean>) {
      state.updateCartApi = action.payload;
    },
    setFinalCount(state, action: PayloadAction<number>) {
      state.finalCount = action.payload;
    },
  },
});

export const { addItem, updateItemQuantity, removeItem, emptyCart, setUpdateCartApi, setFinalCount } = cartSlice.actions;

export default cartSlice.reducer;
