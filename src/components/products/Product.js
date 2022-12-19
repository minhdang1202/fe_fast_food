import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import ConfirmDialog from "../../pages/DashboardPage/ConfirmDialog";
const Product = (props) => {
  const { product } = props;
  const [showConfirm, setConfirm] = useState(false);

  return (
    <>
      {showConfirm && (
        <ConfirmDialog product={product} setConfirm={setConfirm} />
      )}

      <div className="col-md-6 col-sm-6 col-lg-3 mb-5">
        <div className="card card-product-grid shadow-sm">
          <Link to="#" className="img-wrap">
            <img
              src={
                product?.images
                  ? product?.images[0]
                  : "https://res.cloudinary.com/minhdang1202/image/upload/v1667236680/gabhngtwprwlzo6tjcmx.png"
              }
              alt="Product"
            />
          </Link>
          <div className="info-wrap">
            <Link to="#" className="title text-truncate">
              {product.name}
            </Link>
            <div className="price mb-2">{product.price}.000</div>
            <div className="row">
              <Link
                to={`/product/${product._id}/edit`}
                className="btn btn-sm btn-outline-success p-2 pb-3 col-md-6"
              >
                <i className="fas fa-pen"></i>
              </Link>

              <button
                className="btn btn-sm btn-outline-danger p-2 pb-3 col-md-6"
                onClick={() => setConfirm(true)}
              >
                <i className="fas fa-trash-alt"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
