import errorHandler from './actionsErrorHandling'
import {
    CART_ADD_REQUEST,
    CART_ADD_SUCCESS,
    CART_ADD_FAIL,
    CART_REMOVE_REQUEST,
    CART_REMOVE_SUCCESS,
    CART_REMOVE_FAIL,
    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD
} from '../constants/cartConstants'

export const cartAdd = (product, cfg) => async (dispatch) => {
    try {
        dispatch({ type: CART_ADD_REQUEST })
        dispatch({ type: CART_ADD_SUCCESS, payload: { product: { ...product, product: product._id, ...cfg } } })
    } catch (err) {
        dispatch(errorHandler(CART_ADD_FAIL, err))
    }
}

export const cartRemove = (product) => async (dispatch) => {
    try {
        dispatch({ type: CART_REMOVE_REQUEST })
        dispatch({ type: CART_REMOVE_SUCCESS, payload: { product: { ...product, product: product._id }} })
    } catch (err) {
        dispatch(errorHandler(CART_REMOVE_FAIL, err))
    }
}

export const cartSaveShippingAddress = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data
    })
}

export const cartSavePaymentMethod = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: data
    })
}
