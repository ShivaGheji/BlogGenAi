import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export default function Navbar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  const onSignOut = async () => {
    await logout();
    window.__showToast__ && window.__showToast__("Logged out", "info");
    nav("/");
  };

  return (
    <nav
      style={{ padding: 12, display: "flex", justifyContent: "space-between" }}
    >
      <div>
        <Link to="/">AI BlogGen</Link>
      </div>

      <div style={{ display: "flex", gap: 12 }}>
        {!user ? (
          <>
            <Link to="/sign-in">Sign In</Link>
            <Link to="/sign-up">Sign Up</Link>
            <Link to="/dashboard">Start Generate</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/history">History</Link>
            <div style={{ cursor: "pointer" }}>
              <span onClick={() => nav("/dashboard")}>
                {user?.name + " | " + user?.email}
              </span>{" "}
              <button onClick={onSignOut}>Sign out</button>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}
