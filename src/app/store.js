import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import attendanceReducer from "../features/attendance/attendanceSlice"
import adminAttendanceReducer from "../features/adminAttendance/adminAttendanceSlice";
import loaderReducer from "../features/loader/loaderSlice"
import employeesReducer from "../features/employees/employeesSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    attendance: attendanceReducer,
    myAttendance: adminAttendanceReducer,
    loader: loaderReducer,
    employees: employeesReducer,
  },
});