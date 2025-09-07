import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import BlogPage from "./pages/BlogPage";
import AuthProvider, { useAuth } from "./context/AuthProvider";
import Toasts from "./components/Toasts";

function Protected({ children }) {
  const { user, checking } = useAuth();
  if (checking) return <div>Checking auth...</div>;
  if (!user) return <Navigate to="/sign-in" replace />;
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <div style={{ padding: 12 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route
              path="/dashboard"
              element={
                <Protected>
                  <Dashboard />
                </Protected>
              }
            />
            <Route
              path="/history"
              element={
                <Protected>
                  <History />
                </Protected>
              }
            />
            <Route
              path="/blogs/:id"
              element={
                <Protected>
                  <BlogPage />
                </Protected>
              }
            />
          </Routes>
        </div>
        <Footer />
        <Toasts />
      </BrowserRouter>
    </AuthProvider>
  );
}
