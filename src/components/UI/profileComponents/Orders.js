import moment from "moment/moment";
import React from "react";
import { Link } from "react-router-dom";
import { Col } from "reactstrap";
import "moment/locale/vi";

const Orders = ({ orders }) => {
  return (
    <div className=" d-flex justify-content-center align-items-center flex-column">
      {orders?.length === 0 ? (
        <Col lg="12" className="alert alert-info text-center mt-3">
          No orders
          <Link to="/food">START SHOPPING</Link>
        </Col>
      ) : (
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>STATUS</th>
                <th>DATE</th>
                <th>TOTAL</th>
              </tr>
            </thead>
            <tbody style={{ textAlign: "center" }}>
              {orders.map((order, i) => (
                <tr
                  className={`${
                    order?.isPaid ? "alert-success" : "alert-danger"
                  }`}
                  key={order._id}
                >
                  <td>
                    <Link to={`/order/${order._id}`} className="link">
                      {i + 1}
                    </Link>
                  </td>
                  <td>{order?.isPaid ? "Paid" : "Unpaid"}</td>
                  <td>
                    {order?.isPaid
                      ? moment(order?.paidAt).format("Do MM YYYY")
                      : moment(order?.createdAt).calendar()}
                  </td>
                  <td>{order?.totalAmount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
