import {
  USERS_CHANGE_ROLE_FAIL,
  USERS_CHANGE_ROLE_REQUEST,
  USERS_CHANGE_ROLE_RESET,
  USERS_CHANGE_ROLE_SUCCESS,
  USERS_FAIL,
  USERS_REQUEST,
  USERS_RESET,
  USERS_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_PROFILE_FAIL,
  USER_PROFILE_REQUEST,
  USER_PROFILE_RESET,
  USER_PROFILE_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
} from "../Constants/UserContants";

const userInfo =
  localStorage.getItem("userInfo") !== null
    ? JSON.parse(localStorage.getItem("userInfo"))
    : undefined;

const profile =
  localStorage.getItem("profile") !== null
    ? JSON.parse(localStorage.getItem("profile"))
    : {};

const INITIAL_STATE = {
  userInfo: userInfo,
  profile: profile,
};

export const userLoginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userProfileReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_PROFILE_REQUEST:
      return { loading: true };
    case USER_PROFILE_SUCCESS:
      return { loading: false, profile: action.payload };
    case USER_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    case USER_PROFILE_RESET:
      return { profile: {} };
    default:
      return state;
  }
};

export const userUpdateReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true };
    case USER_UPDATE_SUCCESS:
      return { loading: false, userInfo: action.payload, success: true };
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const usersAllReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USERS_REQUEST:
      return { loading: true };
    case USERS_SUCCESS:
      return { loading: false, users: action.payload, success: true };
    case USERS_FAIL:
      return { loading: false, error: action.payload };
    case USERS_RESET:
      return {};
    default:
      return state;
  }
};

export const userChangeRoleReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USERS_CHANGE_ROLE_REQUEST:
      return { loading: true, success: false };
    case USERS_CHANGE_ROLE_SUCCESS:
      return { loading: false, user: action.payload, success: true };
    case USERS_CHANGE_ROLE_FAIL:
      return { loading: false, error: action.payload, success: false };
    case USERS_CHANGE_ROLE_RESET:
      return {};
    default:
      return state;
  }
};
