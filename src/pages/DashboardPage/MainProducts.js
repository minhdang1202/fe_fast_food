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
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState(0);

  const productDelete = useSelector((state) => state.productDelete);
  const {
    error: errorDelete,
    success: successDelete,
    loading: loadingDelete,
  } = productDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProduct(searchTerm, pageNumber, sort));
  }, [dispatch, pageNumber, successDelete, sort]);

  const handleSelected = (selected) => {
    setPageNumber(selected);
  };

  const onSearchHandle = () => {
    dispatch(listProduct(searchTerm, pageNumber, sort));
  };

  const changeSorting = (e) => {
    setSort(e.target.value);
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
                {/* <div className="col-lg-4 col-md-6 me-auto ">
                  <input
                    type="search"
                    placeholder="Search..."
                    className="form-control p-2"
                  />
                </div> */}
                <Col lg="6" md="6" sm="6" xs="12">
                  <form
                    className="search__widget d-flex align-items-center justify-content-between "
                    onSubmit={onSearchHandle}
                  >
                    <input
                      type="text"
                      placeholder="I'm looking for...."
                      value={searchTerm}
                      style={{ width: "95%" }}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="btn_search" type="submit">
                      <i className="ri-search-line"></i>
                    </button>
                  </form>
                </Col>
                <Col lg="6" md="6" sm="6" xs="12" className="mb-5">
                  <div className="sorting__widget text-end">
                    <select
                      className="w-50 outline-none"
                      onChange={changeSorting}
                      value={sort}
                    >
                      <option value={0} hidden>
                        Default
                      </option>
                      <option value={1}>Alphabetically, A-Z</option>
                      <option value={2}>Alphabetically, Z-A</option>
                      <option value={3}>High Price</option>
                      <option value={4}>Low Price</option>
                    </select>
                  </div>
                </Col>
              </div>
            </header>

            <div className="card-body">
              <div className="row">
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
