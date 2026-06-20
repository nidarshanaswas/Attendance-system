// import api from "../../services/api";
import { apiPath } from "../../apiPath";

export async function loginApi(payload) {
    console.log(payload, 'payload');
    
  const response = await fetch(
   `${apiPath.API_URL}/${apiPath.login}`, // unga backend URL inga podunga
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
    throw new Error(data.message || "Login failed");
  }

  return data;
}



