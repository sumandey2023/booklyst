import React from "react";
import { useNavigate } from "react-router-dom";
import { SunIcon } from "@heroicons/react/24/solid";
import MotionFade from "./motion/MotionFade";

const ResortComponent = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/resort");
  };

  return (
    <MotionFade>
      <div
        onClick={handleClick}
        className="group cursor-pointer bg-gradient-to-br from-blue-100 via-white to-blue-50 dark:from-slate-800/40 dark:via-slate-900/40 dark:to-slate-800/40 hover:from-blue-200 hover:to-white transition-all duration-300 shadow-xl hover:shadow-2xl rounded-3xl p-6 h-64 flex flex-col justify-center items-center border border-blue-100 dark:border-slate-800 hover:-translate-y-2 focus:ring-2 focus:ring-blue-400 outline-none"
        tabIndex={0}
        role="button"
        aria-label="Go to Resort"
      >
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-200 dark:bg-slate-800 mb-4 shadow group-hover:scale-110 transition-transform">
          <SunIcon className="w-8 h-8 text-blue-700 dark:text-indigo-300" />
        </div>
        <h2 className="text-2xl font-bold text-blue-800 dark:text-indigo-200 mb-2">Resort</h2>
        <p className="text-base text-gray-600 dark:text-slate-400 text-center mb-4">
          Find your perfect holiday destination with us.
        </p>
        <button className="mt-auto bg-blue-600 text-white px-5 py-2 rounded-full shadow hover:bg-blue-700 transition font-semibold text-sm group-hover:scale-105">
          Book Resort
        </button>
      </div>
    </MotionFade>
  );
};

export default ResortComponent;
