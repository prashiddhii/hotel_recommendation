import React from "react";
import HeroSection from "../components/HeroSection";
import Contact from "../components/Contact";
// import Recommendation from "../components/Recommendation";

const Home = () => {
  return (
    <div className="app">
      <HeroSection />
      <Contact />
      {/* <Recommendation/> */}
      {/* Add other sections like About, Services, etc. */}
    </div>
  );
};

export default Home;
