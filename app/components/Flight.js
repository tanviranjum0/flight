"use client";
import { useContext, useState } from "react";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import logo from "../../public/logo2.png";
import FlightDetails from "./FlightDetails";
import FareSummary from "./FareSummary";
import FareRules from "./FareRules";
import FlightDetailsTab from "./molecule/FlightDetailsTab";
import { StoreContext } from "../context/StoreContextMain";
import Timeline from "./Timeline";
import { AnimatePresence, motion } from "motion/react";

const Flight = ({ flight, searchFormData }) => {
  const { handleBookNowClick, availableFlights } = useContext(StoreContext);
  const [details, setDetails] = useState("details");
  const [isTabOpen, setIsTabopen] = useState(false);
  return (
    <div className="my-5">
      <div className="grid  grid-cols-2 md:grid-cols-6 border py-5 rounded-lg bg-sky-100 ">
        <div className="p-1 pl-5">
          <img
            src={`https://img.wway.io/pics/root/${flight?.itineraries[0]?.segments[0]?.operating?.carrierCode}@png?exar=1&rs=fit:400:200`}
            alt={logo}
            className="py-5 object-cover bg-transparent h-fit max-w-40"
          />
          <div className="text-sm">
            {
              availableFlights?.dictionaries?.carriers[
                flight?.itineraries[0]?.segments[0]?.carrierCode
              ]
            }
          </div>
          <div className="text-green-600">Partially Refundable</div>
        </div>
        <div className="p-2 mt-10">
          <div className="text-sm">Depart</div>
          <div className="pt-2 md:text-lg">
            {new Date(flight?.itineraries[0]?.segments[0]?.departure?.at)
              .toLocaleTimeString()
              .replace(":00", "")}
          </div>
          <div className="">
            {new Date(flight?.itineraries[0]?.segments[0]?.departure?.at)
              .toUTCString()
              .slice(0, 17)}
          </div>
          <div className="text-sm my-auto">
            {searchFormData?.fromOrigin?.name}
          </div>
        </div>
        <div className="p-2 mt-10 flex items-center justify-center flex-col">
          <div className="text-sm">
            {Math.floor(
              (new Date(
                flight?.itineraries[0]?.segments[
                  flight?.itineraries[0]?.segments?.length - 1
                ]?.arrival?.at
              ).getTime() -
                new Date(
                  flight?.itineraries[0]?.segments[0]?.departure?.at
                ).getTime()) /
                60000 /
                60
            )}{" "}
            hours{" "}
            {((new Date(
              flight?.itineraries[0]?.segments[
                flight?.itineraries[0]?.segments?.length - 1
              ]?.arrival?.at
            ).getTime() -
              new Date(
                flight?.itineraries[0]?.segments[0]?.departure?.at
              ).getTime()) /
              60000) %
              60}{" "}
            min
          </div>
          <div className="text-5xl md:text-7xl">
            <MdOutlineArrowRightAlt />
          </div>
          <div className="">
            {flight?.itineraries[0]?.segments?.length > 1
              ? `${flight?.itineraries[0]?.segments?.length - 1} Stops`
              : "Non Stop"}
          </div>
        </div>
        <div className="p-2 mt-10">
          <div className="text-sm">Arrive</div>
          <div className="pt-2 text-lg">
            {new Date(
              flight?.itineraries[0]?.segments[
                flight?.itineraries[0]?.segments?.length - 1
              ]?.arrival?.at
            )
              .toLocaleTimeString()
              .replace(":00", "")}
          </div>
          <div className="">
            {new Date(
              flight?.itineraries[0]?.segments[
                flight?.itineraries[0]?.segments?.length - 1
              ]?.arrival?.at
            )
              .toUTCString()
              .slice(0, 17)}
          </div>
          <div className="text-sm my-auto">
            {searchFormData?.toOrigin?.name}
          </div>
        </div>
        <div className="p-2 mt-10">
          <div className="text-sm ">Price</div>
          <div className="text-xl pt-5">
            {flight?.price?.currency} {flight?.price?.total}
          </div>
          <div className="text-sm pt-3">
            {flight?.travelerPricings[0]?.fareDetailsBySegment[0]?.cabin} CLASS
          </div>
        </div>
        <div className="mt-5">
          <button
            onClick={() => {
              return handleBookNowClick(
                flight,
                availableFlights?.dictionaries?.carriers[
                  flight?.itineraries[0]?.segments[0]?.carrierCode
                ]
              );
            }}
            className="mt-5 text-center bg-sky-300 hover:bg-sky-800 hover:text-sky-200 px-5 py-3 rounded-md transition-all duration-200 active:scale-95"
          >
            Book Now!
          </button>
        </div>
      </div>
      <div className="absolute right-20">
        <div
          onClick={() => {
            setIsTabopen((prev) => !prev);
          }}
          className="relative bottom-10 hover:text-black cursor-pointer semi-bold text-sky-800"
        >
          Flight Details &#8595;
        </div>
      </div>
      <AnimatePresence mode="wait">
        {isTabOpen && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            transition={{
              duration: 0.5,
            }}
            exit={{
              opacity: 0,
              height: 0,
              transition: {
                duration: 0.25,
              },
            }}
          >
            <FlightDetailsTab
              flightId={`flight-${flight.id}`}
              details={details}
              setDetails={setDetails}
            />
            {details == "details" && (
              <FlightDetails
                details={details}
                flight={flight}
                searchFormData={searchFormData}
                setDetails={setDetails}
              />
            )}
            {details == "timeline" && (
              <Timeline
                details={details}
                flight={flight}
                searchFormData={searchFormData}
                setDetails={setDetails}
              />
            )}
            {details == "fare" && (
              <FareSummary
                details={details}
                flight={flight}
                searchFormData={searchFormData}
                setDetails={setDetails}
              />
            )}

            {details == "rule" && (
              <FareRules
                details={details}
                searchFormData={searchFormData}
                flight={flight}
                setDetails={setDetails}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Flight;
