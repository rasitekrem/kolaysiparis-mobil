import { 
    SET_CATEGORIES, 
    SET_MODAL_VISIBLE,
    CATEGORY_CHANGED,
    COUNT_DECRASE,
    COUNT_INCRASE,
    SET_TABLE,
    SET_RESTAURANT_ID,
    SET_CART,
    SET_ORDER
    } from '../actions';

const INITIAL_STATE = {
    order: null,
    cart: null,
    restaurantId: null,
    categories: [],
    products: [],
    modalVisible: false,
    counter: [],
    table: null
};

export default (state = INITIAL_STATE, action) => {
    
    switch (action.type) {
        case SET_CATEGORIES:
            return { ...state, categories: action.payload };
        case SET_MODAL_VISIBLE:
            return { ...state, modalVisible: action.payload };
        case CATEGORY_CHANGED:
            return { 
                ...state, 
                selectedCategory: action.payload, 
                products: action.payload.products 
            };
        case COUNT_INCRASE:
            const key = action.payload;
            const counter = state.counter;
            if (counter[key]) {
                // eslint-disable-next-line no-param-reassign
                counter[key].count++;
            } else {
                // eslint-disable-next-line no-param-reassign
                counter[key] = {
                    count: 1,
                    key
                };
            }
            return { ...state, counter };
        case COUNT_DECRASE: 
            const decraseKey = action.payload;
            const decraseCounter = state.counter;
            if (decraseCounter[decraseKey]) {
                if (decraseCounter[decraseKey].count > 0) {
                    decraseCounter[decraseKey].count--;
                }
            }
            return { ...state, counter: decraseCounter };
        case SET_TABLE: 
            return { ...state, table: action.payload };
        case SET_RESTAURANT_ID:
            return { ...state, restaurantId: action.payload };
        case SET_CART:
            return { ...state, cart: action.payload };
        case SET_ORDER:
            return { ...state, order: action.payload };
        default: 
            return state;
    }
};
