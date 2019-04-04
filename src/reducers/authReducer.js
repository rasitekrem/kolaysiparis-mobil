import { 
    EMAIL_CHANGED, 
    PASSWORD_CHANGED, 
    REPASSWORD_CHANGED, 
    LOGIN_USER_SUCCESS,
    REGISTER_USER_SUCCESS,
    LOGIN_USER_FAILED,
    REGISTER_USER_FAILED,
    LOGIN, 
    } from '../actions';

const INITIAL_STATE = {
    username: '',
    password: '',
    repassword: '',
    loading: '',
    error: '',
    userData: {}
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case EMAIL_CHANGED:
            return { ...state, username: action.payload };
        case PASSWORD_CHANGED:
            return { ...state, password: action.payload };
        case REPASSWORD_CHANGED: 
            return { ...state, repassword: action.payload };
        case LOGIN_USER_SUCCESS:
            //...INITAL_STATE yazılma amacı INITAL STATE'i ilk haline döndürmek
            return { ...state, ...INITIAL_STATE, userData: action.payload };
        case REGISTER_USER_SUCCESS:
            //...INITAL_STATE yazılma amacı INITAL STATE'i ilk haline döndürmek
            return { ...state, ...INITIAL_STATE, userData: action.payload };
        case LOGIN:
            return { ...state, loading: true, error: '' };
        case LOGIN_USER_FAILED:
            return { ...state, loading: false, error: action.payload };
        case REGISTER_USER_FAILED:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}