import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { StorageKey } from "@/lib/utils";
import { baseURL } from "../utils";
import dayjs from "dayjs";
import userService from "./userService";
import { errorHandler } from "../utils/validation-error";

const storageKeys = StorageKey();

const isValid = async () => {
  const authTokens = JSON.parse(Cookies.get(storageKeys.tokens) ?? "{}");
  const isExpired = new Date() > new Date(authTokens?.tokenExpirationDate);
  if (!isExpired) {
    return;
  }
  try {
    const response = await axios.post(`${baseURL}users/refresh`, {
      token: authTokens.refreshToken,
    });

    if (response?.data?.data?.tokens) {
      const expirationTime = dayjs(
        data?.data?.tokens?.tokenExpirationDate,
      ).toDate();
      Cookies.set(
        storageKeys.tokens,
        JSON.stringify(response?.data?.data?.tokens),
        {
          expires: expirationTime,
        },
      );
      return;
    }
  } catch (error) {
    console.debug("error", error);
  }
  Cookies.remove(storageKeys.tokens);
  Cookies.remove(storageKeys.tokens);
  window.location.replace("/accounts/login");
};

const user = JSON.parse(Cookies.get(storageKeys.user) ?? "{}");

(async () => {
  if (!user?.role) {
    await isValid();
  }
})();

// Update user
export const updateUser = createAsyncThunk(
  "user/update",
  async ({ id, payload }, thunkAPI) => {
    try {
      return await userService.updateUser(id, payload);
    } catch (error) {
      console.debug(error);
      const message = errorHandler(error);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// logout user
export const logout = createAsyncThunk("user/logout", async (_, thunkAPI) => {
  try {
    return await userService.logoutUser();
  } catch (error) {
    console.debug(error);
    const message = errorHandler(error);
    return thunkAPI.rejectWithValue(message);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: user ?? null,
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
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const user = JSON.stringify(action.payload.data);
        Cookies.set(storageKeys.user, user);
        state.loading = false;
        state.data = action.payload?.data;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.data = null;
        Cookies.remove(storageKeys.user);
        Cookies.remove(storageKeys.tokens);
        state.loading = false;
        window.location.href = "/";
        // action.meta.arg.navigate("/");
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setUserData, setIsSeller, clearUser } = userSlice.actions;
export default userSlice.reducer;
