import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { errorHandler } from "../utils/validation-error";
import orderService from "./checkoutService";

// place order (POST)
export const placeOrder = createAsyncThunk(
  "order/post",
  async ({ payload }, thunkAPI) => {
    try {
      return await orderService.placeOrder(payload);
    } catch (error) {
      console.debug(error);
      const message = errorHandler(error);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// find All orders (GET)
export const getOrders = createAsyncThunk(
  "order/getAll",
  async (params, thunkAPI) => {
    try {
      const state = thunkAPI.getState()
      const { page } = state.orders
      const finalParams = {...params, page }
      return await orderService.getorders(finalParams);
    } catch (error) {
      console.debug(error);
      const message = errorHandler(error);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// find All orders (GET)
export const getOrder = createAsyncThunk(
  "order/get",
  async ({ id }, thunkAPI) => {
    try {
      return await orderService.getorder(id);
    } catch (error) {
      console.debug(error);
      const message = errorHandler(error);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

const initialState = {
  isLoading: false,
  data: null,
  page: 1,
  total: 10,
  isError: false,
  error: ''
}

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload
    },
    reset: (state) => {
      state.isLoading = false
      state.data = null
      state.page = 1
      state.total = 10
      state.isError = false
      state.error = ''
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(placeOrder.pending, (state) => {
      state.isLoading = true
    })
    .addCase(placeOrder.fulfilled, (state, action) => {
      state.isLoading = false
      state.data = action.payload.data
      state.total = action.payload.total
    })
    .addCase(placeOrder.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.error = action.payload
    })
  }
})


export const { reset, setPage } = orderSlice.actions;
export default orderSlice.reducer;