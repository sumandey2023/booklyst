import React from "react";
import { Routes, Route } from "react-router-dom";
import AccountSetup from "../components/AccountSetup";
import SetupForm from "../components/SetupForm";
import Auth from "../components/Auth";
import LiveView from "../components/liveview";
import TimeScheduleForm from "../components/TimeScheduleForm";
import Home from "../pages/Home";
import Service from "../pages/Service";
import ServiceAdmin from "../pages/admin/serviceadmin";

const MainRoute = () => {
  return (
    <Routes>
      <Route path="/accountsetup" element={<AccountSetup />} />
      <Route path="/accountsetup/form" element={<SetupForm />} />
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/accountsetup/form/liveview" element={<LiveView />} />
      <Route path="/service" element={<Service />} />
      <Route path="/serviceadmin" element={<ServiceAdmin />} />

      <Route
        path="/accountsetup/form/schedule"
        element={<TimeScheduleForm />}
      />
    </Routes>
  );
};

export default MainRoute;
