import React, { useEffect } from "react";
import ServiceCard from "../components/ServiceCard";
import serviceStore from "../store/service";

const Service = () => {
  const { fetchData, serviceData } = serviceStore();
  useEffect(() => {
    try {
      const fetchServices = async () => {
        // const response = await ;
        const res = await fetchData();
        console.log(res);
      };
      fetchServices();
    } catch (error) {
      console.log(error);
    }
  }, [!serviceData.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col items-center px-4 py-8">
      {/* Hero Section */}
      <div className="max-w-2xl w-full text-center mb-10 animate-fade-in-up">
        <h1 className="text-3xl md:text-4xl font-extrabold text-blue-800 mb-3 drop-shadow">
          Book Home Services
        </h1>
        <p className="text-lg text-gray-600 mb-2">
          Find and book trusted professionals for all your home needs. Fast,
          reliable, and at your fingertips.
        </p>
      </div>
      {/* Service Cards Grid */}
      <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
        {serviceData.map((service) => (
          <ServiceCard key={service._id} service={service} />
        ))}
      </div>
    </div>
  );
};

export default Service;
