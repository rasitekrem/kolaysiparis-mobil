/* eslint-disable no-unused-expressions */
import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { url } from '../commons';

export const EMAIL_CHANGED = 'email_changed';
export const PASSWORD_CHANGED = 'password_changed';
export const REPASSWORD_CHANGED = 'repassword_changed';
export const LOGIN_USER_SUCCESS = 'login_user_success';
export const REGISTER_USER_SUCCESS = 'register_user_success';
export const OLDPASSWORD_CHANGED = 'oldpassword_changed';
export const NEWPASSWORD_CHANGED = 'newpassword_changed';
export const RENEWPASSWORD_CHANGED = 'renewpassword_changed';
export const PASSWORD_CHANGED_SUCCESS = 'password_changed_success';
export const PASSWORD_CHANGED_FAILED = 'password_changed_failed';
export const LOGIN_USER_FAILED = 'login_user_failed';
export const REGISTER_USER_FAILED = 'register_user_failed';
export const LOGIN = 'login';
export const LOGGED_IN = 'logged_in';
export const NOT_LOGGED_IN = 'not_logged_in';
export const LOGOUT = 'logout';

export const logoutUser = () => {
    return dispatch => {
        AsyncStorage.removeItem('authKey');
        dispatch({
            type: LOGOUT
        });
        Actions.auth();
    };
};
export const isLoggedIn = () => {
    console.log('is here')
 return dispatch => {
        AsyncStorage.getItem('authKey')
            .then(value => {
                console.log(value);
                if (value !== null) {
                    dispatch({
                        type: LOGGED_IN,
                        payload: value 
                    });
                    Actions.main();
                } else {
                    dispatch({
                        type: NOT_LOGGED_IN
                    });
                    Actions.auth();
                }
            })
            .catch(error => {
                console.log(error)
                dispatch({
                    type: NOT_LOGGED_IN
                });
                Actions.auth();
            });
     };
 };
export const emailChanged = (username) => ({
    type: EMAIL_CHANGED,
    payload: username
});

export const passwordChanged = (password) => ({
    type: PASSWORD_CHANGED,
    payload: password
});

export const repasswordChanged = (repassword) => ({
    type: REPASSWORD_CHANGED,
    payload: repassword
});
export const oldpasswordChanged = (oldpassword) => ({
    type: OLDPASSWORD_CHANGED,
    payload: oldpassword
});
export const newpasswordChanged = (newpassword) => ({
    type: NEWPASSWORD_CHANGED,
    payload: newpassword
});
export const renewpasswordChanged = (renewpassword) => ({
    type: RENEWPASSWORD_CHANGED,
    payload: renewpassword
});
export const passwordChange = (oldPassword, newPassword, renewPassword, token) => dispatch => {
    dispatch({
        type: LOGIN
    });
    console.log(token);
    axios.post(`${url}/admin/savepassword`, { data: { oldPassword, newPassword, renewPassword, token } })
                    .then(response => {
                        console.log(response.data)
                       if (response.data.status) {
                           dispatch({
                               type: PASSWORD_CHANGED_SUCCESS,
                               payload: response.data.message
                           });
                       } else {
                        dispatch({
                            type: PASSWORD_CHANGED_FAILED,
                            payload: response.data.message
                        });
                       }
                    })
                    .catch((err) => {
                        dispatch({
                            type: PASSWORD_CHANGED_FAILED,
                            payload: err.message
                        });
                    });
};

export const registerUser = (username, password, repassword) => {
    return (dispatch) => {
        dispatch({
            type: LOGIN
        });
        axios.post(`${url}/register`, {
                username,
                password,
                repassword
            })
            .then(response => {
                if (response.data.status) {
                    console.log(response.data)
                    // Cookie.set("authKey", response.data.token);
                    // let expiresIn = new Date().getTime() + +response.data.expiresIn * 60000
                    // Cookie.set("expiresIn", expiresIn);
                    // localStorage.setItem("authKey", response.data.token);
                    // localStorage.setItem("expiresIn", expiresIn);
                    // vuexContext.commit("setAuthKey", response.data.token)
                    AsyncStorage.setItem('authKey', response.data.token);
                    dispatch({
                        type: REGISTER_USER_SUCCESS,
                        payload: response.data
                    });
                    Actions.main();
                } else {
                    registerFailed(response.data.message);
                }
            })
            .catch(() => {
                registerFailed('Bağlantı hatası.');
            });
    };
};

export const registerFailed = (message) => {
    return (dispatch) =>
    dispatch({
        type: REGISTER_USER_FAILED,
        payload: message
    });
};

export const loginUser = (username, password) => (dispatch) => {
    dispatch({
        type: LOGIN
    });
    axios.post(`${url}/mobileauth`,
        { username, password })
        .then(response => {
            if (response.data.status) {
                // Cookie.set("authKey", response.data.token);
                // let expiresIn = new Date().getTime() + +response.data.expiresIn * 60000
                // Cookie.set("expiresIn", expiresIn);
                // localStorage.setItem("authKey", response.data.token);
                // localStorage.setItem("expiresIn", expiresIn);
                // vuexContext.commit("setAuthKey", response.data.token)
                // vuexContext.commit("setStep", response.data.step)
                AsyncStorage.setItem('authKey', response.data.token);
                dispatch({
                    type: LOGIN_USER_SUCCESS,
                    payload: response.data
                });
                Actions.main();
            } else {    
                loginFailed(response.data.message);
            }
        })
        .catch(() => {
            loginFailed('Bağlantı hatası');
        });
    };

export const loginFailed = (message) => (dispatch) =>
    dispatch({
        type: LOGIN_USER_FAILED,
        payload: message
    });

