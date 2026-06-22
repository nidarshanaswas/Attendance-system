import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "./authActions";

const initialState = {
  user: null,
  status: "idle",
  error: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;

        // localStorage.setItem(
        //   "login_user",
        //   JSON.stringify(action.payload.user)
        // );
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;