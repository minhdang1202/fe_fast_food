import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import "moment/locale/vi";

const LatestOrder = ({ orders }) => {
  return (
    <div className="card-body">
      <h5 className="card-title">Latest orders</h5>
      <div className="table-responsive">
        <table className="table">
          <tbody>
            {orders?.slice(0, 5).map((order) => (
              <tr key={order._id}>
                <td>
                  <b>{order._id}</b>
                </td>
                <td>{order.shippingAddress.name}</td>
                <td>{order.totalAmount}</td>
                <td>
                  <span className="badge rounded-pill alert-success">
                    {!order.isPaid
                      ? "Not Paid"
                      : `Paid At ${moment(order?.paidAt).format("Do MM YYYY")}`}
                  </span>
                </td>
                <td>{moment(order?.createdAt).format("Do MM YYYY, h:mm a")}</td>
                <td>
                  {order?.isDelivered ? (
                    <span className="badge btn-success">Delivered</span>
                  ) : (
                    <span className="badge btn-dark">Not delivered</span>
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
      </div>
    </div>
  );
};

export default LatestOrder;
