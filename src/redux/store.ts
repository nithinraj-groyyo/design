import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import categoriesSlice from "./categoriesSlice";
import productsSlice from "./productsSlice";
import productSizeSlice from "./productSizeSlice";
import cartSlice from "./cartSlice";
import shoppingBagSlice from "./shoppingBagSlice";
import wishlistSlice from "./wishlistSlice";
import bagSlice from "./bagSlice";
import userSlice from "./userSlice";
import apiSlice from '../rtk-query/apiSlice';
import userApiSlice from '../rtk-query/userApiSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [userApiSlice.reducerPath]: userApiSlice.reducer,
    categories: categoriesSlice,
    products: productsSlice,
    productSize: productSizeSlice,
    cart: cartSlice,
    shoppingBag: shoppingBagSlice,
    wishlist: wishlistSlice,
    bag: bagSlice,
    user: userSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiSlice.middleware) 
      .concat(userApiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
