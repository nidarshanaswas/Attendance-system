import { useState } from "react";


function Dashboard() {
    const [open,setOpen] = useState(true)
  return (
    <div className="layout">
        <div className="main-content">
        </div>
      <h1>Welcome to Dashboard</h1>
    </div>
  );
}

export default Dashboard;