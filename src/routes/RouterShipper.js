import React from "react";

import { Routes, Route, Navigate } from "react-router-dom";
import OrderDetailmain from "../pages/DashboardPage/OrderDetailmain";

import MainPage from "../pages/ShipperPage/MainPage";
import ProfilePage from "../pages/ShipperPage/ProfilePage";
const RouterShipper = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={"/shipper"} />} />
      <Route path="/login" element={<Navigate to={"/shipper"} />} />

      <Route path="/shipper" element={<MainPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/order/:id" element={<OrderDetailmain />} />
    </Routes>
  );
};

export default RouterShipper;
