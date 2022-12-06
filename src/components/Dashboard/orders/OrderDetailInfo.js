import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../../Redux/Actions/UserActions";

const OrderDetailInfo = ({ orders }) => {
  const usersAll = useSelector((state) => state.usersAll);
  const { users } = usersAll;
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  useEffect(() => {
    if (userInfo.role === 0) dispatch(getAllUsers());
  }, [dispatch, userInfo]);

  return (
    <div className="row mb-5 order-info-wrap">
      <div className="col-md-6 col-lg-4">
        <article className="icontext align-items-start">
          <span className="icon icon-sm rounded-circle alert-success">
            <i className="text-success fas fa-user"></i>
          </span>
          <div className="text">
            <h6 className="mb-1">Customer</h6>
            <p className="mb-1">
              Order By : {orders?.user?.name} <br />
              Receiver : {orders?.shippingAddress?.name} <br />
              <a href={`mailto:${orders?.user?.email}`}>
                {orders?.user?.email}
              </a>
            </p>
          </div>
        </article>
      </div>
      <div className="col-md-6 col-lg-4">
        <article className="icontext align-items-start">
          <span className="icon icon-sm rounded-circle alert-success">
            <i className="text-success fas fa-truck-moving"></i>
          </span>
          <div className="text">
            <h6 className="mb-1">Order info</h6>
            {userInfo.role === 0 && (
              <p className="mb-1">
                Shipping by:
                <select
                  className="form-select d-inline-block"
                  style={{
                    marginLeft: "10px",
                    width: "62%",
                  }}
                  value={orders?.shipper?._id || -1}
                >
                  <option value={-1} selected disabled hidden>
                    Change shipper
                  </option>
                  {users
                    ?.filter((user) => user?.role === 2)
                    .map((user) => (
                      <option
                        key={user._id}
                        value={user._id}
                        disabled={orders?.status !== 2}
                      >
                        {user.name}
                      </option>
                    ))}
                </select>
              </p>
            )}
            Pay method: {orders?.paymentMethod}
          </div>
        </article>
      </div>
      <div className="col-md-6 col-lg-4">
        <article className="icontext align-items-start">
          <span className="icon icon-sm rounded-circle alert-success">
            <i className="text-success fas fa-map-marker-alt"></i>
          </span>
          <div className="text">
            <h6 className="mb-1">Deliver to</h6>
            <p className="mb-1">
              Address: {orders?.shippingAddress?.city}
              <br />
              {orders?.shippingAddress?.district}
              <br /> {orders?.shippingAddress?.address},{" "}
              {orders?.shippingAddress?.ward}
            </p>
          </div>
        </article>
      </div>
    </div>
  );
};

export default OrderDetailInfo;
