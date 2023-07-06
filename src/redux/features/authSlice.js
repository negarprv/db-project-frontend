import { createSlice } from "@reduxjs/toolkit";
import { login } from "../api/login";

const initialState = {
  loading: false,
  userInfo: {},
  userToken: null,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.success = true;
      state.userInfo = action.payload;
    });

    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });

    // [login.fulfilled]: (state, { payload }) => {
    //   state.loading = false;
    //   state.success = true;
    //   state.userToken = state.accessToken;
    //   state.userInfo = state.user;
    // },
  },
});

export default authSlice.reducer;
