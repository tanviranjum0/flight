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
import findingSeat from "../images/findingSeat.png";
import planeInterior from "../images/planeInterior.png";
import planeWindow from "../images/planeWindow.png";
import familyReunion from "../images/familyReunion.png";
import memoriesWall from "../images/memoriesWall.png";
import insidePlane from "../images/insidePlane.png";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, animate } from "motion/react";
// import "../components/homeCarousel.css";
export const items = [
  {
    id: 1,
    url: findingSeat,
    title: "Misty Mountain Majesty",
  },
  {
    id: 2,
    url: planeInterior,
    title: "Winter Wonderland",
  },
  {
    id: 3,
    url: planeWindow,
    title: "Autumn Mountain Retreat",
  },
  {
    id: 4,
    url: familyReunion,
    title: "Tranquil Lake Reflection",
  },
  {
    id: 5,
    url: memoriesWall,
    title: "Misty Mountain Peaks",
  },
  {
    id: 6,
    url: insidePlane,
    title: "Golden Hour Glow",
  },
];
export default function FramerDraggableCarousel() {
  const [index, setIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const x = useMotionValue(0);
  console.log(index);
  useEffect(() => {
    const timerId = setTimeout(() => {
      if (index == 3) {
        setIndex(0);
      } else {
        setIndex((i) => Math.max(0, i + 1));
      }
    }, 3000);
    return () => {
      clearTimeout(timerId);
    };
  }, []);
  useEffect(() => {
    if (!isDragging && containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth || 1;
      const targetX = -index * containerWidth;
      animate(x, targetX, {
        type: "spring",
        stiffness: 300,
        damping: 30,
      });
    }
  }, [index, x, isDragging]);
  return (
    <div className="w-full lg:p-10 sm:p-4 p-2">
      <div className="flex flex-col gap-3">
        <div className="relative overflow-hidden rounded-lg" ref={containerRef}>
          <motion.div
            className="flex"
            drag="x"
            dragElastic={0.2}
            dragMomentum={false}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={(e, info) => {
              setIsDragging(false);
              const containerWidth = containerRef.current?.offsetWidth || 1;
              const offset = info.offset.x;
              const velocity = info.velocity.x;
              let newIndex = index;
              if (Math.abs(velocity) > 500) {
                newIndex = velocity > 0 ? index - 1 : index + 1;
              } else if (Math.abs(offset) > containerWidth * 0.3) {
                newIndex = offset > 0 ? index - 1 : index + 1;
              }
              newIndex = Math.max(0, Math.min(items.length - 1, newIndex));
              setIndex(newIndex);
            }}
            style={{ x }}
          >
            {items.map((item) => (
              <div key={item.id} className="shrink-0 w-full h-[100vh]">
                <Image
                  src={item.url}
                  alt={item.title}
                  // fill={true}
                  className="w-full h-full object-cover rounded-lg select-none pointer-events-none"
                  draggable={false}
                />
              </div>
            ))}
          </motion.div>

          <motion.button
            disabled={index === 0}
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
            className={`absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-transform z-10
              ${
                index === 0
                  ? "opacity-40 cursor-not-allowed"
                  : "bg-white hover:scale-110 hover:opacity-100 opacity-70"
              }`}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </motion.button>

          <motion.button
            disabled={index === items.length - 1}
            onClick={() => setIndex((i) => Math.min(items.length - 1, i + 1))}
            className={`absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-transform z-10
              ${
                index === items.length - 1
                  ? "opacity-40 cursor-not-allowed"
                  : "bg-white hover:scale-110 hover:opacity-100 opacity-70"
              }`}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </motion.button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all ${
                  i === index ? "w-8 bg-white" : "w-2 bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
