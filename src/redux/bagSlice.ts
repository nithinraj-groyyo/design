import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BagItemVariant {
  id: number;
  quantity: number;
  productColor: {
    id: number;
    color: {
      id: number;
      name: string;
    };
  };
  productSize: {
    id: number;
    size: {
      id: number;
      name: string;
    };
  };
}

export interface BagItem {
  id: number;
  price: number;
  totalQuantity: number;
  product: {
    id: number;
    name: string;
    imageData: {
      id: number,
      sideName: string,
      isThumbnail: boolean,
      fileId: number,
      fileName: string,
      imageUrl: string,
      signedUrl: string
  };
    styleName: string;
    description: string;
    isPublic: boolean;
    isProductActive: boolean;
    leftTopHeader: string;
    leftTopContent: string;
    leftBottomHeader: string;
    leftBottomContent: string;
    productPrices: {
      id: number,
      minQty: number,
      maxQty: number,
      pricePerPiece: number,
    }[]
  };
  cartItemVariants: BagItemVariant[];
}

interface ShoppingBagState {
  cart: BagItem[];
  savedForLater: BagItem[];
  totalPrice: number;
  selectedCart: BagItem | null;
}

const initialState: ShoppingBagState = {
  cart: [],
  savedForLater: [],
  totalPrice: 0,
  selectedCart: null
};

const bagSlice = createSlice({
  name: 'bag',
  initialState,
  reducers: {
  setSelectedCart(state, action: PayloadAction<BagItem | null>) {
    state.selectedCart = action.payload;
  },
  setCartItems(state, action: PayloadAction<BagItem[]>) {    
    state.cart = action.payload;
    
    state.totalPrice = state.cart.reduce(
      (total, item) =>
        total +
        item.price * item.cartItemVariants.reduce((qty, v) => qty + v.quantity, 0),
      0
    );
  },
  updateQuantity(
    state,
    action: PayloadAction<{ cartItemId: number; variantId: number; quantity: number }>
  ) {
    const { cartItemId, variantId, quantity } = action.payload;
      
    const cartItem = state.cart.find((item) => item.id === cartItemId);
  
    if (cartItem) {      
      const variant = cartItem.cartItemVariants.find((v) => v.id === variantId);
      if (variant) {        
        variant.quantity = quantity;
          
        cartItem.totalQuantity = cartItem.cartItemVariants.reduce(
          (total, item) => total + item.quantity,
          0
        );
          
        if (state.selectedCart?.id === cartItemId) {
          const selectedCartVariant = state.selectedCart.cartItemVariants.find(
            (v) => v.id === variantId
          );
          if (selectedCartVariant) {
            selectedCartVariant.quantity = quantity;
                        
            state.selectedCart.totalQuantity = state.selectedCart.cartItemVariants.reduce(
              (total, item) => total + item.quantity,
              0
            );
          }
        }
  
        state.totalPrice = state.cart.reduce(
          (total, item) =>
            total +
            item.price * item.cartItemVariants.reduce((qty, v) => qty + v.quantity, 0),
          0
        );
      }
    }
  },
    removeFromCart(state, action: PayloadAction<number>) {
      state.cart = state.cart.filter((item) => item.id !== action.payload);      
      state.totalPrice = state.cart.reduce(
        (total, item) =>
          total +
          item.price * item.cartItemVariants.reduce((qty, v) => qty + v.quantity, 0),
        0
      );
    },
    moveToSavedForLater(state, action: PayloadAction<number>) {
      const cartItem = state.cart.find((item) => item.id === action.payload);
      if (cartItem) {
        state.savedForLater.push(cartItem);
        state.cart = state.cart.filter((item) => item.id !== action.payload);        
        state.totalPrice = state.cart.reduce(
          (total, item) =>
            total +
            item.price * item.cartItemVariants.reduce((qty, v) => qty + v.quantity, 0),
          0
        );
      }
    },
    restoreToCart(state, action: PayloadAction<number>) {
      const savedItem = state.savedForLater.find((item) => item.id === action.payload);
      if (savedItem) {
        state.cart.push(savedItem);
        state.savedForLater = state.savedForLater.filter((item) => item.id !== action.payload);        
        state.totalPrice = state.cart.reduce(
          (total, item) =>
            total +
            item.price * item.cartItemVariants.reduce((qty, v) => qty + v.quantity, 0),
          0
        );
      }
    },
  },
});

export const {setCartItems, setSelectedCart, removeFromCart, updateQuantity, moveToSavedForLater, restoreToCart } = bagSlice.actions;
export default bagSlice.reducer;