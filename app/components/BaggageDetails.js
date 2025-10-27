"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { HiMiniXMark } from "react-icons/hi2";
import { useContext } from "react";
import img from "../images/turkish-logo.jpg";
import { StoreContext } from "../context/StoreContextMain";

const BaggageDetails = () => {
  const { handleDetails, reviewFlight } = useContext(StoreContext);
  console.log("Review Flight :", reviewFlight[0]);
  return (
    <div
      id="baggageDetails"
      className="absolute hidden overflow-hidden inset-0 backdrop-blur"
    >
      {" "}
      <motion.div
        key={"mainbaggageDetails"}
        initial={{
          scale: 0.9,
          opacity: 0.7,
        }}
        whileInView={{
          scale: 1,
          opacity: 1,
        }}
        transition={{
          duration: 0.5,
          type: "tween",
        }}
        className="flex justify-center h-screen w-screen inset-0 items-center"
      >
        <div className="w-[90vw]  py-5 bg-sky-50 md:w-[40vw] shadow-2xl">
          <div className="relative ">
            <HiMiniXMark
              onClick={() => handleDetails()}
              className="absolute top-0 right-0 mr-3 cursor-pointer text-3xl"
            />
          </div>

          <div className="text-lg py-3 px-4">
            Dhaka to Chittagong, 4 Sep 2024
          </div>
          <div className="border mx-3 p-4">
            <div className="flex">
              <img
                src={`https://content.airhex.com/content/logos/airlines_${reviewFlight[0].itineraries[0].segments[0].operating.carrierCode}_200_100_r.png`}
                className="py-5 object-cover bg-transparent max-w-20 m-3"
              />
              <div>
                <div className="text-xs pb-3">
                  {reviewFlight[0].airlineName}
                </div>
                <div className="text-md">BG | 121</div>
                <div className="text-sm font-semibold">
                  {" "}
                  Aircraft : Boeing 737-800 Operated by : BG
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 p-2 mx-auto justify-center">
            <div className="text-center">
              <div className="text-md py-3">Baggage</div>
              <div className="text-sm">Adult</div>
            </div>
            <div className="text-center">
              <div className="text-md py-3">Check In</div>
              <div className="text-sm">20kg(s)</div>
            </div>
            <div className="text-center">
              <div className="text-md py-3">Cabin</div>
              <div className="text-sm">7kg(s)</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BaggageDetails;
