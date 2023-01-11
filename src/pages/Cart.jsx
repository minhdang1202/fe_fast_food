import React from "react";

import CommonSection from "../components/UI/common-section/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import "../styles/cart-page.css";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import product_05_image_01 from "../assets/images/product_04.jpg";
import { deleteItem } from "../Redux/Actions/CartActions";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const history = useNavigate();

  const onToCheckout = () => {
    history("/checkout");
  };

  return (
    <Helmet title="Cart">
      <CommonSection title="Your Cart" />
      <section>
        <Container>
          <Row>
            <Col lg="12">
              {cartItems.length === 0 ? (
                <h5 className="text-center">Your cart is empty</h5>
              ) : (
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Product Name</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <Tr item={item} key={item._id} />
                    ))}
                  </tbody>
                </table>
              )}

              <div className="mt-4">
                <h6>
                  Subtotal:
                  <span className="cart__Subtotal">{totalAmount}.000</span>
                </h6>
                <p>Taxes and shipping will calculate at checkout</p>
                <div className="cart__page-btn">
                  <button className="addTOCart__btn me-4">
                    <Link to="/foods">Continue Shopping</Link>
                  </button>
                  <button
                    type="button"
                    className="addTOCart__btn "
                    onClick={onToCheckout}
                    disabled={totalAmount === 0 ? true : false}
                  >
                    Proceed to checkout
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

const Tr = (props) => {
  const { _id, name, price, quantity, image } = props.item;
  const dispatch = useDispatch();

  const deleteItems = () => {
    dispatch(deleteItem({ _id }));
  };
  return (
    <tr>
      <td className="text-center cart__img-box">
        <img src={image} alt="" />
      </td>
      <td className="text-center">{name}</td>
      <td className="text-center">{price}.000</td>
      <td className="text-center">{quantity}</td>
      <td className="text-center cart__item-del">
        <i className="ri-delete-bin-line" onClick={deleteItems}></i>
      </td>
    </tr>
  );
};

export default Cart;
