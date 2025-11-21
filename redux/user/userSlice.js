import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userService } from "../user/userService";

export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await userService.getUserData();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: null,
    isSeller: true,
    loading: false,
    error: null,
  },
  reducers: {
    setUserData: (state, action) => {
      state.data = action.payload;
    },
    setIsSeller: (state, action) => {
      state.isSeller = action.payload;
    },
    clearUser: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setUserData, setIsSeller, clearUser } = userSlice.actions;
export default userSlice.reducer;
