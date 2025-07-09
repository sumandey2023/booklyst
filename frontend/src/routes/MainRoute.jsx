import React from "react";
import { Routes, Route } from "react-router-dom";
import Auth from "../components/Auth";

const MainRoute = () => {
  return (
    <Routes>
      <Route path="/" />
      <Route path="/" />
      <Route path="/" />
      <Route path="/auth" element={<Auth />} />
    </Routes>
  );
};

export default MainRoute;
