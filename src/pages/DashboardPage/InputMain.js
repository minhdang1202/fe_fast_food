import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Message from '../../components/LoadingError/Error';
import Loading from '../../components/LoadingError/Loading';
import { addIng, getAllIng } from '../../Redux/Actions/IngAction';

const InputMain = () => {

     const [name, setName] = useState("");
     const [quantity, setQuantity] = useState(0);
     const dispatch = useDispatch();
     const { ings, loading : loadingAll , error : errorAll } = useSelector(state => state.ingsAll);
     const {  loading : loadingAdd , error : errorAdd , success: successAdd } = useSelector(state => state.ingsAdd);
    const submitHandler = (e) => {
         const newIng = {
           name,
          quantity
         };
         e.preventDefault();
         dispatch(addIng(newIng));
    }

    useEffect(() => {
    if(successAdd) {
        setName("");
        setQuantity(0)
    }
      dispatch(getAllIng());
    }, [dispatch,successAdd ]);


  return (
    <section className="content-main" style={{ maxWidth: "1200px" }}>
      <div className="content-header">
        <h2 className="content-title">Input Store</h2>
      </div>
      <div className="row">
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <Link to="/sell" className="btn btn-danger text-white">
              Go to Sell
            </Link>
            <h2 className="content-title">Add Ingredient</h2>
            <div>
              <button type="submit" className="btn btn-primary">
                Add to store
              </button>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-lg-12">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  {(errorAll||errorAdd)  && (
                    <Message variant="alert-danger"> { errorAll || errorAdd }</Message>
                  )}
                  {(loadingAll || loadingAdd )&& <Loading />}
                  <div className="d-flex ">
                    <div
                      className="mb-4"
                      style={{ width: "48%", marginRight: "34px" }}
                    >
                      <label htmlFor="product_title" className="form-label">
                        Ingredient name
                      </label>
                      <input
                        type="text"
                        placeholder="Type here"
                        className="form-control"
                        id="product_title"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div
                      className="mb-4"
                      style={{ width: "48%", marginRight: "34px" }}
                    >
                      <label htmlFor="product_price" className="form-label ">
                        Quantity
                      </label>
                      <input
                        type="number"
                        placeholder="Type here"
                        className="form-control"
                        id="product_price"
                        required
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="row">
        <table className="table ">
          <thead>
            <tr className="title_table">
              <th scope="col">Tên nguyên liệu</th>
              <th scope="col">Đã nhập</th>
            </tr>
          </thead>
          <tbody>
            {ings?.map((item, index) => (
                <tr className="title_table" key={index}>
                    <td>
                        <b>{item?.name}</b>
                    </td>
                    <td>{item?.mass}kg</td>
                </tr>
            ))}
            
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default InputMain