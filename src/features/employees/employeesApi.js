const API_URL =
  "https://391nns29-3000.inc1.devtunnels.ms/v1/api/user";

export async function getEmployeesApi(
  page = 1,
  size = 5,
  name = ""
) {
  const response = await fetch(
    `${API_URL}/employee-status?page=${page}&size=${size}&name=${name}`
  );
  const data = await response.json();

  if (!response.ok) {
    return Promise.reject(data);
  }
  return data;
}

export async function createEmployeeApi(payload) {
  const response = await fetch(`${API_URL}/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );
  const data = await response.json();

  if (!response.ok) {
    return Promise.reject(data);
  }
  return data;
}

export async function updateEmployeeApi(id, payload) {
  console.log(payload);

  const response = await fetch(
    `${API_URL}/update/${id}`,
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
    return Promise.reject(data);
  }
  return data;
}

export async function deleteEmployeeApi(id) {
  const response = await fetch(
    `${API_URL}/delete/${id}`,
    {
      method: "DELETE",
    }
  );
  const data = await response.json();

  if (!response.ok) {
    return Promise.reject(data);
  }
  return data

}