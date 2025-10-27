import React from "react";
import Navbar from "./components/Navbar";
import HomeSearch from "./components/HomeSearch";
import HomeCarousel from "./components/HomeCarousel";
import Footer from "./components/Footer";
import ActiveAirlines from "./components/ActiveAirlines";
import InitailLoad from "./components/InitailLoad";

const page = () => {
  return (
    <div className="flex flex-col">
      <InitailLoad />
      <div className="h-fit pb-10 main-bg text-sky-800">
        <Navbar />
        <HomeSearch modify={false} />
      </div>
      <HomeCarousel />
      <ActiveAirlines />
      <Footer />
    </div>
  );
};

export default page;
