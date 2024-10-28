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
  unitPrice: number
}

interface ShoppingBagState {
  cart: {
    totalPrice: number;
    data: BagItem[];
    cartId: number
  };
  savedForLater: BagItem[];
  selectedCart: BagItem | null;
}

const calculateTotalPrice = (items: BagItem[]) => {
  return items.reduce(
    (total, item) =>
      total +
      item.price * item.cartItemVariants.reduce((qty, v) => qty + v.quantity, 0),
    0
  );
};

const initialState: ShoppingBagState = {
  cart: {
    totalPrice: 0,
    data: [],
    cartId: 0
  },
  savedForLater: [],
  selectedCart: null
};

const bagSlice = createSlice({
  name: 'bag',
  initialState,
  reducers: {
    setSelectedCart(state, action: PayloadAction<BagItem | null>) {
      state.selectedCart = action.payload;
    },
    setCartItems(state, action: PayloadAction<{totalPrice: number, data: BagItem[], cartId: number}>) {
      state.cart.data = action.payload.data;
      state.cart.cartId = action.payload.cartId;
      state.cart.totalPrice = action.payload.totalPrice;
    },
    updateQuantity(
      state,
      action: PayloadAction<{ cartItemId: number; variantId: number; quantity: number }>
    ) {
      const { cartItemId, variantId, quantity } = action.payload;
    
      // Check if selectedCart exists and matches cartItemId
      if (state.selectedCart?.id === cartItemId) {
        const selectedCartVariant = state.selectedCart.cartItemVariants.find(
          (v) => v.id === variantId
        );
    
        if (selectedCartVariant) {
          selectedCartVariant.quantity = quantity;
    
          // Calculate the updated total quantity for the selected cart item
          state.selectedCart.totalQuantity = state.selectedCart.cartItemVariants.reduce(
            (total, item) => total + item.quantity,
            0
          );
    
          // Determine the applicable price per piece based on the quantity range
          const applicablePrice = state.selectedCart.product.productPrices.find((priceRange) => {
            return (
              state.selectedCart!.totalQuantity >= priceRange.minQty &&
              (priceRange.maxQty === null || state.selectedCart!.totalQuantity <= priceRange.maxQty)
            );
          });
    
          // Update the unit price if applicablePrice is found
          if (applicablePrice) {
            state.selectedCart.unitPrice = applicablePrice.pricePerPiece;
          }
    
          // Recalculate the total price for the entire cart
          state.cart.totalPrice = state.cart.data.reduce(
            (total, item) =>
              item.id === state.selectedCart!.id
                ? total +
                  (state.selectedCart!.unitPrice || 0) *
                    state.selectedCart!.cartItemVariants.reduce((qty, v) => qty + v.quantity, 0)
                : total + item.price * item.cartItemVariants.reduce((qty, v) => qty + v.quantity, 0),
            0
          );
        }
      }
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.cart.data = state.cart.data.filter((item) => item.id !== action.payload);
      state.cart.totalPrice = calculateTotalPrice(state.cart.data);
    },
    moveToSavedForLater(state, action: PayloadAction<number>) {
      const cartItem = state.cart.data.find((item) => item.id === action.payload);
      if (cartItem) {
        state.savedForLater.push(cartItem);
        state.cart.data = state.cart.data.filter((item) => item.id !== action.payload);
        state.cart.totalPrice = calculateTotalPrice(state.cart.data);
      }
    },
    restoreToCart(state, action: PayloadAction<number>) {
      const savedItem = state.savedForLater.find((item) => item.id === action.payload);
      if (savedItem) {
        state.cart.data.push(savedItem);
        state.savedForLater = state.savedForLater.filter((item) => item.id !== action.payload);
        state.cart.totalPrice = calculateTotalPrice(state.cart.data);
      }
    },
  },
});

export const {
  setCartItems,
  setSelectedCart,
  removeFromCart,
  updateQuantity,
  moveToSavedForLater,
  restoreToCart,
} = bagSlice.actions;

export default bagSlice.reducer;