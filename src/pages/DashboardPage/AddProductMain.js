import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Message from "../../components/LoadingError/Error";
import Loading from "../../components/LoadingError/Loading";
import { createProduct } from "../../Redux/Actions/ProductActions";
import { PRODUCT_CREATE_RESET } from "../../Redux/Constants/ProductContants";

const AddProductMain = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Pizza");
  const [price, setPrice] = useState(0);
  const [listIngredient, setListIngredient] = useState([]);
  const dispatch = useDispatch();
  const productCreate = useSelector((state) => state.productCreate);
  const { loading, error, success } = productCreate;
  const [ing, setIng] = useState("");
  const [mass, setMass] = useState(0);
  const [txtList, setTxtList] = useState("");
  useEffect(() => {
    if (success) {
      toast.success("New product created successfully!");
      dispatch({ type: PRODUCT_CREATE_RESET });
      setName("");
      setDescription("");
      setCategory("Pizza");
      setPrice(0);
    }
  }, [dispatch, success]);

  const submitHandler = (e) => {
    const newProduct = {
      name,
      description,
      category,
      price,
    };
    e.preventDefault();
    dispatch(createProduct(newProduct));
  };

  const addIngredient = () => {
    setListIngredient([...listIngredient, `${ing}:${mass}`]);
    setTxtList(txtList + " ; " + `${ing}:${mass}`);
    setIng("");
    setMass(0);
  };
  console.log(txtList);
  return (
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
                {error && (
                  <Message variant="alert-danger"> {{ error }}</Message>
                )}
                {loading && <Loading />}
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
                <div className="d-flex">
                  <div
                    className="mb-4"
                    style={{ width: "48%", marginRight: "34px" }}
                  >
                    <label className="form-label">Ingredient</label>
                    <input
                      className="form-control"
                      type="text"
                      value={ing}
                      onChange={(e) => setIng(e.target.value)}
                    />
                  </div>
                  <div className="mb-4" style={{ width: "48%" }}>
                    <label className="form-label">Mass</label>
                    <input
                      className="form-control"
                      type="number"
                      value={mass}
                      onChange={(e) => setMass(e.target.value)}
                    />
                  </div>
                </div>
                <div className="d-flex">
                  <div
                    className="mb-4"
                    style={{ width: "70%", marginRight: "34px" }}
                  >
                    <label className="form-label">List Ingredient</label>
                    <input
                      className="form-control"
                      type="text"
                      value={txtList}
                      readOnly
                    />
                  </div>
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ width: "28%" }}
                  >
                    <button
                      className="btn btn-primary"
                      style={{ height: "35px" }}
                      onClick={addIngredient}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

export default AddProductMain;
