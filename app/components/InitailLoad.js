"use client";
import { useContext, useEffect, useRef } from "react";
import { StoreContext } from "../context/StoreContextMain";

const InitailLoad = () => {
  const isAlreadyRenderred = useRef(false);

  const { setSearchFormData, setFlightDepartureDates, setflightReturnDates } =
    useContext(StoreContext);

  useEffect(() => {
    const InitialDate = new Date();
    InitialDate.setDate(InitialDate.getDate() + 7);
    setFlightDepartureDates({
      startDate: InitialDate,
      endDate: InitialDate,
    });

    setSearchFormData(JSON.parse(localStorage.getItem("olderOrigins")));
    if (!isAlreadyRenderred.current) {
      isAlreadyRenderred.current = true;
    } else {
      return;
    }

    async function getApiAuthorization() {
      const time = Date.now();
      const creationTimeDifferenceInMinutes = Math.ceil(
        Math.abs(localStorage.getItem("access_token_created_at") - time) /
          (1000 * 60)
      );
      if (creationTimeDifferenceInMinutes > 28) {
        const data = await fetch(
          "https://api.amadeus.com/v1/security/oauth2/token",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `grant_type=client_credentials&client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&client_secret=${process.env.NEXT_PUBLIC_CLIENT_SECRET}`,
          }
        );
        const AuthorizedJSON = await data.json();
        console.log(AuthorizedJSON);
        localStorage.setItem("access_token_created_at", Date.now());
        localStorage.setItem("access_token", AuthorizedJSON.access_token);
      }
    }
    getApiAuthorization();
  }, []);
  return <div></div>;
};

export default InitailLoad;
