import { React } from "react";
import { createRoot } from "react-dom/client";
import "../styles/Navbar.css";
function Navbar({open, setOpen}) {
  return (
    <div className="navbar">
      <div className="navbar-left">
      <button className="toggle-btn" onClick={() => setOpen(!open)}>☰</button>
      <div className="navbar-title">
        <h2>Attendance List</h2>
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