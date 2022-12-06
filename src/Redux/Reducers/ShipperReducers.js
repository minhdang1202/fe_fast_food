import {
  CHANGE_FILTER,
  CHOOSE_SHIPPER_FAIL,
  CHOOSE_SHIPPER_REQUEST,
  CHOOSE_SHIPPER_SUCCESS,
  GET_ORDER_SHIPPER_FAIL,
  GET_ORDER_SHIPPER_REQUEST,
  GET_ORDER_SHIPPER_SUCCESS,
} from "../Constants/ShipperContants";

export const orderChangeStatusReducers = (state = { orders: [] }, action) => {
  switch (action.type) {
    case GET_ORDER_SHIPPER_REQUEST:
      return { loading: true };
    case GET_ORDER_SHIPPER_SUCCESS:
      return { loading: false, success: true, orders: action.payload };
    case GET_ORDER_SHIPPER_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const filterChangeReducer = (state = { filter: 0 }, action) => {
  if (action.type === CHANGE_FILTER) {
    return { filter: action.payload };
  } else {
    return state;
  }
};

export const shipperChooseReducers = (state = { order: {} }, action) => {
  switch (action.type) {
    case CHOOSE_SHIPPER_REQUEST:
      return { loading: true };
    case CHOOSE_SHIPPER_SUCCESS:
      return { loading: false, success: true, order: action.payload };
    case CHOOSE_SHIPPER_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
