import React, { useEffect, useState } from "react";
import { HandThumbUpIcon, HandThumbDownIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import ServiceDetailModal from "./ServiceDetailModal";

const ServiceCard = ({ service }) => {
  const { ServiceType, content, createdAt, likes, dislikes } = service;
  const [likeCount, setLikeCount] = useState(likes.length);
  const [dislikeCount, setDislikeCount] = useState(dislikes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Extract content types
  const title = content.find((item) => item.type === "title")?.value || "";
  const subtitle =
    content.find((item) => item.type === "subtitle")?.value || "";
  const text = content.find((item) => item.type === "text")?.value || "";
  const imageUrl = content.find((item) => item.type === "image")?.value || "";

  const dummyImg =
    "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80";

  const handleLike = (e) => {
    e.stopPropagation();
    if (isDisliked) {
      setDislikeCount((prev) => prev - 1);
      setIsDisliked(false);
    }
    if (!isLiked) {
      setLikeCount((prev) => prev + 1);
      setIsLiked(true);
    } else {
      setLikeCount((prev) => prev - 1);
      setIsLiked(false);
    }
  };
  useEffect(() => {
    console.log(service);
  }, []);

  const handleDislike = (e) => {
    e.stopPropagation();
    if (isLiked) {
      setLikeCount((prev) => prev - 1);
      setIsLiked(false);
    }
    if (!isDisliked) {
      setDislikeCount((prev) => prev + 1);
      setIsDisliked(true);
    } else {
      setDislikeCount((prev) => prev - 1);
      setIsDisliked(false);
    }
  };

  return (
    <>
      <motion.div
        className="group relative bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl border border-blue-100/60 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 max-w-sm w-full mx-auto cursor-pointer"
        style={{ minWidth: "320px", maxWidth: "384px" }}
        onClick={() => setOpenModal(true)}
        role="button"
        aria-label={`View details for ${title || ServiceType}`}
        whileHover={{ y: -4 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Hero IMAGE w/ Glass Overlay */}
        <div className="relative w-full h-56 overflow-hidden">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800 animate-pulse" />
          )}
          <img
            src={imageUrl || dummyImg}
            alt="Service"
            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
          />
          {/* Glass gradient + Shine */}
          <span className="absolute inset-0 bg-gradient-to-t from-black/40 via-blue-200/10 to-transparent transition-all" />
          {/* Shine hover */}
          <span className="absolute inset-0 pointer-events-none">
            <span className="block w-full h-full bg-gradient-to-r from-white/10 via-white/40 to-white/10 opacity-0 group-hover:opacity-80 blur-sm transition-all duration-300" />
          </span>
          {/* ServiceType Badge */}
          <span className="absolute top-4 left-4 px-4 py-1.5 text-xs font-bold rounded-full bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 shadow-lg text-white tracking-wider">
            {ServiceType}
          </span>
        </div>

        {/* Article Section */}
        <div className="p-6 w-full flex flex-col gap-2">
          {/* Title and subtitle */}
          <div>
            <h3 className="text-2xl font-extrabold text-blue-900 dark:text-indigo-200 mb-1 leading-snug tracking-tight">
              {title || ServiceType}
            </h3>
            {subtitle && (
              <h4 className="text-sm font-semibold text-indigo-500 dark:text-indigo-300 mb-2">
                {subtitle}
              </h4>
            )}
          </div>

          {/* Text content */}
          <p className="text-gray-700 dark:text-slate-300 text-base/relaxed mb-2 line-clamp-3">
            {text}
          </p>

          {/* Date */}
          <div className="text-xs text-gray-400 dark:text-slate-400 mb-4 mt-2 select-none">
            {new Date(createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </div>

          {/* Likes & dislikes */}
          <div className="flex items-center justify-between pt-2 border-t border-blue-50/60 dark:border-slate-800 mt-auto gap-2">
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl shadow transition-all duration-150 border font-semibold text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-green-300
                ${
                  isLiked
                    ? "bg-gradient-to-r from-green-100 to-green-50 text-green-700 border-green-200 scale-105"
                    : "text-gray-500 dark:text-slate-400 hover:bg-green-50 dark:hover:bg-slate-800 hover:text-green-700 border-gray-200 dark:border-slate-700 hover:scale-105"
                }
                `}
              aria-label="Like"
              tabIndex={0}
              type="button"
            >
              <HandThumbUpIcon
                className={`w-5 h-5 ${
                  isLiked
                    ? "text-green-600"
                    : "text-gray-400 dark:text-slate-500 group-hover:text-green-700"
                }`}
              />
              {likeCount}
            </button>
            <button
              onClick={handleDislike}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl shadow transition-all duration-150 border font-semibold text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-red-300
                ${
                  isDisliked
                    ? "bg-gradient-to-r from-rose-100 to-red-50 text-red-600 border-red-200 scale-105"
                    : "text-gray-500 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-slate-800 hover:text-red-600 border-gray-200 dark:border-slate-700 hover:scale-105"
                }
                `}
              aria-label="Dislike"
              tabIndex={0}
              type="button"
            >
              <HandThumbDownIcon
                className={`w-5 h-5 ${
                  isDisliked
                    ? "text-red-500"
                    : "text-gray-400 dark:text-slate-500 group-hover:text-red-600"
                }`}
              />
              {dislikeCount}
            </button>
          </div>
        </div>
      </motion.div>
      {openModal && (
        <ServiceDetailModal
          service={service}
          onClose={() => setOpenModal(false)}
        />
      )}
    </>
  );
};

export default ServiceCard;
