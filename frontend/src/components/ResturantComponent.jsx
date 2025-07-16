import React from "react";
import { useNavigate } from "react-router-dom";

const ResturantComponent = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/resturant");
  };

  return (
    <div
      onClick={handleClick}
      className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 p-4"
    >
      <div className="cursor-pointer bg-gradient-to-br from-white to-yellow-50 hover:from-yellow-100 hover:to-yellow-200 transition-all duration-300 shadow-lg hover:shadow-2xl rounded-3xl p-6 h-60 flex flex-col justify-center items-center border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">🍽️ Restaurant</h2>
        <p className="text-base text-gray-500 text-center">
          Discover the best places to eat and enjoy great food.
        </p>
      </div>
    </div>
  );
};

export default ResturantComponent;
