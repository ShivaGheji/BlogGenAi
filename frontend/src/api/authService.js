import api from "./apiClient";

export const register = async (payload) => {
  const res = await api.post("/auth/sign-up", payload);
  // backend might set cookie AND/or return token; handle both:
  if (res.data?.token) localStorage.setItem("token", res.data.token);
  return res.data;
};

export const login = async (payload) => {
  const res = await api.post("/auth/sign-in", payload);
  if (res.data?.token) localStorage.setItem("token", res.data.token);
  return res.data;
};

export const me = async () => {
  const res = await api.get("/auth/me");
  return res.data;
};

export const signOut = async () => {
  // optional: call backend signout endpoint if exists to clear cookie
  localStorage.removeItem("token");
};
