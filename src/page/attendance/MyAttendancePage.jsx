import { React } from "react";
import "./MyAttendancePage.css"
import Table from "../../components/Table"
import Select from "react-select/base";

function Attendance(){
     const attendanceData = [
    {
      employee: "Priya Nair",
      date: "Mon, 15 Jun",
      clockIn: "09:01",
      clockOut: "-",
      hours: "-",
      status: "Present"
    },
    {
      employee: "Arjun Rao",
      date: "Mon, 15 Jun",
      clockIn: "09:42",
      clockOut: "-",
      hours: "-",
      status: "Late"
    },
    {
      employee: "Meera Iyer",
      date: "Mon, 15 Jun",
      clockIn: "-",
      clockOut: "-",
      hours: "-",
      status: "Leave"
    },
    {
      employee: "Karthick S",
      date: "Mon, 15 Jun",
      clockIn: "08:55",
      clockOut: "-",
      hours: "-",
      status: "Present"
    },
    {
      employee: "Divya Menon",
      date: "Mon, 15 Jun",
      clockIn: "-",
      clockOut: "-",
      hours: "-",
      status: "Absent"
    },
    {
      employee: "Rohit Das",
      date: "Fri, 12 Jun",
      clockIn: "09:00",
      clockOut: "06:10",
      hours: "9h 10m",
      status: "Present"
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

            <Table data={attendanceData}/>

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