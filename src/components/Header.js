import React, { useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import $ from "jquery";
import { logout } from "../Redux/Actions/UserActions";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

const Header = () => {
  useEffect(() => {
    $("[data-trigger]").on("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      var offcanvas_id = $(this).attr("data-trigger");
      $(offcanvas_id).toggleClass("show");
    });

    $(".btn-aside-minimize").on("click", function () {
      if (window.innerWidth < 768) {
        $("body").removeClass("aside-mini");
        $(".navbar-aside").removeClass("show");
      } else {
        // minimize sidebar on desktop
        $("body").toggleClass("aside-mini");
      }
    });
  }, []);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogout = () => {
    dispatch(logout());
    navigate("/");
    toast.success("Tài khoản của bạn đã được đăng xuất khỏi thiết bị");
  };

  return (
    <header className="main-header navbar justify-content-end">
      <div className="col-nav">
        <button
          className="btn-icon btn-mobile me-auto"
          data-trigger="#offcanvas_aside"
        >
          <i className="md-28 fas fa-bars"></i>
        </button>
        <ul className="nav">
          <li className="nav-item">
            <Link className="nav-link btn-icon" to="#">
              <i className="fas fa-bell"></i>
            </Link>
          </li>

          <li className="dropdown nav-item">
            <button
              className="dropdown-toggle"
              data-bs-toggle="dropdown"
              onClick={userLogout}
            >
              <img
                className="img-xs rounded-circle"
                src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                alt="User"
              />
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
