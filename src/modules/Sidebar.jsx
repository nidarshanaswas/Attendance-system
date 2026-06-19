import { React, useState } from "react";
import { createRoot } from "react-dom/client";
import "./Sidebar.css"
import skyeye from "../assets/skyeye.png"
import dash from "../assets/dashboard.png"
import attendance from "../assets/user-check.png"
import list from "../assets/list.png"
import entry from "../assets/book.png"
import team from "../assets/teamwork.png"
import report from "../assets/report.png"
import { NavLink } from "react-router-dom";
function Sidebar({ open, setOpen }){
    // const handleNavclick = () => {
    //         setOpen(false)
    //     };

    
    return (
        <>
        
        {/* <button className="toggle-btn" onClick={() => setOpen(!open)}>☰</button> */}
        <div className={`side-bar ${open ? "show" : ""}` }
        onClick={(e) => e.stopPropagation()}>
            <div className="logo">
                <img src={skyeye} alt="logo" className="logo-img"/>
           <span className={`menu-text ${open ? "show" : ""}`}><h2>Sky Eye</h2></span>            
            </div>
            <ul>
                <li>
  <NavLink to="/dashboard" data-title="Dashboard">
    <img src={dash} className="small-logos" />
    <span className="menu-text">Dashboard</span>
  </NavLink>
</li>

<li>
  <NavLink to="/attendance" data-title="My Attendance">
    <img src={attendance} className="small-logos" />
    <span className="menu-text">My Attendance</span>
  </NavLink>
</li>
                <li>
                    <NavLink to="/attendancelist" data-title="Attendance Lsit">
    <span><img src={list} alt="list" className="small-logos"/></span>
    <span className={`menu-text ${open ? "show" : ""}`}>Attendance List</span>
    </NavLink>
</li>
                <li> 
                    <NavLink to="/manual"  data-title="Manual Entry">
    <span><img src={entry} alt="entry" className="small-logos"/></span>
    <span className={`menu-text ${open ? "show" : ""}`}>Manual Entry</span>
    </NavLink>
</li>
               <li>
                <NavLink to="/EmployeeManager" data-title="Employees">
    <span>
        <img src={team} alt="team" className="small-logos"/>
    </span>
    <span className={`menu-text ${open ? "show" : ""}`}>Employees</span>
    </NavLink>
</li>
                <li>
                    <NavLink to="/Reports"  data-title="Reports">
    <span><img src={report} alt="report" className="small-logos"/></span>
    <span className={`menu-text ${open ? "show" : ""}`}>Reports</span>
    </NavLink>
</li>
            </ul>
        </div>
        </>
    );
}
export default Sidebar;