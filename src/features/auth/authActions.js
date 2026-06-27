import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi } from "./authApi";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (payload, { rejectWithValue }) => {
    try {
      return await loginApi(payload);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

