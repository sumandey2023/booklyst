import React, { useState } from "react";
import { useUser, useClerk } from "@clerk/clerk-react";
import MotionFade from "../components/motion/MotionFade";
import { Tabs, Tab } from "@mui/material";

const InfoRow = ({ Icon, label, value, copyable = false }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (copyable && value) {
      try {
        await navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    }
  };

  return (
    <div className="group relative flex items-center gap-4 p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 hover:border-indigo-200 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center group-hover:from-indigo-200 group-hover:to-purple-200 transition-all duration-300">
        <Icon className="w-6 h-6 text-indigo-600" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-slate-600 mb-1">{label}</p>
        <p
          className="text-base font-semibold text-slate-800 truncate"
          title={value}
        >
          {value}
        </p>
      </div>
      {copyable && (
        <button
          onClick={handleCopy}
          className="flex-shrink-0 p-2 rounded-lg bg-slate-50 hover:bg-indigo-50 text-slate-400 hover:text-indigo-600 transition-all duration-200 opacity-0 group-hover:opacity-100"
          title="Copy to clipboard"
        >
          {copied ? (
            <CheckIcon className="w-4 h-4 text-green-600" />
          ) : (
            <CopyIcon className="w-4 h-4" />
          )}
        </button>
      )}
    </div>
  );
};

const MailIcon = (props) => (
  <svg
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const UserIcon = (props) => (
  <svg
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const PhoneIcon = (props) => (
  <svg
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const IdIcon = (props) => (
  <svg
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14,2 14,8 20,8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10,9 9,9 8,9" />
  </svg>
);

const CopyIcon = (props) => (
  <svg
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const CheckIcon = (props) => (
  <svg
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <polyline points="20,6 9,17 4,12" />
  </svg>
);

const LogoutIcon = (props) => (
  <svg
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16,17 21,12 16,7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const ProfilePage = () => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const handleSignOut = async () => {
    setIsLoggingOut(true);
    try {
      await signOut();
    } catch (error) {
      console.error("Sign out error:", error);
      setIsLoggingOut(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-4">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-br from-blue-200/30 to-indigo-200/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative z-10 text-center">
          <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center shadow-lg">
            <UserIcon className="w-16 h-16 text-red-500" />
          </div>
          <h2 className="text-4xl font-bold text-slate-800 mb-4">
            Access Required
          </h2>
          <p className="text-lg text-slate-600 mb-8 max-w-md">
            Please sign in to view your profile and access personalized
            features.
          </p>
          <a
            href="/auth"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <UserIcon className="w-5 h-5" />
            Sign In to Continue
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-200/20 to-indigo-200/20 dark:from-slate-800/20 dark:to-slate-700/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-gradient-to-br from-purple-200/20 to-pink-200/20 dark:from-slate-800/10 dark:to-slate-700/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-gradient-to-br from-indigo-200/15 to-blue-200/15 dark:from-slate-800/10 dark:to-slate-700/10 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Tabs */}
        <div className="mb-6">
          <Tabs
            value={activeTab}
            onChange={(_, v) => setActiveTab(v)}
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="Overview" />
            <Tab label="Security" />
            <Tab label="Activity" />
          </Tabs>
        </div>

        {/* Main Profile Card */}
        <MotionFade>
          <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 dark:border-slate-800 overflow-hidden">
          {/* Header Section */}
          <div className="relative bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-8 py-12 text-center">
            {/* Decorative elements */}
            <div className="absolute top-4 left-4 w-20 h-20 bg-white/10 rounded-full blur-xl" />
            <div className="absolute bottom-4 right-4 w-16 h-16 bg-white/10 rounded-full blur-lg" />

            {/* Profile Picture */}
            <div className="relative inline-block mb-6">
              <div className="w-36 h-36 rounded-full bg-white p-2 shadow-2xl">
                <img
                  src={user.imageUrl}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                  loading="lazy"
                />
              </div>
              {/* Online status indicator */}
              <div className="absolute bottom-2 right-2 w-8 h-8 bg-green-400 border-4 border-white rounded-full shadow-lg" />
            </div>

            {/* Name and basic info */}
            <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
              {user.fullName || "Welcome User"}
            </h1>
            <p className="text-xl text-white/90 font-medium mb-1">
              {user.primaryEmailAddress?.emailAddress || "No email available"}
            </p>
            <p className="text-white/70 text-sm">
              Member since {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>

          {/* Content Section */}
          <div className="p-8">
            {activeTab === 0 && (
              <MotionFade>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-slate-800 dark:to-slate-700 rounded-lg flex items-center justify-center">
                    <UserIcon className="w-5 h-5 text-indigo-600" />
                  </div>
                  Account Information
                </h2>

                {/* Quick stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <div className="text-sm text-slate-500 dark:text-slate-400">Bookings</div>
                    <div className="text-2xl font-bold text-slate-800 dark:text-slate-100">0</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <div className="text-sm text-slate-500 dark:text-slate-400">Favorites</div>
                    <div className="text-2xl font-bold text-slate-800 dark:text-slate-100">0</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <div className="text-sm text-slate-500 dark:text-slate-400">Member Since</div>
                    <div className="text-2xl font-bold text-slate-800 dark:text-slate-100">{new Date(user.createdAt).toLocaleDateString()}</div>
                  </div>
                </div>

                {/* Information Grid */}
                <div className="space-y-4 mb-8">
                  <InfoRow Icon={IdIcon} label="User ID" value={user.id} copyable={true} />

                  <InfoRow
                    Icon={MailIcon}
                    label="Email Address"
                    value={user.primaryEmailAddress?.emailAddress || "Not provided"}
                    copyable={true}
                  />

                  {user.username && (
                    <InfoRow Icon={UserIcon} label="Username" value={user.username} copyable={true} />
                  )}

                  {user.phoneNumbers && user.phoneNumbers.length > 0 && (
                    <InfoRow
                      Icon={PhoneIcon}
                      label="Phone Number"
                      value={user.phoneNumbers[0].phoneNumber}
                      copyable={true}
                    />
                  )}

                  <InfoRow Icon={UserIcon} label="Account Status" value="Active" />
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleSignOut}
                    disabled={isLoggingOut}
                    className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-300"
                  >
                    {isLoggingOut ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Signing Out...
                      </>
                    ) : (
                      <>
                        <LogoutIcon className="w-5 h-5" />
                        Sign Out
                      </>
                    )}
                  </button>

                  <button
                    className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 font-semibold rounded-2xl hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 dark:hover:bg-slate-800 transition-all duration-300"
                    onClick={() => window.location.reload()}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Refresh Profile
                  </button>
                </div>
              </MotionFade>
            )}

            {activeTab === 1 && (
              <MotionFade>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">Security</h2>
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-slate-800 dark:text-slate-100">Two-Factor Authentication</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Manage 2FA from your Clerk settings.</p>
                      </div>
                      <a href="https://dashboard.clerk.com/" target="_blank" rel="noreferrer" className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700">Open Clerk</a>
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <p className="font-semibold text-slate-800 dark:text-slate-100">Recent Sessions</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">View and manage your active sessions in Clerk.</p>
                  </div>
                </div>
              </MotionFade>
            )}

            {activeTab === 2 && (
              <MotionFade>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">Recent Activity</h2>
                <div className="space-y-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 animate-pulse" />
                  ))}
                </div>
              </MotionFade>
            )}
          </div>
          </div>
        </MotionFade>

        {/* Additional Info Card */}
        <MotionFade>
          <div className="mt-6 bg-white/70 dark:bg-slate-900/70 backdrop-blur-lg rounded-2xl p-6 border border-white/50 dark:border-slate-800">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-md flex items-center justify-center">
              <svg
                className="w-4 h-4 text-indigo-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            Quick Info
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between items-center py-2 px-3 bg-slate-50/80 dark:bg-slate-800/60 rounded-lg">
                <span className="text-slate-600 dark:text-slate-400">Account Type</span>
                <span className="font-medium text-slate-800 dark:text-slate-200">Premium</span>
              </div>
              <div className="flex justify-between items-center py-2 px-3 bg-slate-50/80 dark:bg-slate-800/60 rounded-lg">
                <span className="text-slate-600 dark:text-slate-400">Last Login</span>
                <span className="font-medium text-slate-800 dark:text-slate-200">Today</span>
              </div>
              <div className="flex justify-between items-center py-2 px-3 bg-slate-50/80 dark:bg-slate-800/60 rounded-lg">
                <span className="text-slate-600 dark:text-slate-400">Profile Completion</span>
                <span className="font-medium text-green-600">100%</span>
              </div>
              <div className="flex justify-between items-center py-2 px-3 bg-slate-50/80 dark:bg-slate-800/60 rounded-lg">
                <span className="text-slate-600 dark:text-slate-400">Security Level</span>
                <span className="font-medium text-blue-600">High</span>
              </div>
            </div>
          </div>
        </MotionFade>
      </div>
    </div>
  );
};

export default ProfilePage;
