import { Routes, Route } from "react-router-dom";
import LoginPage from "./page/auth/LoginPage";
import Dashboard from "./page/attendance/DashboardPage";
import Attendance from "./page/attendance/MyAttendancePage";
import Employee from "./page/employees/EmployeeManagerPage";
import Report from "./page/reports/ReportsPage";
function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/attendacd" element={<Attendance/>}/>
      <Route path="/employee" element={<Employee/>}/>
      <Route path="/report" element={<Report/>}/>
    </Routes>
  );
}

export default App;