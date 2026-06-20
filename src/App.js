import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
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



function App() {
  const [open, setOpen] = useState(false);

//   return (
//     <div className='layout'>
//       <Sidebar open={open} setOpen={setOpen} />

//       <div className='main-content'>
//         <Navbar open={open} setOpen={setOpen} />

        {open && (
          <div className="sidebar-overlay"
          onClick={() => setOpen(false)}
          style={{ zIndex: 900}}></div>
        )}

        
//         <Routes>
//   <Route path="/" element={<LoginPage />} />
//     <Route path="/dashboard" element={<Dashboard />} />
//   <Route path="/attendance" element={<AdminAttendance />} />
//   <Route path="/attendancelist" element={<Attendance/>}/>
//   <Route path="/manual" element={<ManualEntry/>}/>
//   <Route path='/EmployeeManager' element={<EmployeeManager/>}/>
//   <Route path='/Reports' element={<Reports/>}/>

// </Routes>
//       </div>
//     </div>
   

    
//   );
return (
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
);
}

export default App;
