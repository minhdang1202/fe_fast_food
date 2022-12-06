import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "../LoadingError/Loading";
function InfoProfile({ setShowInfo }) {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, loading } = userLogin;

  const [imageUrl, setImageUrl] = useState("");

  return (
    <>
      <form className="core d-flex flex-column flex-row-fluid container px-3">
        <div className="card border-0 py-2">
          <header className="card-header py-4 d-flex align-items-center justify-content-between">
            <div className="card-label">
              <span className="d-block title">Thông tin cá nhân</span>

              <span className="d-block text-time mt-2 font-size-sm ">
                Cập nhật thông tin cá nhân của bạn
              </span>
            </div>
            {/* <div className="card-title align-items-start flex-column">
              <h3 className="card-label">Thông tin cá nhân</h3>
              <span className="text-muted font-size-sm mt-1">
                Cập nhật thông tin cá nhân của bạn
              </span>
            </div> */}
            <div className="card-toolbar">
              <button
                onClick={() => setShowInfo(false)}
                className="btn-chartjs btn  mr-2"
              >
                Chỉnh sửa
              </button>
            </div>
          </header>

          {loading ? (
            <Loading />
          ) : (
            <div className="card-body">
              <div className="form-group row mb-5">
                <label className="col-xl-3 col-lg-4 col-form-label">
                  Ảnh đại diện
                </label>
                <div
                  className="col-xl-9 col-lg-8"
                  style={{ position: "relative" }}
                >
                  <img
                    className="image-input image-input-outline img-md rounded-circle"
                    id="profile_avatar"
                    src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                  />
                  <div className="image-input-wrapper" />
                </div>
              </div>
              <div className="form-group row mb-4">
                <label
                  htmlFor="email"
                  className="col-xl-3 col-lg-4 col-form-label"
                >
                  Email
                </label>
                <div className="col-xl-9 col-lg-8">
                  <input
                    className="form-control form-control-solid"
                    type="email"
                    id="email"
                    placeholder="(trống)"
                    value={userInfo?.email}
                    readOnly
                  />
                </div>
              </div>
              <div className="form-group row mb-4">
                <label
                  htmlFor="fullname"
                  className="col-xl-3 col-lg-4 col-form-label"
                >
                  Họ và tên
                </label>
                <div className="col-xl-9 col-lg-8">
                  <input
                    className="form-control form-control-solid"
                    type="text"
                    id="fullname"
                    placeholder="(trống)"
                    value={userInfo?.name}
                    readOnly
                  />
                </div>
              </div>
              <div className="form-group row mb-4">
                <label
                  htmlFor="phone"
                  className="col-xl-3 col-lg-4 col-form-label"
                >
                  Số điện thoại
                </label>
                <div className="col-xl-9 col-lg-8">
                  <input
                    className="form-control form-control-solid"
                    type="text"
                    id="phone"
                    placeholder="(trống)"
                    value={userInfo?.phone}
                    readOnly
                  />
                </div>
              </div>
              <div className="form-group row ">
                <label
                  htmlFor="address"
                  className="col-xl-3 col-lg-4 col-form-label"
                >
                  Địa chỉ
                </label>
                <div className="col-xl-9 col-lg-8">
                  <input
                    className="form-control form-control-solid"
                    type="text"
                    id="address"
                    placeholder="(trống)"
                    value="Nam Định"
                    readOnly
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </form>
    </>
  );
}

export default InfoProfile;
