import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5500/api";

const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
  xsrfCookieName: "csrf_token",
  xsrfHeaderName: "x-csrf-token",
});

// Interceptor to log and manually set CSRF token if needed
api.interceptors.request.use(
  (config) => {
    const csrfToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("csrf_token="))
      ?.split("=")[1];

    if (csrfToken) {
      config.headers["x-csrf-token"] = csrfToken;
    } else {
      console.warn("CSRF token not found in cookies");
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
