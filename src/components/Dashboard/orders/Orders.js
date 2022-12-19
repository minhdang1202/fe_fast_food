import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import "moment/locale/vi";
const Orders = ({ orders }) => {
  return (
    <table className="table ">
      <thead>
        <tr className="title-table">
          <th scope="col">ID</th>
          <th scope="col">Receiver</th>
          <th scope="col">Total</th>
          <th scope="col">Paid</th>
          <th scope="col">Date</th>
          <th>Status</th>
          <th scope="col" className="text-end">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {orders?.map((order) => (
          <tr key={order._id}>
            <td>
              <b>{order._id}</b>
            </td>
            <td>{order.shippingAddress.name}</td>
            <td>{order.totalAmount}</td>
            <td>
              <span
                className="badge rounded-pill alert-success"
                style={{ textTransform: "capitalize" }}
              >
                {!order.isPaid
                  ? "Not Paid"
                  : `Paid At ${moment(order?.paidAt).format(
                      "dddd, DD MMMM YYYY, h:mm:ss a"
                    )}`}
              </span>
            </td>
            <td style={{ textTransform: "capitalize" }}>
              {moment(order?.createdAt).format("Do MM YYYY, h:mm a")}
            </td>
            <td>
              {order?.isDelivered ? (
                <span className="badge btn-success">Giao hàng thành công</span>
              ) : (
                <span className="badge btn-dark">
                  {order?.status === 0
                    ? "Đã xác nhận"
                    : order?.status === 1
                    ? "Đang xử lý"
                    : order?.status === 2
                    ? "Đang giao hàng"
                    : "Chưa xác nhận"}
                </span>
              )}
            </td>
            <td className="d-flex justify-content-end align-item-center">
              <Link to={`/order/${order._id}`} className="text-success">
                <i className="fas fa-eye"></i>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Orders;
