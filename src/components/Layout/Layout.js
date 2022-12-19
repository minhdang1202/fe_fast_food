import React from "react";
import io from "socket.io-client";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import Routes from "../../routes/Routers";
import HeaderAdmin from "../Header";
import Carts from "../UI/cart/Carts.jsx";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import Sidebar from "../sidebar";
import SidebarShipper from "../sidebarShipper";
import RoutersAdmin from "../../routes/RoutersAdmin.js";
import RouterShipper from "../../routes/RouterShipper.js";
import HeaderShipper from "../HeaderShipper.js";
import { useEffect } from "react";
import { useState } from "react";
const Layout = () => {
  const showCart = useSelector((state) => state.cartUi.cartIsVisible);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  // const ENDPOINT = "http://localhost:5000";
  // var socket;
  // useEffect(() => {
  //   socket = io(ENDPOINT);
  //   socket.emit("setup", userInfo);
  // }, [userInfo]);

  return (
    <div>
      <Toaster style={{ zIndex: 101 }} />
      <Header role={userInfo?.role} />
      {userInfo && userInfo?.role === 0 && <Sidebar />}
      {/* {userInfo && userInfo?.role === 2 && <SidebarShipper />} */}
      {showCart && <Carts />}
      {userInfo && userInfo?.role === 0 ? (
        <main className="main-wrap">
          <HeaderAdmin />
          <RoutersAdmin role={userInfo?.role} />
        </main>
      ) : userInfo && userInfo?.role === 2 ? (
        <main>
          <HeaderShipper role={userInfo?.role} />
          <RouterShipper />
        </main>
      ) : (
        <div>
          <Routes role={userInfo?.role} />
        </div>
      )}
      <Footer role={userInfo?.role} />
    </div>
  );
};

export default Layout;
