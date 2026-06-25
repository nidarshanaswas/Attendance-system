import { getFirstClockIn, getLastClockOut } from "./features/attendance/attendanceActions";

const apiUrl = "https://391nns29-3000.inc1.devtunnels.ms/v1/api"

export const apiPath = {
  API_URL: `${apiUrl}`,
  login: "user/login",
  clockIn: "attendance/clock-in",
  getFirstClockIn: "attendance/first-clockin",
  clockOut: "attendance/clock-out",
  getLastClockOut: "attendance/last-clockout",
  getTotalWorkedTime: "attendance/working-hours",
  clockin: "attendance/clock-in",
  attendanceRange: "attendance/range",
  attendanceList: "attendance/employees"
//   refresh: "badge/refresh",
//   authLogin: "/auth/login",
//   fyCode: "auth/fycode-list",
//   tokenCreate: "/auth/token-create",
//   companyList: "/company",

};