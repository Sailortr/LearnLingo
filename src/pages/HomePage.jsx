import React from "react";
import HeroSection from "../components/Shared/HeroSection";
import StatisticsSection from "../components/Shared/StatisticsSection";

const HomePage = () => {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <StatisticsSection />
    </div>
  );
};

export default HomePage;
