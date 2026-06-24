import { createSlice } from "@reduxjs/toolkit";
import { fetchAdminAttendance } from "./adminAttendanceActions";

const adminAttendanceSlice = createSlice({
  name: "myAttendance",
  initialState: {
    data: [],
    loading: false,
    error: null,

    totalPages: 1,
    currentPage: 1,
    totalRecords: 0
  },
  reducers: {},


  extraReducers: (builder) => {
    builder
    .addCase(fetchAdminAttendance.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchAdminAttendance.fulfilled, (state, action) => {
  state.loading = false;

  state.data = action.payload.data;
  state.currentPage = action.payload.currentPage;
  state.totalPages = action.payload.totalPages;
  state.totalRecords = action.payload.totalRecords;
})
    .addCase(fetchAdminAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

  }
});

export default adminAttendanceSlice.reducer;