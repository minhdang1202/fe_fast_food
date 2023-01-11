import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { cartReducer } from "./Reducers/CartReducers";
import { cartUiReducer } from "./Reducers/CartUiReducers";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productCreateReducer,
  productCreateReviewReducer,
  productDeleteReducer,
  productDetailReducer,
  productEditReducer,
  productListReducer,
} from "./Reducers/ProductReducers";
import {
  userChangeRoleReducer,
  userLoginReducer,
  userProfileReducer,
  userRegisterReducer,
  usersAllReducer,
  userUpdateReducer,
} from "./Reducers/UserReducers";
import {
  orderAdminAllReducers,
  orderChangeStatusReducers,
  orderCreateReducer,
  orderDeliveredReducers,
  orderFilterReducers,
  orderPaidReducers,
  orderReducers,
  orderUserAllReducers,
} from "./Reducers/OrderReducers";
import {
  filterChangeReducer,
  shipperChooseReducers,
} from "./Reducers/ShipperReducers";
import { getAllIngReducers, ingAddReducers, ingAllReducers, ingRecommentReducers } from "./Reducers/IngReducer";

const reducer = combineReducers({
  productList: productListReducer,
  cartUi: cartUiReducer,
  cart: cartReducer,
  productDetail: productDetailReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  orderCreate: orderCreateReducer,
  order: orderReducers,
  userProfile: userProfileReducer,
  userUpdate: userUpdateReducer,
  allOrderUser: orderUserAllReducers,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productCreateReview: productCreateReviewReducer,
  productEdit: productEditReducer,
  orderAdminAll: orderAdminAllReducers,
  orderDelivered: orderDeliveredReducers,
  orderPaid: orderPaidReducers,
  orderChangeStatus: orderChangeStatusReducers,
  filterChange: filterChangeReducer,
  usersAll: usersAllReducer,
  orderFilter: orderFilterReducers,
  userChangeRole: userChangeRoleReducer,
  shipperChoose: shipperChooseReducers,
  ingsAll: ingAllReducers,
  ingsAdd: ingAddReducers,
  ingsRecomment: ingRecommentReducers,
});
const middleware = [thunk];

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
