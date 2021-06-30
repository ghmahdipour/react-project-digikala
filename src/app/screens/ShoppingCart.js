import React, { useState } from 'react'
import language from '../resources/js/languages_dict'
import format_currency from '../utils/format_currency'
import { useLocation } from 'react-router-dom'
import Header from '../components/Header'

const ShoppingCart = () => {
    
    const location = useLocation()
    const [cart_items, set_cart_items] = useState(localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [])
    
    const removeFromCartHandler = (product) => {
        const cartItems = cart_items.slice()
        set_cart_items(cartItems.filter((x) => x.id !== product.id))
        localStorage.setItem('cartItems', JSON.stringify(cartItems.filter((x) => x.id !== product.id)))
    }

    return(
        <>
            <Header isCartPage={location.pathname}/>
            <main>
                <div className='content'>
                    <div className='main'>
                        <div className='shopping-cart'>
                        <div>
                            {
                                cart_items.length === 0
                                ?
                                <div className='cart cart-header'>{language.tokens['CART_EMPTY']}</div>
                                :
                                <div className='cart cart-header'>
                                    {cart_items.length + ' ' + language.tokens['CART_ITEMS']}
                                </div>
                            }
                        <div>
                            <div className='cart'>
                                <ul className='cart-items'>
                                    {
                                        cart_items.map((items) => (
                                            <li key={items.id}>
                                                <div>
                                                    <img src={items.images.main} alt={items.title}/>
                                                </div>
                                                <div>
                                                    <div>{items.title}</div>
                                                    <div className='shopping-cart-right'>
                                                        <p>{items.count} </p>          
                                                        <button className='button'
                                                            onClick={() => removeFromCartHandler(items)}                                                                                                          
                                                        >
                                                            {language.tokens['REMOVE']}
                                                        </button>
                                                        <p className='total-price'>{format_currency(undefined, items.price.selling_price, true)}</p> 
                                                    </div>
                                                </div>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>                       
                            </div>
                        </div>                      
                        </div>
                    </div>
                    <div className='sidebar'>
                        {
                                cart_items.length !== 0 && (
                                    <div className='cart'>
                                        <div className='total'>
                                            <div>
                                                <p>{language.tokens['SUM_CART']}</p>
                                                <p>{format_currency(undefined, cart_items.reduce((a, c) => a + c.price.selling_price * c.count, 0), true)}</p>
                                            </div>
                                            <div className='total-button'>
                                                <button className='button-primary'>
                                                    {language.tokens['CONTINUE_BUYING_PROCESS']}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }             
                        </div>                 
                </div>
            </main>        
        </>
    )
}

export default ShoppingCart