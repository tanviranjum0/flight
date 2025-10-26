"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
const page = () => {
  const [number, setNumber] = useState(0);
  return (
    <div className="mt-5 flex justify-center items-center h-[100vh] w-full">
      <div className="h-16 bg-sky-100 w-44 flex justify-around items-center gap-1 px-2 rounded-full">
        <div
          onClick={() => setNumber((prev) => prev - 1)}
          className="h-12 select-none cursor-pointer w-full flex justify-center items-center font-bold text-4xl rounded-full bg-[#0cdcf733]"
        >
          -
        </div>
        <div className="h-12 select-none cursor-pointer w-full px-2 flex justify-center items-center font-bold text-4xl rounded-full">
          {number}
        </div>
        <div
          onClick={() => setNumber((prev) => prev + 1)}
          className="h-12 select-none cursor-pointer w-full flex justify-center items-center font-bold text-4xl rounded-full bg-[#0cdcf733]"
        >
          +
        </div>
      </div>
    </div>
  );
};

export default page;
