import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/images/res-logo.png";
const Sidebar = () => {
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
                to="/admin"
              >
                <i className="icon fas fa-home"></i>
                <span className="text">Dashboard</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active menu-link" : "inactive menu-link"
                }
                to="/products"
              >
                <i className="icon fas fa-shopping-bag"></i>
                <span className="text">Products</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active menu-link" : "inactive menu-link"
                }
                to="/addproduct"
              >
                <i className="icon fas fa-cart-plus"></i>
                <span className="text">Add product</span>
              </NavLink>
            </li>

            <li className="menu-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active menu-link" : "inactive menu-link"
                }
                to="/orders"
              >
                <i className="icon fas fa-bags-shopping"></i>
                <span className="text">Orders</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active menu-link" : "inactive menu-link"
                }
                to="/users"
              >
                <i className="icon fas fa-user"></i>
                <span className="text">Users</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active menu-link " : "inactive menu-link"
                }
                to="/sell"
              >
                <i className="icon fas fa-store-alt"></i>
                <span className="text">Sell</span>
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

export default Sidebar;
