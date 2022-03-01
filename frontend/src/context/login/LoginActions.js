import axios from "axios";

const loginUser = axios.create({
  baseURL: "http://localhost:5000",
});

// Login
export const login = async () => {
  const response = await loginUser.get("/");

  return response.json();
};
