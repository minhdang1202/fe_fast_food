import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import "../styles/place-order.css";
import product_05_image_01 from "../assets/images/product_04.jpg";
import Message from "../components/LoadingError/Error";
import { ORDER_CREATE_RESET } from "../Redux/Constants/OrderConstants";
import { createOrder } from "../Redux/Actions/OrderActions";

const PlaceOrderScreen = () => {
  const cart = useSelector((state) => state.cart);
  const {
    cartItems,
    totalAmount: cartTotalAmount,
    shippingAddress,
    paymentMethod,
  } = cart;
  const shippingCost = 30;
  const totalAmount = cartTotalAmount + Number(shippingCost);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const orderCreate = useSelector((state) => state.orderCreate);

  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, navigate, success, order]);

  const placeOrderHandler = (e) => {
    e.preventDefault();
    dispatch(
      createOrder({
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        cartTotalAmount,
        shippingPrice: shippingCost,
        totalAmount,
      })
    );
  };

  return (
    <Helmet title="Place_Order">
      <CommonSection title="Place Order" />
      <section>
        <Container>
          <Row>
            <Col lg="12" className="d-flex info">
              <div className="d-flex justify-content-center align-items-center w-33">
                <div className="col-md-4 center">
                  <div className="alert-success order-box">
                    <i className="fas fa-user" style={{ fontSize: "30px" }}></i>
                  </div>
                </div>
                <div className="col-md-8 center">
                  <h5>
                    <strong>Customer</strong>
                  </h5>
                  <p>{userInfo?.name}</p>
                  <p>{userInfo?.email}</p>
                </div>
              </div>

              <div className="d-flex justify-content-center align-items-center w-33">
                <div className="col-md-4 center">
                  <div className="alert-success order-box">
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
                  <p>Shipping: {shippingAddress.address}</p>
                  <p>Pay method: {paymentMethod}</p>
                </div>
              </div>
              <div className="d-flex justify-content-center align-items-center w-33">
                <div className="col-md-4 center">
                  <div className="alert-success order-box">
                    <i
                      className="fas fa-map-marker-alt"
                      style={{ fontSize: "30px" }}
                    ></i>
                  </div>
                </div>
                <div className="col-md-8 center">
                  <h5>
                    <strong>Deliver to</strong>
                  </h5>
                  <p>
                    Address:{" "}
                    {shippingAddress.address +
                      ", " +
                      shippingAddress.ward +
                      ", " +
                      shippingAddress.district +
                      ", " +
                      shippingAddress.city}
                  </p>
                </div>
              </div>
            </Col>
          </Row>
          <Row style={{ marginTop: "35px" }}>
            <Col lg="8" md="6">
              {cartItems.length === 0 ? (
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
                    {cartItems.map((item) => (
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
              {cartItems.length !== 0 && (
                <button className="btn_confirm" onClick={placeOrderHandler}>
                  <h6>Confirm</h6>
                </button>
              )}
            </Col>

            {error && (
              <Col lg="12">
                <Message variant="alert-danger">{error}</Message>
              </Col>
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export const Tr = (props) => {
  const { name, price, quantity,image } = props.item;
  return (
    <tr>
      <td className="text-center cart__img-box">
        <img src={image} alt="abs" />
      </td>
      <td className="text-center">{name}</td>
      <td className="text-center">{price}.000</td>
      <td className="text-center">{quantity}</td>
    </tr>
  );
};

export default PlaceOrderScreen;
