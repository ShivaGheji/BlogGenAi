import React, { useState, useEffect, useRef } from "react";
import { LayoutDashboard, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import SignInModal from "./SignInModal";
import SignUpModal from "./SignUpModal";

export default function Navbar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  const avatarRef = useRef(null);
  const dropdownRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  const onSignOut = async () => {
    await logout();
    nav("/");
    setIsDropdownOpen(false);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  // const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleSignInModal = () => setIsSignInModalOpen(!isSignInModalOpen);
  const toggleSignUpModal = () => setIsSignUpModalOpen(!isSignUpModalOpen);

  const handleAvatarClick = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        avatarRef.current &&
        !avatarRef.current.contains(event.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const avatarLetter = user?.name?.charAt(0)?.toUpperCase() || "U";

  const handleProtectedClick = (path) => {
    if (!user) {
      setIsSignInModalOpen(true);
    } else {
      nav(path);
    }
  };

  return (
    <nav
      className="bg-[#fffbef] border-b border-[#e5e0d2] flex px-6 py-4 sticky top-0 z-50 font-sans"
      style={{ fontFamily: "Lora, sans-serif" }}
    >
      <div className="max-w-7xl mx-auto flex justify-between w-full items-center">
        <div className="text-xl font-bold text-[#5b4824] flex items-center gap-2">
          <span className="bg-[#f7ce86] p-2 rounded-[0.875rem]">
            <LayoutDashboard className="w-5 h-5 text-[#5f471d]" />
          </span>
          <Link
            to="/"
            className="hover:text-[#ae7615] transition-colors duration-200"
          >
            BlogGenAI
          </Link>
        </div>

        {/* Hamburger Menu Button for Mobile */}
        <button
          // ref={avatarRef}
          className="md:hidden text-[#725420] hover:text-[#1f170b] focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMenuOpen ? (
              <X
                className="w-6 h-6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ) : (
              <Menu
                className="w-6 h-6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
          </svg>
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {!user ? (
            <>
              <button
                onClick={toggleSignInModal}
                className="text-[#5f471d] hover:text-[#ae7615] font-medium transition-colors duration-200"
              >
                Sign In
              </button>
              <button
                onClick={toggleSignUpModal}
                className="text-[#5f471d] hover:text-[#ae7615] font-medium transition-colors duration-200"
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              <Link
                to="/dashboard"
                className="text-[#5f471d] hover:text-[#d28d17] font-medium transition-colors duration-200"
              >
                Dashboard
              </Link>
              <button
                onClick={() => handleProtectedClick("/history")}
                className="text-[#5f471d] hover:text-[#d28d17] font-medium transition-colors duration-200"
              >
                History
              </button>
              <div className="relative">
                <button
                  className="w-8 h-8 rounded-[0.875rem] bg-[#cbd3b0] text-[#424f36] flex items-center justify-center text-base font-medium hover:bg-[#f9dea9] transition-colors duration-200"
                  onClick={handleAvatarClick}
                  ref={avatarRef}
                  aria-label="User menu"
                >
                  {avatarLetter}
                </button>
                {isDropdownOpen && (
                  <div
                    ref={dropdownRef}
                    className="absolute right-0 mt-2 w-48 bg-[#ffffff] shadow-lg rounded-[0.875rem] z-50 border border-[#e5e0d2]"
                  >
                    <div className="px-4 py-2 text-[#0f1419]">
                      <p className="font-medium">{user?.name}</p>
                      <p className="text-sm">{user?.email}</p>
                    </div>
                    <hr className="border-t border-[#e1dace]" />
                    <button
                      onClick={onSignOut}
                      className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-100 transition-colors duration-200 rounded-b-[0.875rem]"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-[#fffbef] shadow-lg flex flex-col items-center gap-4 py-4 z-50 border-t border-[#e5e0d2]">
            {!user ? (
              <>
                <button
                  onClick={() => {
                    toggleSignInModal();
                    toggleMenu();
                  }}
                  className="text-[#5f471d] hover:text-[#ae7615] font-medium transition-colors duration-200"
                  // onClick={toggleMenu}
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    toggleSignUpModal();
                    toggleMenu();
                  }}
                  className="text-[#5f471d] hover:text-[#ae7615] font-medium transition-colors duration-200"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/dashboard"
                  className="text-[#5f471d] hover:text-[#d28d17] font-medium transition-colors duration-200"
                  onClick={toggleMenu}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    handleProtectedClick("/history"), toggleMenu();
                  }}
                  className="text-[#5f471d] hover:text-[#d28d17] font-medium transition-colors duration-200"
                >
                  History
                </button>
                <div className="flex flex-col items-center text-center border-t">
                  <div className="mt-2 text-[#0f1419]">
                    <p className="font-medium">{user?.name}</p>
                    <p className="text-sm">{user?.email}</p>
                  </div>
                  <button
                    onClick={onSignOut}
                    className="w-full text-center px-4 py-2 text-[#ffffff] bg-[#cb5150] hover:bg-[#e0245e] transition-colors duration-200 rounded-[0.875rem] mt-2"
                  >
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
      <SignInModal isOpen={isSignInModalOpen} onClose={toggleSignInModal} />
      <SignUpModal isOpen={isSignUpModalOpen} onClose={toggleSignUpModal} />
    </nav>
  );
}
