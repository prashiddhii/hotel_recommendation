import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RxCross2, RxHamburgerMenu } from "react-icons/rx";
import { logout } from "../utils/auth";

const UserNavbar = () => {
  const [show, setShow] = useState(false);

  const handleLogout = () => {
    logout();
    window.location.href = "/login"; // redirect after logout
  };

  return (
    <nav className="px-4 py-4 flex items-center justify-between fixed top-0 left-0 right-0 z-50 bg-gray-100/50 backdrop-blur-md">
      {/* Brand Logo */}
      <Link to="/" className="flex cursor-pointer items-center space-x-2">
        <span className="text-3xl font-bold text-blue-950">B</span>
        <span className="text-xl font-semibold">OOK MY GO</span>
      </Link>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center space-x-6">
        <Link
          to="/about"
          className="text-gray-600 hover:text-blue-950 transition"
        >
          About
        </Link>
        <Link
          to="/popular"
          className="text-gray-600 hover:text-blue-950 transition"
        >
          Popular
        </Link>
        <Link
          to="/recommendation"
          className="text-gray-600 hover:text-blue-950 transition"
        >
          Recommendation
        </Link>

        <button
          onClick={handleLogout}
          className="text-red-600 font-medium hover:underline"
        >
          Logout
        </button>
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
          <Link
            to="/about"
            className="text-gray-600 hover:text-blue-950"
            onClick={() => setShow(false)}
          >
            About
          </Link>
          <Link
            to="/popular"
            className="text-gray-600 hover:text-blue-950"
            onClick={() => setShow(false)}
          >
            Popular
          </Link>
          <Link
            to="/recommendation"
            className="text-gray-600 hover:text-blue-950"
            onClick={() => setShow(false)}
          >
            Recommendation
          </Link>

          <button
            onClick={() => {
              handleLogout();
              setShow(false);
            }}
            className="text-red-600 hover:underline text-left"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default UserNavbar;
