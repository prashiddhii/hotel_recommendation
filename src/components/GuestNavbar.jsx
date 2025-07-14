import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RxCross2, RxHamburgerMenu } from "react-icons/rx";
import { isAuthenticated, logout } from "../utils/auth";

const GuestNavbar = () => {
  const [show, setShow] = useState(false);

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  const handleAuthRedirect = (type) => {
    window.location.href = `/${type}`;
  };

  return (
    <nav className="px-4 py-4 flex items-center justify-between fixed top-0 left-0 right-0 z-50 bg-gray-100/50 backdrop-blur-md">
      {/* Brand Logo */}
      <Link to="/" className="flex cursor-pointer items-center space-x-2">
        <span className="text-3xl font-bold text-blue-950">B</span>
        <span className="text-xl font-semibold">OOK MY GO</span>
      </Link>

      {/* Desktop Auth Buttons */}
      <div className="hidden md:flex items-center space-x-4">
        {!isAuthenticated() ? (
          <>
            <button
              onClick={() => handleAuthRedirect("login")}
              className="text-blue-900 font-medium cursor-pointer hover:underline"
            >
              Login
            </button>
            <button
              onClick={() => handleAuthRedirect("register")}
              className="bg-blue-900 text-white px-4 py-2 rounded-full hover:bg-blue-800 transition cursor-pointer"
            >
              Register
            </button>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="text-red-600 font-medium hover:underline"
          >
            Logout
          </button>
        )}
      </div>

      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden text-2xl cursor-pointer"
        onClick={() => setShow(!show)}
      >
        {show ? <RxCross2 size={20} /> : <RxHamburgerMenu size={20} />}
      </button>

      {/* Mobile Menu */}
      {show && (
        <div className="absolute top-16 right-4 bg-white p-4 rounded-lg shadow-lg flex flex-col gap-4 md:hidden z-50">
          {!isAuthenticated() ? (
            <>
              <button
                onClick={() => {
                  setShow(false);
                  handleAuthRedirect("login");
                }}
                className="text-blue-900 hover:underline text-left"
              >
                Login
              </button>
              <button
                onClick={() => {
                  setShow(false);
                  handleAuthRedirect("register");
                }}
                className="bg-blue-900 text-white px-4 py-2 rounded-full hover:bg-blue-800 transition"
              >
                Register
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                handleLogout();
                setShow(false);
              }}
              className="text-red-600 hover:underline text-left"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default GuestNavbar;
