import React from "react";
import { createRoot } from "react-dom/client";
import { useLocation } from "react-router-dom";
import "./Navbar.css"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logout from "../assets/logout.png";
import ava1 from "../assets/ava1.png";

function Navbar({ open, setOpen }) {
  const location = useLocation()
  const [showMenu, setShowMenu] = useState(false);
  const [user, setUser] = useState({ name: "", email: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    console.log("user", user);
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser({
          name: parsedUser.name || parsedUser.username || 'User',
          email: parsedUser.email || ""
        });
      } catch (error) {
        console.error("Error parsing user data from localStorage", error);
      }
    }

  }, [])
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
        onClick={(e) => {
          e.stopPropagation();
          setShowMenu(!showMenu)
        }}
        style={{ position: "relative" }}>

        {/* <div className="profile-circle">
          N
        </div> */}

        {/* <div className="profile-info">
          <h4>Nidarshana</h4>
          <p>Admin</p>
        </div> */}

        {/* {showMenu && (
          <div className="dropdown-menu">
            <div className="logout-btn" onClick={(e) => {
              e.stopPropagation();
              handleLogout();
            }}>
              <img src={logout} alt="Logout" />
              <span className="text">LOGOUT</span>
            </div>
          </div>
        )} */}
        <div className="profile-menu-container" style={{ position: 'relative', display: 'inline-block' }}>
          {/* Avatar Trigger Button */}
          <div className="avatar-trigger" onClick={() => setShowMenu(!showMenu)}>
            <div className="avatar-circle">
              <img src={ava1} alt="avathar" />
              {/* Grabs the first letter of the name safely */}
              {/* {user.name ? user.name.charAt(0).toUpperCase() : 'U'} */}
            </div>
          </div>

          {/* Dropdown Menu */}
          {showMenu && (
            <div className="dropdown-menu">
              {/* User Info Header dynamically loaded */}
              <div className="user-info-header">
                <div className="user-name">{user.name}</div>
                <div className="user-email">{user.email}</div>
              </div>

              {/* Cleaned Log Out Button */}
              <div className="logout-row" onClick={(e) => {
                e.stopPropagation();

                // Optional: Clear storage on logout if needed
                // localStorage.removeItem('userData'); 

                handleLogout();
                setShowMenu(false);
              }}>
                <img src={logout} alt="Logout Icon" className="logout-icon" />
                <span className="logout-text">Log out</span>
              </div>
            </div>
          )}
        </div>


      </div>

    </div>
  );
}

export default Navbar;