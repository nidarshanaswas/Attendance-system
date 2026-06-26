import React, { useState } from "react";
import "../../styles/manualEntry.css";
import { useDispatch } from "react-redux";
import { saveManualAttendance } from "../../features/adminAttendance/adminAttendanceActions";

function ManualEntryPage() {

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    employeeName: "",
    date: "",
    status: "Present",
    clockIn: "",
    clockOut: "",
    reason: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    dispatch(saveManualAttendance(formData));
  };

  return (
    <div className="manual-container">
      <div className="manual-box">

        <h2>Manual Attendance Entry</h2>

        <div className="form-group">
          <label>Employee Name</label>
          <input
            type="number"
            name="employee Name"
            value={formData.employeeName}
            onChange={handleChange}
            placeholder="Employee Name"
          />
        </div>

        <div className="row-2">
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
              <option value="Present">Present</option>
              <option value="Late">Late</option>
              <option value="Leave">Leave</option>
              <option value="Absent">Absent</option>
            </select>
          </div>
        </div>

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

        <div className="form-group">
          <label>Reason / Note</label>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            placeholder="Type the Note"
          />
        </div>

        <div className="button-group">
          <button
            className="cancel-btn"
            type="button"
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