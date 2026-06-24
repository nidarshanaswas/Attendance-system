// import { fetchAdminAttendanceApi } from "./adminAttendanceApi";
// // import { loading, success, error } from "./adminAttendanceSlice";
// import { createAsyncThunk } from "@reduxjs/toolkit";
// // export const fetchAdminAttendance = (employeeId) => async (dispatch) => {


// //   try {
// //     dispatch(loading());

// //     const data = await fetchAdminAttendanceApi(employeeId);

// //     console.log("API RESPONSE", data);

// //     const attendance =
// //       data?.myAttendance ||
// //       data?.data?.myAttendance ||
// //       data?.result ||
// //       data ||
// //       [];

// //     dispatch(success(Array.isArray(attendance) ? attendance : []));
// //   } catch (err) {
// //     dispatch(error(err.message));
// //   }
// // };


import { fetchAdminAttendanceApi } from "./adminAttendanceApi";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAdminAttendance = createAsyncThunk(
  "adminAttendance/fetch",
  async (params, { rejectWithValue }) => {
    try {
      const res = await fetchAdminAttendanceApi(params);

      console.log("API RESPONSE ", res);

      return {
        data: res.attendance || [],
        currentPage: res?.page ?? params.page ?? 1,
        totalPages: res.totalPages ?? 1, 
        totalRecords: res.totalRecords
      };

    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);