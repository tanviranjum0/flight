"use client";
import { motion } from "motion/react";
import { HiMiniXMark } from "react-icons/hi2";
import { useContext } from "react";
import { StoreContext } from "../context/StoreContextMain";

const BaggageDetails = () => {
  const { handleDetails, searchFormData, reviewFlight } =
    useContext(StoreContext);
  return (
    <div
      id="baggageDetails"
      className="absolute hidden overflow-hidden inset-0 backdrop-blur"
    >
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
            {searchFormData.fromOrigin.name} (
            {reviewFlight.itineraries[0].segments[0].departure.iataCode}) to{" "}
            {searchFormData.toOrigin.name} (
            {reviewFlight.itineraries[0].segments[0].arrival.iataCode}),
          </div>
          <div className="text-lg  px-4">
            {" "}
            {new Date(reviewFlight.itineraries[0].segments[0].departure.at)
              .toUTCString()
              .slice(0, 17)}
          </div>
          <div className="border mx-3 p-4">
            <div className="flex">
              <img
                src={`https://img.wway.io/pics/root/${reviewFlight.itineraries[0].segments[0].operating.carrierCode}@png?exar=1&rs=fit:400:200`}
                // src={`https://content.airhex.com/content/logos/airlines_${reviewFlight.itineraries[0].segments[0].operating.carrierCode}_100_100_r.png`}
                className="py-5 object-cover bg-transparent max-w-20 m-3"
              />
              <div>
                <div className="text-xs pb-3">{reviewFlight.airlineName}</div>
                <div className="text-md">
                  {" "}
                  {reviewFlight.itineraries[0].segments[0].carrierCode} |{" "}
                  {reviewFlight.itineraries[0].segments[0].aircraft.code}
                </div>
                <div className="text-sm font-semibold">
                  {" "}
                  Aircraft :{" "}
                  {reviewFlight.itineraries[0].segments[0].aircraft.code}{" "}
                  Operated by : {reviewFlight.airlineName}
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
