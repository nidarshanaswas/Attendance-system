import React from "react";
import "../../styles/manualEntry.css";

function ManualEntryPage() {
  return (
    <div className="manual-container">
      <div className="manual-box">

        <h2>Manual Attendance Entry</h2>

       
        <div className="form-group">
          <label>Employee</label>
          <input type="text" placeholder="Select Employee" />
        </div>

        <div className="row-2">
        <div className="form-group">
          <label>Date</label>
          <input type="date"defaultValue="15 jun 2026" />
        </div>

        <div className="form-group">
          <label>Status</label>
          <select defaultValue="Present">
            <option>Present</option>
            <option>Late</option>
            <option>Leave</option>
            <option>Absent</option>
          </select>
        </div>
        </div>

        
        <div className="row-group">
          <div className="form-group">
            <label>Clock In</label>
            <input type="time" defaultValue="09.00"/>
          </div>

          <div className="form-group">
            <label>Clock Out</label>
            <input type="time" defaultValue="18.00 PM" />
          </div>
        </div>
        

        <div className="form-group">
          <label>Reason / Note</label>
          <textarea placeholder="e.g. Forgot to clock out"></textarea>
        </div>
      

       
        <div className="button-group">
          <button className="cancel-btn">Cancel</button>
          <button className="save-btn">Save Entry</button>
        </div>

      </div>
    </div>
  );
}

export default ManualEntryPage;