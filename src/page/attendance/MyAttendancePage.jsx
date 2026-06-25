import React, { useEffect, useState , useMemo, use} from "react";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminAttendance, fetchAttendanceList } from "../../features/adminAttendance/adminAttendanceActions";
import { selectAttendanceList, selectTotalPages, selectCurrentPage } from "../../features/adminAttendance/adminAttendanceSelectors";
import "./MyAttendancePage.css";
import Table from "../../components/Table";
import { apiPath } from "../../apiPath";
import { data } from "react-router-dom";
// import Select from "react-select/base";

function Attendance() {
  const dispatch = useDispatch();
  const attendanceRaw = useSelector(selectAttendanceList)
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("")
  const [status, setStatus] = useState("All")
  const [page, setPage] = useState(1);
  const totalPages = useSelector(selectTotalPages);
  const currentPage = useSelector(selectCurrentPage);
  const size = 5
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    status: "All",
    employeeName: "",
  })
  const [employeeName, setEmployeeName] =useState("");

  const user = useMemo (() => {
    try{
      return JSON.parse(localStorage.getItem("user"))
    }
    catch{
      return null;
    }
  }, []);

  const userId = user?.id;

 
  useEffect(() => {
    if(!userId) return;

    dispatch(
      fetchAttendanceList({
      userId,
      startDate: filters.startDate,
      endDate: filters.endDate,
      status: filters.status,
      employeeName: filters.employeeName,
      page,
      size
    }));
  }, [userId, filters, page, dispatch]);

  const listData = (attendanceRaw || []).map((item) => ({
    employee: item.name || "-",
    date: item.attendanceDate,
    clockIn: item.lastClockIn || "-",
    clockOut: item.lastClockOut || "-",
    hours: item.totalHours || "-",
    status: item.status

  }))
      

  const columns = [
    { header: "Employee", key: "employee" },
    { header: "Date", key: "date" },
    { header: "LastClockIn", key: "clockIn" },
    { header: "LastClockOut", key: "clockOut" },
    { header: "Hours", key: "hours" },
    {
      header: "Status",
      render: (item) => (
        <span className={item?.status?.toLowerCase()}>{item.status}</span>
      ),
    },
  ];

  console.log("attendanceRaw", attendanceRaw);
  console.log("list data", listData)

  return (
    <div className="attendance-container">
      <div className="filter-box">
        <div>
          <label>Employee</label> 
          <input type="text" value={employeeName} onChange={(e) => setEmployeeName(e.target.value)} placeholder="Search Employee" />
        </div>

        <div>
          <label>Status</label>
          <select 
          value={status}
          onChange={(e) => setStatus(e.target.value)}>
            <option value="ALL">All</option>
            <option value="PRESENT">Present</option>
            <option value="LEAVE">Leave</option>
            <option value="LATE">Late</option>
          </select>
        </div>

        <div>
          <label>From</label>
                <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)}/>
        </div>

        <div>
          <label>To</label>
                <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)}/>
        </div>

        <button onClick={() => {
          setPage(1);
          setFilters({
            // userId,
            startDate: fromDate,
            endDate: toDate,
            status,
            employeeName
            // page: 1,
            // size
          });
        }}>Apply</button>
      </div>

      <div className="table-box">
        <h3>All attendance</h3>

        <div className="table-scroll">
          <Table data={listData} columns={columns} />
        </div>

        <div className="pages">
          <p>page {currentPage} of {totalPages}</p>

          <div className="pages-buttons">
            <button 
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}>Previous</button>
            <button
            onClick={() => setPage((prev) => Math.max(prev + 1, 1))}
            >Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Attendance;
