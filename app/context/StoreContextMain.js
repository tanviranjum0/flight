"use client";
import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
export const StoreContext = createContext(null);
const StoreContextMain = ({ children }) => {
  const router = useRouter();
  const [cabinType, setCabinType] = useState("ECONOMY");
  const [reviewFlight, setReviewFlight] = useState([]);
  const [returnTrue, setReturnTrue] = useState(false);
  const [flightDepartureDates, setFlightDepartureDates] = useState({
    startDate: null,
    endDate: null,
  });
  const [flightReturnDates, setflightReturnDates] = useState({
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
    setReviewFlight([flight]);
    router.push("/review");
  };

  const handleFlightSearch = async (e) => {
    e.preventDefault();
    router.push("/search");
    setAvailableFlights(null);
    const adultnumber = document.getElementById(
      "flightsearchadultnumber"
    ).value;

    let url = new URLSearchParams();

    if (returnTrue) {
      if (flightReturnDates.startDate != null) {
        url.set(
          "returnDate",
          flightReturnDates.startDate?.toISOString().slice(0, 10)
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
    url.set("adults", adultnumber);
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
    localStorage.setItem("flights", JSON.stringify(result));
    console.log("Flights", JSON.parse(localStorage.getItem("flights")));
    setAvailableFlights(result);
  };

  const handleAirportSearch = (origin) => {
    console.log(origin);
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
      // if (typeof window !== "undefined" && window.localStorage) {
      //   localStorage.setItem("destinationAirport", result.data);
      // }
      console.log(result.data);
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
    console.log(searchFormData);
  };

  const contextValue = {
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
    flightReturnDates,
    setflightReturnDates,
    setQuery,
    error,
    days,
    availableFlights,
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
