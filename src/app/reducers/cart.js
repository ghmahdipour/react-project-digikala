
const initialState = {cart_items :JSON.parse(localStorage.getItem('cartItems') || "[]")}

export default function cart(state = initialState, action) {
    if (action.type === "ADD_TO_CART") {
		return { ...state, cart_items: action.payload.cartItems}
	} else if (action.type === "REMOVE_FROM_CART") {
		return { ...state, cart_items: action.payload.cartItems }
	} else {
        return state
    }  
}