import React, { useState, useEffect } from "react";
import ClockCard from "./ClockCard";
import Card from "../../components/Card";
import Table from "../../components/Table";
import "../../styles/dashboard.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchAttendanceList } from "../../features/adminAttendance/adminAttendanceActions";
import { selectAttendanceList } from "../../features/adminAttendance/adminAttendanceSelectors";
import {
  getFirstClockIn,
  getLastClockOut,
  getTotalWorkedTime,
  clockInUser,
  clockOutUser,
} from "../../features/attendance/attendanceActions";
import { data } from "react-router-dom";

function Dashboard() {
  const [workedTime, setWorkedTime] = useState("0h 00m");
  const [totalWorkedTime, setTotalWorkedTime] = useState(0);
  const [recentClockInTime, setRecentClockInTime] = useState(null);
  const [lastClockInDate, setLastClockInDate] = useState(null);
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [firstClockedIn, setFirstClockedIn] = useState(null);
  const [lastClockedOut, setLastClockedOut] = useState(null);
  const dispatch = useDispatch();
  const attendanceRaw = useSelector(selectAttendanceList);

  const firstClockIn = useSelector((state) => state.attendance.firstClockIn);

  const lastClockOut = useSelector((state) => state.attendance.lastClockOut);
  const [clockInDate, setClockInDate] = useState(null);
  // console.log(firstClockIn);
  // console.log(lastClockOut);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("User :", user);

    if (user?.id) {
      dispatch(getFirstClockIn(user.id)).then((data) => {
        console.log("data", data);
        setFirstClockedIn(data?.payload?.firstClockIn?.firstClockInTime);
        setLastClockInDate(data?.payload?.firstClockIn?.clockInDate);

        // if (data?.payload?.firstClockIn?.firstClockInTime) {
        //   setIsClockedIn(true);

        // }
      });

      dispatch(getLastClockOut(user.id)).then((data) => {
        console.log("Last Clock Out Full Data:", data);
        console.log("Payload:", data?.payload);

        setLastClockedOut(data?.payload?.clockOutTime);
      });
      // dispatch(getTotalWorkedTime(user.id)).then((data) => {
      //   console.log("totaldata", data);

      //   setTotalWorkedTime(
      //     data?.payload?.totalSeconds  || 0
      //   );

      //   setRecentClockInTime(
      //     data?.payload?.recentClockInTime
      //   );
      // });

      dispatch(getTotalWorkedTime(user.id)).then((data) => {
        console.log("totalwork", data);

        const seconds = data?.payload?.totalSeconds || 0;

        setTotalWorkedTime(seconds);

        setRecentClockInTime(data?.payload?.recentClockInTime);
        setClockInDate(data?.payload?.clockInDate);
        setIsClockedIn(!!data?.payload?.recentClockInTime);

        if (!data?.payload?.recentClockInTime) {
          setWorkedTime(formatTime(seconds));
        }
      });

      // console.log("First Clock In :", firstClockIn);
      // console.log("Last Clock Out :", lastClockOut);
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      fetchAttendanceList({
        page: 1,
        size: 5,
      }),
    );
  }, [dispatch]);

  useEffect(() => {
    if (!isClockedIn || !recentClockInTime || !clockInDate) return;

    const interval = setInterval(() => {
      const now = new Date();

      let [time, modifier] = recentClockInTime.split(" ");

      let [h, m, s] = time.split(":").map(Number);

      if (modifier === "PM" && h !== 12) {
        h += 12;
      }

      if (modifier === "AM" && h === 12) {
        h = 0;
      }

      const clockInDateTime = new Date(clockInDate);

      clockInDateTime.setHours(h, m, s, 0);

      const runningSeconds = Math.floor((now - clockInDateTime) / 1000);
      // if (!isClockedIn) {
      //   clearInterval(interval);
      //   return;
      // }
      const finalSeconds = totalWorkedTime + runningSeconds;

      setWorkedTime(formatTime(finalSeconds));
    }, 1000);

    return () => clearInterval(interval);
  }, [isClockedIn, recentClockInTime, totalWorkedTime, clockInDate]);
  // const convertToSeconds = (time) => {
  //   if(!time) return 0;
  //   const [h,m,s] = time.split(":").map(Number);
  //   return h * 3600 + m * 60 + s;
  // };

  const formatTime = (totalSeconds) => {
    const hrs = Math.floor(totalSeconds / 3600);

    const mins = Math.floor((totalSeconds % 3600) / 60);

    const secs = totalSeconds % 60;
    console.log(totalSeconds, hrs, mins, secs, "Time----------");

    return `${hrs}h ${mins.toString().padStart(2, "0")}m ${secs
      .toString()
      .padStart(2, "0")}s`;
  };
  // const handleClockButton = async () => {
  //   const userData = JSON.parse(localStorage.getItem("user"));

  //   if (!isClockedIn) {
  //     await dispatch(clockInUser({ employeeId: userData.id }));
  //     await dispatch(getFirstClockIn(userData.id))
  //     setIsClockedIn(true);
  //     await dispatch(
  //       clockInUser({
  //         employeeId: userData.id,
  //       })
  //     );

  //     const result = await dispatch(
  //       getTotalWorkedTime(userData.id)
  //     );

  //     setTotalWorkedTime(
  //       result.payload.totalSeconds || 0
  //     );

  //     setRecentClockInTime(
  //       result.payload.recentClockInTime
  //     );

  //     setIsClockedIn(
  //       !!result.payload.recentClockInTime
  //     );
  //   } else {
  //     await dispatch(
  //       clockOutUser({
  //         employeeId: userData.id,
  //       })
  //     );

  //     const result = await dispatch(
  //       getTotalWorkedTime(userData.id)
  //     );

  //     const seconds =
  //       result.payload.totalSeconds || 0;

  //     setTotalWorkedTime(seconds);

  //     setRecentClockInTime(null);

  //     setWorkedTime(
  //       formatTime(seconds)
  //     );

  //     setIsClockedIn(false);

  //   }
  // };
  const handleClockButton = async () => {
    const userData = JSON.parse(localStorage.getItem("user"));

    if (!isClockedIn) {
      await dispatch(
        clockInUser({
          employeeId: userData.id,
        }),
      );

      const result = await dispatch(getTotalWorkedTime(userData.id));

      setTotalWorkedTime(result.payload.totalSeconds || 0);

      setRecentClockInTime(result.payload.recentClockInTime);

      setClockInDate(result.payload.clockInDate);

      setIsClockedIn(!!result.payload.recentClockInTime);

      const firstClockInResult = await dispatch(getFirstClockIn(userData.id));

      setFirstClockedIn(
        firstClockInResult?.payload?.firstClockIn?.firstClockInTime,
      );

      setLastClockInDate(
        firstClockInResult?.payload?.firstClockIn?.clockInDate,
      );
    } else {
      await dispatch(
        clockOutUser({
          employeeId: userData.id,
        }),
      );
      // console.log("ClockOut Response", response);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const result = await dispatch(getTotalWorkedTime(userData.id));
      console.log(result.payload.totalSeconds, result.payload, 88777);

      const seconds = result.payload.totalSeconds || 0;
      console.log("Backend Seconds:", seconds);

      setIsClockedIn(false);
      setRecentClockInTime(null);
      setClockInDate(null);

      setTotalWorkedTime(seconds);
      setWorkedTime(formatTime(seconds));

      const lastClockOutResult = await dispatch(getLastClockOut(userData.id));

      setLastClockedOut(lastClockOutResult?.payload?.clockOutTime);
    }
  };
  const attendanceData = (attendanceRaw || []).map((item) => ({
    employee: item.name || "-",

    date: item.attendanceDate,
    clockIn: item.lastClockIn || "-",
    clockOut: item.lastClockOut || "-",
    hours: item.totalHours || "-",
    status: item.status || "-",
  }));
  const columns = [
    { header: "Employee", key: "employee" },

    { header: "Date", key: "date" },
    { header: "RecentClockIn", key: "clockIn" },
    { header: "RecentClockOut", key: "clockOut" },
    { header: "Hours", key: "hours" },
    {
      header: "Status",
      render: (item) => (
        <span className={item.status.toLowerCase()}>{item.status}</span>
      ),
    },
  ];
  return (
    <div className="dashboard-page">
      <ClockCard
        status="Present"
        clockInTime={firstClockedIn || "-"}
        clockOutTime={lastClockedOut || "-"}
        date={lastClockInDate || "-"}
        workedHours={workedTime}
        buttonText={isClockedIn ? "Clock Out" : "Clock In"}
        onButtonClick={handleClockButton}
      />
      <div className="dashboard-cards">
        <Card title="This Week" value="38h 20m" subtitle="+2h vs last week" />
        <Card title="Days Present" value="4 / 5" subtitle="This week" />
        <Card title="Late Arrivals" value="1" subtitle="This month" />
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
