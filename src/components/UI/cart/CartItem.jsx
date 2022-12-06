import React from "react";
import { ListGroupItem } from "reactstrap";

import "../../../styles/cart-item.css";

import { useDispatch } from "react-redux";
import product_05_image_01 from "../../../assets/images/product_04.jpg";

import {
  addToCart,
  deleteItem,
  removeItem,
} from "../../../Redux/Actions/CartActions";

const CartItem = ({ item }) => {
  const { _id, name, price, image, quantity, totalPrice } = item;

  const dispatch = useDispatch();

  const incrementItem = () => {
    dispatch(addToCart({ _id, name, price, image }));
  };

  const decreaseItem = () => {
    dispatch(removeItem({ _id }));
  };

  const deleteItems = () => {
    dispatch(deleteItem({ _id }));
  };

  return (
    <ListGroupItem className="border-0 cart__item">
      <div className="cart__item-info d-flex gap-2">
        <img src={product_05_image_01} alt="product-img" />

        <div className="cart__product-info w-100 d-flex align-items-center gap-4 justify-content-between">
          <div>
            <h6 className="cart__product-title">{name}</h6>
            <p className=" d-flex align-items-center gap-5 cart__product-price">
              {quantity}x <span>{totalPrice}.000</span>
            </p>
            <div className=" d-flex align-items-center justify-content-between increase__decrease-btn">
              <span className="increase__btn" onClick={incrementItem}>
                <i className="ri-add-line"></i>
              </span>
              <span className="quantity">{quantity}</span>
              <span className="decrease__btn" onClick={decreaseItem}>
                <i className="ri-subtract-line"></i>
              </span>
            </div>
          </div>

          <span className="delete__btn" onClick={deleteItems}>
            <i className="ri-close-line"></i>
          </span>
        </div>
      </div>
    </ListGroupItem>
  );
};

export default CartItem;
