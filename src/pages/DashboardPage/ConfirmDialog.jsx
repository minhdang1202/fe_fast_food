import React from "react";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../Redux/Actions/ProductActions";

const ConfirmDialog = ({ product, setConfirm }) => {
  const dispatch = useDispatch();

  const confirmDelete = () => {
    dispatch(deleteProduct(product._id));
    setConfirm(false);
  };

  return (
    <div className="container__confirm">
      <div className="confirm">
        <div className="content">
          <i className="fas fa-exclamation-triangle confirm_icon"></i>
          <div className="confirm_text">{`Bạn có muốn Xóa món ${product.name} ?`}</div>
        </div>
        <div className="footer">
          <button className="btn-cancel" onClick={() => setConfirm(false)}>
            Không
          </button>
          <button className="btn-save" onClick={confirmDelete}>
            Có
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
