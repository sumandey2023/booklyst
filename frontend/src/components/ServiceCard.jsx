import React, { useState } from "react";
import { HandThumbUpIcon, HandThumbDownIcon } from "@heroicons/react/24/solid";
import ServiceDetailModal from "./ServiceDetailModal";

const ServiceCard = ({ service }) => {
  const { ServiceType, content, createdAt, likes, dislikes } = service;

  const [likeCount, setLikeCount] = useState(likes.length);
  const [dislikeCount, setDislikeCount] = useState(dislikes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  console.log(service);

  const [openModal, setOpenModal] = useState(false);

  // Extract content types
  const title = content.find((item) => item.type === "title")?.value || "";
  const subtitle =
    content.find((item) => item.type === "subtitle")?.value || "";
  const text = content.find((item) => item.type === "text")?.value || "";
  const imageUrl = content.find((item) => item.type === "image")?.value || "";

  const handleLike = () => {
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

  const handleDislike = () => {
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

  const dummyImg =
    "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80";

  return (
    <>
      <div
        className="group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden max-w-sm w-full mx-auto border border-gray-100 cursor-pointer"
        style={{ minWidth: "320px", maxWidth: "384px" }}
        onClick={() => setOpenModal(true)}
      >
        {/* Image Section */}
        <div
          className="relative overflow-hidden w-full"
          style={{ minWidth: "320px", maxWidth: "384px" }}
        >
          <img
            src={imageUrl || dummyImg}
            alt="Service"
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {/* Service Type Badge */}
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg">
              {ServiceType}
            </span>
          </div>
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
        </div>

        {/* Content Section */}
        <div
          className="p-6 w-full"
          style={{ minWidth: "320px", maxWidth: "384px" }}
        >
          {/* Title and Subtitle */}
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-900 mb-1 leading-tight">
              {title || ServiceType}
            </h3>
            {subtitle && (
              <h4 className="text-sm font-medium text-blue-600 mb-2">
                {subtitle}
              </h4>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
            {text}
          </p>

          {/* Date */}
          <div className="text-xs text-gray-400 mb-4">
            {new Date(createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                isLiked
                  ? "bg-green-50 text-green-600 border border-green-200"
                  : "text-gray-500 hover:bg-green-50 hover:text-green-600 border border-gray-200"
              }`}
              aria-label="Like"
            >
              <HandThumbUpIcon className="w-4 h-4" />
              <span className="text-sm font-semibold">{likeCount}</span>
            </button>

            <button
              onClick={handleDislike}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                isDisliked
                  ? "bg-red-50 text-red-600 border border-red-200"
                  : "text-gray-500 hover:bg-red-50 hover:text-red-600 border border-gray-200"
              }`}
              aria-label="Dislike"
            >
              <HandThumbDownIcon className="w-4 h-4" />
              <span className="text-sm font-semibold">{dislikeCount}</span>
            </button>
          </div>
        </div>
      </div>
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
