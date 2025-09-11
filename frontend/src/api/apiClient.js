import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5500/api";

const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

export default api;
