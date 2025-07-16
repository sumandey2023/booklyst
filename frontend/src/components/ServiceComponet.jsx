import React from "react";
import { useNavigate } from "react-router-dom";
import { WrenchScrewdriverIcon } from "@heroicons/react/24/solid";

const ServiceComponent = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/service");
  };

  return (
    <div
      onClick={handleClick}
      className="group cursor-pointer bg-gradient-to-br from-green-100 via-white to-green-50 hover:from-green-200 hover:to-white transition-all duration-300 shadow-xl hover:shadow-2xl rounded-3xl p-6 h-64 flex flex-col justify-center items-center border border-green-100 hover:-translate-y-2 focus:ring-2 focus:ring-green-400 outline-none"
      tabIndex={0}
      role="button"
      aria-label="Go to Services"
    >
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-200 mb-4 shadow group-hover:scale-110 transition-transform">
        <WrenchScrewdriverIcon className="w-8 h-8 text-green-700" />
      </div>
      <h2 className="text-2xl font-bold text-green-800 mb-2">Home Services</h2>
      <p className="text-base text-gray-600 text-center mb-4">
        Explore professional services tailored to your needs.
      </p>
      <button className="mt-auto bg-green-600 text-white px-5 py-2 rounded-full shadow hover:bg-green-700 transition font-semibold text-sm group-hover:scale-105">
        Book Service
      </button>
    </div>
  );
};

export default ServiceComponent;
