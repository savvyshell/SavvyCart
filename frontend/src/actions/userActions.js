import errorHandler from './actionsErrorHandling'
import axios from 'axios'
import {
    USER_AUTH_REQUEST,
    USER_AUTH_SUCCESS,
    USER_AUTH_FAIL,
    USER_DEAUTH_REQUEST,
    USER_DEAUTH_SUCCESS,
    USER_DEAUTH_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_PROFILE_REQUEST,
    USER_PROFILE_SUCCESS,
    USER_PROFILE_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_RESET,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL
} from '../constants/userConstants'

let cfg = {
    headers: {
        'Content-Type': 'application/json'
    }
}

export const authUser = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_AUTH_REQUEST })
        const userInfo = await axios.post('/api/users/login', { email, password }, cfg)
        dispatch({ type: USER_AUTH_SUCCESS, payload: userInfo.data })
    } catch (err) {
        dispatch(errorHandler(USER_AUTH_FAIL, err))
    }
}

export const deauthUser = () => async (dispatch) => {
    try {
        dispatch({type: USER_DEAUTH_REQUEST })
        dispatch({ type: USER_DEAUTH_SUCCESS })
    } catch (err) {
        dispatch(errorHandler(USER_DEAUTH_FAIL, err))
    }
}

export const registerUser = (name, email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_REGISTER_REQUEST })
        const userInfo = await axios.post('/api/users', { name, email, password }, cfg)
        dispatch({ type: USER_REGISTER_SUCCESS, payload: userInfo.data })
    } catch (err) {
        dispatch(errorHandler(USER_REGISTER_FAIL, err))
    }
}

export const getUserProfileById = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_PROFILE_REQUEST })
        const token = getState().userAuth.userInfo.token
        cfg.headers.authorization = `Bearer ${token}`
        const userProfileInfo = await axios.get(`/api/users/profile/${id}`, cfg)
        dispatch({ type: USER_PROFILE_SUCCESS, payload: userProfileInfo.data })
    } catch (err) {
        dispatch(errorHandler(USER_PROFILE_FAIL, err))
    }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_UPDATE_PROFILE_REQUEST })
        const token = getState().userAuth.userInfo.token
        cfg.headers.authorization = `Bearer ${token}`
        const newUserProfileInfo = await axios.put('/api/users/profile/', user, cfg)
        dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: newUserProfileInfo.data })
        dispatch({ type: USER_AUTH_SUCCESS, payload: newUserProfileInfo.data })
    } catch (err) {
        dispatch(errorHandler(USER_UPDATE_PROFILE_FAIL, err))
    }
}

export const updateUserProfileReset = () => async (dispatch) => {
    dispatch({ type: USER_UPDATE_PROFILE_RESET })
}

export const getUsersList = () => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_LIST_REQUEST })
        const token = getState().userAuth.userInfo.token
        cfg.headers.authorization = `Bearer ${token}`
        const newUserProfileInfo = await axios.get('/api/users', cfg)
        dispatch({ type: USER_LIST_SUCCESS, payload: newUserProfileInfo.data })
    } catch (err) {
        dispatch(errorHandler(USER_LIST_FAIL, err))
    }
}

export const deleteUserById = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_DELETE_REQUEST })
        const token = getState().userAuth.userInfo.token
        cfg.headers.authorization = `Bearer ${token}`
        const res = await axios.delete(`/api/users/${id}`, cfg)
        dispatch({ type: USER_DELETE_SUCCESS, payload: res.data })
    } catch (err) {
        dispatch(errorHandler(USER_DELETE_FAIL, err))
    }
}

export const getUserById = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_PROFILE_REQUEST })
        const token = getState().userAuth.userInfo.token
        cfg.headers.authorization = `Bearer ${token}`
        const userProfileInfo = await axios.get(`/api/users/${id}`, cfg)
        dispatch({ type: USER_PROFILE_SUCCESS, payload: userProfileInfo.data })
    } catch (err) {
        dispatch(errorHandler(USER_PROFILE_FAIL, err))
    }
}

export const updateUserById = (user) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_UPDATE_REQUEST })
        const token = getState().userAuth.userInfo.token
        cfg.headers.authorization = `Bearer ${token}`
        const data = await axios.put(`/api/users/${user._id}`, user, cfg)
        dispatch({ type: USER_UPDATE_SUCCESS, payload: data.data })
        dispatch({ type: USER_PROFILE_SUCCESS, payload: data.data })
    } catch (err) {
        dispatch(errorHandler(USER_UPDATE_FAIL, err))
    }
}
