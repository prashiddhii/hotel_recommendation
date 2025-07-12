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
import Navbar from "./components/Navbar";
import Recommendation from "./components/Recommendation";
import { isAuthenticated } from "./utils/auth"; // helper to check token

// App.jsx
function App() {
  return (
    <Router>
      <Navbar /> {/* Always visible */}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} /> {/* Contains HeroSection */}
        
        {/* Auth Routes */}
        <Route 
          path="/login" 
          element={isAuthenticated() ? <Navigate to="/" /> : <Login />} 
        />
        <Route 
          path="/register" 
          element={isAuthenticated() ? <Navigate to="/" /> : <Register />} 
        />

        {/* Protected Recommendation Page */}
        <Route 
          path="/recommendations" 
          element={isAuthenticated() ? <Recommendation /> : <Navigate to="/login" />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
