import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { listProduct } from "../../../Redux/Actions/ProductActions";

const TopTotal = ({ total, totalSale }) => {
  const { products } = useSelector((state) => state.productList);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProduct());
  }, [dispatch]);

  const location = useLocation();

  return (
    <div className="row">
      <div className="col-lg-4">
        <div className="card card-body mb-4 shadow-sm">
          <article className="icontext">
            <span className="icon icon-sm rounded-circle alert-primary">
              <i className="text-primary fas fa-usd-circle"></i>
            </span>
            <div className="text">
              <h6 className="mb-1">Total Sales</h6> <span>{totalSale}</span>
            </div>
          </article>
        </div>
      </div>
      <div className="col-lg-4">
        <div className="card card-body mb-4 shadow-sm">
          <article className="icontext">
            <span className="icon icon-sm rounded-circle alert-success">
              <i className="text-success fas fa-bags-shopping"></i>
            </span>
            <div className="text">
              <h6 className="mb-1">Total Orders</h6>
              <span>{total}</span>
            </div>
          </article>
        </div>
      </div>

      <div className="col-lg-4">
        <div className="card card-body mb-4 shadow-sm">
          <article className="icontext">
            <span className="icon icon-sm rounded-circle alert-warning">
              <i className="text-warning fas fa-shopping-basket"></i>
            </span>
            {location.pathname === "/admin" ? (
              <div className="text">
                <h6 className="mb-1">Total Products</h6>
                <span>{products?.length}</span>
              </div>
            ) : (
              <div className="text">
                {/* <h6 className="mb-1">Profit</h6>
                <span>{462}</span> */}
              </div>
            )}
          </article>
        </div>
      </div>
    </div>
  );
};

export default TopTotal;
