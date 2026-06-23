export const fetchAdminAttendanceApi = async (employeeId) => {
  const res = await fetch(
    `https://391nns29-3000.inc1.devtunnels.ms/v1/api/attendance/range/${employeeId}`
  );

  return res.json();
};
