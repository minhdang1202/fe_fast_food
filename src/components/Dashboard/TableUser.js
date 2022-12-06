import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeRoleUser, getAllUsers } from "../../Redux/Actions/UserActions";
import Loading from "../LoadingError/Loading";

const TableUser = ({ users }) => {
  const dispatch = useDispatch();

  const handleChangeRole = (id) => {
    dispatch(changeRoleUser(id));
  };

  return (
    <>
      <table className="table ">
        <thead>
          <tr className="">
            <th scope="col" style={{ width: "100px" }}>
              Tên
            </th>
            <th scope="col">Email</th>
            <th scope="col">Cấp bậc</th>
            <th scope="col">Địa chỉ</th>
            <th scope="col">Tình trạng</th>
            <th scope="col" style={{ width: "100px" }}>
              Chức năng
            </th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user?._id} className="users">
              <td>
                <b>{user?.name}</b>
              </td>
              <td>{user?.email}</td>
              <td>{user?.role === 1 ? "Khách hàng" : "Nhân viên"}</td>
              <td>{user?.address?.ward}</td>
              <td>Đang hoạt động</td>
              <td className="d-flex justify-content-center align-item-center">
                <button
                  className={`nav-link btn py-2`}
                  onClick={() => handleChangeRole(user?._id)}
                >
                  <span className="nav-text">Sửa</span>
                </button>
                <button className={`nav-link btn py-2`}>
                  <span className="nav-text">Xem</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TableUser;
