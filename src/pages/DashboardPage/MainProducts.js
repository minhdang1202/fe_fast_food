import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Col } from "reactstrap";
import { listProduct } from "../../Redux/Actions/ProductActions";
import Product from "../../components/products/Product";
import Message from "../../components/LoadingError/Error";
import Loading from "../../components/LoadingError/Loading";
import PaginationComponent from "react-reactstrap-pagination";

const MainProducts = () => {
  const { loading, error, products, total, page } = useSelector(
    (state) => state.productList
  );
  const [pageNumber, setPageNumber] = useState(page);

  const productDelete = useSelector((state) => state.productDelete);
  const {
    error: errorDelete,
    success: successDelete,
    loading: loadingDelete,
  } = productDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProduct("", pageNumber));
  }, [dispatch, pageNumber, successDelete]);

  const handleSelected = (selected) => {
    setPageNumber(selected);
  };

  return (
    <section className="content-main">
      {loading || loadingDelete ? (
        <Loading />
      ) : (
        <>
          <div className="content-header">
            <h2 className="content-title">Products</h2>
            <div>
              <Link to="/addproduct" className="btn btn-primary">
                Create new
              </Link>
            </div>
          </div>
          {(error || errorDelete) && (
            <Col lg="12">
              <Message variant="alert-danger">{error || errorDelete}</Message>
            </Col>
          )}
          <div className="card mb-4 shadow-sm">
            <header className="card-header bg-white ">
              <div className="row gx-3 py-3">
                <div className="col-lg-4 col-md-6 me-auto ">
                  <input
                    type="search"
                    placeholder="Search..."
                    className="form-control p-2"
                  />
                </div>
                <div className="col-lg-2 col-6 col-md-3">
                  <select className="form-select">
                    <option>All category</option>
                    <option>Pizza</option>
                    <option>Buffer</option>
                    <option>Bread</option>
                  </select>
                </div>
                <div className="col-lg-2 col-6 col-md-3">
                  <select className="form-select">
                    <option>Latest added</option>
                    <option>Cheap first</option>
                    <option>Most viewed</option>
                  </select>
                </div>
              </div>
            </header>

            <div className="card-body">
              <div className="row">
                {/* Products */}
                {products?.map((product) => (
                  <Product product={product} key={product._id} />
                ))}
              </div>

              <PaginationComponent
                className="float-end mt-4"
                totalItems={total}
                pageSize={12}
                onSelect={handleSelected}
                maxPaginationNumbers={4}
                defaultActivePage={pageNumber}
              />
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default MainProducts;
