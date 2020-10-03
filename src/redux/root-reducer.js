import { combineReducers } from "redux";

import userReducer from "./user/user.reducer";
import CartReducer from './cart/cart.reducers';

export default combineReducers({
    user: userReducer,
    cart: CartReducer
})