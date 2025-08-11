import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import MotionFade from "./motion/MotionFade";

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex flex-col items-center justify-center px-4 py-10">
      <MotionFade className="w-full max-w-3xl">
        <div className="bg-white dark:bg-slate-900/90 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 p-6 md:p-10">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
              Choose Your Account Type
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Select how you want to use Booklyst. You can configure details later.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <button
              onClick={() => {
                setSelectedType("business");
                setSelectedService(null);
              }}
              className={`text-left p-5 rounded-2xl border-2 transition-all ${
                selectedType === "business"
                  ? "border-indigo-500 bg-indigo-50 dark:bg-slate-800"
                  : "border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
              }`}
            >
              <div className="text-sm font-semibold text-indigo-600 dark:text-indigo-300">Business</div>
              <div className="text-slate-800 dark:text-slate-200 text-base font-bold">I run a business</div>
              <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">E-commerce, retail, and more</div>
            </button>

            <button
              onClick={() => {
                setSelectedType("service");
                setSelectedService(null);
              }}
              className={`text-left p-5 rounded-2xl border-2 transition-all ${
                selectedType === "service"
                  ? "border-emerald-500 bg-emerald-50 dark:bg-slate-800"
                  : "border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
              }`}
            >
              <div className="text-sm font-semibold text-emerald-600 dark:text-emerald-300">Service Provider</div>
              <div className="text-slate-800 dark:text-slate-200 text-base font-bold">I provide services</div>
              <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">Electrician, plumber, etc.</div>
            </button>
          </div>

          {selectedType === "service" && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Select your service</h3>
              <div className="flex flex-wrap gap-2">
                {services.map((service) => (
                  <button
                    key={service}
                    onClick={() => setSelectedService(service)}
                    className={`px-4 py-2 rounded-xl border text-sm transition-all ${
                      selectedService === service
                        ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                        : "border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                    }`}
                  >
                    {service}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 text-center">
            <button
              onClick={handleContinue}
              disabled={!(selectedType === "business" || (selectedType === "service" && selectedService))}
              className={`w-full md:w-auto px-8 py-3 rounded-2xl font-bold shadow-lg transition-all ${
                selectedType === "business" || (selectedType === "service" && selectedService)
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:scale-[1.02]"
                  : "bg-slate-200 text-slate-500 cursor-not-allowed"
              }`}
            >
              Continue
            </button>
          </div>
        </div>
      </MotionFade>
    </div>
  );
};

export default AccountSetup;
