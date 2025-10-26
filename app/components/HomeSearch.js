"use client";
import FromOriginInput from "./FromOriginInput";
import ToOriginInput from "./ToOriginInput";
import { useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { StoreContext } from "../context/StoreContextMain";
import Datepicker from "react-tailwindcss-datepicker";
const START_FROM = new Date();
START_FROM.setMonth(START_FROM.getMonth());
const MIN_DATE = new Date();
MIN_DATE.setDate(MIN_DATE.getDate() + 1);

const HomeSearch = ({ modify }) => {
  const {
    adultNumber,
    setAdultNumber,
    setSearchData,
    dates,
    cabinType,
    setCabinType,
    setDates,
    returnTrue,
    setReturnTrue,
    flightDepartureDates,
    setFlightDepartureDates,
    setQuery,
    query,
    searchFormData,
    handleFlightSearch,
    days,
  } = useContext(StoreContext);

  return (
    <div>
      <div className="home-search-animation">
        <FromOriginInput />
        <ToOriginInput />
        <div className="text-center mt-10 mb-5 sm:mb-10 text-4xl md:text-7xl opacity-70">
          It&apos;s more than just a trip
        </div>
        <div className="w-[90%] border-2 shadow-2xl mt-5 pb-3 bg-white rounded-2xl mx-auto">
          <div className="bg-gray-200 py-5 m-2 rounded-xl text-center">
            <span className=" bg-white px-5 py-3 rounded-2xl text-3xl">
              Flight Booking
            </span>
          </div>
          <div className="flex pt-3 pl-5 gap-2">
            <div className="flex items-center ">
              <div
                onClick={() => {
                  setReturnTrue(false);
                }}
                className={`w-4 h-4 rounded-full border-2 cursor-pointer ${
                  returnTrue ? "bg-gray-100" : "bg-sky-700"
                } border-gray-300`}
              ></div>
              <div
                onClick={() => {
                  setReturnTrue(false);
                }}
                className="px-3 cursor-pointer text-gray-900 text-xl font-medium opacity-70 "
              >
                One Way
              </div>
              <div
                onClick={() => {
                  setReturnTrue(true);
                }}
                className={`w-4 h-4 rounded-full border-2 cursor-pointer  ${
                  returnTrue ? "bg-sky-700" : "bg-gray-100"
                } border-gray-300`}
              ></div>
              <div
                onClick={() => {
                  setReturnTrue(true);
                }}
                className="px-3 cursor-pointer text-xl opacity-70 font-medium text-gray-900"
              >
                Round Trip
              </div>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-3 mt-3 mx-2">
            <div
              key={"origininputkey"}
              onClick={() => {
                setSearchData([]);
                setQuery({
                  fromInput: true,
                  toInput: false,
                  departureDateInput: false,
                  returnDateInput: false,
                  travellersCount: false,
                });
                document
                  .getElementById("searchFormFromOrigin")
                  .classList.toggle("hidden");
                document.getElementById("searchInputFromOrigin").focus();
              }}
              className={`p-3 cursor-pointer ${
                query.fromInput && "bg-sky-100"
              } border rounded w-full`}
            >
              <div className="text-sm opacity-80 ">From</div>
              <div type="text" className="text-sm w-full">
                {searchFormData?.fromOrigin.name}
              </div>

              <div className="text-xs opacity-80 ">
                {searchFormData?.fromOrigin.address.cityName},
                <span className="text-xs">
                  {searchFormData?.fromOrigin.address.countryName}
                </span>
              </div>
            </div>
            <div
              key={"destinationinputkey"}
              onClick={() => {
                setSearchData([]);
                setQuery({
                  fromInput: false,
                  toInput: true,
                  departureDateInput: false,
                  travellersCount: false,
                  returnDateInput: false,
                });
                document
                  .getElementById("searchFormToOrigin")
                  .classList.toggle("hidden");
                document.getElementById("searchInputToOrigin").focus();
              }}
              className={`p-3 cursor-pointer ${
                query.toInput && "bg-sky-100"
              } border rounded w-full`}
            >
              <div className="text-sm opacity-80 ">To</div>

              <div type="text" className="text-sm  w-full">
                {searchFormData?.toOrigin.name}
              </div>
              <div className="text-xs opacity-80 ">
                {searchFormData?.toOrigin.address.cityName},
                <span className="text-xs">
                  {searchFormData?.toOrigin.address.countryName}
                </span>
              </div>
            </div>
            <div
              key={"departuredate"}
              className={`p-3 cursor-pointer ${
                query.departureDateInput && "bg-sky-100"
              } border rounded w-full`}
              onClick={() =>
                setQuery({
                  fromInput: false,
                  toInput: false,
                  departureDateInput: true,
                  travellersCount: false,
                  returnDateInput: false,
                })
              }
            >
              <div className="text-sm opacity-80 ">Departure</div>{" "}
              <Datepicker
                id="datePicker"
                inputClassName={`w-full ${
                  !returnTrue && "text-xl"
                } focus:outline-none active:border ${
                  query.departureDateInput && "bg-sky-100"
                }`}
                useRange={returnTrue}
                primaryColor={"sky"}
                separator="and"
                placeholder="Select Date"
                minDate={MIN_DATE}
                startFrom={START_FROM}
                value={flightDepartureDates}
                asSingle={!returnTrue}
                onChange={(newValue) => {
                  console.log(newValue);
                  setFlightDepartureDates(newValue);
                  let d = new Date(newValue.startDate);
                  let day = days[d.getDay()];
                  setDates({ ...dates, departureDay: day });
                }}
              />
              <div className="text-sm opacity-80 ">{dates.departureDay}</div>
            </div>

            <div
              key={"travellernumber"}
              className={`p-3 cursor-pointer ${
                query.travellersCount && "bg-sky-100"
              } border rounded w-full`}
              onClick={() =>
                setQuery({
                  fromInput: false,
                  toInput: false,
                  departureDateInput: false,
                  travellersCount: true,
                  returnDateInput: false,
                })
              }
            >
              <div className="text-sm opacity-80 ">
                Travelers & Booking Class
              </div>
              <div
                onClick={() =>
                  setQuery({
                    fromInput: false,
                    toInput: false,
                    departureDateInput: true,
                    travellersCount: false,
                    returnDateInput: false,
                  })
                }
                className="h-12 bg-sky-50 w-40 flex justify-around items-center gap-1 px-1.5 rounded-full"
              >
                <div
                  onClick={() => {
                    if (adultNumber < 2) return;
                    setAdultNumber((prev) => prev - 1);
                  }}
                  className="h-10 select-none cursor-pointer w-full flex justify-center items-center font-bold text-3xl rounded-full bg-[#0cdcf733]"
                >
                  -
                </div>
                <div className="h-10 select-none cursor-pointer w-full px-1.5 flex justify-center items-center font-bold text-4xl rounded-full">
                  {adultNumber}
                </div>
                <div
                  onClick={() => {
                    if (adultNumber > 6) return;
                    setAdultNumber((prev) => prev + 1);
                  }}
                  className="h-10 select-none cursor-pointer w-full flex justify-center items-center font-bold text-3xl rounded-full bg-[#0cdcf733]"
                >
                  +
                </div>
              </div>
            </div>
          </div>
          <div className=" text-sm md:text-base px-3 mx-auto md:w-[80%]  gap-1 md:gap-5 pt-3 grid grid-cols-2 md:grid-cols-5 items-center justify-center">
            <div className="font-semibold w-full">Fare Type :</div>
            <div
              onClick={() => setCabinType("ECONOMY")}
              className={`md:px-3 px-1 py-1 md:py-2 border hover:bg-sky-300 cursor-pointer rounded ${
                cabinType == "ECONOMY" ? "bg-sky-200" : ""
              }`}
            >
              Economy
            </div>
            <div
              onClick={() => setCabinType("PREMIUM_ECONOMY")}
              className={`md:px-3 px-1 py-1 md:py-2  border hover:bg-sky-300 cursor-pointer rounded ${
                cabinType == "PREMIUM_ECONOMY" ? "bg-sky-200" : ""
              }`}
            >
              Premium
            </div>
            <div
              onClick={() => setCabinType("BUSINESS")}
              className={`md:px-3 px-1 py-1 md:py-2  border hover:bg-sky-300 cursor-pointer rounded ${
                cabinType == "BUSINESS" ? "bg-sky-200" : ""
              }`}
            >
              Business
            </div>
            <div
              onClick={() => setCabinType("FIRST")}
              className={`md:px-3 px-1 py-1 md:py-2  border hover:bg-sky-300 cursor-pointer rounded ${
                cabinType == "FIRST" ? "bg-sky-200" : ""
              }`}
            >
              First
            </div>
          </div>
          <div className="w-[80%] mx-auto text-center flex justify-center items-center">
            <span
              onClick={(e) => handleFlightSearch(e)}
              className="active:scale-90  text-center px-7 cursor-pointer rounded-lg py-3 text-xl select-none hover:bg-sky-700 hover:text-white transition-all duration-300 bg-sky-300 relative bottom-[-2rem]"
            >
              {modify ? "Modify Search" : "Search"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSearch;
