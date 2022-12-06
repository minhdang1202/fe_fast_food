import {
  ADD_ITEM,
  CLEAR_ITEMS,
  DELETE_ITEM,
  REMOVE_ITEM,
  SAVE_PAYMENT_METHOD,
  SAVE_SHIPPING_ADDRESS,
} from "../Constants/CartConstants";

const items =
  localStorage.getItem("cartItems") !== null
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

const totalAmount =
  localStorage.getItem("totalAmount") !== null
    ? JSON.parse(localStorage.getItem("totalAmount"))
    : 0;

const totalQuantity =
  localStorage.getItem("totalQuantity") !== null
    ? JSON.parse(localStorage.getItem("totalQuantity"))
    : 0;

const setItemFunc = (item, totalAmount, totalQuantity) => {
  localStorage.setItem("cartItems", JSON.stringify(item));
  localStorage.setItem("totalAmount", JSON.stringify(totalAmount));
  localStorage.setItem("totalQuantity", JSON.stringify(totalQuantity));
};

const shippingAddress =
  localStorage.getItem("shippingAddress") !== null
    ? JSON.parse(localStorage.getItem("shippingAddress"))
    : {};

const paymentMethod =
  localStorage.getItem("paymentMethod") !== null
    ? JSON.parse(localStorage.getItem("paymentMethod"))
    : "";

const INITIAL_STATE = {
  cartItems: items,
  totalQuantity: totalQuantity,
  totalAmount: totalAmount,
  shippingAddress: shippingAddress,
  paymentMethod: paymentMethod,
};

export const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_ITEM:
      const newItem = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item._id === newItem._id
      );
      if (!existingItem) {
        const totalQuantity = state.totalQuantity + 1;
        const cartItems = [
          ...state.cartItems,
          {
            _id: newItem._id,
            name: newItem.name,
            price: newItem.price,
            quantity: 1,
            totalPrice: newItem.price,
          },
        ];
        const totalAmount = Number(state.totalAmount) + Number(newItem.price);
        setItemFunc(
          cartItems.map((item) => item),
          totalAmount,
          totalQuantity
        );
        return {
          ...state,
          totalQuantity: totalQuantity,
          cartItems: cartItems,
          totalAmount: totalAmount,
        };
      } else {
        const index = state.cartItems.indexOf(existingItem);
        const totalQuantity = state.totalQuantity + 1;
        const cartItems = [
          ...state.cartItems.slice(0, index),
          {
            _id: newItem._id,
            name: newItem.name,
            price: newItem.price,
            quantity: existingItem.quantity + 1,
            totalPrice: Number(existingItem.totalPrice) + Number(newItem.price),
          },
          ...state.cartItems.slice(index + 1),
        ];
        const totalAmount = state.totalAmount + Number(newItem.price);
        setItemFunc(
          cartItems.map((item) => item),
          totalAmount,
          totalQuantity
        );
        return {
          ...state,
          totalQuantity: totalQuantity,
          cartItems: cartItems,
          totalAmount: totalAmount,
        };
      }
    case REMOVE_ITEM:
      const { _id } = action.payload;
      const existedItem = state.cartItems.find((item) => item._id === _id);
      const totalQuantity = state.totalQuantity - 1;

      if (existedItem.quantity === 1) {
        const newCartItems = state.cartItems.filter((item) => item._id !== _id);

        const newTotalAmount = state.totalAmount - existedItem.price;
        setItemFunc(
          newCartItems.map((item) => item),
          newTotalAmount,
          totalQuantity
        );
        return {
          ...state,
          cartItems: newCartItems,
          totalQuantity: totalQuantity,
          totalAmount: newTotalAmount,
        };
      } else {
        const index = state.cartItems.indexOf(existedItem);
        const newCartItems = [
          ...state.cartItems.slice(0, index),
          {
            _id: existedItem._id,
            name: existedItem.name,
            price: existedItem.price,
            quantity: existedItem.quantity - 1,
            totalPrice:
              Number(existedItem.totalPrice) - Number(existedItem.price),
          },
          ...state.cartItems.slice(index + 1),
        ];
        const newTotalAmount = state.totalAmount - Number(existedItem.price);
        setItemFunc(
          newCartItems.map((item) => item),
          newTotalAmount,
          totalQuantity
        );
        return {
          ...state,
          cartItems: newCartItems,
          totalQuantity: totalQuantity,
          totalAmount: newTotalAmount,
        };
      }
    case DELETE_ITEM:
      const existItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      const newCartItems = state.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      const newTotalQuantity = state.totalQuantity - existItem.quantity;
      const newTotalAmount = state.totalAmount - Number(existItem.totalPrice);

      setItemFunc(
        newCartItems.map((item) => item),
        newTotalAmount,
        newTotalQuantity
      );
      return {
        ...state,
        cartItems: newCartItems,
        totalAmount: newTotalAmount,
        totalQuantity: newTotalQuantity,
      };
    case SAVE_SHIPPING_ADDRESS:
      localStorage.setItem("shippingAddress", JSON.stringify(action.payload));
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case SAVE_PAYMENT_METHOD:
      localStorage.setItem("paymentMethod", JSON.stringify(action.payload));
      return {
        ...state,
        paymentMethod: action.payload,
      };
    case CLEAR_ITEMS:
      localStorage.removeItem("cartItems");
      localStorage.removeItem("totalAmount");
      localStorage.removeItem("totalQuantity");
      return { ...state, cartItems: [], totalQuantity: 0, totalAmount: 0 };

    default:
      return state;
  }
};
