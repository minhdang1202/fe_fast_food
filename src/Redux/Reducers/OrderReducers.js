import { CLEAR_ITEMS } from "../Constants/CartConstants";
import {
  ORDER_ADMIN_ALL_FAIL,
  ORDER_ADMIN_ALL_REQUEST,
  ORDER_ADMIN_ALL_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_RESET,
  ORDER_CREATE_SUCCESS,
  ORDER_DELIVERED_FAIL,
  ORDER_DELIVERED_REQUEST,
  ORDER_DELIVERED_RESET,
  ORDER_DELIVERED_SUCCESS,
  ORDER_DETAIL_FAIL,
  ORDER_DETAIL_REQUEST,
  ORDER_DETAIL_SUCCESS,
  ORDER_FILTER_FAIL,
  ORDER_FILTER_REQUEST,
  ORDER_FILTER_RESET,
  ORDER_FILTER_SUCCESS,
  ORDER_PAID_FAIL,
  ORDER_PAID_REQUEST,
  ORDER_PAID_RESET,
  ORDER_PAID_SUCCESS,
  ORDER_STATUS_FAIL,
  ORDER_STATUS_REQUEST,
  ORDER_STATUS_RESET,
  ORDER_STATUS_SUCCESS,
  ORDER_USER_ALL_FAIL,
  ORDER_USER_ALL_REQUEST,
  ORDER_USER_ALL_SUCCESS,
} from "../Constants/OrderConstants";

// import io from "socket.io-client";

// var socket = io("http://localhost:5000");

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { loading: true };
    case ORDER_CREATE_SUCCESS:
      // socket.emit("create_order_success");
      return { loading: false, success: true, order: action.payload };
    case ORDER_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_CREATE_RESET:
      return {};
    case CLEAR_ITEMS:
      localStorage.removeItem("cartItems");
      localStorage.removeItem("totalAmount");
      localStorage.setItem("totalQuantity", 0);
      return { ...state, cartItems: [] };
    default:
      return state;
  }
};

export const orderReducers = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_DETAIL_REQUEST:
      return { loading: true };
    case ORDER_DETAIL_SUCCESS:
      return { loading: false, orders: action.payload };
    case ORDER_DETAIL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderUserAllReducers = (
  state = { orders: [], total: 0 },
  action
) => {
  switch (action.type) {
    case ORDER_USER_ALL_REQUEST:
      return { loading: true };
    case ORDER_USER_ALL_SUCCESS:
      return {
        loading: false,
        orders: action.payload.orders,
        total: action.payload.total,
      };
    case ORDER_USER_ALL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderDeliveredReducers = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELIVERED_REQUEST:
      return { loading: true };
    case ORDER_DELIVERED_SUCCESS:
      return { loading: false, success: true };
    case ORDER_DELIVERED_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_DELIVERED_RESET:
      return {};
    default:
      return state;
  }
};

export const orderPaidReducers = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAID_REQUEST:
      return { loading: true };
    case ORDER_PAID_SUCCESS:
      return { loading: false, success: true };
    case ORDER_PAID_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_PAID_RESET:
      return {};
    default:
      return state;
  }
};

export const orderAdminAllReducers = (
  state = { orders: [], total: 0, totalSale: 0 },
  action
) => {
  switch (action.type) {
    case ORDER_ADMIN_ALL_REQUEST:
      return { loading: true };
    case ORDER_ADMIN_ALL_SUCCESS:
      return {
        loading: false,
        orders: action?.payload?.order,
        total: action?.payload?.total,
        totalSale: action?.payload?.totalSale,
      };
    case ORDER_ADMIN_ALL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderChangeStatusReducers = (state = {}, action) => {
  switch (action.type) {
    case ORDER_STATUS_REQUEST:
      return { loading: true };
    case ORDER_STATUS_SUCCESS:
      return { loading: false, order: action.payload, success: true };
    case ORDER_STATUS_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_STATUS_RESET:
      return {};
    default:
      return state;
  }
};

export const orderFilterReducers = (
  state = { orders: [], total: 0 },
  action
) => {
  switch (action.type) {
    case ORDER_FILTER_REQUEST:
      return { loading: true };
    case ORDER_FILTER_SUCCESS:
      return {
        loading: false,
        orders: action.payload.orders,
        total: action.payload.total,
        success: true,
      };
    case ORDER_FILTER_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_FILTER_RESET:
      return {};
    default:
      return state;
  }
};
