import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5500/api"; // change if your backend base differs

const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true, // if backend sets httpOnly cookie
  headers: { "Content-Type": "application/json" },
});

// attach token from localStorage if present
api.interceptors.request.use((cfg) => {
  const token = localStorage.getItem("token");
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

export default api;
