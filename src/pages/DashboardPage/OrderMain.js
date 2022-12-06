import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Orders from "../../components/Dashboard/orders/Orders";
import { getAllOrder } from "../../Redux/Actions/OrderActions";
import Loading from "../../components/LoadingError/Loading";
import Message from "../../components/LoadingError/Error";

const OrderMain = () => {
  const dispatch = useDispatch();

  const orderAdminAll = useSelector((state) => state.orderAdminAll);
  const { loading, error, orders } = orderAdminAll;

  useEffect(() => {
    dispatch(getAllOrder());
  }, [dispatch]);

  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Orders</h2>
      </div>

      <div className="card mb-4 shadow-sm">
        <header className="card-header bg-white">
          <div className="row gx-3 py-3">
            <div className="col-lg-4 col-md-6 me-auto">
              <input
                type="text"
                placeholder="Search..."
                className="form-control p-2"
              />
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select">
                <option>Status</option>
                <option>Active</option>
                <option>Disabled</option>
                <option>Show all</option>
              </select>
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select">
                <option>Show 20</option>
                <option>Show 30</option>
                <option>Show 40</option>
              </select>
            </div>
          </div>
        </header>

        {error && <Message value="alert-danger">{error}</Message>}

        {loading ? (
          <Loading />
        ) : (
          <div className="card-body">
            <div className="table-responsive ">
              <Orders orders={orders} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default OrderMain;
