import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstanace } from "../lib.js/axios";
import useAuthStore from "../store/useAuthStore";
import useUserStore from "../store/useUserStore";

const RoleLogin = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { token } = useAuthStore();
  const { fetchUserData } = useUserStore();

  const handleSelect = async (selectedAccountType) => {
    setErrorMessage("");
    setIsSubmitting(true);
    try {
      const authToken =
        (typeof useAuthStore.getState === "function"
          ? useAuthStore.getState().token
          : token) || localStorage.getItem("token");

      await axiosInstanace.patch(
        "/user/updateAccountType",
        { accountType: selectedAccountType },
        {
          headers: authToken
            ? { Authorization: `Bearer ${authToken}` }
            : undefined,
        }
      );

      // Refresh local user data cache after update
      try {
        await fetchUserData(authToken);
      } catch (_) {}

      // Navigate to home or dashboard (adjust as needed)
      if (selectedAccountType === "businessAccount") {
        navigate("/accountsetup");
      } else {
        navigate("/");
      }
    } catch (err) {
      const message =
        err?.response?.data?.message || err?.message || "Failed to save selection";
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-6">Login As</h2>

        {errorMessage && (
          <div className="mb-4 text-red-600 text-sm" role="alert">
            {errorMessage}
          </div>
        )}

        <button
          onClick={() => handleSelect("businessAccount")}
          disabled={isSubmitting}
          className={`w-full bg-blue-600 text-white py-2 rounded-md transition mb-4 ${
            isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
        >
          {isSubmitting ? "Saving..." : "Business Owner"}
        </button>

        <button
          onClick={() => handleSelect("userAccount")}
          disabled={isSubmitting}
          className={`w-full border border-blue-600 text-blue-600 py-2 rounded-md transition ${
            isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-50"
          }`}
        >
          {isSubmitting ? "Saving..." : "User"}
        </button>
      </div>
    </div>
  );
};

export default RoleLogin;
