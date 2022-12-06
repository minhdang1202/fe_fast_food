import React, { useState } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../LoadingError/Loading";
import { Progress } from "reactstrap";
import { updateProfile } from "../../Redux/Actions/UserActions";
import { useNavigate } from "react-router-dom";
const EditProfile = ({ setShowInfo }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, loading } = userLogin;
  const fileInput = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileChange = () => {};

  const [name, setName] = useState(userInfo?.name);
  const [phone, setPhone] = useState(userInfo?.phone || "");
  const [address, setAddress] = useState("Nam Định");

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(updateProfile({ name, phone }));
    navigate("/profile");
  };

  const changeName = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };
  const changePhone = (e) => {
    e.preventDefault();
    setPhone(e.target.value);
  };
  const changeAddress = (e) => {
    e.preventDefault();
    setAddress(e.target.value);
  };

  return (
    <form
      className="core d-flex flex-column flex-row-fluid container px-3"
      onSubmit={onSubmitHandler}
    >
      <div className="card border-0 py-2">
        <header className="card-header py-4 d-flex align-items-center justify-content-between">
          <div className="card-label">
            <span className="d-block title">Sửa thông tin cá nhân</span>
            <span className="d-block text-time mt-2 font-size-sm ">
              Cập nhật thông tin cá nhân của bạn
            </span>
          </div>

          <div className="card-toolbar">
            <button type="submit" className="btn-chartjs btn  mr-2">
              Lưu thay đổi
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
                  alt="avatar"
                />
                <div className="image-input-wrapper" />
                <label
                  className="btn btn-xs btn-icon btn-white btn-hover-text-primary btn-shadow rounded-circle"
                  data-action="change"
                  data-toggle="tooltip"
                  data-original-title="Change avatar"
                >
                  <i className="fa fa-pen " />
                  <input
                    type="file"
                    name="profile_avatar"
                    accept=".png, .jpg, .jpeg"
                    ref={fileInput}
                    onChange={(e) => fileChange(e.target.files)}
                  />
                </label>
                <div className="progressBar">
                  <Progress
                    animated
                    striped
                    variant="success"
                    // now={uploadProgress}
                    style={{ width: "120px", height: "4px" }}
                  />
                  <span className="text-muted" style={{ fontSize: "0.75rem" }}>
                    Định dạng cho phép: png, jpg, jpeg.
                  </span>
                </div>
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
                  defaultValue={name}
                  onChange={changeName}
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
                  defaultValue={phone}
                  onChange={changePhone}
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
                  defaultValue={address}
                  onChange={changeAddress}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </form>
  );
};

export default EditProfile;
