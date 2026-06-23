import React from "react"; 
 import { useEffect, useState } from "react";
 import { useContext } from "react";
 import { useDispatch, useSelector } from "react-redux";
 import { fetchAdminAttendance } from "../../features/adminAttendance/adminAttendanceActions";
 import { selectAttendance } from "../../features/adminAttendance/adminAttendanceSelectors";
import Table from "../../components/Table";
import { apiPath } from "../../apiPath"; 

function AdminAttendance() {
  const dispatch = useDispatch();
  const attendanceRaw = useSelector(selectAttendance);

  const employeeId = localStorage.getItem("employeeId");

  useEffect(() => {
    if (!employeeId) return;

    dispatch(fetchAdminAttendance(employeeId));
  }, [employeeId, dispatch]);

  const attendanceData = (attendanceRaw || []).map((item) => ({
  employee: "N/A",
  date: item.attendanceDate,
  clockIn: item.clockInTime || "-",
  clockOut: item.clockOutTime || "-",
  hours: `${Math.floor(item.totalMinutes / 60)}h ${item.totalMinutes % 60}m`,
  status: item.status
}));

  const columns = [
    { header: "Employee", key: "employee" },
    { header: "Date", key: "date" },
    { header: "In", key: "clockIn" },
    { header: "Out", key: "clockOut" },
    { header: "Hours", key: "hours" },
    {
      header: "Status",
      render: (item) => (
        <span className={item.status.toLowerCase()}>
          {item.status}
        </span>
      )
    }
  ];

  return (
    <div className="attendance-container">
      <h1>Check the attendance</h1>

      <div className="table-box">
        <Table data={attendanceData} columns={columns} />
      </div>
    </div>
  );
}
export default AdminAttendance;