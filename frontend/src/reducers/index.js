import { productReducers } from './productReducers'
import { cartReducers } from "./cartReducers"
import { userReducers } from "./userReducers"
import { orderReducers } from './orderReducers'

const reducersIndex = {
    ...productReducers,
    ...cartReducers,
    ...userReducers,
    ...orderReducers
}

export default reducersIndex

