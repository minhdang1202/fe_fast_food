import {
  ADD_ITEM,
  DELETE_ITEM,
  REMOVE_ITEM,
  SAVE_PAYMENT_METHOD,
  SAVE_SHIPPING_ADDRESS,
} from "../Constants/CartConstants";

export const addToCart = (data) => (dispatch) => {
  dispatch({ type: ADD_ITEM, payload: data });
};

export const removeItem = (_id) => (dispatch) => {
  dispatch({ type: REMOVE_ITEM, payload: _id });
};

export const deleteItem = (_id) => (dispatch) => {
  dispatch({ type: DELETE_ITEM, payload: _id });
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({ type: SAVE_SHIPPING_ADDRESS, payload: data });
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({ type: SAVE_PAYMENT_METHOD, payload: data });
};
