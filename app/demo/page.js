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

"use client";
// import { useState } from "react";
import { motion } from "motion/react";

const tabs = [
  { name: "Details", color: "green" },
  { name: "Fare Summary", color: "green" },
  { name: "Fare Rules", color: "green" },
];

const duration = 0.3;

export default function Example() {
  const [selected, setSelected] = useState(0);
  const [formerColor, setFormerColor] = useState(tabs[0].color);

  return (
    <div className="relative p-1.5 mt-5 flex items-start place-content-start justify-start">
      {tabs.map(({ name, color }, i) => (
        <motion.div
          className="relative h-[30px] py-1 font-bold cursor-pointer px-4 text-lg"
          key={i}
          initial={{ color: i === selected ? "#fff" : "black" }}
          animate={{ color: i === selected ? "#fff" : "black" }}
          transition={{ duration }}
          onTap={() => {
            setFormerColor(tabs[selected].color);
            setSelected(i);
          }}
        >
          <span style={{ position: "relative", zIndex: 1 }}>{name}</span>
          {i === selected && (
            <motion.div
              className="w-full h-full absolute top-0 left-0"
              layoutId="selected"
              initial={{ backgroundColor: formerColor }}
              animate={{ backgroundColor: color }}
              transition={{ duration }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}
