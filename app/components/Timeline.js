"use client";
import React, { useContext, useState } from "react";
import { FcRefresh } from "react-icons/fc";
import { motion } from "motion/react";
import { AiOutlineFileProtect } from "react-icons/ai";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { StoreContext } from "../context/StoreContextMain";
import InitailLoad from "./InitailLoad";
import { FiClock } from "react-icons/fi";

const FlightTimeline = ({ flight }) => {
  const [inDepthTab, setInDepthTab] = useState(false);
  const { searchFormData, availableFlights, handleBookNowClick } =
    useContext(StoreContext);
  console.log(availableFlights);
  return (
    <div className="mt-5 flex w-full justify-center items-center">
      <InitailLoad page={"demo"} />
      <div className="rounded bg-white w-full border-2">
        <div className="p-5 shadow-lg">
          <div className="text-xl flex gap-4 font-semibold items-center">
            {searchFormData?.fromOrigin?.address.cityName}{" "}
            <HiOutlineArrowNarrowRight />
            {searchFormData?.toOrigin?.address.cityName}
          </div>
          <div className="flex my-3 gap-3 items-center text-sm">
            <div className="py-1 px-1.5 rounded bg-gray-800 text-white">
              Depart
            </div>
            <div className="">
              {new Date(flight.itineraries[0].segments[0].departure.at)
                .toUTCString()
                .slice(0, 17)}
              {" |"}
            </div>
            <div className="">
              Duration :{" "}
              {Math.floor(
                (new Date(
                  flight.itineraries[0].segments[
                    flight.itineraries[0].segments.length - 1
                  ].arrival.at
                ).getTime() -
                  new Date(
                    flight.itineraries[0].segments[0].departure.at
                  ).getTime()) /
                  60000 /
                  60
              )}{" "}
              hours{" "}
              {((new Date(
                flight.itineraries[0].segments[
                  flight.itineraries[0].segments.length - 1
                ].arrival.at
              ).getTime() -
                new Date(
                  flight.itineraries[0].segments[0].departure.at
                ).getTime()) /
                60000) %
                60}{" "}
              min
            </div>
          </div>
          {flight.itineraries[0].segments.length == 1 && (
            <div className="grid text-gray-700 grid-cols-12 w-[50%]">
              <div className="col-span-2 font-semibold">
                {" "}
                {new Date(flight.itineraries[0].segments[0].departure.at)
                  .toLocaleTimeString()
                  .replace(":00", "")}{" "}
              </div>
              <div className="border-r-4 mr-4 col-span-1 border-gray-500"></div>

              <div className="col-span-9 font-bold text-sm">
                {searchFormData?.fromOrigin?.iataCode}{" "}
                {searchFormData?.fromOrigin?.address.cityName}{" "}
                {searchFormData?.fromOrigin?.name}
                {" T-"}
                {flight.itineraries[0].segments[0].departure.terminal}
              </div>
              <div className="col-span-2 p-5 font-semibold ">
                <img
                  src={`https://img.wway.io/pics/root/${flight.itineraries[0].segments[0].carrierCode}@png?exar=1&rs=fit:100:100`}
                  className="object-cover bg-transparent"
                />
              </div>
              <div className="border-r-4  border-dotted mr-4 col-span-1 border-gray-500"></div>
              <div className="col-span-9 h-full w-full flex items-center text-xs">
                {
                  availableFlights?.dictionaries?.carriers[
                    flight?.itineraries[0]?.segments[0]?.carrierCode
                  ]
                }{" "}
                {
                  availableFlights?.dictionaries?.aircraft[
                    flight?.itineraries[0]?.segments[0]?.aircraft.code
                  ]
                }{" "}
                {flight.travelerPricings[0].fareDetailsBySegment[0].cabin} Class
              </div>
              <div className="col-span-2 font-semibold ">
                {new Date(
                  flight.itineraries[0].segments[
                    flight.itineraries[0].segments.length - 1
                  ].arrival.at
                )
                  .toLocaleTimeString()
                  .replace(":00", "")}{" "}
              </div>
              <div className="border-r-4 mr-4 col-span-1 border-gray-500"></div>
              <div className="col-span-9 font-bold text-sm">
                {searchFormData?.toOrigin?.iataCode}{" "}
                {searchFormData?.toOrigin?.address.cityName}{" "}
                {searchFormData?.toOrigin?.name}
                {" T-"}
                {
                  flight.itineraries[0].segments[
                    flight.itineraries[0].segments.length - 1
                  ].departure.terminal
                }
              </div>
            </div>
          )}
          {/* <AnimatePresence mode="wait"> */}
          {!inDepthTab && (
            <>
              <motion.div
                key={"basicFlightDetails"}
                initial={{ filter: "blur(10px)", scaleY: 0 }}
                animate={{ filter: "none", scaleY: 1 }}
                transition={{
                  duration: 0.7,
                  type: "spring",
                  bounce: 0,
                }}
                className="grid text-gray-700 grid-cols-12 w-[50%]"
              >
                <div className="col-span-2 font-semibold">
                  {" "}
                  {new Date(flight.itineraries[0].segments[0].departure.at)
                    .toLocaleTimeString()
                    .replace(":00", "")}{" "}
                </div>
                <div className="border-r-4 mr-4 col-span-1 border-gray-500"></div>

                <div className="col-span-9 font-bold text-sm">
                  {searchFormData?.fromOrigin?.iataCode}{" "}
                  {searchFormData?.fromOrigin?.address.cityName}{" "}
                  {searchFormData?.fromOrigin?.name}
                  {" T-"}
                  {flight.itineraries[0].segments[0].departure.terminal}
                </div>
                <div className="col-span-2 p-5 font-semibold ">
                  <img
                    src={`https://img.wway.io/pics/root/${flight.itineraries[0].segments[0].carrierCode}@png?exar=1&rs=fit:100:100`}
                    className="object-cover bg-transparent"
                  />
                </div>
                <div className="border-r-4 border-dotted mr-4 col-span-1 border-gray-500"></div>
                <div
                  onClick={() => setInDepthTab(true)}
                  className="col-span-9 my-2 cursor-pointer flex items-center text-sm "
                >
                  <div className="border p-3 ">
                    Transfer in {flight.itineraries[0].segments.length - 1}{" "}
                    stops
                    <div className="flex underline items-center gap-2">
                      <div className="text-sky-500">
                        <AiOutlineFileProtect />
                      </div>
                      No need to collect & re-check baggage
                    </div>
                  </div>
                </div>
                <div className="col-span-2 font-semibold ">
                  {new Date(
                    flight.itineraries[0].segments[
                      flight.itineraries[0].segments.length - 1
                    ].arrival.at
                  )
                    .toLocaleTimeString()
                    .replace(":00", "")}{" "}
                </div>
                <div className="border-r-4 mr-4 col-span-1 border-gray-500"></div>
                <div className="col-span-9 font-bold text-sm">
                  {searchFormData?.toOrigin?.iataCode}{" "}
                  {searchFormData?.toOrigin?.address.cityName}{" "}
                  {searchFormData?.toOrigin?.name}
                  {" T-"}
                  {
                    flight.itineraries[0].segments[
                      flight.itineraries[0].segments.length - 1
                    ].departure.terminal
                  }
                </div>
              </motion.div>
              <div className="flex justify-end items-center gap-3 p-3 shadow-xl w-full">
                <div className="text-xl text-sky-500 underline cursor-pointer ">{`$${flight.price.total}`}</div>
                <div
                  onClick={() => {
                    return handleBookNowClick(
                      flight,
                      availableFlights?.dictionaries?.carriers[
                        flight?.itineraries[0]?.segments[0]?.carrierCode
                      ]
                    );
                  }}
                  className="px-4 cursor-pointer py-3 text-xl bg-sky-700 rounded-lg text-white"
                >
                  Continue
                </div>
              </div>
            </>
          )}
          {/* </AnimatePresence> */}
          {/* <AnimatePresence mode="wait"> */}
          {inDepthTab && (
            <motion.div
              key={"inDetailFlightinfo"}
              initial={{ filter: "blur(10px)", scaleY: 0 }}
              animate={{ filter: "none", scaleY: 1 }}
              transition={{
                duration: 0.7,
                type: "spring",
                bounce: 0,
              }}
              onClick={() => setInDepthTab(false)}
            >
              {flight.itineraries[0].segments.length > 1 &&
                flight.itineraries[0].segments.map((segment, i) => {
                  console.log(i);
                  return (
                    <div
                      key={`${i}-${flight.itineraries[0].segments[i].arrival.at}`}
                      className="grid text-gray-700 grid-cols-12 w-[50%]"
                    >
                      <div className="col-span-2 font-semibold">
                        {" "}
                        {new Date(segment.departure.at)
                          .toLocaleTimeString()
                          .replace(":00", "")}{" "}
                      </div>
                      <div className="border-r-4 mr-4 col-span-1 border-gray-500"></div>
                      <div className="col-span-9 font-bold text-sm">
                        {i == 0 && (
                          <>
                            {" "}
                            {segment.departure.iataCode}{" "}
                            {searchFormData?.fromOrigin?.address.cityName}{" "}
                            {searchFormData?.fromOrigin?.name}
                            {" T-"}
                            {segment.departure.terminal}
                          </>
                        )}
                        {i > 0 && <> Leave {segment.departure.iataCode}</>}
                      </div>
                      <div className="col-span-2 font-semibold ">
                        <img
                          src={`https://img.wway.io/pics/root/${flight.itineraries[0].segments[0].carrierCode}@png?exar=1&rs=fit:100:100`}
                          className="object-cover bg-transparent"
                        />
                      </div>
                      <div className="h-full flex items-center justify-center col-span-1 border-r-4 border-dotted mr-4 border-gray-500"></div>

                      <div className="col-span-9 h-full w-full text-xs">
                        <div className="py-1 px-2 cursor-pointer">
                          {
                            availableFlights?.dictionaries?.carriers[
                              segment?.carrierCode
                            ]
                          }{" "}
                          {
                            availableFlights?.dictionaries?.aircraft[
                              segment?.aircraft.code
                            ]
                          }{" "}
                          {
                            flight.travelerPricings[0].fareDetailsBySegment[0]
                              .cabin
                          }{" "}
                          Class
                        </div>
                        <div className="text-xs flex items-center gap-1">
                          <FiClock /> Flight Time:{" "}
                          {Math.floor(
                            (new Date(segment.arrival.at).getTime() -
                              new Date(segment.departure.at).getTime()) /
                              60000 /
                              60
                          )}
                          h{" "}
                          {((new Date(segment.arrival.at).getTime() -
                            new Date(segment.departure.at).getTime()) /
                            60000) %
                            60}
                          m
                        </div>
                      </div>

                      <div className="col-span-2 font-semibold ">
                        {" "}
                        {new Date(segment.arrival.at)
                          .toLocaleTimeString()
                          .replace(":00", "")}{" "}
                      </div>
                      <div className="border-r-4 mr-4 col-span-1 border-gray-500"></div>
                      <div className="col-span-9 font-bold text-sm">
                        {i == flight.itineraries[0].segments.length - 1 && (
                          <>
                            {segment.arrival.iataCode}{" "}
                            {searchFormData?.toOrigin?.address.cityName}{" "}
                            {searchFormData?.toOrigin?.name}
                            {" T-"}
                            {segment.arrival.terminal}
                          </>
                        )}
                        {i < flight.itineraries[0].segments.length && (
                          <> Transit in {segment.arrival.iataCode}</>
                        )}
                      </div>
                      {flight.itineraries[0].segments.length - 1 != i && (
                        <div className="col-span-12 my-3 grid grid-cols-12">
                          <div className="col-span-1"></div>
                          <div className="col-span-1"></div>
                          <div className="col-span-1 rotate-90 text-black h-full flex items-center justify-center border-gray-500">
                            <FcRefresh />
                          </div>
                          <div className="col-span-9 my-2 cursor-pointer p-3 text-sm border">
                            <div className="py-1">
                              Transfer in {segment.arrival.iataCode}{" "}
                              {Math.floor(
                                (new Date(
                                  flight.itineraries[0].segments[
                                    i + 1
                                  ].departure.at
                                ).getTime() -
                                  new Date(
                                    flight.itineraries[0].segments[i].arrival.at
                                  ).getTime()) /
                                  60000 /
                                  60
                              )}
                              h{" "}
                              {((new Date(
                                flight.itineraries[0].segments[
                                  i + 1
                                ].departure.at
                              ).getTime() -
                                new Date(
                                  flight.itineraries[0].segments[i].arrival.at
                                ).getTime()) /
                                60000) %
                                60}
                              m
                            </div>
                            <div className="flex underline items-center gap-2">
                              <div className="text-sky-500">
                                {" "}
                                <AiOutlineFileProtect />{" "}
                              </div>
                              No need to collect & re-check baggage
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              <div className="flex justify-end items-center gap-3 p-3 shadow-xl w-full">
                <div className="text-xl text-sky-500 underline cursor-pointer ">{`$${flight.price.total}`}</div>
                <div
                  onClick={() => {
                    return handleBookNowClick(
                      flight,
                      availableFlights?.dictionaries?.carriers[
                        flight?.itineraries[0]?.segments[0]?.carrierCode
                      ]
                    );
                  }}
                  className="px-4 cursor-pointer py-3 text-xl bg-sky-700 rounded-lg text-white"
                >
                  Continue
                </div>
              </div>
            </motion.div>
          )}
          {/* </AnimatePresence> */}
        </div>
      </div>
    </div>
  );
};

export default FlightTimeline;
