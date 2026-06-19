import { React, useState } from "react";
import { createRoot } from "react-dom/client";
import "../styles/Sidebar.css"
import skyeye from "../assets/skyeye.png"
import dash from "../assets/dashboard.png"
import attendance from "../assets/user-check.png"
import list from "../assets/list.png"
import entry from "../assets/book.png"
import team from "../assets/teamwork.png"
import report from "../assets/report.png"

import {NavLink } from 'react-router-dom';

function Sidebar({ open, setOpen }) {

    return (
        <>

            {/* <button className="toggle-btn" onClick={() => setOpen(!open)}>☰</button> */}
            <div className={`side-bar ${open ? "show" : ""}`}>
                <div className="logo">
                    <img src={skyeye} alt="logo" className="logo-img" />
                    <span className={`menu-text ${open ? "show" : ""}`}><h2>Sky Eye</h2></span>
                </div>
                <ul>
                    <li className="active">
                        <NavLink to="/dashboard"/>
                        <span><img src={dash} alt="dashboard" className="small-logos" /></span>
                        {open && <span>Dashboard</span>}
                    </li>
                    <li className={!open ? "collapsed" : ""}>
                        <NavLink to="/attendacd"/>
                        <span><img src={attendance} alt="attendance" className="small-logos" /></span>
                        <span className={`menu-text ${open ? "show" : ""}`}>My Attendance</span>
                    </li>

                    <li className={!open ? "collapsed" : ""}>
                        <NavLink to="/attendacd"/>
                        <span><img src={list} alt="list" className="small-logos" /></span>
                        <span className={`menu-text ${open ? "show" : ""}`}>Attendance List</span>

                    </li>
                    <li className={!open ? "collapsed" : ""}>
                        <NavLink to="/attendacd"/>
                        <span><img src={entry} alt="entry" className="small-logos" /></span>
                        <span className={`menu-text ${open ? "show" : ""}`}>Manual Entry</span>
                    </li>
                    <li className={!open ? "collapsed" : ""}>
                        <NavLink to="/employee"/>
                        <span>
                            <img src={team} alt="team" className="small-logos" />
                        </span>
                        <span className={`menu-text ${open ? "show" : ""}`}>Employees</span>
                    </li>
                    <li className={!open ? "collapsed" : ""}>
                        <NavLink to="/report"/>
                        <span><img src={report} alt="report" className="small-logos" /></span>
                        <span className={`menu-text ${open ? "show" : ""}`}>Reports</span>
                    </li>
                </ul>
            </div>
        </>
    );
}
export default Sidebar;