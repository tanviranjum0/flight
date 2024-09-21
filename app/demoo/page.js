// "use client";
// import { useEffect } from "react";
// const page = () => {
//   const handleClick = async () => {
//     console.log(localStorage.getItem("access_token"));
//     const lala = await fetch(
//       "https://test.api.amadeus.com/v1/reference-data/locations?subType=CITY,AIRPORT&keyword=mi&page[limit]=5",
//       {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("access_token")}`,
//           // Authorization: `Bearer CpjU0sEenniHCgPDrndzOSWFk5mN`,
//         },
//       }
//     );
//     const lulu = await lala.json();
//     console.log(lulu);
//   };

//   return (
//     <div
//       onClick={() => handleClick()}
//       className="flex p-4 border cursor-pointer bg-sky-200 justify-center items-center text-5xl"
//     >
//       Demo two
//     </div>
//   );
// };

// export default page;
