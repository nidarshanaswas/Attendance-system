import  React, { useEffect, useState }  from "react";
import "./MyAttendancePage.css"
import Table from "../../components/Table"
// import Select from "react-select/base";

function Attendance() {

  const [attendanceData, setAttendanceData] = useState([]);

  const employeeId = 1;

  useEffect(() => {
    fetch(`https://391nns29-3000.inc1.devtunnels.ms/v1/api/attendance/range/${employeeId}`)
    .then((res) => res.json())
    .then((data) => {
      
      const formatted = data.attendance.map((item) =>({
        employee: data.employee.name,
        date: item.attendanceDate,
        clockIn: item.clockInTime || "-",
        clockOut: item.clockOutTime || "-",
        hours: `${Math.floor(item.totalMinutes / 60 )}h ${item.totalMinutes % 60}m`,
        status: item.status
      }));
      setAttendanceData(formatted)
    })
    .catch((err) => console.log(err));
  }, []);


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
        <div className="filter-box">
            <div>
<label>Employee</label>
<input type="text" defaultValue="All employees"/>
</div>

<div>
                <label>Status</label>
                <select>
                    <option>All</option>
                    <option>Present</option>
                    <option>Leave</option>
                    <option>Late</option>
                </select>
            </div>

            <div>
                <label>From</label>
                <input type="date" defaultValue="2026-jun-01"/>
            </div>

            <div>
                <label>To</label>
                <input type="date" />
            </div>


            <button>Apply</button>
        </div>

        <div className="table-box">
            <h3>All attendance</h3>

            <div className="table-scroll">
            <Table data={attendanceData} columns={columns}/>
            </div>

            <div className="pages">
                <p>showing 1-6 of 124</p>

                <div className="pages-buttons">
                    <button>Previous</button>
                    <button>Next</button>
                </div>
            </div>
        </div>
        </div>
    );
}
export default Attendance;