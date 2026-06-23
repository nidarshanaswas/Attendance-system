import { createSlice } from "@reduxjs/toolkit";

const adminAttendanceSlice = createSlice({
  name: "attendance",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    loading: (state) => {
      state.loading = true;
    },
    success: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    error: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { loading, success, error } = adminAttendanceSlice.actions;
export default adminAttendanceSlice.reducer;