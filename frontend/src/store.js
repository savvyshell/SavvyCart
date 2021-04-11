import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import {cartItemsFromStorage, cartPaymentMethodFromStorage, cartShippingAddressFromStorage} from './storage/cartStorage'
import { userInfoFromStorage } from './storage/userStorage'

import reducersIndex from "./reducers";

const reducers = combineReducers(reducersIndex)
const middleware = [thunk]

const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: cartShippingAddressFromStorage,
        paymentMethod: cartPaymentMethodFromStorage
    },
    userAuth: {
        userInfo: userInfoFromStorage
    }
}


const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store

