import React from "react";
import { useNavigate } from "react-router-dom";

const ServiceDetailModal = ({ service, onClose }) => {
  const { ServiceType, content, createdAt } = service;
  const title = content.find((item) => item.type === "title")?.value || "";
  const subtitle =
    content.find((item) => item.type === "subtitle")?.value || "";
  const text = content.find((item) => item.type === "text")?.value || "";
  const imageUrl = content.find((item) => item.type === "image")?.value || "";

  const navigate = useNavigate();

  const handleBook = () => {
    navigate("/bookservice", { state: { service } });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full mx-4 p-8 animate-fade-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold focus:outline-none"
          aria-label="Close"
        >
          &times;
        </button>
        {/* Service Type Badge */}
        <div className="mb-4 flex items-center gap-2">
          <span className="inline-flex items-center px-4 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg uppercase tracking-widest">
            {ServiceType}
          </span>
        </div>
        {/* Image */}
        <div className="w-full h-56 rounded-2xl overflow-hidden mb-6 flex items-center justify-center bg-gradient-to-br from-blue-100/40 to-purple-100/30">
          <img
            src={imageUrl}
            alt="Service"
            className="w-full h-full object-cover object-center"
          />
        </div>
        {/* Title & Subtitle */}
        <h2 className="text-2xl font-extrabold text-blue-800 mb-1 leading-tight">
          {title}
        </h2>
        {subtitle && (
          <h3 className="text-lg font-medium text-blue-600 mb-3 italic">
            {subtitle}
          </h3>
        )}
        {/* Description */}
        <p className="text-gray-700 text-base mb-4 leading-relaxed">{text}</p>
        {/* Date */}
        <div className="text-xs text-gray-400 mb-6">
          Posted on:{" "}
          {new Date(createdAt).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </div>
        {/* Book Button */}
        <button
          className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-lg shadow-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={handleBook}
        >
          Book Now
        </button>
      </div>
      {/* Modal Animation */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s cubic-bezier(0.4,0,0.2,1);
        }
      `}</style>
    </div>
  );
};

export default ServiceDetailModal;
