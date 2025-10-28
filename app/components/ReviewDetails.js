"use client";
import Image from "next/image";
import BaggageButton from "./button/BaggageButton";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import { StoreContext } from "../context/StoreContextMain";
import { useContext } from "react";
const ReviewDetails = () => {
  const { reviewFlight, searchFormData } = useContext(StoreContext);
  // console.log(reviewFlight);
  return (
    <div>
      <div
        key={`$reviewFlightreview`}
        className="grid grid-cols-5 w-[90%] mx-auto gap-3 md:gap-10"
      >
        <div className="md:col-span-3 col-span-5 rounded-md border shadow-lg">
          <div className="flex justify-around py-3 border-b">
            <div className="text-base md:text-xl">
              {reviewFlight.itineraries[0].segments[0].departure.iataCode}-
              {reviewFlight.itineraries[0].segments[0].arrival.iataCode}
            </div>
            <BaggageButton />
          </div>
          <div className="flex justify-around items-center py-3 border-b">
            <div className="flex items-center h-full w-full justify-center">
              <img
                src={`https://img.wway.io/pics/root/${reviewFlight.itineraries[0].segments[0].operating.carrierCode}@png?exar=1&rs=fit:400:200`}
                className="py-5 object-cover bg-transparent max-w-40"
              />
            </div>
            <div className="flex items-center h-full w-full flex-col justify-center">
              <div className="text-xs pb-3"> {reviewFlight.airlineName}</div>
              <div className="text-xs">
                {reviewFlight.itineraries[0].segments[0].carrierCode} |{" "}
                {reviewFlight.itineraries[0].segments[0].aircraft.code}
              </div>
              <div className="text-sm font-semibold">
                Aircraft :{" "}
                {reviewFlight.itineraries[0].segments[0].aircraft.code} Operated
                by : {reviewFlight.itineraries[0].segments[0].carrierCode}
              </div>
            </div>
            <div className="flex items-center h-full w-full justify-center text-md">
              {reviewFlight.travelerPricings[0].fareDetailsBySegment[0].cabin}
            </div>
          </div>
          <div className="flex justify-between mx-10">
            <div className="py-3">
              <div className="text-xs">Depart</div>
              <div className="pb-2 font-semibold">
                {new Date(reviewFlight.itineraries[0].segments[0].departure.at)
                  .toLocaleTimeString()
                  .replace(":00", "")}
              </div>
              <div className="text-sm">
                {new Date(reviewFlight.itineraries[0].segments[0].departure.at)
                  .toUTCString()
                  .slice(0, 17)}
              </div>
              <div className="pt-1 text-sm">
                ({reviewFlight.itineraries[0].segments[0].departure.iataCode})
              </div>
              <div className="text-sm">{searchFormData.fromOrigin.name}</div>
            </div>
            <div className=" my-auto">
              <div className="text-sm">
                {Math.floor(
                  (new Date(
                    reviewFlight.itineraries[0].segments[0].arrival.at
                  ).getTime() -
                    new Date(
                      reviewFlight.itineraries[0].segments[0].departure.at
                    ).getTime()) /
                    60000 /
                    60
                )}{" "}
                hour{" "}
                {((new Date(
                  reviewFlight.itineraries[0].segments[0].arrival.at
                ).getTime() -
                  new Date(
                    reviewFlight.itineraries[0].segments[0].departure.at
                  ).getTime()) /
                  60000) %
                  60}{" "}
                min
              </div>
              <div className=" ">
                <MdOutlineArrowRightAlt className="h-10 w-10" />
              </div>
              <div className="text-sm">Non Stop</div>
            </div>
            <div className="py-3">
              <div className="text-xs">Arrive</div>
              <div className="pb-2 font-semibold">
                {new Date(reviewFlight.itineraries[0].segments[0].arrival.at)
                  .toLocaleTimeString()
                  .replace(":00", "")}{" "}
              </div>
              <div className="text-sm">
                {new Date(reviewFlight.itineraries[0].segments[0].arrival.at)
                  .toUTCString()
                  .slice(0, 17)}
              </div>
              <div className="pt-1 text-sm">
                ({reviewFlight.itineraries[0].segments[0].arrival.iataCode})
              </div>
              <div className="text-sm">{searchFormData.toOrigin.name}</div>
            </div>
          </div>
        </div>
        <div className="border col-span-5 md:col-span-2 shadow-lg rounded-md">
          <div className="flex justify-around w-full items-center border-b  ">
            <img
              src={`https://img.wway.io/pics/root/${reviewFlight.itineraries[0].segments[0].operating.carrierCode}@png?exar=1&rs=fit:400:200`}
              className="py-5 object-cover bg-transparent max-w-40"
            />
            <div className="text-md ">{reviewFlight.airlineName}</div>
          </div>
          <div className="p-5">
            <div className="text-md font-semibold py-2">Fare Summary</div>
            <div className="text-md">
              Adult ({reviewFlight.travelerPricings.length} Traveller)
            </div>
            <div className="flex pt-3  mx-5 justify-between">
              <div className="">Base Fare</div>
              <div className="">
                <div className="">
                  {reviewFlight.travelerPricings[0].total}
                  <b className="text-md">
                    {reviewFlight.travelerPricings[0].price.base}
                  </b>
                </div>
                <div className="text-sm text-center">
                  ({reviewFlight.travelerPricings.length}x
                  {reviewFlight.travelerPricings[0].price.base})
                </div>
              </div>
            </div>
            <div className="flex pb-3 pt-1 border-b mx-5 justify-between">
              <div className="">Taxes and Fees</div>
              <div className="">
                <div className="">
                  <b className="text-md">
                    {(
                      reviewFlight.travelerPricings[0].price.total -
                      reviewFlight.travelerPricings[0].price.base
                    ).toFixed(2)}
                  </b>
                </div>
                <div className="text-sm text-center">
                  ({reviewFlight.travelerPricings.length}x
                  {(
                    reviewFlight.travelerPricings[0].price.total -
                    reviewFlight.travelerPricings[0].price.base
                  ).toFixed(2)}
                  )
                </div>
              </div>
            </div>
            <div className="flex pb-3 items-center pt-1 mx-5 justify-between">
              <div className="">Sub - Total</div>
              <div className="">
                {reviewFlight.price.currency}{" "}
                <b className="text-lg">{reviewFlight.price.total}</b>
              </div>
            </div>
          </div>
          <div className="flex py-3 items-center bg-sky-100 text-sky-800  justify-around">
            <div className="">
              You Pay{" "}
              <span className="text-xs pl-3">
                *For {reviewFlight.travelerPricings.length} traveller
              </span>
            </div>
            <div className="">
              {reviewFlight.price.currency}
              {"  "}
              <b className="text-lg">{reviewFlight.price.total}</b>
            </div>
          </div>
        </div>
        <div className="col-span-5  ">
          <div className="bg-sky-100 flex justify-center items-center rounded-lg p-8 text-2xl text-center">
            <div> Scroll Down </div>
            <div className="animate-bounce px-3"> &#8595;</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewDetails;
