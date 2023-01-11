import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import TopTotal from "../../components/Dashboard/Home/TopTotal";
import { getAllIng, ingsRecomment } from "../../Redux/Actions/IngAction";
import { getAllOrder } from "../../Redux/Actions/OrderActions";
import "../../styles/Sell.css";
const Seller = () => {
  const orderAdminAll = useSelector((state) => state.orderAdminAll);
  const { total, totalSale } = orderAdminAll;
  const dispatch = useDispatch();
  const {
    ings,
    loading: loadingAll,
    error: errorAll,
  } = useSelector((state) => state.ingsAll);
 
  const {
    ings: recomments,
    loading: loadingRecomment,
    error: errorRecomment,
  } = useSelector((state) => state.ingsRecomment);
   
  

  useEffect(() => {
    dispatch(getAllOrder(1, 1));
    dispatch(getAllIng());
    dispatch(ingsRecomment());
  }, [dispatch]);

  const list =[10.1,1.6,1.3,3.2,7,1,13.5,15,4];

  return (
    <section className="content-main" style={{ maxWidth: "1200px" }}>
      <div className="content-header">
        <h2 className="content-title">Selling</h2>
        <Link to="/input" className="btn btn-primary">
          Nhập hàng
        </Link>
      </div>
      <TopTotal totalSale={totalSale} total={total} />
      <div className="row">
        <table className="table ">
          <thead>
            <tr className="title_table">
              <th scope="col">Tên nguyên liệu</th>
              <th scope="col">Đã nhập</th>
              <th scope="col">Đã tiêu thụ</th>
              <th scope="col">Còn lại</th>
              <th scope="col">Nhập thêm</th>

              <th scope="col">Gợi ý nhập</th>
            </tr>
          </thead>
          <tbody>
            {ings?.map((item, index) => (
              <tr className="title_table" key={index}>
                <td>
                  <b>{item?.name}</b>
                </td>
                <td>{item?.mass}kg</td>
                <td>{list[index]}kg</td>
                <td>{(item?.mass - list[index]).toFixed(1)}kg</td>
                <td>0kg</td>
                <td>{list[index]+2}kg</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Seller;
