"use client";

const flight = {
  type: "flight-offer",
  id: "7",
  source: "GDS",
  instantTicketingRequired: false,
  nonHomogeneous: false,
  oneWay: false,
  isUpsellOffer: false,
  lastTicketingDate: "2025-10-31",
  lastTicketingDateTime: "2025-10-31",
  numberOfBookableSeats: 9,
  itineraries: [
    {
      duration: "PT22H15M",
      segments: [
        {
          departure: {
            iataCode: "DAC",
            terminal: "1",
            at: "2025-11-05T01:05:00",
          },
          arrival: {
            iataCode: "HKG",
            terminal: "1",
            at: "2025-11-05T06:35:00",
          },
          carrierCode: "CX",
          number: "662",
          aircraft: {
            code: "333",
          },
          operating: {
            carrierCode: "CX",
          },
          duration: "PT3H30M",
          id: "7",
          numberOfStops: 0,
          blacklistedInEU: false,
        },
        {
          departure: {
            iataCode: "HKG",
            terminal: "1",
            at: "2025-11-05T10:40:00",
          },
          arrival: {
            iataCode: "LHR",
            terminal: "3",
            at: "2025-11-05T17:20:00",
          },
          carrierCode: "CX",
          number: "239",
          aircraft: {
            code: "359",
          },
          operating: {
            carrierCode: "CX",
          },
          duration: "PT14H40M",
          id: "8",
          numberOfStops: 0,
          blacklistedInEU: false,
        },
      ],
    },
  ],
  price: {
    currency: "USD",
    total: "771.80",
    base: "526.00",
    fees: [
      {
        amount: "0.00",
        type: "SUPPLIER",
      },
      {
        amount: "0.00",
        type: "TICKETING",
      },
    ],
    grandTotal: "771.80",
  },
  pricingOptions: {
    fareType: ["PUBLISHED"],
    includedCheckedBagsOnly: true,
  },
  validatingAirlineCodes: ["CX"],
  travelerPricings: [
    {
      travelerId: "1",
      fareOption: "STANDARD",
      travelerType: "ADULT",
      price: {
        currency: "USD",
        total: "771.80",
        base: "526.00",
      },
      fareDetailsBySegment: [
        {
          segmentId: "7",
          cabin: "ECONOMY",
          fareBasis: "QK21BDAO",
          class: "Q",
          includedCheckedBags: {
            quantity: 1,
          },
          includedCabinBags: {
            quantity: 1,
          },
        },
        {
          segmentId: "8",
          cabin: "ECONOMY",
          fareBasis: "QK21BDAO",
          class: "Q",
          includedCheckedBags: {
            quantity: 1,
          },
          includedCabinBags: {
            quantity: 1,
          },
        },
      ],
    },
  ],
};

import React, { useContext, useState } from "react";
import { FcRefresh } from "react-icons/fc";
import { AnimatePresence, motion } from "motion/react";
import { AiOutlineFileProtect } from "react-icons/ai";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { StoreContext } from "../context/StoreContextMain";
import InitailLoad from "../components/InitailLoad";
import { FiClock } from "react-icons/fi";
const page = () => {
  const [inDepthTab, setInDepthTab] = useState(false);
  const { searchFormData, availableFlights } = useContext(StoreContext);
  console.log(availableFlights);
  return (
    <div className="mt-5 flex h-[100vh] w-full justify-center items-center">
      <InitailLoad page={"demo"} />
      <div className="w-[65vw]   rounded bg-white border-2">
        <div className="p-5 shadow-lg">
          <div className="text-xl flex gap-4 font-semibold items-center">
            {searchFormData.fromOrigin.address.cityName}{" "}
            <HiOutlineArrowNarrowRight />
            {searchFormData.toOrigin.address.cityName}
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
                {searchFormData.fromOrigin.iataCode}{" "}
                {searchFormData.fromOrigin.address.cityName}{" "}
                {searchFormData.fromOrigin.name}
                {" T "}
                {flight.itineraries[0].segments[0].departure.terminal}
              </div>
              <div className="col-span-2 p-5 font-semibold ">
                <img
                  src={`https://img.wway.io/pics/root/BG@png?exar=1&rs=fit:100:100`}
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
                {searchFormData.toOrigin.iataCode}{" "}
                {searchFormData.toOrigin.address.cityName}{" "}
                {searchFormData.toOrigin.name}
                {" T-"}
                {
                  flight.itineraries[0].segments[
                    flight.itineraries[0].segments.length - 1
                  ].departure.terminal
                }
              </div>
            </div>
          )}
          {!inDepthTab && (
            <motion.div
              initial={{
                height: 0,
                opacity: 1,
              }}
              animate={{
                height: "auto",
              }}
              transition={{
                duration: 0.4,
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
                {searchFormData.fromOrigin.iataCode}{" "}
                {searchFormData.fromOrigin.address.cityName}{" "}
                {searchFormData.fromOrigin.name}
                {" T "}
                {flight.itineraries[0].segments[0].departure.terminal}
              </div>
              <div className="col-span-2 p-5 font-semibold ">
                <img
                  src={`https://img.wway.io/pics/root/BG@png?exar=1&rs=fit:100:100`}
                  className="object-cover bg-transparent"
                />
              </div>
              <div className="border-r-4  border-dotted mr-4 col-span-1 border-gray-500"></div>
              <div
                onClick={() => setInDepthTab(true)}
                className="col-span-9 my-2 cursor-pointer p-3 text-sm border"
              >
                <div className="">
                  Transfer in {flight.itineraries[0].segments.length - 1} stops
                  <div className="flex underline  justify-center items-center gap-2 -ml-5">
                    <div className="text-sky-500">
                      {" "}
                      <AiOutlineFileProtect />{" "}
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
                {searchFormData.toOrigin.iataCode}{" "}
                {searchFormData.toOrigin.address.cityName}{" "}
                {searchFormData.toOrigin.name}
                {" T-"}
                {
                  flight.itineraries[0].segments[
                    flight.itineraries[0].segments.length - 1
                  ].departure.terminal
                }
              </div>
            </motion.div>
          )}

          {inDepthTab && (
            <motion.div
              initial={{
                height: 0,
                opacity: 1,
              }}
              animate={{
                height: "auto",
              }}
              transition={{
                duration: 0.7,
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
                            {searchFormData.fromOrigin.address.cityName}{" "}
                            {searchFormData.fromOrigin.name}
                            {" T-"}
                            {segment.departure.terminal}
                          </>
                        )}
                        {i > 0 && <> Leave {segment.departure.iataCode}</>}
                      </div>
                      <div className="col-span-2 font-semibold ">
                        <img
                          src={`https://img.wway.io/pics/root/BG@png?exar=1&rs=fit:100:100`}
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
                            {searchFormData.toOrigin.address.cityName}{" "}
                            {searchFormData.toOrigin.name}
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
                          <div className="col-span-9 cursor-pointer p-3 text-sm border">
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
                            <div className="flex underline  justify-center items-center gap-2 -ml-5">
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
            </motion.div>
          )}
        </div>
        <div className="flex justify-end items-center gap-3 p-3 shadow-xl w-full">
          <div className="text-xl text-sky-500 underline cursor-pointer ">{`$${flight.price.total}`}</div>
          <div className="px-4 cursor-pointer py-3 text-xl bg-sky-700 rounded-lg text-white">
            {/* Continue */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
