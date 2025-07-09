import React from "react";
import { useNavigate } from "react-router-dom";

const RoleLogin = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-6">Login As</h2>

        <button
          onClick={() => navigate("/accountsetup")}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition mb-4"
        >
          Business Owner
        </button>

        <button
          onClick={() => navigate("/")}
          className="w-full border border-blue-600 text-blue-600 py-2 rounded-md hover:bg-blue-50 transition"
        >
          User
        </button>
      </div>
    </div>
  );
};

export default RoleLogin;
