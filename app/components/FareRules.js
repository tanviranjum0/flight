"use client";
import { motion } from "motion/react";
const FareRules = () => {
  return (
    <div className="flex mt-5 flex-col">
     
      <motion.div
        key={"farerulesmain"}
        initial={{ filter: "blur(10px)", scaleY: 0 }}
        animate={{ filter: "none", scaleY: 1 }}
        className=" bg-yellow-200 p-5 rounded"
      >
        Important Note :{" "}
        <span className="text-sm">
          Special Discounts (Passengers who have purchased a discounted ticket
          must present documents showing they are entitled to the discount)
          (Discounts are applied to the net ticket fare. Taxes, fees and other
          charges do not apply.)
        </span>
      </motion.div>
    </div>
  );
};

export default FareRules;
