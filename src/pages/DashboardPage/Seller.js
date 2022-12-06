import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TopTotal from "../../components/Dashboard/Home/TopTotal";
import { getAllOrder } from "../../Redux/Actions/OrderActions";
import "../../styles/Sell.css";
const Seller = () => {
  const orderAdminAll = useSelector((state) => state.orderAdminAll);
  const { orders } = orderAdminAll;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrder());
  }, [dispatch]);
  return (
    <section className="content-main" style={{ maxWidth: "1200px" }}>
      <div className="content-header">
        <h2 className="content-title">Selling</h2>
      </div>
      <TopTotal orders={orders} />
      <div className="row">
        <table className="table ">
          <thead>
            <tr className="title-table">
              <th scope="col">Tên nguyên liệu</th>
              <th scope="col">Đã nhập</th>
              <th scope="col">Đã tiêu thụ</th>
              <th scope="col">Còn lại</th>
              <th scope="col">Nhập thêm</th>

              <th scope="col">Gợi ý nhập</th>
            </tr>
          </thead>
          <tbody>
            <tr className="title-table">
              <td>
                <b>Bột mì</b>
              </td>
              <td>30kg</td>
              <td>28kg</td>
              <td>2kg</td>
              <td>0kg</td>
              <td>30kg</td>
            </tr>
            <tr className="title-table">
              <td>
                <b>Bột áo</b>
              </td>
              <td>5kg</td>
              <td>2kg</td>
              <td>3kg</td>
              <td>0kg</td>

              <td>3kg</td>
            </tr>
            <tr className="title-table">
              <td>
                <b>Mật ong</b>
              </td>
              <td>1kg</td>
              <td>2kg</td>
              <td>0kg</td>
              <td>1kg</td>
              <td>3kg</td>
            </tr>
            <tr className="title-table">
              <td>
                <b>Men nở</b>
              </td>
              <td>5kg</td>
              <td>1kg</td>
              <td>4kg</td>
              <td>0kg</td>
              <td>0kg</td>
            </tr>
            <tr className="title-table">
              <td>
                <b>Cà chua</b>
              </td>
              <td>15kg</td>
              <td>12kg</td>
              <td>3kg</td>
              <td>0kg</td>
              <td>13kg</td>
            </tr>
            <tr className="title-table">
              <td>
                <b>Phô mai</b>
              </td>
              <td>10kg</td>
              <td>5kg</td>
              <td>5kg</td>
              <td>0kg</td>
              <td>1kg</td>
            </tr>
            <tr className="title-table">
              <td>
                <b>Thịt, hải sản</b>
              </td>
              <td>20kg</td>
              <td>24kg</td>
              <td>0kg</td>
              <td>4kg</td>
              <td>26kg</td>
            </tr>
            <tr className="title-table">
              <td>
                <b>Trứng</b>
              </td>
              <td>5kg</td>
              <td>5kg</td>
              <td>0kg</td>
              <td>0kg</td>
              <td>6kg</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Seller;
