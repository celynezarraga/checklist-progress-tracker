import { createSlice } from "@reduxjs/toolkit";
import { UserApiResponse } from "../types/user";
import { loginUser, registerUser } from "./userActions";
import { deleteToken } from "@/common/utils/session";

interface UserData {
  loading: boolean,
  info?: UserApiResponse,
  token?: string,
  error?: string,
  success: boolean,
}

const initialState: UserData = {
  loading: false,
  info: undefined,
  token: undefined,
  error: undefined,
  success: false,
};


export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: () => {
      deleteToken();
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = undefined;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.info = action.payload;
        state.token = action.payload.token;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        // @ts-ignore
        state.error = action.payload.message;
      });

    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = undefined;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.info = action.payload;
        state.token = action.payload.token;
        state.success = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        // @ts-ignore
        state.error = action.payload.message;
      });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;