import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";

import { useDispatch, useSelector } from "react-redux";

import "../styles/product-details.css";

import ProductCard from "../components/UI/product-card/ProductCard";
import { ADD_ITEM } from "../Redux/Constants/CartConstants";
import {
  createReviewProduct,
  listProduct,
  productDetail,
} from "../Redux/Actions/ProductActions";
import moment from "moment";
import "moment/locale/vi";

import product_05_image_01 from "../assets/images/product_04.jpg";
import product_05_image_02 from "../assets/images/product_08.jpg";
import product_05_image_03 from "../assets/images/product_09.jpg";
import toast from "react-hot-toast";
import { PRODUCT_CREATE_REVIEW_RESET } from "../Redux/Constants/ProductContants";
import Rating from "../components/products/Rating";
import Message from "../components/LoadingError/Error";
import Loading from "../components/LoadingError/Loading";
const FoodDetails = () => {
  const [tab, setTab] = useState("desc");
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const { id } = useParams();
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetail);
  const { loading, product, success: successDetail } = productDetails;
  const [previewImg, setPreviewImg] = useState(product.image);
  const {
    name,
    price,
    category,
    description,
    image,
    reviews,
    numReview,
    rating: ratingProduct,
  } = product;
  const { products } = useSelector((state) => state.productList);
  const userLogin = useSelector((state) => state.userLogin);
  const productCreateReview = useSelector((state) => state.productCreateReview);
  const {
    loading: loadingCreateReview,
    error,
    success: successCreateReview,
  } = productCreateReview;

  useEffect(() => {
    if (successCreateReview) {
      toast.success("Bạn đã review sản phẩm thành công");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }

    dispatch(productDetail(id));
    dispatch(listProduct());
  }, [dispatch, id, successCreateReview]);

  const relatedProduct = products?.filter(
    (item) => category === item.category && item._id !== id
  );

  const addItem = () => {
    if (userLogin.userInfo !== undefined) {
      dispatch({
        type: ADD_ITEM,
        payload: {
          id,
          name,
          price,
          image,
        },
      });
      if (successDetail) {
        toast.success(`Đã thêm ${name} vào giỏ hàng`);
      }
    } else {
      toast.error("Bạn chưa đăng nhập. Hãy đăng nhập để thêm vào giỏ hàng");
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createReviewProduct(id, {
        rating,
        comment,
        name: userLogin.userInfo.name,
        user: userLogin.userInfo._id,
      })
    );
  };

  useEffect(() => {
    setPreviewImg(product_05_image_01);
  }, [product]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);

  return (
    <Helmet title="Product-details">
      <CommonSection title={name} />

      <section>
        <Container>
          {loading || loadingCreateReview ? (
            <Loading />
          ) : (
            <>
              <Row>
                <Col lg="2" md="2">
                  <div className="product__images ">
                    <div
                      className="img__item mb-3"
                      onClick={() => setPreviewImg(product_05_image_01)}
                    >
                      <img src={product_05_image_01} alt="" className="w-50" />
                    </div>
                    <div
                      className="img__item mb-3"
                      onClick={() => setPreviewImg(product_05_image_02)}
                    >
                      <img src={product_05_image_02} alt="" className="w-50" />
                    </div>

                    <div
                      className="img__item"
                      onClick={() => setPreviewImg(product_05_image_03)}
                    >
                      <img src={product_05_image_03} alt="" className="w-50" />
                    </div>
                  </div>
                </Col>

                <Col lg="4" md="4">
                  <div className="product__main-img">
                    <img src={previewImg} alt="" className="w-100" />
                  </div>
                </Col>

                <Col lg="6" md="6">
                  <div className="single__product-content">
                    <h2 className="product__title mb-3">{name}</h2>
                    <h6 className="product__price">
                      {" "}
                      Price: <span>{price}.000</span>
                    </h6>
                    <h6 className="category mb-3 ">
                      Category: <span>{category}</span>
                    </h6>

                    <div className="flex-box d-flex mb-3 align-items-center">
                      <h6 className="titleReview">Reviews: </h6>
                      <Rating
                        value={ratingProduct}
                        text={`${numReview} reviews`}
                      />
                    </div>

                    <button onClick={addItem} className="addTOCart__btn">
                      Add to Cart
                    </button>
                  </div>
                </Col>

                <Col lg="12">
                  <div className="tabs d-flex align-items-center gap-5 py-3">
                    <h6
                      className={` ${tab === "desc" ? "tab__active" : ""}`}
                      onClick={() => setTab("desc")}
                    >
                      Description
                    </h6>
                    <h6
                      className={` ${tab === "rev" ? "tab__active" : ""}`}
                      onClick={() => setTab("rev")}
                    >
                      Review
                    </h6>
                  </div>

                  {tab === "desc" ? (
                    <div className="tab__content">
                      <p>{description}</p>
                    </div>
                  ) : (
                    <Row className="tab__form mb-3 mt-3">
                      <Col lg={userLogin?.userInfo ? 6 : 12}>
                        <h6 className="mb-3">REVIEWS</h6>
                        {reviews?.length === 0 ? (
                          <Message variant={"alert-info mt-3"}>
                            No Reviews
                          </Message>
                        ) : (
                          reviews?.map((review) => (
                            <div
                              key={review._id}
                              className="mb-5 mb-md-3 bg-light p-3 shadow-sm rounded"
                            >
                              <strong>{review.name}</strong>
                              <Rating value={review.rating} />
                              <span>
                                {moment(review?.createdAt).format(
                                  "Do MM YYYY, h:mm a"
                                )}
                              </span>
                              <div className="alert alert-info mt-3">
                                {review.comment}
                              </div>
                            </div>
                          ))
                        )}
                      </Col>
                      {userLogin?.userInfo && (
                        <Col lg="6">
                          <h6>WRITE A CUSTOMER REVIEW</h6>
                          <div className="my-4"></div>
                          {error ? (
                            <Message variant={"alert-danger"}>{error}</Message>
                          ) : (
                            <form onSubmit={submitHandler}>
                              <div className="my-4">
                                <strong>Rating</strong>
                                <select
                                  className="col-12 bg-light p-3 mt-2 outline-none rounded "
                                  required
                                  onChange={(e) => setRating(e.target.value)}
                                >
                                  <option value="" hidden>
                                    Select...
                                  </option>
                                  <option value="1">1 - Rất tệ</option>
                                  <option value="2">2 - Tệ</option>
                                  <option value="3">3 - Bình thường</option>
                                  <option value="4">4 - Ngon</option>
                                  <option value="5">5 - Rất ngon</option>
                                </select>
                              </div>
                              <div className="my-4">
                                <strong>Comment</strong>
                                <textarea
                                  row="3"
                                  required
                                  onChange={(e) => setComment(e.target.value)}
                                  className="col-12 bg-light p-3 mt-2 outline-none rounded"
                                ></textarea>
                              </div>
                              <div className="my-3">
                                <button
                                  className="col-12 bg-black  p-3 rounded  outline-none text-white"
                                  type="submit"
                                  disabled={loadingCreateReview}
                                >
                                  SUBMIT
                                </button>
                              </div>
                            </form>
                          )}
                        </Col>
                      )}
                    </Row>
                  )}
                </Col>

                <Col lg="12" className="mb-5 mt-4">
                  <h2 className="related__Product-title">
                    You might also like
                  </h2>
                </Col>

                {relatedProduct?.map((item) => (
                  <Col
                    lg="3"
                    md="4"
                    sm="6"
                    xs="6"
                    className="mb-4"
                    key={item._id}
                  >
                    <ProductCard item={item} />
                  </Col>
                ))}
              </Row>
            </>
          )}
        </Container>
      </section>
    </Helmet>
  );
};

export default FoodDetails;
