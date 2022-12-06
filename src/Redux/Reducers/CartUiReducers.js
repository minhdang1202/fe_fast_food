import { CLOSE_CART_UI, OPEN_CART_UI } from "../Constants/CartUiContants";

const INITIAL_STATE = {
  cartIsVisible: false,
};

export const cartUiReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case OPEN_CART_UI:
      return {
        cartIsVisible: true,
      };
    case CLOSE_CART_UI:
      return {
        cartIsVisible: false,
      };
    default:
      return state;
  }
};
