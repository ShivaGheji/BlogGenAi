import React, { createContext, useContext, useEffect, useState } from "react";
import * as authAPI from "../api/authService";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);
  const [isSignInOpen, setIsSignInOpen] = useState(false);

  useEffect(() => {
    (async () => {
      try {
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
    const res = await authAPI.login(payload);
    try {
      const data = await authAPI.me();
      setUser(data.user || data);
      setIsSignInOpen(false);
    } catch (e) {
      if (res.user) setUser(res.user);
    }
    return res;
  };

  const registerUser = async (payload) => {
    const res = await authAPI.register(payload);
    try {
      const data = await authAPI.me();
      setUser(data.user || data);
    } catch (e) {
      if (res.user) setUser(res.user);
    }
    return res;
  };

  const logout = async () => {
    await authAPI.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, checking, login, registerUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
