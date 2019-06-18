import { combineReducers } from 'redux';
import AuthReducer from './authReducer';
import CartReducer from './cartReducer';
import UserReducer from './userReducer';

export default combineReducers({
    auth: AuthReducer,
    cart: CartReducer,
    user: UserReducer
});
