import React from "react";

import "../../../styles/product-card.css";

import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../Redux/Actions/CartActions";
import product_05_image_01 from "../../../assets/images/product_04.jpg";
import toast from "react-hot-toast";

const ProductCard = (props) => {
  const { _id, name, price } = props.item;
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const addItemToCart = () => {
    if (userLogin.userInfo !== undefined) {
      dispatch(addToCart(props.item));
      toast.success(`Đã thêm ${name} vào giỏ hàng`);
    } else {
      toast.error("Bạn chưa đăng nhập. Hãy đăng nhập để thêm vào giỏ hàng");
    }
  };

  return (
    <div className="product__item">
      <div className="product__img">
        <img src={product_05_image_01} alt="product-img" className="w-50" />
      </div>

      <div className="product__content">
        <h5 style={{ minHeight: "50px" }}>
          <Link to={`/foods/${_id}`}>{name}</Link>
        </h5>
        <div className=" d-flex align-items-center justify-content-between ">
          <span className="product__price">{price}.000</span>
          <button className="addTOCart__btn" onClick={addItemToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
