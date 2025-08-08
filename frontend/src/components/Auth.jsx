import React, { useEffect, useState } from "react";
import {
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
  useClerk,
} from "@clerk/clerk-react";
import { Button, Typography } from "@mui/material";
// Toasts are provided globally in App
import useAuthStore from "../store/useAuthStore";
import ProfilePage from "../pages/ProfilePage";
import Cookies from "js-cookie";
import useUserStore from "../store/useUserStore";
import { useNavigate } from "react-router-dom";
import AuthSteps from "./auth/AuthSteps";
import MotionFade from "./motion/MotionFade";

const Auth = () => {
  const [open, setOpen] = useState(false);
  const { user } = useUser();
  const { openSignIn } = useClerk();
  const { clerk_auth, SignOut, checkCookie, token, getCookieFromBackend } =
    useAuthStore();
  const { fetchUserData, userData, clearUserData } = useUserStore();
  const navigate = useNavigate();

  // 🔥 Auto-open Clerk sign-in modal if user is not logged in
  useEffect(() => {
    if (!user) {
      openSignIn({ redirectUrl: "/auth" });
    }
  }, [user, openSignIn]);

  // ✅ Function called after login
  const afterLogin = async () => {
    if (!user) return;

    const payload = {
      name: user.fullName,
      email: user.primaryEmailAddress?.emailAddress,
      clerkId: user.id,
    };

    // Authenticate with backend and obtain token (cookie + token in store)
    await clerk_auth(payload);

    // Ensure we have the latest token from store (or localStorage)
    const authToken =
      (typeof useAuthStore.getState === "function"
        ? useAuthStore.getState().token
        : token) || localStorage.getItem("token");

    try {
      // Fetch user details with Authorization header
      const details = await fetchUserData(authToken);

      const accountType = details?.accountType;
      if (!accountType) {
        navigate("/rolelogin");
      }
      // If accountType exists, remain on current page
    } catch (err) {
      // On error fetching user details, redirect to role selection as fallback
      navigate("/rolelogin");
    }
  };

  // ✅ Function called after logout
  const afterLogout = () => {
    console.log("❌ User logged out");
    SignOut();
    clearUserData(); // Clear user data on logout
  };

  // 🔄 Detect login/logout changes
  const [prevUserId, setPrevUserId] = useState(null);
  useEffect(() => {
    if (user && user.id !== prevUserId) {
      afterLogin();
      setPrevUserId(user.id);
    } else if (!user && prevUserId !== null) {
      afterLogout();
      setPrevUserId(null);
    }
  }, [user]);

  const handleClose = () => setOpen(false);

  // 🔐 Log userData when it changes

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-200 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 px-4 py-8">
      {/* Steps indicator at top of auth flow */}
      <div className="max-w-3xl mx-auto mb-6">
        <AuthSteps activeStep={user ? 1 : 0} />
      </div>

      {/* Signed out view */}
      <SignedOut>
        <div className="max-w-3xl mx-auto">
          <MotionFade>
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 shadow-2xl p-8 md:p-12 text-center">
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-2">
                Welcome to Booklyst
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Sign in to continue and personalize your experience.
              </p>
              <div className="flex flex-col items-center gap-4">
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => openSignIn({ redirectUrl: "/auth" })}
                  sx={{
                    borderRadius: 2,
                    px: 4,
                    py: 1.5,
                    textTransform: "none",
                    fontWeight: 700,
                  }}
                >
                  Sign In with Clerk
                </Button>
                <span className="text-xs text-slate-500">
                  By continuing, you agree to our Terms and Privacy Policy.
                </span>
              </div>
            </div>
          </MotionFade>
        </div>
      </SignedOut>

      {/* Signed in view */}
      <SignedIn>
        <ProfilePage />
      </SignedIn>
    </div>
  );
};

export default Auth;
