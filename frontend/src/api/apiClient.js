import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5500/api";

const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
  // xsrfCookieName: "csrf_token",
  // xsrfHeaderName: "x-csrf-token",
});

// Interceptor to set CSRF token
api.interceptors.request.use(
  (config) => {
    const csrfMatch = document.cookie
      .split("; ")
      .find((row) => row.startsWith("csrf_token="));
    const csrfToken = csrfMatch ? csrfMatch.split("=")[1] : null;
    if (csrfToken) {
      config.headers["x-csrf-token"] = csrfToken;
      console.log("CSRF token set in header:", csrfToken); // Debug
    } else {
      console.warn("CSRF token not found in cookies");
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
