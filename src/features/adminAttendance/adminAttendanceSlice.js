import { createSlice } from "@reduxjs/toolkit";
import { fetchAdminAttendance, fetchAttendanceList, fetchDashboardDataApi, fetchDashboardDataThunk, fetchDashboardTableApi } from "./adminAttendanceActions";
import { saveManualAttendance } from "./adminAttendanceActions";
import { fetchDashboardTable } from "./adminAttendanceApi";

const adminAttendanceSlice = createSlice({
  name: "myAttendance",
  initialState: {
    data: [],
    listData: [],
    dashboard: null,
    dashboardTable: [],
    loading: false,
    error: null,

    totalPages: 1,
    currentPage: 1,
    totalRecords: 0,
      manualEntry: null,
  manualLoading: false,
  manualError: null
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
      })

      .addCase(fetchAttendanceList.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchAttendanceList.fulfilled, (state, action) =>{
        state.loading = false;

        state.listData = action.payload.data;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.totalRecords = action.payload.totalRecords;
      })
      .addCase(fetchAttendanceList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
      })

      .addCase(fetchDashboardDataThunk.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchDashboardDataThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboard = action.payload;
        state.error = null;
      })

      .addCase(fetchDashboardDataThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
      })

      .addCase(fetchDashboardTableApi.pending, (state) => {
        state.loading = true;
      })
      
      .addCase(fetchDashboardTableApi.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboardTable = action.payload;
        state.error = null
      })

      .addCase(fetchDashboardTableApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
      })


.addCase(saveManualAttendance.pending, (state) => {
    state.manualLoading = true;
    state.manualError = null;
})

.addCase(saveManualAttendance.fulfilled, (state, action) => {
    state.manualLoading = false;
    state.manualEntry = action.payload;

    // Optional
    if (action.payload?.data) {
        state.listData.unshift(action.payload.data);
    }
})

.addCase(saveManualAttendance.rejected, (state, action) => {
    state.manualLoading = false;
    state.manualError = action.payload;
});

  },

  

});

export default adminAttendanceSlice.reducer;