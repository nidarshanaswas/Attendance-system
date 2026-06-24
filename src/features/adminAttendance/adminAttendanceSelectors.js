export const selectAttendance = (state) => state.myAttendance.data;
export const selectLoading = (state) => state.myAttendance.loading;
export const selectError = (state) => state.myAttendance.error;

export const selectTotalPages = (state) => state.myAttendance.totalPages;
export const selectCurrentPage = (state) => state.myAttendance.currentPage;
export const selectTotalRecords = (state) => state.myAttendance.totalRecords;