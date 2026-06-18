import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Sidebar from './modules/Sidebar';
import Navbar from './modules/Navbar';
import Attendance from './page/attendance/MyAttendancePage.jsx'

function App() {
  const [open, setOpen] = useState(false);

  return (
    <div className='layout'>
      <Sidebar open={open} setOpen={setOpen} />

      <div className='main-content'>
        <Navbar open={open} setOpen={setOpen} />
        <Attendance />
      </div>
    </div>
  );
}

export default App;
