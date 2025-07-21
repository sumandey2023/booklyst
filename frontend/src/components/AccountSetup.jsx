import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AccountSetup = () => {
  const [selectedType, setSelectedType] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const navigate = useNavigate();

  const services = [
    "Electrician",
    "Plumber",
    "Mechanic",
    "Carpenter",
    "Painter",
    "AC Technician",
    "Gardener",
    "House Cleaner",
  ];

  const handleContinue = () => {
    const data = {
      type: selectedService,
      service: selectedType === "service" ? selectedService : null,
    };

    // ✅ This stores selected type and service in navigation state
    navigate("/accountSetup/form", { state: data });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6">
          Choose Account Type
        </h2>

        <div className="flex gap-4 justify-center mb-6">
          <div
            onClick={() => {
              setSelectedType("business");
              setSelectedService(null);
            }}
            className={`w-1/2 text-center border-2 rounded-xl p-4 cursor-pointer ${
              selectedType === "business"
                ? "border-blue-500 bg-blue-100"
                : "border-gray-300"
            }`}
          >
            <h3 className="text-lg font-semibold">Business</h3>
            <p className="text-sm text-gray-600">
              For E-Commerce, Retail, etc.
            </p>
          </div>

          <div
            onClick={() => {
              setSelectedType("service");
              setSelectedService(null);
            }}
            className={`w-1/2 text-center border-2 rounded-xl p-4 cursor-pointer ${
              selectedType === "service"
                ? "border-green-500 bg-green-100"
                : "border-gray-300"
            }`}
          >
            <h3 className="text-lg font-semibold">Service Provider</h3>
            <p className="text-sm text-gray-600">Electrician, Plumber, etc.</p>
          </div>
        </div>

        {selectedType === "service" && (
          <>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
              Select Your Service
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {services.map((service) => (
                <div
                  key={service}
                  onClick={() => setSelectedService(service)}
                  className={`border-2 rounded-lg p-3 text-center cursor-pointer ${
                    selectedService === service
                      ? "border-green-500 bg-green-100"
                      : "border-gray-300"
                  }`}
                >
                  {service}
                </div>
              ))}
            </div>
          </>
        )}

        {selectedType && (selectedType === "business" || selectedService) && (
          <div className="mt-8 text-center">
            <button
              onClick={handleContinue}
              className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700"
            >
              Continue
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountSetup;
