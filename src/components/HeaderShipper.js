import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../styles/Shipper/header.css";
import { changeFilter } from "../Redux/Actions/ShipperActions";

const HeaderShipper = ({ role }) => {
  const dispatch = useDispatch();
  const { filter } = useSelector((state) => state.filterChange);

  const [unRead0, setUnRead0] = useState(0);
  const [unRead1, setUnRead1] = useState(0);
  const [unRead2, setUnRead2] = useState(0);
  const [unRead3, setUnRead3] = useState(0);
  const [unReadData0, setUnReadData0] = useState([]);
  const [unReadData1, setUnReadData1] = useState([]);
  const [unReadData2, setUnReadData2] = useState([]);
  const [unReadData3, setUnReadData3] = useState([]);

  const handleFilterClick = (filter) => {
    dispatch(changeFilter(filter));
  };

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

  const updateUnreadOrder = async (status) => {
    await updateRead(status);
  };

  const updateRead = async (status) => {
    try {
      if (status === 0) {
      }

      if (status === 1) {
      }

      if (status === 2) {
      }

      if (status === 3) {
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <header className="main-header-shipper navbar justify-content-end">
      <div className="d-flex flex-grow-1 align-items-center rounded-top-xl">
        <div className="d-flex align-items-center justify-content-between flex-wrap container-fluid ">
          <div className="d-none d-xl-block">
            <ul className="menu-nav">
              <li className="menu-item">
                <Link
                  to="/shipper"
                  className="menu-link"
                  onClick={() => handleFilterClick(0)}
                >
                  <span
                    className={`menu menu-recent ${
                      filter === 0 ? "active" : "none"
                    }`}
                  >
                    Đơn gần đây
                  </span>
                </Link>
              </li>
              <li className="menu-item">
                <Link
                  to="/shipper"
                  className="menu-link"
                  onClick={() => {
                    handleFilterClick(1);
                    updateUnreadOrder(1);
                  }}
                >
                  <span
                    className={`menu menu-in-progress ${
                      filter === 1 ? "active" : "none"
                    }`}
                  >
                    Đang xử lý
                  </span>
                </Link>
                {unReadData0.length !== 0 && (
                  <span className="label label-sm label-light-warning label-rounded font-weight-bolder position-absolute top--4 right-0 mt-1 mr-1">
                    {unRead0}
                  </span>
                )}
              </li>
              <li className="menu-item">
                <Link
                  to="/shipper"
                  className="menu-link"
                  onClick={() => {
                    handleFilterClick(2);
                    updateUnreadOrder(2);
                  }}
                >
                  <span
                    className={`menu menu-picked ${
                      filter === 2 ? "active" : "none"
                    }`}
                  >
                    Đã nhận đơn
                  </span>
                </Link>

                {unReadData1.length !== 0 && (
                  <span className="label label-sm label-light-info label-rounded font-weight-bolder position-absolute top--4 right-0 mt-1 mr-1">
                    {unRead1}
                  </span>
                )}
              </li>
              <li className="menu-item">
                <Link
                  to="/shipper"
                  className="menu-link"
                  onClick={() => {
                    handleFilterClick(3);
                    updateUnreadOrder(3);
                  }}
                >
                  <span
                    className={`menu menu-completed ${
                      filter === 3 ? "active" : "none"
                    }`}
                  >
                    Hoàn thành
                  </span>
                </Link>
                {unReadData2.length !== 0 && (
                  <span className="label label-sm label-light-success label-rounded font-weight-bolder position-absolute top--4 right-0 mt-1 mr-1">
                    {unRead2}
                  </span>
                )}
              </li>
              <li className="menu-item">
                <Link
                  to="/shipper"
                  className="menu-link"
                  onClick={() => {
                    handleFilterClick(4);
                    updateUnreadOrder(4);
                  }}
                >
                  <span
                    className={`menu menu-canceled ${
                      filter === 4 ? "active" : "none"
                    }`}
                  >
                    Đơn hủy
                  </span>
                </Link>
                {unReadData3.length !== 0 && (
                  <span className="label label-sm label-light-danger label-rounded font-weight-bolder position-absolute top--4 right-0 mt-1 mr-1">
                    {unRead3}
                  </span>
                )}
              </li>
            </ul>
          </div>

          <div className="d-flex align-items-center d-block d-xl-none d-lg-block py-3 py-lg-2">
            <Link
              to="/shipper"
              className="btn btn-icon btn-light h-40px w-40px mr-3"
              onClick={() => handleFilterClick("0")}
            >
              <i className="fad fa-sync-alt"></i>
            </Link>
            <Link
              to="/shipper"
              className="btn btn-icon btn-light h-40px w-40px mr-3"
              onClick={() => handleFilterClick("0")}
            >
              <i className="fad fa-spinner-third menu-in-progress"></i>
            </Link>
            <Link
              to="/shipper"
              className="btn btn-icon btn-light h-40px w-40px mr-3"
              onClick={() => handleFilterClick(1)}
            >
              <i className="fad fa-user-check text-primary-2"></i>
            </Link>
            <Link
              to="/shipper"
              className="btn btn-icon btn-light h-40px w-40px mr-3"
              onClick={() => handleFilterClick(2)}
            >
              <i className="fad fa-box-check menu-completed"></i>
            </Link>
            <Link
              to="/shipper"
              className="btn btn-icon btn-light h-40px w-40px mr-3"
              onClick={() => handleFilterClick(3)}
            >
              <i className="fas fa-times-circle text-danger-2 "></i>
            </Link>
          </div>

          <div className="d-flex align-items-center py-3 py-lg-2">
            <Link
              to="/post-order"
              className="btn btn-icon btn-light h-40px w-40px"
            >
              <i className="fad fa-file-alt pallette-purple"></i>
            </Link>
          </div>
        </div>
      </div>
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
            <Link className="dropdown-toggle" data-bs-toggle="dropdown" to="#">
              <img
                className="img-xs rounded-circle"
                src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                alt="User"
              />
            </Link>
            <div className="dropdown-menu dropdown-menu-end">
              <Link className="dropdown-item" to="/">
                My profile
              </Link>
              <Link className="dropdown-item" to="#">
                Settings
              </Link>
              <Link className="dropdown-item text-danger" to="#">
                Exit
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default HeaderShipper;
