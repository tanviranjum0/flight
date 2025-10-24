"use client";
import { useEffect } from "react";

const ApiAuth = () => {
  useEffect(() => {
    async function getApiAuthorization() {
      console.log(
        `grant_type=client_credentials&client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&client_secret=${process.env.NEXT_PUBLIC_CLIENT_SECRET}`
      );
      const data = await fetch(
        "https://test.api.amadeus.com/v1/security/oauth2/token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: `grant_type=client_credentials&client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&client_secret=${process.env.NEXT_PUBLIC_CLIENT_SECRET}`,
        }
      );
      const AuthorizedJSON = await data.json();
      console.log(AuthorizedJSON.access_token);
      localStorage.setItem("access_token", AuthorizedJSON.access_token);
    }
    getApiAuthorization();
  }, []);
  return <div></div>;
};

export default ApiAuth;
