import axios from "axios";
import { ING_CREATE_FAIL, ING_CREATE_REQUEST, ING_CREATE_SUCCESS, ING_GET_ALL_FAIL, ING_GET_ALL_REQUEST, ING_GET_ALL_SUCCESS, ING_RECOMMENT_FAIL, ING_RECOMMENT_REQUEST, ING_RECOMMENT_SUCCESS } from "../Constants/IngConstanst";
import { PROXY } from "../Constants/ProxyContant";
import { logout } from "./UserActions";

export const addIng =
  ({ name, quantity }) =>
  async (dispatch, getState) => {
    const newName = name.charAt(0).toUpperCase() + name.toLowerCase().slice(1);
   

    try {
      dispatch({ type: ING_CREATE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(
        `${PROXY}/api/ings`,
        { name: newName, mass: quantity },
        config
      );

      dispatch({ type: ING_CREATE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data
          ? error.response.data
          : error.message;

      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({ type: ING_CREATE_FAIL, payload: message });
    }
  };

  
export const getAllIng =
  () =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: ING_GET_ALL_REQUEST });

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
        `${PROXY}/api/ings`,config
      );

      dispatch({ type: ING_GET_ALL_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data
          ? error.response.data
          : error.message;

      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({ type: ING_GET_ALL_FAIL, payload: message });
    }
  };
  

export const ingsRecomment =
  () =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: ING_RECOMMENT_REQUEST });

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
        `${PROXY}/api/ings/recomment`,config
      );

      dispatch({ type: ING_RECOMMENT_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data
          ? error.response.data
          : error.message;

      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({ type: ING_RECOMMENT_FAIL, payload: message });
    }
  };
