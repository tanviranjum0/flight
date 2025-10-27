import Navbar from "../components/Navbar";
import HomeSearch from "../components/HomeSearch";
import Flights from "../components/Flights";
import Footer from "../components/Footer";
import InitailLoad from "../components/InitailLoad";

const page = () => {
  return (
    <div>
      <div className="h-[90vh] main-bg text-sky-800">
        <Navbar />
        <HomeSearch modify={true} />
      </div>
      <Flights />
      <Footer />
      <InitailLoad />
    </div>
  );
};

export default page;
