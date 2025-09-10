import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import BlogPage from "./pages/BlogPage";
import NotFound from "./pages/NotFound";
import AuthProvider, { useAuth } from "./context/AuthProvider";
import Toasts from "./components/Toasts";
import SignInModal from "./components/SignInModal";

function Protected({ children }) {
  const { user, checking } = useAuth();
  if (checking) return <div>Checking auth...</div>;
  if (!user) return <SignInModal />;
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <SignInModal />
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
        <Toasts />
      </BrowserRouter>
    </AuthProvider>
  );
}
