import axios from "axios";

//http://localhost:5000/api 
const API = axios.create({
  baseURL: "https://cloudshare-backend-4d97.onrender.com/api",
});

 
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
