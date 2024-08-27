import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProductResponse } from "../types/products";

interface ProductsState {
    productData: {
        products: IProductResponse[];
        loading: boolean;
        error: string | null;
    };
}

const initialState: ProductsState = {
    productData: {
        products: [],
        loading: false,
        error: null,
    },
};

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setProductsLoading(state) {
            state.productData.loading = true;
        },
        setProductsSuccess(state, action: PayloadAction<IProductResponse[]>) {
            state.productData.loading = false;
            state.productData.products = action.payload;
        },
        setProductsFailure(state, action: PayloadAction<string>) {
            state.productData.loading = false;
            state.productData.error = action.payload;
        }
    }
});

export const { setProductsLoading, setProductsSuccess, setProductsFailure } = productsSlice.actions;

export default productsSlice.reducer;