import React from "react";
import ClockCard from "./ClockCard";
import Card from "../../components/Card";
import Table from "../../components/Table";
import "../../styles/dashboard.css";
function Dashboard() {
  const attendanceData = [
    {
      date: "Mon, 15 Jun",
      clockIn: "09:05 AM",
      clockOut: "-",
      hours: "-",
      status: "Present"
    },
    {
      date: "Fri, 12 Jun",
      clockIn: "09:48 AM",
      clockOut: "06:30PM",
      hours: "8h 42m",
      status: "Late"
    },
    {
      date: "Thu, 11 Jun",
      clockIn: "08:58 AM",
      clockOut: "06:02 PM",
      hours: "9h 04m",
      status: "Present"
    },
    {
      date: "Wed, 10 Jun",
      clockIn: "-",
      clockOut: "-",
      hours: "-",
      status: "Leave"
    },
    {
      date: "Tue, 09 Jun",
      clockIn: "09:02 AM",
      clockOut: "06:10 PM",
      hours: "9h 08m",
      status: "Present"
    },
  ];
  const columns = [
    { header: "Date", key: "date" },
    { header: "In", key: "clockIn" },
    { header: "Out", key: "clockOut" },
    { header: "Hours", key: "hours" },
    {
      header: "Status",
      render: (item) => (
        <span className={item.status.toLowerCase()}>
          {item.status}
        </span>
      )
    }
  ];
  return (
    <div className="dashboard-page">

      <ClockCard
        status="Present"
        clockInTime="09:05 AM"
        date="Today • Monday, 15 June 2026"
        workedHours="08h 12m"
        buttonText="Clock Out"
      />
      <div className="dashboard-cards">
        <Card
          title="This Week"
          value="38h 20m"
          subtitle="+2h vs last week"
        />
        <Card
          title="Days Present"
          value="4 / 5"
          subtitle="This week"
        />
        <Card
          title="Late Arrivals"
          value="1"
          subtitle="This month"
        />
      </div>
      {/* <Table data={attendanceData} /> */}
      <div className="table-box">
        <h3>Recently Attendance</h3>

        <Table data={attendanceData} columns={columns} />
      </div>
    </div>
  );
}

export default Dashboard;