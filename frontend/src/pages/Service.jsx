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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {serviceData.map((service) => (
        <ServiceCard key={service._id} service={service} />
      ))}
    </div>
  );
};

export default Service;
