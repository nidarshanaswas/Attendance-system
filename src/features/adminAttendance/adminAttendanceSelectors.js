export const selectAttendance = (state) => state.myAttendance.data;
export const selectAttendanceList = (state) => state.myAttendance.listData;
export const selectLoading = (state) => state.myAttendance.loading;
export const selectError = (state) => state.myAttendance.error;
export const selectDashboard = (state) => state.myAttendance.dashboard
export const selectDashboardTable = (state) => state.myAttendance.dashboardTable


export const selectTotalPages = (state) => state.myAttendance.totalPages;
export const selectCurrentPage = (state) => state.myAttendance.currentPage;
export const selectTotalRecords = (state) => state.myAttendance.totalRecords;

export const selectManualEntry = (state) => state.adminAttendance.manualEntry;

export const selectManualLoading = (state) => state.adminAttendance.manualLoading;

export const selectManualError = (state) => state.adminAttendance.manualError;
