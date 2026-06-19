import { React } from "react";
import { createRoot } from "react-dom/client";
import { useLocation } from "react-router-dom";
import "./Navbar.css"

function Navbar({open, setOpen}) {
  const location = useLocation();
 const getTitle = () => {
  switch (location.pathname) {
    case "/dashboard":
      return "Dashboard";
    case "/attendance":
      return "My Attendance";
    case "/attendanceList":
      return "Attendance List";
    case "/manual":
      return "Manual Entry";
    case "/EmployeeManager":
      return "Employees";
    case "/Reports":
      return "Reports";
    default:
      return "Dashboard";
  }
};
  return (
    <div className="navbar">
      <div className="navbar-left">
      <button className="toggle-btn" onClick={() => setOpen(!open)}>☰</button>
      <div className="navbar-title">
        <h2>{getTitle()}</h2>
      </div>
      </div>
      

      <div className="profile-section">

        <div className="profile-circle">
          N
        </div>

        <div className="profile-info">
          <h4>Nidarshana</h4>
          <p>Admin</p>
        </div>

      </div>

    </div>
  );
}

export default Navbar;