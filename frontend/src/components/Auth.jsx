import React, { useEffect, useState } from "react";
import {
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
  useClerk,
} from "@clerk/clerk-react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import { ToastContainer } from "react-toastify";
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
    <>
      <SignedOut>
        <MotionFade>
          <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
            <DialogTitle>Forgot Password</DialogTitle>
            <DialogContent>
              <Typography>
                Reset instructions will be sent to your email.
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Close</Button>
            </DialogActions>
          </Dialog>
        </MotionFade>
      </SignedOut>

      {/* Steps indicator at top of auth flow */}
      <AuthSteps activeStep={1} />

      <ProfilePage />
      <ToastContainer position="top-center" autoClose={3000} theme="colored" />
    </>
  );
};

export default Auth;
