import { ING_CREATE_FAIL, ING_CREATE_REQUEST, ING_CREATE_RESET, ING_CREATE_SUCCESS, ING_GET_ALL_FAIL, ING_GET_ALL_REQUEST, ING_GET_ALL_RESET, ING_GET_ALL_SUCCESS, ING_RECOMMENT_FAIL, ING_RECOMMENT_REQUEST, ING_RECOMMENT_RESET, ING_RECOMMENT_SUCCESS } from "../Constants/IngConstanst";

export const ingAllReducers = (
  state = { ings: [] },
  action
) => {
  switch (action.type) {
    case ING_GET_ALL_REQUEST:
      return { loading: true };
    case ING_GET_ALL_SUCCESS:
      return {
        loading: false,
        ings: action.payload,
        success: true,
      };
    case ING_GET_ALL_FAIL:
      return { loading: false, error: action.payload };
    case ING_GET_ALL_RESET:
      return {};
    default:
      return state;
  }
};

export const ingAddReducers = (
  state = {ing: {}},
  action
) => {
  switch (action.type) {
    case ING_CREATE_REQUEST:
      return { loading: true };
    case ING_CREATE_SUCCESS:
      return {
        loading: false,
        ing: action.payload,
        success: true,
      };
    case ING_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case ING_CREATE_RESET:
      return {};
    default:
      return state;
  }
};


export const ingRecommentReducers = (
  state = {ings: []},
  action
) => {
  switch (action.type) {
    case ING_RECOMMENT_REQUEST:
      return { loading: true };
    case ING_RECOMMENT_SUCCESS:
      return {
        loading: false,
        ings: action.payload,
        success: true,
      };
    case ING_RECOMMENT_FAIL:
      return { loading: false, error: action.payload };
    case ING_RECOMMENT_RESET:
      return {};
    default:
      return state;
  }
};
