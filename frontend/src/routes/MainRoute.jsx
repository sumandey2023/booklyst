import React from "react";
import { Routes, Route } from "react-router-dom";
import AccountSetup from "../components/AccountSetup";
import SetupForm from "../components/SetupForm";
import Auth from "../components/Auth";

const MainRoute = () => {
  return (
    <Routes>
      <Route path="/AccountSetup" element={<AccountSetup />} />
      <Route path="/AccountSetup/form" element={<SetupForm />} />
      <Route path="/" />
      <Route path="/auth" element={<Auth />} />
    </Routes>
  );
};

export default MainRoute;
