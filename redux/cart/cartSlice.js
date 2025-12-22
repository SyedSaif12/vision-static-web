import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: {},
  },
  reducers: {
    addToCart: (state, action) => {
      const { itemId, quantity } = action.payload;
      if (state.items[itemId]) {
        state.items[itemId] += quantity;
      } else {
        state.items[itemId] = quantity;
      }
    },

    updateCartQuantity: (state, action) => {
      const { itemId, quantity } = action.payload;
      if (quantity === 0) {
        delete state.items[itemId];
      } else {
        state.items[itemId] = quantity;
      }
    },

    removeFromCart: (state, action) => {
      const itemId = action.payload;
      delete state.items[itemId];
    },

    clearCart: (state) => {
      state.items = {};
    },

    setCartItems: (state, action) => {
      state.items = action.payload;
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
  return Object.values(state.cart.items).reduce((total, quantity) => {
    return quantity > 0 ? total + quantity : total;
  }, 0);
};

export const getCartAmount = (state) => {
  const { products } = state;
  let totalAmount = 0;

  for (const [itemId, quantity] of Object.entries(state.cart.items)) {
    if (quantity > 0) {
      const itemInfo = products.items.find((product) => product._id === itemId);
      if (itemInfo) {
        totalAmount += itemInfo.offerPrice * quantity;
      }
    }
  }

  return Math.floor(totalAmount * 100) / 100;
};

export default cartSlice.reducer;
