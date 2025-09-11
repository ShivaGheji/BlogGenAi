import api from "./apiClient";

export const register = async (payload) => {
  const res = await api.post("/auth/sign-up", payload);
  return res.data;
};

export const login = async (payload) => {
  const res = await api.post("/auth/sign-in", payload);
  return res.data;
};

export const me = async () => {
  const res = await api.get("/auth/me");
  return res.data;
};

export const signOut = async () => {
  try {
    await api.post("/auth/sign-out");
    window.__showToast__ && window.__showToast__("signed out", "success");
  } catch (err) {
    window.__showToast__ && window.__showToast__("Failed to sign out", "error");
  }
};
