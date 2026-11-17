import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { errorHandler } from "../../utils/validation-error";
import { overviewService } from "./overviewService";

export const overviewAction = createAsyncThunk(
  "overview/orders",
  async (_, thunkAPI) => {
    try {
      return await overviewService.getAllOrders();
    } catch (error) {
      console.debug(error);
      const message = errorHandler(error);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const getOrderAction = createAsyncThunk(
  "overview/order",
  async ({ id }, thunkAPI) => {
    try {
      return await overviewService.getOrder(id);
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
  order: null,
  page: 1,
  total: 10,
  isError: false,
  error: "",
};

const overviewSlice = createSlice({
  name: "overview",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    reset: (state) => {
      state.isLoading = false;
      state.data = null;
      state.page = 1;
      state.order = null;
      state.total = 10;
      state.isError = false;
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(overviewAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(overviewAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
        state.total = action.payload.total;
      })
      .addCase(overviewAction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      })
      .addCase(getOrderAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload.data;
      })
      .addCase(getOrderAction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      });
  },
});

export const { reset, setPage } = overviewSlice.actions;
export default overviewSlice.reducer;
