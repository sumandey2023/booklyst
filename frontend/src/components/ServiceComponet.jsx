import React from "react";
import { useNavigate } from "react-router-dom";

const ServiceComponent = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/service");
  };

  return (
    <div
      onClick={handleClick}
      className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 p-4"
    >
      <div className="cursor-pointer bg-gradient-to-br from-white to-green-50 hover:from-green-100 hover:to-green-200 transition-all duration-300 shadow-lg hover:shadow-2xl rounded-3xl p-6 h-60 flex flex-col justify-center items-center border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">🛠️ Services</h2>
        <p className="text-base text-gray-500 text-center">
          Explore professional services tailored to your needs.
        </p>
      </div>
    </div>
  );
};

export default ServiceComponent;
