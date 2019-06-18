import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import { url } from '../commons';

export const SET_CATEGORIES = 'set_categories';
export const SET_RESTAURANT_ID = 'set_restaurant_id';
export const SET_MODAL_VISIBLE = 'set_modal_visible';
export const CATEGORY_CHANGED = 'category_changed';
export const COUNT_INCRASE = 'count_incrase';
export const COUNT_DECRASE = 'count_decrase';
export const SET_TABLE = 'set_table';
export const SET_CART = 'set_cart';
export const SET_ORDER = 'set_order';

export const setRestaurantId = (restaurantId) => (dispatch) => {
    dispatch({
        type: SET_RESTAURANT_ID,
        payload: restaurantId
    });
};
export const setRestaurantInfo = (qrData, token) => (dispatch) => {
    console.log(qrData);
    const restaurantId = qrData.split(',')[0];
    const table = qrData.split(',')[1];
    console.log('restaurantId: ' + restaurantId);
    axios.post(`${url}/user/getcategories`, { data: { restaurantId, token } })
        .then(response => {
            console.log(response.data);
            dispatch({
                type: SET_CATEGORIES,
                payload: response.data.categories
            });
            dispatch({
                type: SET_TABLE,
                payload: table
            });
            dispatch({
                type: SET_RESTAURANT_ID,
                payload: restaurantId
            });
            changeModalVisible(false);
            Actions.afterorder(); 
        });   
};

export const changeModalVisible = (value) => dispatch => {
    dispatch({
        type: SET_MODAL_VISIBLE,
        payload: value
    });
};

export const categoryChanged = (category) => (dispatch) => {
    dispatch({
        type: CATEGORY_CHANGED,
        payload: category
    });
    Actions.products();
};

export const countIncrase = (key) => (dispatch) => {
    dispatch({
        type: COUNT_INCRASE,
        payload: key
    });
};

export const countDecrase = (key) => (dispatch) => {
    dispatch({
        type: COUNT_DECRASE,
        payload: key
    });
};

export const addToCart = (data, token) => (dispatch) => {
    console.log(data);
    axios.post(`${url}/user/usercart`, { 
        data: { 
            product: data.product, 
            table: data.table,
            restaurantId: data.restaurantId, 
            token 
        } 
    })
    .then(response => {
        dispatch({
            type: SET_CART,
            payload: response.data.cart
        });
    });
};

export const cartDecrase = (data, token) => (dispatch) => {
    const { cart, key, restaurantId } = data;
    const product = cart.products.filter(item => item.key === key);
    product[0].count--;
    axios.post(`${url}/user/changecount`, { 
        data: { 
            product: product[0], 
            table: cart.table, 
            restaurantId,
            token 
        } 
    })
    .then(response => {
        dispatch({
            type: SET_CART,
            payload: response.data.cart
        });
    });
};

export const cartIncrase = (data, token) => (dispatch) => {
    const { cart, key, restaurantId } = data;
    const product = cart.products.filter(item => item.key === key);
    product[0].count++;
    axios.post(`${url}/user/changecount`, { 
        data: { 
            product: product[0], 
            table: cart.table, 
            restaurantId,
            token 
        } 
    })
    .then(response => {
        dispatch({
            type: SET_CART,
            payload: response.data.cart
        });
    });
};

export const takeOrder = (data, token) => (dispatch) => {
    axios.post(`${url}/user/takingorder`, { data: { ...data, token } })
                    .then(response => {
                        dispatch({
                            type: SET_ORDER,
                            payload: response.data.order
                        });
                        console.log(response.data.order.products)
                        Actions.order();
                    });                  
};
