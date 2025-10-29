"use client";
import { useState } from "react";
import { motion } from "motion/react";
const tabs = [
  { name: "Flight Details", color: "#075985", id: "details" },
  { name: "Timeline", color: "#075985", id: "timeline" },
  { name: "Fare Summary", color: "#075985", id: "fare" },
  { name: "Fare Rules", color: "#075985", id: "rule" },
];

const duration = 0.3;

export default function FlightDetailsTab({ flightId, setDetails }) {
  const [selected, setSelected] = useState(0);
  const [formerColor, setFormerColor] = useState(tabs[0].color);

  return (
    <div className="relative flex mt-5 items-center justify-center">
      {tabs.map(({ name, color, id }, i) => (
        <motion.div
          className="relative min-w-40 text-md px-3 py-2 border rounded-lg shadow-lg font-bold cursor-pointer"
          key={i + "tabItem"}
          initial={{ color: i === selected ? "#fff" : "black" }}
          animate={{ color: i === selected ? "#fff" : "black" }}
          transition={{ duration }}
          onTap={() => {
            setDetails(id);
            setFormerColor(tabs[selected].color);
            setSelected(i);
          }}
        >
          <span className="relative z-10">{name}</span>
          {i === selected && (
            <motion.div
              className="w-full h-full rounded-lg absolute top-0 left-0"
              layoutId={`FlightDetialsTab-${flightId}`}
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
