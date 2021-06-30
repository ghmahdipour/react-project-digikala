import { combineReducers } from 'redux'
import products_list from './products_list'
import product_details from './product_details'
import cart from './cart'

export default combineReducers({
    products_list,
    product_details,
    cart
});