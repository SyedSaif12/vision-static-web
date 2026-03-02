import { createSlice } from "@reduxjs/toolkit";
export const getStorageKey = process.env.NEXT_PUBLIC_CART_KEY;
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: {}, // { [id]: { product: {...}, quantity: number } }
  },
  reducers: {
    addToCart: (state, action) => {
      const { id, quantity = 1, ...productData } = action.payload;

      const existingCart =
        JSON.parse(localStorage.getItem(getStorageKey)) ?? {};

      //  Update cart object (same structure)
      if (existingCart[id]) {
        existingCart[id].quantity += quantity;
      } else {
        existingCart[id] = {
          product: { id, ...productData },
          quantity: quantity,
        };
      }

      //  Save back to localStorage
      localStorage.setItem(getStorageKey, JSON.stringify(existingCart));

      //  Sync redux state
      state.items = existingCart;
    },

    updateCartQuantity: (state, action) => {
      const { itemId, quantity } = action.payload;
      const existingCart =
        JSON.parse(localStorage.getItem(getStorageKey)) || {};
      if (quantity === 0) {
        delete state.items[itemId];
      } else if (existingCart[itemId]) {
        existingCart[itemId].quantity = quantity;
        localStorage.setItem(getStorageKey, JSON.stringify(existingCart));
        state.items = existingCart;
      }
    },

    removeFromCart: (state, action) => {
      const itemId = action.payload;
      const existingCart =
        JSON.parse(localStorage.getItem(getStorageKey)) || {};
      delete existingCart[itemId];
      localStorage.setItem(getStorageKey, JSON.stringify(existingCart));
      state.items = existingCart;
    },

    clearCart: (state) => {
      const existingCart =
        JSON.parse(localStorage.getItem(getStorageKey)) || {};
      const cart = {};
      localStorage.setItem(getStorageKey, JSON.stringify(cart));
      state.items = {};
    },

    setCartItems: (state, action) => {
      state.items = action.payload;
      localStorage.setItem(getStorageKey, JSON.stringify(action.payload));
    },
  },
});

export const {
  addToCart,
  updateCartQuantity,
  removeFromCart,
  clearCart,
  setCartItems,
} = cartSlice.actions;

// Selectors
export const getCartCount = (state) => {
  return Object.entries(state.cart.items).length ?? 0;
};

export const getCartAmount = (state) => {
  let totalAmount = 0;

  for (const item of Object.values(state.cart.items)) {
    if (item.quantity > 0 && item.product) {
      const price = item.product.price || 0;
      totalAmount += price * item.quantity;
    }
  }

  return Math.floor(totalAmount * 100) / 100;
};

export default cartSlice.reducer;
