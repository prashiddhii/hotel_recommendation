import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth"; // Adjust path as needed

const HeroSection = () => {
  const navigate = useNavigate();

  const handleFindStayClick = () => {
    if (!isAuthenticated()) {
      // Redirect to login with return path
      navigate("/login", { state: { from: "/#recommendation" } });
    } else {
      // Scroll to recommendations if on same page
      const recommendationsElement = document.getElementById("recommendation");
      if (recommendationsElement) {
        recommendationsElement.scrollIntoView({ behavior: "smooth" });
      } else {
        // If recommendations is a separate page
        navigate("/recommendation");
      }
    }
  };

  return (
    <div id="home" className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="min-h-screen container mx-auto px-4 py-24 md:py-44">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Side */}
          <div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Select Your Stay
              <br />
              With <span className="text-blue-950">BookMyGo</span>
            </h1>
            <p className="mt-6 text-gray-600 text-base md:text-lg">
              Select Hotels as per your liking and needs
            </p>
            
            {/* Find Your Perfect Stay Button */}
            <button
              className="bg-blue-900 text-white px-8 py-4 rounded-2xl shadow-md hover:bg-blue-800 transition duration-300 text-base md:text-lg font-semibold flex items-center gap-3 mt-8"
              onClick={handleFindStayClick}
            >
              Find Your Perfect Stay
              <FaArrowRight className="text-white text-base md:text-lg" />
            </button>
          </div>

          {/* Right Side - Hero Image */}
          <div className="relative flex justify-center items-center">
            {/* Background Circle */}
            <div className="absolute w-72 h-72 md:w-[500px] md:h-[500px] bg-blue-900 rounded-full -z-10" />

            {/* Image */}
            <img
              src="./house.svg"
              alt="Hotel"
              className="w-72 h-72 md:w-[500px] md:h-[500px] object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;