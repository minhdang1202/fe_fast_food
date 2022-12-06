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
const MainPage = () => {
  const [titleStatus, setTitleStatus] = useState("gần đây");

  const [sortByRange, setSortByRange] = useState("1");
  const [subTitleStatus, setSubTitleStatus] = useState("trong ngày");
  const [sortOrder, setSortOrder] = useState([]);
  const filterChange = useSelector((state) => state.filterChange);
  const { filter } = filterChange;
  const dispatch = useDispatch();
  const orderFilter = useSelector((state) => state.orderFilter);
  const { orders, loading } = orderFilter;

  useEffect(() => {
    if (filter === 0) setTitleStatus("gần đây");
    if (filter === 1) setTitleStatus("đang xử lý");
    if (filter === 2) setTitleStatus("đã nhận");
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
                <Orders orders={orders} />
              ) : (
                // <InfiniteScroll
                //     dataLength={items.length}
                //     next={fetchMoreData}
                //     hasMore={hasMore}
                //     loader={items.length !== 0 && sortStatus.length > 5 && <SkeletonCard />}
                //     endMessage={
                //         items.length !== 0 && (
                //             <p style={{ textAlign: 'center' }}>
                //                 <span className="font-weight-bold">Yay! Hết cái để xem {subTitleStatus} rồi !</span>
                //             </p>
                //         )
                //     }
                // >
                //     {items.map((data, index) => (
                //         <>
                //             <article
                //                 className="order"
                //                 key={index}
                //                 onClick={() => {
                //                     setDataModal(data);
                //                     fetchDataShipper(data.id_post);
                //                     setShow(true);
                //                 }}
                //             >
                //                 <div className="d-flex align-items-start">
                //                     <span className="bullet bullet-bar bg-orange align-self-stretch" />
                //                     <div className="d-flex flex-column flex-grow-1 ml-4">
                //                         <header className="card-title content">
                //                             <span>#{data.id_post}</span>
                //                             <span className="flex-shrink-0">
                //                                 {dateToFromNowDaily(data.thoi_gian)}

                //                             </span>
                //                         </header>
                //                         <section className="card-info content">
                //                             <div className="mb-3">
                //                                 <div className="mb-3">
                //                                     <span className="font-weight-bold">{data.ten_nguoi_nhan}</span> -{' '}
                //                                     <span className="font-weight-bold">{data.sdt_nguoi_nhan}</span>
                //                                 </div>
                //                                 <div className="mb-1">
                //                                     Chi phí giao hàng:{' '}
                //                                     <span className="font-weight-bold text-primary-2">{data.phi_giao}</span>
                //                                 </div>
                //                                 <div className="mb-1">
                //                                     Tạm ứng: <span className="font-weight-bold text-chartjs">{data.phi_ung}</span>
                //                                 </div>
                //                             </div>
                //                             <span className="delivery">Giao hàng tới</span>
                //                             <div className="d-flex align-items-center justify-content-between">
                //                                 <address className="mb-0 pl-0">{data.noi_giao}</address>
                //                                 {data.status === '0' && <InProcessing />}
                //                                 {data.status === '1' && <Picked />}
                //                                 {data.status === '2' && <Completed />}
                //                                 {data.status === '3' && <Cancelled />}
                //                             </div>
                //                         </section>
                //                     </div>
                //                 </div>
                //                 <div className="separator separator-dashed my-5" />
                //             </article>
                //         </>
                //     ))}
                // </InfiniteScroll>
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
