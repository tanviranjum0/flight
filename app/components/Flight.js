"use client";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import logo from "../../public/logo2.png";
import FlightDetails from "./FlightDetails";
import FareSummary from "./FareSummary";
import FareRules from "./FareRules";
import { StoreContext } from "../context/StoreContextMain";

const Flight = ({ flight, searchFormData }) => {
  const { handleBookNowClick, availableFlights } = useContext(StoreContext);
  const [details, setDetails] = useState("");
  return (
    <div className="my-5">
      <div className="grid  grid-cols-2 md:grid-cols-6 border py-5 rounded-lg bg-sky-100 ">
        <div className="p-1 pl-5">
          <Image
            src={logo}
            width={80}
            height={80}
            alt={logo}
            className="py-5"
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
          <div className="text-sm"> Depart</div>
          <div className="pt-2 md:text-lg">
            {new Date(flight.itineraries[0].segments[0].departure.at)
              .toLocaleTimeString()
              .replace(":00", "")}
          </div>
          <div className="">
            {new Date(flight.itineraries[0].segments[0].departure.at)
              .toUTCString()
              .slice(0, 17)}
          </div>
          <div className="text-sm my-auto">
            {searchFormData.fromOrigin.name}
          </div>
        </div>
        <div className="p-2 mt-10 flex items-center justify-center flex-col">
          <div className="text-sm">
            {/* {flight.itineraries[0].duration} */}
            {/* {Math.floor(
              (new Date(
                flight.itineraries[0].segments[0].arrival.at
              ).getTime() -
                new Date(
                  flight.itineraries[0].segments[0].departure.at
                ).getTime()) /
                60000 /
                60
            )}
            hour
            {((new Date(
              flight.itineraries[0].segments[0].arrival.at
            ).getTime() -
              new Date(
                flight.itineraries[0].segments[0].departure.at
              ).getTime()) /
              60000) %
              60}
            min */}
          </div>
          <div className="text-5xl md:text-7xl">
            <MdOutlineArrowRightAlt />
          </div>
          <div className="">
            {flight?.itineraries[0]?.segments?.length > 1
              ? `${flight?.itineraries[0]?.segments?.length} Stops`
              : "Non Stop"}
          </div>
        </div>
        <div className="p-2 mt-10">
          <div className="text-sm"> Arrive</div>
          <div className="pt-2 text-lg">
            {`${flight.itineraries[0].duration.slice(2).split("H")[0]} Hours ${
              flight.itineraries[0].duration
                .slice(2)
                .split("H")[1]
                .split("M")[0]
                ? `${
                    flight.itineraries[0].duration
                      .slice(2)
                      .split("H")[1]
                      .split("M")[0]
                  } Minutes`
                : ""
            }
              `}
            {/* {new Date(flight.itineraries[0].segments[0].arrival.at)
              .toLocaleTimeString()
              .replace(":00", "")}
          </div>
          <div className="">
            {new Date(flight.itineraries[0].segments[0].arrival.at)
              .toUTCString()
              .slice(0, 17)} */}
          </div>
          <div className="text-sm my-auto">{searchFormData.toOrigin.name}</div>
        </div>
        <div className="p-2 mt-10">
          <div className="text-sm ">Price</div>
          <div className="text-xl pt-5">
            {flight.price.currency} {flight.price.total}
          </div>
          <div className="text-sm pt-3">
            {flight.travelerPricings[0].fareDetailsBySegment[0].cabin} CLASS
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
      <div className="absolute right-20 ">
        <div
          onClick={() => {
            if (details == "") setDetails("details");
            else {
              setDetails("");
            }
          }}
          className="relative bottom-10 hover:text-black cursor-pointer semi-bold text-sky-800"
        >
          Flight Details &#8595;
        </div>
      </div>
      {details == "details" && (
        <FlightDetails
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
    </div>
  );
};

export default Flight;
