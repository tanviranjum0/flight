"use client";
import { useState } from "react";
import { motion } from "motion/react";
const tabs = [
  { name: "Economy", color: "#075985", id: "ECONOMY" },
  { name: "Premium", color: "#075985", id: "PREMIUM_ECONOMY" },
  { name: "Business", color: "#075985", id: "BUSINESS" },
  { name: "First", color: "#075985", id: "FIRST" },
];

const duration = 0.3;

export default function FlightDetailsTab({ setCabinType }) {
  const [selected, setSelected] = useState(0);
  const [formerColor, setFormerColor] = useState(tabs[0].color);

  return (
    <div className="relative flex  items-center justify-center">
      {tabs.map(({ name, color, id }, i) => (
        <motion.div
          className="relative min-w-40 text-md px-3 py-2 border rounded-lg shadow-lg font-bold cursor-pointer"
          key={i + "tabItem"}
          initial={{ color: i === selected ? "#fff" : "black" }}
          animate={{ color: i === selected ? "#fff" : "black" }}
          transition={{ duration }}
          onTap={() => {
            setCabinType(id);
            setFormerColor(tabs[selected].color);
            setSelected(i);
          }}
        >
          <span className="relative z-10">{name}</span>
          {i === selected && (
            <motion.div
              className="w-full h-full rounded-lg absolute top-0 left-0"
              layoutId="SeatTypeSelected"
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
