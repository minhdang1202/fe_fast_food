import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { paidOrder } from "../../../Redux/Actions/OrderActions";
import Loading from "../../LoadingError/Loading";
const OrderDetailProducts = ({ orders, loading }) => {
  const config = {
    style: "currency",
    currency: "VND",
  };

  const dispatch = useDispatch();

  const paidHandle = () => {
    dispatch(paidOrder(orders?._id));
  };

  // useEffect(() => {})

  return (
    <table className="table border table-lg">
      <thead>
        <tr>
          <th style={{ width: "40%" }}>Product</th>
          <th style={{ width: "20%" }}>Unit Price</th>
          <th style={{ width: "20%" }}>Quantity</th>
          <th style={{ width: "20%" }} className="text-end">
            Total
          </th>
        </tr>
      </thead>
      <tbody>
        {orders?.orderItems?.map((orderItem) => (
          <tr key={orderItem._id}>
            <td>
              <div className="itemside">
                <div className="left">
                  <img
                    src="https://res.cloudinary.com/minhdang1202/image/upload/v1667236680/gabhngtwprwlzo6tjcmx.png"
                    alt="product"
                    style={{ width: "40px", height: "40px" }}
                    className="img-xs"
                  />
                </div>
                <div className="info">{orderItem.name}</div>
              </div>
            </td>
            <td className="text-center">
              <div className="info">
                {new Intl.NumberFormat("vi-VN", config).format(orderItem.price)}
              </div>
            </td>
            <td className="text-center">
              <div className="info ">{orderItem.quantity}</div>
            </td>

            <td className="text-end">
              <div className="info">
                {new Intl.NumberFormat("vi-VN", config).format(
                  orderItem.totalPrice
                )}
              </div>
            </td>
          </tr>
        ))}

        <tr>
          <td colSpan="4">
            <article className="float-end">
              <dl className="dlist">
                <dt>Subtotal:</dt> <dd>{orders.cartTotalAmount}</dd>
              </dl>
              <dl className="dlist">
                <dt>Shipping cost:</dt> <dd>{orders.shippingPrice}</dd>
              </dl>
              <dl className="dlist">
                <dt>Grand total:</dt>
                <dd>
                  <b className="h5">{orders.totalAmount}</b>
                </dd>
              </dl>
              <dl className="dlist">
                <dt className="text-muted">Status:</dt>
                <dd>
                  {orders.isPaid ? (
                    <button className="badge rounded-pill alert alert-success text-success">
                      Payment done
                    </button>
                  ) : (
                    <>
                      {loading && <Loading />}
                      <button
                        onClick={paidHandle}
                        className="badge rounded-pill alert alert-dark text-success"
                      >
                        Not Payment
                      </button>
                    </>
                  )}
                </dd>
              </dl>
            </article>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default OrderDetailProducts;
