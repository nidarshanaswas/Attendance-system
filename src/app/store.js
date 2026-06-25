import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import attendanceReducer from "../features/attendance/attendanceSlice"
import adminAttendanceReducer from "../features/adminAttendance/adminAttendanceSlice";
import loaderReducer from "../features/loader/loaderSlice"
export const store = configureStore({
  reducer: {
    auth: authReducer,
    attendance: attendanceReducer,
    myAttendance: adminAttendanceReducer,
    loader: loaderReducer,

  },
});