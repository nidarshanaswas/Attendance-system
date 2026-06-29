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
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    employeeId: "",
    employeeName: "",
    email: "",
    date: "",
    status: "PRESENT",
    clockIn: "",
    clockOut: "",
    reason: ""
  });

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
  if (!id) {
    setFormData((prev) => ({
      ...prev,
      employeeId: "",
      employeeName: "",
    }));

    setErrors((prev) => ({
      ...prev,
      employeeId: "Please select an Employee Email",
    }));

    return;
  }
  setErrors((prev) => ({
    ...prev,
    employeeId: "",
  }));

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

    setErrors((prev) => ({
      ...prev, 
      [name]: "",
    }));
  };

  const validateForm = () =>{
    const newErrors = {};

    if(!formData.employeeId){
      newErrors.employeeId = "Please select Employee Email"
    }
    if(!formData.date){
      newErrors.date = "Date is required"
    }

    if(!formData.status){
      newErrors.status = "Status is required"
    }
    if(!formData.clockIn){
      newErrors.clockIn = "Clock In time is required"
    }
    if(!formData.clockOut){
      newErrors.clockOut = "Clock Out time is required"
    }
    if(formData.clockIn && formData.clockOut && formData.clockOut <= formData.clockIn){
      newErrors.clockOut = "Clock Out must be greater than clock In"
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;  
  }

  const resetForm = () =>{
    setFormData({
      employeeId: "",
      employeeName: "",
      email: "",
      date:"",
      status: "PRESENT",
      clockIn: "",
      clockOut: "",
      reason: "",
    });
    setErrors({});
    setEmployee(null)
  }
  const handleCancel = () =>{
    setFormData({
      employeeId: "",
      employeeName: "",
      email: "",
      date:"",
      status: "PRESENT",
      clockIn: "",
      clockOut: "",
      reason: "",
    });

    setErrors({});
    setEmployee(null);

    onClose?.();
  };


  const handleSave = async () => {
    if(!validateForm()) return;

  try{
    await dispatch(
    saveManualAttendance({
      employeeId: Number(formData.employeeId),
      clockInDate: formData.date,
      clockInTime: formData.clockIn,
      clockOutDate: formData.date,
      clockOutTime: formData.clockOut,
      status: formData.status,
      note: formData.reason || "Record By Manual",
    })
  ).unwrap();
      toast.success("Attendance added successfully");

      resetForm();
      dispatch(fetchAttendanceList({ page: 1, size: 5}));

      setTimeout(() => {
        onClose?.()
      }, 500);

    } catch (error) {
      console.log("Backend error", error);

      if(Array.isArray(error?.errors)){
        error.errors.forEach((msg) => toast.error(msg))
      } else if(error?.errors) {
        Object.values(error.errors).forEach((msg) => 
          toast.err(msg)
      );
      } else if(
        Array.isArray(error?.message)) {
          error.message.forEach((msg) => 
          toast.err(msg)
        );
        }
        else{
          toast.error(error?.message || "Something went wrong");
        }
    }
  };
  return (
  <div className="manual-container">
    <div className="manual-box">
      <h2>Manual Attendance Entry</h2>

      <div className="form-group">
        <label>Select Emaill <span className="required">*</span> </label>

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
       <span className="error">{errors.employeeId || ""}</span>
      </div>

      <div className="form-group">
        <label>Employee Name</label>

        <input
          type="text"
          value={loadingEmployee ? "Loading..." : formData.employeeName}
          readOnly
          placeholder="Employee Name"
        />
      </div>

      <div className="row-group">
        <div className="form-group">
          <label>Date <span className="required">*</span></label>

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        <span className="error">{errors.date || ""}</span>
        </div>

        <div className="form-group">
          <label>Status <span className="required">*</span></label>

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

          <span className="error">{errors.status || ""}</span>
        
        </div>
      </div>

      <div className="row-group">
        <div className="form-group">
          <label>Clock In <span className="required">*</span></label>

          <input
            type="time"
            name="clockIn"
            value={formData.clockIn}
            onChange={handleChange}
          />

          <span className="error">{errors.clockIn || ""}</span>
        
        </div>

        <div className="form-group">
          <label>Clock Out <span className="required">*</span></label>

          <input
            type="time"
            name="clockOut"
            value={formData.clockOut}
            onChange={handleChange}
          />

          <span className="error">{errors.clockOut || ""}</span>
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
          <span className="error">{errors.reason || ""}</span>
        
      </div>

      <div className="button-group">
        <button
          className="cancel-btn"
          type="button"
          onClick={handleCancel}
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