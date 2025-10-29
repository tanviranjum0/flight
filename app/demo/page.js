// // "use client";
// // import { useState } from "react";
// // import { motion, AnimatePresence } from "framer-motion";
// // const page = () => {
// //   const [number, setNumber] = useState(0);
// //   return (
// //     <div className="mt-5 flex justify-center items-center h-[100vh] w-full">
// //       <div className="h-16 bg-sky-100 w-44 flex justify-around items-center gap-1 px-2 rounded-full">
// //         <div
// //           onClick={() => setNumber((prev) => prev - 1)}
// //           className="h-12 select-none cursor-pointer w-full flex justify-center items-center font-bold text-4xl rounded-full bg-[#0cdcf733]"
// //         >
// //           -
// //         </div>
// //         <div className="h-12 select-none cursor-pointer w-full px-2 flex justify-center items-center font-bold text-4xl rounded-full">
// //           {number}
// //         </div>
// //         <div
// //           onClick={() => setNumber((prev) => prev + 1)}
// //           className="h-12 select-none cursor-pointer w-full flex justify-center items-center font-bold text-4xl rounded-full bg-[#0cdcf733]"
// //         >
// //           +
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default page;

// "use client";

// import React from "react";
// import Datepicker from "react-tailwindcss-datepicker";
// const START_FROM = new Date();
// START_FROM.setMonth(START_FROM.getMonth());
// const MIN_DATE = new Date();
// MIN_DATE.setDate(MIN_DATE.getDate() + 1);
// const page = () => {
//   return (
//     <div className="h-[100vh] flex justify-center items-center w-full">
//       <div id="datePickerNewOop">
//         <Datepicker
//           inputClassName="text-2xl
//         focus:outline-none active:border "
//           primaryColor={"sky"}
//           separator="and"
//           minDate={MIN_DATE}
//           onChange={(newval) => {
//             console.log(newval);
//             console.log(document.getElementById("datePickerNewOop"));
//           }}
//           startFrom={START_FROM}
//         />
//       </div>
//       <div
//         onClick={() => {
//           document.getElementById("datePickerNewOop")?.click();
//         }}
//         className="text-4xl p-5 cursor-pointer bg-green-300"
//       >
//         Button
//       </div>
//     </div>
//   );
// };

// export default page;

// "use client";
// import { useState } from "react";
// import { motion } from "motion/react";

// const tabs = [
//   { name: "Details", color: "green" },
//   { name: "Fare Summary", color: "green" },
//   { name: "Fare Rules", color: "green" },
// ];

// const duration = 0.3;

// export default function Example() {
//   const [selected, setSelected] = useState(0);
//   const [formerColor, setFormerColor] = useState(tabs[0].color);

//   return (
//     <div className="relative p-1.5 mt-5 flex items-start place-content-start justify-start">
//       {tabs.map(({ name, color }, i) => (
//         <motion.div
//           className="relative h-[30px] py-1 font-bold cursor-pointer px-4 text-lg"
//           key={i}
//           initial={{ color: i === selected ? "#fff" : "black" }}
//           animate={{ color: i === selected ? "#fff" : "black" }}
//           transition={{ duration }}
//           onTap={() => {
//             setFormerColor(tabs[selected].color);
//             setSelected(i);
//           }}
//         >
//           <span style={{ position: "relative", zIndex: 1 }}>{name}</span>
//           {i === selected && (
//             <motion.div
//               className="w-full h-full absolute top-0 left-0"
//               layoutId="selected"
//               initial={{ backgroundColor: formerColor }}
//               animate={{ backgroundColor: color }}
//               transition={{ duration }}
//             />
//           )}
//         </motion.div>
//       ))}
//     </div>
//   );
// }

"use client";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
const flight = {
  type: "flight-offer",
  id: "9",
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
      duration: "PT19H55M",
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
          id: "20",
          numberOfStops: 0,
          blacklistedInEU: false,
        },
        {
          departure: {
            iataCode: "HKG",
            terminal: "1",
            at: "2025-11-05T08:10:00",
          },
          arrival: {
            iataCode: "LHR",
            terminal: "3",
            at: "2025-11-05T15:00:00",
          },
          carrierCode: "CX",
          number: "257",
          aircraft: {
            code: "351",
          },
          operating: {
            carrierCode: "CX",
          },
          duration: "PT14H50M",
          id: "21",
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
          segmentId: "20",
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
          segmentId: "21",
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

import React, { useContext } from "react";
import { StoreContext } from "../context/StoreContextMain";
import InitailLoad from "../components/InitailLoad";
const page = () => {
  const { searchFormData, availableFlights } = useContext(StoreContext);
  console.log(availableFlights);
  // console.log(searchFormData);
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
              {" "}
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
        </div>
        <div className="flex justify-end items-center gap-3 p-3 shadow-xl w-full">
          <div className="text-xl text-sky-500 underline cursor-pointer ">{`$${flight.price.total}`}</div>
          <div className="px-4 cursor-pointer py-3 text-xl bg-sky-700 rounded-lg text-white">
            Continue
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
