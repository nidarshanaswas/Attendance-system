import { fetchAdminAttendanceApi } from "./adminAttendanceApi";
import { loading, success, error } from "./adminAttendanceSlice";
export const fetchAdminAttendance = (employeeId) => async (dispatch) => {
  try {
    dispatch(loading());

    const data = await fetchAdminAttendanceApi(employeeId);

    console.log("API RESPONSE", data);

    const attendance =
      data?.attendance ||
      data?.data?.attendance ||
      data?.result ||
      data ||
      [];

    dispatch(success(Array.isArray(attendance) ? attendance : []));
  } catch (err) {
    dispatch(error(err.message));
  }
};