import React, { useState } from "react";

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

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 w-full max-w-md mx-auto">
      <h3 className="text-xl font-extrabold text-indigo-600 mb-3">
        {ServiceType}
      </h3>

      <p className="text-gray-700 text-sm mb-4 line-clamp-4">{title}</p>

      <div className="text-sm text-gray-400 mb-4">
        Posted on:{" "}
        <span className="font-medium text-gray-500">
          {new Date(createdAt).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </span>
      </div>

      <div className="flex items-center gap-4 mt-2">
        <button
          onClick={handleLike}
          className="flex items-center gap-1 px-3 py-1 rounded-full text-green-600 hover:bg-green-100 transition"
        >
          👍 <span className="text-sm">{likeCount}</span>
        </button>

        <button
          onClick={handleDislike}
          className="flex items-center gap-1 px-3 py-1 rounded-full text-red-600 hover:bg-red-100 transition"
        >
          👎 <span className="text-sm">{dislikeCount}</span>
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;
