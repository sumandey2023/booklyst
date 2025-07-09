import React, { useEffect, useRef } from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

const Auth = () => {
  const signInBtnRef = useRef(null);

  useEffect(() => {
    if (signInBtnRef.current) {
      signInBtnRef.current.click();
    }
  }, []);

  return (
    <div>
      <SignedOut>
        <SignInButton ref={signInBtnRef} />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
};

export default Auth;
