import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import Message from "../components/LoadingError/Error";
import Loading from "../components/LoadingError/Loading";
import CommonSection from "../components/UI/common-section/CommonSection";
import { findOrder } from "../Redux/Actions/OrderActions";
import "../styles/order.css";
import { Tr } from "./PlaceOrderScreen";
import moment from "moment";
import "moment/locale/vi";

const Order = () => {
  const dispatch = useDispatch();
  const order = useSelector((state) => state.order);
  const { id } = useParams();

  const { loading, error, orders: orderDetail } = order;

  const [user, setUser] = useState({});
  const [shippingAddress, setShippingAddress] = useState({});
  const [orderItems, setOrderItems] = useState([]);
  const [shippingCost, setShippingCost] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [cartTotalAmount, setCartTotalAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");

  useEffect(() => {
    dispatch(findOrder(id));
  }, [id, dispatch]);

  useEffect(() => {
    setUser(orderDetail?.user);
    setShippingCost(orderDetail?.shippingPrice);
    setShippingAddress(orderDetail?.shippingAddress);
    setTotalAmount(orderDetail?.totalAmount);
    setOrderItems(orderDetail?.orderItems);
    setCartTotalAmount(orderDetail?.cartTotalAmount);
    setPaymentMethod(orderDetail?.paymentMethod);
  }, [orderDetail]);

  return (
    <Helmet title="Place_Order">
      <CommonSection title="Order Tracking" />
      {loading ? (
        <Loading />
      ) : (
        <section>
          <Container>
            <Row>
              <Col lg="12" className="d-flex info">
                <div className="d-flex justify-content-center align-items-center w-33">
                  <div className="col-md-4 center">
                    <div className="alert-success order-box">
                      <i
                        className="fas fa-user"
                        style={{ fontSize: "30px" }}
                      ></i>
                    </div>
                  </div>
                  <div className="col-md-8 center">
                    <h5>
                      <strong>Customer</strong>
                    </h5>
                    <p>{user?.name}</p>
                    <p>{user?.email}</p>
                  </div>
                </div>

                <div className="d-flex justify-content-center align-items-center w-33">
                  <div className="col-md-4 center">
                    <div className="alert-success order-box ">
                      <i
                        className="fas fa-truck-moving"
                        style={{ fontSize: "30px" }}
                      ></i>
                    </div>
                  </div>
                  <div className="col-md-8 center">
                    <h5>
                      <strong>Order info</strong>
                    </h5>
                    <p>ID: {orderDetail?._id}</p>
                    <p>Pay method: {paymentMethod}</p>

                    {orderDetail?.isPaid ? (
                      <div className="bg-info p-2 paid">
                        <p className="text-white text-center text-sm-start">
                          Paid on {moment(orderDetail?.paidAt).calendar()}
                        </p>
                      </div>
                    ) : (
                      <div className="bg-danger p-2 paid">
                        <p className="text-white text-center text-sm-start">
                          Unpaid
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                <div
                  className="d-flex justify-content-center align-items-center w-33"
                  style={{ position: "relative" }}
                >
                  <div className="col-md-4 center">
                    <div className="alert-success order-box">
                      <i
                        className="fas fa-map-marker-alt"
                        style={{ fontSize: "30px" }}
                      ></i>
                    </div>
                  </div>
                  <div className="col-md-8 center">
                    <p>Shipping: {shippingAddress?.address}</p>
                    <h5 style={{ position: "absolute", top: 0 }}>
                      <strong>Deliver to</strong>
                    </h5>
                    <p>
                      Address:{" "}
                      {shippingAddress?.address +
                        ", " +
                        shippingAddress?.ward +
                        ", " +
                        shippingAddress?.district +
                        ", " +
                        shippingAddress?.city}
                    </p>
                    {orderDetail?.isDelivered ? (
                      <div className="bg-info p-2 deliver">
                        <p className="text-black text-center text-sm-start">
                          Delivered
                        </p>
                      </div>
                    ) : (
                      <div className="bg-danger p-2 deliver">
                        <p className="text-white text-center text-sm-start">
                          Not Delivered
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </Col>
            </Row>
            <Row style={{ marginTop: "60px" }}>
              <div className="card-body">
                <div className="steps d-flex flex-wrap flex-sm-nowrap justify-content-between padding-top-2x padding-bottom-1x">
                  <div
                    className={
                      orderDetail.status >= 0 ? "step completed" : "step"
                    }
                  >
                    <div className="step-icon-wrap">
                      <div className="step-icon">
                        <i className="far fa-shopping-cart"></i>
                      </div>
                    </div>
                    <h4 className="step-title">Confirmed</h4>
                  </div>
                  <div
                    className={
                      orderDetail.status >= 1 ? "step completed" : "step"
                    }
                  >
                    <div className="step-icon-wrap">
                      <div className="step-icon">
                        <i className="fas fa-cog"></i>
                      </div>
                    </div>
                    <h4 className="step-title">Processing</h4>
                  </div>
                  <div
                    className={
                      orderDetail.status >= 2 ? "step completed" : "step"
                    }
                  >
                    <div className="step-icon-wrap">
                      <div className="step-icon">
                        <i className="far fa-shipping-fast"></i>
                      </div>
                    </div>
                    <h4 className="step-title">Shipping</h4>
                  </div>
                  <div
                    className={orderDetail.isPaid ? "step completed" : "step"}
                  >
                    <div className="step-icon-wrap">
                      <div className="step-icon">
                        <i className="fas fa-envelope-open-dollar"></i>
                      </div>
                    </div>
                    <h4 className="step-title">Pay</h4>
                  </div>
                  <div
                    className={
                      orderDetail.status === 3 ? "step completed" : "step"
                    }
                  >
                    <div className="step-icon-wrap">
                      <div className="step-icon">
                        <i className="far fa-home"></i>
                      </div>
                    </div>
                    <h4 className="step-title">Delivered</h4>
                  </div>
                </div>
              </div>
            </Row>
            <Row style={{ marginTop: "35px" }}>
              <Col lg="8" md="6">
                {orderItems?.length === 0 ? (
                  <Message variant="alert-info mt-5">
                    <h5 className="text-center">Your cart is empty</h5>
                  </Message>
                ) : (
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderItems?.map((item) => (
                        <Tr item={item} key={item._id} />
                      ))}
                    </tbody>
                  </table>
                )}
              </Col>
              <Col
                lg="4"
                md="6"
                className="d-flex flex-column justify-content-around"
              >
                <div className="checkout__bill">
                  <h6 className="d-flex align-items-center justify-content-between mb-3">
                    Subtotal: <span>{cartTotalAmount}.000</span>
                  </h6>
                  <h6 className="d-flex align-items-center justify-content-between mb-3">
                    Shipping: <span>{shippingCost}.000</span>
                  </h6>
                  <div className="checkout__total">
                    <h5 className="d-flex align-items-center justify-content-between">
                      Total: <span>{totalAmount}.000</span>
                    </h5>
                  </div>
                </div>
              </Col>

              {error && (
                <Col lg="12">
                  <Message variant="alert-danger">{error}</Message>
                </Col>
              )}
            </Row>
          </Container>
        </section>
      )}
    </Helmet>
  );
};

export default Order;
