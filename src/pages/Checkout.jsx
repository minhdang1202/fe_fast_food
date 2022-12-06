import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import CommonSection from "../components/UI/common-section/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import toast from "react-hot-toast";
import "../styles/checkout.css";
import {
  savePaymentMethod,
  saveShippingAddress,
} from "../Redux/Actions/CartActions";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const dispatch = useDispatch();
  const shippingAddress = useSelector((state) => state.cart.shippingAddress);

  const [enterName, setEnterName] = useState(shippingAddress.name);
  const [enterNumber, setEnterNumber] = useState(shippingAddress.phone);
  const [enterWard, setEnterWard] = useState(shippingAddress.ward);
  const [enterAddress, setEnterAddress] = useState(shippingAddress.address);
  const [enterDistrict, setEnterDistrict] = useState(shippingAddress.district);
  const [enterCity, setEnterCity] = useState(shippingAddress.city);
  const [paymentMethod, setPaymentMethod] = useState("");

  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const shippingCost = 30;

  const totalAmount = cartTotalAmount + Number(shippingCost);

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    const userShippingAddress = {
      name: enterName,
      phone: enterNumber,
      city: enterCity,
      district: enterDistrict,
      ward: enterWard,
      address: enterAddress,
    };

    dispatch(saveShippingAddress(userShippingAddress));
    if (paymentMethod !== "") {
      dispatch(savePaymentMethod(paymentMethod));

      navigate("/placeorder");
    } else {
      toast.error("Please choose a payment method");
    }
  };

  return (
    <Helmet title="Checkout">
      <CommonSection title="Checkout" />
      <section>
        <Container>
          <Row>
            <Col lg="8" md="6">
              <h6 className="mb-4">Shipping Address</h6>
              <form className="checkout__form" onSubmit={submitHandler}>
                <div className="form__group">
                  <input
                    type="text"
                    placeholder="Enter your name"
                    required
                    value={enterName}
                    onChange={(e) => setEnterName(e.target.value)}
                  />
                </div>
                <div className="form__group">
                  <input
                    type="number"
                    value={enterNumber}
                    placeholder="Enter your phone number"
                    required
                    onChange={(e) => setEnterNumber(e.target.value)}
                  />
                </div>

                <div className="form__group">
                  <input
                    type="text"
                    placeholder="City"
                    value={enterCity}
                    required
                    onChange={(e) => setEnterCity(e.target.value)}
                  />
                </div>
                <div className="form__group">
                  <input
                    type="text"
                    value={enterDistrict}
                    placeholder="District"
                    required
                    onChange={(e) => setEnterDistrict(e.target.value)}
                  />
                </div>
                <div className="form__group">
                  <input
                    type="text"
                    value={enterWard}
                    placeholder="Ward"
                    required
                    onChange={(e) => setEnterWard(e.target.value)}
                  />
                </div>
                <div className="form__group">
                  <input
                    type="text"
                    value={enterAddress}
                    placeholder="Address"
                    required
                    onChange={(e) => setEnterAddress(e.target.value)}
                  />
                </div>

                <button type="submit" className="addTOCart__btn">
                  Payment
                </button>
              </form>
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
              <div className="checkout__payment">
                <h5 className="title">PAYMENT METHODS</h5>
                <form className="checkout__method">
                  <input
                    type="radio"
                    id="cash"
                    value="Payment in Cash"
                    name="checkout_method"
                    onChange={(e) => {
                      setPaymentMethod(e.target.value);
                    }}
                  />
                  <label htmlFor="cash">
                    <h6>Payment in Cash</h6>
                  </label>
                  <br />
                  <input
                    type="radio"
                    id="paypal"
                    value="Payment in Paypal"
                    name="checkout_method"
                    onChange={(e) => {
                      setPaymentMethod(e.target.value);
                    }}
                  />
                  <label htmlFor="paypal">
                    <h6>Payment in Paypal</h6>
                  </label>
                </form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Checkout;
