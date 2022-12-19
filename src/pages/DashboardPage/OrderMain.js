import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Orders from "../../components/Dashboard/orders/Orders";
import { getAllOrder } from "../../Redux/Actions/OrderActions";
import Loading from "../../components/LoadingError/Loading";
import Message from "../../components/LoadingError/Error";
import PaginationComponent from "react-reactstrap-pagination";
import { useState } from "react";

const OrderMain = () => {
  const dispatch = useDispatch();

  const orderAdminAll = useSelector((state) => state.orderAdminAll);
  const { loading, error, orders, total } = orderAdminAll;
  const [pageNumber, setPageNumber] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [filter, setFilter] = useState(-1);
  const handleSelected = (selected) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    dispatch(getAllOrder(perPage, pageNumber, filter));
  }, [dispatch, perPage, pageNumber, filter]);

  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Orders</h2>
      </div>

      <div className="card mb-4 shadow-sm">
        <header className="card-header bg-white">
          <div className="row gx-3 py-3">
            <div className="col-lg-2 col-6 col-md-3">
              <select
                className="form-select"
                onChange={(e) => setFilter(Number(e.target.value))}
              >
                <option value={-1}>All</option>
                <option value={0}>Đã xác nhận</option>
                <option value={1}>Đang xử lý</option>
                <option value={2}>Đang giao hàng</option>
                <option value={3}>Giao hàng thành công</option>
              </select>
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select
                className="form-select"
                onChange={(e) => setPerPage(Number(e.target.value))}
              >
                <option value="20">Show 20</option>
                <option value="50">Show 50</option>
                <option value="200">Show 200</option>
              </select>
            </div>
          </div>
        </header>

        {error && <Message value="alert-danger">{error}</Message>}

        {loading ? (
          <Loading />
        ) : (
          <div className="card-body">
            <div className="table-responsive orders ">
              <Orders orders={orders} />
            </div>
          </div>
        )}
        <PaginationComponent
          className="float-end mt-4"
          totalItems={total}
          pageSize={perPage}
          onSelect={handleSelected}
          maxPaginationNumbers={4}
          defaultActivePage={pageNumber}
        />
      </div>
    </section>
  );
};

export default OrderMain;
