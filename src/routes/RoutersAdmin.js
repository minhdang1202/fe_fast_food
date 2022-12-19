import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import AdminScreen from "../pages/DashboardPage/AdminScreen";
import MainProducts from "../pages/DashboardPage/MainProducts";
import AddProductMain from "../pages/DashboardPage/AddProductMain";
import MainCategories from "../pages/DashboardPage/MainCategories";
import OrderMain from "../pages/DashboardPage/OrderMain";
import OrderDetailmain from "../pages/DashboardPage/OrderDetailmain";
import UserComponent from "../pages/DashboardPage/UserComponent";
import EditProductMain from "../pages/DashboardPage/EditproductMain";
import Seller from "../pages/DashboardPage/Seller";
import Test from "../pages/Test";
const RoutersAdmin = ({ role }) => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={"/admin"} />} />
      <Route path="/login" element={<Navigate to={"/admin"} />} />

      <Route path="/admin" element={<AdminScreen />} />
      <Route path="/products" element={<MainProducts />} />
      <Route path="/addproduct" element={<AddProductMain />} />
      <Route path="/orders" element={<OrderMain />} />
      <Route path="/order/:id" element={<OrderDetailmain />} />
      <Route path="/users" element={<UserComponent />} />
      <Route path="/sell" element={<Seller />} />
      <Route path="/test" element={<Test />} />
      <Route path="/product/:id/edit" element={<EditProductMain />} />
    </Routes>
  );
};

export default RoutersAdmin;
