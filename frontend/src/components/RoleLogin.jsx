import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstanace } from "../lib.js/axios";
import useAuthStore from "../store/useAuthStore";
import useUserStore from "../store/useUserStore";
import MotionFade from "./motion/MotionFade";

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-indigo-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 px-4">
      <MotionFade className="w-full max-w-2xl">
        <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-2xl rounded-3xl p-8 md:p-10 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-slate-100 mb-2">
            Choose Your Role
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Select how you want to use Booklyst. You can change it later.
          </p>

          {errorMessage && (
            <div className="mb-6 text-red-600 bg-red-50 border border-red-200 rounded-xl p-3 text-sm" role="alert">
              {errorMessage}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
            <button
              onClick={() => handleSelect("businessAccount")}
              disabled={isSubmitting}
              className={`group relative p-6 rounded-2xl border-2 transition-all text-left ${
                isSubmitting
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:-translate-y-1 hover:shadow-xl"
              } border-indigo-200 dark:border-slate-700 bg-white dark:bg-slate-900`}
            >
              <div className="text-3xl mb-3">🏪</div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-1">
                I'm a Business
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Manage your profile, services, and bookings.
              </p>
            </button>

            <button
              onClick={() => handleSelect("userAccount")}
              disabled={isSubmitting}
              className={`group relative p-6 rounded-2xl border-2 transition-all text-left ${
                isSubmitting
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:-translate-y-1 hover:shadow-xl"
              } border-emerald-200 dark:border-slate-700 bg-white dark:bg-slate-900`}
            >
              <div className="text-3xl mb-3">👤</div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-1">
                I'm a User
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Explore businesses and book services.
              </p>
            </button>
          </div>

          <button
            disabled={isSubmitting}
            className={`w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold shadow-lg ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:from-indigo-700 hover:to-purple-700"
            }`}
          >
            {isSubmitting ? "Saving..." : "Continue"}
          </button>
        </div>
      </MotionFade>
    </div>
  );
};

export default RoleLogin;
