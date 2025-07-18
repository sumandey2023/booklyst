import React, { useState } from "react";
import { HandThumbUpIcon, HandThumbDownIcon } from "@heroicons/react/24/solid";

const ServiceCard = ({ service }) => {
  const { ServiceType, content, createdAt, likes, dislikes } = service;

  const [likeCount, setLikeCount] = useState(likes.length);
  const [dislikeCount, setDislikeCount] = useState(dislikes.length);

  const title = content.find((item) => item.type === "title")?.value || "";

  const handleLike = () => {
    setLikeCount((prev) => prev + 1);
  };

  const handleDislike = () => {
    setDislikeCount((prev) => prev + 1);
  };

  // Dummy image (replace with backend image later)
  const dummyImg =
    "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80";

  return (
    <div className="bg-white/90 backdrop-blur-md border border-blue-100 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-0 w-full max-w-md mx-auto flex flex-col overflow-hidden group">
      {/* Image */}
      <div className="h-40 w-full overflow-hidden">
        <img
          src={dummyImg}
          alt="Service"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      {/* Card Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-lg font-extrabold text-blue-700 mb-2 tracking-tight">
          {ServiceType}
        </h3>
        <p className="text-gray-700 text-base mb-3 line-clamp-3 font-medium">
          {title}
        </p>
        <div className="text-xs text-gray-400 mb-4">
          Posted on:{" "}
          <span className="font-semibold text-gray-500">
            {new Date(createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>
        <div className="flex items-center gap-4 mt-auto">
          <button
            onClick={handleLike}
            className="flex items-center gap-1 px-3 py-1 rounded-full text-green-600 bg-green-50 hover:bg-green-100 shadow-sm transition group-hover:scale-105 focus:ring-2 focus:ring-green-300"
            aria-label="Like"
          >
            <HandThumbUpIcon className="w-5 h-5" />
            <span className="text-sm font-semibold">{likeCount}</span>
          </button>
          <button
            onClick={handleDislike}
            className="flex items-center gap-1 px-3 py-1 rounded-full text-red-600 bg-red-50 hover:bg-red-100 shadow-sm transition group-hover:scale-105 focus:ring-2 focus:ring-red-300"
            aria-label="Dislike"
          >
            <HandThumbDownIcon className="w-5 h-5" />
            <span className="text-sm font-semibold">{dislikeCount}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
