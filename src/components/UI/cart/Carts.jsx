import React from "react";
import { useNavigate } from "react-router-dom";
import CartItem from "./CartItem";

import { useDispatch, useSelector } from "react-redux";

import "../../../styles/shopping-cart.css";
import { CLOSE_CART_UI } from "../../../Redux/Constants/CartUiContants";
import toast from "react-hot-toast";

const Carts = () => {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const userLogin = useSelector((state) => state.userLogin);
  const navigate = useNavigate();

  const toggleCart = () => {
    dispatch({ type: CLOSE_CART_UI });
  };

  const checkOutClick = () => {
    toggleCart();
    if (userLogin.userInfo !== undefined) {
      if (cartProducts?.length !== 0) {
        navigate("/checkout");
      } else {
        toast.error("Giỏ hàng đang trống. Hãy mua hàng trước khi thanh toán");
      }
    } else {
      toast.error("Bạn hãy đăng nhập trước khi thanh toán");
    }
  };

  return (
    <div className="cart__container">
      <div className="cart">
        <div className="cart__close">
          <span onClick={toggleCart}>
            <i className="ri-close-fill"></i>
          </span>
        </div>

        <div className="cart__item-list">
          {cartProducts.length === 0 ? (
            <h6 className="text-center mt-5">No item added to the cart</h6>
          ) : (
            cartProducts.map((item, index) => (
              <CartItem item={item} key={index} />
            ))
          )}
        </div>

        <div className="cart__bottom d-flex align-items-center justify-content-between">
          <h6>
            Subtotal : <span>{totalAmount}.000</span>
          </h6>
          <button onClick={checkOutClick}>Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Carts;
