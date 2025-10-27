"use client";
import { motion } from "motion/react";
import { useContext } from "react";
import { StoreContext } from "../context/StoreContextMain";
import FlightDetailsTab from "./molecule/FlightDetailsTab";
const FareRules = ({ details, setDetails }) => {
  return (
    <div className="flex mt-5 flex-col">
      {/* <div className="flex my-3 justify-center items-center cursor-pointer">
        <div
          onClick={() => setDetails("details")}
          className={`px-3 py-2 border rounded shadow-lg ${
            details === "details" ? "bg-sky-800 text-white" : ""
          }`}
        >
          Flight Details
        </div>
        <div
          onClick={() => setDetails("fare")}
          className={`px-3 py-2 border rounded shadow-lg ${
            details === "fare" ? "bg-sky-800 text-white" : ""
          }`}
        >
          Fare Summary
        </div>

        <div
          onClick={() => setDetails("rule")}
          className={`px-3 py-2 border rounded shadow-lg ${
            details === "rule" ? "bg-sky-800 text-white" : ""
          }`}
        >
          Fare Rules
        </div>
      </div> */}
      <motion.div
        key={"farerulesmain"}
        initial={{ filter: "blur(10px)", scaleY: 0 }}
        animate={{ filter: "none", scaleY: 1 }}
        className=" bg-yellow-200 p-5 rounded"
      >
        Important Note :{" "}
        <span className="text-sm">
          Special Discounts (Passengers who have purchased a discounted ticket
          must present documents showing they are entitled to the discount)
          (Discounts are applied to the net ticket fare. Taxes, fees and other
          charges do not apply.)
        </span>
      </motion.div>
    </div>
  );
};

export default FareRules;
