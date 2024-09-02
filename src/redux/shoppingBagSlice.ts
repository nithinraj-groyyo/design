import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IShoppingCartSize {
    cartId: number;
    size: string;
    quantity: number;
    price: string;
    subTotal: string;
}

interface Product {
    id: number;
    categoryId: number;
    name: string;
    OtherCategoryId: number;
    StyleName: string;
    ImageFolderLink: string | null;
    CoverImageLink: string | null;
    description: string;
    price: string;
    isDelete: boolean;
    status: boolean;
    leftHeading1: string;
    leftHeading1Content: string;
    leftHeading2: string;
    leftHeading2Content: string;
    createdDate: string;
    createdBy: string;
    modifiedDate: string | null;
    modifiedBy: string | null;
    ProductImages: {
        id: number;
        productId: number;
        fileName: string;
        filePath: string;
        side: string;
    }[];
    productSizes: {
        id: number;
        productId: number;
        sizeName: string;
    }[];
    ProductPricings: {
        id: number;
        MinQuantity: number;
        MaxQuantity: number;
        Price: string;
        productId: number;
    }[];
    WishLists: any[];
}

interface CartItem {
    productId: number;
    product: Product;
    sizes: IShoppingCartSize[];
}

interface ShoppingBagState {
    cart: {
        data: CartItem[];
        badge: number;
        totalPrice: number;
        savedItems: any[];
    };
    loading: boolean;
    error: string | null;
}

const initialState: ShoppingBagState = {
    cart: {
        data: [],
        badge: 0,
        totalPrice: 0,
        savedItems: []
    },
    loading: false,
    error: null
};

const shoppingBagSlice = createSlice({
    name: 'shoppingBag',
    initialState,
    reducers: {
        setCartData: (state, action: PayloadAction<ShoppingBagState>) => {
            state.cart = action.payload.cart;
            state.loading = false;
        },
        clearCart: (state) => {
            state.cart.data = [];
            state.cart.badge = 0;
            state.cart.totalPrice = 0;
            state.cart.savedItems = [];
            state.loading = false;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
            state.loading = false;
        },
        updateWishList: (state, action:PayloadAction<{isInCart: boolean, productId: number, isInWishlist: boolean}>) => {
            const {isInCart, productId, isInWishlist} = action.payload;
            
            if(isInCart){
                const product = state.cart.data?.find((p) => p.productId === productId);
                if(product){
                    product.product.WishLists = isInWishlist ? [] : [{productId}]
                }
            }
            else{
                const product = state.cart.savedItems?.find((p) => p.productId === productId);
                if(product){
                    product.product.WishLists = isInWishlist ? [] : [{productId}]
                }
            }
        }
    },
});

export const { setCartData, clearCart, setLoading, setError, updateWishList } = shoppingBagSlice.actions;

export default shoppingBagSlice.reducer;