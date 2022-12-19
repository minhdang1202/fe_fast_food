import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Col, Row } from "reactstrap";
import Orders from "../../components/Dashboard/orders/Orders";
import RightSide from "../../components/Profile/RightSide";
import { filterOrder } from "../../Redux/Actions/OrderActions";
import "../../styles/Shipper/main.css";
import Loading from "../../components/LoadingError/Loading";
import PaginationComponent from "react-reactstrap-pagination";
const MainPage = () => {
  const [titleStatus, setTitleStatus] = useState("gần đây");

  const [sortByRange, setSortByRange] = useState("1");
  const [subTitleStatus, setSubTitleStatus] = useState("trong ngày");
  const [sortOrder, setSortOrder] = useState([]);
  const filterChange = useSelector((state) => state.filterChange);
  const { filter } = filterChange;
  const dispatch = useDispatch();
  const orderFilter = useSelector((state) => state.orderFilter);
  const { orders, loading, total } = orderFilter;

  const [pageNumber, setPageNumber] = useState(1);
  const handleSelected = (selected) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    if (filter === 0) setTitleStatus("gần đây");
    if (filter === 1) setTitleStatus("đang xử lý");
    if (filter === 2) setTitleStatus("đang giao");
    if (filter === 3) setTitleStatus("hoàn thành");
    if (filter === 4) setTitleStatus("bị hủy");
  }, [filter]);

  useEffect(() => {
    if (sortByRange === "1") setSubTitleStatus("trong ngày");
    if (sortByRange === "7") setSubTitleStatus("trong tuần");
    if (sortByRange === "30") setSubTitleStatus("trong tháng");
  }, [sortByRange]);

  useEffect(() => {
    dispatch(filterOrder(sortByRange, filter));
  }, [dispatch, sortByRange, filter]);

  return (
    <section
      className="content-main font-lexend"
      style={{ height: "calc(100vh - 97px)" }}
    >
      <Row style={{ height: "100%" }}>
        <Col
          lg="9"
          className="d-flex flex-column flex-row-fluid container col-main"
        >
          <header className="card-header border-0 d-flex align-items-center justify-content-between">
            <div className="card-title py-4">
              <div className="card-label">
                <span className="d-block title">
                  Danh sách đơn {titleStatus}
                  <span className="label label-sm label-light label-rounded font-weight-bolder ml-2">
                    {orders?.length}
                  </span>
                </span>

                <span className="d-block text-time mt-2 font-size-sm ">
                  {subTitleStatus}
                </span>
              </div>
            </div>
            <div className="card-toolbar">
              <ul className="nav nav-pills">
                <li className="nav-item">
                  <button
                    className={`nav-link btn py-2 px-4 ${
                      sortByRange === "30" ? "active" : "btn-outline-secondary"
                    }`}
                    onClick={() => setSortByRange("30")}
                  >
                    <span className="nav-text">Tháng</span>
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link btn py-2 px-4 ${
                      sortByRange === "7" ? "active" : "btn-outline-secondary"
                    }`}
                    onClick={() => setSortByRange("7")}
                  >
                    <span className="nav-text">Tuần</span>
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link btn py-2 px-4 
                    ${sortByRange === "1" ? "active" : "btn-outline-secondary"}
                    `}
                    onClick={() => setSortByRange("1")}
                  >
                    <span className="nav-text">Ngày</span>
                  </button>
                </li>
              </ul>
            </div>
          </header>
          {loading ? (
            <Loading />
          ) : (
            <section className="card-body pt-1 newsfeed">
              {orders?.length !== 0 ? (
                <>
                  <Orders orders={orders} />
                  <PaginationComponent
                    className="float-end mt-4"
                    totalItems={total}
                    pageSize={20}
                    onSelect={handleSelected}
                    maxPaginationNumbers={4}
                    defaultActivePage={pageNumber}
                  />
                </>
              ) : (
                <article className="empty-order">
                  <span
                    className="text menu-in-progress"
                    style={{ fontSize: "13px" }}
                  >
                    Bạn không có đơn nào {titleStatus} {subTitleStatus} !
                  </span>
                </article>
              )}
            </section>
          )}
        </Col>
        <Col lg="3">
          <RightSide />
        </Col>
      </Row>
    </section>
  );
};

export default MainPage;
