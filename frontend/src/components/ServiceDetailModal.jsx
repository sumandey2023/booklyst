import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const ServiceDetailModal = ({ service, onClose }) => {
  const { ServiceType, content, createdAt } = service;
  const title = content.find((item) => item.type === "title")?.value || "";
  const subtitle =
    content.find((item) => item.type === "subtitle")?.value || "";
  const text = content.find((item) => item.type === "text")?.value || "";
  const imageUrl = content.find((item) => item.type === "image")?.value || "";

  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const handleBook = () => {
    navigate("/bookservice", { state: { service } });
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        aria-modal="true"
        role="dialog"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.98 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative bg-white dark:bg-slate-900/95 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 max-w-2xl w-full mx-4 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-5 flex items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3 min-w-0">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-sm uppercase tracking-widest">
                {ServiceType}
              </span>
              <div className="truncate">
                <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 truncate">{title}</h2>
                {subtitle && (
                  <p className="text-sm font-medium text-indigo-600 dark:text-indigo-300 truncate">{subtitle}</p>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="relative p-2 rounded-xl text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              aria-label="Close"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Image */}
          <div className="px-5 pt-5">
            <div className="w-full aspect-[16/9] rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 bg-slate-100 dark:bg-slate-800">
              {!imageLoaded && (
                <div className="w-full h-full animate-pulse bg-slate-200 dark:bg-slate-700" />
              )}
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt="Service"
                  className={`w-full h-full object-cover object-center transition-opacity duration-300 ${
                    imageLoaded ? "opacity-100" : "opacity-0"
                  }`}
                  onLoad={() => setImageLoaded(true)}
                />
              )}
            </div>
          </div>

          {/* Body */}
          <div className="p-5">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              {text}
            </p>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Posted on {new Date(createdAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="p-5 pt-0">
            <button
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-base shadow-lg hover:from-indigo-700 hover:to-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400"
              onClick={handleBook}
            >
              Book Now
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ServiceDetailModal;
