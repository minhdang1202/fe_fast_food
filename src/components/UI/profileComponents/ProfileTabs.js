import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, updateProfile } from "../../../Redux/Actions/UserActions";
import Message from "../../LoadingError/Error";

const ProfileTabs = ({ profile }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState(profile?.name);
  const [phone, setPhone] = useState(profile?.phone);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [hasChange, setHasChange] = useState(false);

  const userUpdate = useSelector((state) => state.userUpdate);

  const { error } = userUpdate;

  const changeName = (e) => {
    setName(e.target.value);
    setHasChange(true);
  };
  const changePhone = (e) => {
    setPhone(e.target.value);
    setHasChange(true);
  };
  const changeNewPassword = (e) => {
    setNewPassword(e.target.value);
    setHasChange(true);
  };
  const changeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    setHasChange(true);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Password không trùng nhau");
    } else {
      dispatch(updateProfile({ name, phone, password: newPassword }));
      dispatch(getProfile());
      setHasChange(false);
    }
  };

  return (
    <>
      {error && <Message value="alert-danger">{error}</Message>}

      <form className="row  form-container" onSubmit={submitHandler}>
        <div className="col-md-6">
          <div className="form-profile">
            <label htmlFor="account-fn">Name</label>
            <input
              className="form-control"
              type="text"
              required
              value={name}
              onChange={changeName}
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-profile">
            <label htmlFor="account-email">Phone Number</label>
            <input
              className="form-control"
              type="number"
              value={phone}
              onChange={changePhone}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-profile">
            <label htmlFor="account-pass">New Password</label>
            <input
              className="form-control"
              type="password"
              value={newPassword}
              onChange={changeNewPassword}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-profile">
            <label htmlFor="account-confirm-pass">Confirm Password</label>
            <input
              className="form-control"
              type="password"
              value={confirmPassword}
              onChange={changeConfirmPassword}
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={!hasChange}
          className={hasChange ? "btn_change" : "btn_normal"}
        >
          Update Profile
        </button>
      </form>
    </>
  );
};

export default ProfileTabs;
