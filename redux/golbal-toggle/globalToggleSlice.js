import { createSlice } from "@reduxjs/toolkit";

const globalToggleSlice = createSlice({
  name: "global-toggle",
  initialState: {
    toggle: false,
    openCart: false,
  },
  reducers: {
    onToggle: (state, action) => {
      state.toggle = action.payload;
    },

    cartToggle: (state, action) => {
      state.openCart = action.payload;
    },
  },
});

export const { onToggle, cartToggle } = globalToggleSlice.actions;

export default globalToggleSlice.reducer;
