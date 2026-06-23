export const selectAttendance = (state) => state.attendance?.data || [];
export const selectLoading = (state) => state.attendance?.loading || false;
export const selectError = (state) => state.attendance?.error || null;