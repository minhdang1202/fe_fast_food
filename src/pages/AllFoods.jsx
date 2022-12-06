import React, { useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import PaginationComponent from "react-reactstrap-pagination";
import ProductCard from "../components/UI/product-card/ProductCard";
import "../styles/all-foods.css";
import "../styles/pagination.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { listProduct } from "../Redux/Actions/ProductActions";
import Loading from "../components/LoadingError/Loading";
import Message from "../components/LoadingError/Error";

const AllFoods = () => {
  const productPerPage = 12;
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const { loading, error, products, page, total } = useSelector(
    (state) => state.productList
  );
  const [pageNumber, setPageNumber] = useState(page);
  const [sort, setSort] = useState(0);

  useEffect(() => {
    dispatch(listProduct(searchTerm, pageNumber, sort));
  }, [dispatch, pageNumber, sort]);

  const handleSelected = (selected) => {
    setPageNumber(selected);
  };

  const changeSorting = (e) => {
    setSort(e.target.value);
  };

  const onSearchHandle = () => {
    dispatch(listProduct(searchTerm, pageNumber, sort));
  };

  return (
    <Helmet title="All-Foods">
      <CommonSection title="All Foods" />

      <section>
        <Container>
          {loading ? (
            <Loading />
          ) : error ? (
            <Message variant="alert-danger">{error}</Message>
          ) : (
            <>
              <Row>
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
                {products?.length === 0 ? (
                  <Message variant="alert-danger">
                    <h5 className="text-center">
                      Không có món ăn nào được tìm thấy!
                    </h5>
                  </Message>
                ) : (
                  products?.map((item) => (
                    <Col
                      lg="3"
                      md="4"
                      sm="6"
                      xs="6"
                      key={item._id}
                      className="mb-4"
                    >
                      <ProductCard item={item} />
                    </Col>
                  ))
                )}

                <div>
                  {total ? (
                    <PaginationComponent
                      className="float-end mt-4"
                      totalItems={total}
                      pageSize={productPerPage}
                      onSelect={handleSelected}
                      maxPaginationNumbers={4}
                      defaultActivePage={pageNumber}
                    />
                  ) : null}
                </div>
              </Row>
            </>
          )}
        </Container>
      </section>
    </Helmet>
  );
};

export default AllFoods;
