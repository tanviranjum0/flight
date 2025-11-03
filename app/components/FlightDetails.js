"use client";
import { motion } from "motion/react";
import { MdOutlineArrowRightAlt } from "react-icons/md";
const FlightDetails = ({ searchFormData, flight }) => {
  return (
    <div>
      <div className="p-5 shadow-md">
        <div className="border bg-sky-50  sm:text-lg px-3 py-1">
          {searchFormData?.fromOrigin?.address?.cityName} to{" "}
          {searchFormData?.toOrigin?.address?.cityName},{" "}
          {new Date(flight?.itineraries[0]?.segments[0]?.departure?.at)
            .toUTCString()
            .slice(0, 17)}
        </div>
        <motion.div
          initial={{ filter: "blur(10px)", scaleY: 0 }}
          animate={{ filter: "none", scaleY: 1 }}
          className="border bg-sky-50"
        >
          <div className="hidden sm:flex px-14 py-5">
            <img
              className="py-5 h-32 mx-5"
              src={`https://img.wway.io/pics/root/${flight?.itineraries[0]?.segments[0]?.operating?.carrierCode}@png?exar=1&rs=fit:400:200`}
              alt="flight-logo"
            />
            <div className="grid">
              <div className="text-lg">
                <span className="font-bold">{flight?.airlineName}</span>{" "}
                {flight?.itineraries[0]?.segments[0]?.carrierCode} |{" "}
                {flight?.itineraries[0]?.segments[0]?.aircraft?.code}
              </div>
              <div className="">
                Aircraft : {flight?.itineraries[0]?.segments[0]?.aircraft.code}
              </div>
              <div className="">
                Operated by : {flight?.itineraries[0]?.segments[0]?.carrierCode}
              </div>
              <div className="">
                Cabin :{" "}
                {flight?.travelerPricings[0]?.fareDetailsBySegment[0]?.cabin} (
                {flight?.travelerPricings[0]?.fareDetailsBySegment[0]?.class})
              </div>
              <div className="">
                Available seats: {flight?.numberOfBookableSeats}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3 p-4 md:p-8   ml-6 md:ml-14 text-sky-950">
            <div>
              <div className="text-lg">
                {new Date(
                  flight?.itineraries[0]?.segments[0]?.departure?.at
                ).toLocaleTimeString()}{" "}
                <span className="text-sm">(local)</span>
              </div>
              <div className="text-sm">
                {new Date(flight?.itineraries[0]?.segments[0]?.departure?.at)
                  .toUTCString()
                  .slice(0, 17)}
              </div>
              <div className="">
                ({flight?.itineraries[0]?.segments[0]?.departure?.iataCode})
              </div>
              <div className="text-sm">
                Terminal -{" "}
                {flight?.itineraries[0]?.segments[0]?.departure?.terminal}
              </div>
              <div className="text-sm">{searchFormData?.fromOrigin?.name}</div>
              <div className="text-xs pt-2">
                {searchFormData?.fromOrigin?.address?.cityName},
                {searchFormData?.fromOrigin?.address?.countryName}
              </div>
            </div>
            <div>
              <div className="text-sm">
                {Math.floor(
                  (new Date(
                    flight?.itineraries[0]?.segments[
                      flight.itineraries[0].segments.length - 1
                    ]?.arrival.at
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
              <div className="text-5xl ">
                <MdOutlineArrowRightAlt />
              </div>
            </div>
            <div>
              <div className="text-lg">
                {new Date(
                  flight?.itineraries[0]?.segments[
                    flight?.itineraries[0]?.segments?.length - 1
                  ]?.arrival?.at
                ).toLocaleTimeString()}{" "}
                <span className="text-sm">(local)</span>
              </div>
              <div className="text-sm">
                {new Date(
                  flight?.itineraries[0]?.segments[
                    flight?.itineraries[0]?.segments?.length - 1
                  ]?.arrival?.at
                )
                  .toUTCString()
                  .slice(0, 17)}
              </div>
              <div className="">
                (
                {
                  flight?.itineraries[0]?.segments[
                    flight?.itineraries[0]?.segments?.length - 1
                  ]?.arrival?.iataCode
                }
                )
              </div>
              <div className="text-sm">
                Terminal -{" "}
                {
                  flight?.itineraries[0]?.segments[
                    flight?.itineraries[0]?.segments?.length - 1
                  ]?.arrival?.terminal
                }
              </div>
              <div className="text-sm">{searchFormData?.toOrigin?.name}</div>
              <div className="text-xs pt-2">
                {" "}
                {searchFormData?.toOrigin?.address?.cityName},
                {searchFormData?.toOrigin?.address?.countryName}
              </div>
            </div>
            <div className="">
              <div className="font-semi-bold text-xl">Baggage</div>
              <div className="text-sm">Adult</div>
            </div>
            <div className="">
              <div className="font-semi-bold text-xl">Check In </div>
              <div className="text-sm">
                {" "}
                {(flight?.travelerPricings[0]?.fareDetailsBySegment[0]
                  ?.includedCheckedBags.quantity !=
                  null) |
                  (flight?.travelerPricings[0]?.fareDetailsBySegment[0]
                    ?.includedCheckedBags.quantity !=
                    undefined) &&
                  flight?.travelerPricings[0]?.fareDetailsBySegment[0]
                    ?.includedCheckedBags.quantity}
              </div>
            </div>
            <div className="">
              <div className="font-semi-bold text-xl">Cabin</div>
              <div className="text-sm">
                {" "}
                {(flight?.travelerPricings[0]?.fareDetailsBySegment[0]
                  ?.includedCabinBags?.quantity !=
                  null) |
                  (flight?.travelerPricings[0]?.fareDetailsBySegment[0]
                    ?.includedCabinBags?.quantity !=
                    undefined) &&
                  flight?.travelerPricings[0]?.fareDetailsBySegment[0]
                    ?.includedCabinBags?.quantity}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FlightDetails;
