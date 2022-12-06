import React from "react";
import OrderDetailProducts from "../../components/Dashboard/orders/OrderDetailProducts";
import OrderDetailInfo from "../../components/Dashboard/orders/OrderDetailInfo";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  changeStatusOrder,
  deliveredOrder,
  findOrder,
} from "../../Redux/Actions/OrderActions";
import { chooseShipper } from "../../Redux/Actions/ShipperActions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/LoadingError/Loading";
import Message from "../../components/LoadingError/Error";
import moment from "moment";
import "moment/locale/vi";

const OrderDetailmain = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const order = useSelector((state) => state.order);
  const { loading, error, orders } = order;
  const orderDelivered = useSelector((state) => state.orderDelivered);
  const { loading: loadingDelivered, success } = orderDelivered;
  const orderPaid = useSelector((state) => state.orderPaid);
  const orderChangeStatus = useSelector((state) => state.orderChangeStatus);
  const { loading: paidLoading, success: paidSuccess } = orderPaid;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const { success: statusSuccess } = orderChangeStatus;
  const shipperChoose = useSelector((state) => state.shipperChoose);
  const { success: shipperSuccess, loading: shipperLoading } = shipperChoose;
  useEffect(() => {
    dispatch(findOrder(id));
  }, [id, dispatch, success, paidSuccess, statusSuccess, shipperSuccess]);

  const deliveredHandle = () => {
    dispatch(deliveredOrder(id));
  };

  const onChangeOption = (e) => {
    dispatch(changeStatusOrder(id, e.target.value));
  };

  const receiveHandle = () => {
    dispatch(chooseShipper(id));
  };

  return (
    <section className="content-main">
      {userInfo?.role === 0 && (
        <div className="content-header">
          <Link to="/orders" className="btn btn-dark text-white">
            Back To Orders
          </Link>
        </div>
      )}

      {error && <Message value="alert-danger">{error}</Message>}

      {loading || shipperLoading ? (
        <Loading />
      ) : (
        <div className="card">
          <header className="card-header p-3 Header-green">
            <div className="row align-items-center ">
              <div className="col-lg-6 col-md-6">
                <span>
                  <i className="far fa-calendar-alt mx-2"></i>
                  <b className="text-white">
                    {moment(orders?.createdAt).format(
                      "dddd, Do MMMM YYYY, h:mm a"
                    )}
                  </b>
                </span>
                <br />
                <small className="text-white mx-3 ">
                  Order ID: {orders._id}
                </small>
              </div>
              {userInfo?.role === 0 && (
                <div className="col-lg-6 col-md-6 ms-auto d-flex justify-content-end align-items-center">
                  <select
                    className="form-select d-inline-block"
                    style={{ maxWidth: "200px" }}
                    onChange={onChangeOption}
                    defaultValue={orders?.status}
                  >
                    <option value={-1} selected disabled hidden>
                      Change status
                    </option>
                    <option value={0} disabled={orders.status === 3}>
                      Confirmed
                    </option>
                    <option value={1} disabled={orders.status === 3}>
                      Processing
                    </option>
                    <option value={2} disabled={orders.status === 3}>
                      Shipping
                    </option>
                    <option value={3} hidden>
                      Delivered
                    </option>
                  </select>
                  <Link className="btn btn-success ms-2" to="#">
                    <i className="fas fa-print"></i>
                  </Link>
                </div>
              )}
            </div>
          </header>
          <div className="card-body">
            {/* Order info */}
            <OrderDetailInfo orders={orders} />

            <div className="row">
              <div className="col-lg-9">
                <div className="table-responsive">
                  <OrderDetailProducts orders={orders} loading={paidLoading} />
                </div>
              </div>
              {/* Payment Info */}
              <div className="col-lg-3">
                <div className="box shadow-sm bg-light">
                  {orders?.isDelivered ? (
                    <button className="btn btn-dark col-12">
                      ĐÃ GIAO LÚC{" "}
                      {moment(orders?.deliveredAt).format(
                        "dddd, Do MMMM YYYY, h:mm a"
                      )}
                    </button>
                  ) : (
                    <>
                      {loadingDelivered && <Loading />}
                      <button
                        className="btn btn-dark col-12"
                        onClick={deliveredHandle}
                      >
                        XÁC NHẬN GIAO
                      </button>
                    </>
                  )}
                </div>
                {userInfo.role === 2 && (
                  <div className="box shadow-sm bg-light mt-4">
                    {orders?.shipper ? (
                      <button className="btn btn-dark col-12">
                        TÔI ĐÃ NHẬN ĐƠN
                      </button>
                    ) : (
                      <>
                        <button
                          className="btn btn-dark col-12"
                          onClick={receiveHandle}
                        >
                          NHẬN ĐƠN
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default OrderDetailmain;
