import React, { useRef, useEffect, useState } from "react";

import { Container } from "reactstrap";
import logo from "../../assets/images/res-logo.png";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import "../../styles/header.css";
import { OPEN_CART_UI } from "../../Redux/Constants/CartUiContants";
import { logout } from "../../Redux/Actions/UserActions";
import toast from "react-hot-toast";

const nav__links = [
  {
    display: "Home",
    path: "/home",
  },
  {
    display: "Foods",
    path: "/foods",
  },
  {
    display: "Cart",
    path: "/cart",
  },
  {
    display: "Contact",
    path: "/contact",
  },
];

const Header = ({ role }) => {
  const menuRef = useRef(null);
  const headerRef = useRef(null);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const dispatch = useDispatch();

  const [toggleUser, setToggleUser] = useState(false);
  const toggleMenu = () => menuRef.current.classList.toggle("show__menu");

  const toggleCart = () => {
    dispatch({ type: OPEN_CART_UI });
  };

  const userLogout = () => {
    setToggleUser(false);
    dispatch(logout());
    toast.success("Tài khoản của bạn đã được đăng xuất khỏi thiết bị");
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("header__shrink");
      } else {
        headerRef.current.classList.remove("header__shrink");
      }
    });

    return () => window.removeEventListener("scroll", null);
  }, []);

  return (
    <header
      className="header"
      ref={headerRef}
      style={{ display: (role === 0 || role === 2) && "none" }}
    >
      <Container>
        <div className="nav__wrapper d-flex align-items-center justify-content-between">
          <div className="logo">
            <img src={logo} alt="logo" />
            <h5>Fast Food</h5>
          </div>

          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <div className="menu d-flex align-items-center gap-5">
              {nav__links.map((item, index) => (
                <NavLink
                  to={item.path}
                  key={index}
                  className={(navClass) =>
                    navClass.isActive ? "active__menu" : ""
                  }
                >
                  {item.display}
                </NavLink>
              ))}
            </div>
          </div>

          {/* ======== nav right icons ========= */}
          <div className="nav__right d-flex align-items-center gap-4">
            <span className="cart__icon" onClick={toggleCart}>
              <i className="ri-shopping-basket-line"></i>
              <span className="cart__badge">{totalQuantity}</span>
            </span>

            <div className="user">
              <button onClick={() => setToggleUser(!toggleUser)}>
                <i className="ri-user-line"></i>
              </button>
              {toggleUser &&
                (role ? (
                  <ul className="dropdown_menu">
                    <li>
                      <Link to="/profile" onClick={() => setToggleUser(false)}>
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/order-tracking"
                        onClick={() => setToggleUser(false)}
                      >
                        Tracking
                      </Link>
                    </li>
                    <li>
                      <Link to="/" onClick={userLogout}>
                        Log out
                      </Link>
                    </li>
                  </ul>
                ) : (
                  <ul className="dropdown_menu">
                    <li>
                      <Link to="/login" onClick={() => setToggleUser(false)}>
                        Log In
                      </Link>
                    </li>
                    <li>
                      <Link to="/register" onClick={() => setToggleUser(false)}>
                        Sign Up
                      </Link>
                    </li>
                  </ul>
                ))}
            </div>

            <span className="mobile__menu" onClick={toggleMenu}>
              <i className="ri-menu-line"></i>
            </span>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
