import React, { useEffect, useState } from "react";
import "../../styles/manualEntry.css";
import { useDispatch } from "react-redux";
import { saveManualAttendance, fetchAttendanceList } from "../../features/adminAttendance/adminAttendanceActions";
import {
  fetchEmployeeEmailsApi,
  fetchEmployeeDetailsApi
} from "../../features/adminAttendance/adminAttendanceApi";
import { toast } from "react-toastify";

function ManualEntryPage({ onClose }) {

  const dispatch = useDispatch();

  const [emails, setEmails] = useState([]);
  const [employee, setEmployee] = useState(null);
  const [loadingEmployee, setLoadingEmployee] = useState(false)

  const [formData, setFormData] = useState({
    employeeId: "",
    employeeName: "",
    email: "",
    date: "",
    status: "Present",
    clockIn: "",
    clockOut: "",
    reason: ""
  });

  // 🔥 LOAD EMAILS ON OPEN
  useEffect(() => {
    loadEmails();
  },[]);

  const loadEmails = async () => {
    try {
      const res = await fetchEmployeeEmailsApi();
      setEmails(res.employees || []);
    } catch (err) {
      console.log(err);
    }
  };

const handleSelectEmail = async (id) => {
  if (!id) return;

  setLoadingEmployee(true);

  try {
    const res = await fetchEmployeeDetailsApi(id);

    console.log("Employee Details:", res);

    if (res.employee) {
      const emp = res.employee;

      setEmployee(emp);

      setFormData((prev) => ({
        ...prev,
        employeeId: emp.id,
        employeeName: emp.name,
        email: emp.email,
      }));
    }
  } catch (err) {
    console.log(err);
  } finally {
    setLoadingEmployee(false);
  }
};
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
  const result = await dispatch(
    saveManualAttendance({
      employeeId: Number(formData.employeeId),
      clockInDate: formData.date,
      clockInTime: formData.clockIn,
      clockOutDate: formData.date,
      clockOutTime: formData.clockOut,
      status: formData.status,
      note: formData.reason || "Record By Manual",
    })
  );

  if (saveManualAttendance.fulfilled.match(result)) {
    toast.success("Attendance added successfulyy");
    dispatch(fetchAttendanceList({ page: 1, size: 5 }));

    setTimeout(() => {
 onClose?.();
    }, 500);
   
  } else{
    toast.error("Failed to add attendance")
  }
};

  return (
  <div className="manual-container">
    <div className="manual-box">
      <h2>Manual Attendance Entry</h2>

      {/* Employee Email */}
      <div className="form-group">
        <label>Select Emaill</label>

        <select
          value={formData.employeeId}
          onChange={(e) => handleSelectEmail(Number(e.target.value))}
        >
          <option value="">Select Email</option>

          {emails.map((emp) => (
            <option key={emp.id} value={emp.id}>
              {emp.email}
            </option>
          ))}
        </select>
      </div>

      {/* Employee Name */}
      <div className="form-group">
        <label>Employee Name</label>

        <input
          type="text"
          value={loadingEmployee ? "Loading..." : formData.employeeName}
          readOnly
          placeholder="Employee Name"
        />
      </div>

      {/* Date & Status */}
      <div className="row-group">
        <div className="form-group">
          <label>Date</label>

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Status</label>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="PRESENT">Present</option>
            <option value="LATE">Late</option>
            <option value="LEAVE">Leave</option>
            <option value="ABSENT">Absent</option>
          </select>
        </div>
      </div>

      {/* Clock In & Clock Out */}
      <div className="row-group">
        <div className="form-group">
          <label>Clock In</label>

          <input
            type="time"
            name="clockIn"
            value={formData.clockIn}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Clock Out</label>

          <input
            type="time"
            name="clockOut"
            value={formData.clockOut}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Reason */}
      <div className="form-group">
        <label>Reason / Note</label>

        <textarea
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          placeholder="Type the Note"
        />
      </div>

      {/* Buttons */}
      <div className="button-group">
        <button
          className="cancel-btn"
          type="button"
          onClick={onClose}
        >
          Cancel
        </button>

        <button
          className="save-btn"
          type="button"
          onClick={handleSave}
        >
          Save Entry
        </button>
      </div>
    </div>
  </div>
);
}

export default ManualEntryPage;