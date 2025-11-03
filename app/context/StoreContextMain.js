"use client";
import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
export const StoreContext = createContext(null);
const StoreContextMain = ({ children }) => {
  const router = useRouter();

  const [adultNumber, setAdultNumber] = useState(1);
  const [cabinType, setCabinType] = useState("ECONOMY");
  const [reviewFlight, setReviewFlight] = useState({
    type: "loading",
    id: "loading",
    source: "loading",
    instantTicketingRequired: false,
    nonHomogeneous: false,
    oneWay: false,
    isUpsellOffer: false,
    lastTicketingDate: "loading",
    lastTicketingDateTime: "loading",
    numberOfBookableSeats: 9,
    itineraries: [
      {
        duration: "loading",
        segments: [
          {
            departure: {
              iataCode: "loading",
              terminal: "loading",
              at: "loading",
            },
            arrival: {
              iataCode: "loading",
              terminal: "loading",
              at: "loading",
            },
            carrierCode: "loading",
            number: "loading",
            aircraft: {
              code: "loading",
            },
            operating: {
              carrierCode: "loading",
            },
            duration: "loading",
            id: "loading",
            numberOfStops: 0,
            blacklistedInEU: false,
          },
          {
            departure: {
              iataCode: "loading",
              terminal: "loading",
              at: "loading",
            },
            arrival: {
              iataCode: "loading",
              at: "loading",
            },
            carrierCode: "loading",
            number: "loading",
            aircraft: {
              code: "loading",
            },
            operating: {
              carrierCode: "loading",
            },
            duration: "loading",
            id: "loading",
            numberOfStops: 0,
            blacklistedInEU: false,
          },
        ],
      },
    ],
    price: {
      currency: "loading",
      total: "loading",
      base: "loading",
      fees: [
        {
          amount: "loading",
          type: "loading",
        },
        {
          amount: "loading",
          type: "loading",
        },
      ],
      grandTotal: "loading",
    },
    pricingOptions: {
      fareType: ["loading"],
      includedCheckedBagsOnly: false,
    },
    validatingAirlineCodes: ["loading"],
    travelerPricings: [
      {
        travelerId: "loading",
        fareOption: "loading",
        travelerType: "loading",
        price: {
          currency: "loading",
          total: "loading",
          base: "loading",
        },
        fareDetailsBySegment: [
          {
            segmentId: "loading",
            cabin: "loading",
            fareBasis: "loading",
            class: "loading",
            includedCheckedBags: {
              weight: 0,
              weightUnit: "loading",
            },
            includedCabinBags: {
              weight: 7,
              weightUnit: "loading",
            },
          },
          {
            segmentId: "loading",
            cabin: "loading",
            fareBasis: "loading",
            class: "loading",
            includedCheckedBags: {
              weight: 0,
              weightUnit: "loading",
            },
            includedCabinBags: {
              weight: 7,
              weightUnit: "loading",
            },
          },
        ],
      },
    ],
    airlineName: "loading",
  });
  const [returnTrue, setReturnTrue] = useState(false);
  const [flightDepartureDates, setFlightDepartureDates] = useState({
    startDate: null,
    endDate: null,
  });

  const [searchFormData, setSearchFormData] = useState({
    fromOrigin: {
      name: "Search your location...",
      address: {
        cityName: "City",
        countryName: "Country",
      },
    },
    toOrigin: {
      name: "Search your destination...",
      address: {
        cityName: "City",
        countryName: "Country",
      },
    },
  });

  if (typeof window !== "undefined" && window.localStorage) {
    if (
      localStorage.getItem("destinationAirport") != null ||
      localStorage.getItem("originAirport") != null
    ) {
    }
  }
  const [fromSearchLoader, setFromSearchLoader] = useState(false);
  const [availableFlights, setAvailableFlights] = useState();
  const [searchToLoader, setSearchToLoader] = useState(false);
  const [dates, setDates] = useState({
    departureDay: "",
    returnDay: "",
  });

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const [error, setError] = useState("");
  const [searchData, setSearchData] = useState();
  const [query, setQuery] = useState({
    fromInput: false,
    toInput: false,
    departureDateInput: false,
    returnDateInput: false,
    travellersCount: false,
  });

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      if (JSON.parse(localStorage.getItem("flights"))) {
        setAvailableFlights(JSON.parse(localStorage.getItem("flights")));
      }
    }
  }, []);
  const handleDetails = () => {
    const baggage = document.getElementById("baggageDetails");
    baggage.classList.toggle("hidden");
  };

  const handleBookNowClick = (flight, airlineName) => {
    flight.airlineName = airlineName;
    localStorage.setItem("reviewFlight", JSON.stringify(flight));
    // console.log(
    //   "Consoling Context",
    //   JSON.parse(localStorage.getItem("reviewFlight"))
    // );
    router.push("/review");
  };

  const handleFlightSearch = async (e) => {
    e.preventDefault();
    router.push("/search");
    setAvailableFlights(null);
    let url = new URLSearchParams();
    // console.log("Dates", flightDepartureDates);
    if (returnTrue) {
      if (flightDepartureDates.endDate != null) {
        url.set(
          "returnDate",
          flightDepartureDates.endDate?.toISOString().slice(0, 10)
        );
      } else {
        return alert("Please add a return date");
      }
    }
    url.set("originLocationCode", searchFormData.fromOrigin.iataCode);
    url.set("destinationLocationCode", searchFormData.toOrigin.iataCode);
    url.set(
      "departureDate",
      flightDepartureDates.startDate?.toISOString().slice(0, 10)
    );
    url.set("currencyCode", "USD");
    url.set("adults", adultNumber);
    url.set("travelClass", cabinType);
    url.set("max", 10);

    const data = await fetch(
      `https://api.amadeus.com/v2/shopping/flight-offers?${url}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
    const result = await data.json();
    if (result.data.length == 0) {
      alert("No flights found");
    }
    localStorage.setItem("flights", JSON.stringify(result));
    // console.log("Flights", JSON.parse(localStorage.getItem("flights")));
    setAvailableFlights(result);
    document.getElementById("AllFlightsShowSection")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleAirportSearch = (origin) => {
    if (origin == "searchInputToOrigin") {
      setSearchToLoader(true);
    } else {
      setFromSearchLoader(true);
    }
    const searchInput = document.getElementById(origin).value;
    setSearchData([]);
    setError("");
    async function getDesiredAirports() {
      const data = await fetch(
        `https://api.amadeus.com/v1/reference-data/locations?subType=AIRPORT&keyword=${searchInput}&page%5Blimit%5D=5&page%5Boffset%5D=0&sort=analytics.travelers.score&view=FULL`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      const result = await data.json();

      if (result.data == undefined) {
        if (origin == "searchInputToOrigin") {
          setSearchToLoader(false);
        } else {
          setFromSearchLoader(false);
        }
        setError("No search results found");
        setSearchData([]);
        return;
      }
      // console.log(result.data);
      setSearchData(result.data);
      if (origin == "searchInputToOrigin") {
        setSearchToLoader(false);
      } else {
        setFromSearchLoader(false);
      }
    }
    getDesiredAirports();
  };

  const handleFromLocation = (data) => {
    setSearchFormData((prev) => {
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.setItem(
          "olderOrigins",
          JSON.stringify({
            ...prev,
            fromOrigin: data,
          })
        );
      }
      return {
        ...prev,
        fromOrigin: data,
      };
    });

    document.getElementById("searchFormFromOrigin").classList.toggle("hidden");
    setQuery({
      fromInput: true,
      toInput: false,
    });
  };

  const handleToLocation = (data) => {
    setSearchFormData((prev) => {
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.setItem(
          "olderOrigins",
          JSON.stringify({
            ...prev,
            toOrigin: data,
          })
        );
      }
      return {
        ...prev,
        toOrigin: data,
      };
    });

    document.getElementById("searchFormToOrigin").classList.toggle("hidden");
    setQuery({
      fromInput: false,
      toInput: true,
    });
    // console.log(searchFormData);
  };

  const getAirportDetails = async (iata) => {
    if (typeof window !== "undefined" && window.localStorage) {
      const airportDetilas = await fetch(
        `https://api.amadeus.com/v1/reference-data/locations?subType=AIRPORT&keyword=${iata}&page%5Blimit%5D=10&page%5Boffset%5D=0&sort=analytics.travelers.score&view=FULL`,

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      const data = await airportDetilas.json();
      return data.data[0];
    }
  };

  const contextValue = {
    getAirportDetails,
    handleToLocation,
    handleFromLocation,
    handleFlightSearch,
    searchData,
    setSearchData,
    returnTrue,
    setReturnTrue,
    reviewFlight,
    setReviewFlight,
    searchFormData,
    setSearchFormData,
    handleAirportSearch,
    cabinType,
    setCabinType,
    fromSearchLoader,
    setFromSearchLoader,
    query,
    flightDepartureDates,
    setFlightDepartureDates,
    setQuery,
    error,
    days,
    availableFlights,
    adultNumber,
    setAdultNumber,
    handleBookNowClick,
    setAvailableFlights,
    setError,
    handleDetails,
    searchToLoader,
    setSearchToLoader,
    dates,
    setDates,
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};
export default StoreContextMain;
