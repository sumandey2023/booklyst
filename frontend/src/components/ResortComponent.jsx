import React from "react";
import { useNavigate } from "react-router-dom";

const ResortComponent = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/resort");
  };

  return (
    <div
      onClick={handleClick}
      className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 p-4"
    >
      <div className="cursor-pointer bg-gradient-to-br from-white to-blue-50 hover:from-blue-100 hover:to-blue-200 transition-all duration-300 shadow-lg hover:shadow-2xl rounded-3xl p-6 h-60 flex flex-col justify-center items-center border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">🏖️ Resort</h2>
        <p className="text-base text-gray-500 text-center">
          Find your perfect holiday destination with us.
        </p>
      </div>
    </div>
  );
};

export default ResortComponent;
