import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5500/api";

const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
  xsrfCookieName: "csrf_token",
  xsrfHeaderName: "x-csrf-token",
});

// Interceptor to log and manually set CSRF token if needed
api.interceptors.request.use((config) => {
  const csrfMatch = document.cookie
    .split("; ")
    .find((row) => row.startsWith("csrf_token="));
  if (csrfMatch) {
    config.headers["x-csrf-token"] = csrfMatch.split("=")[1];
  }
  return config;
});

export default api;
