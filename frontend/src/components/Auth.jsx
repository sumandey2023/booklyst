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
} from "@mui/material";
import { ToastContainer } from "react-toastify";
import useAuthStore from "../store/useAuthStore";
import ProfilePage from "../pages/ProfilePage";

const Auth = () => {
  const [open, setOpen] = useState(false);
  const { user } = useUser();
  const { openSignIn } = useClerk();
  const { clerk_auth, SignOut } = useAuthStore();

  // 🔥 Auto-open Clerk sign-in modal if user is not logged in
  useEffect(() => {
    if (!user) {
      openSignIn({ redirectUrl: "/auth" });
    }
  }, [user, openSignIn]);

  // ✅ Function called after login
  const afterLogin = () => {
    console.log("hi");
    if (!user) return;

    const payload = {
      name: user.fullName,
      email: user.primaryEmailAddress?.emailAddress,
      clerkId: user.id,
    };
    console.log("hi");
    clerk_auth(payload); // Send user data to store function
  };

  // ✅ Function called after logout
  const afterLogout = () => {
    console.log("❌ User logged out");
    SignOut();
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

  return (
    <>
      <SignedOut>
        <Dialog open={open} onClose={handleClose}>
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
      </SignedOut>

      {/* <SignedIn>
        <UserButton />
      </SignedIn> */}
      <ProfilePage />
      <ToastContainer position="top-center" autoClose={3000} theme="colored" />
    </>
  );
};

export default Auth;
