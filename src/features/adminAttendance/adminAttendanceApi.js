import { apiPath } from "../../apiPath";

export const fetchAdminAttendanceApi = async ({
  userId,
  startDate,
  endDate,
  status,
  page = 1,
  size = 5
}) => {
  let url = `${apiPath.API_URL}/${apiPath.attendanceRange}/${userId}`;
  

  const query = [];

  const today = new Date().toISOString().split("T")[0];

  if (startDate && endDate) {
    query.push(`startDate=${startDate}`);
    query.push(`endDate=${endDate}`);
  } 
  else if (startDate && !endDate) {
    query.push(`startDate=${startDate}`);
    query.push(`endDate=${today}`);
  } 
  else if (!startDate && endDate) {
    query.push(`startDate=${startDate}`)
    query.push(`endDate=${endDate}`);
  }
   else {
    query.push(`startDate=${today}`);
    query.push(`endDate=${today}`);
  }

  if (status && status !== "All") {
    query.push(`status=${status}`);
  }
  

  query.push(`page=${page}`);
  query.push(`size=${size}`);

  url += `?${query.join("&")}`;

  console.log("FINAL URL 👉", url);   // 🔥 debug

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("API failed");
  }

  return await res.json();
};


export const fetchAttendanceListApi = async ({
  startDate,
  endDate,
  status,
  employeeName,
  page = 1,
  size = 5
}) => {

  let url = `${apiPath.API_URL}/${apiPath.attendanceList}`;
  const query = [];

  const today = new Date().toISOString().split("T")[0];

  if (startDate && endDate) {
    query.push(`startDate=${startDate}`);
    query.push(`endDate=${endDate}`);
  }
  else if (startDate && !endDate) {
    query.push(`startDate=${startDate}`);
    query.push(`endDate=${today}`);
  }
  else if (!startDate && endDate) {
    query.push(`endDate=${endDate}`);
  }

  if (status && status !== "All") {
    query.push(`status=${status}`);
  }

  if(employeeName) {
    query.push(`employee=${employeeName}`)
  }
  query.push(`page=${page}`);
  query.push(`size=${size}`);

  if (query.length) {
    url += `?${query.join("&")}`;
  }

  console.log("FINAL URL 👉", url);

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("API failed");
  }

  return await res.json();
};