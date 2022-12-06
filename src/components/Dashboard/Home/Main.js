import React from "react";
import TopTotal from "./TopTotal";
import LatestOrder from "./LatestOrder";
import SaleStatistics from "./SalesStatistics";
import ProductsStatistics from "./ProductsStatistics";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../LoadingError/Loading";
import { useEffect } from "react";
import { getAllOrder } from "../../../Redux/Actions/OrderActions";
import Message from "../../LoadingError/Error";
// import { io } from "socket.io-client";
const Main = () => {
  const orderAdminAll = useSelector((state) => state.orderAdminAll);
  const { orders, loading, error } = orderAdminAll;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrder());
  }, [dispatch]);

  // const ENDPOINT = "http://localhost:5000";
  // var socket = io(ENDPOINT);
  // useEffect(() => {
  //   socket.on("newOrder", (data) => {
  //     console.log(data);
  //   });
  // });

  return (
    <>
      {error && <Message value="alert-danger">{error}</Message>}
      {loading ? (
        <Loading />
      ) : (
        <section className="content-main">
          <div className="content-header">
            <h2 className="content-title"> Dashboard </h2>
          </div>
          {/* Top Total */}
          <TopTotal orders={orders} />

          <div className="row">
            <SaleStatistics />
            <ProductsStatistics />
          </div>

          {/* LATEST ORDER */}
          <div className="card mb-4 shadow-sm">
            <LatestOrder orders={orders} />
          </div>
        </section>
      )}{" "}
    </>
  );
};

export default Main;
