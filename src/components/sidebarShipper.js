import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/images/res-logo.png";
const sidebarShipper = () => {
  return (
    <div>
      <aside className="navbar-aside" id="offcanvas_aside">
        <div className="aside-top">
          <div className="brand-wrap">
            <img
              src={logo}
              style={{ height: "46" }}
              className="logo"
              alt="Ecommerce dashboard template"
            />
            <h6>Fast Food</h6>
          </div>
          <div>
            <button className="btn btn-icon btn-aside-minimize">
              <i className="text-muted fas fa-stream"></i>
            </button>
          </div>
        </div>

        <nav>
          <ul className="menu-aside">
            <li className="menu-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active menu-link" : "inactive menu-link"
                }
                to="/shipper"
              >
                <i className="icon fas fa-home"></i>
                <span className="text">Home Order</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active menu-link" : "inactive menu-link"
                }
                to="/dashboard"
              >
                <i className="icon fas fa-shopping-bag"></i>
                <span className="text">Dashboard</span>
              </NavLink>
            </li>
          </ul>
          <br />
          <br />
        </nav>
      </aside>
    </div>
  );
};

export default sidebarShipper;
