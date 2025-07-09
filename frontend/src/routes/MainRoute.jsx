import React from "react";
import { Routes, Route } from "react-router-dom";
import AccountSetup from "../components/AccountSetup";
import SetupForm from "../components/SetupForm";

const MainRoute = () => {
  return (
    <Routes>
      <Route path="/AccountSetup" element={<AccountSetup />} />
      <Route path="/AccountSetup/form" element={<SetupForm />} />
      <Route path="/" />
      <Route path="/" />
    </Routes>
  );
};

export default MainRoute;
