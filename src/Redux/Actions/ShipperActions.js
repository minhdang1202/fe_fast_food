import axios from "axios";
import {
  CHANGE_FILTER,
  CHOOSE_SHIPPER_FAIL,
  CHOOSE_SHIPPER_REQUEST,
  CHOOSE_SHIPPER_SUCCESS,
} from "../Constants/ShipperContants";
import { logout } from "./UserActions";

export const changeFilter = (data) => (dispatch) => {
  dispatch({ type: CHANGE_FILTER, payload: data });
};

export const chooseShipper = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: CHOOSE_SHIPPER_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(
      `/api/orders/${id}/shipping`,
      userInfo,
      config
    );

    dispatch({ type: CHOOSE_SHIPPER_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data
        ? error.response.data
        : error.message;

    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({ type: CHOOSE_SHIPPER_FAIL, payload: message });
  }
};
