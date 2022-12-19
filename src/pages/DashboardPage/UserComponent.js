import React, { useState } from "react";
import { useEffect } from "react";
import PaginationComponent from "react-reactstrap-pagination";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import TableUser from "../../components/Dashboard/TableUser";
import Message from "../../components/LoadingError/Error";
import Loading from "../../components/LoadingError/Loading";
import { getAllUsers } from "../../Redux/Actions/UserActions";

const UserComponent = () => {
  const dispatch = useDispatch();
  const usersAll = useSelector((state) => state.usersAll);
  const { loading, error, users } = usersAll;
  const userChangeRole = useSelector((state) => state.userChangeRole);
  const { loading: changeRoleLoading, success } = userChangeRole;
  const [filterRole, setFilterRole] = useState(0);
  const [usersShow, setUsersShow] = useState(users);
  const [searchUser, setSearchUser] = useState("");
  const [search, setSearch] = useState("");
  useEffect(() => {
    dispatch(getAllUsers(searchUser));
  }, [dispatch, success, searchUser]);

  useEffect(() => {
    Number(filterRole) === 0
      ? setUsersShow(users)
      : setUsersShow(
          users?.filter((user) => user?.role === Number(filterRole))
        );
  }, [filterRole, users]);

  const handleKeyDownEnter = (e) => {
    if (e.key === "Enter") {
      setSearchUser(search);
    }
  };

  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Customers</h2>
      </div>

      <div className="card mb-4">
        <header className="card-header">
          <div className="row gx-3">
            <div className="col-lg-4 col-md-6 me-auto">
              <input
                type="text"
                placeholder="Search..."
                className="form-control"
                value={search}
                onKeyDown={handleKeyDownEnter}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="col-lg-2 col-6 col-md-3">
              <select
                className="form-select"
                onChange={(e) => setFilterRole(e.target.value)}
              >
                <option value={0}>Status: all</option>
                <option value={1}>Khách hàng</option>
                <option value={2}>Nhân viên</option>
              </select>
            </div>
          </div>
        </header>
        {error && <Message value="alert-danger">{error}</Message>}
        {loading || changeRoleLoading ? (
          <Loading />
        ) : (
          <TableUser users={usersShow} />
        )}
      </div>
    </section>
  );
};

export default UserComponent;
