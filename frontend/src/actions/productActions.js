import axios from 'axios'
import errorHandler from "./actionsErrorHandling"
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_FAIL,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_LIST_TOPRATED_REQUEST,
    PRODUCT_LIST_TOPRATED_SUCCESS,
    PRODUCT_LIST_TOPRATED_FAIL
} from '../constants/productConstants'

let cfg = {
    headers: {
        'Content-Type': 'application/json'
    }
}

export const productList = (keyword='', pageNumber='') => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST })
        const { data } = await axios.get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`)
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data })
    }catch(err) {
        dispatch(errorHandler(PRODUCT_LIST_FAIL, err))
    }
}

export const productListTopRated = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_TOPRATED_REQUEST })
        const { data } = await axios.get(`/api/products/toprated`)
        dispatch({ type: PRODUCT_LIST_TOPRATED_SUCCESS, payload: data })
    }catch(err) {
        dispatch(errorHandler(PRODUCT_LIST_TOPRATED_FAIL, err))
    }
}

export const productDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST })
        const res = await axios.get(`/api/products/${id}`)
        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: res.data })
    } catch (err) {
        dispatch(errorHandler(PRODUCT_DETAILS_FAIL, err))
    }
}

export const productDelete = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_DELETE_REQUEST })
        const token = getState().userAuth.userInfo.token
        cfg.headers.authorization = `Bearer ${token}`
        await axios.delete(`/api/products/${id}`, cfg)
        dispatch({ type: PRODUCT_DELETE_SUCCESS })
    } catch (err) {
        dispatch(errorHandler(PRODUCT_DELETE_FAIL, err))
    }
}

export const productCreate = () => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_CREATE_REQUEST })
        const token = getState().userAuth.userInfo.token
        cfg.headers.authorization = `Bearer ${token}`
        const { data } = await axios.post(`/api/products/`, {}, cfg)
        if (data === undefined) {
            dispatch(errorHandler(PRODUCT_CREATE_FAIL, {message: "Product creation failed"}))
            return
        }
        dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data })
    } catch (err) {
        dispatch(errorHandler(PRODUCT_CREATE_FAIL, err))
    }
}

export const productUpdate = (product) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_UPDATE_REQUEST })
        const token = getState().userAuth.userInfo.token
        cfg.headers.authorization = `Bearer ${token}`
        await axios.put(`/api/products/${product._id}`, product, cfg)
        dispatch({ type: PRODUCT_UPDATE_SUCCESS })
    } catch (err) {
        dispatch(errorHandler(PRODUCT_UPDATE_FAIL, err))
    }
}

export const productCreateReview = (productID, review) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST })
        const token = getState().userAuth.userInfo.token
        cfg.headers.authorization = `Bearer ${token}`
        await axios.post(`/api/products/${productID}/reviews`, review, cfg)
        dispatch({ type: PRODUCT_CREATE_REVIEW_SUCCESS })
    } catch (err) {
        dispatch(errorHandler(PRODUCT_CREATE_REVIEW_FAIL, err))
    }
}

