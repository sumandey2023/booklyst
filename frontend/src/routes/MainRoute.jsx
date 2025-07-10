import React from "react";
import { Routes, Route } from "react-router-dom";
import AccountSetup from "../components/AccountSetup";
import SetupForm from "../components/SetupForm";
import Auth from "../components/Auth";
import LiveView from "../components/liveview";

const MainRoute = () => {
  return (
    <Routes>
      <Route path="/accountsetup" element={<AccountSetup />} />
      <Route path="/accountsetup/form" element={<SetupForm />} />
      <Route path="/" />
      <Route path="/auth" element={<Auth />} />
      <Route path="/accountsetup/form/liveview" element={<LiveView />} />
    </Routes>
  );
};

export default MainRoute;
