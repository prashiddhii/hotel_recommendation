import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";

const Home = () => {
  return (
    <div className="app">
      <Navbar />
      <HeroSection />
      {/* Add other sections like About, Services, etc. */}
    </div>
  );
};

export default Home;
