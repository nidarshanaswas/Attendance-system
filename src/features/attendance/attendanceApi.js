import { apiPath } from "../../apiPath";

export async function clockInApi(payload) {
    
  const response = await fetch(
    `${apiPath.API_URL}/${apiPath.clockIn}`,
    
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );
console.log(apiPath.API_URL);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}

export async function clockOutApi(payload) {
  const response = await fetch(
    `${apiPath.API_URL}/${apiPath.clockOut}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}

export async function getFirstClockInApi(employeeId) {
  const response = await fetch(
    `${apiPath.API_URL}/attendance/first-clockin/${employeeId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();
  return data;
}
export async function getLastClockOutApi(employeeId) {
  const response = await fetch(
    `${apiPath.API_URL}/attendance/last-clockout/${employeeId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();
  return data;
}