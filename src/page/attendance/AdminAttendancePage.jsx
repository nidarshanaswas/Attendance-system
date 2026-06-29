import React, { useMemo } from "react";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminAttendance } from "../../features/adminAttendance/adminAttendanceActions";
import { selectAttendance, selectTotalPages, selectCurrentPage } from "../../features/adminAttendance/adminAttendanceSelectors";
// import Card from "../../components/Card";
import Table from "../../components/Table";
import { apiPath } from "../../apiPath";

function AdminAttendance() {
  const dispatch = useDispatch();
  const attendanceRaw = useSelector(selectAttendance);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("")
  const [status, setStatus] = useState("ALL")
  const [page, setPage] = useState(1);
  const totalPages = useSelector(selectTotalPages);
  const currentPage = useSelector(selectCurrentPage);
  const size = 5
  const [filters, setFilters] = useState({})

  const user = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("user"))
    }
    catch {
      return null;
    }
  }, []);

  const userId = user?.id


  useEffect(() => {
    if (!userId) return;

    dispatch(fetchAdminAttendance({
      userId,
      startDate: fromDate,
      endDate: toDate,
      status,
      page,
      size
    }));
  }, [userId, fromDate, toDate, status, page, dispatch]);

  // const totalDays = attendanceRaw.length;

  // const presentDays = attendanceRaw.filter(
  //   (item) => item.status === "PRESENT"
  // ).length

  // const leaveDays = attendanceRaw.filter(
  //   (item) => item.status === "LEAVE"
  // )

  // const lateDays = attendanceRaw.filter(
  //   (item) => item.status === "LATE"
  // )

  // const totalMinutes = attendanceRaw.filter(
  //   (sum, item) => sum + (item.totalMinutes || 0),
  // );

  // const totalHours  = `${Math.floor(totalMinutes / 60)}h ${totalMinutes % 60}m`;
  const attendanceData = (attendanceRaw || []).map((item) => ({

    // employee: userId,
    date: item.attendanceDate,
    clockIn: item.clockInTime || "-",
    clockOut: item.clockOutTime || "-",
    hours: `${Math.floor(item.totalMinutes / 60)}h ${item.totalMinutes % 60}m`,
    status: item.status
  }));

  const columns = [
    // { header: "Employee", key: "employee" },
    { header: "Date", key: "date" },
    { header: "clockIn", key: "clockIn" },
    { header: "clockOut", key: "clockOut" },
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
      <div className="filter-box">
        <div>
          {/* <label>Employee</label> */}
          {/* <input type="text" defaultValue="All employees"/> */}
        </div>

        <div>
          <label>Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="ALL">All</option>
            <option value="PRESENT">Present</option>
            <option value="LEAVE">Leave</option>
            <option value="LATE">Late</option>
          </select>
        </div>

        <div>
          <label>From</label>
          <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
        </div>

        <div>
          <label>To</label>
          <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
        </div>


        <button onClick={() => {
          setPage(1);
          dispatch(fetchAdminAttendance({
            userId,
            startDate: fromDate,
            endDate: toDate,
            status,
            page: 1,
            size
          }))
        }} >
          Apply</button>
      </div>

      <div className="table-box">
        <h3>My attendance</h3>

        <div className="table-scroll">
          <Table data={attendanceData} columns={columns} />
        </div>

        <div className="pages">
          <p>Page {currentPage} of {totalPages}</p>

          <div className="pages-buttons">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
            >
              Previous
            </button>

            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AdminAttendance;



// import React, { useEffect, useMemo } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchAdminAttendance } from "../../features/adminAttendance/adminAttendanceActions";
// import { selectAttendance } from "../../features/adminAttendance/adminAttendanceSelectors";
// import Table from "../../components/Table";

// function AdminAttendance() {
//   const dispatch = useDispatch();
//   const attendanceRaw = useSelector(selectAttendance);

//   // localStorage-ah oru thadava mattum parse pannu (memoize)
//   const user = useMemo(() => {
//     try {
//       return JSON.parse(localStorage.getItem("user"));
//     } catch {
//       return null;
//     }
//   }, []);

//   const userId = user?.id;   // primitive value

//   useEffect(() => {
//     if (!userId) return;
//     dispatch(fetchAdminAttendance(userId));
//   }, [userId, dispatch]);   // userId primitive, so loop illa

//   const attendanceData = (attendanceRaw || []).map((item) => ({
//     employee: userId,
//     date: item.attendanceDate,
//     clockIn: item.clockInTime || "-",
//     clockOut: item.clockOutTime || "-",
//     hours: `${Math.floor(item.totalMinutes / 60)}h ${item.totalMinutes % 60}m`,
//     status: item.status,
//   }));

//   const columns = [
//     { header: "Employee", key: "employee" },
//     { header: "Date", key: "date" },
//     { header: "In", key: "clockIn" },
//     { header: "Out", key: "clockOut" },
//     { header: "Hours", key: "hours" },
//     {
//       header: "Status",
//       render: (item) => (
//         <span className={item.status?.toLowerCase()}>{item.status}</span>
//       ),
//     },
//   ];

//   return (
//     <div className="attendance-container">
//       <h1>Check the attendance</h1>
//       <div className="table-box">
//         <Table data={attendanceData} columns={columns} />
//       </div>
//     </div>
//   );
// }

// export default AdminAttendance;