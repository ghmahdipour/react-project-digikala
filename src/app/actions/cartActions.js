
export const addToCart = (items, product)  => {
    return dispatch => {
        const cartItems = items.slice()
        let entry_in_cart = false
        cartItems.forEach((item) => {
            if(item.id === product.id){
                item.count++;
                entry_in_cart = true
            }
        })
        if(!entry_in_cart) {
            cartItems.push({...product, count: 1})
        }
        dispatch({ type : 'ADD_TO_CART', payload : { cartItems }})
        localStorage.setItem('cartItems', JSON.stringify(cartItems))
    }
}

export const removeFromCart = (items, product) => {
    return dispatch => {
        const cartItems = items.slice().filter(x => x.id !== product.id)
        dispatch({ type : 'REMOVE_FROM_CART', payload : { cartItems }})
        localStorage.setItem('cartItems', JSON.stringify(cartItems))
    }
}