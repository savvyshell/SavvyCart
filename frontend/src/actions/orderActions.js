import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_MY_LIST_REQUEST,
    ORDER_MY_LIST_SUCCESS,
    ORDER_MY_LIST_FAIL,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,
    ORDER_DELIVER_REQUEST,
    ORDER_DELIVER_SUCCESS,
    ORDER_DELIVER_FAIL
} from '../constants/orderConstants'
import axios from 'axios'
import errorHandler from './actionsErrorHandling'

let cfg = {
    headers: {
        'Content-Type': 'application/json'
    }
}

export const orderCreate = (order) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_CREATE_REQUEST })
        const token = getState().userAuth.userInfo.token
        cfg.headers.authorization = `Bearer ${token}`
        const data = await axios.post('/api/orders', order, cfg)
        dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.data })
    } catch (err) {
        dispatch(errorHandler(ORDER_CREATE_FAIL, err))
    }
}

export const getOrderDetails = (orderID) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_DETAILS_REQUEST })
        const token = getState().userAuth.userInfo.token
        cfg.headers.authorization = `Bearer ${token}`
        const data = await axios.get(`/api/orders/${orderID}`, cfg)
        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.data })
    } catch (err) {
        dispatch(errorHandler(ORDER_DETAILS_FAIL, err))
    }
}

export const payOrder = (orderID, paymentResult) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_PAY_REQUEST })
        const token = getState().userAuth.userInfo.token
        cfg.headers.authorization = `Bearer ${token}`
        const data = await axios.put(`/api/orders/${orderID}/pay`, paymentResult, cfg)
        dispatch({ type: ORDER_PAY_SUCCESS, payload: data.data })
    } catch (err) {
        dispatch(errorHandler(ORDER_PAY_FAIL, err))
    }
}

export const deliverOrder = (orderID) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_DELIVER_REQUEST })
        const token = getState().userAuth.userInfo.token
        cfg.headers.authorization = `Bearer ${token}`
        const data = await axios.put(`/api/orders/${orderID}/deliver`, {}, cfg)
        dispatch({ type: ORDER_DELIVER_SUCCESS, payload: data.data })
    } catch (err) {
        dispatch(errorHandler(ORDER_DELIVER_FAIL, err))
    }
}

export const getMyOrdersList = () => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_MY_LIST_REQUEST })
        const token = getState().userAuth.userInfo.token
        cfg.headers.authorization = `Bearer ${token}`
        const data = await axios.get(`/api/orders/myorders`, cfg)
        dispatch({ type: ORDER_MY_LIST_SUCCESS, payload: data.data })
    } catch (err) {
        dispatch(errorHandler(ORDER_MY_LIST_FAIL, err))
    }
}

export const getOrdersList = () => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_LIST_REQUEST })
        const token = getState().userAuth.userInfo.token
        cfg.headers.authorization = `Bearer ${token}`
        const data = await axios.get(`/api/orders`, cfg)
        dispatch({ type: ORDER_LIST_SUCCESS, payload: data.data })
    } catch (err) {
        dispatch(errorHandler(ORDER_LIST_FAIL, err))
    }
}
