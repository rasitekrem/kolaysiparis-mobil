import axios from 'axios';

export const EMAIL_CHANGED = 'email_changed';
export const PASSWORD_CHANGED = 'password_changed';
export const REPASSWORD_CHANGED = 'repassword_changed';
export const LOGIN_USER_SUCCESS = 'login_user_success';
export const REGISTER_USER_SUCCESS = 'register_user_success';
export const LOGIN_USER_FAILED = 'login_user_failed';
export const REGISTER_USER_FAILED = 'register_user_failed';
export const LOGIN = 'login';

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

export const registerUser = (username, password, repassword) => {
    return (dispatch) => {
        dispatch({
            type: LOGIN
        });
        axios.post('http://192.168.1.101:3000/api/register', {
                username,
                password,
                repassword
            })
            .then(response => {
                if (response.data.status) {
                    // Cookie.set("authKey", response.data.token);
                    // let expiresIn = new Date().getTime() + +response.data.expiresIn * 60000
                    // Cookie.set("expiresIn", expiresIn);
                    // localStorage.setItem("authKey", response.data.token);
                    // localStorage.setItem("expiresIn", expiresIn);
                    // vuexContext.commit("setAuthKey", response.data.token)
                    dispatch({
                        type: REGISTER_USER_SUCCESS,
                        payload: response.data
                    });
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

export const loginUser = (username, password) => {
    return (dispatch) => {
    dispatch({
        type: LOGIN
    });
    axios.post('http://192.168.1.101:3000/api/authenticate',
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
                dispatch({
                    type: LOGIN_USER_SUCCESS,
                    payload: response.data
                });
            } else {
                loginFailed(response.data.message);
            }
        })
        .catch(() => {
            dispatch({
                type: LOGIN_USER_FAILED,
                payload: 'Bağlantı hatası.'
            });
        });
    };    
};

export const loginFailed = (message) => {
    return (dispatch) =>
    dispatch({
        type: LOGIN_USER_FAILED,
        payload: message
    });
};
