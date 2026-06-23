import React, { useState, useEffect } from "react";
import ClockCard from "./ClockCard";
import Card from "../../components/Card";
import Table from "../../components/Table";
import "../../styles/dashboard.css";
import { useDispatch, useSelector } from "react-redux";
import { getFirstClockIn, getLastClockOut, clockInUser, clockOutUser } from "../../features/attendance/attendanceActions";

function Dashboard() {
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [firstClockedIn, setFirstClockedIn] = useState(null);
  const [lastClockedOut, setLastClockedOut] = useState(null)
  const dispatch = useDispatch();

  const firstClockIn = useSelector(
    (state) => state.attendance.firstClockIn
  );

  const lastClockOut = useSelector(
    (state) => state.attendance.lastClockOut
  );
  // console.log(firstClockIn);
  // console.log(lastClockOut);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("User :", user);


    if (user?.id) {
      dispatch(getFirstClockIn(user.id)).then((data) => {
        console.log("data", data)
        setFirstClockedIn(data?.payload?.firstClockIn?.firstClockInTime)
      })
      dispatch(getLastClockOut(user.id)).then((data) => {
        console.log("Last Clock Out Full Data:", data);
        console.log("Payload:", data?.payload);

        setLastClockedOut(data?.payload?.clockOutTime)
      })


      // console.log("First Clock In :", firstClockIn);
      // console.log("Last Clock Out :", lastClockOut);
    }
  }, [dispatch]);
  // const handleClockButton = async () => {
  //   const userData = JSON.parse(localStorage.getItem("user"))
  //   if (!isClockedIn) {

  //     await dispatch(clockInUser({employeeId: userData.id,}));

  //     setIsClockedIn(true);
  //   } else {
  //     await dispatch(
  //       clockOutUser({
  //        employeeId: userData.id,
  //       })
  //     );

  //     setIsClockedIn(false);
  //   }
  // };
  const handleClockButton = async () => {
    const userData = JSON.parse(localStorage.getItem("user"));

    if (!isClockedIn) {
      await dispatch(clockInUser({ employeeId: userData.id }));
      // await dispatch(getFirstClockIn(userData.id))
      setIsClockedIn(true);
    } else {
      await dispatch(clockOutUser({ employeeId: userData.id }));
      // await dispatch(getLastClockOut(userData.id));
      setIsClockedIn(false);
    }
  };

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
        clockInTime={firstClockedIn || "-"}
        clockOutTime={lastClockedOut || "-"}
        date="22 Jun 2026"
        workedHours="0h 00m"
        buttonText={isClockedIn ? "Clock Out" : "Clock In"}
        onButtonClick={handleClockButton}
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