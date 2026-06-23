import { getFirstClockIn, getLastClockOut } from "./features/attendance/attendanceActions";

const apiUrl = "https://391nns29-3000.inc1.devtunnels.ms/v1/api"

export const apiPath = {
  API_URL: `${apiUrl}`,
  login: "user/login",
  clockIn: "attendance/clock-in",
  getFirstClockIn: "attendance/first-clockin",
  clockOut: "attendance/clock-out",
  getLastClockOut: "attendance/last-clockout",
<<<<<<< HEAD
  getTotalWorkedTime: "attendance/working-hours",
=======
  clockin: "attendance/clock-in",
  attendanceRange: "attendance/range",
>>>>>>> a8d7c71b193b66976821445b4f6e7fdf8f9fac38
//   refresh: "badge/refresh",
//   authLogin: "/auth/login",
//   fyCode: "auth/fycode-list",
//   tokenCreate: "/auth/token-create",
//   companyList: "/company",

};