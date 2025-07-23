import React from "react";
import { useUser, useClerk } from "@clerk/clerk-react";

const ProfilePage = () => {
  const { user } = useUser();
  const { signOut } = useClerk();

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          You are not logged in.
        </h2>
        <a href="/auth" className="px-4 py-2 bg-blue-600 text-white rounded-lg">
          Login/Signup
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-white px-2 overflow-hidden">
      <div className="w-full max-w-md bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl p-8 flex flex-col items-center border border-blue-100 relative overflow-hidden">
        {/* Decorative Gradient Ring */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br from-blue-400/30 to-purple-400/20 rounded-full blur-2xl z-0" />
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-tr from-purple-400/30 to-blue-400/20 rounded-full blur-2xl z-0" />
        {/* Profile Image with Ring */}
        <div className="relative z-10 mb-4">
          <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-blue-400 to-purple-400 p-1 shadow-xl mx-auto">
            <img
              src={user.imageUrl}
              alt="Profile"
              className="w-full h-full object-cover rounded-full border-4 border-white shadow-lg"
            />
          </div>
        </div>
        <h2 className="text-3xl font-extrabold text-blue-800 mb-1 text-center drop-shadow-lg z-10">
          {user.fullName || "No Name"}
        </h2>
        <p className="text-blue-600 text-base mb-4 text-center z-10 flex items-center justify-center gap-2">
          <svg
            className="w-5 h-5 text-blue-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16 12a4 4 0 01-8 0m8 0a4 4 0 00-8 0m8 0V8a4 4 0 00-8 0v4m8 0v4a4 4 0 01-8 0v-4"
            />
          </svg>
          {user.primaryEmailAddress?.emailAddress}
        </p>
        <div className="w-full flex flex-col gap-3 my-6 z-10">
          <div className="flex items-center gap-2 text-gray-600 text-sm bg-white/60 rounded-lg px-4 py-2 shadow">
            <svg
              className="w-5 h-5 text-blue-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.121 17.804A13.937 13.937 0 0112 15c2.485 0 4.797.657 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="font-semibold">User ID:</span>
            <span className="font-mono truncate">{user.id}</span>
          </div>
          {user.username && (
            <div className="flex items-center gap-2 text-gray-600 text-sm bg-white/60 rounded-lg px-4 py-2 shadow">
              <svg
                className="w-5 h-5 text-blue-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.121 17.804A13.937 13.937 0 0112 15c2.485 0 4.797.657 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="font-semibold">Username:</span>
              <span className="font-mono truncate">{user.username}</span>
            </div>
          )}
          {user.phoneNumbers && user.phoneNumbers.length > 0 && (
            <div className="flex items-center gap-2 text-gray-600 text-sm bg-white/60 rounded-lg px-4 py-2 shadow">
              <svg
                className="w-5 h-5 text-blue-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 5h2l.4 2M7 13h10l1.4-7H6.6M7 13l-1.4 7h10.8L17 13M7 13V6a1 1 0 011-1h8a1 1 0 011 1v7"
                />
              </svg>
              <span className="font-semibold">Phone:</span>
              <span className="font-mono truncate">
                {user.phoneNumbers[0].phoneNumber}
              </span>
            </div>
          )}
        </div>
        <button
          onClick={() => signOut()}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-lg shadow-lg hover:scale-105 hover:from-blue-600 hover:to-purple-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 mt-6 z-10"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
