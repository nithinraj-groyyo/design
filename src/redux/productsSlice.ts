import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProductResponse } from "../types/products";

interface ProductsState {
    productData: {
        products: IProductResponse[];
        loading: boolean;
        error: string | null;
    };
    singleProductData: {
        product: IProductResponse | null;
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
    singleProductData: {
        product: null,
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
        },
        setSingleProductLoading(state) {
            state.singleProductData.loading = true;
        },
        setSingleProductSuccess(state, action: PayloadAction<IProductResponse>) {
            state.singleProductData.loading = false;
            state.singleProductData.product = action.payload;
        },
        setSingleProductFailure(state, action: PayloadAction<string>) {
            state.singleProductData.loading = false;
            state.singleProductData.error = action.payload;
        },
        clearSingleProduct(state) {
            state.singleProductData.product = null;
            state.singleProductData.error = null;
            state.singleProductData.loading = false;
        },
        updateProductWishlist(state, action: PayloadAction<{ productId: number; isInWishlist: boolean }>) {
            const { productId, isInWishlist } = action.payload;
            const product = state.productData.products.find(p => p.id === productId);
            if (product) {
                product.WishLists = isInWishlist ? [{ productId }] : [];
            }
        },
        updateSingleProductWishlist(state, action: PayloadAction<{ isInWishlist: boolean; productId: number; }>) {
            const { isInWishlist, productId } = action.payload;
            if (state.singleProductData.product) {
                state.singleProductData.product.WishLists = isInWishlist ? [{ productId }] : [];
            }
        },
    }
});

export const {
    setProductsLoading,
    setProductsSuccess,
    setProductsFailure,
    setSingleProductLoading,
    setSingleProductSuccess,
    setSingleProductFailure,
    clearSingleProduct,
    updateProductWishlist, 
    updateSingleProductWishlist
} = productsSlice.actions;

export default productsSlice.reducer;