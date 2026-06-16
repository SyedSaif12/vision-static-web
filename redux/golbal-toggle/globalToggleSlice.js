import { createSlice } from "@reduxjs/toolkit";

const globalToggleSlice = createSlice({
  name: "global-toggle",
  initialState: {
    toggle: false,
  },
  reducers: {
    onToggle: (state, action) => {
      state.toggle = action.payload;
    },
  },
});

export const { onToggle } = globalToggleSlice.actions;

export default globalToggleSlice.reducer;
