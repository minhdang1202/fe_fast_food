import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editProduct, productDetail } from "../../Redux/Actions/ProductActions";
import { useState } from "react";
import Loading from "../../components/LoadingError/Loading";
import Message from "../../components/LoadingError/Error";
import { PRODUCT_EDIT_RESET } from "../../Redux/Constants/ProductContants";
import toast from "react-hot-toast";

const EditProductMain = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetail);
  const { loading, error, product } = productDetails;
  const productEdit = useSelector((state) => state.productEdit);
  const { loading: editLoading, error: editError, success } = productEdit;

  const [name, setName] = useState(product?.name);
  const [description, setDescription] = useState(product?.description);
  const [category, setCategory] = useState(product?.category);
  const [price, setPrice] = useState(product?.price);
  const [productId, setProductId] = useState(product?.id);

  useEffect(() => {
    dispatch(productDetail(id));
  }, [dispatch, id]);

  useEffect(() => {
    setName(product?.name);
    setDescription(product?.description);
    setCategory(product?.category);
    setPrice(product?.price);
    setProductId(product?._id);
  }, [product]);

  useEffect(() => {
    if (success) {
      dispatch({ type: PRODUCT_EDIT_RESET });
      toast.success("Product update successfully!");
    }
  }, [success, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      editProduct({ _id: productId, name, description, category, price })
    );
  };

  return (
    <>
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <Link to="/products" className="btn btn-danger text-white">
              Go to products
            </Link>
            <h2 className="content-title">Add product</h2>
            <div>
              <button type="submit" className="btn btn-primary">
                Publish now
              </button>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-lg-12">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  {(error || editError) && (
                    <Message variant="alert-danger"> {{ error }}</Message>
                  )}
                  {(loading || editLoading) && <Loading />}
                  <div className="mb-4">
                    <label htmlFor="product_title" className="form-label">
                      Product name
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      id="product_title"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="d-flex ">
                    <div
                      className="mb-4"
                      style={{ width: "48%", marginRight: "34px" }}
                    >
                      <label htmlFor="product_price" className="form-label ">
                        Price
                      </label>
                      <input
                        type="number"
                        placeholder="Type here"
                        className="form-control"
                        id="product_price"
                        required
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </div>
                    <div className="mb-4" style={{ width: "48%" }}>
                      <label htmlFor="product_price" className="form-label">
                        Category
                      </label>

                      <select
                        className="form-select form-control"
                        id="product_price"
                        required
                        onChange={(e) => setCategory(e.target.value)}
                        value={category}
                      >
                        <option disabled>All category</option>
                        <option value="Pizza">Pizza</option>
                        <option value="Buffer">Buffer</option>
                        <option value="Bread">Bread</option>
                      </select>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Description</label>
                    <textarea
                      placeholder="Type here"
                      className="form-control"
                      rows="7"
                      required
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Images</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Inter Image URL"
                    />
                    <input className="form-control mt-3" type="file" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default EditProductMain;
