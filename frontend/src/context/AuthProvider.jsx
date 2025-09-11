import React, { createContext, useContext, useEffect, useState } from "react";
import * as authAPI from "../api/authService";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        await api.get("/api/auth/health");
        const data = await authAPI.me();
        setUser(data.user || data);
      } catch (err) {
        setUser(null);
      } finally {
        setChecking(false);
      }
    })();
  }, []);

  const login = async (payload) => {
    setLoading(true);
    try {
      const res = await authAPI.login(payload);
      const data = await authAPI.me();
      setUser(data.user || data);
      setIsSignInOpen(false);
      return res;
    } catch (e) {
      if (res?.user) setUser(res.user);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async (payload) => {
    try {
      setLoading(true);
      const res = await authAPI.register(payload);
      const data = await authAPI.me();
      setUser(data.user || data);
      return res;
    } catch (e) {
      if (res?.user) setUser(res.user);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await authAPI.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, checking, login, registerUser, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}
