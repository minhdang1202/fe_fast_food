import {
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DETAIL_FAIL,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_EDIT_FAIL,
  PRODUCT_EDIT_REQUEST,
  PRODUCT_EDIT_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from "../Constants/ProductContants";
import axios from "axios";

export const listProduct =
  (searchTerm = "", pageNumber, sort) =>
  async (dispatch) => {
    try {
      dispatch({
        type: PRODUCT_LIST_REQUEST,
      });
      const { data } = await axios.get(
        `/api/product?keyword=${searchTerm}&pageNumber=${pageNumber}&sort=${sort}`
      );
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload:
          error.response && error.response.data
            ? error.response.data
            : error.message,
      });
    }
  };

export const productDetail = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_DETAIL_REQUEST,
    });
    const { data } = await axios.get(`/api/product/${id}`);
    dispatch({ type: PRODUCT_DETAIL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAIL_FAIL,
      payload:
        error.response && error.response.data
          ? error.response.data
          : error.message,
    });
  }
};

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_DELETE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.delete(`/api/product/${id}`, config);
    dispatch({ type: PRODUCT_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload:
        error.response && error.response.data
          ? error.response.data
          : error.message,
    });
  }
};
export const createProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_CREATE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(`/api/product`, product, config);
    dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload:
        error.response && error.response.data
          ? error.response.data
          : error.message,
    });
  }
};
export const editProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_EDIT_REQUEST,
    });
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
      `/api/product/${product._id}`,
      product,
      config
    );
    dispatch({ type: PRODUCT_EDIT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_EDIT_FAIL,
      payload:
        error.response && error.response.data
          ? error.response.data
          : error.message,
    });
  }
};
export const createReviewProduct =
  (productID, review) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PRODUCT_CREATE_REVIEW_REQUEST,
      });
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await axios.post(`/api/product/${productID}/review`, review, config);
      dispatch({ type: PRODUCT_CREATE_REVIEW_SUCCESS });
    } catch (error) {
      dispatch({
        type: PRODUCT_CREATE_REVIEW_FAIL,
        payload:
          error.response && error.response.data
            ? error.response.data
            : error.message,
      });
    }
  };
