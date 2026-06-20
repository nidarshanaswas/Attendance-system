import React  from "react";
import { createRoot } from "react-dom/client";
import { useLocation } from "react-router-dom";
import "./Navbar.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logout from "../assets/logout.png";

function Navbar({open, setOpen}) {
  const location = useLocation()
  const [showMenu, setShowMenu] = useState(false);
  const navigate= useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  }
 const getTitle = () => {
  switch (location.pathname) {
    case "/dashboard":
      return "Dashboard";
    case "/attendance":
      return "My Attendance";
    case "/attendancelist":
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
      

      <div className="profile-section"
      onClick={(e) =>{
        e.stopPropagation();
        setShowMenu(!showMenu)
      }}
      style={{position: "relative"}}>

        <div className="profile-circle">
          N
        </div>

        <div className="profile-info">
          <h4>Nidarshana</h4>
          <p>Admin</p>
        </div>

        {showMenu && (
          <div className="dropdown-menu">
            <div className="logout-btn" onClick={(e) => {
              e.stopPropagation();
              handleLogout();
            }}>
              <img src={logout} alt="Logout" />
              <span className="text">LOGOUT</span>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}

export default Navbar;