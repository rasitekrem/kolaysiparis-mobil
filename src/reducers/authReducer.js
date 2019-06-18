import { 
    EMAIL_CHANGED, 
    PASSWORD_CHANGED, 
    REPASSWORD_CHANGED,
    OLDPASSWORD_CHANGED,
    NEWPASSWORD_CHANGED,
    RENEWPASSWORD_CHANGED,
    PASSWORD_CHANGED_SUCCESS,
    PASSWORD_CHANGED_FAILED, 
    LOGIN_USER_SUCCESS,
    REGISTER_USER_SUCCESS,
    LOGIN_USER_FAILED,
    REGISTER_USER_FAILED,
    LOGIN,
    LOGGED_IN,
    NOT_LOGGED_IN,
    LOGOUT 
    } from '../actions';

const INITIAL_STATE = {
    username: '',
    password: '',
    repassword: '',
    oldpassword: '',
    newpassword: '',
    renewpassword: '',
    loading: '',
    error: '',
    authKey: null,
    userData: {},
    fullLoading: true
};

export default (state = INITIAL_STATE, action) => {
    console.log(action.type);
    console.log(action.payload);
    switch (action.type) {
        case EMAIL_CHANGED:
            return { ...state, username: action.payload };
        case PASSWORD_CHANGED:
            return { ...state, password: action.payload };
        case REPASSWORD_CHANGED: 
            return { ...state, repassword: action.payload };
        // eslint-disable-next-line no-sequences
        case LOGIN_USER_SUCCESS, REGISTER_USER_SUCCESS:
            //...INITAL_STATE yazılma amacı INITAL STATE'i ilk haline döndürmek
            return { ...state, ...INITIAL_STATE, loading: false, fullLoading: false, userData: action.payload, authKey: action.payload.authKey };
        case LOGIN:
            return { ...state, loading: true, error: '' };
        // eslint-disable-next-line no-sequences
        case LOGIN_USER_FAILED:
            return { ...state, loading: false, error: action.payload };
        case REGISTER_USER_FAILED:
            return { ...state, loading: false, error: action.payload };
        case LOGGED_IN:
            return { ...state, authKey: action.payload, fullLoading: false };
        case NOT_LOGGED_IN:
            return { ...state, fullLoading: false };
        case LOGOUT: 
            return { ...state, ...INITIAL_STATE, fullLoading: false };
        case OLDPASSWORD_CHANGED:
            return { ...state, oldpassword: action.payload };
        case NEWPASSWORD_CHANGED:
            return { ...state, newpassword: action.payload };
        case RENEWPASSWORD_CHANGED:
            return { ...state, renewpassword: action.payload };
        case PASSWORD_CHANGED_SUCCESS:
            return { 
                ...state, 
                renewpassword: '', 
                oldpassword: '', 
                newpassword: '', 
                error: action.payload, 
                loading: false 
            };
        case PASSWORD_CHANGED_FAILED: 
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
}