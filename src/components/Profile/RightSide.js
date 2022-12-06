import React from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../Redux/Actions/UserActions";

const LeftSide = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userLogout = () => {
    dispatch(logout());
    navigate("/");
    toast.success("Tài khoản của bạn đã được đăng xuất khỏi thiết bị");
  };
  return (
    <section
      className="card card-custom bgi-no-repeat gutter-b"
      style={{
        backgroundPosition: "right top",
        backgroundSize: "30% auto",
      }}
    >
      <div className="card-body pt-15">
        <div className="text-center mb-10">
          <div className="symbol symbol-60 symbol-circle symbol-xl-90">
            <img
              className="img-md rounded-circle"
              src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
              alt="User"
            />
            <i className="symbol-badge symbol-badge-bottom bg-success" />
          </div>

          <div className="text-muted mb-2">{userInfo?.name}</div>
          <span className="label label-light-warning label-inline font-weight-bold label-lg">
            Hoạt động
          </span>
          <div className="mt-3">
            <Link
              to="/profile"
              className="btn btn-hover-light-primary font-weight-bold mb-2 text-center btn-block"
            >
              <i className="fad fa-user-circle mr-2" />
              Xem hồ sơ
            </Link>
            <Link
              to="/changepw"
              className="btn btn-hover-light-primary font-weight-bold mb-2 text-center btn-block"
            >
              <i className="fad fa-lock-alt mr-2" />
              Thay đổi mật khẩu
            </Link>
            <button
              onClick={userLogout}
              className="btn btn-hover-light-primary font-weight-bold mb-2 text-center btn-block"
            >
              <i className="fad fa-sign-out mr-1" />
              Đăng xuất
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeftSide;
