import {
    CART_ADD_REQUEST,
    CART_ADD_SUCCESS,
    CART_ADD_FAIL,
    CART_REMOVE_REQUEST,
    CART_REMOVE_SUCCESS,
    CART_REMOVE_FAIL,
    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD,
    CART_CLEAR
} from '../constants/cartConstants'

export const cartReducer = (state = { cartItems: [], shippingAddress: {}, paymentMethod: {} }, action) => {
    let updateState = {}
    switch (action.type) {

        case CART_ADD_REQUEST:
            return { loading: false, cartItems: state.cartItems }
        case CART_ADD_SUCCESS:
            const product = action.payload.product
            const p_id = product._id

            const exists = state.cartItems.find((item) => { return item._id === p_id })

            if (exists) {
                updateState = {
                    ...state,
                    cartItems: state.cartItems.map((item) => {
                        return item._id === p_id ? product : item
                    })
                }
            } else {
                updateState = {
                    ...state,
                    cartItems: [...state.cartItems, product]
                }
            }

            localStorage.setItem('cartItems', JSON.stringify(updateState.cartItems))
            return updateState
        case CART_ADD_FAIL:
            return { loading: false, error: action.payload }


        case CART_REMOVE_REQUEST:
            return { ...state, loading: true }
        case CART_REMOVE_SUCCESS:
            const productToRemove = action.payload.product
            updateState = {
                ...state,
                loading: false,
                cartItems: state.cartItems.filter((item) => item._id !== productToRemove._id)
            }
            localStorage.setItem('cartItems', JSON.stringify(updateState.cartItems))
            return updateState
        case CART_REMOVE_FAIL:
            return { ...state, loading: false, error: action.payload }

        case CART_SAVE_SHIPPING_ADDRESS:
            localStorage.setItem('shippingAddress', JSON.stringify(action.payload))
            return { ...state, shippingAddress: action.payload }

        case CART_SAVE_PAYMENT_METHOD:
            localStorage.setItem('paymentMethod', JSON.stringify(action.payload))
            return { ...state, paymentMethod: action.payload }

        case CART_CLEAR:
            localStorage.removeItem('cartItems')
            return { ...state, cartItems: [] }

        default:
            return state
    }
}

export const cartReducers = {
    cart: cartReducer
}
