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
  import { fetchAttendanceListApi } from "./adminAttendanceApi";
  import { fetchDashboardData } from "./adminAttendanceApi";
  import { fetchDashboardTable } from "./adminAttendanceApi";
  import { createAsyncThunk } from "@reduxjs/toolkit";
  import { saveManualAttendanceApi } from "./adminAttendanceApi";
  // import { fetchEmployeeEmailsApi } from "./adminAttendanceApi";
  // import { fetchEmployeeDetailsApi } from "./adminAttendanceApi";


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

  export const fetchAttendanceList = createAsyncThunk(
    "attendanceList/fetch",
    async (params, { rejectWithValue }) => {
      try {
        const res = await fetchAttendanceListApi(params);

        console.log("LIST RESPONSE", res);

        return {
          data: res.data || res.attendance || res.employee ||[],
          currentPage: res.page || res.currentPage || params.page || 0,
          totalPages: res.totalPages || res.pagination?.totalPages|| 1,
          totalRecords: res.totalRecords || res.pagination?.totalRecords || 0
        };

      } catch (err) {
        return rejectWithValue(err.message);
      }
    }
  );

  export const fetchDashboardDataThunk = createAsyncThunk(
    "attendance/dashboard",
    async (employeeId, {rejectWithValue}) => {
      try{
        const res = await fetchDashboardData(employeeId);
        return res;
      }catch(err){
        return  rejectWithValue(err.message);
      }
    }
  );

export const fetchDashboardTableApi = createAsyncThunk(
  "attendance/dashboardlist",
  async (employeeId, { rejectWithValue }) => {
    try {
      const res = await fetchDashboardTable();

      console.log("Dashboard Table API Response:", res);

      return res;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);


export const saveManualAttendance = createAsyncThunk(
  "attendance/manualEntry",
  async (attendanceData, { rejectWithValue }) => {
    try {
      return await saveManualAttendanceApi(attendanceData);
    } catch (err) {
      return rejectWithValue(
        err.response?.data || {
          message: err.message || "Something went wrong",
        }
      );
    }
  }
);

  