import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectLoading } from './features/loader/loaderSelectors.js';
import { Routes, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { hideLoader } from './features/loader/loaderSlice.js';
import logo from './logo.svg';
import './App.css';
import Sidebar from './modules/Sidebar';
import Navbar from './modules/Navbar';
import Attendance from './page/attendance/MyAttendancePage.jsx'
import AdminAttendance from './page/attendance/AdminAttendancePage.jsx'
import Dashboard from './page/attendance/DashboardPage.jsx';
import ManualEntry from './page/attendance/ManualEntryPage.jsx'
import EmployeeManager from './page/employees/EmployeeManagerPage.jsx'
import Reports from './page/reports/ReportsPage.jsx'
import LoginPage from "./page/auth/LoginPage";
import Spinner from './components/Spinner.jsx';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  const [open, setOpen] = useState(false);
  const loading = useSelector(selectLoading);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(hideLoader());
    }, 300); // 500ms

    return () => clearTimeout(timer);
  }, [location.pathname, dispatch]);

  return (
    <>
      {loading && <Spinner />}
      <Routes>
        {/* Login Page Only */}
        <Route path="/" element={<LoginPage />} />

        {/* All other pages with Navbar + Sidebar */}
        <Route
          path="*"
          element={
            <div className="layout">
              <Sidebar open={open} setOpen={setOpen} />

              <div className="main-content">
                <Navbar open={open} setOpen={setOpen} />

                {open && (
                  <div
                    className="sidebar-overlay"
                    onClick={() => setOpen(false)}
                  ></div>
                )}

                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/attendance" element={<AdminAttendance />} />
                  <Route path="/attendancelist" element={<Attendance />} />
                  <Route path="/manual" element={<ManualEntry />} />
                  <Route path="/EmployeeManager" element={<EmployeeManager />} />
                  <Route path="/Reports" element={<Reports />} />
                </Routes>
              </div>
            </div>
          }
        />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
