import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { errorHandler } from "../../utils/validation-error";
import { complaintService } from "./complaintService";

export const createTicketAction = createAsyncThunk(
  "complaint/create-ticket",
  async ({ payload }, thunkAPI) => {
    try {
      return await complaintService.createTicket(payload);
    } catch (error) {
      console.debug(error);
      const message = errorHandler(error);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const getAllTicketsAction = createAsyncThunk(
  "complaint/get-all",
  async ({ params }, thunkAPI) => {
    try {
      return await complaintService.getAllComplaints(params);
    } catch (error) {
      console.debug(error);
      const message = errorHandler(error);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const getTicketAction = createAsyncThunk(
  "complaint/ticket",
  async ({ id }, thunkAPI) => {
    try {
      return await complaintService.getComplaint(id);
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
  ticket: null,
  page: 1,
  total: 10,
  isError: false,
  error: "",
};

const complaintSlice = createSlice({
  name: "complaint",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    reset: (state) => {
      state.isLoading = false;
      state.data = null;
      state.ticket = null;
      state.page = 1;
      state.total = 10;
      state.isError = false;
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTicketAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTicketAction.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.success(action.payload.message ?? 'Complaint ticket create sucessfull.')
        action.meta.arg.router.push('/profile/complaints')
      })
      .addCase(createTicketAction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      })
      .addCase(getAllTicketsAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllTicketsAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
        state.total = action.payload.total;
      })
      .addCase(getAllTicketsAction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      })
      .addCase(getTicketAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTicketAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ticket = action.payload.data;
      })
      .addCase(getTicketAction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      });
  },
});

export const { reset, setPage } = complaintSlice.actions;
export default complaintSlice.reducer;
