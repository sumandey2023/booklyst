import React from "react";
import { useNavigate } from "react-router-dom";
import { BuildingStorefrontIcon } from "@heroicons/react/24/solid";

const ResturantComponent = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/resturant");
  };

  return (
    <div
      onClick={handleClick}
      className="group cursor-pointer bg-gradient-to-br from-yellow-100 via-white to-yellow-50 hover:from-yellow-200 hover:to-white transition-all duration-300 shadow-xl hover:shadow-2xl rounded-3xl p-6 h-64 flex flex-col justify-center items-center border border-yellow-100 hover:-translate-y-2 focus:ring-2 focus:ring-yellow-400 outline-none"
      tabIndex={0}
      role="button"
      aria-label="Go to Restaurant"
    >
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-yellow-200 mb-4 shadow group-hover:scale-110 transition-transform">
        <BuildingStorefrontIcon className="w-8 h-8 text-yellow-700" />
      </div>
      <h2 className="text-2xl font-bold text-yellow-800 mb-2">Restaurant</h2>
      <p className="text-base text-gray-600 text-center mb-4">
        Discover the best places to eat and enjoy great food.
      </p>
      <button className="mt-auto bg-yellow-500 text-white px-5 py-2 rounded-full shadow hover:bg-yellow-600 transition font-semibold text-sm group-hover:scale-105">
        Book Table
      </button>
    </div>
  );
};

export default ResturantComponent;
