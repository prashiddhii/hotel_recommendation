import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Recommendation from "./components/Recommendation";
import { isAuthenticated } from "./utils/auth";

// Import both navbars
import GuestNavbar from "./components/GuestNavbar"; // guest version
import UserNavbar from "./components/UserNavbar"; // logged-in version
import Popular from "./components/Popular";

function App() {
  return (
    <Router>
      {/* Conditional Navbar */}
      {isAuthenticated() ? <UserNavbar /> : <GuestNavbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/popular" element={<Popular />} />
    

        {/* Auth Routes */}
        <Route
          path="/login"
          element={isAuthenticated() ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/register"
          element={isAuthenticated() ? <Navigate to="/" /> : <Register />}
        />

        {/* Protected Route */}
        <Route
          path="/recommendation"
          element={isAuthenticated() ? <Recommendation /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
