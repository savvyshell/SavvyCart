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
    USER_DELETE_RESET,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    USER_UPDATE_RESET
} from '../constants/userConstants'

export const userAuthReducer = (state = { userInfo: null }, action) => {
    switch (action.type) {
        case USER_AUTH_REQUEST:
            return { loading: true }
        case USER_AUTH_SUCCESS:
            const userInfo = action.payload
            localStorage.setItem('userInfo', JSON.stringify(userInfo))
            return { loading: false, userInfo: userInfo }
        case USER_AUTH_FAIL:
            return { loading: false, error: action.payload }

        case USER_REGISTER_REQUEST:
            return { loading: true }
        case USER_REGISTER_SUCCESS:
            const newUser = action.payload
            localStorage.setItem('userInfo', JSON.stringify(newUser))
            return { loading: false, userInfo: newUser }
        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload }

        case USER_DEAUTH_REQUEST:
            return { loading: true }
        case USER_DEAUTH_SUCCESS:
            localStorage.removeItem('userInfo')
            return { loading: false, userInfo: null }
        case USER_DEAUTH_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const userProfileReducer = (state = { profile: null }, action) => {
    switch (action.type) {
        case USER_PROFILE_REQUEST:
            return { ...state, loading: true }
        case USER_PROFILE_SUCCESS:
            return { loading: false, profile: action.payload }
        case USER_PROFILE_FAIL:
            return { loading: false, error: action.payload }

        case USER_UPDATE_PROFILE_REQUEST:
            return { ...state, loading: true }
        case USER_UPDATE_PROFILE_SUCCESS:
            return { loading: false, profile: action.payload, success: true }
        case USER_UPDATE_PROFILE_FAIL:
            return { loading:false, error: action.payload }
        case USER_UPDATE_PROFILE_RESET:
            return {}

        default:
            return state
    }
}

export const userListReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case USER_LIST_REQUEST:
            return { loading: true }
        case USER_LIST_SUCCESS:
            return { loading: false, users: action.payload }
        case USER_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const userDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_DELETE_REQUEST:
            return { loading: true }
        case USER_DELETE_SUCCESS:
            return { loading: false, success: true }
        case USER_DELETE_FAIL:
            return { loading: false, error: action.payload }
        case USER_DELETE_RESET:
            return {}
        default:
            return state
    }
}

export const userUpdateReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case USER_UPDATE_REQUEST:
            return { loading: true }
        case USER_UPDATE_SUCCESS:
            return { loading: false, user: action.payload, success: true }
        case USER_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        case USER_UPDATE_RESET:
            return { user: {} }
        default:
            return state
    }
}

export const userReducers = {
    userAuth: userAuthReducer,
    userProfile: userProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer
}
