import axios from "axios";
import { CLEAR_ITEMS } from "../Constants/CartConstants";
import {
  ORDER_ADMIN_ALL_FAIL,
  ORDER_ADMIN_ALL_REQUEST,
  ORDER_ADMIN_ALL_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DELIVERED_FAIL,
  ORDER_DELIVERED_REQUEST,
  ORDER_DELIVERED_SUCCESS,
  ORDER_DETAIL_FAIL,
  ORDER_DETAIL_REQUEST,
  ORDER_DETAIL_SUCCESS,
  ORDER_FILTER_FAIL,
  ORDER_FILTER_REQUEST,
  ORDER_FILTER_SUCCESS,
  ORDER_PAID_FAIL,
  ORDER_PAID_REQUEST,
  ORDER_PAID_SUCCESS,
  ORDER_STATUS_FAIL,
  ORDER_STATUS_REQUEST,
  ORDER_STATUS_SUCCESS,
  ORDER_USER_ALL_FAIL,
  ORDER_USER_ALL_REQUEST,
  ORDER_USER_ALL_SUCCESS,
} from "../Constants/OrderConstants";
import { PROXY } from "../Constants/ProxyContant";
import { logout } from "./UserActions";

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(`${PROXY}/api/orders`, order, config);

    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
    dispatch({ type: CLEAR_ITEMS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data
        ? error.response.data
        : error.message;

    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({ type: ORDER_CREATE_FAIL, payload: message });
  }
};

export const findOrder = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DETAIL_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`${PROXY}/api/orders/${id}`, config);
    dispatch({ type: ORDER_DETAIL_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data
        ? error.response.data
        : error.message;

    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({ type: ORDER_DETAIL_FAIL, payload: message });
  }
};

export const findAllOrderUser = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_USER_ALL_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`${PROXY}/api/orders`, config);

    dispatch({ type: ORDER_USER_ALL_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data
        ? error.response.data
        : error.message;

    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({ type: ORDER_USER_ALL_FAIL, payload: message });
  }
};

export const getAllOrder = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_ADMIN_ALL_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`${PROXY}/api/orders/all`, config);

    dispatch({ type: ORDER_ADMIN_ALL_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data
        ? error.response.data
        : error.message;

    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({ type: ORDER_ADMIN_ALL_FAIL, payload: message });
  }
};

export const deliveredOrder = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DELIVERED_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.put(`${PROXY}/api/orders/${id}/delivered`, userInfo, config);

    dispatch({ type: ORDER_DELIVERED_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data
        ? error.response.data
        : error.message;

    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({ type: ORDER_DELIVERED_FAIL, payload: message });
  }
};
export const paidOrder = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_PAID_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.put(`${PROXY}/api/orders/${id}/paid`, userInfo, config);

    dispatch({ type: ORDER_PAID_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data
        ? error.response.data
        : error.message;

    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({ type: ORDER_PAID_FAIL, payload: message });
  }
};

export const changeStatusOrder = (id, status) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_STATUS_REQUEST });

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
      `${PROXY}/api/orders/${id}/status`,
      { status: status },
      config
    );

    dispatch({ type: ORDER_STATUS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data
        ? error.response.data
        : error.message;

    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({ type: ORDER_STATUS_FAIL, payload: message });
  }
};

export const filterOrder = (day, status) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_FILTER_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(
      `${PROXY}/api/orders/all/filter?day=${day}&status=${status}`,
      config
    );

    dispatch({ type: ORDER_FILTER_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data
        ? error.response.data
        : error.message;

    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({ type: ORDER_FILTER_FAIL, payload: message });
  }
};
